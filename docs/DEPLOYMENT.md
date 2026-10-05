# Deploying to Vercel

The repo is deploy-ready: `vercel.json` pins functions to Mumbai (`bom1`), sets `npm ci` + `npm run build`, and gives the CV-upload and AI routes longer timeouts. GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, tests and a build on every push and PR.

## 1. Import the project (about 2 minutes)

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Import **THEROHAN01/emplyify.new**. If it isn't listed, choose **Adjust GitHub App Permissions** and grant access to the repo.
3. Leave **Framework preset: Next.js** and **Root directory: `./`**. Build settings come from `vercel.json`.
4. Add the production environment variables below, then click **Deploy**.

From then on, every push to `main` deploys to production, and every PR gets a preview URL.

## 2. Environment variables

The site builds and runs with **none** of these set: forms complete and integrations log "skipped". Add them as each account is ready (Project → Settings → Environment Variables).

| Variable                                                                                          | Environments                                   | Notes                                                                                                                                         |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                                                            | Production                                     | `https://emplyify.com` once the domain is attached. Before that it falls back to the Vercel production URL.                                   |
| `IP_HASH_SALT`                                                                                    | Production, Preview                            | Any long random string. **Set before launch.**                                                                                                |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`                                          | Production, Preview                            | Cloudflare → Turnstile. Add the Vercel domains to the widget.                                                                                 |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_BRIEF_FORM_ID`, `HUBSPOT_CONTACT_FORM_ID`, `HUBSPOT_REPORT_FORM_ID` | Production                                     | Create the forms and the `emplyify_*` contact properties first.                                                                               |
| `RESEND_API_KEY`, `EMAIL_FROM`, `INTERNAL_ALERT_EMAIL`                                            | Production                                     | Verify the sending domain in Resend (SPF/DKIM).                                                                                               |
| `SLACK_LEADS_WEBHOOK_URL`                                                                         | Production                                     | Incoming webhook for the leads channel.                                                                                                       |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_CV_BUCKET`                                 | Production (+ Preview with a separate project) | Apply `supabase/migrations/0001_init.sql` first. Use a Supabase project in the Mumbai region.                                                 |
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`                                                            | Production, Preview                            | Optional; AI features fall back to heuristics without it.                                                                                     |
| `NEXT_PUBLIC_CAL_LINK`, `NEXT_PUBLIC_CAL_LINK_GCC`                                                | Production, Preview                            | Cal.com event URLs.                                                                                                                           |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`                                                                     | Production, Preview                            | International format, digits only, e.g. `919800000000`.                                                                                       |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_POSTHOG_KEY` (+ `_HOST`)                           | Production                                     | Enables the cookie banner and consent-gated analytics.                                                                                        |
| `CONTENT_PREVIEW`                                                                                 | —                                              | Not needed on Vercel: previews (`VERCEL_ENV=preview`) show drafts automatically and send `robots: disallow`. Set to `false` to turn that off. |

`NEXT_PUBLIC_*` values are inlined at build time, so **redeploy** after changing them.

## 3. Domain

Project → Settings → Domains → add `emplyify.com` and `www.emplyify.com` (redirect www → apex), then set the DNS records Vercel shows. HSTS preload is already sent, so serve only over HTTPS.

## 4. After the first deploy

- [ ] Open `/`, `/pricing`, `/submit-a-role` and a role page on the production URL. Submit a test brief and check HubSpot, email and Slack.
- [ ] Confirm `/robots.txt` allows crawling on production and blocks it on a preview URL.
- [ ] Run Lighthouse (mobile) against production and record the scores in `LAUNCH_CHECKLIST.md`.
- [ ] Submit `https://emplyify.com/sitemap.xml` in Google Search Console.
- [ ] Turn on Vercel Analytics / Speed Insights for real-user Web Vitals.
- [ ] Optional: in Settings → Git, require the **CI** check before production promotion.

## Deploying from a Claude session instead

This cloud environment blocks `api.vercel.com`. To let Claude deploy with the Vercel CLI:

1. Add `api.vercel.com` and `vercel.com` to the environment's allowed domains.
2. Add a `VERCEL_TOKEN` secret (Vercel → Account Settings → Tokens).
