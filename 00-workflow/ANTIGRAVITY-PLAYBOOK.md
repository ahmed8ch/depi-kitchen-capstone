# Antigravity Anti-Pollution & Design-to-Code Playbook

> **Verified:** November 19, 2026 (against Google Antigravity 2.0 docs, live model quotas, ETH Zurich / 2026 context-engineering standards, and Paper/Pencil/Kite/Onlook MCP workflows).

---

## 1. Why Previous Agents Failed (And How We Prevent Context Pollution Permanently)

Your previous 5-day loop failed from **three classic 2026 agent failure modes**:
1. **Instruction Bloat & Context Rot:** The legacy repo dumped **37 skills** into both `.agents/skills/` and `.claude/skills/` plus **154 KB** of frozen specs (`PRD.md` + `DESIGN-SYSTEM.md`). Empirical evaluations (including ETH Zurich's 2026 `AGENTS.md` benchmarks) confirm that bloated instruction files actively **degrade** model reasoning, raise hallucinations, and burn context before the agent even reads your prompt.
2. **Stale Chat Loops Instead of Clean Handoffs:** Keeping one giant chat alive after repeated mistakes "poisons" the window with old wrong turns. Even `/compact` preserves ghosts of bad reasoning.
3. **Premature Spec Freezes Without Visual Validation:** Locking 11 routes, 42 dishes, and 80KB of rules before seeing a single designed screen or running component guarantees rework.

### Our Proven 3-Layer Persistence System (No Re-Explaining Across Fresh Sessions)

You do **not** need to invent anything custom. In November 2026, the gold-standard multi-session setup uses **three tiny, cleanly separated files on disk** that Antigravity natively discovers:

| Layer | File | Size Rule | What Lives Here | When Loaded |
| :--- | :--- | :--- | :--- | :--- |
| **1. Static Onboarding** | `AGENTS.md` (workspace root) | **< 120 lines** (Antigravity hard cap is 24 KB; best performance is < 150 lines) | Universal rules, non-obvious commands, quality gates, and the file index. | **Automatically** by Antigravity on every new chat in this folder. |
| **2. Live Handoff Bridge** | `STATUS.md` | **< 80 lines** | Current phase, what is verified working, active blockers, and the **exact next step**. Overwritten at the end of every session. | Agent reads it as step #1 of every new chat. |
| **3. Append-Only Memory** | `DECISIONS.md` | Concise table | Every decision you & I explicitly approve (and *why*), so a fresh session never re-litigates settled choices or hallucinates old ones. | Agent reads before making or changing decisions. |

**Golden Rule for Opening a Fresh Session:**
Whenever a chat gets long (> 25–30 turns), changes topic (e.g., Design → Scaffolding → KDS Feature), or hits a weird error loop:
1. Ask the current agent: *"Update `STATUS.md` and `DECISIONS.md` for handoff."*
2. Verify `STATUS.md` matches reality (30-second scan).
3. Open a **brand-new chat** (cleaner than `/compact` when switching phases!) and say: *"Read `STATUS.md` and `DECISIONS.md`. Next we're working on X."*

### Where Your `AGENTS.md` & Custom Skills Actually Live

- **This workspace's clean `AGENTS.md`:** `/Users/apple/Downloads/dev/antigravity/250 degree Kitchen /AGENTS.md` *(created today — open it anytime to inspect or edit)*.
- **Global Antigravity config (`~/.gemini/config/`):** No global `AGENTS.md` or `GEMINI.md` exists right now (good — keeps projects cleanly isolated!).
- **Your Hidden Gem — Pre-Installed Global Design Skills:** You already have **14 high-value UI/design skills** in `/Users/apple/.gemini/antigravity/customizations/skills/`:
  - `better-ui`, `better-typography`, `better-colors`, `better-layout`, `better-accessibility`, `better-interface`, `better-writing`, `build-design`, `interface-review`, `explain-interface`, `state-machine`, `variant`, `teardown`, `break`.
  - These stay silently out of context until needed (progressive disclosure), so we can invoke them intentionally during design audits and component reviews!
- **Legacy `AGENTS.md` (DO NOT COPY):** `/Users/apple/Desktop/Projects/depi_Capstone/AGENTS.md` (see `01-audit/LEGACY-AUDIT.md` for why it was hurting you).

---

## 2. Antigravity Modes & Models Guide (Verified Nov 19, 2026)

Checked against Antigravity's live model registry and your current quota snapshot (`2026-11-19`):

### Model Tiers & Your Current Quotas

| Model | Best Role | Your Quota (Nov 19) | Practical Advice |
| :--- | :--- | :---: | :--- |
| **Gemini 4 Neon (`XHigh`)** | Deep architectural critique, system design, hard debugging, visual synthesis | **99%** | Use for heavy thinking milestones (like today's audit & roadmap). Slower per turn, highest depth. |
| **Gemini 4 Neon (`High`)** | Day-to-day product design, Paper MCP iteration, planning conversations | **99%** | **Best daily driver** for interactive brainstorming & design iteration. |
| **Orchestrator (`Neon`)** | Single-session dynamic routing: plans with Neon, executes edits/tests with Hydrogen | **99%** | **Best default once we start coding!** Fast, smart, quota-efficient, auto-escalates when stuck. |
| **Gemini 4 Hydrogen (`High`/`Medium`)** | Fast mechanical implementation, running tests, component scaffolding | **99%** | Handled automatically by `Orchestrator (Neon)` or targeted subagents. |
| **Gemini 4 Argon (`High`)** | Low-hallucination verification: security/RBAC, financial math, final code review | **35%** *(resets Nov 25)* | **Conserve it!** Use specifically as a focused second-pair-of-eyes auditor before milestone sign-offs. |
| **Gemini 3.8 Flash** | Browser subagent visual inspections & quick high-volume reads | **99%** | Default for `browser` subagents. |

### Should You Enable `Swarm`, `/goal`, or `Orchestrator`?

Do **NOT** turn everything on at once — each mode solves a completely different phase:

| Project Phase | Recommended Mode & Model | Why |
| :--- | :--- | :--- |
| **1. Brainstorming, Scope & Design Direction (NOW)** | **Normal Interactive Chat** on **Neon (`High`)** *(or `XHigh` for deep audits)* | **NO Swarm, NO `/goal`.** You want tight back-and-forth human taste calibration. Autonomous loops during fuzzy design waste quota and hallucinate decisions. |
| **2. Visual Prototyping in Paper MCP** | **Normal Interactive Chat** on **Neon (`High`)** | Designing artboards requires inspecting screenshots together one visual section at a time (`write_html` → `get_screenshot` → your reaction → refine). |
| **3. Scaffolding & Vertical Feature Slices** | **`Orchestrator (Neon)`** *(+ optional `/goal` for a single verifiable slice)* | `/goal` is great **only** when a task has hard automated exit checks (e.g., *"Implement Dish Modifier Drawer + unit tests until `tsc`, `oxlint`, `vitest`, and browser smoke test all pass"*). |
| **4. Parallel Independent Build Work** | **`/swarm` (Preview & Quota Heavy)** | Use **only** when you have 3+ truly independent slices with **already-locked** schema & UI contracts (e.g., Worker A: Menu Page, Worker B: KDS Board, Worker C: Order Tracker + 1 Verifier). Never run Swarm when interfaces are still changing. |
| **5. Milestone Quality Audit** | Fresh session on **Argon (`High`)** or **Neon (`XHigh`)** | Fresh eyes with zero author bias to audit accessibility, console errors, RBAC, and financial math. |

---

## 3. Paper MCP vs. Pen.dev (`Pencil`) vs. Kite / Onlook (Nov 2026 Verdict)

You asked: *"Paper does designs only in HTML and CSS — will that be a problem for us?"*

**Short answer: NO — it is actually an advantage if we respect one clean boundary.**

| Tool | How It Works (Nov 2026) | Strengths | Limitations | Best Role for Us |
| :--- | :--- | :--- | :--- | :--- |
| **Paper (`paper.design`)** *(MCP installed!)* | Native HTML/CSS DOM canvas + local MCP (`v0.5.19`), CSS token sync, SVG pen, screenshots. | Fastest visual exploration for **layers, light, spacing, typography, color**. Zero Figma vector-to-CSS drift. Built-in `get_tokens` / `create_tokens` + `get_jsx`. | Native live React/shadcn code components are still **In Progress / Coming Soon** on Paper's roadmap — canvas is static HTML/CSS (no live React state). | **PRIMARY Design Board** for Hero, Menu Card, Cart Dock, and KDS visual sign-off before coding. |
| **Pen.dev / Pencil (`pencil`)** *(MCP installed!)* | IDE-native encrypted `.pen` files inside Git repo + MCP. | Version-controlled in Git alongside PRs; good structured schema. | More rigid vector/schema feel than Paper's fluid HTML/CSS light/shadow play. | **Backup option** only if you want design files committed inside Git. Don't split across both! |
| **Onlook** *(open-source)* | Visual canvas attached directly to your live running Vite/React app. | Edits real React + shadcn + Tailwind source directly on screen. | Best *after* app scaffolding exists, not for blank-slate concept exploration. | **Optional late-stage polish tool** once our React app is running locally. |
| **Kite (`kite.new`)** | AI-human collaborative canvas + KiteUI (`shadcn` + Motion kit). | Nice token guardrails, but introduces another third-party kit/ecosystem on top of `shadcn base-luma`. | Unnecessary extra layer when we already have Paper MCP + `shadcn base-luma`. | **Skip** to avoid toolchain sprawl before Dec 12. |

### The Clean 3-Step Paper → `shadcn/ui (base-luma)` Pipeline (Zero Drift)

1. **Step 1 — Design Tokens & Visual Craft in Paper:** We explore visual composition, warm cream/stone layering, food photo proportions, typography scale, and ember accent restraint in Paper MCP, reviewing real `get_screenshot` captures together until *you* love the look.
2. **Step 2 — Token Sync:** We map Paper's approved `oklch()` CSS tokens (`--background`, `--surface`, `--accent`, radii, typography) directly into Tailwind v4's `src/index.css` `@theme` block + `shadcn/ui` (`base-luma`) variables.
3. **Step 3 — Semantic Component Mapping (CRITICAL RULE):** When converting Paper artboards to React, coding agents **NEVER** dump raw exported Paper `<div>` / `<button>` markup into the app. Every interactive surface MUST map onto our real `@/components/ui/*` (`shadcn` `base-luma` on `@base-ui/react`) primitives (`Dialog`, `Drawer`, `Tabs`, `RadioGroup`, `Toast`, `Button`, `Badge`), using Paper strictly for **visual geometry, spacing, tokens, and layout hierarchy**.
