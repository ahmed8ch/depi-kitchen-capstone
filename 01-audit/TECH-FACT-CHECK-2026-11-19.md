# Live Technical Fact-Check & Ecosystem Audit (Verified November 19, 2026)

> **Verification Sources:** Live npm registry (`npm view`), GitHub API (`nkzw-tech/oxlint-config` `package.json` & `index.js`), Context7 MCP (`/websites/ui_shadcn`, `/websites/convex_dev`, `/websites/oxc_rs_guide_usage`), and live web search anchored to **November 19, 2026**.

---

## 1. Your `shadcn/ui` (`base-luma` + Base UI) & Registry Ecosystem Strategy

**Your instinct is 100% RIGHT — with ONE crucial compatibility trap to guard against.**

### Verified Nov 2026 Status of `shadcn/ui` + Base UI + Luma
- **`shadcn@4.23.0`** + **`@base-ui/react@1.9.0`**: Base UI became `shadcn/ui`'s default primitive layer in July 2026 (`-b base`).
- **`luma` (`base-luma`) preset**: Launched in CLI v4 (March 2026) specifically featuring **soft rounded geometry, calm tonal elevation, and breathable layouts** — it aligns naturally with your CoolDock + Google Labs visual taste!
- **Exact Init Command (verified via Context7 `/websites/ui_shadcn`):**
  ```bash
  npx shadcn@latest init -t vite -b base -p luma --rtl
  ```
  (Use `--rtl` if we include Arabic RTL; also supports `--pointer` for pointer cursors on buttons.)
- **Why this stops AI agents from going haywire:** Instead of inventing 40 inconsistent modals/drawers/inputs from scratch, agents build on accessible, keyboard-tested `@/components/ui/*` primitives (`Dialog`, `Drawer`, `Tabs`, `RadioGroup`, `Toast`, `Badge`, `Button`) and focus their energy on layout, typography, spacing, and real React state!

### Critical Compatibility Trap: Base UI (`render` prop) vs. Radix UI (`asChild` prop)
- Many older tutorials and some third-party shadcn block templates still use **Radix UI's `asChild`** pattern (`<Button asChild><Link .../></Button>`), whereas **Base UI (`@base-ui/react`) uses the `render` prop** (`render={<Link ... />}`) and different import paths (`@base-ui/react/*`).
- **Rule for Agents:** Whenever we adapt a layout or block from a third-party shadcn site, treat it as **layout & Tailwind inspiration / Base UI variant only** — never blindly install a Radix-only block into our `base-luma` project!

### Fact-Checked Verdict on All 6 Third-Party shadcn Sites You Listed

| Site | What It Is (Nov 2026) | Base UI (`@base-ui/react`) Support | Free vs. Paid | Verdict for This Capstone |
| :--- | :--- | :--- | :--- | :--- |
| **`tweakcn.com`** | Open-source visual theme editor for shadcn/ui + Tailwind v4 (`oklch()`). | **Yes** (exports pure CSS variables / Tailwind v4 `@theme`, works identically on Base UI & Radix!). | **Free & Open-Source** | **HIGHLY USEFUL.** Great for rapidly testing warm cream/terracotta/ember `oklch()` token ramps live and exporting clean CSS variables. |
| **`shadcnspace.com`** | Modern community registry of UI blocks, heroes, navbars, dashboards + Figma kit. | **Yes** — explicitly supports Base UI (`@base-ui/react`) alongside Radix, installs via shadcn CLI. | **Generous Free Tier** + Paid Pro | **USEFUL ACCELERATOR.** Good starting inspiration for clean hero shells, nav pills, and responsive grids (still heavily customize so it looks like a restaurant, not SaaS!). |
| **`shadcnstudio.com`** | Large component variant & block studio with theme generator and builders. | **Yes** — offers dual Base UI & Radix UI variants. | Small Free Tier; **mostly Paid Subscription** (1100+ blocks) | **USE FREE VARIANTS ONLY.** Don't pay for a subscription; borrow free micro-component ideas (steppers, pill tabs, badges). |
| **`shadcnregistry.com`** | Decentralized registry directory / ecosystem hub indexing community shadcn registries. | **Mixed** (depends on individual listed registry — check each for Base UI vs Radix!). | Mostly Free / Mixed | **REFERENCE DIRECTORY.** Check before pulling anything to verify Base UI compatibility. |
| **`shadcnblocks.com`** | Massive commercial library of marketing & SaaS page blocks. | **Yes** (expanded to Base UI & React Aria in 2026). | Very limited free tier; **mostly Paid Pro** | **VISUAL REFERENCE ONLY.** Good for browsing layout rhythm, not worth paying for on a solo capstone. |
| **`shadcn-labs.com`** | Experimental umbrella for bleeding-edge registry patterns (terminal UI, MCP UI, AI recipes). | Experimental / Mixed. | Free / Experimental | **SKIP FOR CAPSTONE.** Fun R&D, unnecessary distraction before Dec 12. |

