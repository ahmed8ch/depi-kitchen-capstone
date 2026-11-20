import { RollingNumber } from "@kitlangton/rolling-number/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import {
  Add01Icon,
  Alert02Icon,
  AppIcon,
  Cancel01Icon,
  FireIcon,
  MinusSignIcon,
} from "@/components/icons";
import { FavoriteDishButton } from "@/components/shared/FavoriteDishButton";
import { ShareDishButton } from "@/components/shared/ShareDishButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { DishStation, MenuDish } from "@/data/menu-catalog";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

interface DishCustomizerDrawerProps {
  readonly dish: MenuDish | null;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

const STATION_LABELS: Record<
  DishStation,
  { readonly en: string; readonly ar: string }
> = {
  "cast-iron": { en: "250°C Cast-Iron", ar: "صاج 250°" },
  "stone-oven": { en: "Stone-Deck Oven", ar: "فرن حجري" },
  "oak-charcoal": { en: "Oak Charcoal", ar: "فحم البلوط" },
  bar: { en: "Craft Bar", ar: "بار المشروبات" },
};

function DishCustomizerBody({
  dish,
  onClose,
}: {
  readonly dish: MenuDish;
  readonly onClose: () => void;
}) {
  const { locale } = useAppAppearance();
  const { addToCart, session } = useKraveStore();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const needsExplicitChoice = dish.requiredOptions.length > 1;
  const [selectedRequiredId, setSelectedRequiredId] = useState<string>(
    needsExplicitChoice ? "" : (dish.requiredOptions[0]?.id ?? ""),
  );
  const [selectedExtraIds, setSelectedExtraIds] = useState<Array<string>>([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [requiredShakeTick, setRequiredShakeTick] = useState(0);
  const [showRequiredError, setShowRequiredError] = useState(false);

  const requiredSectionRef = useRef<HTMLDivElement | null>(null);

  const selectedRequired = dish.requiredOptions.find(
    (option) => option.id === selectedRequiredId,
  );
  const isReadyToAdd =
    dish.requiredOptions.length === 0 || Boolean(selectedRequired);

  const selectedExtras = dish.extras.filter((extra) =>
    selectedExtraIds.includes(extra.id),
  );

  const extrasUnitPiasters = selectedExtras.reduce(
    (sum, extra) => sum + extra.deltaPiasters,
    0,
  );
  const unitPiasters =
    dish.pricePiasters +
    (selectedRequired?.deltaPiasters ?? 0) +
    extrasUnitPiasters;
  const totalPiasters = unitPiasters * quantity;

  const toggleExtra = (extraId: string, checked: boolean) => {
    setSelectedExtraIds((prev) => {
      if (checked) {
        return prev.includes(extraId) ? prev : [...prev, extraId];
      }
      return prev.filter((id) => id !== extraId);
    });
  };

  const handleAdd = () => {
    if (!isReadyToAdd || !selectedRequired) {
      setShowRequiredError(true);
      setRequiredShakeTick((tick) => tick + 1);
      requiredSectionRef.current?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "center",
      });
      return;
    }

    addToCart({
      dishId: dish.id,
      requiredOption: selectedRequired,
      extras: selectedExtras,
      note,
      quantity,
      ownerName: session.guestName || undefined,
    });
    toast.add({
      type: "success",
      title: isAr
        ? `تمت إضافة ${quantity}× ${dish.nameAr}`
        : `Added ${quantity}× ${dish.nameEn}`,
      description: formatEgp(totalPiasters, locale),
    });
    onClose();
  };

  const stationMeta = STATION_LABELS[dish.station];
  const allergens = (isAr ? dish.allergensAr : dish.allergensEn).filter(
    (a) => a !== "None" && a !== "لا يوجد",
  );

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Big Circular Close Button OUTSIDE the Sheet (Signals Click-Outside Closes) */}
      <DrawerClose
        render={
          <button
            type="button"
            aria-label={isAr ? "إغلاق" : "Close"}
            className="absolute -top-14 end-0 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-xl backdrop-blur-md transition-transform duration-150 hover:scale-105 active:scale-95 md:-end-14 md:top-1"
          />
        }
      >
        <AppIcon icon={Cancel01Icon} size={20} />
      </DrawerClose>

      {/* Main Clipped Rounded Card — Responsive Two-Column Desktop / Floating Sheet Mobile */}
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-[32px] md:grid-cols-[0.95fr_1.15fr]">
        {/* Left Showcase Column (Photo + Heart/Share + Inline Allergens & Live Breakdown) */}
        <div className="flex flex-col justify-between bg-surface-tint md:border-e md:border-border">
          <div className="relative shrink-0 overflow-hidden">
            <img
              src={dish.image}
              alt={isAr ? dish.nameAr : dish.nameEn}
              className="aspect-[16/10] max-h-44 w-full object-cover md:aspect-[4/3] md:max-h-60"
            />
            <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
              <FavoriteDishButton
                dishId={dish.id}
                dishNameEn={dish.nameEn}
                dishNameAr={dish.nameAr}
              />
              <ShareDishButton
                dishSlug={dish.slug}
                dishNameEn={dish.nameEn}
                dishNameAr={dish.nameAr}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4 p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <DrawerTitle className="text-start text-xl font-extrabold tracking-tight text-foreground">
                  {isAr ? dish.nameAr : dish.nameEn}
                </DrawerTitle>
                <bdi
                  dir="ltr"
                  className="shrink-0 text-base font-extrabold text-primary tabular-price md:hidden"
                >
                  {formatEgp(dish.pricePiasters, locale)}
                </bdi>
              </div>
              <DrawerDescription className="text-start text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {isAr ? dish.descAr : dish.descEn}
              </DrawerDescription>

