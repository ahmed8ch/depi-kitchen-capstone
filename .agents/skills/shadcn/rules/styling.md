# Styling & Customization

- **Semantic colors only:** `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-destructive` — NEVER raw Tailwind colors like `bg-blue-500`, `text-emerald-600`, or hardcoded hex values in JSX.
- **Built-in variants first:** `<Button variant="outline">` instead of hand-writing border/hover utility overrides.
- **`className` for layout only:** `max-w-md`, `mx-auto`, `gap-4` — don't override component surface colors or typography directly in JSX.
- **No `space-x-*` / `space-y-*`:** Use `flex flex-col gap-*` or `flex gap-*`.
- **Prefer `size-*` over `w-* h-*`** when width and height match (`size-10`).
- **Prefer `truncate`** instead of `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` overrides:** Semantic tokens & `[data-surface="dark-pass"]` handle contrast planes cleanly.
- **Always use `cn()`** for conditional classes.
- **No manual `z-index` on overlays:** `Dialog`, `Sheet`, `Drawer`, `Popover` manage their own portal stacking.
- **Use built-in `shimmer` and `scroll-fade`** utilities instead of hand-rolling custom shimmer keyframes or mask gradients.
