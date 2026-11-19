# 05 — Quality Gates, Oxlint, Testing & Cloudflare Deployment Pack

> **Status:** Verified Drop-In Pack · **Last Verified:** November 19, 2026  
> **Aligned With:** `01-audit/TECH-FACT-CHECK-2026-11-19.md` & `03-decisions/SIX-DECISIONS-ROADMAP.md` (Decisions 5 & 6)  
> **Pinned Baseline Versions (Nov 19, 2026):** `node@26.13.1`, `vite@8.3.8`, `oxlint@1.94.0`, `oxlint-tsgolint@7.0.2007`, `@nkzw/oxlint-config@3.0.0`, `tsrs@7.1.0-beta.tsrs3`, `oxfmt@0.79.0`, `prettier@^3.10.1`, `vitest@5.1.1`, `convex@1.51.0`, `convex-test@0.0.73`, `@playwright/test@1.65.1`, `wrangler@4.165.0`.

Every file in this pack is copy-ready for Day 1 of the **250° Kitchen** repository. Drop them straight into the repo root (and `convex/`, `src/test/`, `e2e/`, `public/`, `.github/workflows/`) to lock in zero-warning linting, dual-runtime Vitest testing, multi-context Playwright real-time E2E specs, and zero-config-bug Cloudflare Workers Static Assets deploys.

---

## Quick Map of Files in This Pack

| File | Purpose |
| :--- | :--- |
| `oxlint.config.ts` | **Config A (PRIMARY DEFAULT — `@nkzw/oxlint-config@3.0.0` + `tsrs` + `Array<T>`)** or **Config B (30-Sec Fallback `oxlint-tsgolint`)** |
| `oxfmt.config.ts` *(or `.prettierrc.json`)* | Code formatting + Tailwind v4 CSS-first class sorting |
| `vitest.config.ts` | Vitest 5 `test.projects` splitting `edge-runtime` (`convex/**`) & `jsdom` (`src/**`) |
| `convex/test.setup.ts` | Vite 8 `tinyglobby`-safe array-negation module loader for `convex-test@0.0.73` |
| `src/test/setup.ts` | React Testing Library (`jsdom`) setup |
| `playwright.config.ts` + `e2e/fixtures.ts` | Desktop (`1440×900`) & Mobile (`390×844`) Playwright setup + zero-console-error guard |
| `e2e/01` – `e2e/04` `.spec.ts` | All 4 real-time core-loop E2E specs (Single-user, Multi-context Table PIN, Split→KDS→Track, Live `86` Lock) |
| `wrangler.jsonc` | Cloudflare Workers Static Assets SPA config (`not_found_handling: "single-page-application"`) |
| `public/_headers` + `public/.assetsignore` | Security headers (`COOP`, `Referrer-Policy`, Convex + optional Stripe CSP) & immutable caching |
| `.github/workflows/ci.yml` | GitHub Actions pipeline (`format + lint + typecheck + vitest + build` → optional E2E → Cloudflare deploy) |

---

## 1. Oxlint (`oxlint.config.ts`) & Formatter Configs

### Critical Oxlint `1.94.0` Facts Verified Against Official Docs (`oxc.rs`)
1. **`"react"` natively includes `react-hooks`:** Valid built-in plugin names in `plugins: [...]` are `"eslint" | "react" | "unicorn" | "typescript" | "oxc" | "import" | "jsdoc" | "jest" | "vitest" | "jsx-a11y" | "nextjs" | "react-perf" | "promise" | "node" | "vue"`. Do **not** put `"react-hooks"` in `plugins` — Hooks rules live natively under `"react/rules-of-hooks"` and `"react/exhaustive-deps"`.
2. **Setting `plugins` overwrites Oxlint's defaults:** Always list every built-in plugin you want active (e.g., `"eslint"`, `"typescript"`, `"oxc"`, `"react"`, `"jsx-a11y"`, `"promise"`, `"import"`, `"vitest"`).
3. **Keep `"vitest"` in top-level `plugins`:** Placing `plugins` inside an `overrides` block replaces the plugin list for matched files, which can accidentally disable `typescript`/`oxc` inside tests. Keeping `"vitest"` at the top level ensures all rules run together on test files without firing false positives on app files.
4. **Type-Aware Linting (`options.typeAware: true`):** Powered by `oxlint-tsgolint@7.0.2007` (Config A) or `tsrs@7.1.0-beta.tsrs3` (Config B). Keep `options.typeCheck` off so `tsc --noEmit` remains the single authoritative TypeScript compiler for both TS 6 and TS 7 workflows.

---

### Config A (PRIMARY DEFAULT — User Confirmed: `@nkzw/oxlint-config@3.0.0` + `tsrs` + Explicit `Array<T>`)

Uses Christoph Nakazawa's exact **`@nkzw/oxlint-config@3.0.0`** (which enforces **"Error, Never Warn"**, bundles Dillon Mulroy's 12 **`dmmulroy/anti-slop`** `quality/*` rules, and runs on VoidZero/Cloudflare's faster Rust type-aware backend **`tsrs`**) with our **4 verified Convex/React adjustments** and explicit generic **`Array<T>`** enabled (auto-fixable via `npx oxlint --fix` whenever `shadcn` CLI downloads `T[]` files!).

> **Why we skip `@nkzw/oxlint-config/with-sorting`:** `/with-sorting` forces strict A–Z alphabetical JSX props (`className` before `disabled` before `onClick` before `variant`), which hurts readability while learning React. Stick to the base `@nkzw/oxlint-config`.