              {/* Inline Scannable Station, Nutrition & Allergen Badges (Zero Separate Tab Needed!) */}
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary-ink"
                >
                  <AppIcon icon={FireIcon} size={12} />
                  <span>{isAr ? stationMeta.ar : stationMeta.en}</span>
                </Badge>
                <Badge variant="outline" className="bg-card text-foreground">
                  {isAr ? dish.specAr : dish.specEn}
                </Badge>
                {allergens.length > 0 ? (
                  <Badge
                    variant="outline"
                    className="border-amber-500/35 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                  >
                    {isAr ? "يحتوي: " : "Contains: "}
                    {allergens.join(", ")}
                  </Badge>
                ) : null}
              </div>
            </div>

            {/* Desktop Live Price Breakdown */}
            <div className="hidden flex-col gap-1.5 border-t border-border pt-4 text-xs md:flex">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{isAr ? "السعر الأساسي" : "Base dish"}</span>
                <bdi dir="ltr" className="font-mono font-medium tabular-price">
                  {formatEgp(dish.pricePiasters, locale)}
                </bdi>
              </div>
              {selectedRequired && selectedRequired.deltaPiasters > 0 ? (
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    {isAr
                      ? selectedRequired.labelAr
                      : selectedRequired.labelEn}
                  </span>
                  <bdi dir="ltr" className="font-mono font-medium tabular-price">
                    +{formatEgp(selectedRequired.deltaPiasters, locale)}
                  </bdi>
                </div>
              ) : null}
              {extrasUnitPiasters > 0 ? (
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    {isAr
                      ? `إضافات (${selectedExtras.length})`
                      : `Extras (${selectedExtras.length})`}
                  </span>
                  <bdi dir="ltr" className="font-mono font-medium tabular-price">
                    +{formatEgp(extrasUnitPiasters, locale)}
                  </bdi>
                </div>
              ) : null}
              <div className="mt-1 flex items-center justify-between border-t border-dashed border-border pt-2 text-sm font-bold text-foreground">
                <span>
                  {isAr ? `الإجمالي (${quantity}×)` : `Total (${quantity}×)`}
                </span>
                <bdi dir="ltr" className="font-mono tabular-price">
                  {formatEgp(totalPiasters, locale)}
                </bdi>
              </div>
            </div>
          </div>
        </div>

