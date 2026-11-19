# Pre-Ship Visual, Accessibility, Copy & Performance QA Gate

> **Document ID:** `11-real-qa-and-anti-slop-verification-gate.md`  
> **Enforces:** Decision #6 (`03-decisions/SIX-DECISIONS-ROADMAP.md` — Real Verification at Every Step)  
> **Applies To:** Every vertical feature slice, Paper MCP design checkpoint, Layer 2/3 polish pass, and the Pre-Defense Cloudflare deployment  
> **Rule Zero:** Never write *"looks good"* or rubber-stamp a slice. A gate passes **only** with concrete measured evidence (CLI exit codes, computed contrast numbers, real browser screenshots, and executed break-tests). Any check you could not run MUST be marked **`NOT VERIFIED`**, never `PASS`.

---

## 0. How This Gate Works (Pass / Block Rules)

This checklist turns subjective taste into a **binary `APPROVE` / `BLOCK` contract** across five independent gates:

| Gate | Domain | Skills & Specs Enforced | Auto-Block Triggers (`HIGH` on Sight) |
| :--- | :--- | :--- | :--- |
| **Gate 1** | **Copy & Anti-Slop** | `clean-copy`, `unslop-ui`, `better-writing` | Any U1/U3/U4/U5/U9/U10/U11 tell, AI buzzword, em-dash in UI microcopy, or error message with no recovery path. |
| **Gate 2** | **WCAG AA & OKLCH Color** | `better-colors`, `better-accessibility`, `VISUAL-DIRECTION.md` | Any text/control pair below WCAG AA (`4.5:1` / `3:1`), missing focus ring, color-only status, or hardcoded hex in `.tsx`. |
| **Gate 3** | **Typography, Layout & Responsive** | `better-typography`, `better-layout`, `better-ui`, `better-accessibility` | Any horizontal scroll, sub-`13px` fold text, `<16px` mobile input, `<44px` mobile / `<48px` KDS target, RTL clip, or broken concentric math. |
| **Gate 4** | **Core Web Vitals & Assets** | `ASSET-STRATEGY.md`, `better-ui`, `better-accessibility` | Hero missing `fetchpriority="high"`, `CLS > 0.05`, `.webp` over ceiling, motion ignoring `prefers-reduced-motion`, or **any** console error / React warning. |
| **Gate 5** | **Unhappy-Path Break-Tests** | `SIX-DECISIONS-ROADMAP.md`, `convex` + `vitest` + Playwright | Any crash, duplicate order/charge, piaster rounding drift, unblocked `86` checkout, or 404 white-screen across the 15 scenarios. |

**Verdict Logic:**
- **`BLOCK`**: One or more `HIGH` findings remain, any automated check exits non-zero, or any critical viewport/scenario is `NOT VERIFIED`.
- **`APPROVE`**: Zero `HIGH` findings, zero console errors, all 5 gates verified with recorded evidence. Remaining `MEDIUM`/`LOW` polish items stay logged as tracked follow-ups.

**Baseline CLI Pre-Check (Must Exit `0` Before Visual QA Begins):**
```bash
npm run typecheck   # tsc --noEmit (strict: true, zero `any`)
npm run lint        # oxlint (0 errors, 0 warnings)
npm run test        # vitest + convex-test (100% pass)
npm run build       # vite build (clean production bundle)
```

---

## Gate 1 — Copy & Anti-Slop Pass (`clean-copy` + `unslop-ui` + `better-writing`)

Before shipping any screen, drawer, toast, or empty state, ask **"Should this string exist?"** on every text node. Delete first; tighten second.

### 1.1 Exact 12-Item Grep & Visual Audit Matrix