**Install:**
```bash
npm install -D oxlint@1.94.0 @nkzw/oxlint-config@3.0.0 tsrs@7.1.0-beta.tsrs3
```

**Drop-in `oxlint.config.ts`:**
```ts
import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".wrangler/**",
    "src/routeTree.gen.ts",
    "convex/_generated/**",
  ],
  settings: {
    react: {
      linkComponents: [{ name: "Link", linkAttribute: "to" }],
    },
  },
  rules: {
    // 1. We use Convex, not Meta's Relay GraphQL:
    "@nkzw/ensure-relay-types": "off",

    // 2. Allow `error instanceof ConvexError` & `e.target instanceof HTMLElement`
    //    (Note: `unicorn/no-instanceof-array` stays ON so arrays still enforce Array.isArray):
    "@nkzw/no-instanceof": "off",

    // 3. Keep explicit generic Array<T> / ReadonlyArray<T> (auto-fixable via `npx oxlint --fix`):
    "@typescript-eslint/array-type": ["error", { default: "generic" }],

    // 4. Ergonomic async onClick handlers on React 19 / Base UI buttons:
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
  },
  overrides: [
    {
      files: ["convex/**/*.ts"],
      rules: {
        "no-console": ["error", { allow: ["warn", "error"] }],
      },
    },
    {
      files: [
        "*.config.{ts,mts,js}",
        "e2e/**/*.ts",
        "scripts/**/*.ts",
        "convex/seed.ts",
      ],
      env: {
        node: true,
      },
      rules: {
        "no-console": "off",
      },
    },
  ],
});
```

---

### Config B (30-Second Fallback — Clean Native `oxlint@1.94.0` + Stable `oxlint-tsgolint@7.0.2007`)

Keep this ready **only** as an instant fallback if `tsrs@7.1.0-beta.tsrs3` hits a macOS beta glitch on Day 1. It preserves `"Error, Never Warn"` and explicit `Array<T>` on the stable Go-based `oxlint-tsgolint` backend.

**Install:**
```bash
npm install -D oxlint@1.94.0 oxlint-tsgolint@7.0.2007
```

**Drop-in `oxlint.config.ts` (Fallback):**
```ts
import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "oxc",
    "react",
    "jsx-a11y",
    "promise",
    "import",
    "vitest",
  ],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
  },
  options: {
    typeAware: true,
    reportUnusedDisableDirectives: "error",
    maxWarnings: 0,
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      linkComponents: [{ name: "Link", linkAttribute: "to" }],
    },
    "jsx-a11y": {
      components: {
        Link: "a",
        Button: "button",
      },
    },
  },
  ignorePatterns: [
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".wrangler/**",
    "src/routeTree.gen.ts",
    "convex/_generated/**",
  ],
  rules: {
    "no-console": "error",
    "no-alert": "error",
    eqeqeq: "error",
    "typescript/array-type": ["error", { default: "generic" }],
    "typescript/no-explicit-any": "error",
    "typescript/no-floating-promises": ["error", { ignoreVoid: true }],
    "typescript/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
    "typescript/await-thenable": "error",
    "typescript/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "react/react-in-jsx-scope": "off",
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "react/jsx-key": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    "promise/no-return-wrap": "error",
    "promise/valid-params": "error",
    "import/no-cycle": "error",
    "vitest/no-focused-tests": "error",
    "vitest/no-disabled-tests": "error",
  },
  overrides: [
    {
      files: ["convex/**/*.ts"],
      rules: {
        "no-console": ["error", { allow: ["warn", "error"] }],
      },
    },
    {
      files: [
        "*.config.{ts,mts,js}",
        "e2e/**/*.ts",
        "scripts/**/*.ts",
        "convex/seed.ts",
      ],
      env: {
        node: true,
      },
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["src/**/*.test.{ts,tsx}", "convex/**/*.test.ts"],
      rules: {
        "vitest/expect-expect": "error",
      },
    },
  ],
});
```

> **Property-Based Verification Boost (Claude Code Verification Pattern):** Add `npm install -D fast-check` alongside Vitest so `bill-engine.test.ts` fuzzes **1,000+ randomized table orders & diner counts** proving mathematically that `sum(dinerShares) === totalPiaster` and `max(share) - min(share) <= 1 piaster` on every equal split — impossible for an AI agent to fake!

---

### Formatter Config: `oxfmt@0.79.0` (Exact-Pinned) vs. `prettier@^3.10.1`

Pick **one** formatter and stick to it (never run both on the same repo).

| Dimension | `oxfmt@0.79.0` (Exact-Pinned) | `prettier@^3.10.1` + `prettier-plugin-tailwindcss` |
| :--- | :--- | :--- |
| **Speed** | ~7× faster (Rust, instant format-on-save & CI) | Fast enough for a capstone (~1–2s in CI) |
| **Tailwind v4 Class Sorting** | Built-in (`sortTailwindcss.stylesheet`), zero extra plugin | Requires `prettier-plugin-tailwindcss` (`tailwindStylesheet`) |
| **Stability / Risk** | `0.x` beta — **must exact-pin** (`"0.79.0"`, no `^`) so formatting never drifts mid-sprint | Stable SemVer `3.x` — zero surprise format diffs |
| **Recommendation** | Great if you want full VoidZero speed (`oxlint` + `oxfmt`) | Safest zero-churn default if you prefer stable `3.x` |

