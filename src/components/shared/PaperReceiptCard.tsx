import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperReceiptCardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Tactile physical thermal-receipt container:
 * Crisp paper surface + dashed tear lines + serrated zig-zag SVG bottom edge.
 */
export function PaperReceiptCard({
  children,
  className,
}: PaperReceiptCardProps) {
  const teethCount = 28;
  const toothWidth = 14;
  const totalWidth = teethCount * toothWidth;
  const points: Array<string> = [`0,0`, `${totalWidth},0`];
  for (let i = teethCount; i >= 0; i -= 1) {
    const xRight = i * toothWidth;
    if (i < teethCount) {
      points.push(`${xRight + toothWidth / 2},10`);
    }
    points.push(`${xRight},0`);
  }
  const zigzagPoints = Array.from({ length: teethCount }, (_, i) => {
    const x1 = i * toothWidth;
    const xm = x1 + toothWidth / 2;
    const x2 = x1 + toothWidth;
    return `${x1},0 ${xm},10 ${x2},0`;
  }).join(" ");

  return (
    <div className={cn("relative drop-shadow-[0_14px_28px_rgba(9,9,11,0.06)]", className)}>
      <div className="rounded-t-3xl border border-b-0 border-border bg-card px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        {children}
      </div>
      <div className="relative h-[11px] w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox={`0 0 ${totalWidth} 11`}
          preserveAspectRatio="none"
          className="block h-full w-full"
        >
          <polygon points={points.join(" ")} className="fill-card" />
          <polyline
            points={zigzagPoints}
            fill="none"
            strokeWidth="1.2"
            className="stroke-border"
          />
        </svg>
      </div>
    </div>
  );
}
