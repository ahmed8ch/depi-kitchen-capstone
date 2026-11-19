# Live Site Critique & Surgical Fix Spec (`LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md`)

> **Audited:** `http://localhost:5173/` (live Desktop `1440x900` + Mobile `390x844` + Arabic RTL browser verification + full `src/` code audit)  
> **Target Audience:** Build chat `d521282c-237a-4251-a306-c63f708bccd1` (or fresh `Neon High` / `Opus 5.5` session)  
> **Rule #1 — WORK SECTION BY SECTION (Kamran Ahmed Method):** Never dump an entire redesigned page in one massive edit! Fix & visually verify **one route/section at a time** in the live browser (`1440x900` & `390x844`) before moving to the next.  
> **Rule #2 — Tautological Anti-Slop Law (Joseph Kerkhof):** *"Tautological labels, tests, and UI components are considered harmful."* Delete every subtitle that restates its heading, every placeholder card, and every wrapper that adds zero real behavior.

---

## 0. What Already Works (KEEP!) & Immediate Git Checkpoint

### Keep These Engineering Foundations
- Vite `8.3.8` + React `19.3.1` + TypeScript `7.0.2` + Tailwind CSS v4 + **real `shadcn base-luma`** (`@base-ui/react@1.9.0`, `Hugeicons`, `rtl: true`, `pointer`) + TanStack Router + Convex `1.51.0` + `motion` + `@kitlangton/rolling-number` + `@nkzw/oxlint-config@3.0.0` + `tsrs` + Vitest + `fast-check`.
- Pure Crisp White (`#FFFFFF` / `oklch(1 0 0)`) neutral canvas, `0` console errors, `0` failed requests, working `dir="rtl"` switching.

### Step 0A — Answer to Your Repo Question: Start a Brand-New GitHub Repo NOW (`C-07`)
- **YES.** Initialize a **brand-new** GitHub repo named **`depi-kitchen-capstone`** (NEVER connect to legacy `/Users/apple/Desktop/Projects/depi_Capstone`!).
- Make **Commit #1** (`chore: initial Vite 8 + React 19 + shadcn base-luma scaffold`) BEFORE starting the visual overhaul below so you have a clean rollback checkpoint, then commit each completed section cleanly.

### Step 0B — Copy Our 8 Studio Food Photos Into `public/images/` Immediately!
Why `/menu` had pulsing grey `<Skeleton>` boxes and `/` had zero food photography: the 8 sunlit studio photos already exist in the design session's artifact directory and were never copied into `public/images/`. Run this exact command first:

```bash
mkdir -p public/images
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/hero_sunlit_hearth_table_1795087848354.jpg" public/images/hero-hearth-table.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_double_smash_burger_v2_1795087868209.jpg" public/images/dish-smoked-smash.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_stone_deck_pizza_clean_1795087879538.jpg" public/images/dish-hot-honey-pizza.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_charcoal_kofta_grill_1795087935598.jpg" public/images/dish-charcoal-kofta.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_loaded_smash_fries_1795087941475.jpg" public/images/dish-loaded-fries.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_crispy_turnover_pie_1795087944266.jpg" public/images/dish-turnover-pie.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/dish_sparkling_lemon_mint_v2_1795087994328.jpg" public/images/dish-lemon-mint.jpg
cp "/Users/apple/.gemini/antigravity/brain/11924fc1-316b-4c3f-9c4f-bbc9da12af0c/branded_250_packaging_mockup_v2_1795087948385.jpg" public/images/brand-packaging.jpg
```

*(Note: Never show `<Skeleton>` when images are static/loaded — render crisp `<img>` with `aspect-[4/3] object-cover` and `loading="lazy"` except Hero `fetchPriority="high"`!)*

### Step 0C — Lean Approved Skills & Deterministic UI Linter
Do **NOT** bloat context with 40 overlapping skills. Install ONLY these surgical additions alongside our existing `.agents/skills/shadcn/`, `unslop-ui`, `better-accessibility`, and `better-layout`:
1. **Motion, Apple & Mobile Craft (4 selective skills from Emil Kowalski):**
   ```bash
   npx skills add emilkowalski/skills --skill emil-design-eng --skill apple-design --skill gestures --skill mobile-native
   ```
   *(Do NOT install `animate-expo`, `write-swift`, or `ask-sonner` — we use Base UI Toast.)*
2. **Deterministic Rendered-DOM UI Linter (`gholtzap/lintapple`):**
   ```bash
   npm install -D lintapple && npx lintapple init
   ```
   Wire `lintapple` against `http://localhost:5173` (and later Playwright `expectUI(page, testInfo)`) to automatically catch contrast bugs, button inset violations, mismatched radii, and tabular-number regressions.
