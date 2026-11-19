# Six Major Decisions Between Zero and a Buildable Spec

> **Date:** November 19, 2026 · **Target Submission:** December 12, 2026 (**23 Days**)  
> **Purpose:** Map every foundational choice clearly — with honest trade-offs and a Senior Architect recommendation — so we align slowly and deliberately **before** touching Paper artboards or writing a single line of app code.

---

## Decision 1 — Capstone Product Concept & Tiered Core User Loop

### What Actually Wins a 100% Frontend-Architecture & UI/UX DEPI Grade?
Evaluators do **not** award extra points for 11 half-finished CRUD admin tabs. They drop their jaws when you open **two windows side-by-side** (or scan a QR code with your phone during the live defense!) and demonstrate a **flawless, studio-designed real-time loop**:

> **The Unforgettable Core Loop (5 Minutes Live Demo):**
> 1. **Sunlit Storefront Hero (`/`)**: Opens like an award-winning modern hospitality brand (CoolDock/Dreambeans spaciousness), NOT a template. Displays live kitchen prep status (`~12 min`) and two clear paths: **`Join Table (QR / Table 1–12)`** or **`Explore Menu / Takeaway`**.
> 2. **Interactive Menu & Customizer (`/menu`)**: Spacious `3-col` desktop / smooth mobile dish gallery with instant search, pill filters, rich `4:3` food photography, and a crisp **Dish Customizer Drawer** (required choices like patty weight/crust + add-ons + special kitchen note, live price recalculation, strict Zod validation).
> 3. **Real-Time Shared Table Cart (`/table/:n` + Floating Cart Dock)**: Two diners on different tabs/phones join **Table #5** with a 4-digit **Table PIN**. As Diner A adds a burger and Diner B adds a pizza, the **CoolDock-inspired Floating Cart Dock** and Shared Cart Drawer update **live in <300ms** with per-diner item ownership tags!
> 4. **Smart Split-Bill Checkout Drawer**: Diners toggle seamlessly between **`Pay Full Table`**, **`Pay My Items`**, or **`Split Equally (÷ N)`** (exact integer-piaster math — zero floating-point bugs, proven by Vitest!) and settle cleanly.
> 5. **Live Order Tracker (`/track/:orderId`) ↔ Real-Time Kitchen Display (`/kds`)**: The moment checkout finishes, the ticket pops onto the **Dark Charcoal KDS Board** with an elapsed timer, `48px+` tap-to-strike dish lines, `86 / Sold Out` live menu lock, and explicit stage buttons (`New → On the Grill → Ready`). Clicking `On the Grill` / `Ready` on `/kds` updates the diner's `/track` progress bar **live in real time**!

### Proposed Tiered Scope (Protecting Your Dec 12 Deadline!)

| Tier | Scope | Ships When |
| :--- | :--- | :--- |
| **Tier 1 — Core Showcase (MUST SHIP — 100% Polished)** | 5 Core Routes (`/`, `/menu`, `/table/:n`, `/track/:orderId`, `/kds`) + 3 Drawers (Dish Customizer, Shared Table Cart, Smart Split Checkout) + Curated **14–16 Signature Dishes across 4–5 Categories** + Real-Time `86 / Sold Out` Sync + Pure Unit-Tested Split-Bill Engine + Responsive Desktop & Mobile + Working Cloudflare Production Deploy. | **Days 1–14** (Visual prototype + rock-solid core build) |
| **Tier 2 — High-Impact Polish (SHOULD SHIP — Adds "Wow" & Rubric Depth)** | **Choice A:** Clean **EN / Egyptian Arabic (`ar-EG`) RTL Switch** (huge local Egypt DEPI standout!) **AND/OR** **Choice B:** Protected **Staff Login + Compact `/admin` Menu & QR Code Generator** (proves Protected Routes + Auth + CRUD without building a 5-tab ERP!) **AND/OR** **Choice C:** **Embedded Stripe Sandbox (`<PaymentElement />`)** alongside Instant/Counter Settlement. | **Days 15–19** (pick 1–2 based on remaining velocity) |
| **Tier 3 — Explicitly CUT (Legacy ERP Bloat)** | 42-dish catalog, 5-tab Admin with Recharts + `@dnd-kit` drag-and-drop, separate Cashier POS walk-in screen, 80mm thermal `@media print` portal, 04:00 AM Cairo DST rollover logic, 120s lazy Stripe race cancellation, verified dish reviews & event inquiry forms, 3 independent Light/Dark theme toggles. | **Cut permanently** unless Tier 1 + 2 finish early. |

