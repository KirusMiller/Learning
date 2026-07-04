# Kiryl PPC portfolio — implementation plan (v1, for approval)

> Produced by Fable 5 from `docs/fable5-handoff.md` + `docs/ppc-portfolio-plan.md`
> + `docs/brand/` + a live read of `kirusmiller/bb` (cloned at `e26aa5c`).
> Status: **awaiting approval — no site code written, no repo created.**
>
> Locked decisions (handoff §3) and the brand identity are treated as settled and
> reused as-is. Everything below either implements them or flags a delta explicitly.

---

## 0. TL;DR — what you're approving

1. **EN-only MVP** (handoff §10 cut, confirmed with two small amendments — §2).
2. A **new repo** scaffolded to mirror `bb`'s conventions with the deltas listed in §1
   — full tree in §3, page-by-page spec in §4.
3. Six **proposed locks** for the §15 open items (analytics, consent, lead capture,
   i18n fallback, tool routing, OG images) — summarized in §10.
4. A **distribution & content strategy** (§11) — the half the brief was missing.
5. A **phase plan with per-phase Definition of Done** (§12) and a risk register (§13).
6. The **inputs I need from you**, mapped to the phase each one blocks (§14).

Approval checklist for you at the very end (§15).

---

## 1. Where I challenge the brief

I read the brief looking for what I'd do differently, not just what to comply with.
None of these re-open the §3 locks; they're implementation-level deltas plus two
strategy-level pushes.

### 1.1 Architecture deltas (I plan to do these unless you object)

| # | Brief says | I propose | Why |
|---|---|---|---|
| D1 | `tools/[tool]/page.tsx` *"or one route per tool"* | **One static route per tool** (`app/[lang]/tools/search-terms/page.tsx`, …) | Per-tool metadata/SEO titles, and Next code-splits each tool's client bundle to its own page — the CSV parser never loads on the homepage. Also mirrors `bb`'s static-first style (no dynamic segments except content slugs). |
| D2 | Reuse `BeforeAfterSlider` for case before/after | **Don't.** Build `MetricDelta` cells (`41 → 24%`) + the brand `AreaChart` | `BeforeAfterSlider` is a photo-comparison widget; metrics aren't images. The identity reference's homepage mock already shows the right pattern (metric cells + trendline) — I'll match that instead. |
| D3 | (implied) charting for cases/tools | **No chart library.** Hand-rolled SVG: `AreaChart` (the brand motif, lifted from `identity-reference.html`) + a tiny `Sparkline` | The motif *is* the chart. Recharts/visx would add ~100KB+ to ship a look we'd then fight to re-skin. Tools' tabular output needs tables more than charts; add a lib later only if a tool truly needs it. |
| D4 | Tools migrate from Lovable "as drop-in React" | **Port the math, rebuild the UI.** No shadcn/ui import | The brief itself flags this risk (§9.2). Two design systems in one repo is permanent debt. The valuable part of each tool is its analysis logic — extract it into pure, unit-tested functions; render with our components. |
| D5 | Blog frontmatter incl. `tags · lang · draft` (handoff §13) | **Mirror `bb`'s actual fields** (`title/description/date/updated/cover/faq/related`); lang = folder, drafts = `_drafts/` folder, no tags | Handoff §13 also says "mirror `bb`'s `lib/blog.ts` fields exactly" — the two lines conflict; `bb`'s real pipeline wins. Tags add nav surface we don't need at this content volume. |
| D6 | Cases index "filter by marketplace/niche/result" | **No filters at MVP** — plain index; add client-side filters at ≥6 cases | Filtering 2 items is anti-signal (it advertises how little there is). The frontmatter carries the filter fields from day one, so adding filters later is UI-only. |
| D7 | Analytics via GTM (plan §9) | **Vercel Analytics + Speed Insights, cookieless; no GTM/GA4, no cookie banner** | Handoff §15 already leans this way; I'm locking it. It deletes `bb`'s ConsentGate/CookieConsent/GTM plumbing, drops the consent burden to a privacy note, and keeps Lighthouse happy. If you later run Google Ads, GTM can be added back in one component. |
| D8 | Tools double as lead magnets with email capture | **MVP tools have no email capture.** CTA = "Message me". ESP embed deferred to post-MVP | The static-vs-capture tension (§9.2) is real but premature: with zero traffic, an ESP integration is maintenance without upside. Ship the tool, watch usage, then pick the provider (your input) with real volume data. |
| D9 | `content/{lang}/**` (bb layout) | `content/{blog,cases}/{lang}/**` | We have two content types; `bb` has one. One extra directory level, same pipeline code pattern. Scripts (`validate-content.mjs`, `publish-post.mjs`) get adjusted paths. |

### 1.2 Strategy pushes (your call, but I feel strongly)

**P1 — The site must ship pointing at a channel, or it's a brochure.**
The brief's #1 goal is *awareness*, and §9.1 admits the site doesn't create it. My
plan therefore treats **LinkedIn as the product and the site as its landing layer**
(full strategy in §11). Concretely, this changes the build: every case study and
log post is designed to be derived *from* a LinkedIn post (not the reverse), CTA
click-through gets measured per channel from day one, and launch is a content
event, not a deploy.