3. **Skip for now:** `ui-skills.com` (overlaps Emil + Jakub + `shadcn`), `vercel-labs/agent-browser` (Antigravity already has `browser` subagent + Chrome DevTools MCP), `development/senior-frontend` (overlaps `AGENTS.md`), `asciify.org` (we have the exact zero-dep 60fps `AsciiFooter` below), `cloudflare/security-audit-skill` (save for Deploy Week Dec 8–10!).

---

## 1. Mandatory Re-Read Before Writing Another Line of UI
Read these files you skipped in the first build pass:
1. `02-design-vision/references/SYNTHESIS.md` (shared DNA across `CoolDock`, `Google Labs Playground`, `Stitch Loop`, `Dreambeans` — adapted onto our **Pure Crisp White `#FFFFFF`** base per `C-05`!)
2. `02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md` (updated with all new craft specs)
3. `04-prep-packs/product-and-design/07-curated-16-dish-menu-and-modifiers.md` & `14-ready-seed-data-and-i18n-dictionaries.md` (**20 balanced dishes**, audited natural Cairo Arabic)

---

## 2. Complete Bug Audit of Current `http://localhost:5173/` (Fix ALL 12!)

| # | Severity | Exact File & Line | Bug Observed in Live Browser | Required Fix |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **CRITICAL** | `src/app/AppShell.tsx:79-99`, `src/index.css:108-116` | **Brand Hijack:** `FlameLink` logo & hot pink `#E50953` were used as the main restaurant brand in the top-left navbar and across the whole storefront! | **Strict Brand Separation:** `FlameLink` is ONLY the tech platform (**`"Powered by FlameLink"`** in footer + **`/kds` Kitchen Pass** + dark KDS band). Top-left Navbar, Hero, Menu & Footer ASCII wordmark belong to the **Restaurant Brand** (use clean typographic restaurant mark from `src/config/brand.ts` — default placeholder `KAIRO` / `KRAVE` single-const swappable until `D-01` locks!). Default storefront `--primary` to **warm appetizing Coral-Orange (`oklch(0.605 0.205 36)`)** on `#FFFFFF`, keeping FlameLink Crimson (`#FF0055` / `#E50953`) scoped strictly to FlameLink badges & `/kds` accents! |
| **2** | **CRITICAL** | `src/app/AppShell.tsx:105-154` | **Dev Jargon & Wrapping in Guest Navbar:** `Rose \| Coral` (`Accent token`) theme switcher sits inside the guest navbar & mobile drawer, and `"Kitchen Pass"` wraps to 2 lines when space tightens. | Remove `Rose \| Coral` switcher completely from guest navbar and mobile nav drawer! Add `whitespace-nowrap` to every nav `<Link>`. Keep navbar Apple/CoolDock-clean: `[Restaurant Wordmark] — [Home · Menu · Table · Kitchen Pass] — [EN/عربي · Explore Menu CTA]`. |
| **3** | **CRITICAL** | `src/assets/logos/flamelink-badge.svg` & `src/index.css:174` | **Clipped Logo + Broken Dark CTA Contrast:** (a) `flamelink-badge.svg` has non-square `viewBox="0 0 3907 3764"` with tight `clipPath` so circular/squircle crops clip the bottom speed lines. (b) Inside `[data-surface="dark-pass"]`, `--primary-foreground: var(--pass)` renders **black text on vivid pink/coral** (`Open Kitchen Pass` button)! | (a) Update `flamelink-badge.svg` (and `public/logos/flamelink-badge.svg`) to a centered **square padded `viewBox="-350 -420 4607 4607"`** with full-bleed `#FF0055` background rect covering `-350 -420 4607 4607` so the white flame has ~14% breathing room on all 4 sides inside any `rounded-xl` badge! (b) Set `--primary-foreground: oklch(1 0 0);` inside `[data-surface="dark-pass"]` so dark-band primary CTAs always have crisp white text! |
| **4** | **CRITICAL** | `src/components/ui/drawer.tsx:124-136` & `src/routes/index.tsx:389-548` | **Grotesque 1424px Full-Width Stretched Drawer:** `data-[swipe-axis=y]:inset-x-0` stretches the Dish Customizer Drawer edge-to-edge across 1440px desktop monitors! | Replace vertical full-width stretch with a **floating, centered, phone-dimension rounded sheet**: `data-[swipe-axis=y]:inset-x-4 data-[swipe-axis=y]:mx-auto data-[swipe-axis=y]:max-w-[400px] sm:data-[swipe-axis=y]:max-w-[420px] data-[swipe-direction=down]:bottom-4 rounded-[32px] shadow-2xl border border-border/80`. Add smooth **`motion/react` + native `ResizeObserver` height-morphing multi-view transition** (Section 3.2 below)! |
| **5** | **CRITICAL** | `src/routes/menu.tsx:40-196` | **`/menu` Unclickable + Pulsing Grey `<Skeleton>` Boxes:** Only 3 static dishes, `<Skeleton>` instead of photos, clicking any card does NOTHING, no Customize Drawer, no Cart Dock, no Cart Side Sheet, no Share button! | Wire all **20 dishes** from Prep Pack `14` (mapped to our 8 real studio photos in `public/images/`), make every card interactively open the **Phone-Width Floating Animated Dish Drawer**, add **Share Dish button** (`navigator.share` + deep-link `/menu?dish=<slug>`), add **Floating Dark Cart Dock** (`>= 1` item) + **Trailing Side Cart Sheet** (right LTR / left RTL) with real per-item `+ / − / remove` steppers! |
| **6** | **CRITICAL** | `src/routes/index.tsx:333-682` | **Orphaned Test Widget on `/` + Cart Math Bug:** Violates `L-06` (`/` MUST be pure storytelling with NO menu/cart widget!), displays `340 EGP` without naming the dish, and hardcodes `bagItemsCount * 295` (dropping the `+45 EGP` cheddar modifier: `3 × 340` wrongly showed `885 EGP`!). | **DELETE** Section 3 test widget from `/` completely! Route all ordering/cart state through a single shared `TableCartProvider` (using integer piasters from `src/domain/money.ts` so `unitTotal = (basePiasters + sum(modifierPiasters)) * qty` NEVER drifts!). |
| **7** | **HIGH** | `src/routes/index.tsx:221-281` | **Empty Hero Right Half + Misplaced Cairo Clock:** Right 50% of `/` Hero is empty white void, AND the Live Cairo Time Clock sits awkwardly at the top of the Hero! | Move **Live Cairo Time Clock OUT of the Hero** into a clean **Visit / Maadi Hours Strip directly above the Footer**. Make the Hero a balanced **CoolDock / Google Playground editorial stage** featuring our real sunlit hero photograph (`/images/hero-hearth-table.jpg`) in a `rounded-[32px]` frame + crisp typography + clean `Explore Menu` & `Join Table` CTAs! |
| **8** | **HIGH** | `src/routes/index.tsx:729-810` | **Tiny Generic Footer (Missing Tall Interactive `AsciiFooter`):** Current footer is a bare `py-12` 2-row stub with no halftone/ASCII canvas and no `Open Kitchen Pass ->` action inside the Daylight Joke popover! | Replace with the **Tall (`min-h-[75vh]`) Interactive `AsciiFooter`** (Section 3.1 below) featuring the 60fps glyph-atlas canvas wordmark, hover scramble, 4-layer progressive bottom blur, `"Powered by FlameLink"` badge, and the **Daylight Joke Toggle** that fires an ASCII color ripple, shakes back to Sun, and opens the anchored `shadcn Popover` with a 1-click **`Open Kitchen Pass ->`** link! |
| **9** | **HIGH** | `src/features/table/TableShellView.tsx` | **Low-Contrast Active Pills + Missing Total Bill & Receipt Craft:** Active `ToggleGroupItem` pills (`Table 1`, `Split Equally`, `3`) are near-invisible light grey on white; Split-Bill shows `333.34 EGP` without showing the `1,000 EGP` total or itemized dishes! | Give selected `ToggleGroupItem` crisp high-contrast `data-pressed:bg-foreground data-pressed:text-background`. Upgrade `/table` with **(a)** Side-Split **Bayer 4×4 SVG `<DitherGlow />`** panel on the Table Check-In card (ZERO login `C-08`!), **(b)** **Tactile Serrated-Edge Paper Receipt** showing full itemized total + split math, and **(c)** **Slide-to-Send-to-Kitchen** tactile slider (with click/keyboard fallback per WCAG `2.5.7`). |
| **10** | **HIGH** | `src/routes/kds.tsx` | **Empty Void & Bland Dark Cards:** `/kds` shows only 1 stub ticket in an 80% empty black void with flat grey pills. | Upgrade `/kds` (and the 1 dark KDS band on `/`) using the **Grok Bot Obsidian Dark Aesthetic** (Section 3.4 below): `#09090B` canvas, `#111114` cards with subtle luminous top rim (`border-white/[0.08]`), vibrant translucent status pills (`teal` Ready, `amber` Firing, `crimson` Overdue 12m+, `violet` New Table), realistic 4-ticket live station board with working status advancement (`Fire -> Ready -> Bump`) + live `86 Stock` tab synced to `/menu`! |
| **11** | **MEDIUM** | `src/routes/track.$orderId.tsx`, `src/components/feedback/RouteNotFound.tsx` | **`/track` Hits 404 + Dry Boilerplate 404 Page:** Navigating to `/track` fails with English-only boilerplate 404; `/track/FL-204` has faint active-stage contrast and no itemized receipt or ETA. | Add `src/routes/track.index.tsx` (order lookup / jump to active order), upgrade `/track/$orderId` with **Serrated Paper Receipt summary + crisp 3-stage Stitch Loop progress bar**, and rebuild `RouteNotFound.tsx` as a witty **bilingual `404s.design`-inspired page**! |
| **12** | **MEDIUM** | `src/app/locale-context.tsx`, `src/routes/index.tsx:134`, Base UI A11y | **State Lost on Reload + Untranslated `"Maadi"` + Duplicate A11y Roles:** Locale resets on reload; `"Maadi"` stayed English in Arabic mode; Base UI hidden inputs exposed duplicate switch/radio/checkbox accessible names. | Persist `locale` in `localStorage` (`flamelink-locale`); translate `"Maadi"` -> `"المعادي"`; check `FieldLabel` / `Label` bindings on Base UI `Switch`, `Checkbox`, `RadioGroupItem` so each control exposes ONE clean accessible role (zero duplication in a11y tree); hide or minimize `TanStackRouterDevtools` during demo captures! |

