import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import {
  useKraveStore,
  type KdsOrderStatus,
  type KitchenOrder,
} from "@/app/store-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import {
  Alert02Icon,
  AppIcon,
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  FireIcon,
  Globe02Icon,
  Search01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@/components/icons";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { MENU_DISHES, type DishStation } from "@/data/menu-catalog";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

const STATION_META: Record<
  DishStation | "all",
  { readonly en: string; readonly ar: string; readonly dot: string }
> = {
  all: { en: "All Stations", ar: "كل المحطات", dot: "bg-white" },
  "cast-iron": { en: "Cast-Iron", ar: "الصاج", dot: "bg-orange-500" },
  "stone-oven": { en: "Stone Oven", ar: "الفرن الحجري", dot: "bg-amber-400" },
  "oak-charcoal": { en: "Oak Charcoal", ar: "الفحم", dot: "bg-emerald-500" },
  bar: { en: "Craft Bar", ar: "البار", dot: "bg-sky-400" },
};

const OVERDUE_MS = 12 * 60_000;

function playPassChime() {
  try {
    const AudioCtx = window.AudioContext;
    if (!AudioCtx) {
      return;
    }
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
  } catch {
    // Audio playback blocked before interaction.
  }
}

function formatElapsed(createdAtMs: number, nowMs: number): string {
  const diffSec = Math.max(0, Math.floor((nowMs - createdAtMs) / 1000));
  const mins = Math.floor(diffSec / 60);
  const secs = diffSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getNextAction(
  status: KdsOrderStatus,
  isAr: boolean,
): { readonly next: KdsOrderStatus; readonly label: string; readonly btnCls: string } | null {
  if (status === "new") {
    return {
      next: "firing",
      label: isAr ? "ابدأ التحضير على النار" : "Start Firing",
      btnCls: "bg-[#18181B] text-white hover:bg-[#27272A]",
    };
  }
  if (status === "firing") {
    return {
      next: "ready",
      label: isAr ? "جاهز على الكاونتر" : "Mark Ready",
      btnCls: "bg-emerald-600 text-white hover:bg-emerald-700",
    };
  }
  if (status === "ready") {
    return {
      next: "served",
      label: isAr ? "تم التقديم (Bump)" : "Bump Served",
      btnCls: "bg-[#EB4A1E] text-white hover:bg-[#D13B12]",
    };
  }
  return null;
}

/**
 * Real-World High-Legibility Restaurant KDS (Square / Toast KDS Ergonomics):
 * Anti-glare Obsidian Charcoal Rail (#121216) framing crisp High-Contrast Light Paper
 * Ticket Cards (#FAF9F6 w/ #18181B ink), color-coded full-bleed status headers,
 * 18px bold dish lines, 20px qty pills, amber modifier highlights, and 48px bump buttons.
 */
function KdsPage() {
  const { locale, setLocale } = useAppAppearance();
  const { orders, soldOutIds, toggleSoldOut, advanceOrderStatus } =
    useKraveStore();
  const isAr = locale === "ar";

  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [stationFilter, setStationFilter] = useState<DishStation | "all">("all");
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [stockQuery, setStockQuery] = useState("");
  const [showServed, setShowServed] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const activeOrders = orders.filter((order) => order.status !== "served");
  const servedOrders = orders.filter((order) => order.status === "served");

  const overdueCount = activeOrders.filter(
    (order) =>
      (order.status === "new" || order.status === "firing") &&
      nowMs - order.createdAtMs >= OVERDUE_MS,
  ).length;

  const visibleOrders = (showServed ? orders : activeOrders).filter((order) =>
    stationFilter === "all"
      ? true
      : order.items.some((item) => item.station === stationFilter),
  );

  const normalizedStockQuery = stockQuery.trim().toLowerCase();
  const filteredStockDishes = MENU_DISHES.filter(
    (dish) =>
      normalizedStockQuery.length === 0 ||
      dish.nameEn.toLowerCase().includes(normalizedStockQuery) ||
      dish.nameAr.includes(normalizedStockQuery),
  );

  const handleAdvance = (order: KitchenOrder, nextStatus: KdsOrderStatus) => {
    advanceOrderStatus(order.id, nextStatus);
    if (chimeEnabled) {
      playPassChime();
    }
    toast.add({
      type: "success",
      title: isAr
        ? `تحديث #${order.id} · ترابيزة ${order.tableNumber}`
        : `Ticket #${order.id} · Table ${order.tableNumber}`,
      description:
        nextStatus === "firing"
          ? isAr
            ? "انتقل لخط النار"
            : "Moved to Firing"
          : nextStatus === "ready"
            ? isAr
              ? "جاهز على الكاونتر"
              : "Ready at Pass"
            : isAr
              ? "اتسلم للترابيزة"
              : "Bumped & Served",
    });
  };

  return (
    <div
      data-surface="dark-pass"
      className="min-h-dvh bg-[#121216] text-white"
    >
      {/* High-Contrast Kitchen Command Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#18181D]/95 px-4 py-3.5 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FlameLinkMark variant="badge" className="size-10 rounded-xl" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-extrabold tracking-tight text-white">
                  FlameLink Kitchen Pass
                </span>
                <span className="hidden rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 sm:inline-flex">
                  {isAr ? "كريف المعادي" : "Krave Maadi"}
                </span>
              </div>
              <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs font-semibold tabular-price">
                <span className="text-white/80">
                  {activeOrders.length} {isAr ? "أوردر نشط" : "Active"}
                </span>
                {overdueCount > 0 ? (
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                    {overdueCount} {isAr ? "متأخر +12د" : "Overdue 12m+"}
                  </span>
                ) : null}
                <span className="text-white/60">
                  {soldOutIds.length} {isAr ? "صنف 86" : "Locked 86"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = !chimeEnabled;
                setChimeEnabled(next);
                if (next) {
                  playPassChime();
                }
              }}
              className="border-white/15 bg-white/8 text-white hover:bg-white/15"
            >
              <AppIcon
                icon={chimeEnabled ? VolumeHighIcon : VolumeOffIcon}
                data-icon="inline-start"
              />
              <span>
                {chimeEnabled
                  ? isAr
                    ? "جرس Pass شغال"
                    : "Chime On"
                  : isAr
                    ? "صامت"
                    : "Muted"}
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLocale(isAr ? "en" : "ar")}
              className="border-white/15 bg-white/8 text-white hover:bg-white/15"
            >
              <AppIcon icon={Globe02Icon} data-icon="inline-start" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </Button>

            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "bg-white font-bold text-black hover:bg-white/90",
              )}
            >
              <AppIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                mirrorInRtl
              />
              <span>{isAr ? "الموقع" : "Storefront"}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        <Tabs defaultValue="tickets">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList className="h-11 border border-white/15 bg-[#1C1C22] p-1">
              <TabsTrigger value="tickets" className="px-4 text-sm font-bold">
                <AppIcon icon={FireIcon} size={16} />
                <span>
                  {isAr
                    ? `الأوردرات (${activeOrders.length})`
                    : `Live Tickets (${activeOrders.length})`}
                </span>
              </TabsTrigger>
              <TabsTrigger value="stock" className="px-4 text-sm font-bold">
                <span>
                  {isAr
                    ? `إدارة 86 (${soldOutIds.length}/20)`
                    : `86 Stock (${soldOutIds.length}/20)`}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Color-Coded Station Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                ["all", "cast-iron", "stone-oven", "oak-charcoal", "bar"] as const
              ).map((station) => {
                const selected = stationFilter === station;
                const meta = STATION_META[station];
                return (
                  <button
                    key={station}
                    type="button"
                    onClick={() => setStationFilter(station)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                      selected
                        ? "border-white bg-white text-[#121216]"
                        : "border-white/15 bg-[#1C1C22] text-white/85 hover:bg-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        selected ? "bg-[#EB4A1E]" : meta.dot,
                      )}
                    />
                    <span>{isAr ? meta.ar : meta.en}</span>
                  </button>
                );
              })}

              {servedOrders.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setShowServed((prev) => !prev)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-bold transition-colors",
                    showServed
                      ? "border-emerald-400 bg-emerald-500 text-black"
                      : "border-white/15 bg-transparent text-white/70 hover:text-white",
                  )}
                >
                  {isAr
                    ? `تم تقديمه (${servedOrders.length})`
                    : `Served (${servedOrders.length})`}
                </button>
              ) : null}
            </div>
          </div>

          {/* Tab 1: High-Legibility Light Paper Ticket Cards on Anti-Glare Dark Rail */}
          <TabsContent value="tickets" className="mt-6">
            {visibleOrders.length === 0 ? (
              <Empty className="border border-white/10 bg-[#19191F] py-16">
                <EmptyHeader>
                  <EmptyMedia>
                    <EmptySpotIcon variant="kitchen" />
                  </EmptyMedia>
                  <EmptyTitle className="text-white">
                    {isAr ? "خط النار فاضي حاليا" : "Pass rail is clear"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {isAr
                      ? "كل الأوردرات لهذه المحطة اتسلمت بنجاح."
                      : "All tickets for this fire station have been bumped."}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleOrders.map((order) => {
                  const isOverdue =
                    (order.status === "new" || order.status === "firing") &&
                    nowMs - order.createdAtMs >= OVERDUE_MS;
                  const elapsed = formatElapsed(order.createdAtMs, nowMs);
                  const nextAction = getNextAction(order.status, isAr);

                  const headerMeta = isOverdue
                    ? {
                        label: isAr ? "متأخر +12د" : "OVERDUE 12M+",
                        bg: "bg-red-600 text-white",
                        icon: Alert02Icon,
                      }
                    : order.status === "ready"
                      ? {
                          label: isAr ? "جاهز للتقديم" : "READY AT PASS",
                          bg: "bg-emerald-600 text-white",
                          icon: CheckmarkCircle02Icon,
                        }
                      : order.status === "served"
                        ? {
                            label: isAr ? "تم التقديم" : "SERVED",
                            bg: "bg-zinc-600 text-white",
                            icon: CheckmarkCircle02Icon,
                          }
                        : order.status === "firing"
                          ? {
                              label: isAr ? "على النار الآن" : "ON THE FIRE",
                              bg: "bg-amber-500 text-[#121216]",
                              icon: FireIcon,
                            }
                          : {
                              label: isAr ? "أوردر جديد" : "NEW TICKET",
                              bg: "bg-blue-600 text-white",
                              icon: FireIcon,
                            };

                  return (
                    <article
                      key={order.id}
                      className={cn(
                        "flex flex-col justify-between overflow-hidden rounded-[26px] bg-[#FAF9F6] text-[#18181B] shadow-xl",
                        isOverdue && "ring-4 ring-red-500/80",
                      )}
                    >
                      <div>
                        {/* Full-Bleed Color-Coded Status Header Strip */}
                        <div
                          className={cn(
                            "flex items-center justify-between gap-2 px-5 py-3.5",
                            headerMeta.bg,
                          )}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <h2 className="text-xl font-extrabold tracking-tight tabular-price">
                                {isAr
                                  ? `ترابيزة ${order.tableNumber}`
                                  : `Table ${order.tableNumber}`}
                              </h2>
                              <bdi
                                dir="ltr"
                                className="rounded-md bg-black/18 px-2 py-0.5 font-mono text-xs font-bold tabular-price"
                              >
                                #{order.id}
                              </bdi>
                            </div>
                            <span className="text-xs font-semibold opacity-90">
                              {order.guestName} · {headerMeta.label}
                            </span>
                          </div>

                          <div
                            className={cn(
                              "flex items-center gap-1.5 rounded-xl bg-black/20 px-3 py-1.5 font-mono text-base font-extrabold tabular-price",
                              isOverdue && "animate-pulse bg-black/35",
                            )}
                          >
                            <AppIcon icon={Clock01Icon} size={16} />
                            <bdi dir="ltr">{elapsed}</bdi>
                          </div>
                        </div>

                        {/* High-Legibility 18px Bold Dish Lines */}
                        <div className="flex flex-col divide-y divide-zinc-200 px-5 py-2">
                          {order.items.map((item, index) => (
                            <div
                              key={`${order.id}-line-${index}`}
                              className="flex flex-col gap-2 py-3.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#18181B] font-mono text-base font-extrabold text-white tabular-price">
                                    {item.quantity}
                                  </span>
                                  <span className="text-lg leading-snug font-extrabold text-[#18181B]">
                                    {isAr ? item.nameAr : item.nameEn}
                                  </span>
                                </div>
                                <span className="shrink-0 rounded-full bg-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-800">
                                  {isAr
                                    ? STATION_META[item.station].ar
                                    : STATION_META[item.station].en}
                                </span>
                              </div>

                              {/* High-Contrast Warm Amber Modifier Pill */}
                              <div className="ms-9.5 flex flex-wrap items-center gap-1.5">
                                <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-950">
                                  {isAr
                                    ? item.modifiersSummaryAr
                                    : item.modifiersSummaryEn}
                                </span>
                                <span className="text-xs font-semibold text-zinc-500">
                                  · {item.ownerName}
                                </span>
                              </div>

                              {/* Prominent Crimson Chef / Allergy Note Banner */}
                              {item.note ? (
                                <div className="ms-9.5 flex items-center gap-1.5 rounded-xl border border-red-300 bg-red-100 px-3 py-1.5 text-xs font-extrabold text-red-900">
                                  <AppIcon icon={Alert02Icon} size={14} />
                                  <span>
                                    {isAr ? "ملاحظة: " : "NOTE: "}
                                    {item.note}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Large 48px Tactile Kitchen Bump Footer */}
                      <div className="flex flex-col gap-2.5 border-t border-zinc-200 bg-zinc-100/80 p-4">
                        {nextAction ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleAdvance(order, nextAction.next)
                            }
                            className={cn(
                              "flex h-12 w-full items-center justify-center rounded-2xl text-sm font-extrabold tracking-tight shadow-sm transition-transform active:scale-[0.98]",
                              nextAction.btnCls,
                            )}
                          >
                            {nextAction.label}
                          </button>
                        ) : (
                          <div className="flex h-11 items-center justify-center rounded-2xl bg-zinc-200 text-xs font-bold text-zinc-700">
                            {isAr ? "مكتمل وتم التقديم" : "Completed & Served"}
                          </div>
                        )}

                        <div className="flex items-center justify-between px-1 text-xs font-semibold text-zinc-600">
                          <Link
                            to="/track/$orderId"
                            params={{ orderId: order.id }}
                            className="underline-offset-4 hover:text-black hover:underline"
                          >
                            {isAr ? "صفحة متابعة الضيف" : "Guest tracker view"}
                          </Link>
                          <bdi dir="ltr" className="font-mono font-bold tabular-price">
                            {formatEgp(order.totalPiasters, locale)}
                          </bdi>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Tab 2: High-Legibility 20-Dish 86 Stock Sync Panel */}
          <TabsContent value="stock" className="mt-6">
            <div className="overflow-hidden rounded-[28px] bg-[#FAF9F6] p-5 text-[#18181B] shadow-xl sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#18181B]">
                    {isAr
                      ? "إيقاف الأصناف النافدة فورا (86 Sync)"
                      : "Instant 86 Stock Locks (All 20 Dishes)"}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-zinc-600">
                    {isAr
                      ? "أي طبق تقفله هنا يتقفل فورا على منيو الضيوف."
                      : "Toggling any switch locks ordering on /menu immediately."}
                  </p>
                </div>

                <div className="w-full sm:w-64">
                  <InputGroup className="border border-zinc-300 bg-white text-[#18181B]">
                    <InputGroupAddon align="inline-start">
                      <AppIcon icon={Search01Icon} size={15} />
                    </InputGroupAddon>
                    <InputGroupInput
                      value={stockQuery}
                      onChange={(event) => setStockQuery(event.target.value)}
                      placeholder={
                        isAr ? "بحث في الـ 20 طبق..." : "Filter 20 dishes..."
                      }
                      aria-label={isAr ? "بحث في الأصناف" : "Filter dishes"}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredStockDishes.map((dish) => {
                  const is86 = soldOutIds.includes(dish.id);
                  return (
                    <div
                      key={dish.id}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-2xl border p-3 transition-colors",
                        is86
                          ? "border-red-300 bg-red-50"
                          : "border-zinc-200 bg-white",
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={dish.image}
                          alt={isAr ? dish.nameAr : dish.nameEn}
                          className={cn(
                            "size-12 shrink-0 rounded-xl object-cover",
                            is86 && "grayscale opacity-60",
                          )}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-[#18181B]">
                            {isAr ? dish.nameAr : dish.nameEn}
                          </p>
                          <p className="text-xs font-medium text-zinc-500">
                            {isAr
                              ? STATION_META[dish.station].ar
                              : STATION_META[dish.station].en}{" "}
                            ·{" "}
                            <bdi dir="ltr" className="font-mono tabular-price">
                              {formatEgp(dish.pricePiasters, locale)}
                            </bdi>
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-bold",
                            is86
                              ? "bg-red-600 text-white"
                              : "bg-emerald-100 text-emerald-800",
                          )}
                        >
                          {is86
                            ? isAr
                              ? "86 · خلصان"
                              : "86 · Sold out"
                            : isAr
                              ? "متاح"
                              : "Available"}
                        </span>
                        <Switch
                          checked={is86}
                          aria-label={`Toggle 86 for ${dish.nameEn}`}
                          onCheckedChange={() => {
                            toggleSoldOut(dish.id);
                            if (chimeEnabled) {
                              playPassChime();
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/kds")({
  component: KdsPage,
});
