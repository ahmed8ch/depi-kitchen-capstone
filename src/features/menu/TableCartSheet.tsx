import { RollingNumber } from "@kitlangton/rolling-number/react";
import { Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import {
  computeCartItemLinePiasters,
  useKraveStore,
} from "@/app/store-context";
import {
  Add01Icon,
  AppIcon,
  ArrowRight02Icon,
  Delete02Icon,
  GiftIcon,
  MinusSignIcon,
  UserGroupIcon,
} from "@/components/icons";
import { AvatarDot } from "@/components/shared/AvatarDot";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MENU_DISHES } from "@/data/menu-catalog";
import { formatEgp, splitEquallyPiasters } from "@/domain/money";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

interface TableCartSheetProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

const FREE_PERK_THRESHOLD_PIASTERS = 65_000; // 650 EGP -> Complimentary Sparkling Karkadeh Mint for table

const PAIRING_IDS: ReadonlyArray<string> = [
  "house-dips-trio",
  "classic-skin-on-fries",
  "hot-crispy-pie",
  "v7-lemon-mint",
];

export function TableCartSheet({ open, onOpenChange }: TableCartSheetProps) {
  const { locale, dir } = useAppAppearance();
  const {
    session,
    cart,
    cartItemCount,
    cartTotalPiasters,
    soldOutIds,
    addQuickDish,
    updateCartQty,
    removeCartLine,
    clearCart,
  } = useKraveStore();
  const isAr = locale === "ar";
  const dinerCount = Math.max(1, session.diners.length || 1);
  const equalShare =
    splitEquallyPiasters(cartTotalPiasters, dinerCount)[0] ?? 0;

  const remainingForPerk = Math.max(
    0,
    FREE_PERK_THRESHOLD_PIASTERS - cartTotalPiasters,
  );
  const perkProgress = Math.min(
    100,
    Math.round((cartTotalPiasters / FREE_PERK_THRESHOLD_PIASTERS) * 100),
  );

  const pairings = MENU_DISHES.filter(
    (d) => PAIRING_IDS.includes(d.id) && !soldOutIds.includes(d.id),
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={dir === "rtl" ? "left" : "right"}
        className="w-full sm:max-w-md"
      >
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-2.5 pe-8">
            <SheetTitle className="text-lg font-extrabold tracking-tight">
              {session.isJoined
                ? isAr
                  ? `سلة ترابيزة ${session.tableNumber}`
                  : `Table ${session.tableNumber} Bag`
                : isAr
                  ? "سلة الطلبات"
                  : "Your Order Bag"}
            </SheetTitle>
            <Badge variant="secondary" className="tabular-price">
              {cartItemCount}
            </Badge>
          </div>
          <SheetDescription className="flex items-center gap-1.5 text-xs">
            <AppIcon icon={UserGroupIcon} size={14} />
            <span>
              {session.isJoined && session.diners.length > 0
                ? isAr
                  ? `مشتركة بين: ${session.diners.map((d) => d.name).join("، ")}`
                  : `Shared by ${session.diners.map((d) => d.name).join(", ")}`
                : isAr
                  ? "اختار ترابيزة في الخطوة الجاية عشان تشارك وتقسم الفاتورة"
                  : "Pick a table next to share and split your bill"}
            </span>
          </SheetDescription>
        </SheetHeader>

        {/* Complimentary Table Perk Progress Bar (ShoppingCartDrawerDemo Inspired) */}
        {cart.length > 0 ? (
          <div className="border-b border-border bg-surface-tint px-5 py-3.5">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <AppIcon
                icon={GiftIcon}
                size={15}
                className={
                  remainingForPerk === 0
                    ? "text-status-ready"
                    : "text-primary-ink"
                }
              />
              <span>
                {remainingForPerk > 0
                  ? isAr
                    ? `اضف ${formatEgp(remainingForPerk, "ar")} لتحصل على كركديه فوار هدية للترابيزة!`
                    : `Add ${formatEgp(remainingForPerk, "en")} more for complimentary table Karkadeh Mint!`
                  : isAr
                    ? "مبروك! كركديه فوار بالنعناع هدية للترابيزة!"
                    : "Unlocked! Complimentary Sparkling Karkadeh Mint included!"}
              </span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  remainingForPerk === 0 ? "bg-status-ready" : "bg-primary",
                )}
                style={{ width: `${perkProgress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {cart.length === 0 ? (
            <Empty className="min-h-[300px] border border-dashed border-border bg-surface-tint/60 p-8">
              <EmptyHeader>
                <EmptyMedia>
                  <EmptySpotIcon variant="bag" />
                </EmptyMedia>
                <EmptyTitle>
                  {isAr ? "السلة فاضية دلوقتي" : "Your bag is empty"}
                </EmptyTitle>
                <EmptyDescription>
                  {isAr
                    ? "اختار أول طبق من المنيو أو جرب الإضافات السريعة."
                    : "Tap any dish on the menu to customize it and start your order."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  {isAr ? "تصفح المنيو" : "Browse Menu"}
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Itemized Cart Lines */}
              <div className="flex flex-col gap-3">
                {cart.map((item) => {
                  const lineTotal = computeCartItemLinePiasters(item);
                  const modifiersText = [
                    isAr
                      ? item.requiredOption.labelAr
                      : item.requiredOption.labelEn,
                    ...item.extras.map((extra) =>
                      isAr ? extra.labelAr : extra.labelEn,
                    ),
                  ].join(" · ");

                  return (
                    <div
                      key={item.lineId}
                      className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      <img
                        src={item.image}
                        alt={isAr ? item.nameAr : item.nameEn}
                        className="size-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="truncate text-sm font-bold text-foreground">
                            {isAr ? item.nameAr : item.nameEn}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-tint px-2 py-0.5 text-[10px] font-semibold text-foreground ring-1 ring-border">
                            <AvatarDot
                              avatarId={item.ownerAvatarId}
                              name={item.ownerName}
                              size="xs"
                              className="size-3.5"
                            />
                            <span>{item.ownerName}</span>
                          </span>
                        </div>

                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {modifiersText}
                        </p>

                        {item.note ? (
                          <p className="text-[11px] text-primary-ink italic">
                            &ldquo;{item.note}&rdquo;
                          </p>
                        ) : null}

                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-xs"
                              aria-label={isAr ? "تقليل" : "Decrease"}
                              onClick={() => updateCartQty(item.lineId, -1)}
                            >
                              <AppIcon icon={MinusSignIcon} size={12} />
                            </Button>
                            <span className="min-w-6 text-center text-xs font-bold tabular-price">
                              {item.quantity}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-xs"
                              aria-label={isAr ? "زيادة" : "Increase"}
                              onClick={() => updateCartQty(item.lineId, 1)}
                            >
                              <AppIcon icon={Add01Icon} size={12} />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              aria-label={isAr ? "حذف الطبق" : "Remove dish"}
                              onClick={() => removeCartLine(item.lineId)}
                              className="ms-1 text-muted-foreground hover:text-destructive"
                            >
                              <AppIcon icon={Delete02Icon} size={13} />
                            </Button>
                          </div>

                          <bdi
                            dir="ltr"
                            className="text-sm font-extrabold text-foreground tabular-price"
                          >
                            {formatEgp(lineTotal, locale)}
                          </bdi>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Horizontal "Pairs Well With" Quick Add-On Carousel */}
              {pairings.length > 0 ? (
                <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                  <span className="text-xs font-bold tracking-tight text-foreground">
                    {isAr ? "يكمل أكلتك" : "Pairs Well With"}
                  </span>
                  <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2">
                    {pairings.map((pairing) => (
                      <div
                        key={pairing.id}
                        className="flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card"
                      >
                        <div className="relative aspect-[4/3] w-full bg-surface-tint">
                          <img
                            src={pairing.image}
                            alt={isAr ? pairing.nameAr : pairing.nameEn}
                            className="size-full object-cover"
                          />
                          <button
                            type="button"
                            aria-label={
                              isAr
                                ? `إضافة سريعة ${pairing.nameAr}`
                                : `Quick add ${pairing.nameEn}`
                            }
                            onClick={() => {
                              addQuickDish(pairing.id);
                              toast.add({
                                type: "success",
                                title: isAr
                                  ? `أضفنا ${pairing.nameAr}`
                                  : `Added ${pairing.nameEn}`,
                                description: formatEgp(
                                  pairing.pricePiasters,
                                  locale,
                                ),
                              });
                            }}
                            className="absolute end-2 top-2 flex size-7 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-transform hover:scale-105 active:scale-95"
                          >
                            <AppIcon icon={Add01Icon} size={14} />
                          </button>
                        </div>
                        <div className="flex flex-col gap-0.5 p-2.5">
                          <span className="truncate text-xs font-semibold text-foreground">
                            {isAr ? pairing.nameAr : pairing.nameEn}
                          </span>
                          <bdi
                            dir="ltr"
                            className="text-xs font-bold text-primary-ink tabular-price"
                          >
                            {formatEgp(pairing.pricePiasters, locale)}
                          </bdi>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {cart.length > 0 ? (
          <SheetFooter className="border-t border-border bg-surface-tint/80 p-5">
            <div className="flex flex-col gap-1.5 pb-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {isAr ? "الإجمالي" : "Subtotal"}
                </span>
                <div className="flex items-baseline gap-1 text-xl font-extrabold text-foreground">
                  <bdi dir="ltr" className="tabular-price">
                    <RollingNumber
                      value={cartTotalPiasters / 100}
                      locales="en-EG"
                    />
                  </bdi>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {isAr ? "ج.م" : "EGP"}
                  </span>
                </div>
              </div>
              {session.isJoined && dinerCount > 1 ? (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {isAr
                      ? `بالتساوي على ${dinerCount} أفراد`
                      : `Equal split (${dinerCount} diners)`}
                  </span>
                  <bdi
                    dir="ltr"
                    className="font-semibold text-foreground tabular-price"
                  >
                    {formatEgp(equalShare, locale)} /{" "}
                    {isAr ? "فرد" : "person"}
                  </bdi>
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={clearCart}
                className="shrink-0"
              >
                {isAr ? "مسح" : "Clear"}
              </Button>
              <Link
                to="/table"
                onClick={() => onOpenChange(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "flex-1 justify-center font-bold",
                )}
              >
                <span>
                  {session.isJoined
                    ? isAr
                      ? "مراجعة وإرسال للمطبخ"
                      : "Review & Send"
                    : isAr
                      ? "اختر الترابيزة وأرسل"
                      : "Pick Table & Send"}
                </span>
                <AppIcon
                  icon={ArrowRight02Icon}
                  data-icon="inline-end"
                  mirrorInRtl
                />
              </Link>
            </div>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