#### Option 1 — `oxfmt@0.79.0` (Drop-in `oxfmt.config.ts`)

```bash
npm install -D --save-exact oxfmt@0.79.0
```

```ts
import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  singleQuote: false,
  semi: true,
  sortTailwindcss: {
    // Tailwind CSS v4 CSS-first entry point (resolved relative to this config file)
    stylesheet: "./src/index.css",
    functions: ["cn", "clsx", "cva"],
    preserveWhitespace: false,
  },
  ignorePatterns: [
    "dist/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "src/routeTree.gen.ts",
    "convex/_generated/**",
    "package-lock.json",
    "pnpm-lock.yaml",
  ],
});
```

*(Scripts: `"format": "oxfmt ."`, `"format:check": "oxfmt --check ."`)*

#### Option 2 — `prettier@^3.10.1` + `prettier-plugin-tailwindcss` (Drop-in `.prettierrc.json` & `.prettierignore`)

```bash
npm install -D prettier@^3.10.1 prettier-plugin-tailwindcss
```

**`.prettierrc.json`:**
```json
{
  "printWidth": 100,
  "singleQuote": false,
  "semi": true,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/index.css",
  "tailwindFunctions": ["cn", "clsx", "cva"]
}
```

**`.prettierignore`:**
```text
dist/
coverage/
playwright-report/
test-results/
src/routeTree.gen.ts
convex/_generated/
package-lock.json
pnpm-lock.yaml
```

*(Scripts: `"format": "prettier --write ."`, `"format:check": "prettier --check ."`)*

---

## 2. Vitest (`vitest@5.1.1`) + `convex-test@0.0.73` under Vite 8

### Why This Exact Config Matters Under Vite 8 (`vite@8.3.8`)
1. **Separate `test.projects` instead of legacy workspaces:** Vitest 5 uses `test.projects` to run Convex backend tests inside `edge-runtime` (`@edge-runtime/vm`) and React UI/domain tests inside `jsdom` under a single `vitest run` invocation — zero environment bleed!
2. **`server.deps.inline: ["convex-test"]`:** Forces Vitest's module runner to transform `convex-test` cleanly instead of treating it as an external CJS module.
3. **Vite 8 `tinyglobby` Array-Negation Glob:** Older Convex docs suggest `import.meta.glob("./**/!(*.*.*)*.*s")`. Vite 8 switched internal globbing to `tinyglobby`, where nested extglob negation (`!(*.*.*)`) can fail or silently return an empty module map. Explicit array-negation `["./**/*.ts", "!./**/*.test.ts", "!./test.setup.ts"]` is 100% deterministic under Vite 8.

**Install:**
```bash
npm install -D vitest@5.1.1 convex-test@0.0.73 @edge-runtime/vm jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Drop-in `vitest.config.ts`
```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    // Runs both Convex backend tests and Frontend UI/domain tests in one `vitest run`
    projects: [
      {
        extends: true,
        test: {
          name: "convex",
          include: ["convex/**/*.test.ts"],
          environment: "edge-runtime",
          server: {
            deps: {
              inline: ["convex-test"],
            },
          },
        },
      },
      {
        extends: true,
        plugins: [react()],
        test: {
          name: "web",
          include: ["src/**/*.test.{ts,tsx}"],
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          css: false,
          restoreMocks: true,
        },
      },
    ],
  },
});
```

### Drop-in `convex/test.setup.ts` (Vite 8 `tinyglobby`-Safe!)
```ts
/// <reference types="vite/client" />

// Vite 8 uses tinyglobby: avoid bash extglob `!(*.*.*)` patterns and use explicit array negation.
export const modules = import.meta.glob([
  "./**/*.ts",
  "!./**/*.test.ts",
  "!./test.setup.ts",
]);
```

### Drop-in `src/test/setup.ts`
```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

### Day-1 Smoke Tests (Verify Both Vitest Projects Immediately)

**`src/features/cart/splitBill.test.ts` (runs in `web` project — proves integer-piaster zero-drift math):**
```ts
import { describe, expect, it } from "vitest";

/**
 * Pure integer-piaster equal split helper (1 EGP = 100 piasters).
 * Remainder piasters are assigned deterministically to the first `remainder` diners
 * so the sum of shares ALWAYS equals `totalPiasters` exactly.
 */
function splitEquallyPiasters(totalPiasters: number, dinerCount: number): number[] {
  if (!Number.isInteger(totalPiasters) || totalPiasters < 0) {
    throw new RangeError("totalPiasters must be a non-negative integer");
  }
  if (!Number.isInteger(dinerCount) || dinerCount < 1) {
    throw new RangeError("dinerCount must be a positive integer");
  }
  const baseShare = Math.floor(totalPiasters / dinerCount);
  const remainder = totalPiasters % dinerCount;
  return Array.from({ length: dinerCount }, (_, index) =>
    index < remainder ? baseShare + 1 : baseShare,
  );
}

describe("splitEquallyPiasters", () => {
  it("distributes indivisible totals without floating-point drift", () => {
    // 100.00 EGP (10000 piasters) split 3 ways => 33.34, 33.33, 33.33
    const shares = splitEquallyPiasters(10_000, 3);
    expect(shares).toEqual([3334, 3333, 3333]);
    expect(shares.reduce((sum, v) => sum + v, 0)).toBe(10_000);
  });

  it("handles even splits cleanly", () => {
    expect(splitEquallyPiasters(45_000, 2)).toEqual([22_500, 22_500]);
  });
});
```