**Open Question for You (D-01 / D-02 / D-03):**
- Does this **Tier 1 Core Loop** capture the exact magic you envision, and which **1–2 Tier 2 features** matter most to you (Bilingual EN/AR RTL? Compact Admin + QR Cards + Protected Route? Stripe Sandbox)?

---

## Decision 2 — Frontend Tech Stack & Architecture

Verified as of **November 19, 2026** (full evidence in `01-audit/TECH-FACT-CHECK-2026-11-19.md`):

| Layer | Recommended Choice | Alternatives Considered | Why This Wins for You |
| :--- | :--- | :--- | :--- |
| **Core Framework & Bundler** | **React `19.3.1` + Vite `8.3.8` (Rolldown)** | Vite+ (`vp` 1.7.0) | Blazing fast Rust bundler via Rolldown, 100% predictable plugin order with shadcn + TanStack Router + Convex (no Vite+ early plugin hiccups). |
| **TypeScript** | **`typescript@6.x` *(Safe Default)*** OR **`typescript@7.0.2` *(Only if verified in IDE Day 1)*** | Forced TS 7.0.2 | TS 7.0.2 breaks VS Code's default TS server (`lib/tsserver.js` removed) and has TanStack Router generic edge cases. Starting clean on TS 6 (or verifying TS 7 extension first!) saves hours of tooling pain. |
| **Routing & URL State** | **TanStack Router (`@tanstack/react-router@^1.170`)** | React Router v7 | Fully type-safe routes, search params validated directly with Zod v4 (`validateSearch`), auto code-splitting — huge React Architecture flex for DEPI evaluators. *(Fallback to React Router v7 only if you prefer simpler setup).* |
| **UI & Styling System** | **`shadcn/ui` (`base-luma` on `@base-ui/react@^1.9`) + Tailwind CSS `v4.3.5` (`oklch()`)** | Radix UI shadcn / MUI | Matches your exact vision! Base UI is shadcn's default in Nov 2026, `luma` gives breathable rounded geometry out of the box, and `tweakcn` + `shadcnspace` (Base UI variants) accelerate theming & layouts. |
| **Forms & Validation** | **`@tanstack/react-form` + `zod@^4.6.7`** *(or `react-hook-form` + `zod`)* | Uncontrolled forms | Clean schema-driven validation for Dish Modifiers, Table PIN, Checkout, and Staff Login with zero manual form spaghetti. |
| **Motion & Transitions** | **CSS `@starting-style` + Tailwind v4 transitions + selective `motion/react` (`<LazyMotion>`)** | Heavy animation everywhere | Keeps operational UI crisp (`150–250ms`), zero layout jank, respects `prefers-reduced-motion`. |
| **Folder Architecture** | **Clean Feature Modules (`src/features/{menu,cart,table,kds,shared}`)** | Heavy enterprise FSD-Lite with custom boundary plugins | Clean, intuitive separation of concerns that you can proudly explain in 60 seconds during your DEPI technical defense — zero over-engineered boilerplate! |
| **Dropped Risky Packages** | **Drop `@dnd-kit/react@0.5.3`**, **Drop `recharts`** (unless Tier 2 Admin adds a chart), **Drop `sonner`** (use native `@base-ui/react/toast`). | Legacy 18-package bloat | Eliminates React 19 StrictMode crashes and peer-dep hacks. |

---

## Decision 3 — Backend, Real-Time Glue & Auth/Data Strategy