| # | Tell / Code | What It Catches | Automated Grep / Pattern Check | Fail Example (Slop) | Pass Example (Hospitality Clean) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | **U1 — Eyebrow Spam** | Tiny uppercase micro-labels stacked above headings (`01 //`, `INTRODUCING`, `STEP 01`, `FEATURED`, `OUR MENU`). | `rg -n 'uppercase.*tracking-(wider\|widest)\|0[1-9]\s*//\|INTRODUCING\|WELCOME TO' src/` | `01 // SIGNATURE MENU` above `<h2>Menu</h2>` | Delete eyebrow entirely. Let `<h2>Signature Menu</h2>` stand alone. |
| **2** | **U3 — Redundant Subtitle Reflex** | A subhead that merely paraphrases the heading directly above it. | Visual inspect every `<h1>`/`<h2>`/`<h3>` + adjacent `<p>`. | `<h2>Shared Table Cart</h2>` + `<p>View and manage the items in your table cart</p>` | `<h2>Table 5 Cart</h2>` (no subtitle; show useful data like `3 diners · 4 items` only if real). |
| **3** | **U4 — Botsplaining** | Patronizing copy telling the user how obvious UI controls work. | `rg -ni 'click (the\|here\|below\|above)\|use the (search\|filter)\|tap here to\|to get started' src/` | `"Use the search bar below to find your favorite dishes."` | Search input placeholder: `"Search burgers, pizza, drinks"` (example, not instruction). |
| **4** | **U5 — Leaked Design / Chat Notes** | Builder/LLM meta-commentary left inside rendered strings. | `rg -ni 'updates in real ?time\|this card shows\|this section\|powered by convex\|demo mode\|placeholder\|phase [0-9]\|mvp\|todo' src/` | `"(Updates automatically in real time)"` or `"Live Demo Table"` | Delete meta-note. Let the real-time update speak for itself. |
| **5** | **U9 — Fake / Stateless Badges** | Hardcoded `NEW`, `HOT`, `AI`, `BETA`, `POPULAR`, `BEST` pills not backed by real Convex schema fields. | `rg -n '<Badge\|rounded-full' src/` — verify every badge binds to real data (e.g., `dish.isSoldOut`, `dish.isSignature`). | Hardcoded `<Badge>NEW</Badge>` or `<Badge>AI-POWERED</Badge>` on static cards. | Data-driven `<Badge>Sold out</Badge>` when `dish.status === "86"`, or omit badge completely. |
| **6** | **U10 — Fake Pulsing Status Dots** | Decorative `animate-pulse` / `animate-ping` green or red dots next to static text (also violates WCAG 2.2.2 if looping >5s without pause). | `rg -n 'animate-pulse\|animate-ping\|animate-bounce' src/` (allow `animate-pulse` ONLY on temporary loading skeletons, never on status indicators!). | Pulsing green dot beside hardcoded `"Kitchen Live"` on `/`. | Static crisp status text backed by real query: `"Kitchen prep ~12 min"` (no blinking dot). |
| **7** | **U11 — Emojis as Icons** | Unicode emojis used inside buttons, headings, badges, or category pills (`🔥`, `🍔`, `🍕`, `✨`, `🚀`, `✅`, `⚡`, `👨‍🍳`). | `rg -n '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' src/` | `"🔥 250°C Sear"` or `"🍔 Burgers"` | Crisp single-family SVG icon (`Hugeicons`) + `"Burgers"`. |
| **8** | **Em-Dashes (`—`) & Colon Reveals** | Dramatic em-dashes (`—`), double hyphens (`--`), contrast clichés (`"Not just X, it's Y"`), or rhetorical questions in UI microcopy. | `rg -n '—\|--\|not just .* it.?s\|the result\?\|the best part:' src/` | `"Your cart is empty — start adding dishes!"` | `"Your table cart is empty."` + primary button `"Browse menu"`. |
| **9** | **AI Buzzword Blacklist** | Inflated LLM marketing adjectives conveying zero physical fact. | `rg -ni '\b(seamless\|effortless\|robust\|powerful\|unlock\|streamline\|elevate\|supercharge\|cutting-edge\|revolutionary\|next-gen\|dynamic\|curated\|delightful\|reimagine)\b' src/` | `"Unlock a seamless dining experience"` | `"Order together at Table 5. Split the bill in one tap."` |
| **10** | **Robotic Errors & Politeness Bloat** | `"Oops!"`, `"Something went wrong"`, exclamation marks in errors, `"successfully"`, `"Please"` in routine steps, `"Are you sure?"`. | `rg -ni 'oops\|whoops\|something went wrong\|successfully\|are you sure\|please (enter\|select\|click)' src/` + check error strings for `!`. | `"Oops! Something went wrong! Please try again."` | `"Unable to place order. Check your connection and try again."` |
| **11** | **Non-Verb Buttons & Vague Links** | Generic buttons (`OK`, `Yes`, `No`, `Submit`, `Proceed`, `Let's go!`) or contextless links (`Click here`, duplicate `Learn more`). | `rg -ni '>(ok\|yes\|no\|submit\|proceed\|click here\|learn more\|let.?s go)!?<' src/` | Dialog buttons: `Yes` / `No` | Verb + object: `Remove dish` / `Keep dish`; `Join Table 5`; `Clear filters`. |
| **12** | **Broken Plurals, Hardcoded Currency & Mixed Voice** | Fragment string concatenation (`"You have " + n + " items"`), naive `n === 1 ? "" : "s"` (breaks Arabic 6-form plurals!), or inconsistent case (`Save Changes` next to `Discard changes`). | `rg -n '\?\s*""\s*:\s*"s"\|toLocaleDateString\(\)\|EGP\s*\+' src/` | `` `${count} item${count === 1 ? "" : "s"}` `` | `Intl.PluralRules` / ICU message + `Intl.NumberFormat(locale, { style: "currency", currency: "EGP" })`. Consistent sentence case across all buttons. |

### 1.2 Mandatory Cut Log (Gate 1 Evidence)
Before marking Gate 1 `PASS`, run the grep pack across `src/` (excluding test fixtures) and verify:
- **0 hits** on Rules `#1, #4, #6, #7, #8, #9, #10, #11, #12`.
- Manual screen walk confirms **0 instances** of Rules `#2 (U3)`, `#3 (U4)`, and `#5 (U9)`.
- **Hero Copy Ceiling:** `<h1>` lands in `<= 2` balanced lines (`text-wrap: balance`); supporting line `<= 15` words.

---

## Gate 2 — Mathematical WCAG AA & OKLCH Color Gate (`better-colors` + `better-accessibility`)

> **Plain-English Primer:** **OKLCH** is a perceptual color space (`L` = perceived lightness `0–1`, `C` = chroma/vividness, `H` = hue angle `0–360°`). Unlike HSL, changing `L` reliably predicts human readability. **WCAG 2.2 Contrast** measures mathematical luminance ratio (`1:1` to `21:1`); **APCA (`Lc`)** measures perceived lightness contrast (`Lc 75` for body, `Lc 90` for kitchen-distance viewing).

### 2.1 Non-Negotiable Thresholds

| Criterion / Role | Minimum Threshold | Applies To |
| :--- | :---: | :--- |
| **WCAG 1.4.3 AA — Normal Text** | **`>= 4.5:1`** *(APCA `>= Lc 75` body / `Lc 60` UI labels)* | Body copy, dish descriptions, prices, small pills, button labels `< 18.67px` bold or `< 24px` regular, muted metadata. |
| **WCAG 1.4.3 AA — Large Text** | **`>= 3.0:1`** *(APCA `>= Lc 45`)* | Text `>= 24px` regular OR `>= 18.67px` (`>= 19px`) bold (`700`) — e.g., hero primary CTA buttons & large section titles. |
| **WCAG 1.4.11 AA — UI & Graphics** | **`>= 3.0:1`** *(APCA `>= Lc 30–45`)* | Form input borders, radio/checkbox edges, switch tracks, active tab indicators, focus rings, meaningful icons. |
| **KDS 2-Meter Kitchen Pass (`/kds`)** | **`>= 7.0:1` primary text (`>= 4.5:1` badges/timers)** *(APCA `>= Lc 90` primary)* | Dark Charcoal KDS ticket lines read from 2 meters under bright overhead kitchen lighting. |
| **WCAG 1.4.1 — Color + Second Cue** | **Mandatory** | Every status (`86 Sold Out`, `New`, `On the Grill`, `Ready`, `Late > 15m`, form error) MUST pair color with an icon or explicit label. |

