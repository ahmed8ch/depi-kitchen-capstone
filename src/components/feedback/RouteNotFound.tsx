import { Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import {
  AppIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  QrCode01Icon,
} from "@/components/icons";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { buttonVariants } from "@/components/ui/button";

export function RouteNotFound() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";

  return (
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex items-center justify-center">
        <EmptySpotIcon variant="kitchen" className="size-16" />
      </div>

      <div
        dir="ltr"
        className="flex items-baseline justify-center font-mono text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-foreground select-none sm:text-[8rem]"
      >
        <span>404</span>
        <span className="ms-1 inline-block size-3.5 rounded-full bg-primary sm:size-4" />
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-balance text-foreground sm:text-3xl">
        {isAr
          ? "الترابيزة دي مش موجودة في صالة كريف"
          : "This table isn't on our floor plan"}
      </h1>

      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {isAr
          ? "ممكن يكون الرابط اتغير أو الأوردر خلص. ارجع للمنيو أو امسح كود ترابيزتك من جديد."
          : "The link may have moved or the pass closed. Head back to the open-fire menu or join your table session."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/menu" className={buttonVariants({ variant: "default", size: "lg" })}>
          <span>{isAr ? "افتح المنيو" : "Explore Menu"}</span>
          <AppIcon icon={ArrowRight02Icon} data-icon="inline-end" mirrorInRtl />
        </Link>
        <Link to="/table" className={buttonVariants({ variant: "outline", size: "lg" })}>
          <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
          <span>{isAr ? "انضم للترابيزة" : "Join Table"}</span>
        </Link>
        <Link to="/" className={buttonVariants({ variant: "ghost", size: "lg" })}>
          <AppIcon icon={ArrowLeft02Icon} data-icon="inline-start" mirrorInRtl />
          <span>{isAr ? "الرئيسية" : "Home"}</span>
        </Link>
      </div>
    </div>
  );
}
