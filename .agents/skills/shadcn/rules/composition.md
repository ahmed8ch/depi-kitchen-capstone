# Component Composition

## Items always inside their Group component
- `SelectItem`, `SelectLabel` → `SelectGroup`
- `DropdownMenuItem`, `DropdownMenuLabel` → `DropdownMenuGroup`
- `CommandItem` → `CommandGroup`

## Callouts use Alert
```tsx
<Alert>
  <AlertTitle>Kitchen Closed</AlertTitle>
  <AlertDescription>We reopen daily at 12:00 PM Cairo time.</AlertDescription>
</Alert>
```

## Empty states use Empty component
```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><IsometricTrayIcon /></EmptyMedia>
    <EmptyTitle>Your table tray is empty</EmptyTitle>
    <EmptyDescription>Add a burger, pizza, or grill plate to start your shared order.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Browse Menu</Button>
  </EmptyContent>
</Empty>
```

## Toast follows project base (Base UI!)
```tsx
import { toast } from "@/components/ui/toast"
toast.add({ title: "Added to Table 5" })
```

## Overlay mapping
- `Drawer` → Bottom Sheet (Dish Customizer)
- `Sheet` → Trailing Side Panel (Cart)
- `Popover` → Contextual info anchored directly to trigger (`Try dark mode` switch)
- `Dialog` → Focused modal task
- `AlertDialog` → Destructive confirmation

## Accessibility & Component Discipline
- `DialogTitle`, `SheetTitle`, `DrawerTitle` are ALWAYS required (use `className="sr-only"` if visually hidden).
- Use full `Card` composition (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- `Button` has no `isLoading` prop — compose `<Button disabled><Spinner data-icon="inline-start" />Sending...</Button>`.
- `TabsTrigger` must be inside `TabsList`.
- Use `<Separator />` (no `<hr>`), `<Skeleton />` (no custom `animate-pulse` divs), `<Badge />` (no custom pill spans), `<Item />` for itemized cart/split/86 rows.
