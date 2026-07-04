# PPC Portfolio Website — Planning Brief

> Working brief for **Kiryl's Amazon PPC specialist portfolio**.
> Purpose: capture decisions, the reuse map, and open questions so a detailed
> plan (e.g. via Fable 5) can be produced without starting cold.
>
> Status: **draft / discovery** — last updated 2026-07-04.

---

## 1. Goal & positioning

**One-line goal:** build *personal-brand awareness for the name "Kiryl"* as an
Amazon PPC specialist, and convert that awareness into inbound conversations.

The product being marketed is **the person, not a service package** — so the
site leads with the name, a strong personal About, credible results, and
thought-leadership content (the blog + free tools).

### Target audiences (4 segments)

| # | Audience | Primary language | What they care about |
|---|---|---|---|
| 1 | Polish PPC specialists & agencies (peers / partners / subcontracting) | PL | Credibility, depth, tools, thought leadership |
| 2 | Polish businesses operating in English | EN | Proof of results, professionalism |
| 3 | European & American brands wanting to sell **in Europe** | EN | EU-marketplace expertise, ACOS/TACOS results |
| 4 | Russian-speaking clients wanting to sell **in Europe** | RU | Native-language trust, EU know-how |

**Implication:** "selling **in Europe**" is the recurring wedge — position Kiryl
as the specialist who helps brands win on **Amazon EU marketplaces**. That's the
differentiator across all four segments.

---

## 2. Languages

**EN / RU / PL** (three locales).

- Maps almost 1:1 onto Alina's existing i18n (`app/[lang]/…`, typed locale
  files, hreflang, per-locale content). We **drop Ukrainian**, keep the machinery.
- **Default locale = EN** (decided). Bare `/` → `/en/` (Alina redirects to `/pl/`;
  we change the target). Fits the international, US+EU-facing personal brand.

---

## 3. Information architecture (sitemap)

All routes under `/[lang]/` (en/ru/pl).

```
/[lang]/                      Home — hero + results bar + featured cases + tool teasers + CTA
/[lang]/cases/                Case-study index (filter by niche / marketplace / result)
/[lang]/cases/[slug]/         Individual case study (before→after metrics + charts)
/[lang]/tools/                Tools hub
/[lang]/tools/search-terms/   Search-term analysis
/[lang]/tools/dayparting/     Dayparting analysis
/[lang]/tools/asin-compare/   ASIN comparison analysis
/[lang]/tools/reports/        Report generator (weekly / monthly / YoY)
/[lang]/blog/                 The "log" — index
/[lang]/blog/[slug]/          Blog post
/[lang]/about/                About Kiryl (credibility, story, EU-Amazon focus)
/[lang]/contact/              Contact / "message me" (see §7)
```

Reused infra: `sitemap.ts`, `robots.ts`, hreflang, JSON-LD (Person + Article +
FAQ), analytics, cookie consent.

---

## 4. Reuse map — from Alina (`kirusmiller/bb`, aka `lashwarszawa-pl`)

Stack: **Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript · static
export (`output: 'export'`) → Vercel.** Centralized config in `lib/config.ts`;
typed locale files (missing key **fails the build**); build-time markdown blog
pipeline (`lib/blog.ts`).

| Alina asset | Portfolio use | Reuse level |
|---|---|---|
| Blog pipeline (`content/*.md`, `lib/blog.ts`, drafts→publish scripts) | The **"log"** | Verbatim |
| `BeforeAfterSlider` | **Case studies** — before/after ACOS/TACOS/ROAS | Verbatim → restyle |
| `AnimatedCount` / `AnimatedStars` | Hero **results bar** (spend managed, avg ACOS cut) | Verbatim |
| `Hero`, `Services`, `SectionHeader`, `TrustStrip` | Home + services | Restyle |
| `Testimonials`, `FAQ` | Client proof + objection handling | Restyle |
| `Header`, `Footer`, `MobileDrawer`, `LangSwitcher` | Nav / layout shell | Adapt (new routes) |
| `Booking` / `FloatingButtons` / `CTALinks` | "Message me" flow | Adapt (new channels) |
| `lib/schema.ts` | JSON-LD — swap `BeautySalon` → **`Person`/`ProfessionalService`** | Adapt |
| `lib/config.ts`, `lib/text.ts`, `lib/locales/*` | Config + copy | Reuse pattern |
| `sitemap.ts`, `robots.ts`, analytics, consent | SEO + compliance | Verbatim |

**Estimate:** ~60% restyle-and-rewire existing components, ~40% net-new
(`/tools` + case-study data model).

**New components needed:** `MetricCard` / results grid, case-study frontmatter
schema + renderer, CSV upload/parse UI, results charts (client-side), tool result
tables, report builder.

---

## 5. The tools

Currently built in **Lovable** (Vite + React + TS + Tailwind + shadcn/ui) and
**Google AI Studio** (React + `@google/genai`). Migration path: GitHub-sync /
export each → import as Next.js route/components (Vite router → App Router).

