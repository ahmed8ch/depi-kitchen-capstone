import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore, type KdsOrderStatus } from "@/app/store-context";
import {
  AppIcon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  FireIcon,
  Search01Icon,
} from "@/components/icons";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { KitchenLoader } from "@/components/ui/kitchen-loader";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

function getStatusMeta(status: KdsOrderStatus, isAr: boolean) {
  if (status === "ready") {
    return {
      label: isAr ? "جاهز للتقديم" : "Ready at Pass",
      tone: "bg-status-ready-bg text-status-ready border-status-ready/25",
    };
  }
  if (status === "served") {
    return {
      label: isAr ? "اتقدم على الترابيزة" : "Served",
      tone: "bg-secondary text-muted-foreground border-border",
    };
  }
  if (status === "firing") {
    return {
      label: isAr ? "على النار الآن" : "On the Fire",
      tone: "bg-primary/10 text-primary-ink border-primary/25",
    };
  }
  return {
    label: isAr ? "وصل للمطبخ" : "Received",
    tone: "bg-surface-tint text-foreground border-border",
  };
}

function TrackIndexPage() {
  const navigate = useNavigate();
  const { locale } = useAppAppearance();
  const { orders } = useKraveStore();
  const isAr = locale === "ar";
  const [lookupId, setLookupId] = useState("");

  const handleLookup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = lookupId.trim().toUpperCase();
    if (!cleaned) {
      return;
    }
    void navigate({
      to: "/track/$orderId",
      params: { orderId: cleaned },
    });
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary-ink">
            {isAr ? "مزامنة لحظية مع شاشة المطبخ" : "Live Kitchen Pass Sync"}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            {isAr ? "متابعة الأوردرات" : "Track Live Orders"}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {isAr
              ? "اختار أي أوردر لمتابعة مرحلة التحضير على النار مباشرة من شاشة المطبخ."
              : "Select any active table ticket to follow its real-time progress on the fire line."}
          </p>
        </div>

        <form
          onSubmit={handleLookup}
          className="flex w-full items-center gap-2 sm:w-auto"
        >
          <div className="w-full sm:w-52">
            <InputGroup className="bg-card ring-1 ring-border">
              <InputGroupAddon align="inline-start">
                <AppIcon icon={Search01Icon} size={15} />
              </InputGroupAddon>
              <InputGroupInput
                value={lookupId}
                onChange={(event) => setLookupId(event.target.value)}
                placeholder={isAr ? "رقم الأوردر (KR-204)" : "Order ID (KR-204)"}
                aria-label={isAr ? "بحث برقم الأوردر" : "Lookup order ID"}
              />
            </InputGroup>
          </div>
          <Button type="submit" size="sm">
            {isAr ? "متابعة" : "Track"}
          </Button>
        </form>
      </div>

      {orders.length === 0 ? (
        <Empty className="border border-border bg-card py-16">
          <EmptyHeader>
            <EmptyMedia>
              <EmptySpotIcon variant="kitchen" />
            </EmptyMedia>
            <EmptyTitle>
              {isAr ? "مفيش أوردرات نشطة حاليا" : "No active orders yet"}
            </EmptyTitle>
            <EmptyDescription>
              {isAr
                ? "ابدأ من المنيو وابعت أول أوردر للترابيزة."
                : "Customize dishes on the menu and fire your first table order."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link to="/menu" className={buttonVariants({ variant: "default" })}>
              {isAr ? "افتح المنيو" : "Explore Menu"}
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {orders.map((order) => {
            const meta = getStatusMeta(order.status, isAr);
            const isCooking = order.status === "new" || order.status === "firing";
            return (
              <Link
                key={order.id}
                to="/track/$orderId"
                params={{ orderId: order.id }}
                className="group flex flex-col justify-between gap-4 rounded-[28px] border border-border bg-card p-5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <bdi
                        dir="ltr"
                        className="font-mono text-base font-extrabold text-foreground tabular-price"
                      >
                        #{order.id}
                      </bdi>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-sm font-semibold text-foreground">
                        {isAr
                          ? `ترابيزة ${order.tableNumber}`
                          : `Table ${order.tableNumber}`}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {order.guestName} · {order.items.length}{" "}
                      {isAr
                        ? "أصناف"
                        : order.items.length === 1
                          ? "dish"
                          : "dishes"}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                      meta.tone,
                    )}
                  >
                    {isCooking ? (
                      <KitchenLoader label={meta.label} className="h-3" />
                    ) : order.status === "ready" ? (
                      <AppIcon icon={CheckmarkCircle02Icon} size={13} />
                    ) : (
                      <AppIcon icon={FireIcon} size={13} />
                    )}
                    <span>{meta.label}</span>
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-y border-dashed border-border py-3 text-xs text-muted-foreground">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div
                      key={`${order.id}-preview-${index}`}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="truncate font-medium text-foreground">
                        {item.quantity}× {isAr ? item.nameAr : item.nameEn}
                      </span>
                      <bdi dir="ltr" className="shrink-0 font-mono tabular-price">
                        {formatEgp(item.lineTotalPiasters, locale)}
                      </bdi>
                    </div>
                  ))}
                  {order.items.length > 2 ? (
                    <span className="text-[11px] text-muted-foreground">
                      +{order.items.length - 2}{" "}
                      {isAr ? "أصناف تانية" : "more items"}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {isAr ? "متابعة مباشرة" : "Live pass updates"}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground transition-colors group-hover:text-primary-ink">
                    <bdi dir="ltr" className="font-mono tabular-price">
                      {formatEgp(order.totalPiasters, locale)}
                    </bdi>
                    <AppIcon icon={ArrowRight02Icon} size={14} mirrorInRtl />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/track/")({
  component: TrackIndexPage,
});
