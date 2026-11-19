# Base vs Radix

API differences between `base` and `radix`. Check the `base` field from `npx shadcn@latest info`.

## Composition: asChild (radix) vs render (base)

Radix uses `asChild` to replace the default element. Base uses `render`. Don't wrap triggers in extra elements.

**Correct (base):**

```tsx
<DialogTrigger render={<Button />}>Open</DialogTrigger>
```

Applies to all trigger and close components: `DialogTrigger`, `SheetTrigger`, `AlertDialogTrigger`, `DropdownMenuTrigger`, `PopoverTrigger`, `TooltipTrigger`, `CollapsibleTrigger`, `DialogClose`, `SheetClose`, `NavigationMenuLink`, `BreadcrumbLink`, `SidebarMenuButton`, `Badge`, `Item`.

## Button / trigger as non-button element (base only)

When `render` changes an element to a non-button (`<a>`, `<span>`, TanStack `<Link>`), add `nativeButton={false}`:

```tsx
<Button render={<a href="/menu" />} nativeButton={false}>
  Explore Menu
</Button>
```

## Select (base)

Base requires an `items` prop on the root and uses `{ value: null }` for placeholder. Content uses `alignItemWithTrigger={false} side="bottom"`. Supports `multiple` and object values with `itemToStringValue`.

```tsx
const items = [
  { label: "Select a table", value: null },
  { label: "Table 1", value: "1" },
]
<Select items={items}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent alignItemWithTrigger={false} side="bottom">
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={String(item.value)} value={item.value}>{item.label}</SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
```

## ToggleGroup (base)

Base uses no `type` prop (uses `multiple` boolean for multi-select), and `value`/`defaultValue` is ALWAYS an array:

```tsx
const [mode, setMode] = React.useState("split")
<ToggleGroup value={[mode]} onValueChange={(v) => { if (v[0]) setMode(v[0]) }}>
  <ToggleGroupItem value="full">Pay Full</ToggleGroupItem>
  <ToggleGroupItem value="mine">My Items</ToggleGroupItem>
  <ToggleGroupItem value="split">Split Equally</ToggleGroupItem>
</ToggleGroup>
```

## Slider & Accordion (base)

- **Slider:** Single thumb uses plain number `defaultValue={50}` (not `[50]`). Range uses array.
- **Accordion:** No `type` prop; uses `multiple` boolean; `defaultValue` is always an array (`defaultValue={["item-1"]}`).