### 2.2 Pre-Computed Mathematical Contrast Matrix (All 3 Temperaments + Dark KDS)

All ratios below are computed from the exact sRGB/OKLCH values in `02-design-vision/VISUAL-DIRECTION.md` (relative luminance formula, WCAG 2.1/2.2). **Pay close attention to the `TRAP` rows — these are mathematically proven failures if misused.**

#### Temperament A — "Sunlit Kiln & Terracotta"
| Foreground → Background Pair | Hex Pair | Measured Ratio | Normal Text (`4.5:1`) | Large Bold / UI (`3.0:1`) | Usage Rule |
| :--- | :--- | :---: | :---: | :---: | :--- |
| Primary Ink on Warm Linen Canvas | `#1D1916` on `#F4F0E8` | **`15.36:1`** | PASS (AAA) | PASS | Body, headings, primary labels. |
| Primary Ink on Pure Paper Card | `#1D1916` on `#FFFFFF` | **`17.46:1`** | PASS (AAA) | PASS | Card titles, drawer text. |
| Primary Ink on Soft Oat Surface | `#1D1916` on `#ECE6DC` | **`14.07:1`** | PASS (AAA) | PASS | Pill tabs, subtle recessed trays. |
| White on Kiln Terracotta | `#FFFFFF` on `#D14928` | **`4.47:1`** | **FAIL (TRAP!)** | PASS | **Large bold CTAs (`>= 19px` bold) ONLY.** Never use for `14–16px` buttons or small pills! |
| Kiln Terracotta on Warm Linen | `#D14928` on `#F4F0E8` | **`3.94:1`** | **FAIL (TRAP!)** | PASS | Icons, focus accents, `>= 24px` display highlights only. Never small links/badges! |
| White on Roasted Clay *(Small-Text Accent)* | `#FFFFFF` on `#B3391C` | **`5.97:1`** | **PASS** | PASS | **Required fill for normal `14–16px` primary buttons, small pills & hover states.** |
| Roasted Clay on Warm Linen / Soft Oat | `#B3391C` on `#F4F0E8` / `#ECE6DC` | **`5.25:1` / `4.81:1`** | **PASS** | PASS | Inline accent text, active prices, text links on light surfaces. |
| Warm Linen on Charred Walnut *(KDS / Dock)* | `#F4F0E8` on `#171412` | **`16.13:1`** | PASS (AAA) | PASS | KDS ticket text & Floating Cart Dock primary ink (`2m` readable). |
| Kiln Terracotta on Charred Walnut *(KDS / Dock)* | `#D14928` on `#171412` | **`4.10:1`** | **FAIL (TRAP!)** | PASS | Icons/borders on dark dock only. For small accent text on dark, use luminous dark token (`oklch(0.68 0.17 34)`, `>= 5.8:1`). |

#### Temperament B — "Ember Vermilion & Studio Stone"
| Foreground → Background Pair | Hex Pair | Measured Ratio | Normal Text (`4.5:1`) | Large Bold / UI (`3.0:1`) | Usage Rule |
| :--- | :--- | :---: | :---: | :---: | :--- |
| Carbon Slate on Studio Stone / Paper | `#1B1A19` on `#F2F0EC` / `#FFFFFF` | **`15.27:1` / `17.38:1`** | PASS (AAA) | PASS | Primary headings, body, menu cards. |
| White on Ember Flame | `#FFFFFF` on `#EB4A1E` | **`3.80:1`** | **FAIL (TRAP!)** | PASS | **Large bold CTAs (`>= 19px` bold) or UI shapes ONLY.** Never `14–16px` white button labels! |
| Carbon Slate on Ember Flame *(Alternative)* | `#1B1A19` on `#EB4A1E` | **`4.58:1`** | **PASS** | PASS | Valid if dark-ink-on-ember CTA is chosen; verify legibility in Paper screenshot. |
| Ember Flame on Studio Stone / Paper | `#EB4A1E` on `#F2F0EC` / `#FFFFFF` | **`3.34:1` / `3.80:1`** | **FAIL (TRAP!)** | PASS | Icons & borders only — never body/small link text. |
| White on Deep Ember *(Small-Text Accent)* | `#FFFFFF` on `#C43812` | **`5.35:1`** | **PASS** | PASS | **Required fill for normal `14–16px` white-text buttons & badges.** |
| Deep Ember on Studio Stone / Paper | `#C43812` on `#F2F0EC` / `#FFFFFF` | **`4.70:1` / `5.35:1`** | **PASS** | PASS | All `< 19px` accent text, inline prices, active nav links. |
| Studio Stone on Cast-Iron Obsidian *(KDS / Dock)* | `#F2F0EC` on `#141312` | **`16.30:1`** | PASS (AAA) | PASS | KDS ticket text & Floating Cart Dock primary ink. |
| Ember Flame on Cast-Iron Obsidian *(KDS / Dock)* | `#EB4A1E` on `#141312` | **`4.89:1`** | **PASS** | PASS | Passes normal text & UI directly on dark dock/KDS! |