---

## 2. Live Package & Toolchain Audit (Verified Nov 19, 2026)

| Layer | Live Latest (`2026-11-19`) | Fact-Checked Reality & Recommendation |
| :--- | :--- | :--- |
| **Node.js (Your Mac)** | `v26.13.1` (`npm 11.20.0`, `pnpm` not installed) | **Great!** You are already on Node `v26.13.1` Active LTS (newer than the legacy audit noted!). You can enable `pnpm` via `corepack enable pnpm` OR simply use `npm@11.20.0` (zero extra setup friction). |
| **React + Vite** | `react@19.3.1`, `vite@8.3.8` (Rolldown), `@vitejs/plugin-react@6.3.0`, `@rolldown/plugin-babel@0.3.1` | **KEEP (Rock-Solid).** Note verified Vite 8 quirk: `@vitejs/plugin-react@6` removed inline `react({ babel })`; if enabling React Compiler, wire `@rolldown/plugin-babel` separately (or skip React Compiler during early prototyping if you prefer zero Babel overhead — React 19.3 is already blazingly fast!). |
| **VoidZero / Vite+ (`vp`)** | `vite-plus@1.7.0` *(VoidZero acquired by Cloudflare June 2026; Vite+ 1.0 launched Sept 2026)* | **CAREFUL CHOICE:** Vite+ (`vp`) unifies Vite 8 + Vitest + Oxlint + Oxfmt under `vite.config.ts` and is awesome for greenfield apps, **but** live Nov 2026 reports note minor friction with TanStack Router's `@tanstack/router-plugin` ordering and shadcn CLI path expectations. **Recommendation:** Stick to **direct `vite@8.3.8` + `vitest@5.1.1` + `oxlint@1.94.0`** for maximum predictability with shadcn + TanStack Router + Convex on a 23-day deadline. |
| **Oxlint + `nkzw-tech/oxlint-config`** | `oxlint@1.94.0`, `oxlint-tsgolint@7.0.2007`, `tsrs@7.1.0-beta.tsrs3`, `@nkzw/oxlint-config@3.0.0` | **DO NOT INSTALL `@nkzw/oxlint-config` BLINDLY!** Live inspection of its `package.json` & `index.js` revealed 4 traps: (1) forces **beta `tsrs`** (`7.1.0-beta.tsrs3`) instead of stable `oxlint-tsgolint@7.0.2007`; (2) forces generic `Array<T>` over `T[]`; (3) bundles `@nkzw/ensure-relay-types` (Relay GraphQL!) and `@nkzw/no-instanceof`; (4) hardcodes `server/src/prisma/seed.tsx` paths. **Better approach:** Write a crisp **35-line `oxlint.config.ts`** using `oxlint@1.94.0` + stable `oxlint-tsgolint@7.0.2007` that borrows Nakazawa's best philosophy (*Error, Never Warn*, `no-floating-promises`, `no-explicit-any`, `react`, `react-hooks`, `jsx-a11y`, `vitest`) with zero weird baggage! |
| **Formatting (`oxfmt` vs `prettier`)** | `oxfmt@0.79.0` (Beta) vs `prettier@3.10.1` | `oxfmt@0.79.0` is 7x faster and supports CSS/JSON/Tailwind sorting, **but** is still `0.x` beta. Totally fine if **exact-pinned (`0.79.0`)**, or use `prettier@^3.10.1` if you want zero version churn. |
| **TypeScript (`7.0.2` vs `6.0.x`)** | `typescript@7.0.2` (`tsgo` Go compiler) | **CRITICAL RISK CATCH IN LEGACY ADR!** TypeScript `7.0.2` is 8–12x faster, **but** removed `lib/tsserver.js` (breaks VS Code's default TS server unless you install `TypeScriptTeam.native-preview`), shipped **without** the programmatic Compiler API (deferred to 7.1), hard-errors on `baseUrl` (still emitted by some shadcn templates), and has known `TanStack Router` generic inference quirks. **Decision needed:** Use `typescript@7.0.2` *only* after testing your IDE extension on Day 1 — OR use **`typescript@6.x`** (`npm:@typescript/typescript6`) for zero-surprise stability! *(Note: `tsgo` is also cleanly runnable in CI while TS 6 powers IDE if needed.)* |
| **Convex Backend & Auth** | `convex@1.51.0` (Nov 18, 2026), `@convex-dev/auth@2.0.0` (Nov 12, 2026), `convex-test@0.0.73` | **100% VALIDATED — BEST VELOCITY CHOICE.** Free & Starter tier is **$0/mo** with no per-MAU fees; `@convex-dev/auth@2.0.0` is 100% free & Apache-2.0. Nov 2026 updates (`v1.47–v1.51`) added `.staged()` schema validators, MCP secret protection, multi-account CLI, and scheduler guardrails. **Watch-out:** `@convex-dev/auth@2.0.0` `setupUsernamePassword` has no `disableSignUp` flag (omit `signUpWithUsernamePassword` from exports if using staff login). Also, `convex-test` under Vite 8 requires array-negation globs (`!./**/*.test.ts`) + `server.deps.inline: ["convex-test"]`. |
| **Hosting (Cloudflare vs GitHub Pages)** | `wrangler@4.165.0`, `@cloudflare/vite-plugin@1.70.0` | **CLOUDFLARE WINS DECISIVELY.** GitHub Pages breaks client-side SPA routes without 404 hacks and blocks custom security/COOP headers needed for OAuth/Stripe. **Cloudflare Workers Static Assets** (`wrangler.jsonc` with `assets.not_found_handling: "single-page-application"`) is Cloudflare's official 2026 replacement for Pages, $0 free tier, 0 Worker invocations for static SPA routes, and instant deploys. |
| **Routing & Forms** | `@tanstack/react-router@1.170.46`, `@tanstack/react-form@1.33.5`, `zod@4.6.7` | **Strong modern React showcase** (impresses DEPI evaluators with type-safe URL search params, protected routes, and clean Zod v4 Standard Schema validation). Alternative: React Router v7 (simpler if TS 7 conflicts arise, though TanStack Router is stronger on TypeScript architecture). |
| **Animation (`motion`)** | `motion@14.14.0` + React 19.3 `<ViewTransition>` + CSS `@starting-style` | **Great combination.** Use CSS `@starting-style` + Tailwind v4 transitions for simple mounts/hover/drawers, and `motion/react` (`<LazyMotion>`) sparingly for tactile layout/dock/pill transitions (never over-animate). |
| **Drag & Drop (`@dnd-kit/react@0.5.3`)** | `0.5.3` (Pre-1.0) | **RECOMMEND DROPPING.** Known React 19 `StrictMode` & DOM bugs (`#2116`, `#1940`). In a restaurant app, explicit 1-tap buttons (`Start Prep`, `Ready`, `Move Up/Down`) are **better UX on touchscreens**, **100% accessible**, and **zero-bug**. |
| **Payments (Stripe Sandbox)** | `stripe@23.1.0`, `@stripe/stripe-js@10.3.0`, `@stripe/react-stripe-js@7.1.0` | **Works on Free Test Mode**, *but* adds significant setup/webhook/CSP complexity. Evaluate honestly in Decision #3 whether Stripe Sandbox is core to your grading or a Tier-2 upgrade after the interactive split-bill & real-time KDS flow is 100% polished! |

---

## 3. DEPI Egypt React Capstone Grading Alignment (Reality Check)

Evaluators for the DEPI React Front-End Internship typically grade across five clear pillars:
1. **React Architecture & State (40–50%):** Clean component composition, custom hooks, type-safe routing + protected routes, real-time / async loading-error-empty states.
2. **Code Quality & Maintainability (15–20%):** Strict TypeScript (zero `any`), clean folder modularity, zero dead code, clean Git history, automated linting.
3. **UI/UX Polish & Responsiveness (15–20%):** Cohesive visual system, modern aesthetics, smooth mobile + desktop responsiveness, form validation, clear feedback states.
4. **Performance, Testing & Live Deployment (10–15%):** Zero console errors/warnings, fast asset loading, real unit/E2E tests, working public production URL (Cloudflare).
5. **Live Demo & Technical Defense (10%):** Crisp storytelling, smooth live demo across 2 browser tabs/devices (Diner + Kitchen KDS updating instantaneously!), and your ability to explain *why* you chose every piece of the architecture.

**Strategic Implication:** A focused, **zero-bug, jaw-droppingly designed** 5–6 route experience (Storefront Hero → Interactive Menu & Customizer → QR Table Shared Cart & Smart Split → Live Tracker → Real-Time KDS) will score **dramatically higher** than a rushed, half-broken 11-route ERP!