| Tool | Function | Data source | Server needed? |
|---|---|---|---|
| Search-term analysis | Analyze search-term report | User CSV | **No** — client-side |
| Dayparting analysis | Hour/day performance | User CSV | **No** — client-side |
| ASIN comparison | Compare ASIN performance | User CSV | **No** — client-side |
| Reports (weekly/monthly/YoY) | Generate period reports | User CSV | **No** — client-side |

### Key architecture rule for tools

- **Prefer client-side processing.** Amazon report CSVs crunched in the browser
  = no server, no API key, and **the client's data never leaves their machine**
  (a real trust selling point — say so on the page). Compatible with static export.
- **No AI APIs** (decided). All four tools are pure client-side CSV processing —
  so the **entire site stays a static export**: no server, no API keys, no
  secrets, minimal hosting cost. Confirmed for launch scope.
- Tools double as **lead magnets** — inline "want the full breakdown / talk to
  me" capture on each.

---

## 6. Case studies

- Real client results available (✅ confirmed).
- **Anonymize** where needed ("a US supplement brand", "an EU home-goods seller")
  — credibility comes from the *numbers*, not the client name.
- Data model (markdown frontmatter, like blog):
  ```yaml
  title, client_label, marketplace (US/DE/UK/EU…), category,
  duration, spend_managed,
  before: { acos, tacos, roas, sales }
  after:  { acos, tacos, roas, sales }
  highlights: [ ... ]
  ```
  → auto-renders `MetricCard`s, a `BeforeAfterSlider`, and a results chart.

---

## 7. Lead flow — "message me"

Primary CTA is **direct message**, not calendar booking. Alina's WhatsApp CTA
pattern (`CTALinks`, `FloatingButtons`, prefilled links in `lib/links.ts`)
transfers directly.

**Channels (decided): email · WhatsApp · LinkedIn.** Persistent floating
button (reuse `FloatingButtons`) + a contact page. Prefilled WhatsApp link via
`lib/links.ts` pattern.

---

## 8. Domain & SEO/geo strategy

- **Recommendation: one canonical domain, done well.** Do **not** run content
  across multiple keyword/geo domains — exact-match domains are SEO-devalued and
  duplicate content across ccTLDs hurts rankings.
- Geo + language is won the way Alina already does it: **one domain +
  `hreflang` (en/ru/pl) + Search Console international targeting.**
- **Domain choice (shortlisted, 2026-07-04):** `Kiryl.pl` is owned; `kiryl.com`
  and `kiryl.io` are **taken**. Availability checked via Vercel:
  - **`kirylppc.com` — $11.25/yr — recommended canonical.** Name + keyword,
    `.com` trust, self-explanatory; reinforces "Kiryl = PPC" on every impression.
  - `kiryl.pro` — $4.99/yr — short, name-pure, "professional" signal; good vanity
    redirect (or alt primary).
  - `kiryl.eu` — available but buy off-Vercel (~€5); matches the "sell in Europe"
    wedge but reads Europe-only.
  - Avoid `kirylamazon.com` (Amazon trademark risk).
  - Any extra domain should **301-redirect** to the canonical — never host a copy.
  → *Pending: purchase decision (user to buy; not auto-purchased).*

---

## 9. Tech stack (inherited)

Next.js 16 · React 19 · Tailwind v4 · TypeScript · static export → **Vercel**
(account already connected). Fonts via `next/font`, icons `lucide-react`,
analytics via GTM, JSON-LD via `lib/schema.ts`. **New repo**, scaffolded from
Alina's skeleton — not a fork of the lash content.

---

## 9a. Design system — "Bold Editorial", Balanced register (locked 2026-07-04)

Arrived at through an iterative design exploration (three broad directions →
three A×C mixes → three signature devices → monogram refinement). The chosen
register is **modern but moneyed** — reads as *serious money* to Polish,
European and American audiences alike.

**Thesis:** marketing pages are modern and confident; case studies and the log
read like a **credible research report**. Grotesque-meets-serif expresses
"modern + trustworthy" in the type itself. A **navy anchor** carries the
cross-market finance trust; a **signal-blue trendline** is the through-motif.

### Brand mark — the K monogram

An authentic **serif K (Fraunces) inside a thin ring** (status/prestige), whose
upper arm becomes a small **area chart** — a rising line with a gradient fill,
cresting at a plotted point that **breaks through the ring** (growth). The mark
*is* the motif, scaled down.

- **Colour:** ring + K in **navy**; the ascent fill is a **navy tonal gradient**;
  the rising **line + endpoint point are signal-blue** (they pop).
- **Variants:** primary (navy), reversed/on-dark (paper), mono (one colour),
  flat (no gradient). At **≤16px the gradient drops out** for a clean favicon.
- **Build note:** drive the gradient stops from **`currentColor`**, not a CSS
  custom property — inside an SVG `<use>` shadow tree, `var()` on `stop-color`
  falls back to black. (This bit us once; `currentColor` inherits correctly.)
- Wordmark: `Kiryl.` in the grotesk, period in signal-blue (a data-point nod).

### Motif — the area chart