#### Temperament C — "Roasted Crimson & Warm Cream"
| Foreground → Background Pair | Hex Pair | Measured Ratio | Normal Text (`4.5:1`) | Large Bold / UI (`3.0:1`) | Usage Rule |
| :--- | :--- | :---: | :---: | :---: | :--- |
| Deep Roast on Sunlit Ivory / Paper | `#1E1715` on `#F7F3EC` / `#FFFFFF` | **`15.97:1` / `17.67:1`** | PASS (AAA) | PASS | Primary headings, body, menu cards. |
| White on Heirloom Vermilion-Red | `#FFFFFF` on `#C83226` | **`5.33:1`** | **PASS** | PASS | Passes normal button sizes directly with crisp white text! |
| Heirloom Vermilion on Sunlit Ivory | `#C83226` on `#F7F3EC` | **`4.82:1`** | **PASS** | PASS | Normal text links & badges on canvas/white cards. |
| Heirloom Vermilion on Blush Sand | `#C83226` on `#EFE9DF` | **`4.41:1`** | **FAIL (TRAP!)** | PASS | **Misses AA by `0.09` on Blush Sand!** Use Ember Garnet `#A3241A` (`6.16:1`) on `#EFE9DF`. |
| White on Ember Garnet *(Hover / Deep)* | `#FFFFFF` on `#A3241A` | **`7.43:1`** | PASS (AAA) | PASS | Hover fills, small pills, high-emphasis badges. |
| Sunlit Ivory on Smoked Charcoal *(KDS / Dock)* | `#F7F3EC` on `#161211` | **`16.82:1`** | PASS (AAA) | PASS | KDS ticket text & Floating Cart Dock primary ink. |
| Heirloom Vermilion on Smoked Charcoal *(KDS)* | `#C83226` on `#161211` | **`3.49:1`** | **FAIL (TRAP!)** | PASS | Large/UI only on dark. For small accent text on KDS/dock, use dark-surface luminous token (`oklch(0.66 0.19 27)`, `>= 5.3:1`). |

### 2.3 Cross-Temperament Token, Focus Ring & KDS Readability Checks

1. **`--muted-foreground` Floor (No Washed-Out Gray Text):**
   - On light surfaces (especially secondary surfaces `#ECE6DC` / `#EFE9DF`), `--muted-foreground` MUST have **OKLCH `L <= 0.48`** (`>= 4.8:1` on Soft Oat, `>= 5.5:1` on Warm Linen). Default Tailwind `zinc-500` (`L ≈ 0.55`, `3.88:1` on Soft Oat) is an automatic **FAIL**.
2. **Input & Control Boundaries (WCAG 1.4.11 `>= 3.0:1`):**
   - While dish cards stay borderless/tonal, every text input, search box, Table PIN field, radio button, and checkbox MUST have a rendered border of **`>= 3.0:1`** against its parent surface (`OKLCH L <= 0.60` on warm canvas; `L <= 0.64` on `#FFFFFF`). Faint `border-zinc-200` (`~1.3:1`) is an automatic **FAIL**.
3. **Translucent Surfaces & Photo Overlays:**
   - **Floating Frosted Nav Pill** and **Floating Dark Cart Dock**: inspect rendered text contrast when scrolled over both pure `#FFFFFF` cards AND dark charred-burger photography. Background alpha must stay high enough (or carry a subtle scrim) that text never dips below `4.5:1`.
   - **Photo Badges (`Sold out`, `Spicy`, `250°C`)**: never place bare white text directly on a food photo. Always sit inside a solid pill or verified `>= 55%` dark scrim.
4. **Focus-Visible Ring Verification (WCAG 1.4.11 + 2.4.13):**
   - Style `:focus-visible` (never bare `:focus`); **zero** `outline-none` without a verified replacement.
   - `outline: 2px solid var(--focus-ring); outline-offset: 2px;`.
   - Measure `--focus-ring` against **both** light surfaces (`>= 3.0:1`, e.g., `#B3391C` / `#1D1916`) AND dark surfaces (`/kds` & Floating Cart Dock MUST define a high-luminance dark-surface `--focus-ring`, e.g., `oklch(0.78 0.15 55)`, `>= 7:1` on `#171412`).
   - Cards using `box-shadow` rings MUST keep `border: 1px solid transparent` so Windows `forced-colors: active` still renders visible edges.
5. **Dark Charcoal KDS (`/kds` / `#kds`) 2-Meter Readability & Hue Separation:**
   - Stand 2 meters from the `1180×820` tablet/desktop view (or view zoomed out to `50%`): Table number (`>= 22px` bold), elapsed timer (`>= 20px` `tabular-nums`), and dish line items (`>= 18px`) MUST remain effortlessly scannable.
   - **Status Hue Separation (`better-colors`):** Every operational status hue MUST sit **`>= 15°` away** in OKLCH hue from the hearth accent (`H ≈ 27°–35°`):
     - `NEW`: Crisp Warm Linen (`L ≈ 0.95`, `C <= 0.01`) + `"NEW"` tag.
     - `ON GRILL`: Warm Amber (`H ≈ 80°`, `L >= 0.80`) + flame icon + `"ON GRILL"`.
     - `READY`: Sage/Emerald (`H ≈ 150°`, `L >= 0.76`) + check icon + `"READY"`.
     - `LATE (>15m)` / `86`: Luminous Coral-Red (`L >= 0.68` on dark) + alert icon + `"LATE"` / `"86 SOLD OUT"` (never color alone!).
6. **Single-Place OKLCH Token Hygiene & 90/10 Accent Budget:**
   - Grep `src/components/` and `src/features/` for hardcoded `#([0-9a-fA-F]{3,8})`, `rgb(`, `hsl(`, or raw `oklch(` — MUST return **0 hits** (all colors live exclusively in `src/index.css` `@theme inline` semantic tokens).
   - Verify any Display-P3 wide-gamut `oklch()` token declares an sRGB fallback first, then overrides inside `@media (color-gamut: p3)`.
   - Verify hearth accent occupies **`<= 10%`** of viewport area and **exactly one** filled primary action competes per view (`better-colors`).

