# Hostile Forensic Audit of Legacy Repo (`/Users/apple/Desktop/Projects/depi_Capstone`)

> **Audit Date:** November 19, 2026  
> **Posture:** Zero bias — assume every legacy document is bloated, outdated, or mis-scoped until independently verified against the actual goal (**DEPI Egypt React Front-End Capstone, solo builder, 100% graded on Frontend Architecture / UI-UX Polish / Code Quality, deadline Dec 12, 2026**).

---

## Executive Diagnosis: Why 5 Days Produced Zero Lines of Code

The previous agents fell into **"Enterprise Spec Theater"**:
- They wrote **154 KB of locked prose** (`PRD.md` = 80 KB, `DESIGN-SYSTEM.md` = 74 KB), opened **25 GitHub Issues** across two overlapping ticket systems (`Slices 2–7` AND `B1–B10`), duplicated **37 Matt Pocock skills** into **both** `.agents/skills/` and `.claude/skills/`, and declared a **"Spec Freeze"** — while writing **0 application files** and validating **0 visual screens**.
- Worse, because DEPI grades **100% on Frontend Architecture, UI/UX Polish, and Code Quality**, spending 60% of the spec inventing enterprise restaurant ERP edge cases (04:00 AM Egypt Law 24/2023 DST rollover, Hamilton Largest Remainder tax distribution tie-broken by `joinedAt ASC`, 120s lazy Stripe PaymentIntent cancellation races, 80mm thermal `@media print` Chromium hacks, 42 bilingual dishes with live per-modifier calorie algebra) actively **sabotages** your frontend polish and deadline safety.

---

## File-by-File Forensic Teardown

| Legacy File | Size / State | Verdict | What Is Wrong / Poisonous | What (If Anything) Is Worth Salvaging |
| :--- | :--- | :---: | :--- | :--- |
| **`AGENTS.md`** & **`docs/agents/operating-rules.md`** | 24 + 43 lines | **BURN & REPLACE** | Hardcodes retired OpenCode/T3 free model IDs (`opencode/hy4-flash-free`, `deepseek-v4.1-flash-free`); imposes a premature **"Spec Freeze (2026-11-18)"** before any visual prototype exists; forces heavy GitHub Wayfinder rituals on a solo 23-day sprint. | Two good principles (re-written cleanly in our new `AGENTS.md`): *verify live before guessing* and *explicit consent before `git commit`/`push`*. |
| **`.agents/skills/` & `.claude/skills/` (`skills-lock.json`)** | **37 skills × 2 folders!** | **BURN** | Massive context clutter (`ask-matt`, `chief-of-staff`, `scaffold-exercises`, `writing-beats`, `wayfinder`, `migrate-to-shoehorn`, etc.). Completely irrelevant to a React UI capstone and pollutes discovery. | Keep **zero** of them. Antigravity already has clean built-in skills + your 14 focused design skills in `~/.gemini/antigravity/customizations/skills/`. |
| **`DESIGN-SYSTEM.md`** | **73.9 KB (431 lines)** | **BURN COMPLETELY** | **Frankenstein Aesthetic Disaster:** Literally stitched together a **macOS MacBook notch bezel (`980×480px`)** from CoolDock + **developer-SaaS `22×21` crosshairs, `11×11` corner brackets, `// Label //` eyebrows, `[ 01 / 05 ]` mono indices, and ASCII dot-matrix waves** from Firecrawl + **floating cutout food orbit & concave obsidian gold** from Zomato! Plus **3 separate independent theme matrices** (Customer Light/Dark + Ops Light/Dark + KDS Dark-Locked) = massive CSS/QA debt. Feels like a sterile variable dump with zero coherent hospitality soul. | **ZERO variables or layout rules kept** (per your explicit rule). Replaced from scratch by `02-design-vision/VISUAL-DIRECTION.md`. |
| **`docs/design/ticket-8-brief.md`** | 201 lines | **BURN** | Contradicts `DESIGN-SYSTEM.md` in places (different hex values `#FAF7F2` vs `#FAF6F0`, different card radii `18px` vs `24px`, mobile-only `390×844` customer artboards ignoring your desire for a spacious desktop-first showcase!). | Only one reminder worth keeping: verify both Desktop (`1440×900`) and Mobile (`390×844`) explicitly before coding. |
| **`PRD.md`** | **79.9 KB (444 lines)** | **HEAVILY PRUNE & RE-TIER** | **Catastrophic Scope Creep for 23 Days Solo (+ 2nd Course):** 11 routes, 5 drawers, 42 menu items (meaning 42 consistent food photos to source/generate!), 3 split modes + Stripe Sandbox webhooks + `#C-201` Cashier Payment ID + 80mm thermal print portal + Google OAuth + Staff Argon2id RBAC + Walk-in POS + KDS chime/WakeLock + 5-tab Admin with Recharts & `@dnd-kit/react` + Reviews + Event Inquiry Form! Trying to ship all 11 routes risks delivering 11 half-baked screens instead of 5 unforgettable, gallery-grade screens. | **The Core Product Hook IS genuinely awesome:** A real restaurant storefront hero that flows into a live QR-linked shared table cart, smart split checkout, live order tracker, and real-time KDS pass. That **core loop** is a 10/10 DEPI showcase — *if* we cut the ERP bloat and build in strict tiers! |
| **`GLOSSARY.md`** | 129 lines | **SIMPLIFY (15 terms max)** | Over-formalized enterprise DDD glossary with contradictions against `PRD.md` (e.g., Glossary says Cashier POS has *no* table reset; PRD gives Cashier `Close & Reset Table`!). | Keep a tiny 10-term vocabulary once our actual scope is locked (Table Session, Shared Cart, Order, Kitchen Ticket, 86 / Sold Out). |
| **`docs/adr/0001-...md`** | 147 lines | **PRUNE & FIX RISKS** | Packs ~18 libraries into one 147-line wall of text; locks risky bleeding-edge/pre-1.0 choices (`typescript@7.0.2` breaking VS Code built-in TS server & TanStack Router edge cases, `@dnd-kit/react@0.5.3` with React 19 StrictMode crashes, `oxfmt@0.79.0` beta, `recharts` + `react-is` override hack, `FSD-Lite` bureaucracy for a small solo app). | Several sharp engineering instincts survive fact-checking: **Convex** for real-time sync, **Cloudflare Workers Static Assets (`wrangler.jsonc`)** over GitHub Pages, **Vite 8 + Tailwind v4 + `shadcn base-luma` (`@base-ui/react`)**, integer piaster math, and **pure unit-testable domain helpers** (`bill-engine`, `search-normalizer`). |
| **`docs/research/2026-11-18-stack-audit.md`** | 226 lines | **PARTIALLY VALID (UPDATED TODAY)** | Actually the most grounded file in the old repo! Live npm version queries were real, **but** it missed `nkzw-tech/oxlint-config` / `tsrs` vs `oxlint-tsgolint`, missed `Vite+ 1.0` (`vite-plus@1.7.0`), and still recommended keeping risky `typescript@7.0.2` and `@dnd-kit/react@0.5.3` on a 24-day deadline. | Re-verified and superseded cleanly by `01-audit/TECH-FACT-CHECK-2026-11-19.md`. |
| **GitHub Issues (`#1`–`#25`)** | 11 OPEN (`#8–#9`, `#16–#25`), 14 CLOSED | **IGNORE / RE-BASELINE LATER** | Two conflicting ticket waves (`#10–#15` closed, replaced by `#16–#25`), all tied to the bloated 11-route frozen PRD and broken `DESIGN-SYSTEM.md`. | Do **not** touch GitHub Issues yet. Once we lock our clean scope and visual direction, we can cleanly supersede or close legacy issues with your approval. |

