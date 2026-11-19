import { RollingNumber } from "@kitlangton/rolling-number/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import {
  Add01Icon,
  AppIcon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Clock01Icon,
  FireIcon,
  MinusSignIcon,
  Moon02Icon,
  QrCode01Icon,
  Restaurant01Icon,
  ShoppingBag01Icon,
  Sun03Icon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

interface FireStation {
  id: string;
  titleEn: string;
  titleAr: string;
  detailEn: string;
  detailAr: string;
  metric: string;
  icon: typeof FireIcon;
}

const FIRE_STATIONS: ReadonlyArray<FireStation> = [
  {
    id: "smash",
    titleEn: "Cast-Iron Smash",
    titleAr: "سماش على الصاج",
    detailEn:
      "Lace-edged aged beef pressed on seasoned steel for crisp sear and juicy centers.",
    detailAr:
      "برجر لحم بلدي مضغوط على صاج حامي لحواف مقرمشة وعصارة متماسكة.",
    metric: "250°C",
    icon: FireIcon,
  },
  {
    id: "deck",
    titleEn: "48h Stone-Deck",
    titleAr: "فرن حجري 48 ساعة",
    detailEn:
      "Cold-fermented dough baked directly on radiant stone for blistered crust.",
    detailAr:
      "عجينة مخمرة 48 ساعة ومخبوزة على الحجر الساخن لقرمشة خفيفة.",
    metric: "48h",
    icon: Restaurant01Icon,
  },
  {
    id: "charcoal",
    titleEn: "Oak Charcoal",
    titleAr: "شوي على الفحم",
    detailEn:
      "Whole cuts and skewers finished over glowing oak embers before hitting the pass.",
    detailAr:
      "قطعيات طازجة مشوية على جمر البلوط وتخرج مباشرة على الباس.",
    metric: "Maadi",
    icon: Clock01Icon,
  },
];

interface CairoClockState {
  isOpen: boolean;
  formattedTime: string;
}

function getCairoClockState(now: Date, locale: "en" | "ar"): CairoClockState {
  const hourParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hourValue = Number(
    hourParts.find((part) => part.type === "hour")?.value ?? "12",
  );
  // Open 12:00 PM through 1:00 AM Cairo local time
  const isOpen = hourValue >= 12 || hourValue < 1;

  const formattedTime = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      timeZone: "Africa/Cairo",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(now);

  return { isOpen, formattedTime };
}

