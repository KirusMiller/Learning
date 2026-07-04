# Handoff brief — Kiryl PPC portfolio → Fable 5

> Paste this into a fresh Fable 5 (Claude Code) session to produce the detailed
> build plan and then scaffold the site. It is self-contained, but points to the
> full spec and a working design reference so you don't start cold.

---

## 0. Your mission

Produce a **detailed, phased implementation plan** for the *Kiryl* Amazon-PPC
personal-brand portfolio — reusing the `kirusmiller/bb` (Alina) Next.js
architecture and the **locked brand identity** — then, on approval, **scaffold
Phase 1**. Treat the decisions below as settled; don't re-open them. Where you
need a call the user must make, list it, don't guess.

**Primary deliverable:** a page-by-page plan with concrete file paths that mirror
`bb`'s conventions, plus a task breakdown per phase.

---

## 0a. First actions (do these in order)

1. Read `docs/ppc-portfolio-plan.md` in full, then this file's **§3** (decisions),
   **§9** (risks), **§10** (MVP), **§13** (data contracts), **§14** (definition of done).
2. Read `docs/brand/README.md`; open `docs/brand/identity-reference.html`; note
   `tokens.css` + the embedded fonts. This is the visual target — match it.
3. Try `add_repo kirusmiller/bb` and read its `CLAUDE.md` + `docs/`. **If you can't
   access it, use the cheat-sheet in §17** — do not block on it.
4. Confirm the **MVP scope (§10)** and collect the four user inputs (§8). If they're
   not yet supplied, proceed with clearly-marked `TODO(kiryl)` placeholders — never
   invent domains, contact details, or metrics.
5. Produce the **detailed page-by-page plan** (mirroring §12 tree, §13 contracts,
   §14 DoD) and get it approved **before** scaffolding.
6. On approval, scaffold **Phase 1** and deploy a Vercel preview.

---

## 1. Read these first (sources of truth)

1. **`docs/ppc-portfolio-plan.md`** (this repo, branch
   `claude/ppc-portfolio-website-plan-qgs83f`) — the full brief: positioning,
   audiences, IA, reuse map, tools, and the design system in **§9a**. Read it whole.
2. **`docs/brand/`** — the complete, **self-contained brand kit** (nothing
   ephemeral; see `docs/brand/README.md`):
   - `kiryl-mark.svg` — the mark (K-in-ring + breakthrough area-chart ascent).
   - `tokens.css` — brand color + font tokens, theme-aware.
   - `fonts/faces.css` (data-URI, drop-in) **or** `fonts/fonts.css` + `fonts/*.woff2`
     (file-based) — the embedded fonts. **Use these; do not fetch fonts from a CDN.**
   - `identity-reference.html` — a full working render of the identity (lockup,
     mark variants, favicon sizes, homepage mock, palette + type). **Lift the
     tokens, the mark `<symbol>`, the motif, and component CSS from here verbatim.**
   - Heed the README's gotchas (esp. SVG gradient stops must use `currentColor`).
3. *(Optional preview)* rendered identity artifact —
   `https://claude.ai/code/artifact/028a5270-92e9-4561-8e45-4d4d5fdadfbc`
   (same content as `identity-reference.html`; the repo copy is canonical).
4. **Reference codebase:** `kirusmiller/bb` (aka `lashwarszawa-pl`) — the Next.js
   16 static-export multilingual site whose architecture we mirror. Add it with
   `add_repo` if it isn't in your session; read its `CLAUDE.md`.

---

## 2. What we're building (one paragraph)

A personal-brand portfolio for **Kiryl**, an Amazon PPC specialist whose wedge is
**helping brands win on Amazon's European marketplaces**. Goal: build **name
awareness** across Polish specialists/agencies, Polish English-speaking business,
European & American brands selling into the EU, and Russian-speaking sellers — and
convert it into inbound messages. **Trilingual EN/RU/PL. Fully static.** Sections:
Home, Cases, Tools (4 client-side calculators), Blog ("Log"), About, Contact.

---