---

## Gate 3 — Typography, Layout & Responsive Stress Gate

### 3.1 Five Mandatory Viewport + Zoom Matrix

Capture and inspect real browser screenshots at **every** viewport below after each slice (not just desktop!):

| Viewport Profile | Dimensions | Key Layout Assertions |
| :--- | :---: | :--- |
| **1. Desktop Wide** | `1440×900` | Centered `1200–1280px` container, `3-col` dish grid (`24px` gaps), centered hero copy measure `600–720px`, Hero `16:9` stage peeks cleanly above fold. |
| **2. Desktop Laptop** | `1280×800` | Floating Nav Pill fits on 1 crisp row without wrapping; Hero `<h1>` + both CTAs + top of hero visual visible above fold with zero overlap. |
| **3. Tablet KDS (Landscape)** | `1180×820` | `/kds` shows `3–4` readable ticket columns; every strike-line & stage-bump button `>= 48px` tall; header filters + `86` stock toggle reachable without scrolling off-screen. |
| **4. Mobile Modern** | `390×844` | Single-column flow, `16px` inline margins, horizontal category pills peek `16–32px` past right edge to signal scrollability, Floating Cart Dock clears `env(safe-area-inset-bottom)` and never hides last card's `+ Add` button (page bottom padding `>= dockHeight + 24px`). |
| **5. Mobile Compact + WCAG Reflow** | `375×667` *(+ `320px` & `200%` zoom spot-check)* | Zero clipped labels, zero wrapped broken price badges, zero horizontal scroll at `375px` AND `320px` (WCAG 1.4.10), zero overlapping text at `200%` text resize (WCAG 1.4.4). |

### 3.2 Quantitative Pass/Fail Checklist