---

## 3. Exact Craft Component Specs (Build Section by Section!)

### 3.1 Tall Interactive `AsciiFooter` + Open-Kitchen Daylight Joke (`src/components/layout/AsciiFooter.tsx`)
Use the exact 60fps glyph-atlas 2D canvas engine (`CELL = 6`, `FONT_SIZE = 10`, `GLYPHS = " .:-=+*#%@"`, hover scramble + 4-band progressive bottom blur `1px / 2.5px / 6px / 9px` + radial toggle ripple), adapted cleanly to our architecture:
- **Strip Demo Junk:** Remove `"Lumen"` sample strings, remove `autoplay` loop, remove fake dark-mode page flip (`backdrop={false}` — page stays **Pure Crisp White `#FFFFFF`**!).
- **Wordmark:** Renders the **Restaurant Brand Name** (from `src/config/brand.ts`, e.g., `KAIRO`) edge-to-edge across the full canvas width (`min-h-[75vh]` footer framing).
- **The Daylight Joke Integration (Signature Easter Egg!):**
  - Clicking the footer Sun/Moon toggle pill does **NOT** switch the storefront to dark mode.
  - Instead: (1) Knob nudges partway and **shakes horizontally back to Daylight Sun** (`motion.div` spring vibration), (2) fires the **radial brand-accent ASCII wave ripple** across the giant canvas wordmark (`color-mix` warm coral/crimson wave passing left-to-right!), and (3) opens the **`shadcn Popover` anchored directly above the switch**:
    - EN: *"Sunlit kitchen only — Open kitchen, pure daylight here. Dark mode lives on the Kitchen Pass."* + button **`Open Kitchen Pass ->`** (`/kds`).
    - AR: *"مطبخ نهاري مفتوح — المنيو مصمم بوضوح النهار. الوضع الداكن موجود في شاشة المطبخ."* + button **`افتح شاشة المطبخ <-`** (`/kds`).