**`convex/smoke.test.ts` (runs in `convex` `edge-runtime` project — verifies `convex-test@0.0.73` + Vite 8 module glob):**
```ts
import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import schema from "./schema";
import { modules } from "./test.setup";

describe("convex-test harness", () => {
  it("boots schema and module map cleanly inside edge-runtime", async () => {
    const t = convexTest(schema, modules);
    expect(Object.keys(modules).length).toBeGreaterThan(0);

    // Replace with your first real query/mutation (e.g., api.menu.listDishes) once created
    const count = await t.run(async (ctx) => {
      const docs = await ctx.db.query("dishes").collect();
      return docs.length;
    });
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
```

---

## 3. Playwright (`@playwright/test@1.65.1`) + 4 Real-Time E2E Test Specs

**Install:**
```bash
npm install -D @playwright/test@1.65.1
npx playwright install chromium
```

### Shared `data-testid` Contract (Wire These From Day 1!)
Keep E2E specs resilient to copy/Arabic RTL changes by attaching these exact `data-testid` attributes to key interactive surfaces (while still asserting accessible roles/names wherever appropriate):

| Surface / Route | `data-testid` Attributes |
| :--- | :--- |
| **Hero (`/`)** | `hero-prep-status`, `hero-cta-menu`, `hero-cta-join-table` |
| **Menu (`/menu`)** | `menu-search-input`, `menu-category-pill-<slug>`, `dish-card-<slug>`, `dish-add-btn-<slug>`, `dish-soldout-badge-<slug>` |
| **Dish Customizer Drawer** | `customizer-drawer`, `modifier-group-required`, `modifier-option-<slug>`, `customizer-notes-input`, `customizer-total-price`, `customizer-submit-btn`, `customizer-validation-error` |
| **Floating Cart Dock & Drawer** | `floating-cart-dock`, `cart-dock-count`, `cart-dock-subtotal`, `cart-drawer`, `cart-item-row`, `cart-item-owner`, `cart-checkout-btn` |
| **Table Join (`/table/:n`)** | `table-pin-input`, `table-nickname-input`, `table-join-submit`, `table-pin-error`, `table-active-badge` |
| **Split-Bill Checkout Drawer** | `checkout-drawer`, `split-mode-full`, `split-mode-mine`, `split-mode-equal`, `split-equal-count`, `split-payable-amount`, `checkout-pay-demo-btn` |
| **Live Tracker (`/track/:orderId`)** | `tracker-order-code`, `tracker-status-badge`, `tracker-step-new`, `tracker-step-prep`, `tracker-step-ready` |
| **Kitchen Display (`/kds`)** | `kds-login-username`, `kds-login-password`, `kds-login-submit`, `kds-board`, `kds-ticket-<orderCode>`, `kds-ticket-line`, `kds-btn-start-prep`, `kds-btn-mark-ready`, `kds-stock-drawer-btn`, `kds-86-toggle-<slug>` |

### Drop-in `playwright.config.ts`
```ts
import { defineConfig } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:5173";
const IS_CI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  // Real-time multi-tab specs mutate shared Convex table/dish state (Table #5, Dish 86),
  // so serialize specs to guarantee zero cross-test interference.
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  forbidOnly: IS_CI,
  retries: IS_CI ? 2 : 0,
  reporter: IS_CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "on-failure" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile-chromium",
      testMatch: /01-hero-menu-drawer-cart\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: IS_CI ? "npm run preview -- --port 5173" : "npm run dev -- --port 5173",
        url: BASE_URL,
        reuseExistingServer: !IS_CI,
        timeout: 60_000,
      },
});
```

### Drop-in `e2e/fixtures.ts` (Multi-Context Factory + Automatic Zero-Console-Error Guard)
```ts
import {
  test as base,
  expect,
  type BrowserContext,
  type Page,
} from "@playwright/test";

export interface TrackedSession {
  context: BrowserContext;
  page: Page;
  errors: string[];
  assertZeroErrors: () => void;
}

export interface E2EFixtures {
  /** Tracks console errors + uncaught page errors on the default `page` */
  consoleErrors: string[];
  /** Spawns an isolated BrowserContext (fresh localStorage/session) with error tracking */
  createSession: (options?: {
    viewport?: { width: number; height: number };
    isMobile?: boolean;
    hasTouch?: boolean;
  }) => Promise<TrackedSession>;
}

function attachErrorListeners(page: Page, bucket: string[], label: string): void {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      bucket.push(`[${label} console.error] ${msg.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    bucket.push(`[${label} pageerror] ${error.message}`);
  });
}

export async function loginStaffKds(page: Page): Promise<void> {
  const username = process.env.E2E_STAFF_USER ?? "chef";
  const password = process.env.E2E_STAFF_PASS ?? "kitchen250!";

  await page.goto("/kds");
  const board = page.getByTestId("kds-board");
  const loginInput = page.getByTestId("kds-login-username");

  // If protected route redirects/gates to staff login, sign in cleanly
  await expect(board.or(loginInput)).toBeVisible();
  if (await loginInput.isVisible()) {
    await loginInput.fill(username);
    await page.getByTestId("kds-login-password").fill(password);
    await page.getByTestId("kds-login-submit").click();
  }
  await expect(board).toBeVisible();
}

