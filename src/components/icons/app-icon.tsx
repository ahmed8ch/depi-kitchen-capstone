import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface AppIconProps
  extends Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> {
  icon: IconSvgElement;
  size?: number;
  strokeWidth?: number;
  /** Flip horizontally in RTL layouts (arrows, chevrons, share icons ONLY) */
  mirrorInRtl?: boolean;
  label?: string;
  "data-icon"?: "inline-start" | "inline-end";
}

export function AppIcon({
  icon,
  size,
  strokeWidth = 1.75,
  color = "currentColor",
  mirrorInRtl = false,
  label,
  className,
  "data-icon": dataIcon,
  ...rest
}: AppIconProps) {
  const resolvedSize = size ?? (dataIcon ? 16 : 20);

  return (
    <HugeiconsIcon
      icon={icon}
      size={resolvedSize}
      strokeWidth={strokeWidth}
      color={color}
      data-icon={dataIcon}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn(
        "shrink-0",
        mirrorInRtl && "rtl:-scale-x-100",
        className,
      )}
      {...rest}
    />
  );
}