| # | Check | Exact Pass Condition | Detection / Verification Method |
| :-: | :--- | :--- | :--- |
| **1** | **Zero Horizontal Scroll** | `document.documentElement.scrollWidth <= window.innerWidth` at `1440`, `1280`, `1180`, `390`, `375`, and `320px`. | Run in browser console at every viewport; grep ban `100vw` (use `100%`) and `100vh` on drawers/sheets (use `100dvh`). |
| **2** | **Hospitality Typography Floor** | **Zero `< 13px` text above the fold.** Exact floors: `H1` `52–72px` desktop (`34–42px` mobile), `H2` `36–48px`, Dish Titles `20–22px`, Body/Descriptions `16–17px` (`unitless line-height: 1.5–1.6`), Metadata/Badges `>= 13px`. Weight `>= 400` on all text `< 18px`. | Compute `getComputedStyle(el).fontSize` across every visible text node above fold; verify unitless `line-height` and `rem` font sizing (`better-typography`). |
| **3** | **Tabular Numbers & Font Budget** | Every price (`199.00 EGP`), timer (`08:42`), item count, and split share uses `font-variant-numeric: tabular-nums` (`tabular-nums` utility). Max **2 font families** loaded (unless Decision #4 approves a 3rd); `-webkit-font-smoothing: antialiased` set once on root only. | Inspect computed `fontVariantNumeric` on prices/timers; watch digits change (`99 → 100`) to confirm zero horizontal jitter. |
| **4** | **iOS Input Zoom Guard** | Every `<input>`, `<textarea>`, and `<select>` has computed `font-size >= 16px` (`text-base`) on viewports `< 640px`. Viewport `<meta>` MUST NOT contain `maximum-scale=1` or `user-scalable=no`. | Inspect Search input, Table PIN boxes, Nickname input, Special Instructions textarea, and Staff Login fields at `390×844` and `375×667`. |
| **5** | **Minimum Tap Targets & KDS Ergonomics** | Mobile interactive controls **`>= 44×44px`** (desktop dense controls `>= 40×40px`, never below WCAG 2.5.8 `24×24px` + clearance). **`/kds` dish strike-lines, `86` toggles, and `New → On Grill → Ready` buttons `>= 48px` tall.** | Measure `getBoundingClientRect()` on all buttons, checkboxes, filter pills, and KDS rows; confirm zero overlapping hit areas and `pointer-events: none` on decorative layers. |
| **6** | **`min-w-0` & Bilingual EN/AR RTL Stress Test** | Every flex child holding dynamic text sets `min-w-0`; every CSS grid track uses `minmax(0, 1fr)`. Test with both a **45-character English dish title** AND an **Arabic RTL string** (`dir="rtl"`, e.g., `"برجر لحم أنجوس مدخن مع جبن شيدر معتق وصوص الباربكيو"`) + mixed-direction order codes wrapped in `<bdi>` (`#C-201`). | Toggle `dir="rtl"` on `<html>`: verify logical properties (`ps-/pe-/ms-/me-/text-start`), zero physical `left/right` breakage, zero clipped prices, and mirrored directional arrows only (never mirror clocks, checkmarks, or `250°` wordmark). |
| **7** | **Concentric Corner Radius Math** | Strict rule: **`outerRadius = innerRadius + padding + borderWidth`** (applies whenever `padding <= 24px` and inset is uniform). **Doc Correction Guard:** `VISUAL-DIRECTION.md` drafted `24px outer + 16px inner + 16px padding` — that is NOT concentric (`16 + 16 = 32 ≠ 24`). Enforce one exact pair: **`24px` outer (`rounded-3xl`) + `8px` photo-frame pad (`p-2`) + `16px` inner photo (`rounded-2xl`)** OR **`32px` outer (`rounded-[32px]`) + `16px` pad (`p-4`) + `16px` inner photo**. | Inspect computed `borderRadius` and `padding` of Menu Cards, Hero Stage (`36px`), Floating Cart Dock (`28px` + `8px` pad -> `20px`/`9999px` inner pills), and Drawers. |
| **8** | **Keyboard Walk, Focus Trap & Sticky Clearance** | Complete an entire flow (Home → Menu → Open Dish Customizer → Select Modifiers → Add → Open Cart → Split Checkout) using **Tab / Shift+Tab / Arrow / Enter / Space / Escape ONLY**. `scroll-padding-block-start` >= Nav Pill height; `scroll-padding-block-end` >= Floating Cart Dock height (WCAG 2.4.11). | Verify Base UI `<Dialog>`/`<Drawer>` traps focus, closes on `Escape`, restores focus to trigger; route changes update `document.title` and focus `<h1>`/`<main>`; first focusable element is `"Skip to content"` link. |
| **9** | **Single Icon Family & Surface Discipline** | **100% single icon library** as locked in `DECISIONS.md` (`Hugeicons` free rounded set recommended — zero mixing of Hugeicons + Lucide + Heroicons + pixel icons). Every icon uses `currentColor` (zero hardcoded SVG hex fills). Content food photos carry `outline outline-1 -outline-offset-1 outline-black/10`. | Grep imports across `src/` for mixed icon packages and hardcoded `fill="#` / `stroke="#` inside `.svg` / `.tsx`; grep ban `transition-all`. |

---

## Gate 4 — Core Web Vitals, Asset Ceilings & Runtime Hygiene Gate

> **Plain-English Primer:** **LCP** (Largest Contentful Paint) = how fast the main hero dish/visual renders. **CLS** (Cumulative Layout Shift) = visual jumping while content loads (`0` means rock-steady). **INP** (Interaction to Next Paint) = delay between tapping a button and seeing feedback.

### 4.1 Performance & Asset Ceilings

| Metric / Asset | Target (`PASS`) | Hard Fail (`BLOCK`) | Verification Method |
| :--- | :--- | :--- | :--- |
| **Hero LCP Image (`16:9`, `1600×900`)** | Local `.webp` **`< 220 KB`**, `fetchpriority="high"`, `loading="eager"`, explicit `width="1600" height="900"`; LCP **`<= 2.5s`** (Fast 4G) / `<= 1.5s` desktop. | Missing `fetchpriority="high"`, `loading="lazy"` on Hero, `>= 220 KB`, remote hotlink URL, or LCP `> 2.5s`. | Lighthouse / DevTools Performance trace + `ls -lh public/images/`. |
| **Dish Card Photos (`4:3`, `960×720`)** | Local `.webp` **`< 90 KB`** each, `loading="lazy"`, `decoding="async"`, explicit `width="960" height="720"`, locked `aspect-[4/3]` (`aspect-square` mobile). | Any dish `.webp >= 90 KB`, any `.png`/`.jpg` food photo, or missing `aspect-*` lock. | Asset size check script + DOM inspection. |
| **Story / Packaging Visuals (`1200×800`)** | Local `.webp` **`< 150 KB`** each, `loading="lazy"`. | `>= 150 KB` or multi-MB `.gif` (use `<video autoplay muted loop playsinline>` `.mp4`/`.webm` if ambient steam clip is used in Layer 3). | File audit in `public/images/`. |
| **Vectors & Optional Micro-Loader** | Custom `250°` SVG **`< 1 KB`**; empty-state spot SVGs **`< 2 KB`**; optional Layer 3 `.lottie` loader **`< 5 KB`**. | Bloated inline SVGs or unoptimized multi-hundred-KB Lottie JSON. | File size audit. |
| **Cumulative Layout Shift (`CLS`)** | **`<= 0.01`** (ideal `0.000`). Warm-stone skeletons match final card height; `font-display: swap`; Floating Cart Dock is `position: fixed`; `rolling-number` uses `tabular-nums`. | **`CLS > 0.05`** or visible jump when images, fonts, or cart dock load. | Chrome DevTools Performance / Lighthouse Layout Shift track on Cold Cache reload. |
| **Interaction Latency (`INP`)** | **`<= 100ms`** target (`<= 200ms` max) on category switch, search typing, modifier toggle, `+ Add`, and KDS strike-through. | **`INP > 200ms`** or sluggish frame drop on mobile CPU `4×` throttle. | DevTools Performance recording with `4×` CPU slowdown. |

### 4.2 Motion, Scroll & Runtime Hygiene Gate

| Check | Exact Requirement | How to Verify |
| :--- | :--- | :--- |
| **`prefers-reduced-motion` Toggle** | Emulate `prefers-reduced-motion: reduce`: Hero entrance reveals, `rolling-number` price rolls, icon morphs, drawer slides, and Layer 3 footer hover ripples MUST replace movement/scale/blur with instant states or subtle opacity cross-fades. Zero autoplay ambient loops. | DevTools Rendering panel → `Emulate CSS media feature prefers-reduced-motion: reduce` → reload `/` and test `+ Add`, Drawers, Footer. |
| **Overlay Scroll Containment** | Every scrollable Drawer/Dialog/Menu (`Dish Customizer`, `Shared Cart`, `Split Checkout`, mobile nav) sets **`overscroll-behavior: contain`**. | Open Cart Drawer with 6+ items on `390×844`, scroll aggressively past bottom & top: underlying `window.scrollY` MUST change by **`0px`**. |
| **Touch Hover Hygiene** | No stuck hover highlights after tapping buttons/cards on touch (`Tailwind v4` wraps `hover:` in `@media (hover: hover)`; verify custom CSS obeys the same rule and pressed buttons scale cleanly to `0.96` only when `:not(:disabled)`). | Test tap interactions in Mobile Device Emulation (touch pointer). |
| **Zero Console / React / Network Errors** | **0** `console.error`, **0** `console.warn` from React (hydration mismatch, missing/duplicate `key`, invalid DOM nesting like `<button>` inside `<button>`, uncontrolled-to-controlled input switch), **0** uncaught promise rejections, **0** `404`/`500` asset or font requests. | Inspect DevTools Console + Network tab across every route (`/`, `/menu`, `/table/5`, `/track/:id`, `/kds`) with `Preserve log` enabled. |
| **Production SPA Route Refresh** | Hard-refreshing deep routes (`/menu`, `/table/5`, `/track/demo`, `/kds`) on `vite preview` and Cloudflare Workers Static Assets returns `200` app shell (never Cloudflare `404`). | Verify `wrangler.jsonc` sets `assets.not_found_handling: "single-page-application"` and hard-reload every route live. |

---

## Gate 5 — Unhappy-Path Functional Break-Test Matrix (15 Scenarios)

Happy-path demos hide real bugs. Execute every applicable scenario below per feature slice, and run **all 15** before DEPI submission.

| ID | Scenario | Exact Reproduction Steps | Expected System & UI Behavior (Pass Condition) | Anti-Slop Copy & A11y Check |
| :-: | :--- | :--- | :--- | :--- |
| **UHP-01** | **Wrong Table PIN ×5 (Rate Limit)** | Open `/table/5`, submit an incorrect 4-digit PIN 5 times in a row. | Attempts 1–4 reject cleanly without clearing table context; Attempt 5 triggers server-side Convex rate-limit cooldown (e.g., 60s lockout with live `tabular-nums` countdown). PIN input marks `aria-invalid="true"`, binds inline error via `aria-describedby`, and recovers automatically after cooldown. | `"Too many attempts. Try again in 58s, or ask your server for Table 5's PIN."` (zero `"Oops!"`). |
| **UHP-02** | **Empty Search & Conflicting Filters** | On `/menu`, search `"zzzzq"` OR select `Drinks` + `Spicy` when 0 dishes match. | Calm empty state renders (never blank white void), names the query/filters, offers 1-tap `"Clear search and filters"` button that restores full menu immediately, and announces count in a stable pre-mounted `role="status"` region (`0 dishes found`). | `"No dishes match \"zzzzq\"."` + button `"Clear filters"`. |
| **UHP-03** | **Network Offline & Reconnect Banner** | While viewing `/menu`, inside Shared Cart, and on `/kds`, set DevTools Network to `Offline`, wait 3s, attempt `+ Add`, then restore `Online`. | Non-blocking offline banner appears (`role="status"`). Local form/note drafts stay intact; checkout submit prevents duplicate firing and explains offline block. Restoring `Online` auto-resyncs Convex subscriptions within `< 2s` with zero full-page reload and zero duplicate cart lines. | `"You're offline. Reconnecting to the kitchen…"` → clears cleanly on reconnect. |
| **UHP-04** | **Dish Marked `86` (Sold Out) While in Draft Cart** | Tab A (Table 5 Diner) adds `"Smoked Brisket Smash"` to Shared Cart. Tab B (`/kds`) flips that dish to `86 / Sold Out`. Tab A clicks `"Checkout"`. | Within `< 500ms`, Tab A's menu card shows `Sold out` badge/scrim (`+ Add` unavailable), Cart Drawer flags that specific line item, AND Convex checkout mutation **rejects server-side** (even if client check bypassed!). Checkout focuses the flagged item with 1-tap `"Remove item"`. | `"Smoked Brisket Smash just sold out. Remove it to place your order."` (paired with alert icon, not red color alone). |
| **UHP-05** | **Two Friends Clicking Checkout Simultaneously (Race Condition)** | Tab A (Diner 1) and Tab B (Diner 2) open Table 5 `Pay Full Table` checkout and click `"Place order"` at the exact same instant. | Convex transactional mutation checks open cart version/status atomically: **exactly ONE order** is created on `/kds` (zero duplicate tickets/charges). Tab A navigates to `/track/:orderId`; Tab B receives a graceful synchronized transition (`"Table 5's order was just placed by [Diner 1]"`) with 1-tap/auto navigation to the same `/track/:orderId`. | Calm neutral confirmation; zero raw Convex error dump. |
| **UHP-06** | **`100.01 EGP ÷ 3` Split-Bill Penny-Perfect Math** | Build a cart whose exact total (subtotal + service/VAT if applied) equals `100.01 EGP` (`10001` piasters) and select **`Split Equally (÷ 3)`**; also test `÷ 1`, `÷ 7`, and `0.01 EGP`. | Pure integer-piaster domain engine distributes remainder deterministically: shares display **`33.34 + 33.34 + 33.33 = 100.01 EGP`** (`sum(shares) === totalPiasters` invariant passes Vitest + matches live UI). Zero floating-point artifacts (`33.336666667`), zero dropped piaster. | Transparent breakdown label: `"Split 3 ways (1 piaster difference on final share)"` if uneven; `tabular-nums` alignment. |
| **UHP-07** | **Invalid Table Route `/table/999` & `/table/abc`** | Navigate directly to `/table/999` and `/table/abc` in the browser address bar. | No uncaught exception, no infinite spinner. Clean 404/invalid-table recovery view explains valid table range (`1–12`) with quick table-number entry + `"Browse menu"` and `"Back to home"` links. | `"Table 999 isn't active. Enter a table number from 1 to 12, or browse the menu."` |
| **UHP-08** | **Invalid Order Tracker `/track/bad-id`** | Navigate directly to `/track/bad-id` or a forged Convex ID string. | Query validates ID format safely (zero uncaught Convex `ArgumentValidationError` crashing ErrorBoundary!). Renders clean recovery state with `"Open your table cart"` and `"Explore menu"` actions. | `"We couldn't find that order. Check your table cart or start a new order."` |
| **UHP-09** | **Dish Customizer Missing Required Modifiers** | Open a customizable dish with required choices (e.g., `Patty Weight`, `Cheese`), leave them blank, and click `"Add to cart"`. | Submit button stays **enabled** (`better-accessibility`: validate on submit, never disabled mystery button). Missing fieldset highlights with `aria-invalid="true"`, inline error appears right beside the group, focus scrolls/moves to first invalid option, and drawer stays open. | `"Select a patty weight to add this dish."` (clear fix next to field). |
| **UHP-10** | **Concurrent Multi-Diner Cart Quantity & Delete Conflict** | Tab A and Tab B on Table 5 simultaneously tap `+` and `-` on the same item, OR Tab A deletes the item while Tab B edits its note. | Convex mutations reconcile atomically with zero negative quantities (`qty < 1` removes line cleanly), zero ghost rows, and identical live subtotal on both Floating Cart Docks within `< 500ms`. | Polite non-intrusive toast if item was removed by another diner: `"[Diner 1] removed Truffle Fries."` |
| **UHP-11** | **Cleared `localStorage` / Incognito Mid-Session Rejoin** | Join Table 5 as `"Omar"`, clear `localStorage` (deleting `participantToken`), and reload `/table/5`. | App does not crash on `null` token. Prompts cleanly for 4-digit Table PIN + nickname to rejoin Table 5 without erasing other diners' existing shared cart items. | `"Rejoin Table 5"` + PIN & name inputs (`16px` mobile). |
| **UHP-12** | **Unauthorized Direct Access to `/kds` (or `/admin`)** | Open `/kds` in a logged-out Incognito window (and test calling a staff Convex mutation without auth). | Route guard redirects immediately to Staff Login with **zero 1-frame flash** of live kitchen tickets; preserves post-login redirect to `/kds`; server-side Convex RBAC rejects unauthenticated mutations with explicit auth error. | `"Staff sign-in required for Kitchen Pass."` |
| **UHP-13** | **Zero-Item Diner Clicking `"Pay My Items"`** | Diner B joins Table 5, adds 0 dishes (while Diner A has 2 dishes), opens Checkout, and selects `"Pay My Items"`. | Blocks `0.00 EGP` phantom order submission (client + server guard!). Clearly states Diner B has 0 assigned items and offers 1-tap `"Split table equally"` or `"Browse menu"`. | `"You haven't added any items yet. Split the table bill equally or add a dish first."` |
| **UHP-14** | **Broken / Blocked Dish Photo (`404` Asset Simulation)** | Block `*.webp` requests in DevTools Network Request Blocking and load `/` and `/menu`. | Every card preserves exact `4:3` / `16:9` box dimensions (`CLS = 0`), swaps cleanly to warm-stone fallback surface + minimal single-stroke plate SVG (never broken browser icon or `0px` collapse), and keeps price & `+ Add` fully operable. | Informative `alt` text stays accessible without ugly overlapping alt-text clipping. |
| **UHP-15** | **Extreme Input Length, XSS Payload & Rapid Double-Tap Spam** | 1) Paste 500 chars including `<script>alert(1)</script>` + mixed Arabic/English into Kitchen Note.<br>2) Rapid-click `+ Add` or KDS `Start Grill` 5× in `300ms`. | 1) Zod enforces max length (`<= 160` chars) with live counter; output renders strictly escaped with `<bdi>` (zero script execution, zero card overflow).<br>2) In-flight mutation lock / idempotency prevents duplicate charges and prevents KDS from skipping stages (`New → Ready` skipping `On Grill`). | `"Keep kitchen notes under 160 characters."` |

