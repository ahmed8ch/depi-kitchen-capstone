# `shadcn/ui` (`base-luma`) + Tailwind CSS v4 (`oklch`) + Hugeicons Engineering Playbook

> **Verified Date:** November 19, 2026  
> **Primary Sources Verified Live:** Context7 MCP (`/websites/ui_shadcn`, `/mui/base-ui/v1.9.0`, `/hugeicons/hugeicons-react`), `02-design-vision/VISUAL-DIRECTION.md`, `02-design-vision/CREATIVE-TOOLBOX-AND-LAYERS.md`, and `01-audit/TECH-FACT-CHECK-2026-11-19.md`.  
> **Stack Anchor:** `vite@8.3.8` · `react@19.3.1` · `tailwindcss@4` (`@tailwindcss/vite`) · `shadcn@4.23.0` (`style: "base-luma"`) · `@base-ui/react@1.9.0` · `@hugeicons/react` + `@hugeicons/core-free-icons` (MIT Free).  
> **Legacy Isolation Rule:** Zero tokens, zero hex codes, zero variable names, and zero layout patterns are recycled from the legacy `DESIGN-SYSTEM.md`.

---

## 1. Exact CLI Initialization & Component Install Sequence

Follow this exact sequence in a fresh Vite 8 + React 19 + TypeScript workspace so `shadcn/ui` wires Base UI (`@base-ui/react`), the Luma geometry preset, Tailwind CSS v4, RTL logical classes, and Hugeicons cleanly from commit #1.

### Step 1.1 — Prerequisites (Tailwind CSS v4 + Path Alias)

Install Tailwind CSS v4 via the official Vite plugin (no `tailwind.config.ts` file is used in Tailwind v4):

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure `@/*` path aliases in `vite.config.ts` and `tsconfig.json` / `tsconfig.app.json` **without `baseUrl`** (TypeScript 7.0 hard-errors on deprecated `baseUrl`; `paths` works natively without it in both TS 6 and TS 7):

```json
// tsconfig.app.json (relevant compilerOptions)
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Ensure `src/index.css` starts with `@import "tailwindcss";` before running `shadcn init`.

### Step 1.2 — Initialize `shadcn/ui` with Vite + Base UI + Luma (+ Optional RTL & Pointer)

Verified against `https://ui.shadcn.com/docs/cli` (Nov 2026):

```bash
# Recommended when bilingual EN/AR RTL is in scope (adds rtl: true + logical CSS transforms):
npx shadcn@latest init -t vite -b base -p luma --rtl --pointer

# If shipping English-only first (you can upgrade later via `npx shadcn@latest migrate rtl`):
npx shadcn@latest init -t vite -b base -p luma --pointer
```

| Flag | Exact Meaning (Verified Nov 2026 CLI) | Why We Pass It |
| :--- | :--- | :--- |
| `-t vite` | `--template vite` | Sets `rsc: false`, wires Vite CSS path (`src/index.css`), skips Next.js App Router assumptions. |
| `-b base` | `--base base` | Locks `@base-ui/react` (`v1.9.0`) as the headless primitive layer (not Radix UI). |
| `-p luma` | `--preset luma` | Installs the `base-luma` visual preset (soft rounded geometry, tactile elevation, breathable padding matching our CoolDock × Dreambeans direction). |
| `--rtl` | Enable RTL support | Sets `"rtl": true` in `components.json` and emits logical Tailwind properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `rtl:*`) on every added component. |
| `--pointer` | Pointer cursor on buttons | `shadcn` v4 defaults buttons to `cursor-default`; `--pointer` restores `cursor-pointer` for web hospitality CTAs. |

### Step 1.3 — Configure Hugeicons (`iconLibrary: "hugeicons"`)

Install the official split runtime + MIT free Stroke-Rounded icon pack (6,000+ icons, tree-shakeable ES modules, **zero** Pro subscription required):

```bash
npm install @hugeicons/react @hugeicons/core-free-icons
```

Set `"iconLibrary": "hugeicons"` inside `components.json` **before** running `shadcn add` so every generated UI primitive automatically imports from `@hugeicons/core-free-icons` via `<HugeiconsIcon>` instead of `lucide-react`.

> **Already initialized with Lucide?** Run the official CLI codemod to rewrite every component in `src/components/ui/`, install Hugeicons, and update `components.json` automatically:
> ```bash
> npx shadcn@latest migrate icons
> ```

### Step 1.4 — Add Core 2026 `base-luma` Primitives (Including `Empty`, `Item`, `Field`, `InputGroup`, `ButtonGroup`, `ToggleGroup`, `InputOTP`, `Sheet`, `Drawer`, `Popover`)

```bash
npx shadcn@latest add \
  button button-group card badge alert separator skeleton spinner kbd \
  dialog drawer sheet popover tabs toggle-group \
  radio-group checkbox switch input input-group input-otp textarea \
  field item empty label direction toast
```

