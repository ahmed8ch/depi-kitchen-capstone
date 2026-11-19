import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import {
  AppIcon,
  ArrowLeft02Icon,
  Clock01Icon,
  FireIcon,
  Globe02Icon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StockRow {
  id: string;
  nameEn: string;
  nameAr: string;
  station: string;
}

const STOCK_ITEMS: ReadonlyArray<StockRow> = [
  {
    id: "smoked-smash",
    nameEn: "Smoked Cast-Iron Smash",
    nameAr: "سماش برجر مدخن",
    station: "Cast-Iron",
  },
  {
    id: "hot-honey-pizza",
    nameEn: "Stone-Deck Hot Honey",
    nameAr: "بيتزا هوت هاني على الحجر",
    station: "Stone Oven",
  },
  {
    id: "oak-short-rib",
    nameEn: "Oak-Charred Short Rib",
    nameAr: "ضلع بقري على فحم البلوط",
    station: "Oak Grill",
  },
];

function KdsPage() {
  const { locale, setLocale } = useAppAppearance();
  const isAr = locale === "ar";
  const [soldOutIds, setSoldOutIds] = useState<Array<string>>([]);

  const toggleItem86 = (id: string) => {
    setSoldOutIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div
      data-surface="dark-pass"
      className="min-h-dvh bg-background text-foreground"
    >
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FlameLinkMark variant="badge" className="size-8 rounded-lg" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                FlameLink Kitchen Pass
              </span>
              <span className="text-xs text-muted-foreground">
                {isAr ? "خط النار النشط" : "Active Fire Line"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLocale(isAr ? "en" : "ar")}
            >
              <AppIcon icon={Globe02Icon} data-icon="inline-start" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </Button>
            <Link
              to="/"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <AppIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                mirrorInRtl
              />
              <span>{isAr ? "الواجهة النهارية" : "Storefront"}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="tickets">
          <TabsList>
            <TabsTrigger value="tickets">
              <AppIcon icon={FireIcon} size={16} />
              <span>{isAr ? "الأوردرات النشطة" : "Active Tickets"}</span>
            </TabsTrigger>
            <TabsTrigger value="stock">
              <span>{isAr ? "إدارة نفاد الأصناف (86)" : "86 Stock"}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="mt-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="tabular-price">
                      {isAr ? "ترابيزة 5" : "Table 5"}
                    </CardTitle>
                    <Badge variant="secondary" className="tabular-price">
                      <AppIcon icon={Clock01Icon} size={13} />
                      <span>04:18</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    {isAr ? "أوردر #FL-204 · عمر" : "Order #FL-204 · Omar"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="rounded-2xl border border-border bg-background/60 p-3 text-sm">
                    <span className="font-medium">
                      {isAr
                        ? "2× سماش برجر مدخن"
                        : "2x Smoked Cast-Iron Smash"}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {isAr ? "على النار" : "On the Fire"}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stock" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isAr ? "تفعيل حالة 86 الفورية" : "Instant 86 Stock Locks"}
                </CardTitle>
                <CardDescription>
                  {isAr
                    ? "إيقاف أي طبق يظهر فورا على منيو الضيوف."
                    : "Locking an item disables ordering on the guest menu immediately."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup>
                  {STOCK_ITEMS.map((item) => {
                    const is86 = soldOutIds.includes(item.id);
                    return (
                      <Item key={item.id} variant="outline" size="sm">
                        <ItemContent>
                          <ItemTitle>
                            {isAr ? item.nameAr : item.nameEn}
                          </ItemTitle>
                          <ItemDescription>{item.station}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Badge variant={is86 ? "destructive" : "secondary"}>
                            {is86 ? "86 · Sold out" : "Available"}
                          </Badge>
                          <Switch
                            checked={is86}
                            aria-label={`Toggle 86 for ${item.nameEn}`}
                            onCheckedChange={() => toggleItem86(item.id)}
                          />
                        </ItemActions>
                      </Item>
                    );
                  })}
                </ItemGroup>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export const Route = createFileRoute("/kds")({
  component: KdsPage,
});
