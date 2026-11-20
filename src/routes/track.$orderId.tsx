import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore, type KdsOrderStatus } from "@/app/store-context";
import {
  AppIcon,
  ArrowLeft02Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  FireIcon,
} from "@/components/icons";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { PaperReceiptCard } from "@/components/shared/PaperReceiptCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { KitchenLoader } from "@/components/ui/kitchen-loader";
import { RESTAURANT_BRAND } from "@/config/brand";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

function getStageIndex(status: KdsOrderStatus): number {
  if (status === "new") {
    return 0;
  }
  if (status === "firing") {
    return 1;
  }
  return 2;
}

function TrackOrderPage() {
  const { orderId } = Route.useParams();
  const { locale } = useAppAppearance();
  const { orders } = useKraveStore();
  const isAr = locale === "ar";

  const order = orders.find(
    (entry) => entry.id.toLowerCase() === orderId.toLowerCase(),
  );

  if (!order) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-14 sm:px-6">
        <Empty className="border border-border bg-card py-14">
          <EmptyHeader>
            <EmptyMedia>
              <EmptySpotIcon variant="kitchen" />
            </EmptyMedia>
            <EmptyTitle>
              {isAr
                ? `الأوردر #${orderId} مش موجود`
                : `Order #${orderId} not found`}
            </EmptyTitle>
            <EmptyDescription>
              {isAr
                ? "راجع رقم الأوردر أو اختار من الأوردرات النشطة على خط المطبخ."
                : "Double-check the ticket number or pick one of the active table orders."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2.5">
              <Link to="/track" className={buttonVariants({ variant: "default" })}>
                {isAr ? "كل الأوردرات النشطة" : "View Active Orders"}
              </Link>
              <Link to="/menu" className={buttonVariants({ variant: "outline" })}>
                {isAr ? "العودة للمنيو" : "Back to Menu"}
              </Link>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const stageIndex = getStageIndex(order.status);
  const isCooking = order.status === "new" || order.status === "firing";

  const stages = [
    {
      id: "received",
      titleEn: "Received",
      titleAr: "وصل للمطبخ",
      descEn: "Ticket landed on the station pass.",
      descAr: "وصل الطلب لبداية خط المطبخ.",
    },
    {
      id: "firing",
      titleEn: "On the Fire",
      titleAr: "على النار الآن",
      descEn: "Searing on cast-iron, stone deck & oak embers.",
      descAr: "بيتحضر على الصاج والفرن الحجري والفحم.",
    },
    {
      id: "ready",
      titleEn: order.status === "served" ? "Served" : "Ready",
      titleAr: order.status === "served" ? "اتقدم" : "جاهز للتقديم",
      descEn:
        order.status === "served"
          ? "Delivered hot to your table."
          : "Plated hot at the pass for your table.",
      descAr:
        order.status === "served"
          ? "اتقدم سخن على الترابيزة."
          : "جاهز سخن وفي طريقه للترابيزة.",
    },
  ];

  const progressPercent = stageIndex === 0 ? 22 : stageIndex === 1 ? 62 : 100;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/track"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <AppIcon icon={ArrowLeft02Icon} data-icon="inline-start" mirrorInRtl />
          <span>{isAr ? "كل الأوردرات" : "All Orders"}</span>
        </Link>

        <Link
          to="/kds"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <span>
            {isAr ? "حدّث الحالة من شاشة المطبخ" : "Update on Kitchen Pass"}
          </span>
          <AppIcon icon={ArrowUpRight01Icon} data-icon="inline-end" mirrorInRtl />
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <section className="flex flex-col gap-6 rounded-[32px] border border-border bg-card p-6 shadow-card-hover sm:p-8 lg:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono tabular-price">
                  <bdi dir="ltr">#{order.id}</bdi>
                </Badge>
                <Badge variant="outline">
                  {isAr
                    ? `ترابيزة ${order.tableNumber}`
                    : `Table ${order.tableNumber}`}
                </Badge>
              </div>
              <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                {order.status === "ready"
                  ? isAr
                    ? "طلبك جاهز على الكاونتر!"
                    : "Your order is hot at the pass!"
                  : order.status === "served"
                    ? isAr
                      ? "بالهنا والشفا!"
                      : "Served to your table!"
                    : order.status === "firing"
                      ? isAr
                        ? "طلبك على النار دلوقتي"
                        : "Firing on the open hearth"
                      : isAr
                        ? "تم استلام طلبك بنجاح"
                        : "Order received by kitchen"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? `الطلب باسم ${order.guestName} · بيتحدث مباشرة من شاشة المطبخ.`
                  : `Placed by ${order.guestName} · Synced live with FlameLink Kitchen Pass.`}
              </p>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-surface-tint px-4 py-2.5 ring-1 ring-border">
              {isCooking ? (
                <KitchenLoader
                  label={isAr ? "جاري التحضير" : "Cooking"}
                  className="h-4 text-primary-ink"
                />
              ) : (
                <AppIcon
                  icon={CheckmarkCircle02Icon}
                  size={18}
                  className="text-status-ready"
                />
              )}
              <span className="text-xs font-bold text-foreground">
                {isCooking
                  ? isAr
                    ? "بيتحضر طازة الآن"
                    : "Cooking fresh now"
                  : isAr
                    ? "جاهز للتقديم"
                    : "Ready at pass"}
              </span>
            </div>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                stageIndex === 2 ? "bg-status-ready" : "bg-primary",
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {stages.map((stage, index) => {
              const completed =
                index < stageIndex || (index === 2 && stageIndex === 2);
              const active =
                index === stageIndex && !(index === 2 && stageIndex === 2);
              return (
                <div
                  key={stage.id}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border p-4 transition-colors",
                    active
                      ? "border-primary bg-primary/5"
                      : completed
                        ? "border-border bg-card"
                        : "border-border/60 bg-card/50 opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-2xl",
                      completed
                        ? "bg-status-ready-bg text-status-ready"
                        : active
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {completed ? (
                      <AppIcon icon={CheckmarkCircle02Icon} size={18} />
                    ) : active ? (
                      <AppIcon icon={FireIcon} size={18} />
                    ) : (
                      <AppIcon icon={Clock01Icon} size={18} />
                    )}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-bold text-foreground">
                      {isAr ? stage.titleAr : stage.titleEn}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isAr ? stage.descAr : stage.descEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <Link to="/menu" className={buttonVariants({ variant: "default" })}>
              {isAr ? "اطلب أطباق إضافية" : "Order More Dishes"}
            </Link>
            <Link to="/table" className={buttonVariants({ variant: "outline" })}>
              {isAr ? "رجوع للترابيزة" : "Back to Table"}
            </Link>
          </div>
        </section>

        <section className="lg:sticky lg:top-24 lg:col-span-5">
          <PaperReceiptCard>
            <div className="flex items-start justify-between gap-2 pb-4">
              <div>
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground">
                  {isAr
                    ? `${RESTAURANT_BRAND.nameAr} · تذكرة أوردر`
                    : `${RESTAURANT_BRAND.wordmarkEn} · ORDER TICKET`}
                </span>
                <h2 className="mt-1 font-mono text-lg font-extrabold text-foreground tabular-price">
                  <bdi dir="ltr">#{order.id}</bdi>
                </h2>
              </div>
              <Badge variant="secondary">
                {order.paymentMethod === "split"
                  ? isAr
                    ? "تقسيم بالتساوي"
                    : "Split Equally"
                  : order.paymentMethod === "mine"
                    ? isAr
                      ? "أطباقي فقط"
                      : "My Items"
                    : isAr
                      ? "فاتورة كاملة"
                      : "Full Check"}
              </Badge>
            </div>

            <div className="flex flex-col gap-3 border-t border-dashed border-border py-4">
              {order.items.map((item, idx) => (
                <div
                  key={`${order.id}-item-${idx}`}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-primary-ink tabular-price">
                        {item.quantity}×
                      </span>
                      <span className="font-semibold text-foreground">
                        {isAr ? item.nameAr : item.nameEn}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {item.ownerName} ·{" "}
                      {isAr ? item.modifiersSummaryAr : item.modifiersSummaryEn}
                    </p>
                    {item.note ? (
                      <p className="mt-0.5 text-[11px] text-primary-ink italic">
                        &ldquo;{item.note}&rdquo;
                      </p>
                    ) : null}
                  </div>
                  <bdi
                    dir="ltr"
                    className="shrink-0 font-mono text-xs font-semibold tabular-price"
                  >
                    {formatEgp(item.lineTotalPiasters, locale)}
                  </bdi>
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between border-t border-dashed border-border pt-4">
              <span className="text-sm font-medium text-muted-foreground">
                {isAr ? "الإجمالي" : "Total"}
              </span>
              <bdi
                dir="ltr"
                className="font-mono text-xl font-extrabold text-foreground tabular-price"
              >
                {formatEgp(order.totalPiasters, locale)}
              </bdi>
            </div>
          </PaperReceiptCard>
        </section>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/track/$orderId")({
  component: TrackOrderPage,
});
