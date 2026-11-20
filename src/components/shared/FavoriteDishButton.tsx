import { motion, useReducedMotion } from "motion/react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import { AppIcon, FavouriteIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface FavoriteDishButtonProps {
  readonly dishId: string;
  readonly dishNameEn: string;
  readonly dishNameAr: string;
  readonly className?: string;
}

export function FavoriteDishButton({
  dishId,
  dishNameEn,
  dishNameAr,
  className,
}: FavoriteDishButtonProps) {
  const { locale } = useAppAppearance();
  const { favoriteDishIds, toggleFavorite } = useKraveStore();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();
  const isSaved = favoriteDishIds.includes(dishId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(dishId);
    toast.add({
      type: "success",
      title: isSaved
        ? isAr
          ? "تمت الإزالة من المفضلة"
          : "Removed from favorites"
        : isAr
          ? "اتحفظ في المفضلة"
          : "Saved to favorites",
      description: isAr ? dishNameAr : dishNameEn,
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon-sm"
      data-native-cursor="true"
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? isAr
            ? `إزالة ${dishNameAr} من المفضلة`
            : `Remove ${dishNameEn} from favorites`
          : isAr
            ? `حفظ ${dishNameAr} في المفضلة`
            : `Save ${dishNameEn} to favorites`
      }
      onClick={handleClick}
      className={cn(
        "rounded-full bg-background/92 text-foreground shadow-sm ring-1 ring-border/70 backdrop-blur-md transition-[transform,background-color,color] duration-150 hover:bg-background active:scale-[0.92]",
        isSaved && "bg-primary/12 text-primary ring-primary/40 hover:bg-primary/18",
        className,
      )}
    >
      <motion.span
        key={isSaved ? "saved" : "unsaved"}
        initial={shouldReduceMotion ? false : { scale: 0.72 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 20 }}
        className="inline-flex items-center justify-center"
      >
        <AppIcon
          icon={FavouriteIcon}
          size={15}
          className={cn(isSaved && "fill-primary text-primary")}
        />
      </motion.span>
    </Button>
  );
}