| Choice | Recommendation | Trade-Off / Open Question |
| :--- | :--- | :--- |
| **Real-Time Backend** | **Convex (`convex@1.51.0`) — Free Tier ($0/mo)** | **Clear winner.** Zero REST boilerplate, zero WebSocket plumbing, automatic React reactivity (`useQuery` / `useMutation`) makes Shared Table Cart, live `86` stock locks, and KDS updates work in `<300ms` with TypeScript end-to-end! |
| **Guest Diner Identity** | **Frictionless Guest Session (`participantToken` in `localStorage`)** | Scanning a QR code at a restaurant table should NEVER force a login wall! Guests pick a nickname (e.g., *"Ahmed"*) and immediately join Table #5 with the 4-digit PIN. |
| **Staff / Admin Protection** | **Option A (Fastest Demo Velocity):** Simple clean `@convex-dev/auth@2.0.0` Username+Password staff gate for `/kds` & `/admin` (proves real Protected Routes + Server RBAC without OAuth/SMTP headaches!).<br>**Option B (Full):** Add Google OAuth on `/login` for optional customer order history (requires Google Cloud OAuth console setup). | **Recommendation:** Start with **Option A** (100% real auth & protected routes in <1 hour, zero external OAuth client-ID config risk); add Google OAuth only in Tier 2 if time permits. |
| **Checkout / Payment Strategy** | **Option A (Fastest Clean Demo):** Interactive Split-Bill Engine (`Pay Full` / `Pay My Items` / `Split Equally ÷ N`) with **Instant Demo Card Checkout + Pay at Counter (`#C-201`)** that fires straight to `/kds` in 1 tap.<br>**Option B (Real Sandbox):** Embed real **Stripe Sandbox `<PaymentElement />`** (`4242...` test card) via Convex Actions. | **Recommendation:** Build **Option A first** inside Tier 1 so the entire Split-Bill → Live KDS loop is 100% testable & unblocked; swap in **Stripe Sandbox `<PaymentElement />`** as a clean adapter in Tier 2 if desired! |

---

## Decision 4 — UI/UX Visual Direction & Design-First Validation (Paper MCP)

We will **NOT** jump straight into building pages blindly. Our calm, visual-first design sequence:

1. **Step 4.1 — Lock Direction Together:** You choose Brand Name (`250° Kitchen` vs. alternative), Color Temperament (**A: Sunlit Kiln Terracotta**, **B: Ember Vermilion**, or **C: Roasted Crimson**), and Typography Pairing from `02-design-vision/VISUAL-DIRECTION.md`.
2. **Step 4.2 — Generate Cohesive Starter Food Photography (`ASSET-STRATEGY.md`):** Produce 1 Hero centerpiece + 4 starter dish photos under one unified sunlit-linen art direction so Paper artboards use **real appetizing food**, never ugly gray placeholder boxes!
3. **Step 4.3 — Design Checkpoint #1 in Paper MCP (Style Proof — 2 Frames Only):**
   - Frame 1: **Desktop `1440×900` Homepage Hero + Floating Nav Pill + Floating Cart Dock**
   - Frame 2: **Menu Card Anatomy (Resting, Hover, `86 / Sold Out`) + Dish Customizer Drawer**
   - Inspect screenshots together and refine **until you genuinely love it** before designing any other screens!
4. **Step 4.4 — Design Checkpoint #2 in Paper MCP (Remaining Core Flows):**
   - Desktop & Mobile `/menu` + Table Join PIN sheet + Split-Bill Checkout Drawer + Live Order Tracker + Dark Charcoal `/kds` Board.
5. **Step 4.5 — Token Sync into Code:** Export verified `oklch()` tokens from Paper directly into Tailwind v4 `src/index.css` and `shadcn/ui` (`base-luma`) components.

---

## Decision 5 — Quality Gates & Deployment Pipeline