**P2 — The honesty gate is structural, not editorial.**
Anonymous metrics are weak proof (§9.1) and placeholder metrics shipping as real
would be worse. So the plan enforces it in code: the homepage **results bar is
feature-flagged off** until you supply real numbers; case frontmatter has a
**required `context` caveat field** and a `verified` flag that is `false` unless a
named, permissioned client exists; and `validate-content.mjs` **fails the build if
`TODO(kiryl)` appears in published content**. The launch gate (§12, P5) includes
"pursue one named/verifiable proof" as an explicit task, not a hope.

**P3 — One real finding the brief missed: the brand fonts can't spell the brand's
third audience.** The committed subsets are **latin-only**, and it's worse than a
subsetting issue: **Bricolage Grotesque and Fraunces don't have Cyrillic glyphs at
all**. PL is solvable (swap in `latin-ext` subsets from the same `@fontsource`
packages — ~same size). RU is not: when the RU locale launches, every heading and
serif metric falls back to system fonts, i.e. **the locked identity degrades
precisely for the native-trust audience**. Options when RU becomes real: (a) accept
a deliberate system-serif fallback stack for RU, (b) pick a Cyrillic companion face
for RU only, or (c) demote RU. Nothing to decide now — but it belongs in the RU
go/no-go decision, so I'm putting it on the record. (MVP is EN-only; unaffected.)

---

## 2. MVP scope (proposed — handoff §10, confirmed + two amendments)

**Languages:** EN only. Full `app/[lang]/` i18n machinery built; only `en` is
generated, advertised in hreflang, or present in the sitemap (see §8).

**Pages at launch:**

| Route | Content at launch |
|---|---|
| `/en/` | Hero + (flagged) results bar + featured cases + tools teaser + log teaser + CTA band |
| `/en/about/` | Real story + credentials (input needed) |
| `/en/contact/` | Email · WhatsApp · LinkedIn (input needed) |
| `/en/cases/` + 2 case pages | Real anonymized data (input needed) |
| `/en/tools/` + `/en/tools/search-terms/` | 1 live tool, end-to-end on a real sample CSV |
| `/en/blog/` + 3 posts | 3 seed posts (titles proposed in §11.4; drafted by me, fact-checked by you) |
| `404.html` | Branded, copied into `dist/` at build (bb convention) |

**Amendment A — tools teaser honesty:** the Tools hub and homepage teaser show only
the **one live tool**, with a single prose line about more coming — not four cards
with three "coming soon" badges. Empty-promise UI undercuts the moneyed register.

**Amendment B — the dayparting tool moves to the back of the migration queue**
regardless of preference order, until its input source is confirmed (handoff §13
already flags that hour-level data isn't in standard Amazon exports — if the
Lovable tool expects Marketing Stream data, its audience shrinks to sellers who
have that pipe, and the CSV contract is different).

**Fast-follow (post-MVP, in order):** second tool → ESP lead capture on tools →
more cases/posts → third tool → PL or RU locale (data-driven pick, §11.6) → fourth
tool → case filters at ≥6 cases.

---

## 3. Repo bootstrap & structure

**Repo:** new, name = your input (`TODO(kiryl)` — e.g. `kirusmiller/kirylppc`).
Scaffolded fresh, mirroring `bb` file-by-file where reused (same owner, so lifting
code is fine). First commit copies `docs/ppc-portfolio-plan.md`,
`docs/fable5-handoff.md`, this plan, and `docs/brand/` in as the canonical home
(fixes the orphaned-docs risk, §9.3).