- **Footer Top Grid:** Clean columns (`Explore`: Menu / Table / Track / Kitchen Pass · `Visit`: Road 9, Maadi, Cairo · `Powered by FlameLink` with the fixed padded `FlameLinkMark` SVG · `Back to top` button).
- **Reduced Motion & Mobile:** Respect `prefers-reduced-motion: reduce` (paint 1 static crisp ASCII frame, zero RAF loop) and gate hover scramble on `matchMedia("(hover: hover) and (pointer: fine)")`.
- **Visit / Live Cairo Time Clock Strip (RIGHT ABOVE THE FOOTER):** Dedicated calm hairline-bordered strip immediately before `<AsciiFooter />` displaying live `Africa/Cairo` time (`<bdi dir="ltr" className="tabular-price">`) + Sun (`Open in Maadi · 12:00 PM – 1:00 AM`) or Crescent Moon (`Resting until noon`)!

### 3.2 Phone-Width Floating Animated Height-Morphing Dish Drawer (`src/features/menu/DishCustomizerDrawer.tsx`)
**Do NOT install `vaul`, `lucide-react`, or `react-use-measure`!** Modernize the floating multi-view drawer directly onto our existing stack (**`@base-ui/react` `Drawer` + `motion/react` + 10-line native `ResizeObserver` hook + `Hugeicons`**):
- **Compact Floating Geometry on Desktop & Mobile:**
  - `fixed inset-x-4 bottom-4 mx-auto w-[calc(100%-2rem)] max-w-[400px] sm:max-w-[420px] overflow-hidden rounded-[32px] border border-border/80 bg-popover shadow-2xl`