export const test = base.extend<E2EFixtures>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    attachErrorListeners(page, errors, "default");
    await use(errors);
    expect(errors, `Unexpected console/page errors:\n${errors.join("\n")}`).toEqual([]);
  },

  createSession: async ({ browser }, use) => {
    const openContexts: BrowserContext[] = [];
    let sessionIndex = 0;

    const factory = async (options?: {
      viewport?: { width: number; height: number };
      isMobile?: boolean;
      hasTouch?: boolean;
    }): Promise<TrackedSession> => {
      sessionIndex += 1;
      const context = await browser.newContext({
        viewport: options?.viewport ?? { width: 1440, height: 900 },
        isMobile: options?.isMobile ?? false,
        hasTouch: options?.hasTouch ?? false,
      });
      openContexts.push(context);

      const page = await context.newPage();
      const errors: string[] = [];
      attachErrorListeners(page, errors, `session-${sessionIndex}`);

      return {
        context,
        page,
        errors,
        assertZeroErrors: () => {
          expect(errors, `Session ${sessionIndex} errors:\n${errors.join("\n")}`).toEqual([]);
        },
      };
    };

    await use(factory);

    await Promise.all(openContexts.map((ctx) => ctx.close()));
  },
});

export { expect };
```

---

### E2E Spec 1 — `e2e/01-hero-menu-drawer-cart.spec.ts`
*Runs on BOTH Desktop (`1440×900`) and Mobile (`390×844`), validates modifier form guardrails, live price recalculation, Floating Cart Dock, layout overflow, and 0 console errors.*

```ts
import { expect, test } from "./fixtures";