---

## Internal Contradictions Caught Inside the Legacy Docs

Even among the "locked" docs themselves, previous agents introduced silent contradictions:
1. **Color Token Drift:** `DESIGN-SYSTEM.md` defined `--bg-canvas` as `#FAF6F0` and `--kds-bg` as `#0A0D12`; `ticket-8-brief.md` used `#FAF7F2` and `#0B0F17`; `PRD.md` used `#0B0F17`.
2. **Card Radius Drift:** `DESIGN-SYSTEM.md` required `24px` Bento cards; `ticket-8-brief.md` specified `18px` cards.
3. **RBAC / Feature Drift:** `GLOSSARY.md` & `DESIGN-SYSTEM.md` (line 404) explicitly forbade table-reset controls on `/cashier`, while `PRD.md` (lines 65, 82, 234) and `ADR-0001` (line 60) explicitly gave `/cashier` `Close & Reset Table`.
4. **Font Drift:** `DESIGN-SYSTEM.md` locked `IBM Plex Sans Arabic`, while `2026-11-18-stack-audit.md` scaffold script installed `@fontsource-variable/noto-sans-arabic`!
5. **Menu Imagery Workload:** Specifying **42 distinct dishes + 5 promo banners** as bundled local `.webp` files implies sourcing, art-directing, and optimizing **47 cohesive food photographs** solo in 23 days — completely unrealistic unless trimmed to a curated, mouth-watering **12–18 signature items** (still across realistic categories!).

---

## Bottom Line Verdict

Throw away the legacy docs as governing specifications. Carry forward **zero** design variables and **zero** artificial enterprise scope. Keep only the genuinely strong core seed — **a sunlit, modern restaurant storefront & live QR table ordering + real-time KDS showcase on React + Convex + shadcn (`base-luma`) + Cloudflare** — and rebuild the vision, scope, and design system cleanly from first principles.
