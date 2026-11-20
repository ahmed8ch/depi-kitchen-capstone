import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AppIcon, ArrowRight02Icon, Tick02Icon } from "@/components/icons";
import { KitchenLoader } from "@/components/ui/kitchen-loader";
import { cn } from "@/lib/utils";

interface SlideToConfirmProps {
  readonly label: string;
  readonly confirmedLabel: string;
  readonly loadingLabel?: string;
  readonly disabled?: boolean;
  readonly onConfirm: () => void;
  readonly className?: string;
}

/**
 * Tactile Slide-to-Send / Swipe-to-Pay control following Apple & Emil Kowalski's
 * 2-phase gesture model (1:1 pointer tracking + velocity-seeded spring release)
 * with mandatory WCAG 2.2 2.5.7 single-click & keyboard fallback.
 */
export function SlideToConfirm({
  label,
  confirmedLabel,
  loadingLabel = "Sending",
  disabled = false,
  onConfirm,
  className,
}: SlideToConfirmProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxTravel, setMaxTravel] = useState(224);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const shouldReduceMotion = useReducedMotion();
  const dragX = useMotionValue(0);

  const labelOpacity = useTransform(dragX, [0, 120], [1, 0.2]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const updateWidth = () => {
      setMaxTravel(Math.max(120, el.clientWidth - 56));
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const triggerConfirm = () => {
    if (disabled || status !== "idle") {
      return;
    }
    const travel = Math.max(
      120,
      (trackRef.current?.clientWidth ?? maxTravel + 56) - 56,
    );
    setStatus("sending");
    animate(dragX, travel, {
      type: "spring",
      duration: shouldReduceMotion ? 0.05 : 0.35,
      bounce: 0,
    });
    window.setTimeout(() => {
      setStatus("done");
      onConfirm();
      window.setTimeout(() => {
        setStatus("idle");
        animate(dragX, 0, {
          type: "spring",
          duration: shouldReduceMotion ? 0.05 : 0.4,
          bounce: 0,
        });
      }, 1400);
    }, 420);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        ref={trackRef}
        dir="ltr"
        className={cn(
          "relative flex h-14 w-full items-center overflow-hidden rounded-full border border-border bg-secondary/80 p-1.5 select-none",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <motion.div
          style={{ opacity: status === "idle" ? labelOpacity : 1 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-14 text-sm font-semibold text-foreground"
        >
          {status === "sending" ? (
            <span className="inline-flex items-center gap-2 text-primary-ink">
              <KitchenLoader label={loadingLabel} className="h-3.5" />
              <span>{loadingLabel}</span>
            </span>
          ) : status === "done" ? (
            <span className="inline-flex items-center gap-1.5 text-status-ready">
              <AppIcon icon={Tick02Icon} size={16} />
              <span>{confirmedLabel}</span>
            </span>
          ) : (
            <span>{label}</span>
          )}
        </motion.div>

        <motion.div
          drag={disabled || status !== "idle" ? false : "x"}
          dragConstraints={{ left: 0, right: maxTravel }}
          dragElastic={0.12}
          dragMomentum={false}
          style={{ x: dragX }}
          onDragEnd={(_, info) => {
            const travel = Math.max(
              120,
              (trackRef.current?.clientWidth ?? maxTravel + 56) - 56,
            );
            if (dragX.get() >= travel * 0.72 || info.velocity.x > 520) {
              triggerConfirm();
            } else {
              animate(dragX, 0, {
                type: "spring",
                duration: 0.36,
                bounce: 0.14,
                velocity: info.velocity.x,
              });
            }
          }}
          className={cn(
            "relative z-10 flex size-11 shrink-0 cursor-grab items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md active:cursor-grabbing",
            status === "done" && "bg-status-ready text-white",
          )}
        >
          {status === "sending" ? (
            <KitchenLoader label={loadingLabel} className="h-3.5" />
          ) : status === "done" ? (
            <AppIcon icon={Tick02Icon} size={18} />
          ) : (
            <AppIcon icon={ArrowRight02Icon} size={18} />
          )}
        </motion.div>
      </div>

      {/* Mandatory WCAG 2.2 2.5.7 single-pointer & keyboard alternative */}
      <button
        type="button"
        disabled={disabled || status !== "idle"}
        onClick={triggerConfirm}
        className="self-center rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}