```
kirylppc/                                # TODO(kiryl): real repo name
├─ app/
│  ├─ [lang]/
│  │  ├─ layout.tsx                      # html lang, metadata+hreflang, Person/ProfessionalService JSON-LD,
│  │  │                                  #   theme pre-paint script, Header/Footer/FloatingButtons, Vercel Analytics
│  │  ├─ page.tsx                        # Home (§4.1)
│  │  ├─ about/page.tsx                  # §4.6
│  │  ├─ contact/page.tsx                # §4.7
│  │  ├─ cases/page.tsx                  # §4.2
│  │  ├─ cases/[slug]/page.tsx           # §4.3
│  │  ├─ tools/page.tsx                  # §4.4
│  │  ├─ tools/search-terms/page.tsx     # §4.5 (one static route per tool — delta D1)
│  │  ├─ blog/page.tsx                   # §4.8
│  │  └─ blog/[slug]/page.tsx            # §4.8
│  ├─ globals.css                        # Tailwind v4 @import + @theme wired to docs/brand/tokens.css values
│  ├─ fonts.css                          # @font-face → /fonts/*.woff2 (from docs/brand/fonts/fonts.css)
│  ├─ sitemap.ts · robots.ts             # bb pattern, LAUNCHED_LOCALES-aware
│  ├─ icon.svg                           # flat mark variant (≤16px rule: no gradient)
│  └─ apple-icon.png
├─ components/
│  ├─ Header.tsx · Footer.tsx · MobileDrawer.tsx · LangSwitcher.tsx   # adapt from bb
│  ├─ FloatingButtons.tsx · CTALinks.tsx                              # adapt from bb (channels: WA/email/LinkedIn)
│  ├─ SectionHeader.tsx · AnimatedCount.tsx                           # bb verbatim/near-verbatim
│  ├─ Mark.tsx · Wordmark.tsx            # inline SVG <symbol> lifted from identity-reference.html
│  ├─ TrendUnderline.tsx · AreaChart.tsx · Sparkline.tsx              # the motif (SVG, currentColor gradient)
│  ├─ Hero.tsx · ResultsBar.tsx          # ResultsBar behind SHOW_RESULTS_BAR flag
│  ├─ MetricDelta.tsx · MetricCard.tsx · CaseCard.tsx · ToolCard.tsx
│  ├─ ThemeToggle.tsx                    # light/dark via data-theme + localStorage (tokens already support it)
│  └─ BlogCTAs.tsx · BlogInlineCTA.tsx · RelatedGuides.tsx            # adapt from bb
├─ content/
│  ├─ blog/en/*.md                       # + _drafts/blog/{lang}/ (bb drafts convention, one level deeper — D9)
│  └─ cases/en/*.md
├─ lib/
│  ├─ config.ts                          # single source: brand, contact (TODO), domain (TODO), flags:
│  │                                     #   LAUNCHED_LOCALES:['en'], SHOW_RESULTS_BAR:false, LIVE_TOOLS:['search-terms']
│  ├─ text.ts + locales/{en,ru,pl}.ts    # typed copy; ru/pl alias en at MVP (§8) — missing key fails build
│  ├─ locale.ts                          # hreflang/x-default→en, ogLocale; emits LAUNCHED_LOCALES only
│  ├─ blog.ts                            # bb verbatim, path adjusted to content/blog/
│  ├─ cases.ts                           # new pipeline, same shape as blog.ts (§5.1)
│  ├─ schema.ts                          # Person + ProfessionalService + BlogPosting + BreadcrumbList (§10.4)
│  ├─ links.ts                           # whatsappUrl (bb) + mailtoUrl + LinkedIn
│  ├─ analytics.ts                       # track('cta_click', {channel, page}) via @vercel/analytics
│  └─ tools/                             # ALL tool math lives here, pure + unit-tested (§7)
│     ├─ csv.ts                          # PapaParse wrapper: delimiter sniffing, BOM, EU decimal/currency normalize
│     ├─ search-terms.ts                 # analysis functions (ported from Lovable source)
│     └─ __fixtures__/search-terms.sample.csv
├─ components/tools/
│  └─ SearchTermsTool.tsx                # 'use client' island: dropzone → validate → results (§4.5)
├─ public/
│  ├─ fonts/*.woff2                      # copied from docs/brand/fonts/
│  ├─ favicon.ico · icons 16/32/180/512 + maskable   # from the flat mark
│  ├─ og-image.png                       # one static branded OG at MVP (§10.5)
│  ├─ llms.txt · 404.html
├─ scripts/
│  ├─ validate-content.mjs               # bb + cases rules + TODO(kiryl) gate (§5.3)
│  └─ publish-post.mjs                   # bb, paths adjusted
├─ docs/                                 # brand kit + briefs + this plan (canonical home)
├─ vercel.json                           # "/" → 308 → "/en/" + bb's security headers
├─ next.config.js                        # output:'export', images.unoptimized, trailingSlash (bb verbatim)
├─ package.json                          # bb deps − GTM bits + papaparse; scripts identical to bb
└─ tsconfig / eslint (jsx-a11y) / postcss # bb verbatim
```

**Dependency deltas vs `bb`:** add `papaparse` + `@types/papaparse` (Amazon CSVs
have quoted fields, BOMs, and locale quirks — hand-rolling CSV parsing is where
"wrong number" bugs come from). Remove nothing structural; GTM was config, not a dep.
Fonts: `next/font/google` (bb) is **replaced** by self-hosted `@font-face` per the
brand kit — no font CDN at build or runtime.

---

## 4. Page-by-page specification