---

## 6. Per-Slice QA Sign-Off Template (Copy Into Handoff / PR)

Do not delete unchecked lines. Every slice must attach this completed scorecard before `STATUS.md` advances:

```markdown
### QA Gate Report — [Slice Name / Route]
- **Date:** YYYY-MM-DD | **Reviewer:** [Model / Human] | **Palette Tested:** [A / B / C]
- **CLI Pre-Check:** `typecheck` [PASS/FAIL] · `lint` [PASS/FAIL] · `test` [PASS/FAIL] · `build` [PASS/FAIL]
- **Viewports Captured:** `1440×900` [path] · `1280×800` [path] · `1180×820` [path] · `390×844` [path] · `375×667` [path]

| Gate | Status (`PASS` / `FAIL` / `NOT VERIFIED`) | Evidence / Key Metrics |
| :--- | :---: | :--- |
| **Gate 1 — Copy & Anti-Slop (12 Checks)** | | Grep hits: `0` · Manual U3/U4/U9 cuts: `...` |
| **Gate 2 — WCAG AA & OKLCH Color** | | Worst measured ratio: `...:1` · Focus ring checked L+D · Hardcoded hex: `0` |
| **Gate 3 — Typography, Layout & Responsive** | | `scrollWidth <= innerWidth`: all 5 · Min fold font: `...px` · Mobile input: `16px` · Min tap/KDS: `...px` |
| **Gate 4 — CWV, Assets & Console** | | LCP: `...s` · CLS: `...` · Max `.webp`: `...KB` · Reduced motion: verified · Console errors: `0` |
| **Gate 5 — Unhappy-Path Break-Tests** | | Executed IDs: `UHP-..` (pass count / total applicable) |

#### Findings Log (Required Whenever Any Issue Was Found or Left Open)
| Severity | Gate | Location (`file:line`) | Before | After | Why (Criterion / User Impact) |
| :--- | :---: | :--- | :--- | :--- | :--- |
| *(None — "No actionable findings" ONLY if every check above is verified)* | | | | | |

**Final Verdict:** `APPROVE` | `BLOCK`
```