> **VERIFIED NOV 2026 CLI & SKILL CATCHES (From Official `.agents/skills/shadcn/` + `ui.shadcn.com`):**
> 1. **Base UI First-Party `toast`:** For Base UI (`base-luma`), use `toast` from `@/components/ui/toast` (`toast.add({ title: "..." })`) — zero third-party `sonner` needed!
> 2. **Base UI `render` (NEVER Radix `asChild`):** Always compose triggers with `render={<Button />}` and add `nativeButton={false}` when rendering non-button elements like `<Link>` or `<a>`.
> 3. **2026 Structured Components Used Everywhere:**
>    - **`Empty`** → Empty Cart (wrapping our `isocons.app` spot in `EmptyMedia`), No Menu Search Results, KDS All Caught Up.
>    - **`Item`** → Side Cart itemized dish rows, Split-Bill per-diner breakdown rows, KDS `86 · Stock Manager` rows.
>    - **`Field` + `FieldGroup` + `FieldSet`** → Dish Customizer modifiers, Table PIN (`InputOTP`), Guest Name, Kitchen Note.
>    - **`InputGroup` + `InputGroupAddon`** → `/menu` search bar, Table Invite copy link, `/kds` 86 dish filter.
>    - **`ButtonGroup`** → Quantity Stepper (`−  1  +`) in Bottom Sheet & Cart.
>    - **`ToggleGroup`** → Category/Heat/Split-mode 2–5 option selectors (remember Base UI `value={[val]}` array API!).
>    - **`Direction`** → First-class LTR ↔ `ar-EG` RTL provider.
>    - *(Skipped intentionally: `typeset` = long-form markdown/blog typography, `code-block` & `ai-elements` = AI chat apps. Optional clever reuse: `trace` on `/track/:orderId` ONLY if its 3-step live shimmer timeline looks cleaner than simple steps.)*

---

## 2. Exact `components.json` (Pure White Neutral + Vite + Base UI + Luma + Hugeicons + Tailwind v4)

Place this exact file at the repository root (`components.json`):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-luma",
  "rsc": false,
  "tsx": true,
  "rtl": true,
  "menuColor": "default-translucent",
  "menuAccent": "subtle",
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "hugeicons",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Field-by-Field Guardrails (What Breaks If an Agent Edits These Wrong)

| Field | Exact Value | Agent Anti-Breakage Rule |
| :--- | :--- | :--- |
| `style` | `"base-luma"` | **Never** change to `"new-york"` or `"radix-luma"` — doing so pulls `@radix-ui/*` packages and `asChild` templates into a Base UI repo. |
| `rsc` | `false` | Vite SPA is client-rendered; `true` pollutes components with unnecessary `"use client"` directives. |
| `rtl` | `true` | Keep `true` even during English-first development so every newly added primitive already uses logical classes (`ms-*`, `ps-*`, `text-start`, `rtl:rotate-180`) at zero runtime cost. |
| `menuColor` / `menuAccent` | `"default-translucent"` / `"subtle"` | Aligns dropdown/popover surfaces with Layer 2 Frosted Daylight Glass and quiet tonal hover states. |
| `tailwind.config` | `""` *(empty string)* | **Mandatory for Tailwind v4.** Setting `"tailwind.config.ts"` causes the CLI to fall back to Tailwind v3 config-mutation logic. |
| `tailwind.css` | `"src/index.css"` | Must point to the single Vite CSS entry file containing `@import "tailwindcss";` and `@theme inline`. |
| `tailwind.cssVariables` | `true` | **Irreversible after init.** Enables our 1-place swappable OKLCH token system. |
| `iconLibrary` | `"hugeicons"` | Ensures every `shadcn add` maps internal arrows/checks/spinners to `@hugeicons/core-free-icons` + `<HugeiconsIcon>`. |

---

## 3. 1-Place Swappable `src/index.css` OKLCH Token Architecture

### Architectural Rule: Zero Hardcoded Colors in JSX

Every component in `src/` consumes **only semantic Tailwind utility classes** (`bg-background`, `bg-card`, `text-foreground`, `bg-primary`, `text-primary-ink`, `bg-pass`, `text-pass-foreground`). Switching the entire restaurant between **Temperament A**, **Temperament B**, and **Temperament C** requires swapping **one `:root` block** (or toggling a single `data-temperament` attribute during stakeholder design review) — zero component files ever change.

### 5-Layer Physical Plane → Semantic Token Map

From `02-design-vision/VISUAL-DIRECTION.md`, every surface maps to one of five physical planes:

| Physical Plane | Purpose | Tailwind Semantic Classes | Border / Shadow Policy |
| :--- | :--- | :--- | :--- |
| **Layer 0 — Pure Crisp White Canvas** | Pure white page floor (`#FFFFFF`, `C-05` locked — zero muddy beige!) | `bg-background text-foreground` | Base plane |
| **Layer 1 — Quiet Surface Tiles** | Menu cards, modifier groups, panels | `bg-card text-card-foreground` & `bg-secondary` | Shadowless by default; subtle `ring-1 ring-border/50` or soft warm lift on hover |
| **Layer 2 — Frosted Daylight Glass** | Floating top nav pill, media badges | `bg-glass backdrop-blur-xl shadow-glass` | Overhead `1px` specular catch (`inset 0 1px 0 oklch(1 0 0 / 85%)`) |
| **Layer 3 — Warm Hearth Accent** | Primary CTAs, active tabs, live indicators (`<= 10%` viewport) | `bg-primary text-primary-foreground` (buttons), `text-primary-ink` (small text/links) | Never used as giant noisy background banners |
| **Layer 4 — Deep Charcoal Contrast Plane** | **ONLY** the Floating Live Table/Cart Dock, `/kds`, and 1 dark pass showcase band on `/` | Wrapper `data-surface="dark-pass"` + `bg-pass text-pass-foreground` | Dedicated high-contrast dark tokens; customer storefront always opens in Light Mode |

### Complete Production `src/index.css` (Defaulting to Temperament A, With Drop-In Blocks for B & C)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

/* Scoped dark contrast plane ONLY for Layer 4 (Floating Cart Dock, /kds, Dark Pass Showcase) */
@custom-variant dark (&:is(.dark *, [data-surface="dark-pass"], [data-surface="dark-pass"] *));

/* ============================================================================
   @theme inline — Stable Semantic Bridge (NEVER edit when swapping palettes!)
   ============================================================================ */
