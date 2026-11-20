import { cn } from "@/lib/utils";

export interface AvatarDotPreset {
  readonly id: number;
  readonly label: string;
  readonly bg: string;
  readonly ring: string;
  readonly eyeColor: string;
}

/**
 * Playful Grokbot-inspired colorful character avatar dots (with subtle faces or initial).
 * Gives light & dark themes instant joyful warmth while distinguishing diners around a table.
 */
export const AVATAR_DOT_PRESETS: ReadonlyArray<AvatarDotPreset> = [
  { id: 0, label: "Ember", bg: "#EB4A1E", ring: "#FDBA9F", eyeColor: "#FFFFFF" },
  { id: 1, label: "Violet", bg: "#7C5CFF", ring: "#C4B5FD", eyeColor: "#FFFFFF" },
  { id: 2, label: "Sky", bg: "#258CF4", ring: "#93C5FD", eyeColor: "#FFFFFF" },
  { id: 3, label: "Mint", bg: "#18B46B", ring: "#86EFAC", eyeColor: "#FFFFFF" },
  { id: 4, label: "Amber", bg: "#F59E0B", ring: "#FDE68A", eyeColor: "#18181B" },
  { id: 5, label: "Rose", bg: "#EC487F", ring: "#F9A8D4", eyeColor: "#FFFFFF" },
  { id: 6, label: "Teal", bg: "#0EA5A4", ring: "#99F6E4", eyeColor: "#FFFFFF" },
  { id: 7, label: "Indigo", bg: "#4F46E5", ring: "#A5B4FC", eyeColor: "#FFFFFF" },
];

export function getAvatarPreset(avatarId: number): AvatarDotPreset {
  const safeIndex = Math.abs(Math.floor(avatarId)) % AVATAR_DOT_PRESETS.length;
  return AVATAR_DOT_PRESETS[safeIndex] ?? AVATAR_DOT_PRESETS[0]!;
}

interface AvatarDotProps {
  readonly avatarId: number;
  readonly name?: string;
  readonly size?: "xs" | "sm" | "md" | "lg";
  readonly mode?: "face" | "initial";
  readonly className?: string;
}

const SIZE_CLASSES: Record<NonNullable<AvatarDotProps["size"]>, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export function AvatarDot({
  avatarId,
  name = "",
  size = "sm",
  mode = "face",
  className,
}: AvatarDotProps) {
  const preset = getAvatarPreset(avatarId);
  const initial = name.trim().slice(0, 1).toUpperCase() || "K";

  return (
    <span
      aria-hidden="true"
      style={{
        backgroundColor: preset.bg,
        boxShadow: `0 0 0 2px ${preset.ring}44`,
      }}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-bold select-none shadow-xs",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {mode === "initial" ? (
        <span style={{ color: preset.eyeColor }}>{initial}</span>
      ) : (
        <svg viewBox="0 0 32 32" className="size-[72%]" fill="none">
          {/* Playful slanted cute Grokbot eyes */}
          <rect
            x="11"
            y="10.5"
            width="2.6"
            height="6.2"
            rx="1.3"
            transform="rotate(-8 12.3 13.6)"
            fill={preset.eyeColor}
          />
          <rect
            x="18.2"
            y="10.5"
            width="2.6"
            height="6.2"
            rx="1.3"
            transform="rotate(-8 19.5 13.6)"
            fill={preset.eyeColor}
          />
          <path
            d="M12.6 20.5C14.1 22.1 17.5 22.1 19 20.4"
            stroke={preset.eyeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