Every page: server component, real copy from `lib/locales/en.ts` (typed), fonts
self-hosted, dark/light via tokens, `prefers-reduced-motion` respected by the
reveal/count animations (bb's `use-reveal` already does this), keyboard-focus
visible. Per-page metadata via `generateMetadata` with canonical + hreflang.

### 4.1 Home — `app/[lang]/page.tsx`

The identity reference's homepage mock is the target, section for section.

| Section | Components | Content / data | Notes |
|---|---|---|---|
| Eyebrow + Hero | `Hero`, `TrendUnderline`, `CTALinks` | H1 seed: **"Ad spend, turned into profit — on Amazon Europe."** ("profit" in Fraunces italic with the trendline underline, per mock). Sub + primary CTA "Message me", secondary "See the cases" | Copy keys `hero_*`; CTA fires `cta_click` |
| Results bar | `ResultsBar` → 3× `MetricCard` (`AnimatedCount`, `Sparkline`) | `spend managed · avg ACOS cut · avg ROAS` — **all `TODO(kiryl)`** | **Renders only when `SHOW_RESULTS_BAR` && real numbers exist** (push P2) |
| Featured cases | 2× `CaseCard` | `getAllCases('en')` top 2 (frontmatter `featured: true`) | Card = client_label, marketplace chips, headline `MetricDelta`, duration |
| Tools teaser | 1× `ToolCard` | The live tool only (Amendment A) + one-line "more in the works" | Links `/en/tools/search-terms/` |
| Log teaser | 3 post rows | `getAllPosts('en')` latest 3 | Title, date, description |
| CTA band | `CTALinks` | "Message me" — email/WA/LinkedIn | |

JSON-LD: none page-level (Person + ProfessionalService live in the layout, §10.4).

### 4.2 Cases index — `app/[lang]/cases/page.tsx`

`SectionHeader` + list of `CaseCard`s from `lib/cases.ts`, newest first. No filters
at MVP (D6). Metadata: "Case studies — Amazon PPC results across EU marketplaces".
An honest one-liner above the list: results are anonymized client accounts, with
context on each. BreadcrumbList JSON-LD.

### 4.3 Case detail — `app/[lang]/cases/[slug]/page.tsx`

`generateStaticParams` from `getCaseSlugs('en')`. Report register (Fraunces
editorial, rule-lined, tabular numbers):

1. Title + meta row: `client_label · marketplace(s) · category · duration · spend_managed`.
2. **Context paragraph** — the required honesty caveat (frontmatter `context`), styled
   as part of the report, not buried.
3. `MetricDelta` grid: before→after for `acos / tacos / roas` (+`sales` if present),
   green only on the improved figure (semantic `--good`, never brand).
4. `AreaChart` — the motif rendering the trajectory. **With only before/after points
   the chart is illustrative, not data** — so it renders from an optional
   `series: [..]` frontmatter array if supplied, else it's the decorative motif
   divider, clearly not axis-labeled. No fake time-series.
5. Highlights list (what was actually done).
6. `verified: true` → "verified client" treatment (named quote/logo); otherwise a
   quiet "anonymized" note. The gold "audited results" seal (optional add-on) is
   **out** unless a case is genuinely verifiable — a seal on anonymous data is the
   §9.1 problem in costume.
7. CTA band.

JSON-LD: BreadcrumbList (Home → Cases → title). Not `Article` — these aren't
articles; over-marking invites rich-result trouble.

### 4.4 Tools hub — `app/[lang]/tools/page.tsx`

Intro states the trust point plainly: *"Free tools. Your CSV is parsed in your
browser — nothing is uploaded, nothing leaves your machine."* One `ToolCard` per
live tool (from `LIVE_TOOLS` flag). Prose line about the roadmap, no dead cards.
BreadcrumbList JSON-LD. Metadata targets "free amazon ppc tools".

### 4.5 Search-terms tool — `app/[lang]/tools/search-terms/page.tsx`

Server shell (title, what-it-does, privacy note, **"expects the Sponsored Products
Search Term report — format as of `TODO(date)`"** note) wrapping the
`SearchTermsTool` client island:

1. **Upload:** dropzone + file input (a11y: real `<input type=file>`, labelled).
2. **Parse:** `lib/tools/csv.ts` — PapaParse, header row detection, BOM strip,
   delimiter sniffing (DE/FR exports can be `;`-separated with comma decimals),
   currency-symbol strip, number normalization. Size guard (warn > ~20MB).
3. **Validate:** required columns checked against the §5.4 contract → a clear
   "missing columns: X, Y — is this the Search Term report?" error, never a crash
   (explicit DoD item).
4. **Analyze:** pure functions from `lib/tools/search-terms.ts`. Exact feature set
   is ported from the Lovable source **when you provide it** (input #4); the shell,
   contract, and pipeline don't depend on it. Expected shape (from the tool's
   purpose): summary tiles, wasted-spend table (spend, zero orders), match-type
   breakdown, top converters, negative-keyword candidates with a `.txt`/`.csv`
   download.
5. **CTA:** results footer — "Want this run on your whole account? **Message me.**"
   (D8: no email capture at MVP.)

**Testing (non-negotiable, §13 risk M-H):** every analysis function unit-tested in
vitest against a real, anonymized fixture CSV. A wrong number here costs exactly
the credibility the site exists to build.

### 4.6 About — `app/[lang]/about/page.tsx`

The conversion page for a vetting visitor: story ("who is this person"), the EU
wedge ("why Amazon Europe"), credentials/experience (**`TODO(kiryl)` — the brief's
"unseen substance" gap; needs your real history**), marketplaces worked (DE FR IT
ES UK …), how-I-work (weekly cadence, P&L view — matches hero promise), photo
(`TODO(kiryl)`), CTA. Person JSON-LD `@id` anchored here.

### 4.7 Contact — `app/[lang]/contact/page.tsx`

Three channel cards — email (`mailto:` with prefilled subject), WhatsApp (`wa.me`
with prefilled message via `lib/links.ts`, bb pattern), LinkedIn profile. A
response-time expectation line. No form at MVP (D8). All three values
`TODO(kiryl)` in `lib/config.ts` — page ships when they're real (DoD P2).

### 4.8 Log — `app/[lang]/blog/` + `[slug]`

`bb`'s pipeline near-verbatim: index (title/date/description rows, report
register), post page with intro/rest split + `BlogInlineCTA` between, optional
per-post FAQ (visible + FAQPage JSON-LD), `related` links, BreadcrumbList +
BlogPosting JSON-LD (author = the Person entity), drafts workflow +
`publish-post.mjs`. UI label is **"Log"**; URL stays `/blog/` (stable, conventional,
matches bb — a `/log/` vanity path is a rename I'd skip).

---

## 5. Data contracts (final)

### 5.1 Case frontmatter — `content/cases/en/*.md`

Handoff §13 contract adopted verbatim, plus two fields:

```yaml
title: "…"                       # required
client_label: "DE supplement brand"   # required — anonymized unless verified
marketplace: ["DE"]              # required, enum DE/FR/IT/ES/UK/US/…
category: "Supplements"          # required
duration: "Q1 2026 · 3 months"   # required
spend_managed: "€…"              # optional string
verified: false                  # required; true only with named permission
featured: false                  # NEW — drives homepage "featured cases"
context: "…"                     # required — the honesty caveat (build fails without it)
before: { acos: 0, tacos: 0, roas: 0 }   # required numbers — TODO(kiryl) until real
after:  { acos: 0, tacos: 0, roas: 0 }   # required numbers — TODO(kiryl) until real
series: [ ... ]                  # NEW, optional — real monthly points; enables a true AreaChart (§4.3)
highlights: ["…"]                # required, 1–5 items
date: 2026-01-01                 # required — ordering + sitemap lastModified
```

Markdown body = the narrative (situation → what I did → result → caveats).

### 5.2 Blog frontmatter

`bb`'s exactly: `title · description · date` required; `updated · cover · faq · related`
optional (D5).

### 5.3 Validation — `scripts/validate-content.mjs` (extended)

bb's rules (frontmatter presence, real ISO dates, no future dates, broken internal
links, llms.txt sync) applied to both content types, plus for cases: numeric
`before/after`, non-empty `context`, `marketplace` enum, `verified` boolean — and a
**`TODO(kiryl)` scan across published `content/**` that fails CI** (P2 structural
honesty gate).

### 5.4 Tool CSV contract (starting point — finalized only against the real tool)

Handoff §13 table adopted as the *starting* contract; per tool, the real Lovable/AI
Studio export + one real sample file finalizes columns before the port is
estimated. Dayparting stays parked behind its input-source question (Amendment B).

---

## 6. Reuse map — `bb` → Kiryl (verified against the actual source)

| bb asset | Disposition |
|---|---|
| `lib/blog.ts` + tests, `content/_drafts` convention, `publish-post.mjs` | **Verbatim** (paths → `content/blog/`) |
| `next.config.js`, `postcss`, `tsconfig`, eslint (jsx-a11y), `package.json` scripts | **Verbatim** |
| `vercel.json` (308 redirect + security headers) | Verbatim, target → `/en/` |
| `app/sitemap.ts`, `app/robots.ts`, `validate-content.mjs` | **Adapt** (locales, cases, TODO gate) |
| `lib/locale.ts` | **Adapt**: drop `ua`/`uk` mapping, x-default → `en`, emit `LAUNCHED_LOCALES` only |
| `lib/config.ts`, `lib/text.ts` + typed locales pattern | **Reuse pattern**, new content |
| `lib/schema.ts` | **Adapt**: `BeautySalon` → `Person` + `ProfessionalService`; keep BlogPosting/Breadcrumb/FAQ builders |
| `lib/links.ts` (wa.me prefill), `lib/analytics.ts` (cta_click) | **Adapt** (+mailto, LinkedIn; GTM dataLayer → `track()`) |
| `Header/Footer/MobileDrawer/LangSwitcher` | **Adapt** (new nav; LangSwitcher hidden while 1 locale) |
| `FloatingButtons`, `CTALinks`, `HeroCTAs` | **Adapt** (channels: WhatsApp/email/LinkedIn) |
| `SectionHeader`, `AnimatedCount`, `use-reveal`, scroll utils, skip-link/a11y layout patterns | **Verbatim/near** |
| `BlogCTAs`, `BlogInlineCTA`, `RelatedGuides` | **Adapt** (copy/register) |
| `ScrollProgress` | Optional — keep, it suits the report register |
| `ConsentGate`, `CookieConsent`, GTM/Consent-Mode scripts | **Dropped** (D7 — cookieless) |
| `BeforeAfterSlider`, gallery/booking/testimonial/FAQ sections, hero-image CSS | **Not reused** (D2; no imagery-led hero — ours is typographic) |
| **Net new** | `Mark`, `Wordmark`, `TrendUnderline`, `AreaChart`, `Sparkline`, `MetricDelta/Card`, `ResultsBar`, `CaseCard`, `ToolCard`, `ThemeToggle`, `lib/cases.ts`, `lib/tools/*`, `SearchTermsTool` |

Roughly consistent with the brief's ~60/40 reuse estimate.

---

## 7. Tools architecture (the pattern all four follow)

- **Math in `lib/tools/<tool>.ts`** — pure functions, typed rows in/results out, no
  React. **Vitest against a real anonymized fixture CSV.** Reviewable math is the
  §9.1 mitigation.
- **CSV in `lib/tools/csv.ts`** — one shared, tested normalization layer
  (PapaParse + BOM/delimiter/decimal/currency handling). Every "tool showed a wrong
  number" class of bug funnels through one tested module.
- **UI in `components/tools/<Tool>.tsx`** — the only `'use client'` surface; loaded
  only on its own route (D1). Brand components, not shadcn (D4).
- **Page shell is a server component** — SEO text, format-as-of date, privacy note.
- **Graceful failure is a feature:** malformed CSV → named-column error with a hint;
  never a blank screen (explicit per-tool DoD).
- **Per-tool budget:** each migration is estimated only after its source export is
  in hand (§9.2 under-scoping risk) — the plan commits to the pattern, not to
  "drop-in".

---

## 8. i18n: EN now, RU/PL later without refactor

- `SUPPORTED_LOCALES = ['en','ru','pl']` (types, LocaleText contract) but
  **`LAUNCHED_LOCALES = ['en']`** in `lib/config.ts` drives `generateStaticParams`,
  hreflang alternates, sitemap, and LangSwitcher visibility. Launching RU/PL is:
  translate `locales/<lang>.ts`, add `content/{blog,cases}/<lang>/`, append to one
  array.
- At MVP, `locales/ru.ts` and `locales/pl.ts` **re-export `en`** with a loud
  comment — the type machinery stays exercised (missing-key-fails-build works from
  day one), there's exactly one copy source, and nothing half-translated can leak
  (those locales are never generated).
- **x-default → `/en/`** (bb points at `/pl/`; our default is EN — locked §3).
- Untranslated-page fallback (§15): adopted as specified — a page exists in a
  locale only when its content does; no empty shells, no machine translation.
  `bb`'s `getTranslatedLocales` per-slug hreflang pattern already implements this
  for content; the same guard applies to `cases`.
- Fonts: before PL launch, swap in `latin-ext` subsets; before RU, resolve the
  Cyrillic question (§1.2-P3).

---

## 9. Design-system implementation notes

- **Tokens:** `docs/brand/tokens.css` values become the Tailwind v4 `@theme` block
  in `app/globals.css` (bb convention), keeping the raw custom properties for the
  theme-toggle path (`prefers-color-scheme` + `data-theme` override, both
  directions — the tokens file already models this).
- **Fonts:** `fonts/fonts.css` (file-based) → `app/fonts.css` + `public/fonts/`;
  preload the two above-the-fold faces (Bricolage 800, Fraunces 900). No CDN, no
  `next/font`. Anton ships but stays reserved.
- **Mark:** lift the `<symbol>` from `identity-reference.html` into `Mark.tsx`;
  **gradient stops via `currentColor`** (the recorded gotcha); flat variant for
  `icon.svg`/favicons (≤16px = no gradient); **outline the Fraunces K to a `<path>`**
  for all shipped SVG (favicons, OG) so nothing depends on font loading inside SVG.
- **Motif discipline:** `TrendUnderline`/`AreaChart`/`Sparkline` are the only
  decoration; always chart-shaped (fill + baseline + endpoint), never a bare
  squiggle; `--signal` for the line, `--good` strictly for data deltas.
- **Theme:** `ThemeToggle` stamps `data-theme` + localStorage; a pre-paint inline
  script in the layout head prevents a flash (bb has the same pattern for its `js`
  class). Both themes must pass contrast (DoD global gate).

---

## 10. Proposed locks for the §15 open items

1. **Analytics:** Vercel Analytics + Speed Insights, cookieless. `cta_click`
   events with `{channel, page}` props. No GTM/GA4 at launch (D7).
2. **Consent:** no cookie banner (nothing non-essential sets cookies); a short
   `/en/privacy/`-style note in the footer explaining exactly that. (I'll verify
   the final dependency list stays cookieless at P5 — if anything changes, consent
   UI comes back from bb.)
3. **Lead capture:** MVP = message-me channels only; ESP embed (provider = your
   pick: Formspree/Tally/ConvertKit) is a post-MVP task gated on real traffic (D8).
4. **JSON-LD:** layout-level `Person` (`@id: ${DOMAIN}/#kiryl`, `jobTitle:
   "Amazon PPC specialist"`, `knowsAbout: [Amazon Advertising, ACOS/TACOS, EU
   marketplaces…]`, `sameAs: [LinkedIn]`) + `ProfessionalService` (serviceType
   "Amazon PPC management", `areaServed`: EU marketplaces, `provider` → the Person);
   `BlogPosting` + `BreadcrumbList` on posts; `FAQPage` only where an FAQ is
   visible. (bb's builder structure, entities swapped.)
5. **OG images:** one static branded OG at MVP (mark + wordmark + tagline on
   paper). Per-page/per-post generated OGs are a P5+ nice-to-have, not a gate.
6. **Tool routing:** one static route per tool (D1).

---

## 11. Distribution & content strategy (the missing half — §9.1/§9.2)

**Premise (accepting the brief's own risk analysis):** the site closes; it doesn't
reach. For these four audiences the reach engine is **LinkedIn + seller/PPC
communities + referrals**, with SEO as the slow compounding layer. So:

### 11.1 Channel model

| Layer | Role | Where |
|---|---|---|
| **LinkedIn (primary)** | Creates awareness; the name-repetition machine ("Kiryl = Amazon EU PPC") | Your personal profile, EN |
| Communities (secondary) | Borrowed audiences; tools are the calling card | FBA/PPC subreddits, Helium 10 / PPC Facebook & Slack groups, Polish e-com groups (PL audience #1), RU seller Telegram channels (audience #4) |
| Referrals (existing) | Highest intent — the site's job is to not lose them | Site = vetting layer |
| SEO (compounding) | Log posts + tool pages catch bottom-funnel queries | The site itself |

### 11.2 Operating loop (sustainable for one person)

Everything derives from client work you're already doing — no "content ideas" step:

1. Weekly account work surfaces one insight → **LinkedIn post** (2×/week target;
   15–30 min each; numbers-first voice, matching §16).
2. The best post each fortnight → expanded into a **Log post** (1 per 2 weeks —
   deliberately *below* the brief's implied cadence; §9.1 says a stale log is worse
   than none, so the floor must be holdable).
3. Each completed engagement → **case study** → LinkedIn carousel/post series
   pointing at the case page.
4. Each tool ships → its own **"I built this, it's free, your data stays in your
   browser" launch post** + shared in 2–3 communities where genuinely on-topic.

### 11.3 SEO topic map (launch set — EN, bottom-funnel first)

Tool pages target: *"amazon search term report analyzer (free)"*, *"amazon ppc
wasted spend"*. Log posts target queries a buyer types when they already feel the
pain: ACOS vs TACOS decisioning · reading the search-term report · dayparting on
Amazon (when it's real vs. noise) · US→EU marketplace entry mistakes · EU
marketplace differences (DE vs FR vs IT conversion behavior) · agency vs freelancer
for Amazon PPC. (Each maps to one of the four audiences; EU-wedge topics
deliberately over-weighted — that's the differentiator and the low-competition
space.)

### 11.4 Launch content pack (P2/P3 fill — titles proposed, you fact-check)

1. **"ACOS or TACOS: which number should run your Amazon account?"** (glossary
   authority + audience #2/#3 pain)
2. **"How I read a Search Term report like a P&L"** (pairs with the launch tool —
   internal links both ways)
3. **"Selling into Amazon Europe from the US: the five expensive surprises"** (the
   wedge, audience #3)

I draft these in the §16 voice from your inputs; nothing publishes without your
technical fact-check. Plus 2 case studies (real data, anonymized, `context` filled)
= the launch pack.

### 11.5 Measurement

UTM discipline on every LinkedIn/community link (`utm_source=linkedin…`), Vercel
Analytics `cta_click {channel}` events → after 4–6 weeks you know which audience
actually converts, which decides the next locale and the next tool.

### 11.6 Gates (make the treadmill risks decisions, not drift)

- **RU/PL go/no-go:** only after ~8 weeks of held cadence, informed by 11.5 data;
  pick **one** next locale, not both. (PL favors audience #1 peers/referral
  network; RU favors audience #4 clients. Data decides; RU carries the font caveat
  §1.2-P3 and the walled-content rule from §9.1.)
- **Named proof:** by P5, ask 1–2 past clients for a named quote or a LinkedIn
  recommendation (verifiable because it links a real person) — one named proof
  outweighs every anonymous stat on the site.
- **Tool #2** ships only after tool #1 shows usage (else the effort goes to cases/
  content instead).

---

## 12. Phase plan with Definition of Done

Global gates on **every** phase (handoff §14): `typecheck` + `lint` +
`validate:content` + `test` green · static export builds · Vercel preview deploys ·
no console errors · no lorem/`TODO(kiryl)` in shipped copy · keyboard focus +
reduced-motion respected · light & dark pass contrast · Lighthouse mobile ≥90
perf/SEO/best-practices, ≥95 a11y.

### P0 — Bootstrap (blocked on: repo name)
Create repo → commit docs/brand + briefs + this plan → scaffold config skeleton
(package/tsconfig/eslint/next.config/vercel.json from bb) → Vercel project linked.
**DoD:** empty-shell build + preview deploy green.

### P1 — Scaffold (est. ~1 day)
Tokens→`@theme`; fonts self-hosted + preloads; `Mark`/`Wordmark`/favicon set (flat
mark, outlined K); `[lang]` layout with metadata/hreflang/JSON-LD skeleton;
Header/Footer/MobileDrawer/FloatingButtons; ThemeToggle + pre-paint script;
`/`→`/en/` redirect; locales/config/links/analytics libs; empty-state pages for all
routes. **DoD (handoff):** EN shell renders end-to-end; nav+footer+mark+favicons;
theme toggle works both ways; preview live.

### P2 — Content spine (est. ~1–2 days + your inputs)
Home hero + CTA band (ResultsBar built, **flag off** until numbers); About;
Contact (real channels); blog pipeline + `validate-content` + `publish-post`; ≥1
seed post live (of the 3 in §11.4); llms.txt; TODO-gate active in CI.
**DoD (handoff):** real copy on Home/About/Contact; ≥1 post renders; all three
contact channels tested on a phone (wa.me deep link, mailto, LinkedIn).

### P3 — Cases (est. ~1 day + your data)
`lib/cases.ts` + validator rules; case detail page (context, MetricDelta grid,
motif chart, highlights); index; featured-cases block on Home; 2 real anonymized
cases authored. **DoD (handoff):** ≥2 cases render from frontmatter with
before→after; index lists correctly (filters deferred per D6 — noting this DoD
delta against the handoff's "filters work").

### P4 — Tool #1: search-terms (est. ~2–3 days once source received)
Audit Lovable export → extract math to `lib/tools/search-terms.ts` + fixture tests
→ `csv.ts` layer → `SearchTermsTool` UI → tools hub → homepage teaser → analytics
events. **DoD (handoff):** end-to-end on a real sample CSV, fully client-side
(verified: no network calls during use), malformed input → clear error, math
unit-tested, privacy + format-as-of notes visible. (Lead-capture embed deferred
per D8 — flagged as a DoD delta.)

### P5 — Polish / SEO / launch (est. ~1–2 days)
hreflang + sitemap validated (EN-only emission checked); JSON-LD passes Rich
Results tests; OG image; robots/llms.txt final; privacy note; Lighthouse pass;
domain purchase → canonical + `kiryl.pl` 301 + Search Console; **launch = §11
content event** (LinkedIn announcement + tool post), not a silent deploy.
**DoD (handoff):** all §14 P5 items + one named-proof ask made (§11.6).

**Post-MVP backlog (ordered):** tool #2 → ESP capture → RU/PL gate decision →
remaining tools → case filters at ≥6 → per-page OG → ticker/seal add-ons (seal only
with a verified case).

---

## 13. Risk register (handoff §9 → where this plan answers it)

| Risk (§9) | Sev | Answer in this plan |
|---|---|---|
| Distribution gap — site ≠ reach | H | §11 channel model + operating loop; launch is a content event; measurement built in |
| Trilingual treadmill | H | EN-only MVP (§2); `LAUNCHED_LOCALES` machinery (§8); 8-week cadence gate before any locale (§11.6) |
| No growth/content strategy | H | §11 entirely; seed pack §11.4 |
| Tools commoditized / wrong-number liability | M-H | Math extracted + unit-tested vs real fixtures; one tested CSV layer; format-as-of note; graceful errors (§7); tools positioned as proof, not hook (§11.1) |
| Anonymized cases = weak proof | M-H | Required `context` caveat; `verified` flag; seal withheld unless verifiable; named-proof task in P5 (§11.6) |
| Four audiences, one site | M | EN + EU-wedge copy leads audience #3; peers/RU addressed via channels first, locales later (§11.6) |
| RU perception/payment friction | L-M | RU walled to its locale when it exists; RU gate explicit (§11.6) |
| First-name brand diffuse | L-M | `kirylppc.com` + "Kiryl = Amazon EU PPC" repetition through LinkedIn cadence (§11.2); no rank-the-name assumptions |
| Static ✕ lead-capture tension | M | Resolved by deferral: channels-only MVP, ESP post-MVP with named provider decision (D8, §10.3) |
| Tool migration under-scoped | M | Per-tool estimate only after source audit; port-the-math pattern (§7); dayparting parked (Amendment B) |
| Messy before/after data | M | `context` required; optional real `series`; no fabricated time-series charts (§4.3) |
| Maintenance burden | M | Content = markdown + one config file; publish/validate scripts; no CMS, no server, few deps; docs/MAINTENANCE.md mirroring bb's |
| No DoD | M | §12, inherited from handoff §14, with two flagged deltas (D6 filters, D8 capture) |
| Identity over-investment | L | Identity is reused verbatim, zero new design rounds; effort shifted to content/proof (§11) |
| New repo unspecified | M | Blocking input #1 (§14) |
| Docs orphaned | M | P0 copies docs into the new repo |
| bb access/drift | L-M | bb cloned and read at `e26aa5c`; treated as pattern, not dependency |
| Mark depends on Fraunces `<text>` | L | Outlined to `<path>` for all shipped SVGs (§9) |
| Unseen substance (tools/cases/About) | Info | Inputs #3–6 mapped to phases (§14); placeholders structurally blocked from shipping (P2 gate) |
| *(new)* Fonts lack Cyrillic; PL needs latin-ext | M (RU) / L (PL) | §1.2-P3; folded into the RU/PL gate |

---

## 14. Inputs needed from you (mapped to what they block)

| # | Input | Blocks | Notes |
|---|---|---|---|
| 1 | **New repo name** (e.g. `kirusmiller/kirylppc`) | P0 — everything | You said you'll provide it with approval |
| 2 | **Domain decision** — buy `kirylppc.com` (+`kiryl.pro`?) | P5 canonical/redirects only | Until then: Vercel preview URL; `CONFIG.DOMAIN` carries a TODO |
| 3 | **Contact details** — email, WhatsApp number, LinkedIn URL | P2 Contact going live | Build proceeds with TODOs; page can't pass DoD without them |
| 4 | **Results-bar numbers** — spend managed, avg ACOS cut, avg ROAS (real, defensible) | Homepage results bar (stays hidden) | Flag flips only with real values |
| 5 | **2 case studies' real data** — before/after + context + timeline | P3 content | I structure/write; numbers are yours |
| 6 | **About substance** — experience, credentials, marketplaces, photo | P2 About | |
| 7 | **Tool order confirmation + the Lovable/AI-Studio export** for tool #1 (search-terms recommended) + one real sample CSV | P4 | Dayparting: also confirm its input source (Amendment B) |
| 8 | *(post-MVP)* ESP provider preference | Post-MVP capture | No rush (D8) |

---

## 15. Decisions I'm asking you to approve

- [ ] **A.** EN-only MVP scope as amended (§2 — incl. live-tools-only teaser, dayparting last)
- [ ] **B.** Architecture deltas D1–D9 (§1.1) — esp. D7 (no GTM/cookie banner) and D8 (no email capture at MVP)
- [ ] **C.** §15 locks as proposed (§10)
- [ ] **D.** Distribution & content strategy incl. the cadence floor and the RU/PL + tool-#2 gates (§11)
- [ ] **E.** Phase plan + DoD incl. the two flagged DoD deltas (§12)
- [ ] **F.** The new repo name (input #1) → unblocks P0/P1

Anything rejected: say the letter and the change; the plan is versioned in this file.
