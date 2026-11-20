import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { AppIcon, Share08Icon, Tick02Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { RESTAURANT_BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

interface ShareDishButtonProps {
  readonly dishSlug: string;
  readonly dishNameEn: string;
  readonly dishNameAr: string;
  readonly className?: string;
}

export function ShareDishButton({
  dishSlug,
  dishNameEn,
  dishNameAr,
  className,
}: ShareDishButtonProps) {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const [copied, setCopied] = useState(false);

  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const dishTitle = isAr ? dishNameAr : dishNameEn;
    const shareUrl = `${window.location.origin}/menu?dish=${encodeURIComponent(dishSlug)}`;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: `${dishTitle} · ${isAr ? RESTAURANT_BRAND.nameAr : RESTAURANT_BRAND.nameEn}`,
          text: isAr
            ? `شوف ${dishNameAr} من منيو ${RESTAURANT_BRAND.nameAr}`
            : `Check out ${dishNameEn} at ${RESTAURANT_BRAND.nameEn}`,
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        toast.add({
          type: "success",
          title: isAr ? "اتنسخ رابط الطبق" : "Dish link copied",
          description: dishTitle,
        });
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // User cancelled native share sheet; keep silent.
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      onClick={handleShare}
      aria-label={isAr ? `مشاركة ${dishNameAr}` : `Share ${dishNameEn}`}
      className={cn(
        "rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-border/70 backdrop-blur-md transition-[transform,background-color] duration-150 hover:bg-background active:scale-[0.95]",
        className,
      )}
    >
      <AppIcon
        icon={copied ? Tick02Icon : Share08Icon}
        size={15}
        className={cn(copied && "text-status-ready")}
      />
    </Button>
  );
}