| Gate | Tooling (Verified Nov 19, 2026) | Why |
| :--- | :--- | :--- |
| **Type Safety** | `tsc --noEmit` (`strict: true`, `noUnusedLocals: true`, zero `any`) | Catches contract mismatches between Convex schema, TanStack Router, and React UI instantly. |
| **Linting (VoidZero)** | **`oxlint@1.94.0` + stable `oxlint-tsgolint@7.0.2007`** via clean 35-line `oxlint.config.ts` | Borrows `@nkzw/oxlint-config`'s best principle (*"Error, never warn"*, `no-floating-promises`, `react`, `react-hooks`, `jsx-a11y`, `vitest`) **without** installing `@nkzw`'s beta `tsrs`, Relay rules, or `Array<T>` style conflicts! |
| **Formatting** | **`oxfmt@0.79.0` (exact pinned)** OR **`prettier@^3.10.1`** | Fast automated formatting with Tailwind class sorting — zero formatting debates. |
| **Unit & Backend Tests** | **`vitest@5.1.1` + `convex-test@0.0.73`** | 100% unit coverage on pure domain logic (integer-piaster split-bill math, modifier pricing, search normalization) + Convex mutation integration tests. |
| **E2E Browser Tests** | **`@playwright/test@1.65.1`** (3–4 high-value user journeys) | Verifies real multi-tab sync: Join Table → Add Dish → Split Pay → Appears live on `/kds` → Bump to Ready → Updates `/track`! |
| **CI & Hosting** | **GitHub Actions** (`lint + typecheck + vitest + build`) → **Cloudflare Workers Static Assets** (`wrangler.jsonc` with `assets.not_found_handling: "single-page-application"`) | Free tier ($0/mo), native SPA routing without `_redirects` bugs, custom security headers, instant public demo URL for DEPI evaluators. |

---

## Decision 6 — Real Verification at EVERY Step (Anti-Rubber-Stamp Protocol)

You explicitly asked for **REAL validation at every step — never just approving everything**. Here is the non-negotiable verification contract we will enforce before marking ANY phase or slice "Done":

| Phase | Mandatory Verification Gate (Must Pass With Real Evidence — No "Looks Good" Hand-Waving!) |
| :--- | :--- |
| **Design Gate (Paper MCP)** | 1. Capture `get_screenshot` at both Desktop (`1440×900`) and Mobile (`390×844`).<br>2. Audit computed contrast ratios (**WCAG AA**: `>= 4.5:1` body/small pills, `>= 3:1` large CTAs) — verify mathematically, don't eyeball.<br>3. Check typography floor (zero sub-`13px` micro-text; `16px+` mobile inputs; `44px+` tap targets).<br>4. Explicit **User Visual Sign-Off** before any code starts. |
| **Scaffold Gate (Day 1 Code)** | 1. Clean `npm run lint` (`oxlint`), `npm run typecheck`, `npm run test`, and `npm run build` all exit `0`.<br>2. Live local `vite dev` + `convex dev` renders with **0 browser console errors & 0 React warnings**.<br>3. First hello-world deploy succeeds on Cloudflare Workers Static Assets URL (proves deployment pipeline works on Day 1, not Dec 11!). |
| **Every Feature Slice Gate** | 1. Automated checks pass: `oxlint` (0 errors) + `tsc --noEmit` (0 errors) + `vitest` (new tests written & passing).<br>2. **Real Browser Inspection** (using our `browser` subagent / Playwright) on Desktop (`1440×900`) AND Mobile (`390×844`): verify rendered visual layout against Paper spec, test happy path AND error/empty/loading/`86` unhappy paths, and verify **0 console errors & 0 uncaught rejections**.<br>3. Independent fresh-eyes review pass (e.g., Argon High or `interface-review` / `better-accessibility` skill) on complex UI/logic slices. |
| **Pre-Submission DEPI Defense Gate (Dec 9–11)** | 1. Full Playwright multi-tab E2E suite passes against production build.<br>2. Lighthouse audit on live Cloudflare URL (Performance, Accessibility, Best Practices).<br>3. Bilingual RTL & keyboard-only navigation pass (if RTL enabled).<br>4. Dry-run of the 5-minute DEPI live pitch + clean `README.md` with architecture diagram & screenshots. |
