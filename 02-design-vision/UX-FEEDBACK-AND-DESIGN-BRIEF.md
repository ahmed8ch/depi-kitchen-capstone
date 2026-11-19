# Master UX Feedback, Design System & Creative Brief (`UX-FEEDBACK-AND-DESIGN-BRIEF.md`)

> **Date Updated:** November 19, 2026 (Synced after `pen.dev` rejection → **Design-as-Code with Pure White `shadcn base-luma` + User's FlameLink Logo**)  
> **Mandatory Read For:** Every coding agent (Antigravity, Opus 5.5, Gemini) and QA reviewer working on this repository!  
> **Purpose:** Single authoritative brief preserving **EVERY** visual taste, UX rule, footer detail, naming veto, custom logo asset, and easter egg from our entire design conversation so zero ideas are ever lost across sessions.

---

## 1. Workflow Pivot: Design-as-Code (NO More Fake Canvas Mockups!)
- **Why we rejected `pen.dev` (`250 degree.pen`) & `prototype/index.html`:** Hand-drawing fake boxes in `pen.dev`/Kite or using outdated Radix v1 Figma files produces generic AI-looking UI that looks NOTHING like real **2026 `shadcn/ui` `base-luma`** (`@base-ui/react`).
- **New Golden Rule:** Build directly in **real Vite 8 + React 19 + TypeScript + Tailwind v4 + real `npx shadcn@latest init` (`Base UI` + `Luma` style)** using the official **`shadcn MCP`**. Every button, card, `Drawer`, `Sheet`, `Popover`, `InputOTP`, `Switch`, and `Tabs` MUST be genuine `shadcn base-luma` code — never hand-drawn lookalikes!
- **Validation Rule:** Never judge a screen "good" just because `CLIP_ISSUES == 0` or checkboxes pass. Judge visual taste strictly against real **`shadcn base-luma` + Notion + Apple + CoolDock** restraint.

---

## 2. Visual Surface, Pure White Palette & Custom User Logo
- **Base Canvas — PURE CRISP WHITE (`#FFFFFF`):**
  - Background: **`#FFFFFF`** (pure white — **muddy beige/cream `#F4F0E8` is REJECTED!**).
  - Subtle Secondary Surface: `#FAFAFA` / `#F4F4F5` (clean `shadcn base-luma` neutral tint).
  - Hairline Borders: `#E4E4E7` (`1px` subtle neutral borders, soft Tahoe-style shadow elevation — zero heavy dark boxes).
  - Ink: Crisp `#09090B` primary, `#52525B` secondary, `#71717A` muted.
- **User's Custom Platform Logo (`FlameLink`) — ALREADY CREATED:**
  - Folder: `/Users/apple/Downloads/dev/antigravity/250-degree-Kitchen/assets/logos/`
  - Primary mark: `flamefire finale v1.svg` (and `.png`) — kinetic negative-space flame + speed-line "F" in vivid **`#FF0055`** with speed-line gradient **`#DA074D` → `#E50953` → `#F50757`** on crisp white.
  - Inverted badge variant: white flame mark on vivid crimson rounded square (in the same `assets/logos/` folder).
  - **Use this real SVG** for `"Powered by FlameLink"` in the footer, KDS header mark, and loading/brand badges — NEVER replace it with a generic Lucide flame inside an orange square!
- **Strict Brand Separation & Restaurant Accent (`C-06`, `L-07`):**
  - **`FlameLink` (`assets/logos/flamefire finale v1.svg` + padded square `flamelink-badge.svg`) is STRICTLY the platform/KDS brand** (`"Powered by FlameLink"` in footer + `/kds` header + dark KDS band) — **NEVER the main restaurant brand in the storefront navbar!**
  - **Default Storefront Accent (`--primary`):** **Warm appetizing Coral-Orange (`oklch(0.575 0.195 35)`)** on pure white `#FFFFFF` (`>= 4.55:1` AA w/ crisp `#FFFFFF` white button text across all button sizes — including inside `[data-surface="dark-pass"]`!). Keep `FlameLink` Rose-Crimson (`#E50953` / `#FF0055`) scoped strictly to FlameLink badges & `/kds`.
  - **NO dev color switcher (`Rose | Coral`) exposed in guest navbar or mobile drawer!**
  - **REJECTED:** Muddy beige + brown-orange templates (`#F4F0E8`); heavy dark burgundy (`Palette C`).

---

## 3. Multi-Page Site Architecture (STRICT — Never a Cramped 1-Page Scroll!)

Every top-level Navbar item navigates to its own dedicated TanStack Router page:

| Route | Mandatory Contents | Explicitly BANNED |
| :--- | :--- | :--- |
| **`/` (Home — Storytelling Storefront)** | **(1)** Scroll-compacting frosted floating navbar (`Restaurant Brand Wordmark`, zero `Rose\|Coral` dev toggle, `whitespace-nowrap`) → **(2)** Spacious Pure-White Editorial Hero (`CoolDock` + `Google Playground` DNA + real sunlit hero food spread `/images/hero-hearth-table.jpg` + `Explore Menu` & `Join Table` CTAs) → **(3)** **Full-Proportion Interactive iPhone 16 Pro Showcase** (lightweight SVG/CSS frame with subtle CSS 3D tilt — **NO Three.js!** — wrapping a LIVE interactive Shared-Table & Split-Bill screen!) → **(4)** 3 Open-Fire Craft Stations WITH REAL FOOD PHOTOGRAPHY → **(5)** Single Earned **Grok-Bot Obsidian Dark Kitchen Pass Band** (`#09090B` + luminous rim + translucent `amber`/`emerald` pills + white-text CTA) → **(6)** **Visit Maadi & Live Cairo Local-Time Open/Closed Clock Strip** (placed right above the footer — NOT in the Hero!) → **(7)** **Tall Interactive 60fps `AsciiFooter` (`75–85vh`)** with glyph-atlas canvas wordmark, 4-layer progressive blur, `"Powered by FlameLink"`, and Daylight Joke ripple+shake+Popover (`Open Kitchen Pass ->`). | **NO menu dish grid or test widget on `/`!** **NO floating cart dock on `/`!** **NO `FlameLink` as main restaurant logo!** **NO Cairo clock in Hero!** **NO Three.js bloat!** |
| **`/menu` (Live 20-Dish Menu)** | Spacious 3-col desktop / 1-col mobile grid (5 categories × 4 dishes = **20 dishes** with real studio photos — ZERO `<Skeleton>` placeholders!), instant search, category filter pills, live `86 · Sold out` sync from `/kds`, **Phone-Width Floating Animated Bottom Sheet (`shadcn Drawer`, `max-w-[420px] rounded-[32px]`)** on dish click, **Share Dish button** (`/menu?dish=<slug>`), subtle **Spicy Chili CSS cursor** ONLY on `.spicy` cards (`pointer: fine`), **Floating Dark Cart Dock** (`>= 1` item), and **Trailing Side Sheet (`shadcn Sheet`)** with real modifier math & per-item `+ / − / remove`! | No unclickable cards; no full-width 1440px drawer; no broken modifier math. |
| **`/table` & `/table/:tableNumber`** | **Side-Split Bayer 4×4 SVG `<DitherGlow />` Table Check-In Card** (table picker `1–8` with high-contrast active pills + 4-digit **`InputOTP`** + first name — **ZERO login/signup `C-08`!**), live shared cart, **Tactile Serrated-Edge Paper Receipt** showing full total + 3-way exact integer-piaster Split-Bill (`Pay Full` / `My Items` / `Split ÷ N`), and **Swipe-to-Send / Slide-to-Pay** tactile slider (with click/keyboard fallback per WCAG `2.5.7`). | **ZERO login / signup / password UI!** Never hide total bill amount. |
| **`/track` & `/track/:orderId`** | `/track` order lookup + `/track/:orderId` live Order Tracker (`Received → On the Fire → Ready`) paired with **Serrated Paper Receipt summary** + ETA. Also creative bilingual **`404s.design` `RouteNotFound`**! | No 404 on `/track`; no fake pulsing `"LIVE"` dots. |
| **`/kds` (Grok-Bot Obsidian Kitchen Pass)** | Glare-free `#09090B` obsidian multi-ticket KDS with luminous card rims, vibrant **translucent status pills** (`violet` New, `amber` Firing, `emerald` Ready, `rose` Overdue `12m+`), padded square `FlameLink` SVG header badge, crisp white-text dark CTAs, `Chime ON` Web Audio + Wake Lock, single-tap status advancement, and live **`86 · Stock Manager`** switches locking `/menu` in `<300ms`. | **ZERO login/account gate!** Never leave 80% empty black void or black text on crimson buttons. |

---

## 4. Apple-Style Sheet & Drawer Grammar (`shadcn base-luma`)

| User Action | Real `shadcn` Component | Mandatory Contents & Behavior |
| :--- | :--- | :--- |
| **Click any Dish Card** | **Phone-Width Floating Animated `shadcn Drawer` (`max-w-[400px]–[420px]`, `rounded-[32px]`, centered at `bottom-4`)** | Drag handle, 16:9 real dish photo + floating `Share` pill, required options (`RadioGroup`), optional extras (`Checkbox`), kitchen note, **Quantity Stepper (`− 1 +`)**, smooth **`motion/react` + `ResizeObserver` height morphing** (`Customize ↔ Ingredients & Allergens`), and live `@kitlangton/rolling-number` CTA (`Add 2 · 680 EGP`). **NEVER stretch 1440px full-width on desktop!** |
| **Click Cart Dock / Icon** | **`shadcn Sheet` (`side="right"` LTR / `side="left"` RTL)** | Full itemized cart with **exact integer-piaster modifier totals**, per-diner ownership tags, inline `− qty +` steppers & remove button, **isometric icon empty state**, subtotal, and **`Split & Checkout`** CTA. |
| **Click Footer "Try Dark Mode"** | **Daylight Switch + ASCII Canvas Ripple + Anchored `shadcn Popover` directly above switch** | Knob attempts to slide → fires **brand-accent ripple wave across the giant `AsciiFooter` canvas** → **horizontal shake physics** snaps knob back to Daylight Sun → crisp Popover anchored **right above the switch** with **`Open Kitchen Pass ->`** button! |

---

## 5. Mandatory Closing Footer, Micro-Interactions & Easter Eggs (NEVER Drop!)
1. **Visit Maadi & Live Cairo Local-Time Clock Strip (`Africa/Cairo`):**
   - Placed cleanly **right above the Footer** (NOT cluttering the Hero!): `Road 9, Maadi, Cairo · Daily 12:00 PM – 1:00 AM` with live Sun (`Open in Maadi`) / Crescent Moon (`Resting until noon`) indicator (`<bdi dir="ltr" className="tabular-price">`).
2. **Tall Closing `AsciiFooter` (`min-height: 75–85vh`, 60fps Glyph-Atlas Canvas + 4-Layer Progressive Bottom Blur):**
   - Exact zero-dep 60fps glyph-atlas canvas wordmark displaying the **Restaurant Brand Name** (NOT `"Lumen"`, NOT `FlameLink`!) edge-to-edge, hover scramble + monochrome shimmer, 4-band progressive bottom blur (`1px / 2.5px / 6px / 9px`), breathing columns (`Explore`, `Visit`, `"Powered by FlameLink"` w/ padded `FlameLinkMark` SVG, `"Back to top"`), and the **Daylight Joke Toggle**:
   - Clicking the toggle fires a **brand-accent radial ASCII ripple** across the wordmark, shakes back to Daylight Sun, and opens the anchored **`shadcn Popover`** right above it with a 1-click **`Open Kitchen Pass ->`** button!
3. **Tactile Feedback & New Craft Details Across the App:**
   - **Phone-Width Floating Animated Drawer (`max-w-[400px]–[420px] rounded-[32px]`):** Smooth `motion/react` + `ResizeObserver` height morphing between Customize & Ingredients/Allergens views — NEVER full 1440px width!
   - **Share Dish Button (`/menu?dish=<slug>`):** Native `navigator.share` + clipboard copy fallback (`Share -> Check` icon swap) on every dish card & bottom drawer.
   - **Scoped Culinary CSS SVG Cursors (`@media (hover: hover) and (pointer: fine)` ONLY):** Crisp `24×24` SVG cursors with contrasting outer outline (`(4,4)` hotspot) **strictly on menu dish cards** — minimalist **Fork** on standard dishes, **Chili Pepper** on `.spicy` dishes, **Flame** on `.charcoal` dishes (NEVER replacing the global cursor over forms/inputs/tables/`/kds`!) + ref-based cursor spotlight hover glow (zero `setState`!).
   - **Bayer 4×4 SVG `<DitherGlow />` Side Panel:** Zero-dep 45-line SVG art panel on `/table` Check-In (**ZERO login `C-08`!**).
   - **Tactile Serrated-Edge Paper Receipt + Slide-to-Send (`WCAG 2.5.7` click/keyboard fallback):** Real zig-zag SVG paper edge + full itemized total + split math on `/table` & `/track/$orderId`.
   - **Grok-Bot Obsidian Dark UI:** `#09090B` canvas + luminous hairline card rims + translucent tinted status pills (`violet`, `amber`, `emerald`, `rose`) strictly on `/kds` & the 1 dark KDS showcase band on `/`.
   - **Creative Bilingual 404 Page (`404s.design` spirit):** Witty hospitality copy + quick links back to `/menu` & `/table`.
   - **Add to Cart, Scroll-Compacting Navbar, Isometric Empty States, CSS-3D Interactive SVG iPhone Pro (NO Three.js!), & Layer-3 Notion Peeking Doodles:** All preserved cleanly (`Hugeicons` exclusive for UI chrome; `isocons.app` strictly in Empty States).

---

## 6. Bilingual Natural Cairo Arabic (`ar-EG`) & Anti-Slop Rules
- **Optical Size Parity:** Pair `Plus Jakarta Sans` with **`IBM Plex Sans Arabic`** (or `93%` scale on `Alexandria`) so EN & AR match optically. Always set `[dir="rtl"] { letter-spacing: 0; }`.
- **Natural Cairo Arabic (`ar-EG`) — Already Audited in Prep Packs `07` & `14`:**
  - **NEVER abbreviate `على` as `"ع"`!** Always full **`على`** (`على الفحم`, `على الجريل`, `على الترابيزة`).
  - **NEVER write literal cringe** (`"مقرمش ع النار"` → `تشيكن برجر مقرمش`; `"تريو صوصات البيت"` → `تشكيلة 3 صوصات بيتي`; `"تذكرة"` → `أوردر`; `"نصيبك"` → `حسابك`).
- **Anti-Slop Copy:** Zero uppercase eyebrows (`01 //`, `INTRODUCING`), zero subtitles restating headings, zero em-dashes (`—`) in rendered UI strings, zero `"Oops!"`, zero `"Demo"`/`"Test"` strings leaked into guest UI, verb-first 1–3 word CTAs.

---

## 7. Complete Brainstorm Memory (Names, Vetoes, References & Tools)
- **Platform Name:** **`FlameLink`** (user already built the SVG logo at `assets/logos/flamefire finale v1.svg`!). Alternates discussed: `FireLink`, `360 Link`, `360 Systems`.
- **Restaurant Name Candidates (Open):** `KRAVE`, `KAIRO`, `BRIK`, `360°` (or fresh brainstorm).
- **PERMANENTLY VETOED NAMES (Never re-propose!):**
  - `Jamr` (evokes Hajj *Ramy al-Jamarat*), `Dakka` (koshary/molokhia), `Char` (unfamiliar in Egypt), `Sear`, `Sizzle` (existing brand), `Area 20` (too corporate), standalone `250°` (feels arbitrary/cold), `Firepass`.
- **Visual References Inspected & Saved (`02-design-vision/references/`):** `CoolDock`, `Google Labs Dreambeans`, `Google Labs Playground`, `Stitch Loop`, `Firecrawl` (energy only — reject tiny dense text), plus user-shared **Notion** (pure white + peeking line-art doodles), **Zomato** (pure white + vibrant food pop), and **Cue Design (`cue349`)** (tall interactive halftone canvas footer).
- **Superseded/Rejected Artifacts (DO NOT COPY!):**
  - `02-design-vision/prototype/index.html` (old 1-page vanilla HTML tester)
  - `250 degree.pen` (`pen.dev` 4 screens — rejected for muddy beige + generic AI look instead of real `shadcn base-luma`)
  - `02-design-vision/logos/concept-1..3*.svg` (old bare geometric vector drafts)
