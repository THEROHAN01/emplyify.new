# Security and data protection

## In the code

| Control | Where |
| --- | --- |
| HSTS (2 years, preload), `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP | `next.config.ts` |
| Content-Security-Policy: `default-src 'self'`, pinned origins for Plausible, PostHog, Turnstile and Cal.com, `frame-ancestors 'none'`, `object-src 'none'`, `form-action 'self'` | `next.config.ts` |
| Same-origin check on all form APIs (CSRF) | `lib/security/request.ts` |
| Rate limits per IP and endpoint (5–30 per window) | `lib/security/rate-limit.ts`, `guard.ts` |
| Cloudflare Turnstile verified server-side; honeypot field | `integrations/turnstile.ts`, `ui/field.tsx` |
| JSON body cap of 64 KB; upload cap of 5 MB | `lib/security/api.ts`, `api/apply` |
| CV type checked by magic bytes, not just extension; private bucket; unguessable paths; 10-minute signed URLs | `lib/security/upload.ts`, `integrations/supabase.ts` |
| No raw IPs stored (salted SHA-256) | `lib/security/request.ts` |
| Logs carry ids and counts, never personal data or prompt text | `integrations/logger.ts`, `ai/client.ts` |
| Supabase RLS on every table (deny by default); service role used server-side only | `supabase/migrations/0001_init.sql` |
| Prompt-injection hygiene: untrusted text wrapped in tags and labelled as data | `lib/ai/*` |
| JSON-LD escapes `<` | `components/seo/json-ld.tsx` |

## Known trade-offs

- **CSP allows `'unsafe-inline'` scripts.** Nonces would make every page dynamic, losing static generation and the LCP budget. Mitigations: no user-generated HTML is rendered, every external origin is pinned, and `frame-ancestors`, `object-src` and `base-uri` are locked.
- **The rate limiter is per instance** (in-memory). For a global limit, put the store in Upstash Redis. Turnstile is the main bot defence.

## Owner actions before launch

- [ ] Set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (forms accept everything without them)
- [ ] Set a random `IP_HASH_SALT`
- [ ] Turn on MFA for every Supabase, Vercel, HubSpot and Google Workspace account
- [ ] Add malware scanning on the `cvs` bucket (see ARCHITECTURE → CV pipeline)
- [ ] Enable Dependabot or Renovate; patch monthly
- [ ] Turn on Supabase PITR backups and test a restore every quarter
- [ ] Sign DPAs with Vercel, Supabase, HubSpot, Resend, Anthropic, Cloudflare and the analytics vendor