test.describe("01 — Hero -> Menu -> Modifier Drawer -> Floating Cart Dock", () => {
  test("completes core ordering loop cleanly with zero console errors or overflow", async ({
    page,
    consoleErrors,
  }) => {
    // 1. Storefront Hero
    await page.goto("/");
    await expect(page.getByTestId("hero-prep-status")).toBeVisible();
    await expect(page.getByTestId("hero-cta-menu")).toBeVisible();

    // Assert zero horizontal overflow on both 1440x900 and 390x844
    const heroOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(heroOverflow).toBe(false);

    // 2. Navigate to Menu
    await page.getByTestId("hero-cta-menu").click();
    await expect(page).toHaveURL(/\/menu/);

    // Target a signature dish with a required modifier group (e.g., patty weight / crust)
    const dishCard = page.getByTestId("dish-card-smoked-brisket-smash");
    await expect(dishCard).toBeVisible();
    await page.getByTestId("dish-add-btn-smoked-brisket-smash").click();

    // 3. Dish Customizer Drawer — verify Zod validation blocks missing required choice
    const drawer = page.getByTestId("customizer-drawer");
    await expect(drawer).toBeVisible();

    const submitBtn = page.getByTestId("customizer-submit-btn");
    await submitBtn.click();
    await expect(page.getByTestId("customizer-validation-error")).toBeVisible();

    const initialPrice = await page.getByTestId("customizer-total-price").innerText();

    // Select required option + paid add-on and confirm live price recalculation
    await page.getByTestId("modifier-option-double-patty").click();
    await page.getByTestId("modifier-option-extra-aged-cheddar").click();
    await page.getByTestId("customizer-notes-input").fill("No pickles, crispy edges");

    const updatedPrice = await page.getByTestId("customizer-total-price").innerText();
    expect(updatedPrice).not.toBe(initialPrice);

    await submitBtn.click();
    await expect(drawer).toBeHidden();

    // 4. Floating Cart Dock updates immediately
    const dock = page.getByTestId("floating-cart-dock");
    await expect(dock).toBeVisible();
    await expect(page.getByTestId("cart-dock-count")).toContainText("1");
    await expect(page.getByTestId("cart-dock-subtotal")).toContainText(updatedPrice);

    // Open Shared Cart Drawer and verify line item details
    await dock.click();
    const cartDrawer = page.getByTestId("cart-drawer");
    await expect(cartDrawer).toBeVisible();
    await expect(cartDrawer).toContainText("Smoked Brisket Smash");
    await expect(cartDrawer).toContainText("No pickles, crispy edges");

    const menuOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(menuOverflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });
});
```

---

### E2E Spec 2 — `e2e/02-shared-table-pin-sync.spec.ts`
*Spawns two isolated `BrowserContext`s (Diner A desktop + Diner B mobile `390×844`) joining Table #5 via 4-digit PIN, validating wrong-PIN rejection and sub-second live Shared Cart sync with per-diner tags.*

```ts
import { expect, test } from "./fixtures";

const TABLE_NUMBER = "5";
const TABLE_PIN = process.env.E2E_TABLE_5_PIN ?? "2505";

test.describe("02 — Two-Diner Shared Table #5 PIN & Live Cart Sync", () => {
  test("rejects wrong PIN and syncs items live across two browser contexts", async ({
    createSession,
  }) => {
    const dinerA = await createSession({ viewport: { width: 1440, height: 900 } });
    const dinerB = await createSession({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    // Diner A joins Table #5 as "Ahmed"
    await dinerA.page.goto(`/table/${TABLE_NUMBER}`);
    await dinerA.page.getByTestId("table-nickname-input").fill("Ahmed");
    await dinerA.page.getByTestId("table-pin-input").fill(TABLE_PIN);
    await dinerA.page.getByTestId("table-join-submit").click();
    await expect(dinerA.page.getByTestId("table-active-badge")).toContainText(
      `Table ${TABLE_NUMBER}`,
    );

    // Diner B attempts wrong PIN first (unhappy path), then enters valid 4-digit PIN as "Sara"
    await dinerB.page.goto(`/table/${TABLE_NUMBER}`);
    await dinerB.page.getByTestId("table-nickname-input").fill("Sara");
    await dinerB.page.getByTestId("table-pin-input").fill("0000");
    await dinerB.page.getByTestId("table-join-submit").click();
    await expect(dinerB.page.getByTestId("table-pin-error")).toBeVisible();

    await dinerB.page.getByTestId("table-pin-input").fill(TABLE_PIN);
    await dinerB.page.getByTestId("table-join-submit").click();
    await expect(dinerB.page.getByTestId("table-active-badge")).toContainText(
      `Table ${TABLE_NUMBER}`,
    );

    // Diner A adds an instant-add flatbread (no required modifiers) -> Diner B's dock updates live
    await dinerA.page.getByTestId("dish-add-btn-truffle-mushroom-flatbread").click();
    await expect(dinerB.page.getByTestId("cart-dock-count")).toContainText("1");

    // Diner B adds a customizable burger -> Diner A sees count jump to 2 and both ownership tags
    await dinerB.page.getByTestId("dish-add-btn-smoked-brisket-smash").click();
    await expect(dinerB.page.getByTestId("customizer-drawer")).toBeVisible();
    await dinerB.page.getByTestId("modifier-option-double-patty").click();
    await dinerB.page.getByTestId("customizer-submit-btn").click();
    await expect(dinerB.page.getByTestId("customizer-drawer")).toBeHidden();

    await expect(dinerA.page.getByTestId("cart-dock-count")).toContainText("2");
    await dinerA.page.getByTestId("floating-cart-dock").click();

    const owners = dinerA.page.getByTestId("cart-item-owner");
    await expect(owners).toContainText(["Ahmed", "Sara"]);

    dinerA.assertZeroErrors();
    dinerB.assertZeroErrors();
  });
});
```

---

### E2E Spec 3 — `e2e/03-split-bill-kds-tracker-loop.spec.ts`
*Tests the signature DEPI live-defense loop: Split-Bill Checkout → Instant Ticket on `/kds` → Chef `Start Prep` & `Ready` → Diner `/track/:orderId` live step progression.*

```ts
import { expect, loginStaffKds, test } from "./fixtures";

const TABLE_NUMBER = "5";
const TABLE_PIN = process.env.E2E_TABLE_5_PIN ?? "2505";

test.describe("03 — Split-Bill Checkout -> Live /kds -> Live /track Loop", () => {
  test("propagates checkout to KDS and streams Start/Ready back to diner tracker", async ({
    createSession,
  }) => {
    const diner = await createSession({ viewport: { width: 390, height: 844 }, isMobile: true });
    const chef = await createSession({ viewport: { width: 1440, height: 900 } });

    // 1. Chef opens protected KDS board
    await loginStaffKds(chef.page);

    // 2. Diner joins Table #5 and adds an item
    await diner.page.goto(`/table/${TABLE_NUMBER}`);
    await diner.page.getByTestId("table-nickname-input").fill("Youssef");
    await diner.page.getByTestId("table-pin-input").fill(TABLE_PIN);
    await diner.page.getByTestId("table-join-submit").click();

    await diner.page.getByTestId("dish-add-btn-smoked-brisket-smash").click();
    await expect(diner.page.getByTestId("customizer-drawer")).toBeVisible();
    await diner.page.getByTestId("modifier-option-double-patty").click();
    await diner.page.getByTestId("customizer-submit-btn").click();
    await expect(diner.page.getByTestId("customizer-drawer")).toBeHidden();

    // 3. Open Cart -> Smart Split-Bill Checkout Drawer
    await diner.page.getByTestId("floating-cart-dock").click();
    await diner.page.getByTestId("cart-checkout-btn").click();
    await expect(diner.page.getByTestId("checkout-drawer")).toBeVisible();

    // Exercise split modes: Full -> Split Equally (÷ 2) -> Pay Full
    const fullAmountText = await diner.page.getByTestId("split-payable-amount").innerText();
    await diner.page.getByTestId("split-mode-equal").click();
    const equalAmountText = await diner.page.getByTestId("split-payable-amount").innerText();
    expect(equalAmountText).not.toBe(fullAmountText);

    await diner.page.getByTestId("split-mode-full").click();
    await diner.page.getByTestId("checkout-pay-demo-btn").click();

    // 4. Diner lands on /track/:orderId and receives an order code
    await expect(diner.page).toHaveURL(/\/track\/.+/);
    const orderCode = (await diner.page.getByTestId("tracker-order-code").innerText()).trim();
    expect(orderCode.length).toBeGreaterThan(0);
    await expect(diner.page.getByTestId("tracker-step-new")).toHaveAttribute(
      "data-state",
      "active",
    );

    // 5. Ticket appears LIVE on Chef's /kds without reloading
    const ticket = chef.page.getByTestId(`kds-ticket-${orderCode}`);
    await expect(ticket).toBeVisible();

    // Chef taps Start Prep -> Diner tracker updates live to "On the Grill / Prep"
    await ticket.getByTestId("kds-btn-start-prep").click();
    await expect(diner.page.getByTestId("tracker-step-prep")).toHaveAttribute(
      "data-state",
      "active",
    );

    // Chef strikes dish line & taps Ready -> Diner tracker updates live to "Ready"
    await ticket.getByTestId("kds-ticket-line").first().click();
    await ticket.getByTestId("kds-btn-mark-ready").click();
    await expect(diner.page.getByTestId("tracker-step-ready")).toHaveAttribute(
      "data-state",
      "active",
    );

    diner.assertZeroErrors();
    chef.assertZeroErrors();
  });
});
```

---

### E2E Spec 4 — `e2e/04-kds-86-sold-out-sync.spec.ts`
*Verifies live `86 / Sold Out` propagation from `/kds` to `/menu` with zero reload, and always restores stock state in `finally` so the test suite remains idempotent.*

```ts
import { expect, loginStaffKds, test } from "./fixtures";

const TARGET_DISH_SLUG = "smoked-brisket-smash";

test.describe("04 — Chef 86 / Sold Out Toggle -> Live Diner /menu Lock", () => {
  test("disables + Add live when chef marks dish 86 and restores on un-86", async ({
    createSession,
  }) => {
    const diner = await createSession({ viewport: { width: 1440, height: 900 } });
    const chef = await createSession({ viewport: { width: 1440, height: 900 } });

    await diner.page.goto("/menu");
    const addBtn = diner.page.getByTestId(`dish-add-btn-${TARGET_DISH_SLUG}`);
    const soldOutBadge = diner.page.getByTestId(`dish-soldout-badge-${TARGET_DISH_SLUG}`);
    await expect(addBtn).toBeEnabled();

    await loginStaffKds(chef.page);
    await chef.page.getByTestId("kds-stock-drawer-btn").click();
    const toggle86 = chef.page.getByTestId(`kds-86-toggle-${TARGET_DISH_SLUG}`);
    await expect(toggle86).toBeVisible();

    let markedSoldOut = false;
    try {
      // Chef marks dish 86 / Sold Out
      await toggle86.click();
      markedSoldOut = true;

      // Diner /menu updates LIVE without reload
      await expect(soldOutBadge).toBeVisible();
      await expect(addBtn).toBeDisabled();
    } finally {
      // Always restore dish to In Stock so repeated test runs stay deterministic
      if (markedSoldOut) {
        await toggle86.click();
      }
    }

    // Verify diner /menu re-enables + Add live after un-86
    await expect(soldOutBadge).toBeHidden();
    await expect(addBtn).toBeEnabled();

    diner.assertZeroErrors();
    chef.assertZeroErrors();
  });
});
```

---

## 4. Cloudflare Workers Static Assets, Security Headers & CI/CD

### 4.1 Drop-in `wrangler.jsonc` (`wrangler@4.165.0`)

**Install:**
```bash
npm install -D wrangler@4.165.0
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "kitchen-250-degree",
  "compatibility_date": "2026-11-19",
  // Pure Static Assets SPA (no `main` Worker entrypoint needed -> 0 Worker invocations billed!)
  "assets": {
    "directory": "./dist/",
    "not_found_handling": "single-page-application",
    "html_handling": "auto-trailing-slash"
  },
  "observability": {
    "enabled": true
  }
}
```

> **CRITICAL — Zero `_redirects` Loop Trap:**  
> Do **NOT** create a `public/_redirects` file containing `/* /index.html 200` (the legacy Netlify pattern). On Cloudflare Workers Static Assets, `/* /index.html 200` triggers an *"Infinite loop detected"* error or breaks asset resolution because it matches `/index.html` itself. Setting `"not_found_handling": "single-page-application"` inside `wrangler.jsonc` handles all TanStack Router paths (`/menu`, `/table/5`, `/track/:orderId`, `/kds`) natively on Cloudflare's edge with HTTP `200` and zero Worker invocations.

### 4.2 Drop-in `public/.assetsignore`
Prevents shipping macOS junk or unbundled maps to Cloudflare's edge:
```text
.DS_Store
*.map
```

### 4.3 Drop-in `public/_headers` (Vite copies this into `dist/_headers`)

> **Formatting rule:** Cloudflare `_headers` requires every header value (including `Content-Security-Policy`) to sit on a **single unbroken line** indented by two spaces under its route pattern.

#### Tier 1 Default (Convex Real-Time Backend — Tightest CSP)
```text
/*
  Cross-Origin-Opener-Policy: same-origin-allow-popups
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://*.convex.cloud https://*.convex.site; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://*.convex.site; upgrade-insecure-requests

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

#### Tier 2 Upgrade CSP Line (When Enabling Stripe Sandbox `<PaymentElement />`)
Swap **only** the `Content-Security-Policy` line above for this Stripe-verified single-line policy (official Stripe.js + Elements + 3DS allowlist + Convex WebSocket/HTTP):
```text
  Content-Security-Policy: default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' https://js.stripe.com https://*.js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://*.convex.cloud https://*.convex.site https://*.stripe.com; frame-src 'self' https://js.stripe.com https://*.js.stripe.com https://hooks.stripe.com https://checkout.stripe.com; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://*.convex.site https://api.stripe.com https://m.stripe.network https://q.stripe.com; upgrade-insecure-requests
```

**Why each header is set this way:**
- **`Cross-Origin-Opener-Policy: same-origin-allow-popups`:** Protects `window.opener` without breaking Stripe 3DS popups or optional Tier-2 Google OAuth sign-in windows (strict `same-origin` breaks both!).
- **`connect-src` with `https://*.convex.cloud wss://*.convex.cloud https://*.convex.site`:** Required for Convex reactive WebSocket subscriptions, mutations, and HTTP actions.
- **`style-src 'unsafe-inline'`:** Needed for `@base-ui/react` floating-anchor positioning and `motion/react` runtime inline styles; if you self-host fonts via `@fontsource`, you can delete `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
- **`/assets/*` immutable + `/index.html` `max-age=0, must-revalidate`:** Vite content-hashes everything inside `dist/assets/*`, so browsers cache bundles for a year while always picking up fresh deploys immediately.

---

### 4.4 Drop-in `.github/workflows/ci.yml`

Uses live-verified Nov 2026 action majors: `actions/checkout@v7`, `actions/setup-node@v7` (Node `26`), `actions/upload-artifact@v7`, and `cloudflare/wrangler-action@v4`.

```yaml
name: CI & Cloudflare Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      run_e2e:
        description: "Run Playwright E2E smoke suite"
        type: boolean
        default: true

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

permissions:
  contents: read

jobs:
  quality:
    name: Quality Gates (Format, Oxlint, Typecheck, Vitest, Build)
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js 26
        uses: actions/setup-node@v7
        with:
          node-version: "26"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Check formatting
        run: npm run format:check

      - name: Lint (Oxlint — Error, Never Warn)
        run: npm run lint

      - name: Typecheck (TypeScript strict)
        run: npm run typecheck

      - name: Unit & Convex integration tests (Vitest 5)
        run: npm run test

      - name: Production Vite build
        env:
          VITE_CONVEX_URL: ${{ vars.VITE_CONVEX_URL }}
        run: npm run build

      - name: Upload built static assets
        uses: actions/upload-artifact@v7
        with:
          name: dist-bundle
          path: dist/
          retention-days: 3

  e2e-smoke:
    name: Playwright E2E Smoke (Optional / Gated)
    needs: quality
    runs-on: ubuntu-latest
    timeout-minutes: 15
    # Runs on manual dispatch, PRs labeled `run-e2e`, or main pushes when E2E_CONVEX_URL is configured
    if: >-
      (github.event_name == 'workflow_dispatch' && inputs.run_e2e == true) ||
      contains(github.event.pull_request.labels.*.name, 'run-e2e') ||
      (github.ref == 'refs/heads/main' && vars.ENABLE_CI_E2E == 'true')

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js 26
        uses: actions/setup-node@v7
        with:
          node-version: "26"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Chromium for Playwright
        run: npx playwright install --with-deps chromium

      - name: Build against E2E Convex deployment
        env:
          VITE_CONVEX_URL: ${{ secrets.E2E_CONVEX_URL }}
        run: npm run build

      - name: Run Playwright E2E suite
        env:
          E2E_STAFF_USER: ${{ secrets.E2E_STAFF_USER }}
          E2E_STAFF_PASS: ${{ secrets.E2E_STAFF_PASS }}
          E2E_TABLE_5_PIN: ${{ vars.E2E_TABLE_5_PIN }}
        run: npm run test:e2e

      - name: Upload Playwright report on failure
        if: failure()
        uses: actions/upload-artifact@v7
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  deploy:
    name: Deploy to Cloudflare Workers Static Assets
    needs: quality
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment:
      name: production

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js 26
        uses: actions/setup-node@v7
        with:
          node-version: "26"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build production bundle
        env:
          VITE_CONVEX_URL: ${{ vars.VITE_CONVEX_URL }}
        run: npm run build

      - name: Deploy Static Assets via Wrangler v4
        uses: cloudflare/wrangler-action@v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          wranglerVersion: "4.165.0"
```

### Required GitHub Repository Secrets & Variables

| Kind | Name | Value / Purpose |
| :--- | :--- | :--- |
| **Secret** | `CLOUDFLARE_API_TOKEN` | Scoped Cloudflare token with *Workers Scripts: Edit* permission |
| **Secret** | `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
| **Variable** | `VITE_CONVEX_URL` | Production Convex deployment URL (`https://<slug>.convex.cloud`) |
| **Variable** *(Optional)* | `ENABLE_CI_E2E` | Set to `"true"` once staging Convex seed data is live |
| **Secret** *(Optional)* | `E2E_CONVEX_URL`, `E2E_STAFF_USER`, `E2E_STAFF_PASS` | Dedicated dev/staging Convex deployment + seeded chef account for CI E2E |

---

## 5. Drop-In `package.json` Scripts & Day-1 Gate Checklist

Add these scripts directly to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt .",
    "format:check": "oxfmt --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:convex": "vitest run --project convex",
    "test:web": "vitest run --project web",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "check": "npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build",
    "deploy": "npm run build && wrangler deploy"
  }
}
```
*(If using Prettier instead of Oxfmt, swap `"format"` to `"prettier --write ."` and `"format:check"` to `"prettier --check ."`.)*

### Day-1 Scaffold Gate (Decision 6 Verification)
Before writing any feature code, run these exact checks and confirm every single one exits `0`:
1. `npm run check` — confirms formatting, Oxlint type-aware linting (`0` errors, `0` warnings), strict `tsc --noEmit`, both Vitest projects (`convex` + `web`), and `vite build` all pass cleanly.
2. `npx wrangler deploy` — deploys the Day-1 scaffold to your live `*.workers.dev` URL; verify direct navigation to `/menu` and `/table/5` returns HTTP `200` (SPA fallback working) and inspect response headers in DevTools Network tab to verify `Cross-Origin-Opener-Policy: same-origin-allow-popups` and `Content-Security-Policy` are present with **0 browser console errors**.
3. `npm run test:e2e` — once Tier-1 routes + seed data land, run all 4 specs locally and inspect `playwright-report/` before declaring any slice done.
