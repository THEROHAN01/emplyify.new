# Launch checklist

This is the playbook's launch gate. Nothing goes public while an item in the first four groups is unchecked.

Legend: **[x]** done and verified in code · **[ ]** needs an owner action (content, accounts or vendor setup) · *how it was verified* in italics.

## Build scope (playbook pages and features)

- [x] Home: all 12 sections in spec order (hero with live sample shortlist card, proof bar, problem→fix, how it works, services, role families, pricing preview, case study / honest fallback, candidate band, insights, responsible AI, final CTA)
- [x] Service pages ×4 on one template (outcome → who for → included → process with SLAs → pricing → case study → 6–10 FAQs → CTA) with Service + FAQPage schema
- [x] How It Works: step timeline with SLAs, AI-vs-human table, sample dossier, quality metrics
- [x] Pricing: 3 plans, seniority fee table, fee calculator (role, seniority, CTC → fee, GST, total, shortlist date), comparison table, FAQ
- [x] Role pages ×6: skills we vet, salary bands by city and experience, time to hire, interview loop, screening questions, prefilled brief form, links to cities, pricing and proof
- [x] Role × city pages ×18 (6 families × 3 cities) with city-specific bands, notice norms, clusters and notes
- [x] GCC hub + city pages ×3 (supply, clusters, salary benchmarks, notice norms, "Talk to our GCC team")
- [x] Case studies index (filter by role and company type) + detail template
- [x] Insights index, article template, email-gated Talent Index with a separate thank-you URL
- [x] Candidate hub, talent network sign-up, AI interview prep (text), "how we treat your data"
- [x] Job board (filters), job detail (salary band, team, stack, stages, timeline, equal-opportunity statement, one-step apply, JobPosting schema)
- [x] About, Responsible AI policy, Contact / Book (Cal.com embed, WhatsApp, email, office)
- [x] Legal: privacy, terms, candidate consent, cookies, grievance officer
- [x] 404, error and global-error pages; HTML sitemap; XML sitemap; robots; manifest
- [x] Navigation: mega menu (services + role families), "For GCCs" menu, "Find jobs" text link, sticky "Submit a role"; mobile drawer; mobile sticky bar (Submit a role + WhatsApp)
- [x] Exit intent: desktop only, once per session, employer pages, offers the sample shortlist
- [x] AI: JD-to-brief assistant, fee and timeline estimator, sample shortlist generator (pre-approved samples), interview prep with answer feedback, all labelled as AI

## Content and proof

- [ ] Every page has final copy. *Draft copy is written to the playbook's voice rules, with no lorem ipsum (enforced by `tests/content.test.ts`). The founder still needs to review and approve it.*
- [ ] Pricing, guarantee and replacement terms match the client contract. *Single source: `src/content/pricing.ts` and `src/content/legal.ts`. Set `podFromMonthlyInr` if you want a published pod floor.*
- [ ] Sample shortlist dossier approved and anonymised. *Illustrative composites live in `src/content/sample-shortlists.ts` and are labelled "sample" everywhere they appear.*
- [ ] Founder and team photos and bios live. *Add entries to `src/content/team.ts`; the About page section appears automatically. Name recruiters in `recruiterDesks` so confirmations show a person.*
- [ ] Replace indicative salary bands with Emplyify pipeline data (footnoted until then)
- [ ] Publish real jobs: switch `status` to `published`, or connect the `jobs` table

## Conversion

- [ ] Brief form submits to HubSpot with UTM data on desktop and mobile. *Code done and e2e-tested on mobile (submission → thank-you with ref, desk, reply-by and shortlist-by). Needs `HUBSPOT_PORTAL_ID`, `HUBSPOT_BRIEF_FORM_ID` and the `emplyify_*` properties.*
- [ ] Auto-reply email sends within 2 minutes; recruiter alert fires. *Code done. Needs `RESEND_API_KEY`, a verified sending domain, `INTERNAL_ALERT_EMAIL` and `SLACK_LEADS_WEBHOOK_URL`.*
- [ ] Cal.com booking routes to the right person. *Embed and `call_booked` tracking done. Needs `NEXT_PUBLIC_CAL_LINK` (+ `_GCC`) and routing in Cal.com.*
- [x] Thank-you pages fire conversion events (`thank_you_viewed` on brief, sign-up, apply and report)

## Compliance and security

- [x] Privacy notice, terms, cookie banner and grievance officer published. *Drafts carry a "legal review" banner until `LEGAL_REVIEWED = true`.*
- [ ] Legal review of all policies (DPDP) — then set `LEGAL_REVIEWED = true` in `src/content/legal.ts`
- [x] Consent captured at CV upload and logged. *Required checkbox; `consents` ledger row with purpose, wording version and IP hash.*
- [x] CV bucket private; signed URLs expire (10 min). *In the migration and `integrations/supabase.ts`.*
- [ ] Apply `supabase/migrations/0001_init.sql`; add malware scanning on the bucket
- [x] Security headers and CSP. *Verified on responses; Chrome reports no CSP issues.*
- [ ] Turnstile keys set; MFA on all admin accounts. *See `docs/SECURITY.md`.*

## Quality

- [x] Lighthouse ≥ 90 (mobile) on home, pricing, a role page and the submit page. *Measured locally on a production build: performance 91–96, accessibility 98–100, best practices 96–100, SEO 100. Re-measure on Vercel with CDN; lab LCP was 2.3–3.0 s under Lighthouse throttling against the < 2.0 s field target.*
- [x] Keyboard and screen-reader pass on forms. *axe WCAG 2.2 AA: 0 violations on 20 pages. Errors move focus to the first invalid field, are announced via `role="alert"` and linked with `aria-describedby`; native `<details>` FAQs; skip link; 44 px targets.*
- [ ] Tested on Safari, Firefox, Android and iPhone. *Chromium tested at 390 px and 1280 px with no horizontal overflow and no console errors. Real-device testing is still to do.*
- [x] 404 and error pages designed; internal links checked against the route registry (`tests/content.test.ts`)
- [x] WCAG contrast ≥ 4.5:1 for every token pair in both themes (`tests/contrast.test.ts`). *The playbook's light `--signal` and `--warn` failed as text, so they were darkened. See `globals.css`.*

## SEO and tracking

- [x] Meta titles and descriptions unique per page; canonical URLs; Open Graph
- [x] Schema: Organization, Service, FAQPage, JobPosting (published jobs only), BreadcrumbList, Article
- [ ] Sitemaps submitted in Search Console; robots.txt checked. *Generated from one route registry. Preview deployments send `disallow`.*
- [ ] Analytics events verified against the event plan. *Typed in `lib/analytics/events.ts`. Needs `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or PostHog keys; consent-gated.*
- [ ] Google Business Profile for the Pune office

## After launch (first 30 days)

- [ ] Weekly dashboard review and one copy or CTA change per week
- [ ] First case study published as soon as a client approves (`src/content/case-studies.ts`)
- [ ] Live SLA metric switched on after 10 shortlists (`src/content/metrics.ts`)
- [ ] First Talent Index edition (switch `release` to `available` and set `assetPath`)
