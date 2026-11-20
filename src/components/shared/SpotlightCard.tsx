import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Ref-driven pointer-reactive radial spotlight card (zero React setState on mousemove).
 * Automatically disabled on coarse/touch pointers via CSS media query.
 */
export function SpotlightCard({
  children,
  className,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const node = ref.current;
        if (node) {
          const rect = node.getBoundingClientRect();
          node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          node.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }
        onPointerMove?.(event);
      }}
      className={cn("spotlight-surface", className)}
      {...props}
    >
      {children}
    </div>
  );
}
