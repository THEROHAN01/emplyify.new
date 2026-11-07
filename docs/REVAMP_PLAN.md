# Website revamp plan (Nov 2026)

Branch: `revamp/pan-india-recruitment`. Source of truth: the Emplyify Business Document (Claude Doc), with the brand book (`../brand/brand-kit/`), the company profile brochure (`Connecting-Talent-Building-Teams.pdf`) and the competitor analysis (`company-setup/Emplyify-Competitor-Analysis.docx`) as supporting material.

## Why

The site was built as "the AI-native hiring partner for India's tech and GCC teams": four tech-only services, six engineering role families and three cities. The business document describes a different company: a Pune-based, pan-India recruitment and staffing firm for IT and Non-IT roles, permanent and contract, with six services and a five-person team. Most of the copy, the service catalogue and the pricing plans no longer match.

## Decisions

| Question | Decision | Basis |
|---|---|---|
| Positioning | Lead with pan-India IT and Non-IT recruitment and staffing. Keep GCCs as one client segment, not the headline. | Business document; brochure; competitor analysis (open quadrant: AI-assisted, experienced hiring) |
| Tagline | Connecting Talent. Building Teams. | Business document and brand book |
| Proof line | Screened shortlists in 48 hours. A real reply in 4 business hours. | Brand book; competitor analysis action 1 |
| Services | Six: permanent recruitment, contract staffing, IT and technical hiring, Non-IT recruitment, senior and leadership hiring, bulk and volume hiring. Talent Pods and GCC Hiring Sprints are retired as named products. | Business document "Services" |
| Pricing | Permanent fees published (8.33 / 12.5 / 16.67%). Contract, leadership and bulk fees shown as "quoted in writing" until the open questions are answered. | Business document "Pricing"; proof policy |
| 90-day replacement | Keep. The business document puts it in writing. | Business document (wins over the brand book's older caution) |
| Tech role pages (`/hire/*`) and city pages | Keep as the IT specialisms behind the IT hiring service; they carry SEO. | Existing traffic value |
| Team | Show all five on About and a team strip on the home page. Mayuri Patil shows initials until her photo arrives. | Business document "Team" |
| Brand | Brand-book palette (navy #071330, action blue #0062D6), Space Grotesk headlines, the five-colour brand bar under the header, circular team photos with coloured rings. | Brand book |
| Proof | Partner logos stay; metrics stay pending; no testimonials or invented numbers. | Proof policy |

## Changes, in order (one commit each)

1. **Brand foundation.** Tokens from the brand book in `globals.css`, Space Grotesk for display text, brand bar under the header. Contrast tests must still pass.
2. **Content model.** `site.ts` (tagline, positioning, description), six services in `services.ts`, pricing plans and FAQs in `pricing.ts`, the five team members in `team.ts`, and a new `company.ts` for industries, functions, the five-step process, sourcing channels, commitments, client stages and the comparison table. Navigation and icons follow.
3. **Home page.** New hero and copy; problems from the document; five-step process; six services; "IT and Non-IT" section (industries, functions, IT specialisms); who we serve; pricing preview; why Emplyify comparison; team strip; responsible AI; final CTA.
4. **Inner pages.** About (story, principles, team), How it works (five steps, channels, commitments), Hire index (IT specialisms plus Non-IT functions), GCC hub (offerings remapped to the new services), Pricing (four models, terms), service page visuals.
5. **Metadata and schema.** Titles and descriptions across pages; organisation schema description.
6. **Checks.** `npm run check`, visual pass in the browser at desktop and mobile widths.

## Not in this branch (needs answers first)

- Contract, leadership and bulk fee numbers.
- Phone number, registration numbers (Pvt Ltd, Maharashtra placement agency).
- Written logo approvals from the nine partners.
- Case studies (competitor analysis action 4).
- Hiring-desk cities beyond Pune.

## Phase 2: editorial redesign (layout modelled on rentahuman.ai)

Our content, colours and code; no copied assets, code or licensed fonts.

- Serif headlines (Newsreader, free) with Inter body text and small uppercase labels; square corners; ↗ arrow boxes on links.
- Wordmark: the brand-kit EMPLYIFY lock-up with the gradient first Y (cut from `brand/logo-full-transparent.png`, never retyped); a white version for dark backgrounds.
- Home: full-screen hero video under a transparent header, service picture cards, partner strip, brand-blue mission block with a turning ring of people (our logo motif), sticky "How it works" with a live step counter and steps revealed on scroll, a sideways-scrolling "Roles we fill" row, a video section with stat tiles, pricing and comparison, team grid, dark finale.
- Motion: muted looping videos that play only on screen, scroll reveals, slow ring rotation, header fade on scroll. All of it stops for visitors who prefer reduced motion.
- Videos: two free Pexels clips (19538635 and 6952048), trimmed to 10 seconds with no audio, in `public/media/`.
