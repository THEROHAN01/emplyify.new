-- Emplyify launch schema: leads (CRM mirror), candidates, applications,
-- consent ledger, jobs and audit log. All writes from the website go through
-- server routes using the service role; RLS denies everything else by default.

create extension if not exists "pgcrypto";
create extension if not exists "vector";

-- ---------------------------------------------------------------------------
-- Leads: role briefs, contact messages, report downloads
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  kind text not null check (kind in ('brief', 'contact', 'report')),
  created_at timestamptz not null default now(),

  -- brief fields
  role_title text,
  role_family text check (role_family in ('ai-ml','data','cloud-devops','full-stack','embedded','product')),
  seniority text check (seniority in ('junior','mid','senior','lead')),
  location text,
  work_mode text,
  openings int check (openings between 1 and 500),
  must_have_skills text[],
  budget_min_lpa numeric(6,2),
  budget_max_lpa numeric(6,2),
  target_start date,
  job_description text,

  -- contact
  name text not null,
  email text not null,
  phone text,
  company text,
  company_type text,
  contact_preference text,
  topic text,
  message text,
  report_slug text,

  -- routing
  track text check (track in ('talent-pod','per-hire')),
  temperature text check (temperature in ('hot','warm')),
  score int,
  reply_by timestamptz,
  first_replied_at timestamptz,
  owner text,
  stage text not null default 'lead'
    check (stage in ('lead','qualified','shortlist_sent','interview','offer','hire','talent_pod','lost')),
  enrichment_status text default 'none' check (enrichment_status in ('none','queued','done','failed')),
  enrichment jsonb,

  attribution jsonb not null default '{}'::jsonb,
  ip_hash text
);

create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_sla_idx on public.leads (reply_by) where first_replied_at is null;
create index if not exists leads_email_idx on public.leads (lower(email));

-- ---------------------------------------------------------------------------
-- Candidates (talent network) with an embedding for matching
-- ---------------------------------------------------------------------------
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_interaction_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  role_family text,
  years_experience numeric(4,1),
  preferred_city text,
  notice_days int,
  linkedin text,
  whatsapp_updates boolean not null default false,
  source text,
  attribution jsonb not null default '{}'::jsonb,
  profile jsonb,
  embedding vector(1024),
  deleted_at timestamptz
);

-- Not unique: people re-join with new details; recruiter tools merge duplicates.
create index if not exists candidates_email_idx on public.candidates (lower(email)) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Jobs (replaces src/content/jobs.ts once the ATS feed is live)
-- ---------------------------------------------------------------------------
create table if not exists public.jobs (
  id text primary key,                      -- short id, e.g. x7k2
  slug text unique not null,                -- senior-ml-engineer-pune-x7k2
  status text not null default 'draft' check (status in ('draft','published','closed')),
  data jsonb not null,                      -- shape of the Job type in src/content/types.ts
  posted_at date,
  valid_through date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Applications
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  created_at timestamptz not null default now(),
  job_slug text not null,
  candidate_id uuid references public.candidates(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  linkedin text,
  notice_days int,
  expected_ctc_lpa numeric(6,2),
  cv_path text,                             -- private bucket path, never a public URL
  cv_scan_status text not null default 'none' check (cv_scan_status in ('none','pending','clean','infected','failed')),
  status text not null default 'received'
    check (status in ('received','screened','shared','interview','offer','hired','closed')),
  status_changed_at timestamptz not null default now(),
  outcome_reason text,                      -- short reason shared with the candidate
  reviewed_by text,                         -- human reviewer for every rejection
  attribution jsonb not null default '{}'::jsonb
);

create index if not exists applications_status_idx on public.applications (status, status_changed_at);

-- A rejection must have a human reviewer (AI never rejects alone).
alter table public.applications drop constraint if exists applications_closed_needs_reviewer;
alter table public.applications add constraint applications_closed_needs_reviewer
  check (status <> 'closed' or reviewed_by is not null or outcome_reason = 'withdrawn' or outcome_reason = 'auto_closed_21_days');

-- ---------------------------------------------------------------------------
-- Consent ledger (DPDP): one row per consent event; withdrawals are rows too
-- ---------------------------------------------------------------------------
create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  purpose text not null,                    -- talent_network | application:<slug> | share:<employer>:<job> | report:<slug>
  version text not null,                    -- wording version, e.g. application/2026-10-05
  granted boolean not null default true,
  subject_ref text,
  ip_hash text
);

create index if not exists consents_email_idx on public.consents (lower(email), purpose, created_at desc);

-- ---------------------------------------------------------------------------
-- Audit log: every read/write of personal data by staff or agents
-- ---------------------------------------------------------------------------
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text not null default 'website',
  action text not null,
  subject text not null,
  meta jsonb not null default '{}'::jsonb
);

-- ---------------------------------------------------------------------------
-- Row-level security: deny by default. The service role bypasses RLS and is
-- only used server-side. Staff tools get explicit policies in later migrations.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.candidates enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.consents enable row level security;
alter table public.audit_log enable row level security;

-- Published jobs are public (for a future client-side job search).
drop policy if exists "published jobs are readable" on public.jobs;
create policy "published jobs are readable" on public.jobs for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- Private CV bucket: no public access; recruiters get signed URLs (10 min).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cvs', 'cvs', false, 5242880,
  array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------------
-- Retention helpers (run daily via pg_cron or a scheduled function)
-- ---------------------------------------------------------------------------
create or replace function public.retention_sweep() returns void language sql as $$
  -- Soft-delete candidates inactive for 24 months (privacy notice).
  update public.candidates set deleted_at = now(), name = 'deleted', email = 'deleted+' || id || '@invalid', phone = null, linkedin = null, profile = null, embedding = null
   where deleted_at is null and last_interaction_at < now() - interval '24 months';
  -- Auto-close stalled applications after 21 days with feedback.
  update public.applications set status = 'closed', outcome_reason = 'auto_closed_21_days', status_changed_at = now()
   where status in ('received','screened','shared') and status_changed_at < now() - interval '21 days';
$$;