        {/* Right Configurator Column (Scrollable Options + Sticky Short CTA) */}
        <div className="flex min-h-0 flex-col bg-card">
          <div className="max-h-[38dvh] min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 md:max-h-[58dvh]">
            <div className="flex flex-col gap-5">
              {/* Required Options Group w/ Validation Highlight & Auto-Scroll */}
              {dish.requiredOptions.length > 0 ? (
                <motion.div
                  ref={requiredSectionRef}
                  key={requiredShakeTick}
                  animate={
                    shouldReduceMotion || requiredShakeTick === 0
                      ? undefined
                      : { x: [0, -6, 6, -4, 4, 0] }
                  }
                  transition={{ duration: 0.32 }}
                  className={cn(
                    "flex flex-col gap-2.5 rounded-2xl transition-colors",
                    showRequiredError &&
                      !isReadyToAdd &&
                      "bg-destructive/5 p-3 ring-2 ring-destructive/55",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      id={`req-label-${dish.id}`}
                      className="text-xs font-bold tracking-tight text-foreground"
                    >
                      {isAr ? dish.requiredLabelAr : dish.requiredLabelEn}
                    </span>
                    <Badge
                      variant={
                        showRequiredError && !isReadyToAdd
                          ? "destructive"
                          : isReadyToAdd
                            ? "secondary"
                            : "outline"
                      }
                      className={cn(
                        "text-[11px]",
                        !isReadyToAdd &&
                          !showRequiredError &&
                          "border-primary/40 bg-primary/10 text-primary-ink",
                      )}
                    >
                      {isReadyToAdd
                        ? isAr
                          ? "تم الاختيار"
                          : "Selected"
                        : isAr
                          ? "إجباري · اختر 1"
                          : "Required · Pick 1"}
                    </Badge>
                  </div>

                  {showRequiredError && !isReadyToAdd ? (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                      <AppIcon icon={Alert02Icon} size={14} />
                      <span>
                        {isAr
                          ? "اختار واحد من الاختيارات دي عشان تكمل"
                          : "Pick one option below before adding"}
                      </span>
                    </p>
                  ) : null}

                  <RadioGroup
                    aria-labelledby={`req-label-${dish.id}`}
                    value={selectedRequiredId}
                    onValueChange={(value) => {
                      if (typeof value === "string") {
                        setSelectedRequiredId(value);
                        setShowRequiredError(false);
                      }
                    }}
                    className="gap-2"
                  >
                    {dish.requiredOptions.map((option) => {
                      const inputId = `req-${dish.id}-${option.id}`;
                      const checked = selectedRequiredId === option.id;
                      return (
                        <label
                          key={option.id}
                          htmlFor={inputId}
                          className={cn(
                            "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-sm transition-colors",
                            checked
                              ? "border-primary bg-primary/6"
                              : "border-border bg-background hover:bg-surface-tint",
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <RadioGroupItem id={inputId} value={option.id} />
                            <span className="font-medium text-foreground">
                              {isAr ? option.labelAr : option.labelEn}
                            </span>
                          </span>
                          {option.deltaPiasters > 0 ? (
                            <bdi
                              dir="ltr"
                              className="text-xs font-semibold text-muted-foreground tabular-price"
                            >
                              +{formatEgp(option.deltaPiasters, locale)}
                            </bdi>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">
                              {isAr ? "شامل" : "Included"}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </RadioGroup>
                </motion.div>
              ) : null}

              {/* Optional Extras */}
              {dish.extras.length > 0 ? (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-tight text-foreground">
                      {isAr ? "إضافات اختيارية" : "Extra Toppings"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {isAr ? "اختياري" : "Optional"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {dish.extras.map((extra) => {
                      const inputId = `ext-${dish.id}-${extra.id}`;
                      const checked = selectedExtraIds.includes(extra.id);
                      return (
                        <label
                          key={extra.id}
                          htmlFor={inputId}
                          className={cn(
                            "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-sm transition-colors",
                            checked
                              ? "border-foreground bg-surface-tint"
                              : "border-border bg-background hover:bg-surface-tint/70",
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <Checkbox
                              id={inputId}
                              checked={checked}
                              onCheckedChange={(next) =>
                                toggleExtra(extra.id, next === true)
                              }
                            />
                            <span className="font-medium text-foreground">
                              {isAr ? extra.labelAr : extra.labelEn}
                            </span>
                          </span>
                          <bdi
                            dir="ltr"
                            className="text-xs font-semibold text-muted-foreground tabular-price"
                          >
                            +{formatEgp(extra.deltaPiasters, locale)}
                          </bdi>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Kitchen Note */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`note-${dish.id}`}
                  className="text-xs font-bold tracking-tight text-foreground"
                >
                  {isAr ? "ملاحظة للمطبخ" : "Kitchen Note"}
                </label>
                <Textarea
                  id={`note-${dish.id}`}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={
                    isAr
                      ? "مثال: بدون بصل أو الصوص على جنب..."
                      : "e.g. Sauce on the side, extra crisp..."
                  }
                  className="min-h-14 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer: Quantity Stepper + Short Clean "Add · XXX EGP" CTA */}
          <DrawerFooter className="border-t border-border bg-card px-5 py-4">
            <div className="flex items-center gap-2.5">
              <ButtonGroup aria-label={isAr ? "الكمية" : "Quantity"}>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
                  className="h-11 w-10"
                >
                  <AppIcon icon={MinusSignIcon} size={15} />
                </Button>
                <div
                  aria-live="polite"
                  className="flex h-11 min-w-10 items-center justify-center border-y border-border bg-background px-2 text-sm font-bold tabular-price"
                >
                  {quantity}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={quantity >= 15}
                  onClick={() => setQuantity((q) => Math.min(15, q + 1))}
                  aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                  className="h-11 w-10"
                >
                  <AppIcon icon={Add01Icon} size={15} />
                </Button>
              </ButtonGroup>

              <Button
                type="button"
                size="lg"
                aria-disabled={!isReadyToAdd}
                onClick={handleAdd}
                className={cn(
                  "h-11 flex-1 justify-between px-5 text-sm font-bold transition-opacity",
                  !isReadyToAdd && "opacity-55 hover:bg-primary",
                )}
              >
                <span>
                  {!isReadyToAdd
                    ? isAr
                      ? "اختر الإجباري أولا"
                      : "Choose option"
                    : isAr
                      ? "أضف"
                      : "Add"}
                </span>
                <bdi dir="ltr" className="tabular-price">
                  <RollingNumber value={totalPiasters / 100} locales="en-EG" />{" "}
                  {isAr ? "ج.م" : "EGP"}
                </bdi>
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </div>
    </div>
  );
}

export function DishCustomizerDrawer({
  dish,
  open,
  onOpenChange,
}: DishCustomizerDrawerProps) {
  return (
    <Drawer
      open={open && dish !== null}
      onOpenChange={onOpenChange}
      showSwipeHandle={false}
      swipeDirection="down"
    >
      <DrawerContent className="md:data-[swipe-axis=y]:max-w-[760px]">
        {dish ? (
          <DishCustomizerBody
            key={dish.id}
            dish={dish}
            onClose={() => onOpenChange(false)}
          />
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
