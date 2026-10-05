# Emplyify website

The launch site for Emplyify, the AI-native hiring partner for India's tech and GCC teams. Its main job is turning hiring managers into submitted role briefs and booked calls. Its second job is growing the candidate talent network.

Built from the *Emplyify Website Building Playbook* (Oct 2026). Launch status for every playbook item is in [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` (light + dark) |
| Content | Typed content modules in `src/content`, read only through `src/lib/content` (the boundary where Sanity plugs in) |
| Data | Supabase Postgres + private Storage (`supabase/migrations`) |
| CRM / email / alerts | HubSpot Forms API, Resend, Slack webhook |
| AI | Claude API (`@anthropic-ai/sdk`) with deterministic fallbacks |
| Bot protection | Cloudflare Turnstile, honeypot, origin check, rate limits |
| Analytics | Plausible and/or PostHog, loaded only after cookie consent |
| Booking | Cal.com embed |

Every integration is optional. Without credentials, each adapter logs and skips, so the site builds, runs and passes its tests with zero secrets.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (draft content visible) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` |
| `npm test` | Vitest: unit, content-integrity, contrast and API-route tests |
| `npm run check` | lint + typecheck + test (run before every push) |

## Project layout

```
src/
  app/                      Routes (22 page types), API routes, sitemap/robots/manifest
    api/brief|contact|talent-network|apply|report|ai/*
  components/
    ui/                     Primitives: Button, Card, Badge, Field, FAQ, Stat, Breadcrumbs…
    layout/                 Header (mega menu + drawer), Footer, mobile CTA bar
    marketing/              Page sections: ShortlistCard, ProofBar, steps, role sections…
    forms/                  Brief form (3-step), apply, talent network, calculator, prep…
    analytics/              Consent manager, exit intent, conversion events
    seo/                    JSON-LD renderer
  content/                  Typed content (services, roles, cities, pricing, jobs, legal…)
  lib/
    content/                Content repository + server-side form props
    leads/                  Zod schemas (shared client/server), scoring, pipeline, emails
    candidates/             Talent network, application and report pipelines, consent ledger
    integrations/           HubSpot, Resend, Slack, Supabase, Turnstile adapters
    ai/                     Claude client, JD→brief, interview prep, heuristic fallbacks
    security/               Rate limit, upload validation, origin check, request guard
    analytics/              Typed event plan, consent, attribution (UTM first-touch)
    seo/                    Metadata builder, schema.org builders, route registry
    utils/                  Formatting, IST business-time maths, ids
supabase/migrations/        Schema, RLS, private CV bucket, retention sweep
tests/                      Vitest suites
docs/                       Architecture, security, launch checklist
```

## Content and the "no fake proof" rule

The playbook forbids placeholder stats, logos and testimonials. The code enforces that:

- **Proof metrics** (`src/content/metrics.ts`) have `value: null` until real data exists. The UI then shows "Live after our first 10 shortlists" instead of a number.
- **Case studies** and **client logos** are empty arrays. Pages show an honest empty state that links to the sample shortlist.
- **Jobs** in `src/content/jobs.ts` are `status: "draft"` examples. They render only in content-preview mode (dev, or `CONTENT_PREVIEW=true` on preview deployments). They are never in production, the sitemap or JobPosting schema.
- **Sample shortlists** are labelled as illustrative composites on every surface.
- **Salary bands** are labelled indicative and carry a source footnote until the Talent Index replaces them.
- A test fails the build if copy uses the banned hype words or lorem ipsum.

## Deploying (Vercel)

Import the repo at vercel.com/new. `vercel.json` sets the Mumbai region and build commands, and preview deployments show draft content automatically. Full steps, the environment-variable table and post-deploy checks are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). CI (lint, typecheck, tests, build) runs on every push via GitHub Actions.