@theme inline {
  /* Core shadcn/ui semantic colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Hospitality & 5-Layer Physical Plane Extensions */
  --color-primary-hover: var(--primary-hover);
  --color-primary-ink: var(--primary-ink);
  --color-surface-tint: var(--surface-tint);
  --color-glass: var(--glass);
  --color-pass: var(--pass);
  --color-pass-surface: var(--pass-surface);
  --color-pass-foreground: var(--pass-foreground);
  --color-pass-muted: var(--pass-muted);
  --color-pass-accent: var(--pass-accent);
  --color-pass-border: var(--pass-border);

  /* Culinary & KDS Semantic Status Tokens */
  --color-status-ready: var(--status-ready);
  --color-status-ready-bg: var(--status-ready-bg);
  --color-status-prep: var(--status-prep);
  --color-status-prep-bg: var(--status-prep-bg);

  /* Concentric Soft Geometry (base-luma native scale) */
  --radius-sm: calc(var(--radius) * 0.6);    /* ~10px badges/inputs */
  --radius-md: calc(var(--radius) * 0.8);    /* ~13px inner controls */
  --radius-lg: var(--radius);                /* 16px inner dish photo inside 24px card w/ 16px pad */
  --radius-xl: calc(var(--radius) * 1.25);   /* 20px drawers/dialogs */
  --radius-2xl: calc(var(--radius) * 1.5);   /* 24px menu & bento cards */
  --radius-3xl: calc(var(--radius) * 2.25);  /* 36px hero & showcase stages */

  /* Soft Warm Ambient Elevation (Floating Layers 2 & 4 ONLY) */
  --shadow-glass: 0 8px 30px -10px oklch(0.22 0.015 55 / 12%), inset 0 1px 0 oklch(1 0 0 / 85%);
  --shadow-dock: 0 20px 44px -14px oklch(0.16 0.01 45 / 42%), inset 0 1px 0 oklch(1 0 0 / 12%);
  --shadow-card-hover: 0 14px 32px -16px oklch(0.22 0.015 55 / 14%);

  /* Typography Stacks (Locked optical EN/AR parity: Plus Jakarta Sans + IBM Plex Sans Arabic) */
  --font-heading: var(--font-sans);
  --font-sans: "Plus Jakarta Sans", "IBM Plex Sans Arabic", system-ui, -apple-system, sans-serif;
}

/* ============================================================================
   DEFAULT THEME (LOCKED C-05/C-06): Pure Crisp White `shadcn base-luma`
   Zero muddy beige (#F4F0E8 REJECTED)! Pure #FFFFFF canvas + crisp neutral
   Luma surfaces + 1-line swappable brand accent (FlameLink Rose-Crimson OR
   Crisp Coral-Orange via [data-accent="coral"]).
   ============================================================================ */
:root {
  --radius: 0.75rem; /* Official base-luma soft rounded rhythm */

  /* Layer 0 & 1: Pure Crisp White Canvas + Neutral Luma Surfaces */
  --background: oklch(1 0 0);                      /* #FFFFFF Pure White */
  --foreground: oklch(0.145 0 0);                  /* #09090B Crisp Ink (19.9:1 on white) */
  --card: oklch(1 0 0);                            /* #FFFFFF Pure White */
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.97 0 0);                    /* #F5F5F5 Clean Luma Neutral */
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);            /* #737373 Crisp Neutral Muted (4.74:1 on white) */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --surface-tint: oklch(0.985 0 0);                /* #FAFAFA Hairline Section Tint */

  /* Layer 2: Frosted Pure Daylight Glass */
  --glass: oklch(1 0 0 / 82%);

  /* Layer 3: Restaurant Brand Accent (DEFAULT: Warm Appetizing Coral-Orange on Pure White `#FFFFFF`)
     STRICT BRAND SEPARATION (C-06 / L-07): FlameLink Rose-Crimson (`--flamelink-accent`) is ONLY
     for `"Powered by FlameLink"` footer badge, `/kds`, and dark KDS band — NEVER the restaurant default! */
  --primary: oklch(0.575 0.195 35);                /* Warm Coral-Flame (>= 4.55:1 AA w/ #FFFFFF white at ALL sizes!) */
  --primary-foreground: oklch(1 0 0);              /* #FFFFFF Crisp White */
  --primary-hover: oklch(0.515 0.185 34);          /* Deeper Coral Hover */
  --primary-ink: oklch(0.495 0.18 34);             /* Small-text accent (>= 5.4:1 on white) */
  --flamelink-accent: oklch(0.585 0.245 12);       /* #E50953 Dedicated FlameLink platform/KDS accent ONLY */

  /* Borders, Inputs & Focus Ring */
  --border: oklch(0.922 0 0);                      /* #E5E5E5 Crisp Neutral Hairline */
  --input: oklch(0.922 0 0);
  --ring: oklch(0.575 0.195 35);

  /* Semantic Status (Light Surfaces — >= 18° OKLCH hue gap from accent) */
  --destructive: oklch(0.53 0.21 15);              /* Rose-Red Destructive (paired w/ icon) */
  --destructive-foreground: oklch(1 0 0);
  --status-ready: oklch(0.48 0.14 152);            /* #16794B Fresh Green */
  --status-ready-bg: oklch(0.955 0.025 152);
  --status-prep: oklch(0.52 0.14 68);              /* #9A5B00 Warm Amber */
  --status-prep-bg: oklch(0.96 0.032 80);

  /* Layer 4: Grok-Bot Obsidian Contrast Plane (Floating Live Dock, /kds, 1 Dark Band on /) */
  --pass: oklch(0.145 0 0);                        /* #09090B Deep Obsidian */
  --pass-surface: oklch(0.185 0 0);                /* #111114 Elevated Obsidian Card w/ subtle rim */
  --pass-foreground: oklch(0.985 0 0);             /* #FAFAFA Crisp White Ink */
  --pass-muted: oklch(0.708 0 0);                  /* #A1A1AA Clean Ash */
  --pass-accent: oklch(0.585 0.245 12);            /* Vivid FlameLink Crimson on Obsidian (paired w/ WHITE text!) */
  --pass-border: oklch(1 0 0 / 8%);
}

