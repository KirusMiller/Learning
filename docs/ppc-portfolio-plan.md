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
- Decide the **default locale / bare-`/` redirect**: Alina redirects `/` → `/pl/`.
  For an internationally-targeted personal brand, **EN is likely the better
  default** (`/` → `/en/`). *Open decision.*

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
- **AI/Gemini insight features** (if any tool auto-writes recommendations) are
  the *only* part that needs a server-side key. Options: (a) a small Vercel
  serverless function for just that endpoint (site stays mostly static), or
  (b) ship AI features as an optional layer, or (c) omit at launch.
  **→ Action: flag which tools call an AI API.**
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

**→ Open item: which channels?** (email · LinkedIn · Telegram · WhatsApp ·
lightweight contact form). Recommend 2–3 max, with a persistent floating button.

---

## 8. Domain & SEO/geo strategy

- **Recommendation: one canonical domain, done well.** Do **not** run content
  across multiple keyword/geo domains — exact-match domains are SEO-devalued and
  duplicate content across ccTLDs hurts rankings.
- Geo + language is won the way Alina already does it: **one domain +
  `hreflang` (en/ru/pl) + Search Console international targeting.**
- **Domain choice:** `Kiryl.pl` is owned. `.pl` signals "Poland" to US/global
  clients — since American/European reach is an explicit goal, consider
  **`kiryl.com` / `kiryl.io` as the primary**, with `Kiryl.pl` **301-redirecting**
  to it. A keyword domain, if bought, should only **redirect** to the canonical
  site — never host a second copy.
  → *Open decision: canonical domain.*

---

## 9. Tech stack (inherited)

Next.js 16 · React 19 · Tailwind v4 · TypeScript · static export → **Vercel**
(account already connected). Fonts via `next/font`, icons `lucide-react`,
analytics via GTM, JSON-LD via `lib/schema.ts`. **New repo**, scaffolded from
Alina's skeleton — not a fork of the lash content.

---

## 10. Open questions (resolve before / during full plan)

1. **Default locale** — `/` → `/en/` (recommended) or `/pl/`?
2. **Canonical domain** — keep `Kiryl.pl`, or make `kiryl.com`/`.io` primary?
3. **Contact channels** — which 2–3 for "message me"?
4. **AI features** — do any tools call Gemini/an AI API (→ needs server key)?
5. **Brand look** — reuse Alina's warm aesthetic, or a distinct
   professional-services identity (the personal brand probably wants its own)?
6. **Launch scope** — do all 4 tools ship at launch, or phase them in?
7. **Testimonials** — are named/logo'd client quotes available, or anonymized?

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
