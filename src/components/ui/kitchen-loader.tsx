import { cn } from "@/lib/utils";

interface KitchenLoaderProps {
  readonly label?: string;
  readonly className?: string;
}

/**
 * Inspired by Jakub Krehel's loading.dev:
 * Lightweight zero-dependency 4-bar pulse loader that automatically
 * settles to a calm static posture under `prefers-reduced-motion: reduce`.
 */
export function KitchenLoader({
  label = "Loading",
  className,
}: KitchenLoaderProps) {
  const delays: ReadonlyArray<number> = [0, 110, 220, 330];

  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-flex h-4 items-center gap-[3px] text-current",
        className,
      )}
    >
      {delays.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          style={{
            animation: `krave-bar-pulse 760ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms infinite`,
          }}
          className="krave-loader-bar h-full w-[2.5px] origin-center rounded-full bg-current"
        />
      ))}
    </span>
  );
}
