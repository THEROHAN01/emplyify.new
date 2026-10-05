@AGENTS.md

# Emplyify website — working notes

- Read `docs/ARCHITECTURE.md` before structural changes; launch status lives in `docs/LAUNCH_CHECKLIST.md`.
- Pages read content only via `src/lib/content` (CMS boundary). Don't import `src/content/*` into client components — pass props from the server.
- Never add fake proof: metrics stay `null` until real, case studies and logos need client approval, jobs stay `draft` until real.
- CTA labels come from `ctas` in `src/content/site.ts` (playbook vocabulary only).
- Run `npm run check` before committing.