/* ============================================================================
   Layer 4 Scoped Dark Pass Surface (Dock, /kds, Dark Showcase Island ONLY)
   Remaps standard shadcn semantic tokens inside [data-surface="dark-pass"].
   CRITICAL CONTRAST FIX: `--primary-foreground` MUST stay pure white `oklch(1 0 0)`
   so `"Open Kitchen Pass"` and dark-surface CTAs NEVER render black text on pink/coral!
   ============================================================================ */
[data-surface="dark-pass"] {
  color-scheme: dark;
  --background: var(--pass);
  --foreground: var(--pass-foreground);
  --card: var(--pass-surface);
  --card-foreground: var(--pass-foreground);
  --popover: var(--pass-surface);
  --popover-foreground: var(--pass-foreground);
  --primary: var(--pass-accent);
  --primary-foreground: oklch(1 0 0);              /* ALWAYS crisp white on dark primary CTAs! */
  --secondary: oklch(0.24 0 0);
  --secondary-foreground: var(--pass-foreground);
  --muted: oklch(0.24 0 0);
  --muted-foreground: var(--pass-muted);
  --accent: oklch(0.26 0 0);
  --accent-foreground: var(--pass-foreground);
  --border: var(--pass-border);
  --input: oklch(1 0 0 / 16%);
  --ring: var(--pass-accent);
  --destructive: oklch(0.62 0.21 18);
  --destructive-foreground: oklch(1 0 0);
  --status-ready: oklch(0.80 0.175 152);           /* Translucent Emerald Pill Ink */
  --status-ready-bg: oklch(0.26 0.055 152 / 55%);
  --status-prep: oklch(0.82 0.155 78);             /* Translucent Amber Pill Ink */
  --status-prep-bg: oklch(0.28 0.055 72 / 55%);
}

/* ============================================================================
   Base Layer + Base UI Mandatory Portal Stacking Context Isolation
   ============================================================================ */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* REQUIRED BY BASE UI (@base-ui/react Quick Start):
     Creates an isolated stacking context for the app shell so portaled
     Dialogs, Drawers, Popovers, and Toasts ALWAYS render above sticky navs
     and floating docks without z-index wars. */
  #root {
    isolation: isolate;
  }
}

/* Utility helper for prices, cart totals, split shares & KDS timers */
@utility tabular-price {
  font-variant-numeric: tabular-nums;
}
```

### Verified WCAG 2.1 AA Contrast Matrix (Pure Crisp White `#FFFFFF` + Grok-Bot Obsidian Pass)

| Pair (Foreground on Background) | Locked Token Pair | WCAG 2.1 Target & Verdict |
| :--- | :--- | :--- |
| **`--foreground` on `--background` / `--card`** | `#09090B` on `#FFFFFF` (`19.9 : 1`) | **PASS AAA** (`>= 7.0:1`) |
| **`--muted-foreground` on `--background`** | `#737373` on `#FFFFFF` (`4.74 : 1`) | **PASS AA** (`>= 4.5:1`) |
| **`--primary-foreground` on `--primary` (Storefront Coral)** | `#FFFFFF` on `oklch(0.575 0.195 35)` (`>= 4.55 : 1`) | **PASS AA All Sizes** |
| **`--primary-ink` on `--background` / `--secondary`** | `oklch(0.495 0.18 34)` on `#FFFFFF` / `#F5F5F5` (`>= 5.1 : 1`) | **PASS AA Small Text** |
| **`--pass-foreground` on `--pass` (KDS Obsidian)** | `#FAFAFA` on `#09090B` (`19.1 : 1`) | **PASS AAA** |
| **`--primary-foreground` on `--pass-accent` (Dark Pass CTA)** | **`#FFFFFF` (`oklch(1 0 0)`)** on `#E50953` (`>= 4.6 : 1`) | **PASS AA** *(NEVER black text!)* |
| **Grok-Bot Dark Status Pills (`violet` / `amber` / `emerald` / `rose`)** | Light `300`-step text on `500/15%` tinted obsidian (`>= 7.5 : 1`) | **PASS AAA** |

---

## 4. Base UI (`@base-ui/react@1.9.0`) vs. Radix UI Cheat-Sheet (Preventing AI Agent Bugs)

Most LLM weights still default to **Radix UI** patterns (`asChild`, `data-[state=open]`, `dir` on `DirectionProvider`, Vaul drawers). Every agent writing code in this repository **must** follow these verified `@base-ui/react@1.9.0` rules:

### Quick Reference Diff Table