- **Smooth Animated Height Morphing (`motion.div animate={{ height: bounds.height || "auto" }}`):**
  - **View 1 (`customize` — Default):** Crisp `16:9` dish photo at top (with subtle floating `Share` + `Close` icon pills), dish name & description, required options (`RadioGroup`), optional extras (`Checkbox`), kitchen note (`Textarea`), **`−  1  +` quantity stepper**, and live `@kitlangton/rolling-number` CTA (`Add 2 · 680 EGP`) + `"Ingredients & Allergens"` trigger.
  - **View 2 (`details`):** Smooth spring height morph (`duration: 0.25, ease: [0.26, 1, 0.5, 1]`) with `AnimatePresence mode="popLayout" initial={false}` sliding into prep time, fire station, allergen chips, and Back button!
- **Share Dish Button (`src/components/shared/ShareDishButton.tsx`):**
  - Uses `navigator.share({ title, text, url })` when available, falling back cleanly to `navigator.clipboard.writeText(url)` for `/menu?dish=<slug>` with crisp icon morph (`Share -> Check`) + Base UI toast confirmation!
  - Deep-link support: opening `/menu?dish=<slug>` auto-opens that exact dish's floating drawer!

### 3.3 Side-Split Bayer 4×4 SVG `<DitherGlow />` Art Panel on `/table` (`src/components/shared/DitherGlow.tsx`)
**Do NOT install `@mebius/*`, Radix UI, or `animejs`!** Port the clean Bayer 4×4 ordered-dither pattern into a **~45-line zero-dependency SVG component** using pure CSS tokens (`--primary` coral/ember dots on crisp light `#FAFAFA`):
- Use it on the **left art panel** of the `/table` **Join Table Card** (side-split layout on `lg:grid-cols-[260px_1fr]`, top dither wave band on mobile):
  - Left panel: Restaurant mark at top + warm coral/ember Bayer 4×4 SVG halftone dither sweep + hospitality tagline (*"Scan. Order together. Split to the piaster."*).
  - Right panel: Table number pills (`1–8`, crisp high-contrast active pill!), **4-digit `InputOTP`**, and **First Name** input — **STRICTLY ZERO login / email / password (`C-08`)!**

### 3.4 Grok Bot Obsidian Dark Aesthetic (`/kds` & 1 Dark Showcase Band on `/`)
Match the refined ultra-dark craft of our approved dark reference (`#09090B` canvas + luminous hairline borders + vibrant tinted translucent pills):
- **Canvas:** `#09090B` (`oklch(0.145 0 0)`) — Cards: `#111114` (`oklch(0.185 0 0)`) with `border-white/[0.08]` and subtle radial top-edge rim sheen (`bg-[radial-gradient(ellipse_at_top,oklch(1_0_0/0.06),transparent_60%)]`).
- **Translucent Tinted Status Pills (Never Flat Grey!):**
  - **New Table:** Violet tint (`bg-violet-500/15 text-violet-300 border-violet-500/25`)
  - **On the Fire:** Amber tint (`bg-amber-500/15 text-amber-300 border-amber-500/25`)
  - **Ready at Pass:** Teal/Emerald tint (`bg-emerald-500/15 text-emerald-300 border-emerald-500/25`)
  - **Overdue (12m+):** Crimson tint (`bg-rose-500/15 text-rose-300 border-rose-500/25`)
- **Primary CTA inside Dark Surface:** Crisp **white text (`oklch(1 0 0)`)** on vibrant accent fill (fixing the black-on-pink contrast bug!).

### 3.5 Physical Paper Receipt Edge, Swipe-to-Send Slider, Spicy Cursor & Creative 404
1. **Tactile Serrated Paper Receipt (`src/components/shared/PaperReceiptCard.tsx`):**
   - Used on **`/table` Split-Bill Summary** and **`/track/$orderId` Order Summary**.
   - Clean crisp white card (`#FFFFFF`) with subtle dashed tear dividers (`border-dashed`), monospaced `tabular-nums` order code/timestamps, explicit **Total Bill (`1,000 EGP`)** + per-diner itemized breakdown + **crisp SVG serrated zig-zag paper edge** along the bottom border!
2. **Swipe-to-Send-to-Kitchen / Slide-to-Pay (`src/components/shared/SlideToConfirm.tsx`):**
   - Tactile draggable pill thumb using `motion/react` drag constraints (`drag="x"`, spring snap-back if `< 80%`, crisp checkmark confirmation at `>= 80%`) for firing a table order or confirming split payment.
   - **Mandatory WCAG 2.2 `2.5.7` Dragging Movements Fallback:** Clicking/activating the track or pressing `Enter`/`Space` on its accessible `<button>` triggers the exact same confirmation cleanly!
