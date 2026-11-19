import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { AppIcon, FireIcon, Search01Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MenuPreviewDish {
  id: string;
  category: "smash" | "pizza" | "grill";
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  priceEgp: number;
}

const MENU_PREVIEW_DISHES: ReadonlyArray<MenuPreviewDish> = [
  {
    id: "smoked-smash",
    category: "smash",
    nameEn: "Smoked Cast-Iron Smash",
    nameAr: "سماش برجر مدخن",
    descEn: "Double aged beef, crisp cheddar skirt, charred onion jam.",
    descAr: "دبل لحم بلدي، شيدر مقرمش، ومربى بصل مشوي.",
    priceEgp: 295,
  },
  {
    id: "maadi-hot-honey",
    category: "pizza",
    nameEn: "Stone-Deck Hot Honey",
    nameAr: "بيتزا هوت هاني على الحجر",
    descEn: "48h sourdough, cured beef pepperoni, wild chili honey.",
    descAr: "عجينة 48 ساعة، ببروني بقري، وعسل فلفل حار.",
    priceEgp: 340,
  },
  {
    id: "oak-short-rib",
    category: "grill",
    nameEn: "Oak-Charred Short Rib",
    nameAr: "ضلع بقري على فحم البلوط",
    descEn: "Slow-braised cut finished over live oak embers with herb jus.",
    descAr: "قطعية مطهية ببطء ومشوية على جمر البلوط.",
    priceEgp: 520,
  },
];

function MenuPage() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDishes = MENU_PREVIEW_DISHES.filter((dish) => {
    const matchesCategory = category === "all" || dish.category === category;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      dish.nameEn.toLowerCase().includes(normalizedQuery) ||
      dish.nameAr.includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {isAr ? "منيو النار المفتوحة" : "Open-Fire Menu"}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {isAr
            ? "اختر القسم أو ابحث عن طبقك المفضل."
            : "Filter by fire station or search dishes instantly."}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <ToggleGroup
          value={[category]}
          onValueChange={(nextValues) => {
            const picked = nextValues[0];
            if (picked) {
              setCategory(picked);
            }
          }}
          variant="outline"
          spacing={1}
          aria-label={isAr ? "تصنيف الأطباق" : "Dish categories"}
        >
          <ToggleGroupItem value="all">
            {isAr ? "الكل" : "All"}
          </ToggleGroupItem>
          <ToggleGroupItem value="smash">
            {isAr ? "سماش" : "Smash"}
          </ToggleGroupItem>
          <ToggleGroupItem value="pizza">
            {isAr ? "بيتزا" : "Pizza"}
          </ToggleGroupItem>
          <ToggleGroupItem value="grill">
            {isAr ? "شوي" : "Grill"}
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="w-full sm:max-w-xs">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <AppIcon icon={Search01Icon} size={16} />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isAr ? "ابحث في المنيو..." : "Search dishes..."}
              aria-label={isAr ? "بحث في المنيو" : "Search dishes"}
            />
          </InputGroup>
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <Empty className="border border-border bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AppIcon icon={FireIcon} size={22} />
            </EmptyMedia>
            <EmptyTitle>
              {isAr ? "لا توجد أطباق مطابقة" : "No matching dishes"}
            </EmptyTitle>
            <EmptyDescription>
              {isAr
                ? "جرب مسح البحث أو اختيار قسم آخر."
                : "Clear your search filter or browse another fire station."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
            >
              {isAr ? "عرض كل الأطباق" : "Reset Filters"}
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <CardHeader>
                <Skeleton className="mb-3 aspect-16/10 w-full rounded-2xl" />
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{isAr ? dish.nameAr : dish.nameEn}</CardTitle>
                  <Badge variant="secondary" className="tabular-price">
                    <bdi dir="ltr">
                      {dish.priceEgp} {isAr ? "ج.م" : "EGP"}
                    </bdi>
                  </Badge>
                </div>
                <CardDescription>
                  {isAr ? dish.descAr : dish.descEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">
                  {isAr ? "جاهز للطلب على الترابيزة" : "Ready for table order"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/menu")({
  component: MenuPage,
});