| Feature | Radix UI *(FORBIDDEN in this repo)* | Base UI `@base-ui/react@1.9.0` *(REQUIRED)* |
| :--- | :--- | :--- |
| **Element composition** | `<DialogTrigger asChild><Button /></DialogTrigger>` | `<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>` |
| **Styled `<Link>` as Button** | `<Button asChild><Link to="/menu">Menu</Link></Button>` | `<Link to="/menu" className={buttonVariants({ variant: "default" })}>Menu</Link>` *(see Trap #1 below!)* |
| **Non-button trigger / Tab link** | `<TabsTrigger asChild><Link ... /></TabsTrigger>` | `<Tabs.Tab nativeButton={false} render={<Link to="/menu" />} value="menu">Menu</Tabs.Tab>` |
| **State CSS selectors** | `data-[state=open]:...`, `data-[state=active]:...`, `data-[state=checked]:...` | `data-open:...`, `data-closed:...`, `data-active:...`, `data-checked:...`, `data-starting-style:...`, `data-ending-style:...` |
| **Change handler args** | `onOpenChange={(open) => ...}` / `onValueChange={(val) => ...}` | `onOpenChange={(open, eventDetails) => ...}` / `onValueChange={(val, eventDetails) => ...}` (`eventDetails` has `.reason`, `.cancel()`, NOT `SyntheticEvent`!) |
| **Direction provider prop** | `<DirectionProvider dir="rtl">` | `<DirectionProvider direction="rtl">` *(AND still requires `dir="rtl"` on `<html>` + portaled surfaces!)* |
| **Drawer primitive** | Third-party `vaul` | Native `@base-ui/react/drawer` (`Drawer.Root`, `Drawer.VirtualKeyboardProvider`, `Drawer.Viewport`, `Drawer.Popup`, `Drawer.Content`) |
| **Toast primitive** | Third-party `sonner` or deprecated Radix toast | Native `@base-ui/react/toast` (`Toast.Provider`, `Toast.createToastManager()`, single `<Toast.Viewport>`) |
| **Portal stacking** | Arbitrary `z-[9999]` hacks | `#root { isolation: isolate; }` in `src/index.css` |

---

### 4.1 Composition (`render` Prop) & The Button-as-Link Trap

Verified directly from `https://ui.shadcn.com/docs/components/base/button` and `/mui/base-ui/v1.9.0`:

```tsx
import { Link } from "@tanstack/react-router"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs } from "@base-ui/react/tabs"

export function CompositionPatterns() {
  return (
    <div className="flex items-center gap-3">
      {/* 1. Triggers & Close actions: ALWAYS use `render={<Button ... />}` (NEVER `asChild`) */}
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Join Table
        </DialogTrigger>
        <DialogContent>
          <DialogClose render={<Button variant="secondary" />}>
            Cancel
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* 2. Styling a router <Link> as a Button:
             DO NOT use `<Button render={<Link to="/menu" />} nativeButton={false} />`!
             Base UI's Button unconditionally sets `role="button"`, which breaks `<a href>`
             screen-reader link semantics. Use `buttonVariants()` directly on <Link>: */}
      <Link
        to="/menu"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Explore Menu
      </Link>

      {/* 3. Non-button interactive primitives (e.g., Tabs.Tab acting as a route Link):
             ALWAYS pass `nativeButton={false}` alongside `render={<Link ... />}` */}
      <Tabs.Root value="menu">
        <Tabs.List>
          <Tabs.Tab
            value="menu"
            nativeButton={false}
            render={<Link to="/menu" />}
          >
            Menu
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}
```

---

### 4.2 iOS Safari Keyboard-Safe Bottom Sheet (`<Drawer.VirtualKeyboardProvider>` + `overscroll-behavior: contain`)

Whenever a bottom sheet contains form inputs (Dish Customizer special-instructions input, Table PIN join form, Split-Bill tip/note input), wrap the sheet inside `<Drawer.VirtualKeyboardProvider>` and constrain its height using `max-h-[calc(90dvh-var(--drawer-keyboard-inset,0px))]`.

**3 Non-Negotiable Rules (Verified from `/mui/base-ui/v1.9.0/docs/.../drawer/page.mdx`):**
1. **Always include the `0px` fallback:** `--drawer-keyboard-inset` is only populated while the virtual keyboard is aligned; `var(--drawer-keyboard-inset)` without `, 0px` evaluates to invalid CSS before keyboard open and after cleanup.
2. **Keep header & footer outside the scrollable body:** Only the middle content region scrolls, keeping dish title and `Add to Table Cart` CTA pinned.
3. **Add `overscroll-contain` (`overscroll-behavior: contain`)** to the scrollable body so swiping to the end of modifier lists never rubber-bands or scrolls the menu behind the drawer on iOS Safari.

```tsx
import * as React from "react"
import { Drawer } from "@base-ui/react/drawer"
import { useDirection } from "@base-ui/react/direction-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DishNoteSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dishName: string
  children: React.ReactNode
  onConfirm: (note: string) => void
}

export function DishNoteSheet({
  open,
  onOpenChange,
  dishName,
  children,
  onConfirm,
}: DishNoteSheetProps) {
  const dir = useDirection()
  const [note, setNote] = React.useState("")

  return (
    <Drawer.Root open={open} onOpenChange={(nextOpen) => onOpenChange(nextOpen)} swipeDirection="down">
      <Drawer.VirtualKeyboardProvider>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 bg-pass/45 backdrop-blur-xs transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0" />
          <Drawer.Viewport
            dir={dir}
            className="fixed inset-0 flex items-end justify-center sm:items-center"
          >
            <Drawer.Popup
              className="flex w-full max-w-lg flex-col rounded-t-3xl bg-card text-card-foreground shadow-dock transition-transform duration-200 data-starting-style:translate-y-full data-ending-style:translate-y-full max-h-[calc(90dvh-var(--drawer-keyboard-inset,0px))] sm:rounded-3xl"
            >
              {/* Stable Handle + Header (outside scroll area) */}
              <div className="mx-auto mt-3 h-1.5 w-11 shrink-0 rounded-full bg-border" aria-hidden="true" />
              <div className="shrink-0 border-b border-border/60 px-6 py-4">
                <Drawer.Title className="text-xl font-semibold tracking-tight">
                  {dishName}
                </Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-muted-foreground">
                  Choose size, extras, or leave a note for the kitchen.
                </Drawer.Description>
              </div>

              {/* Scrollable Body — overscroll-contain stops iOS background bleed */}
              <Drawer.Content className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
                {children}
                <div className="mt-5">
                  <label htmlFor="kitchen-note" className="mb-2 block text-sm font-medium">
                    Kitchen note (optional)
                  </label>
                  <Input
                    id="kitchen-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="No pickles, sauce on the side"
                  />
                </div>
              </Drawer.Content>

              {/* Stable Pinned Footer — lifts cleanly above iOS keyboard */}
              <div className="shrink-0 border-t border-border/60 bg-card px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="flex items-center gap-3">
                  <Drawer.Close render={<Button variant="outline" className="rounded-full" />}>
                    Cancel
                  </Drawer.Close>
                  <Button
                    className="flex-1 rounded-full"
                    onClick={() => {
                      onConfirm(note)
                      onOpenChange(false)
                    }}
                  >
                    Add to Table Cart
                  </Button>
                </div>
              </div>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.VirtualKeyboardProvider>
    </Drawer.Root>
  )
}
```

---

### 4.3 `@base-ui/react/toast` Single-Viewport Pattern (`src/components/ui/toast.tsx`)

Mount `<AppToaster />` **once** at the root of your application (never inside individual pages or modals). Exporting a singleton `appToastManager = Toast.createToastManager()` lets both React components and async Convex mutation handlers queue notifications reliably without prop-drilling.

```tsx
import { Toast } from "@base-ui/react/toast"
import { useDirection } from "@base-ui/react/direction-provider"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { AppIcon } from "@/components/icons/app-icon"

export const appToastManager = Toast.createToastManager()

export function AppToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider toastManager={appToastManager} limit={3} timeout={4000}>
      {children}
      <AppToastViewport />
    </Toast.Provider>
  )
}

function AppToastViewport() {
  const { toasts } = Toast.useToastManager()
  const dir = useDirection()
  const swipeDirections: ("down" | "left" | "right")[] =
    dir === "rtl" ? ["down", "left"] : ["down", "right"]

  return (
    <Toast.Portal>
      <Toast.Viewport
        dir={dir}
        className="fixed bottom-24 end-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 outline-none sm:bottom-6 sm:end-6"
      >
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={swipeDirections}
            className="group relative flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4 text-card-foreground shadow-glass transition-all duration-200 data-starting-style:translate-y-2 data-starting-style:opacity-0 data-ending-style:opacity-0"
          >
            <Toast.Content className="min-w-0 flex-1">
              {toast.title ? (
                <Toast.Title className="text-sm font-semibold leading-snug" />
              ) : null}
              {toast.description ? (
                <Toast.Description className="mt-0.5 text-sm text-muted-foreground" />
              ) : null}
            </Toast.Content>
            <Toast.Close
              aria-label="Dismiss notification"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <AppIcon icon={Cancel01Icon} size={16} />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

// Usage anywhere (React component OR Convex mutation error/success handler):
// appToastManager.add({
//   title: "Added to Table 5",
//   description: "Smoked Smash Burger · 245 EGP",
// })
```

> **Floating Cart Dock Offset Note:** On mobile, `bottom-24` keeps stacked toasts cleanly above the persistent Layer 4 Floating Live Table & Cart Dock (`~72px` tall) so notifications never cover the `Open Cart` CTA.

---

### 4.4 `<DirectionProvider>` + Portal `dir` Sync Pattern

Verified from `/mui/base-ui/v1.9.0/docs/.../direction-provider/page.mdx` and `https://ui.shadcn.com/docs/components/base/dialog`:

**The Silent RTL Portal Bug:** Base UI's `<DirectionProvider direction="rtl">` flips keyboard navigation (Left/Right arrow keys in `Tabs`, swipe physics in `Drawer`), **but does NOT set HTML `dir="rtl"`** — and portaled overlays (`Dialog.Portal`, `Drawer.Portal`, `Toast.Portal`) mount directly under `<body>`, outside any inner `<div dir="rtl">`.

**The 3-Point Sync Fix (Zero RTL Drift):**
1. Sync `document.documentElement.dir` and `document.documentElement.lang` in a single root provider.
2. Wrap the app in `<DirectionProvider direction={dir}>` (Base UI prop name is **`direction`**, NOT Radix's `dir`!).
3. Inside custom wrappers for `DialogContent`, `Drawer.Viewport`, and `Toast.Viewport`, call `const dir = useDirection()` and forward `dir={dir}` explicitly.

```tsx
import * as React from "react"
import { DirectionProvider } from "@/components/ui/direction" // re-exports @base-ui/react/direction-provider

export type AppLocale = "en" | "ar"

export function LocaleDirectionProvider({
  locale,
  children,
}: {
  locale: AppLocale
  children: React.ReactNode
}) {
  const dir = locale === "ar" ? "rtl" : "ltr"

  React.useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [dir, locale])

  return <DirectionProvider direction={dir}>{children}</DirectionProvider>
}
```

### 4.5 Mandatory `overscroll-behavior: contain` Rule

Apply Tailwind's `overscroll-contain` (`overscroll-behavior: contain`) to:
- Every scrollable **Drawer / Bottom Sheet** body (`DishNoteSheet`, `CartDrawer`, `SplitBillDrawer`)
- Every scrollable **Dialog** body (`JoinTableDialog`, `AllergenDialog`)
- Horizontal **Menu Category Tab rails** (`overscroll-x-contain`) so swiping horizontally across `All · Burgers · Stone-Deck Pizza · Grill · Drinks` never accidentally triggers iOS Safari's swipe-back browser navigation gesture.

---

## 5. Complete `Hugeicons` Icon Mapping Table & Wrapper Architecture

### 5.1 Consistency & Craft Rules (Anti-"Visual Soup")

1. **One Icon Voice Only:** Use `@hugeicons/core-free-icons` (MIT Free Stroke-Rounded) for **100% of UI chrome icons**. Never mix Lucide, Heroicons, pixel art, or 3D isometric icons alongside Hugeicons.
2. **Global Stroke Weight:** Lock `strokeWidth={1.75}` across all standard `16px–24px` UI icons (`1.5` only for large `>= 28px` empty-state spot marks).
3. **Never Inherit Default `#000000`:** `<HugeiconsIcon>` defaults `color` to `#000000` when omitted! Always render through `<AppIcon />`, which locks `color="currentColor"` so icons automatically respect Light Canvas (`#1D1916`), Hearth CTAs (`#FFFFFF`), and Dark KDS (`#F6F2EB`).

### 5.2 Shared `<AppIcon />` Wrapper (`src/components/icons/app-icon.tsx`)

```tsx
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"

export interface AppIconProps
  extends Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon"> {
  icon: IconSvgElement
  size?: number
  strokeWidth?: number
  /** Flip horizontally in RTL layouts (arrows, chevrons, share, exit/back icons ONLY) */
  mirrorInRtl?: boolean
  label?: string
}

export function AppIcon({
  icon,
  size = 20,
  strokeWidth = 1.75,
  color = "currentColor",
  mirrorInRtl = false,
  label,
  className,
  ...rest
}: AppIconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn(
        "shrink-0",
        mirrorInRtl && "rtl:-scale-x-100",
        className
      )}
      {...rest}
    />
  )
}
```

### 5.3 Complete 26-Icon Domain Mapping Table (`@hugeicons/core-free-icons` — MIT Free)

| # | UI Role / Action | Surfaces Used | Exact `@hugeicons/core-free-icons` Export | Default Size | RTL Mirroring Rule | Accessibility / Usage Note |
| :-: | :--- | :--- | :--- | :-: | :--- | :--- |
| 1 | **Primary Forward CTA / Step Arrow** | Home, Menu, Checkout | `ArrowRight02Icon` | `18px` | **MIRROR** (`mirrorInRtl`) | Points forward in reading direction (`→` LTR, `←` RTL) |
| 2 | **Back / Return Arrow** | Customizer, Checkout, Tracker | `ArrowLeft02Icon` | `18px` | **MIRROR** (`mirrorInRtl`) | Points backward in reading direction |
| 3 | **List Chevron / Disclosure Right** | Nav, Modifier Rows, Split Rows | `ArrowRight01Icon` | `16px` | **MIRROR** (`mirrorInRtl`) | Matches shadcn's native Hugeicons mapping |
| 4 | **Dropdown / Accordion Chevron** | Selects, Sort, Collapsibles | `ArrowDown01Icon` | `16px` | Never mirror | Vertical axis only |
| 5 | **Back to Top (`↑`)** | Footer | `ArrowUp01Icon` | `16px` | Never mirror | Pairs with `Back to top` link |
| 6 | **External / Jump to KDS Arrow** | Home Dark Pass Band | `ArrowUpRight01Icon` | `16px` | **MIRROR** (`mirrorInRtl`) | Mirrors diagonal direction (`↗` → `↖`) in RTL |
| 7 | **Mobile Navigation Menu** | Floating Nav Pill (Mobile) | `Menu01Icon` | `20px` | Never mirror | Icon-only trigger requires `aria-label="Open navigation"` |
| 8 | **Close / Dismiss Modal or Toast** | Dialog, Drawer, Toast, Search Clear | `Cancel01Icon` | `18px` | Never mirror | Icon-only close button requires `aria-label="Close"` |
| 9 | **Search Dishes / Ingredients** | Menu Search Bar | `Search01Icon` | `18px` | Never mirror | Decorative inside search input |
| 10 | **Filter / Dietary Controls** | Menu Filter Drawer / Pills | `FilterHorizontalIcon` | `18px` | Never mirror | Pair with visible `"Filter"` label or active count badge |
| 11 | **Add Dish / Increment Qty (`+`)** | Dish Card, Cart Stepper | `Add01Icon` | `16px` | Never mirror | `aria-label="Increase quantity"` on stepper |
| 12 | **Decrement Qty (`−`)** | Cart Stepper, Split Count | `MinusSignIcon` | `16px` | Never mirror | `aria-label="Decrease quantity"` on stepper |
| 13 | **Remove Line Item (Trash)** | Shared Cart Drawer | `Delete02Icon` | `16px` | Never mirror | `aria-label="Remove item"` — pair with destructive hover |
| 14 | **Selected / Confirmed Check** | Radio/Checkbox, Copied PIN, Done | `Tick02Icon` | `16px` | **NEVER mirror** | Checkmarks stay standard orientation in Arabic RTL |
| 15 | **Order Ready / Paid Status Badge** | Order Tracker, Checkout Success, KDS | `CheckmarkCircle02Icon` | `18px` | **NEVER mirror** | Pair with `text-status-ready` + clear status word |
| 16 | **Table Cart / Bag** | Floating Cart Dock, Nav, Empty Cart | `ShoppingBag01Icon` | `20px` | Never mirror | Pair with live item count badge |
| 17 | **Scan Table QR / Join Table** | Home Hero, Nav Table Pill, Join Modal | `QrCode01Icon` | `18px` | Never mirror | QR geometry is strictly non-directional |
| 18 | **Shared Table Diners / Split Guests** | Floating Dock Avatars, Split Checkout | `UserGroupIcon` | `18px` | Never mirror | Represents active diners synced on the same table |
| 19 | **Copy Table PIN / Invite Code** | Table Header, Share Table Modal | `Copy01Icon` | `16px` | Never mirror | Cross-fades to `Tick02Icon` for 1.5s after copy |
| 20 | **Share Table Link** | Shared Cart Header | `Share08Icon` | `18px` | **MIRROR** (`mirrorInRtl`) | Outgoing directional share glyph |
| 21 | **Kitchen Hearth / Hot / Spicy / Sear** | Home Hero, Spice Tag, KDS Pass | `FireIcon` | `16px` | Never mirror | Pair with explicit `"Spicy"` or `"250°C"` text |
| 22 | **Menu / Dining / Utensils** | Nav Menu Link, Empty Plate State | `Restaurant01Icon` | `18px` | Never mirror | Free MIT culinary anchor icon (avoid Pro-only `ChefHatIcon`) |
| 23 | **Vegetarian / Fresh Herb Tag** | Menu Dietary Filter & Dish Meta | `Leaf01Icon` | `15px` | Never mirror | Pair with `text-status-ready` + `"Veg"` label |
| 24 | **Prep Time / Live KDS SLA Timer** | Dish Card Meta, Tracker, KDS Tickets | `Clock01Icon` / `Timer02Icon` | `16px` | **NEVER mirror** | Clocks run clockwise globally — NEVER flip in RTL! |
| 25 | **Split Bill / Receipt / Card Pay** | Split Checkout, Payment Method | `Invoice02Icon` / `CreditCardIcon` | `18px` | Never mirror | `Invoice02Icon` for itemized split; `CreditCardIcon` for card pay |
| 26 | **KDS New-Order Chime & Alert / Loading** | KDS Top Bar, Toast, Async States | `VolumeHighIcon`, `VolumeOffIcon`, `Alert02Icon`, `Loading03Icon` | `18px` | **MIRROR** `VolumeHighIcon` only | `Loading03Icon` gets `animate-spin motion-reduce:animate-none` |
| *Bonus* | **Footer Language & Daylight Easter Egg** | Footer | `Globe02Icon`, `Sun03Icon`, `Moon02Icon` | `16px` | Never mirror | Powers the EN/AR switch + playful *"Open Sunlit Kitchen"* popover |

### 5.4 Centralized Icon Barrel (`src/components/icons/index.ts`)

Import all app icons from **this single barrel file** so Day-1 `npx tsc --noEmit` catches any package export typo immediately and guarantees zero rogue icon libraries slip into feature code:

```ts
export { AppIcon, type AppIconProps } from "./app-icon"

export {
  Add01Icon,
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Copy01Icon,
  CreditCardIcon,
  Delete02Icon,
  FilterHorizontalIcon,
  FireIcon,
  Globe02Icon,
  Invoice02Icon,
  Leaf01Icon,
  Loading03Icon,
  Menu01Icon,
  MinusSignIcon,
  Moon02Icon,
  Notification03Icon,
  QrCode01Icon,
  Restaurant01Icon,
  Search01Icon,
  Share08Icon,
  ShoppingBag01Icon,
  Sun03Icon,
  Tick02Icon,
  Timer02Icon,
  UserGroupIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
```

### 5.5 RTL Directional-Mirroring Rules (Summary for Agents)

- **ALWAYS mirror (`mirrorInRtl` → `rtl:-scale-x-100` or `rtl:rotate-180`):** Directional navigation (`ArrowRight02Icon`, `ArrowLeft02Icon`, `ArrowRight01Icon`, `ArrowUpRight01Icon`), directional share/send (`Share08Icon`), audio wave direction (`VolumeHighIcon`), and sidebar/panel collapse toggles.
- **NEVER mirror:** Checkmarks (`Tick02Icon`, `CheckmarkCircle02Icon`), clocks & timers (`Clock01Icon`, `Timer02Icon`), math symbols (`Add01Icon`, `MinusSignIcon`), QR codes (`QrCode01Icon`), flame/food/utensils (`FireIcon`, `Restaurant01Icon`, `Leaf01Icon`), cards/receipts (`CreditCardIcon`, `Invoice02Icon`), and vertical arrows (`ArrowUp01Icon`, `ArrowDown01Icon`).

---

## 6. Day-1 Verification Checklist (Run Before Building Feature Screens)

1. **`npx tsc --noEmit`**: Confirms every `@hugeicons/core-free-icons` export in `src/components/icons/index.ts` and `@base-ui/react` prop compiles strictly with zero `any`.
2. **Zero-Radix Grep Check**: Confirm zero imports from `@radix-ui/*` and zero `asChild` usages across `src/`.
3. **Zero-Hex Grep Check**: Confirm zero hardcoded hex colors (`#...`) inside `src/components/**` and `src/routes/**` — all colors come exclusively from `src/index.css` semantic tokens.
4. **Live Viewport Checks (Desktop `1440×900` + Mobile `390×844` + RTL `dir="rtl"`):**
   - Open `DishNoteSheet` on mobile viewport and focus the kitchen-note `<Input />` → pinned footer stays visible via `--drawer-keyboard-inset`.
   - Toggle `dir="rtl"` on `<html>` → verify portaled Dialogs, Drawers, and Toasts inherit `dir="rtl"`, forward arrows flip, and checkmarks/clocks stay unflipped.
   - Verify Floating Live Dock & `/kds` render crisp `>= 16:1` dark-pass contrast while `/` and `/menu` stay sunlit warm linen.