3. **Subtle Culinary Cursors & Spotlight Cards (Per `21st.dev` Engineering Guide + Arabic Culinary Insight):**
   - **NEVER hide or replace the native OS cursor globally** on `body` or over forms, inputs, `/table`, or `/kds` (hurts precision & accessibility)!
   - Add **zero-JS CSS SVG cursors** (`24×24` SVGs in `public/cursors/`, tilted `-45deg`, hotspot `4 4`, with a **crisp contrasting outer stroke** so they stay sharp over both dark grilled food & crisp white cards!), strictly scoped to menu cards inside `@media (hover: hover) and (pointer: fine)`:
     - `.menu-card` → minimalist **`fork-cursor.svg`**
     - `.menu-card.spicy` → **`chili-cursor.svg`**
     - `.menu-card.charcoal` → **`ember-cursor.svg`**
   - Add subtle **pointer-reactive radial spotlight hover glow** (`--mx`, `--my` updated via DOM ref — zero React `setState` on `mousemove`!) on hero craft cards and the obsidian KDS showcase band.
4. **Playful Bilingual 404 Page (`src/components/feedback/RouteNotFound.tsx`, `404s.design` Spirit):**
   - Giant subtle tabular `404` display numeral + witty hospitality copy:
     - EN: *"Table 404 isn't on the floor plan — The kitchen looked everywhere, even behind the stone oven."*
     - AR: *"ترابيزة 404 مش موجودة في الصالة — دورنا في المطبخ كله حتى ورا الفرن الحجري."*
   - Clean primary/secondary pills back to `/menu`, `/table`, and `/`.

### 3.6 `/` Storytelling Homepage Architecture (Strict Section Order — Build ONE Section at a Time!)
1. **Navbar (`AppShell.tsx`):** Scroll-compacting frosted pill (`Restaurant Brand Wordmark` | `Home · Menu · Table · Kitchen Pass` (`whitespace-nowrap`) | `EN/عربي · Explore Menu CTA`). Zero `FlameLink` hijack, zero `Rose|Coral` dev switcher!
2. **Section 1 — Editorial Sunlit Hero:** Centered or balanced 2-col Pure White hero (`CoolDock` + `Google Playground` DNA) featuring our real sunlit hero photo (`/images/hero-hearth-table.jpg`) inside a `rounded-[32px]` frame + crisp headline + `Explore Menu` & `Join Table` CTAs. **NO Cairo clock here!**
3. **Section 2 — Interactive CSS-3D-Tilted SVG iPhone 16 Pro Showcase (`NO three.js`):** Clean minimalist SVG phone bezel tilted subtly in CSS 3D perspective wrapping a **live interactive mini Shared-Table & Split-Bill preview** (diners can click `Split ÷ 2 / 3 / 4` right inside the phone screen!).
4. **Section 3 — Three Open-Fire Stations WITH REAL PHOTOGRAPHY:** Replace the boring 3 icon-box SaaS cards with editorial photo cards using `/images/dish-smoked-smash.jpg`, `/images/dish-hot-honey-pizza.jpg`, and `/images/dish-charcoal-kofta.jpg` (`Cast-Iron Smash` · `48h Stone-Deck` · `Oak Charcoal`)!
5. **Section 4 — Single Earned Grok-Style Obsidian Kitchen Pass Band (`[data-surface="dark-pass"]`):** Crisp padded `FlameLink` badge + live mini 2-ticket KDS preview with translucent `amber`/`emerald` pills + crisp **white-text** `Open Kitchen Pass ->` button!
6. **Section 5 — Visit Maadi & Live Cairo Clock Strip:** Clean horizontal hairline strip directly above the footer displaying `Road 9, Maadi, Cairo` + live Sun/Moon `Africa/Cairo` open/resting clock!
7. **Section 6 — Tall (`75vh+`) Interactive `AsciiFooter`:** Full-width 60fps glyph-atlas restaurant wordmark + 4-layer progressive bottom blur + `"Powered by FlameLink"` + Daylight Joke Shake-Switch & Anchored Popover (`Open Kitchen Pass ->`)!

---