The same rising line + gradient fill + plotted endpoint, reused as: keyword
underlines, metric cells, section dividers. Explicitly a chart (fill + baseline),
never a bare squiggle.

### Colour tokens (CSS custom properties, theme-aware)

| Role | Light | Notes |
|---|---|---|
| `--paper` (bg) | `#EFEEEA` | warm neutral — moneyed, not cream |
| `--surface` | `#FBFAF6` | cards / report surfaces |
| `--ink` (text) | `#191B22` | near-black |
| `--muted` | `#62636B` | secondary text |
| `--navy` (brand) | `#22407A` | anchor — cross-market finance trust |
| `--signal` (trendline) | `#2E6BE6` | the motif/accent line + point |
| `--good` (data ↑) | `#2F6B4E` | data only, never the brand accent |
| `--brand-line` | `#DEDBD2` | hairline rules |

Dark: `--paper #0B0D12`, `--surface #14171E`, `--ink→text #EDEFF4`,
`--navy→#8FA0FF`, `--signal #6D82FF`, `--good #3FB57F`, lines `#232833`.
(Give real contrast on both grounds — don't naively invert.)

### Type roles (inline as `@font-face` data URIs — CSP blocks font CDNs)

Fonts chosen & test-embedded (SIL OFL, latin subsets ~18–23 KB each; pulled from
`@fontsource` via npm — the CDN is egress-blocked, the npm registry is allowed):

| Role | Face | Use |
|---|---|---|
| Display | **Bricolage Grotesque** (700/800) | headlines, the `Kiryl` wordmark, structure |
| Editorial | **Fraunces** (400/600/900 + italic) | case studies, log body, pull-quotes, the serif K, metrics |
| Body / UI | system grotesque / Bricolage regular | interface + short copy |
| Figures | mono (IBM Plex Mono-style) | metrics, tabular numbers (`tabular-nums`) |
| Optional | **Anton** | reserved for future oversized statement use |

**Layout:** confident hero → editorial, rule-lined proof set in serif with
tabular P&L numbers. Generous space. One accent (signal-blue), used sparingly.
Semantic green is separate from the brand.

**Optional add-ons** (available, not in the core identity): a gold **"audited
results" seal** for case-study pages; a **metrics ticker** homepage band.

**Ships:** logo lockups (SVG), favicon set (16/32/180/512 + `.ico` + maskable),
the area-chart motif as a reusable component, tokens wired as CSS variables.

---

## 10. Decisions & remaining items

**Resolved (2026-07-04):**

1. **Default locale** — **EN** (`/` → `/en/`).
2. **Canonical domain** — recommend **`kirylppc.com`** ($11.25); `kiryl.com`/`.io`
   taken. *Purchase pending user action.*
3. **Contact channels** — **email · WhatsApp · LinkedIn.**
4. **AI features** — **none**; all tools client-side → fully static site.
5. **Brand look** — **"Bold Editorial", Balanced register** (locked): navy anchor,
   Bricolage Grotesque + Fraunces, K-monogram + area-chart motif. See §9a.
6. **Launch scope / tools** — **migrate one-by-one, rebuilding as needed**;
   phase them in rather than all-at-once.
7. **Testimonials & cases** — **anonymized.**
8. **Fonts** — **Bricolage Grotesque + Fraunces** (+ Anton reserved); embedded
   via `@fontsource`/npm as data URIs.
9. **Brand mark** — K-in-ring serif monogram with the breakthrough area-chart
   ascent; navy fill + signal-blue line. Asset: `docs/brand/kiryl-mark.svg`.

**Still open:**

- **A. Domain purchase** — buy `kirylppc.com` (+ optional `kiryl.pro`) to lock it.
- **B. Tool migration order** — which of the 4 goes first?
- **C. Contact details** — actual email address, WhatsApp number, LinkedIn URL
  for `lib/config.ts`.

---

## 11. Suggested build sequence

- **Phase 0 — Brief (this doc):** lock §10 answers.
- **Phase 1 — Scaffold:** new repo from Alina skeleton; en/ru/pl locales; nav +
  layout shell; brand tokens; deploy to Vercel (preview URLs).
- **Phase 2 — Content spine:** Home (hero + results bar + CTA), About, Contact,
  blog pipeline live with 1–2 seed posts.
- **Phase 3 — Cases:** case-study data model + 2–3 real (anonymized) cases.
- **Phase 4 — Tools:** migrate from Lovable/AI Studio one at a time; client-side
  first; `/tools` hub + lead capture.
- **Phase 5 — Polish/SEO:** hreflang, JSON-LD (Person), sitemap, OG images,
  analytics, consent, performance; domain + redirects.

---

### Handoff note for the detailed planner (Fable 5)

Base the detailed plan on **reusing the `kirusmiller/bb` architecture**
(Next.js 16 static-export, typed i18n, markdown content pipeline). Treat §1–§9
as decided, resolve §10, and expand §11 into concrete tasks with file paths that
mirror Alina's conventions (`lib/config.ts` single source of truth, typed
`lib/locales/*`, `content/**` markdown, `lib/schema.ts` JSON-LD).
