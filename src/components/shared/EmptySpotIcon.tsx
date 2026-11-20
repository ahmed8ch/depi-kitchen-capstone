import { cn } from "@/lib/utils";

interface EmptySpotIconProps {
  readonly variant: "bag" | "search" | "kitchen";
  readonly className?: string;
}

/**
 * Crisp isometric spot illustrations used STRICTLY inside shadcn <EmptyMedia>.
 */
export function EmptySpotIcon({ variant, className }: EmptySpotIconProps) {
  if (variant === "bag") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        fill="none"
        className={cn("size-14", className)}
      >
        <path d="M32 10L52 20V44L32 54L12 44V20L32 10Z" className="fill-secondary stroke-border" strokeWidth="1.5" />
        <path d="M32 10L52 20L32 30L12 20L32 10Z" className="fill-card stroke-border" strokeWidth="1.5" />
        <path d="M32 30V54" className="stroke-border" strokeWidth="1.5" />
        <path d="M24 19C24 13.5 27.6 10 32 10C36.4 10 40 13.5 40 19" className="stroke-primary" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "kitchen") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        fill="none"
        className={cn("size-14", className)}
      >
        <ellipse cx="32" cy="44" rx="22" ry="10" className="fill-secondary stroke-border" strokeWidth="1.5" />
        <path d="M14 42C14 29 22 20 32 20C42 20 50 29 50 42" className="fill-card stroke-border" strokeWidth="1.5" />
        <circle cx="32" cy="17" r="3.5" className="fill-primary" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={cn("size-14", className)}
    >
      <circle cx="29" cy="29" r="15" className="fill-secondary stroke-border" strokeWidth="1.5" />
      <circle cx="29" cy="29" r="9" className="fill-card stroke-primary/50" strokeWidth="1.5" />
      <path d="M40 40L52 52" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