## 4. Verification Checklist Before Marking ANY Section Done
After EACH section edit, run:
1. `npm run lint && npm run typecheck && npm run test` (0 warnings, 0 errors).
2. Inspect live `http://localhost:5173/` screenshots at BOTH `1440x900` and `390x844` (EN + `عربي` RTL) with your own eyes — verify:
   - Real food photos loaded (`naturalWidth > 0`, zero pulsing `<Skeleton>` placeholders!).
   - Dish Drawer width `<= 420px` centered & floating on Desktop (NEVER `1424px` full-width!).
   - `FlameLink` appears ONLY in `"Powered by FlameLink"` + `/kds` + Dark KDS band (NEVER as the restaurant's top-left navbar brand!).
   - Cart subtotal matches `(base + sum(modifiers)) * qty` to the exact piaster.
   - Zero duplicate accessibility roles, zero wrapping nav links, zero black-on-crimson contrast bugs, zero `"ع"` shorthand in Arabic!

---

## 5. Exact Drop-In Reference Blueprints (Zero Guesswork for Fresh Coding Chats!)

> **Why this section exists:** Fresh sessions cannot read earlier chat history where the user pasted exact reference algorithms. Follow these modernized, zero-bloat blueprints (`Array<T>` / `ReadonlyArray<T>`, `@base-ui/react`, `motion/react`, `Hugeicons`, Tailwind v4 tokens — **zero** `vaul`, `lucide-react`, `react-use-measure`, `radix-ui`, or `animejs`!).

### 5A. Exact `flamelink-badge.svg` Padded Square Fix (Fixes Clipped Logo!)
Update `src/assets/logos/flamelink-badge.svg` AND `public/logos/flamelink-badge.svg` lines 1–2 so the flame sits centered inside a true square with ~14% uniform breathing room on all 4 sides:
```xml
<svg width="4607" height="4607" viewBox="-350 -421 4607 4607" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="-350" y="-421" width="4607" height="4607" fill="#FF0055"/>
```
*(Keep all `<g clip-path=...>` and `<defs>` paths identical — only the outer `width`, `height`, `viewBox`, and background `<rect>` expand symmetrically so CSS `rounded-xl` / `rounded-full` badges NEVER clip the flame tip or bottom speed lines!)*

### 5B. Exact Native `useElementHeight` + Phone-Width Floating Animated Drawer (`@base-ui/react` + `motion/react`)
```tsx
// src/hooks/use-element-height.ts (replaces react-use-measure with 0 deps)
import { useEffect, useRef, useState } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => setHeight(node.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return [ref, height] as const;
}
```
```tsx
// Inside DishCustomizerDrawer.tsx (uses our real shadcn Base UI Drawer + motion/react)
// Override DrawerContent className so desktop vertical drawer stays compact phone-width:
<DrawerContent className="data-[swipe-axis=y]:inset-x-4 data-[swipe-axis=y]:mx-auto data-[swipe-axis=y]:w-[calc(100%-2rem)] data-[swipe-axis=y]:max-w-[400px] sm:data-[swipe-axis=y]:max-w-[420px] data-[swipe-direction=down]:bottom-4 overflow-hidden rounded-[32px] border border-border/80 bg-popover shadow-2xl">
  <motion.div
    animate={{ height }}
    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", duration: 0.32, bounce: 0 }}
    className="overflow-hidden"
  >
    <div ref={measureRef} className="max-h-[82dvh] overflow-y-auto overscroll-contain">
      {/* Switch cleanly between "customize" and "allergens" views */}
    </div>
  </motion.div>
</DrawerContent>
```

### 5C. Exact 60fps Glyph-Atlas `AsciiFooter` Engine Adapted for Daylight Joke Ripple (0 Deps!)
Use these exact proven constants and rendering mechanics inside `src/components/layout/AsciiFooter.tsx` (written with `Array<Cell>`, `backdrop={false}`, **zero** `"Lumen"` / demo autoplay, and **zero** dark-mode page flip):
- **Atlas & Grid Constants:**
  - `RAMP = " .:-=+*#%@"` · `LV = 24` grey shades + row `24` in brand accent RGB (`#e0522c` warm coral / read from `getComputedStyle(root)`!).
  - Canvas dimensions: `W = cv.clientWidth`, `H = Math.round(W * 0.32)`, `dpr = Math.min(2, window.devicePixelRatio || 1)`, `cw = Math.max(5, W / 210)`, `ch = cw * 1.5`, `SY = 1.38` vertical stretch.
  - Offscreen font mask: draw `brand` (`800` Plus Jakarta Sans / Inter) fitted to `97%` width, sample alpha coverage `cov` (`>= 0.04`) into `Array<Cell>` (`{ x, y, cov, gi, heat, delay, seed, wait }`).
  - Pre-render every glyph `k = 1..RAMP.length-1` across `r = 0..LV` into one offscreen `atlas` canvas (`JetBrains Mono` / `ui-monospace`), then blit via `ctx.drawImage(atlas, ...)` (zero per-frame text layout = locked 60fps!).
- **Hover Scramble (Desktop Fine Pointer Only):**
  - Gate pointer listeners on `window.matchMedia("(hover: hover) and (pointer: fine)").matches` and `prefers-reduced-motion: no-preference`.
  - Hovering cells within `r = Math.max(120, W * 0.13)` warms `c.heat` after per-cell `c.delay`, scrambles glyphs (`tick14`), shifts monochrome lightness toward `#121214` with subtle shimmer wave (`Math.sin((c.x + c.y * 0.6) / 46 - t * 6)`), and decays smoothly when leaving.
- **Daylight Joke Trigger (`triggerRipple()`):**
  - Instead of flipping `dark = true`, clicking the footer Sun/Moon toggle calls `triggerRipple()` (computes toggle center `(ox, oy)` relative to canvas and sets `tStart = performance.now() + 16`), sending the **1600ms radial brand-accent ring** (`ring = maxR * (0.5 - 0.5 * Math.cos(Math.PI * tt))`, twisting glyphs `rot = (c.seed - 0.5) * Math.PI * 1.4 * e` in accent color) across the giant wordmark while the switch knob **shakes horizontally back to Daylight Sun** and opens the anchored `shadcn Popover` (`Open Kitchen Pass ->`)!
- **4-Layer Progressive Bottom Blur (`height: 40%`, `pointer-events: none`):**
  1. `backdrop-filter: blur(1px); mask: linear-gradient(transparent 0%, #000 25%, #000 50%, transparent 75%);`
  2. `backdrop-filter: blur(2.5px); mask: linear-gradient(transparent 25%, #000 50%, #000 75%, transparent 100%);`
  3. `backdrop-filter: blur(6px); mask: linear-gradient(transparent 50%, #000 75%);`
  4. `backdrop-filter: blur(9px); mask: linear-gradient(transparent 70%, #000 100%);`
- **Reduced Motion:** When `prefers-reduced-motion: reduce`, paint **1 crisp static ASCII frame** on mount/resize and do not start `requestAnimationFrame`.

### 5D. Exact Zero-Dep Bayer 4×4 SVG `<DitherGlow />` Side Panel (`src/components/shared/DitherGlow.tsx`)
Port ONLY the clean Bayer 4×4 ordered-dither SVG art from the user's side-split card (NO `@mebius`, NO Radix UI, NO Lucide, NO `animejs` — animate staggered level entrance with `motion/react` or pure CSS):
```tsx
// src/components/shared/DitherGlow.tsx
const BAYER: ReadonlyArray<ReadonlyArray<number>> = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const CELL = 3;
const PANEL_WIDTH = 230;
const COLUMNS = Math.ceil(PANEL_WIDTH / CELL);

const DITHER_ROWS =
  "32573863 7245--51 40693459 --53--47 32573863 7245--51 40653459 --537447 32573863 6845--51 40653459 --537047 " +
  "32573863 68457451 40653459 --537047 32573863 68457451 40653459 76537047 32573863 68457451 40653459 --537047 " +
  "32573863 68457451 40653459 --537447 32573863 6845--51 40653459 --537447 32573863 7245--51 40693459 --53--47 " +
  "32573863 7245--51 44693463 --57--47 32573867 --45--51 44733863 --57--51 32613867 --45--55 44--3863 --57--51 " +
  "36614271 --49--55 44--3867 --57--51 366542-- --49--55 44--3871 --61--51 366542-- --49--59 48--3875 --61--55 " +
  "366942-- --49--59 48--42-- --65--55 36--46-- --53--63 48--42-- --69--59 40--46-- --53--63 52--42-- ------59 " +
  "40--46-- --57--67 52--46-- ------63 40--50-- --61---- 56--46-- ------67 44--50-- --61---- 56--50-- -------- " +
  "44--54-- --69---- 60--50-- -------- 48--58-- -------- 64--54-- -------- 48--58-- -------- 72--54-- -------- " +
  "52--66-- -------- ----58-- -------- 56--70-- -------- ----62-- -------- 60------ -------- ----70-- -------- " +
  "64------ -------- -------- -------- 72------";

function buildDitherLevels(): { levels: Array<string>; height: number } {
  const levels = Array.from({ length: 16 }, () => "");
  const lines = DITHER_ROWS.split(" ");
  lines.forEach((line, row) => {
    const y = row * CELL;
    for (let phase = 0; phase < 4; phase += 1) {
      const start = Number.parseInt(line.slice(phase * 2, phase * 2 + 2), 10);
      if (Number.isNaN(start)) continue;
      const level = BAYER[row % 4]?.[phase] ?? 0;
      for (let col = start; col < COLUMNS; col += 4) {
        levels[level] += `M${col * CELL} ${y}h${CELL}v${CELL}h-${CELL}z`;
      }
    }
  });
  return { levels, height: lines.length * CELL };
}
```
Render `<svg shapeRendering="crispEdges" className="pointer-events-none absolute top-0 end-0 rtl:-scale-x-100 fill-primary/65" ...>` inside the left art panel of the `/table` Check-In Card (**Table PIN + First Name ONLY — ZERO login `C-08`!**).
