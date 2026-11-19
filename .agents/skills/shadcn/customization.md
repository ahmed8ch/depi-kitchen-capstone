# Customization & Theming

Components reference semantic CSS variable tokens. Change `:root` variables in `src/index.css` to update every component cleanly.

## Color Variables (Pure White Neutral `base-luma` + `oklch()`)
- `--background` / `--foreground`: Pure crisp white `oklch(1 0 0)` (`#FFFFFF`) & crisp ink `oklch(0.145 0 0)` (`#09090B`)
- `--card` / `--card-foreground`: `oklch(1 0 0)` & `oklch(0.145 0 0)`
- `--secondary` / `--muted` / `--accent`: Clean neutral `oklch(0.97 0 0)` (`#F5F5F5`)
- `--border` / `--input`: Hairline neutral `oklch(0.922 0 0)` (`#E5E5E5`)
- `--primary` / `--primary-foreground`: 1-line swappable brand accent in `oklch()` (never hardcode colors in JSX!)
- `[data-surface="dark-pass"]`: Scoped glare-free dark contrast plane ONLY for `/kds`, Floating Cart Dock, and 1 dark contrast showcase band on `/`.

## Adding Custom Semantic Colors (Tailwind v4)
Define in `:root` inside `src/index.css`, then map in `@theme inline` (`--color-status-ready: var(--status-ready)`). Never create extra CSS files.

## Updating Components Safely
Always preview upstream changes with `npx shadcn@latest add <component> --dry-run` and `--diff <file>`. Never run `--overwrite` without explicit user approval.
