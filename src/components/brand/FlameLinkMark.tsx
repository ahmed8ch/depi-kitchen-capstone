import flamelinkBadgeUrl from "@/assets/logos/flamelink-badge.svg";
import flamelinkMarkUrl from "@/assets/logos/flamelink-mark.svg";
import { cn } from "@/lib/utils";

export interface FlameLinkMarkProps {
  variant?: "mark" | "badge";
  alt?: string;
  className?: string;
}

export function FlameLinkMark({
  variant = "mark",
  alt = "FlameLink",
  className,
}: FlameLinkMarkProps) {
  const src = variant === "badge" ? flamelinkBadgeUrl : flamelinkMarkUrl;

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      className={cn(
        "inline-block shrink-0 select-none object-contain",
        variant === "badge" ? "size-7 rounded-md" : "h-7 w-auto",
        className,
      )}
    />
  );
}