## 3. Locked decisions (do not re-litigate)

- **Audience/positioning:** personal brand "Kiryl"; wedge = *Amazon EU*.
- **Languages:** EN / RU / PL; **default `/` → `/en/`** (drop Alina's Ukrainian).
- **Hosting/stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript ·
  **static export (`output: 'export'`) → Vercel** (account connected).
- **Tools:** 4 — search-term, dayparting, ASIN-comparison, reports (weekly/monthly/
  YoY). All process the user's CSV **client-side**; **no AI/server** → site stays
  fully static. Migrate **one at a time**, from Lovable (Vite/React/Tailwind/shadcn)
  and Google AI Studio (React) — rebuild as needed.
- **Lead flow:** "message me" — **email · WhatsApp · LinkedIn**; persistent floating
  button + contact page (reuse `bb`'s `CTALinks`/`FloatingButtons`/`lib/links.ts`).
- **Cases:** real results, **anonymized** ("a DE supplement brand"). Markdown
  frontmatter with before/after ACOS/TACOS/ROAS → auto-rendered metric cards +
  before/after + chart.
- **Domain:** one canonical domain + hreflang (no multi-domain SEO). Recommended
  `kirylppc.com`; `Kiryl.pl` owned → 301 to canonical. *Purchase pending user.*
- **Design:** "Bold Editorial", **Balanced register** — see §5 + plan §9a.
- **New repo** for the site, scaffolded from `bb`'s skeleton (not a fork of lash content).

---

## 4. Architecture to reuse (mirror `bb`'s conventions)

- `app/[lang]/…` static locale routing; `generateStaticParams()` exports en/ru/pl;
  `vercel.json` HTTP redirect for bare `/` → `/en/`.
- **Single sources of truth:** `lib/config.ts` (brand/contact/flags),
  `lib/text.ts` + `lib/locales/{en,ru,pl}.ts` (typed copy — a missing key **fails
  the build**).
- **Content pipeline:** markdown in `content/{lang}/**` via `lib/blog.ts`
  (gray-matter + marked); drafts + `scripts/publish-post.mjs` + `validate-content.mjs`.
- **SEO/infra:** `lib/schema.ts` JSON-LD (swap `BeautySalon` → **`Person` /
  `ProfessionalService`** + `Article`), `app/sitemap.ts`, `app/robots.ts`,
  hreflang, analytics (GTM), cookie consent.
- New surfaces to add: `/tools` hub + 4 tool routes, `/cases` index + `[slug]`,
  a `MetricCard`/results grid, CSV upload/parse UI, the area-chart component.

---

## 5. Design system (summary — full spec in plan §9a, code in `docs/brand/`)

- **Register:** modern **but moneyed** — reads as *serious money* to PL/EU/US.
  Navy anchor = cross-market finance trust; a signal-blue trendline is the motif.
- **Color tokens (light):** `--paper #EFEEEA`, `--surface #FBFAF6`, `--ink #191B22`,
  `--muted #62636B`, `--navy #22407A` (brand), `--signal #2E6BE6` (trendline/accent),
  `--good #2F6B4E` (data only), `--brand-line #DEDBD2`. Dark variants in §9a.
  Theme-aware via `prefers-color-scheme` + `data-theme` overrides.
- **Type (embed as `@font-face` data URIs — CSP blocks font CDNs; pull via
  `@fontsource` on npm, the CDN is egress-blocked):** Display/wordmark =
  **Bricolage Grotesque** (700/800); Editorial/metrics/serif-K = **Fraunces**
  (400/600/900 + italic); Figures = mono, tabular; **Anton** reserved.
- **Mark:** serif **K in a ring** (status) whose upper arm is a small **area chart
  breaking through the ring** (growth). Navy ring/K, **navy tonal gradient fill,
  signal-blue rising line + endpoint point**. Variants: primary / reversed / mono /
  flat; **≤16px drops the gradient** for a clean favicon. The mark *is* the motif.
- **Motif:** the same area chart (line + gradient fill + endpoint) as keyword
  underlines, metric cells, dividers. Never a bare squiggle.
- **⚠️ Build gotcha:** drive SVG gradient stops from **`currentColor`**, not a CSS
  `var()` — inside an SVG `<use>` shadow tree, `var()` on `stop-color` falls back
  to black. (Cost us a round; the artifact already uses the fix.)
- **Layout:** confident hero → serif, rule-lined, tabular-number proof. One accent,
  used sparingly. Semantic green stays separate from the brand.
- **Optional add-ons** (not core): gold "audited results" **seal** on case studies;
  a metrics **ticker** homepage band.

---

## 6. Information architecture

```
/[lang]/                      Home — hero + results bar + featured cases + tool teasers + CTA
/[lang]/cases/                Case-study index (filter by marketplace/niche/result)
/[lang]/cases/[slug]/         Case study (before→after metrics + chart)
/[lang]/tools/                Tools hub
/[lang]/tools/search-terms/   Search-term analysis        (client-side CSV)
/[lang]/tools/dayparting/     Dayparting analysis          (client-side CSV)
/[lang]/tools/asin-compare/   ASIN comparison              (client-side CSV)
/[lang]/tools/reports/        Reports — weekly/monthly/YoY (client-side CSV)
/[lang]/blog/                 The "Log" — index
/[lang]/blog/[slug]/          Post
/[lang]/about/                About Kiryl
/[lang]/contact/              Contact — email · WhatsApp · LinkedIn
```

---

## 7. Suggested phasing (expand into concrete tasks)

- **P1 Scaffold:** new repo from `bb` skeleton; en/ru/pl; layout shell + nav with
  the mark; brand tokens + embedded fonts; favicon set; deploy to a Vercel preview.
- **P2 Content spine:** Home (hero + results bar + CTA), About, Contact; blog
  pipeline live with 1–2 seed posts.
- **P3 Cases:** frontmatter data model + 2–3 anonymized cases + before/after chart.
- **P4 Tools:** migrate one-by-one from Lovable/AI Studio; `/tools` hub + inline
  lead capture; all client-side.
- **P5 Polish/SEO:** hreflang, JSON-LD (Person), sitemap, OG images, analytics,
  consent, performance; domain + redirects.

---

## 8. Inputs still needed from Kiryl (list, don't invent)

- **Domain:** confirm/purchase `kirylppc.com` (+ optional `kiryl.pro`).
- **Contact details:** real email, WhatsApp number, LinkedIn URL for `lib/config.ts`.
- **Tool order:** which of the 4 tools to migrate first.
- **Tool source:** GitHub-export/URLs for the Lovable + AI Studio tools when ready.

---

## 9. Risks & weaknesses (recorded on purpose — weigh before/while building)

Honest assessment. None is a blocker; several change *what "done" should mean*.
Severity is rough (H/M/L). Fable: surface these in the plan, don't silently paper
over them.

### 9.1 Idea-level (strategic — the user's call)

- **[H] Distribution gap — the site is the *close*, not the *reach*.** PPC clients
  arrive via referrals, LinkedIn, marketplaces and seller communities, then check
  the site to vet you. A portfolio doesn't *create* awareness (the stated #1 goal)
  on its own. → The site must *support* a channel (LinkedIn is the obvious lever for
  these audiences), not replace it. Needs a distribution plan the current scope lacks.
- **[H] Trilingual content is a permanent treadmill.** EN/RU/PL = 3× every post and
  case, with PPC jargon that's hard to translate well. The reuse gives the machinery,
  not the content. Likely failure mode: a "Log" that launches with 2 posts and goes
  stale — worse than none, and it undercuts the "big-money trust" register. →
  Consider **EN-first**, add RU/PL once cadence is proven.
- **[M-H] Free tools are commoditized *and* a liability.** "Everyone has tools."
  Beyond weak differentiation: a wrong number, or breakage when Amazon changes report
  formats, damages credibility — the opposite of intent. They're also perpetual
  maintenance. → Treat as supporting proof-of-competence, not the hook; add input
  validation + "report format as of <date>" notes; keep each tool's math reviewable.
- **[M-H] Anonymized cases are weak proof.** "A DE brand: 41%→24%" is unverifiable;
  the "audited results" seal is a claim, not evidence. Sophisticated buyers discount
  anonymous metrics. → One **named/verifiable** client (logo or quote) outweighs ten
  anonymous stats; pursue at least one.
- **[M] Four audiences, one site = dilution.** Polish peers/agencies (depth,
  subcontracting) vs. EU/US brands (results, polish) vs. RU sellers (native trust)
  want different things; copy serving all four may resonate with none. → Lead with
  one primary audience; treat others as secondary paths.
- **[L-M] Russian-language business content** can carry perception/payment friction
  with some Western clients in the current climate. → A conscious choice, not an
  accident; keep RU content walled to its locale.
- **[L-M] A first-name personal brand ("Kiryl") is diffuse to own/rank** (common name,
  `.com`/`.io` already taken). → `kirylppc.com` + consistent "Kiryl = Amazon PPC"
  repetition helps; don't expect to rank the bare name quickly.

### 9.2 Plan-level

- **[H] No growth/content strategy.** The plan is a build spec — no editorial
  calendar, SEO topic map, tool-discovery path, or distribution. For an awareness
  goal that's the missing half. → Add a "Distribution & content" section + a launch
  content count.
- **[M] Static-export vs. lead-capture tension.** "Fully static, no server" conflicts
  with "tools as lead magnets with email capture." → Reconcile explicitly: a
  third-party form/ESP embed (Formspree/ConvertKit/etc.) keeps it static; decide the
  provider before building the tools.
- **[M] Tool migration is under-scoped.** The Lovable/AI Studio tools are **unseen**;
  "drop-in React" is optimistic (generated code, shadcn deps, Vite→App-Router routing,
  CSV-parsing libs, state). Each may be a real port. → Budget per-tool; audit each
  before committing an estimate.
- **[M] Case data model assumes clean before/after.** Real PPC results are messy
  (seasonality, attribution, external factors). Too-neat "41→24%" invites skepticism
  or misrepresents. → Allow context/caveats fields; frame honestly.
- **[M] Maintenance/ownership burden.** A solo, possibly non-dev owner maintaining
  Next + MDX + 4 tools + i18n + CI validators is non-trivial; routine edits may need
  dev help. → Keep content in markdown/config; document a simple edit workflow; keep
  tools' surface small.
- **[M] No definition of done.** Phases but no acceptance criteria, launch content
  counts, or performance/SEO/a11y targets. → Add DoD per phase (e.g. Lighthouse ≥90,
  N seed posts, ≥2 cases, hreflang validated).
- **[L] Over-investment in identity vs. substance.** Many rounds on the mark; the
  About credibility, real case data and distribution are what convert. → Rebalance
  effort toward proof + content now that the identity is locked.

### 9.3 Execution / handoff-level

- **[Resolved] Ephemeral design assets** — fonts/tokens/reference now committed to
  `docs/brand/` (no dependency on the private artifact). ✔
- **[M] New repo is unspecified** — name, owner, and *who creates it* aren't defined;
  Fable will stall here. → User to name the repo (e.g. `kirusmiller/kirylppc`) before
  scaffolding.
- **[M] Planning docs are orphaned** in the `KirusMiller/Learning` (Java) repo on a
  feature branch. If that branch/PR is merged or deleted, the source of truth moves. →
  On repo creation, copy `docs/ppc-portfolio-plan.md`, `docs/fable5-handoff.md` and
  `docs/brand/` into the new repo as its canonical home.
- **[L-M] Reference repo (`kirusmiller/bb`) access + drift** — assumes Fable can
  `add_repo` it; it may also evolve after this snapshot. → Confirm access first; treat
  bb as a pattern reference, not a version-pinned dependency.
- **[L] Mark depends on Fraunces** — `kiryl-mark.svg` sets the `K` as `<text>`. →
  Outline it to a `<path>` for production (noted in `docs/brand/README.md`).
- **[Info gap] Unseen substance** — we never inspected the actual tools, the real case
  data, or Kiryl's credentials/experience for the About page. The plan can't specify
  what it hasn't seen; these arrive from the user during the relevant phases.

---

## 10. MVP / first release (recommended)

Ship a lean first release, then expand — this directly de-risks the trilingual and
tool-migration weaknesses (§9). **Propose this cut in your plan; let the user veto.**

- **Languages:** **EN only** at launch. Build the i18n structure (`app/[lang]/…`) so
  RU/PL slot in later without refactor, but don't author RU/PL content yet.
- **Pages:** Home · About · Contact · Cases index + **2 cases** · Tools hub + **1 tool**
  (recommend the simplest: search-term analysis) · Blog + **3 seed posts**.
- **Fast-follow (post-launch):** the other 3 tools (one at a time), RU then PL locales,
  more cases/posts.
- **Why:** prove one tool's migration and a sustainable content cadence before
  multiplying either. A small, polished, *full* site beats a large, half-empty one.

---

## 11. Non-goals (out of scope — do not build)

No backend/server, no database, no CMS, no **AI/LLM** calls, no user accounts/login,
no e-commerce/payments, no comments, no server-side form processing, no multi-domain
content. The site stays a **static export**. Lead capture and the contact form use a
**third-party embed** (see §15), not a server.

---

## 12. Target repo file tree (mirror `bb`)

```
kirylppc/                       # NEW repo (name = user input, §8)
├─ app/
│  ├─ [lang]/
│  │  ├─ layout.tsx             # fonts, metadata, Person/ProfessionalService JSON-LD, consent
│  │  ├─ page.tsx               # Home: hero + results bar + featured cases + tool teasers + CTA
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ cases/page.tsx         # index
│  │  ├─ cases/[slug]/page.tsx  # MDX/md case + before→after + chart
│  │  ├─ tools/page.tsx         # hub
│  │  ├─ tools/[tool]/page.tsx  # or one route per tool
│  │  ├─ blog/page.tsx
│  │  └─ blog/[slug]/page.tsx
│  ├─ globals.css               # Tailwind v4 @theme = brand tokens (from docs/brand/tokens.css)
│  ├─ sitemap.ts · robots.ts · icon.svg · apple-icon.png
├─ components/                  # Header/Footer/Nav/Hero/ResultsBar/MetricCard/CaseCard/
│                               #   AreaChart/Mark/FloatingButtons/CTALinks/LangSwitcher …
├─ content/
│  ├─ cases/{en}/*.md
│  └─ blog/{en}/*.md            # (ru/pl added later)
├─ lib/
│  ├─ config.ts                 # single source: brand, contact, markets, feature flags
│  ├─ text.ts + locales/{en,ru,pl}.ts   # typed copy (missing key fails build)
│  ├─ cases.ts · blog.ts        # build-time content pipelines (gray-matter + marked)
│  ├─ schema.ts                 # JSON-LD builders
│  └─ links.ts · analytics.ts
├─ tools/                       # migrated tool components + CSV parsers (client-side)
├─ public/                      # favicons (16/32/180/512 + .ico + maskable), og images
├─ scripts/                     # validate-content.mjs, publish-post.mjs (from bb)
├─ vercel.json                  # bare "/" → "/en/" redirect + headers
└─ next.config.js               # output: 'export'
```

---

## 13. Data contracts

### Case study frontmatter (`content/cases/en/*.md`)

```yaml
title: "From 41% ACOS to 24% in a quarter"
client_label: "DE supplement brand"     # anonymized unless a named case is provided
marketplace: ["DE"]                       # DE/FR/IT/ES/UK/US…
category: "Supplements"
duration: "Q1 2026 · 3 months"
spend_managed: "€2.4M"                     # string w/ currency, or number + currency field
verified: false                           # true only for a real, named/permission'd case
context: "Seasonal ramp; broad-match heavy at start."   # honesty caveat (see §9)
before: { acos: 41, tacos: 18, roas: 2.4, sales: 0 }
after:  { acos: 24, tacos: 11, roas: 4.1, sales: 0 }
highlights: ["Rebuilt search-term structure", "Added dayparting", "Shifted spend to converters"]
```
→ renders MetricCards + before/after + an area chart. **All numbers are `TODO(kiryl)`
until real data is supplied — never invent metrics.**

### Blog post frontmatter (`content/blog/en/*.md`)

```yaml
title · slug · date · updated · description · lang · draft · related: [slug…] · tags: […]
```
Mirror `bb`'s `lib/blog.ts` fields exactly; reuse its drafts + publish/validate scripts.

### Tool input contracts (client-side CSV — confirm against the real tools, which are unseen)

Each tool parses the user's uploaded CSV **in the browser** (nothing uploaded to a
server — state this on the page as a trust point). Expected sources:

| Tool | Amazon source (typical) | Key columns |
|---|---|---|
| Search-term | SP Search-Term Report | Customer Search Term, Match Type, Impressions, Clicks, Spend, 7-Day Sales, Orders, ACOS |
| ASIN compare | Advertised-Product / Business Report | ASIN/SKU, Impressions, Clicks, Spend, Sales, Orders, Sessions, CVR, ACOS |
| Reports (W/M/YoY) | Bulk / Business reports | date/period, Spend, Sales, Orders, ACOS, TACOS |
| **Dayparting** | ⚠️ **hour-level data is NOT in standard Amazon exports** | needs Amazon Marketing Stream or the tool's own export — **confirm the real tool's input with Kiryl before building** |

→ Do not finalize columns until each Lovable/AI-Studio tool is in hand; treat the table
as a starting contract, validate on a real sample file, and handle malformed CSVs with a
clear error, not a crash.

---

## 14. Definition of Done

**Global gates (every phase):** `npm run typecheck && npm run lint && npm run
validate:content` pass · static export builds clean · deploys to a Vercel preview ·
no console errors · **all copy real, no lorem** · keyboard focus + `prefers-reduced-motion`
respected · light **and** dark pass contrast · Lighthouse (mobile) ≥ 90 perf/SEO/best-
practices, a11y ≥ 95.

**Per phase:**
- **P1 Scaffold** — EN shell renders; nav+footer+mark+favicon set; theme toggle; tokens
  + embedded fonts wired from `docs/brand/`; Vercel preview live.
- **P2 Content spine** — Home (hero + results bar + CTA), About, Contact with **real
  copy**; blog pipeline live with ≥1 post; contact channels (email/WhatsApp/LinkedIn) work.
- **P3 Cases** — ≥2 cases render from frontmatter with before→after + area chart; index
  filters work.
- **P4 Tools** — ≥1 tool runs end-to-end on a **real sample CSV**, fully client-side, with
  input validation + graceful errors; lead-capture embed wired.
- **P5 Polish/SEO** — hreflang + sitemap valid; JSON-LD (Person/ProfessionalService +
  Article); OG images; analytics + consent; canonical domain + redirects.

---

## 15. Specifics to lock (decide in the plan)

- **i18n fallback:** an untranslated page is **hidden** from that locale's nav + sitemap
  (no empty pages, no auto-machine-translation). Only ship a locale's page when its
  content exists.
- **Analytics:** default to **Vercel Analytics + Speed Insights** (already `bb` deps,
  cookieless — lighter consent burden) rather than GTM/GA4, unless the user wants Google
  Ads/GTM. Confirm.
- **Consent:** if analytics stay cookieless, a full cookie-consent gate may be
  unnecessary (a short privacy note suffices) — verify for EU/PL before deciding.
- **SEO/JSON-LD:** `Person` + `ProfessionalService` on Home/About; `Article`/`BlogPosting`
  on posts; `BreadcrumbList`; per-locale `hreflang`; OG images (static or build-generated).
- **Lead capture (reconciles static ✕ capture):** "message me" primary via `mailto:` /
  WhatsApp deep link / LinkedIn (no server); the contact form + tool email-capture use a
  **third-party form/ESP embed** (e.g. Formspree / Tally / ConvertKit). **Provider =
  user input.**

---

## 16. Seed copy & voice (so nothing ships as lorem)

**Voice:** modern but moneyed; senior operator/analyst; specific and numbers-first; active
voice; no hype, no exclamation. EN is primary; RU/PL match register, not literal wording.

**Seed EN copy (placeholders marked — replace with real, verifiable values):**
- H1: **"Ad spend, turned into profit — on Amazon Europe."**
- Sub: "I run Amazon PPC like a P&L across DE, FR, IT, ES and UK — and show the numbers."
- Results bar: `€TODO spend managed` · `−TODO pts avg ACOS` · `TODO× avg ROAS`
- Primary CTA: **"Message me"**
- Meta title: `Kiryl — Amazon PPC specialist · EU marketplaces`
- Meta description: "Amazon PPC specialist helping brands turn ad spend into profit across
  Europe's marketplaces. Case studies, free tools, and a specialist who shows the numbers."

⚠️ The results-bar and case metrics are **`TODO(kiryl)`** until real numbers are supplied
(§9: unverifiable/placeholder metrics must not ship as if real).

---

## 17. `bb` conventions cheat-sheet (use if you can't access the repo)

- **Stack:** Next.js 16 App Router · React 19 · **Tailwind v4** (`@import "tailwindcss"` +
  `@theme` block in `app/globals.css`) · TypeScript · **`output: 'export'`**; build does
  `next build && mv out dist` (+ copies a branded `404.html`).
- **Locale routing:** `app/[lang]/{layout,page}.tsx`; `generateStaticParams()` exports the
  locales; URLs `/en/ /ru/ /pl/`; bare `/` → default via an **HTTP redirect in
  `vercel.json`** (not meta-refresh). `/` 404s in dev — navigate to `/en/`.
- **Single sources of truth:** `lib/config.ts` (brand/contact/flags); `lib/text.ts` +
  `lib/locales/{}.ts` typed copy — **a missing key fails the build**.
- **Content:** markdown in `content/{lang}/**` via `lib/blog.ts` (gray-matter + `marked`);
  `content/_drafts/**` invisible to build/CI; `scripts/validate-content.mjs` (CI gate) +
  `scripts/publish-post.mjs` (drafts→published).
- **SEO/infra:** `lib/schema.ts` JSON-LD; `app/sitemap.ts` + `app/robots.ts` generated at
  build; `public/llms.txt` maintained by hand; analytics helper in `lib/analytics.ts`;
  consent components present.
- **Components:** server-first; `client` only where interactive; section links are
  `/${lang}/#id`; a shared `SectionHeader`; CTA interactivity isolated in `CTALinks`.
- **What we change for Kiryl:** locales en/ru/pl (drop uk); default `/en/`; swap
  `BeautySalon` schema → `Person`/`ProfessionalService`; replace `next/font` with our
  embedded faces (`docs/brand/fonts/`); brand tokens from `docs/brand/tokens.css`; add
  `/tools` + `/cases`.

---

## 18. Environment & commands · glossary

**Env:** Node 20+, npm. Scripts (mirror `bb`): `dev` (`next dev -p 3000 -H 0.0.0.0`),
`build` (`next build && mv out dist`), `typecheck` (`tsc --noEmit`), `lint` (eslint,
incl. `jsx-a11y`), `test` (vitest), `validate:content`, `publish:post`. Fonts: use
`docs/brand/fonts/` (or regenerate via `npm pack @fontsource/{fraunces,bricolage-grotesque,anton}`).
Deploy: Vercel (static export → `dist`).

**PPC glossary (use consistently across locales):** **ACOS** = ad spend ÷ ad sales ·
**TACOS** = ad spend ÷ *total* sales · **ROAS** = ad sales ÷ ad spend · **ASIN** = Amazon
product ID · **dayparting** = adjusting bids by hour/day-of-week · **SP/SB/SD** = Sponsored
Products / Brands / Display.
