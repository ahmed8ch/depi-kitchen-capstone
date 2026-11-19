import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import {
  AppIcon,
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  FireIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

function TrackOrderPage() {
  const { orderId } = Route.useParams();
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-2xl">
              {isAr ? "متابعة الأوردر" : "Order Status"}
            </CardTitle>
            <Badge variant="secondary" className="tabular-price">
              <bdi dir="ltr">{orderId}</bdi>
            </Badge>
          </div>
          <CardDescription>
            {isAr
              ? "يتم تحديث حالة الأوردر مباشرة من شاشة المطبخ."
              : "Synced directly from the kitchen pass."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ItemGroup>
            <Item variant="outline" size="sm">
              <ItemMedia variant="icon">
                <AppIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-status-ready"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{isAr ? "تم الاستلام" : "Received"}</ItemTitle>
                <ItemDescription>
                  {isAr
                    ? "وصل الطلب لبداية خط المطبخ."
                    : "Sent straight to the station ticket queue."}
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="muted" size="sm">
              <ItemMedia variant="icon">
                <AppIcon icon={FireIcon} className="text-primary-ink" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{isAr ? "على النار الآن" : "On the Fire"}</ItemTitle>
                <ItemDescription>
                  {isAr
                    ? "جاري التحضير على الصاج والفرن الحجري."
                    : "Finishing on cast-iron smash and stone deck."}
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="default" size="sm">
              <ItemMedia variant="icon">
                <AppIcon icon={Clock01Icon} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{isAr ? "جاهز للتقديم" : "Ready"}</ItemTitle>
                <ItemDescription>
                  {isAr
                    ? "في طريقه للترابيزة."
                    : "Plated at the pass for table service."}
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>

          <Separator />
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <Link to="/menu" className={buttonVariants({ variant: "outline" })}>
            <AppIcon
              icon={ArrowLeft02Icon}
              data-icon="inline-start"
              mirrorInRtl
            />
            <span>{isAr ? "العودة للمنيو" : "Back to Menu"}</span>
          </Link>
          <Link to="/kds" className={buttonVariants({ variant: "ghost" })}>
            {isAr ? "شاشة المطبخ" : "Kitchen Pass"}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/track/$orderId")({
  component: TrackOrderPage,
});
