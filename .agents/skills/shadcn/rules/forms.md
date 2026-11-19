# Forms & Inputs

## Forms use FieldGroup + Field
Always use `FieldGroup` + `Field` — never raw `div` with `space-y-*`.

```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="guest-name">Your first name</FieldLabel>
    <Input id="guest-name" />
  </Field>
</FieldGroup>
```

## InputGroup requires InputGroupInput / InputGroupTextarea + InputGroupAddon
Never place a raw `Input` or absolute-positioned `Button` inside `InputGroup`:

```tsx
<InputGroup>
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
  <InputGroupInput placeholder="Search burgers, pizza, kofta..." />
</InputGroup>
```

## Option sets (2–7 choices) use ToggleGroup
Don't manually loop `Button` with active state — use `ToggleGroup` + `ToggleGroupItem` (remember Base UI array `value`!).

## FieldSet + FieldLegend for Checkbox / RadioGroup sets
```tsx
<FieldSet>
  <FieldLegend variant="label">Extra Toppings</FieldLegend>
  <FieldDescription>Choose up to 4.</FieldDescription>
  <FieldGroup className="gap-3">
    <Field orientation="horizontal">
      <Checkbox id="hot-honey" />
      <FieldLabel htmlFor="hot-honey" className="font-normal">Wildflower Hot Honey (+25 EGP)</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

## Validation & Disabled States
Pair `data-invalid` on `Field` with `aria-invalid` on the control; `data-disabled` on `Field` with `disabled` on the control.
