# Architecture and decisions

## Request flow

```
Browser ──► Static pages (SSG)            marketing, role × city, GCC, legal, insights
        ──► Dynamic pages                 thank-you pages, filters (?role=, ?city=), booking
        ──► /api/* route handlers ──► guard (origin, rate limit, honeypot, Turnstile)
                                   ──► zod validation (same schemas as the client)
                                   ──► pipeline (lib/leads, lib/candidates)
                                         ├─ Supabase (system of record + consent ledger + audit log)
                                         ├─ HubSpot Forms API (CRM, UTM attribution, nurture)
                                         ├─ Resend (auto-reply within seconds, internal alert)
                                         └─ Slack (recruiter alert + SLA deadline)
```

All writes go through API routes, so consent checks, validation and audit logging happen in one place (playbook: "Every read and write goes through the API layer").

## Key decisions

| Decision | Why |
| --- | --- |
| **Typed content modules behind `lib/content`** instead of wiring Sanity on day one | No CMS credentials yet. Pages never import content directly, so moving to Sanity (or jobs from the ATS) only changes `src/lib/content/*`. The types in `src/content/types.ts` are the future CMS schemas. |
| **Integrations are optional adapters** | The site must build and run in CI and locally without secrets. Each adapter returns `{ ok, skipped }`; the pipeline uses `Promise.allSettled`, so one vendor outage never loses a lead. If neither Supabase nor HubSpot recorded a brief in production, `brief.not_recorded` is logged at error level. |
| **Shared zod schemas** for client and server | One source of truth for validation and the one-line error messages. `z.config({ jitless: true })` keeps zod from probing `eval`, which the CSP blocks. |
| **Custom primitives instead of shadcn/ui** | Fewer dependencies and less client JS. Primitives follow the design-system tokens directly (12px radius, 44px targets, one accent). |
| **Content preview flag** for drafts | Draft jobs can be QA'd on preview deployments without ever advertising a role that doesn't exist. |
| **Jobs pages use ISR (`revalidate = 300`)** | When jobs move to the ATS, new and closed roles appear within 5 minutes without a deploy. |
| **`/submit-a-role` is static**; URL prefill runs client-side in a Suspense boundary | The main conversion page stays on the CDN. |
| **One variable font (Inter)**, with the system monospace stack for metrics | Five font files became one; this was the biggest mobile-LCP lever we measured. |
| **CSP without nonces** | Nonces force dynamic rendering of every page. We allow inline scripts but pin every external origin; see `SECURITY.md`. |
| **Business-time maths in IST** (`lib/utils/business-time.ts`) | "Reply within 4 business hours" and "shortlist in 72 hours" are promises. They are computed, unit-tested and shown to the client in the confirmation. |
| **Claude with heuristic fallbacks** | The JD assistant and interview prep work without an API key, and degrade gracefully on errors or refusals. Calls use structured outputs, `effort: "low"` for latency, and server-side `fallbacks: "default"`. Only sizes and token counts are logged, never prompt content. |

## Lead routing (playbook "Lead routing")

1. `POST /api/brief` writes a Supabase `leads` row and a HubSpot form submission with UTM, landing page, referrer and `hubspotutk`.
2. Enrichment is marked `queued` for the backend enrichment agent, which is not part of this repo.
3. `scoreBrief`: a GCC, or 5+ openings, is **hot** and goes on the Talent Pod track. Anything else goes on the per-hire track.
4. A Slack and email alert goes to the desk, carrying the reply deadline (now + 4 business hours IST).
5. The auto-reply email names the desk and gives the reply-by and shortlist-by dates.
6. Nurture sequences run in HubSpot, keyed on `emplyify_track`.

## CV pipeline

Upload → size, extension and **magic-byte** check (`lib/security/upload.ts`) → private `cvs` bucket at an unguessable path → row with `cv_scan_status = 'pending'`. A storage webhook should then run malware scanning (for example ClamAV in a Supabase Edge Function) and set `clean` or `infected` before any recruiter can create a signed URL. Signed URLs expire after 10 minutes (`signedCvUrl`).

## Analytics

`lib/analytics/events.ts` holds the typed event plan from the playbook: `cta_click`, `brief_started`/`brief_step`/`brief_submitted`, `call_booked` (Cal.com postMessage), `pricing_calculator_used` (CTC bucketed, never raw), `sample_dossier_downloaded`, `report_downloaded`, `candidate_signup`, `job_apply` and `thank_you_viewed`. Events are dropped unless the visitor accepted analytics. PostHog session replay masks all inputs.

## Phase 2 hooks already in place

- `applications.status` + `status_changed_at` → candidate status portal and the 2-business-day update SLA.
- `retention_sweep()` → 24-month candidate deletion and 21-day auto-close.
- `candidates.embedding vector(1024)` → pgvector role matching.
- `consents` ledger with versioned wording → per-employer share consent.
