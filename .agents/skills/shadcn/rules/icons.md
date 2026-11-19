# Icons

**Always use the project's configured `iconLibrary` (`hugeicons` → `@hugeicons/react` + `@hugeicons/core-free-icons`).** Never assume `lucide-react`.

## Icons in Button use `data-icon`
Add `data-icon="inline-start"` or `data-icon="inline-end"` on the icon — NO manual `size-4` / `w-4 h-4` / `mr-2` classes (shadcn CSS handles icon sizing & spacing automatically):

```tsx
<Button>
  <AppIcon icon={ArrowRight01Icon} data-icon="inline-end" />
  Explore Menu
</Button>
```

## Pass icons as objects, never string keys
Pass `icon={CheckIcon}`, never a dynamic string map lookup.