function HomePage() {
  const { locale, dir } = useAppAppearance();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const [now, setNow] = useState(() => new Date());
  const clock = getCairoClockState(now, locale);
  const [dishQty, setDishQty] = useState(1);
  const [searChoice, setSearChoice] = useState("medium");
  const [extraCheese, setExtraCheese] = useState(true);
  const [extraJalapeno, setExtraJalapeno] = useState(false);
  const [kitchenNote, setKitchenNote] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bagItemsCount, setBagItemsCount] = useState(2);

  const [shakeCount, setShakeCount] = useState(0);
  const [darkPopoverOpen, setDarkPopoverOpen] = useState(false);
  const switchAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const baseDishEgp = 295;
  const extrasEgp = (extraCheese ? 45 : 0) + (extraJalapeno ? 25 : 0);
  const drawerTotalEgp = (baseDishEgp + extrasEgp) * dishQty;
  const bagSubtotalEgp = bagItemsCount * 295;

  const handleConfirmDish = () => {
    setBagItemsCount((count) => count + dishQty);
    setDrawerOpen(false);
    toast.add({
      type: "success",
      title: isAr ? "اتضاف على الترابيزة" : "Added to table bag",
      description: isAr
        ? `${dishQty}× سماش مدخن (${drawerTotalEgp} ج.م)`
        : `${dishQty}x Smoked Smash (${drawerTotalEgp} EGP)`,
    });
  };

  const handleDarkSwitchReject = () => {
    setShakeCount((count) => count + 1);
    setDarkPopoverOpen(true);
  };

  return (
    <div className="bg-background text-foreground">
      {/* 1. Pure White Editorial Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <div className="flex flex-col items-start gap-8">
          <Badge variant="secondary" className="gap-2 px-3 py-1 text-xs">
            <AppIcon
              icon={clock.isOpen ? Sun03Icon : Moon02Icon}
              size={14}
              className="text-primary-ink"
            />
            <span>
              {isAr
                ? clock.isOpen
                  ? "مفتوح في المعادي"
                  : "المطبخ يستريح الآن"
                : clock.isOpen
                  ? "Open in Maadi"
                  : "Resting until noon"}
            </span>
            <span className="text-muted-foreground">·</span>
            <bdi dir="ltr" className="tabular-price text-muted-foreground">
              {clock.formattedTime}
            </bdi>
            <span className="text-muted-foreground">
              {isAr ? "القاهرة" : "Cairo"}
            </span>
          </Badge>

          <div className="flex max-w-3xl flex-col gap-5">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
              {isAr
                ? "مطبخ نار مفتوحة وطلب مباشر على الترابيزة."
                : "Open-fire craft ordered together at the table."}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {isAr
                ? "امسح كود الترابيزة، اختار الإضافات اللي تحبها، وقسم الحساب في ثواني بدون تسجيل دخول."
                : "Scan your table PIN, customize every sear and crust, and split the bill cleanly without creating an account."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <span>{isAr ? "افتح المنيو" : "Explore Menu"}</span>
              <AppIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Link>
            <Link
              to="/table"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
              <span>{isAr ? "انضم للترابيزة" : "Join Table"}</span>
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* 2. Three Open-Fire Stations */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {isAr ? "ثلاث محطات نار مفتوحة" : "Three Open-Fire Stations"}
          </h2>
          <Badge variant="outline" className="tabular-price">
            {isAr ? "شارع 9، المعادي، القاهرة" : "Road 9, Maadi, Cairo"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FIRE_STATIONS.map((station) => (
            <Card key={station.id} className="bg-card">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <AppIcon icon={station.icon} size={20} />
                  </div>
                  <Badge variant="secondary" className="tabular-price">
                    {station.metric}
                  </Badge>
                </div>
                <CardTitle>
                  {isAr ? station.titleAr : station.titleEn}
                </CardTitle>
                <CardDescription>
                  {isAr ? station.detailAr : station.detailEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/menu"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  <span>{isAr ? "تصفح الأطباق" : "Browse dishes"}</span>
                  <AppIcon
                    icon={ArrowRight02Icon}
                    data-icon="inline-end"
                    mirrorInRtl
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Tactile Order & Sheet Grammar Showcase */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Card className="bg-surface-tint">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              {isAr
                ? "تحكم سريع في كل طبق وحساب الترابيزة"
                : "Instant dish customization and table bag"}
            </CardTitle>
            <CardDescription>
              {isAr
                ? "اضبط الكمية والإضافات من الشيت السفلي أو راجع طلب الترابيزة من الجانب."
                : "Adjust portions, customize modifiers in the bottom sheet, and inspect the shared table bag."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <ButtonGroup>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={
                      isAr ? "تقليل الكمية" : "Decrease quantity"
                    }
                    onClick={() => setDishQty((q) => Math.max(1, q - 1))}
                  >
                    <AppIcon icon={MinusSignIcon} />
                  </Button>
                  <div className="flex min-w-12 items-center justify-center border-y border-border bg-background px-3 text-sm font-semibold tabular-price">
                    {dishQty}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                    onClick={() => setDishQty((q) => Math.min(12, q + 1))}
                  >
                    <AppIcon icon={Add01Icon} />
                  </Button>
                </ButtonGroup>

                <div className="flex items-baseline gap-1.5 text-lg font-semibold">
                  <bdi dir="ltr" className="tabular-price">
                    <RollingNumber value={drawerTotalEgp} locales="en-EG" />
                  </bdi>
                  <span className="text-sm font-medium text-muted-foreground">
                    {isAr ? "ج.م" : "EGP"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Apple Bottom Sheet (shadcn Drawer) */}
                <Drawer
                  open={drawerOpen}
                  onOpenChange={setDrawerOpen}
                  showSwipeHandle
                >
                  <DrawerTrigger render={<Button type="button" />}>
                    <span>{isAr ? "تخصيص الطبق" : "Customize Dish"}</span>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        {isAr ? "سماش برجر مدخن" : "Smoked Cast-Iron Smash"}
                      </DrawerTitle>
                      <DrawerDescription>
                        {isAr
                          ? "اختار درجة التسوية والإضافات وأرسل الملاحظة للمطبخ."
                          : "Choose sear level, extras, and send a note straight to the grill."}
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                      <FieldGroup>
                        <FieldSet>
                          <FieldLegend variant="label">
                            {isAr ? "درجة التسوية" : "Sear Level"}
                          </FieldLegend>
                          <RadioGroup
                            value={searChoice}
                            onValueChange={(value) => setSearChoice(value)}
                          >
                            <Field orientation="horizontal">
                              <RadioGroupItem value="medium" id="sear-medium" />
                              <FieldLabel htmlFor="sear-medium">
                                {isAr ? "ميديوم عصاري" : "Juicy Medium"}
                              </FieldLabel>
                            </Field>
                            <Field orientation="horizontal">
                              <RadioGroupItem value="well" id="sear-well" />
                              <FieldLabel htmlFor="sear-well">
                                {isAr ? "مستوي كامل" : "Well Seared"}
                              </FieldLabel>
                            </Field>
                          </RadioGroup>
                        </FieldSet>

                        <FieldSet>
                          <FieldLegend variant="label">
                            {isAr ? "إضافات" : "Extras"}
                          </FieldLegend>
                          <Field orientation="horizontal">
                            <Checkbox
                              id="extra-cheese"
                              checked={extraCheese}
                              onCheckedChange={(checked) =>
                                setExtraCheese(Boolean(checked))
                              }
                            />
                            <FieldLabel htmlFor="extra-cheese">
                              {isAr
                                ? "شيدر مدخن (+45 ج.م)"
                                : "Aged Smoked Cheddar (+45 EGP)"}
                            </FieldLabel>
                          </Field>
                          <Field orientation="horizontal">
                            <Checkbox
                              id="extra-jalapeno"
                              checked={extraJalapeno}
                              onCheckedChange={(checked) =>
                                setExtraJalapeno(Boolean(checked))
                              }
                            />
                            <FieldLabel htmlFor="extra-jalapeno">
                              {isAr
                                ? "هالبينو مشوي (+25 ج.م)"
                                : "Charred Jalapeno (+25 EGP)"}
                            </FieldLabel>
                          </Field>
                        </FieldSet>

                        <Field>
                          <FieldLabel htmlFor="drawer-kitchen-note">
                            {isAr ? "ملاحظة للمطبخ" : "Kitchen Note"}
                          </FieldLabel>
                          <Textarea
                            id="drawer-kitchen-note"
                            value={kitchenNote}
                            onChange={(event) =>
                              setKitchenNote(event.target.value)
                            }
                            placeholder={
                              isAr
                                ? "بدون مخلل أو صوص جانبي"
                                : "Sauce on the side, no pickles"
                            }
                          />
                          <FieldDescription>
                            {isAr
                              ? "تظهر مباشرة على شاشة الشيف."
                              : "Printed directly on the pass ticket."}
                          </FieldDescription>
                        </Field>
                      </FieldGroup>
                    </div>

                    <DrawerFooter>
                      <div className="flex items-center justify-between gap-3">
                        <ButtonGroup>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label="Decrease portion"
                            onClick={() =>
                              setDishQty((q) => Math.max(1, q - 1))
                            }
                          >
                            <AppIcon icon={MinusSignIcon} />
                          </Button>
                          <div className="flex min-w-10 items-center justify-center border-y border-border px-2 text-sm font-medium tabular-price">
                            {dishQty}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label="Increase portion"
                            onClick={() =>
                              setDishQty((q) => Math.min(12, q + 1))
                            }
                          >
                            <AppIcon icon={Add01Icon} />
                          </Button>
                        </ButtonGroup>

                        <Button
                          type="button"
                          className="flex-1"
                          onClick={handleConfirmDish}
                        >
                          <span>
                            {isAr ? "أضف للترابيزة" : "Add to Bag"}
                          </span>
                          <span>·</span>
                          <bdi dir="ltr" className="tabular-price">
                            <RollingNumber
                              value={drawerTotalEgp}
                              locales="en-EG"
                            />{" "}
                            {isAr ? "ج.م" : "EGP"}
                          </bdi>
                        </Button>
                      </div>
                      <DrawerClose
                        render={<Button type="button" variant="ghost" />}
                      >
                        {isAr ? "إلغاء" : "Close"}
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                {/* Trailing Side Sheet (shadcn Sheet) */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger
                    render={<Button type="button" variant="outline" />}
                  >
                    <AppIcon
                      icon={ShoppingBag01Icon}
                      data-icon="inline-start"
                    />
                    <span>
                      {isAr ? "حقيبة الترابيزة" : "View Table Bag"}
                    </span>
                    <Badge variant="secondary" className="tabular-price">
                      {bagItemsCount}
                    </Badge>
                  </SheetTrigger>
                  <SheetContent side={dir === "rtl" ? "left" : "right"}>
                    <SheetHeader>
                      <SheetTitle>
                        {isAr ? "طلبات الترابيزة" : "Table Bag"}
                      </SheetTitle>
                      <SheetDescription>
                        {isAr
                          ? "شارك الطلب مع أصحابك على نفس الترابيزة."
                          : "Shared items synced for everyone at your table."}
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto overscroll-contain px-6">
                      {bagItemsCount === 0 ? (
                        <Empty className="border border-dashed border-border">
                          <EmptyHeader>
                            <EmptyMedia variant="icon">
                              <AppIcon icon={ShoppingBag01Icon} />
                            </EmptyMedia>
                            <EmptyTitle>
                              {isAr
                                ? "سلة الترابيزة فاضية"
                                : "Your table bag is empty"}
                            </EmptyTitle>
                            <EmptyDescription>
                              {isAr
                                ? "أضف أي طبق من المنيو لبدء طلب الترابيزة."
                                : "Add a dish from the menu to start your table order."}
                            </EmptyDescription>
                          </EmptyHeader>
                          <EmptyContent>
                            <Button
                              type="button"
                              onClick={() => setBagItemsCount(1)}
                            >
                              {isAr ? "أضف طبق مقترح" : "Add Signature Dish"}
                            </Button>
                          </EmptyContent>
                        </Empty>
                      ) : (
                        <ItemGroup>
                          <Item variant="outline" size="sm">
                            <ItemMedia variant="icon">
                              <AppIcon icon={FireIcon} />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>
                                {isAr
                                  ? "سماش برجر مدخن"
                                  : "Smoked Cast-Iron Smash"}
                              </ItemTitle>
                              <ItemDescription>
                                {isAr
                                  ? "ميديوم · شيدر مدخن"
                                  : "Juicy Medium · Smoked Cheddar"}
                              </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                              <Badge
                                variant="secondary"
                                className="tabular-price"
                              >
                                {bagItemsCount}×
                              </Badge>
                            </ItemActions>
                          </Item>
                          <ItemSeparator />
                          <div className="flex items-center justify-between pt-2 text-sm">
                            <span className="text-muted-foreground">
                              {isAr ? "الإجمالي" : "Subtotal"}
                            </span>
                            <bdi
                              dir="ltr"
                              className="font-semibold tabular-price"
                            >
                              <RollingNumber
                                value={bagSubtotalEgp}
                                locales="en-EG"
                              />{" "}
                              {isAr ? "ج.م" : "EGP"}
                            </bdi>
                          </div>
                        </ItemGroup>
                      )}
                    </div>

                    <SheetFooter>
                      {bagItemsCount > 0 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBagItemsCount(0)}
                        >
                          {isAr ? "إفراغ السلة" : "Clear Bag"}
                        </Button>
                      ) : null}
                      <SheetClose
                        render={
                          <Link
                            to="/table"
                            className={buttonVariants({ variant: "default" })}
                          />
                        }
                        nativeButton={false}
                      >
                        <span>
                          {isAr ? "تقسيم ودفع الحساب" : "Split & Checkout"}
                        </span>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Single Earned Dark Contrast Kitchen Pass Band */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div
          data-surface="dark-pass"
          className="rounded-4xl border border-border bg-background px-6 py-10 text-foreground shadow-dock sm:px-10 sm:py-12"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FlameLinkMark variant="badge" className="size-9 rounded-xl" />
                <span className="text-sm font-semibold tracking-tight">
                  FlameLink Kitchen Pass
                </span>
              </div>
              <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                {isAr
                  ? "أوردرات المطبخ وتحديث الأصناف النافدة في أقل من ثانية."
                  : "Glare-free pass tickets and instant item availability."}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                {isAr
                  ? "كل طلب من الترابيزة يظهر على شاشة المطبخ فور التأكيد مع تحكم مباشر في الأصناف."
                  : "Table orders land directly on the pass with elapsed SLA timers and one-tap stock locks synced to every menu."}
              </p>
            </div>

            <Link
              to="/kds"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <span>
                {isAr ? "افتح شاشة المطبخ" : "Open Kitchen Pass"}
              </span>
              <AppIcon
                icon={ArrowUpRight01Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Link>
          </div>
        </div>
      </section>

      <Separator />

      {/* 5. Closing Footer Shell + Daylight-Only Switch & Anchored Popover */}
      <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <FlameLinkMark variant="mark" className="h-6 w-auto" />
              <span className="text-sm font-medium text-muted-foreground">
                {isAr ? "مشغل بواسطة FlameLink" : "Powered by FlameLink"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "شارع 9، المعادي، القاهرة · يوميا 12 ظهرا حتى 1 صباحا"
                : "Road 9, Maadi, Cairo · Daily 12:00 PM to 1:00 AM"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Popover open={darkPopoverOpen} onOpenChange={setDarkPopoverOpen}>
              <motion.div
                key={shakeCount}
                ref={switchAnchorRef}
                animate={
                  shouldReduceMotion || shakeCount === 0
                    ? undefined
                    : { x: [0, -7, 7, -5, 5, 0] }
                }
                transition={{ duration: 0.36, ease: "easeInOut" }}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-2"
              >
                <Label
                  htmlFor="daylight-only-switch"
                  className="cursor-pointer text-xs font-medium"
                >
                  {isAr ? "جرب الوضع الداكن" : "Try dark mode"}
                </Label>
                <Switch
                  id="daylight-only-switch"
                  size="sm"
                  checked={false}
                  onCheckedChange={handleDarkSwitchReject}
                />
              </motion.div>

              <PopoverContent
                anchor={switchAnchorRef}
                side="top"
                align="end"
                sideOffset={10}
                className="w-72"
              >
                <PopoverHeader>
                  <PopoverTitle>
                    {isAr ? "مطبخ نهاري مفتوح" : "Sunlit kitchen only"}
                  </PopoverTitle>
                  <PopoverDescription>
                    {isAr
                      ? "هذا المنيو مصمم بوضوح النهار. الوضع الداكن مخصص لشاشة المطبخ فقط."
                      : "Open kitchen, sunlit daylight only. Dark mode lives on the Kitchen Pass."}
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                })
              }
            >
              <span>{isAr ? "العودة للأعلى" : "Back to top"}</span>
              <AppIcon icon={ArrowUp01Icon} data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
