import { cn } from "@/lib/utils";

interface KraveMarkProps {
  readonly variant?: "badge" | "mono" | "ember";
  readonly className?: string;
}

/**
 * Bespoke iterative Krave geometric monogram:
 * Forward-leaning architectural K carved with a sharp negative-space geometric flame
 * tongue slicing cleanly from the inner junction up through the upper-left crest.
 * Pairs seamlessly with our Amber Vermilion (Palette B) identity and harmonized FlameLink mark.
 */
export function KraveMark({
  variant = "badge",
  className,
}: KraveMarkProps) {
  if (variant === "ember") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
        className={cn("size-8 shrink-0 select-none", className)}
      >
        <defs>
          <linearGradient id="krave-ember-grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="55%" stopColor="#EB4A1E" />
            <stop offset="100%" stopColor="#C83410" />
          </linearGradient>
        </defs>
        {/* Dynamic slanted geometric shield silhouette */}
        <path
          d="M9.5 6.5H34.5L30.8 29.8L10.5 34.8L5.5 31.2L9.5 6.5Z"
          fill="url(#krave-ember-grad)"
        />
        {/* Negative-space kinetic K with carved flame-tip inner counter */}
        <path
          d="M14.2 11.2H19.4L18.1 19.1C19.8 17.2 22.1 14.2 24.4 11.2H30.1L22.3 20.1L27.9 28.4H22.1L18.2 22.2L16.9 23.6L16.1 28.4H11.4L14.2 11.2Z"
          fill="#FAF9F6"
        />
        {/* Geometric flame spark carved cleanly into top-left shoulder */}
        <path
          d="M21.4 10.6C21.8 8.3 23.4 7.1 25.1 6.5C24.4 8.2 24.7 9.4 25.8 10.2C24.2 10.7 22.7 10.9 21.4 10.6Z"
          fill="#FAF9F6"
        />
      </svg>
    );
  }

  if (variant === "mono") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
        className={cn("size-8 shrink-0 select-none", className)}
      >
        {/* Slanted kinetic K with geometric negative-space flame notch */}
        <path
          d="M11 7H17.6L16.1 16.5C17.2 14.6 19.2 12.8 20.6 10.4C21.8 8.4 23.1 7 24.5 7H32.2L22.4 18.8L30.4 33H22.8L17.4 23.1L14.9 25.8L13.7 33H7.4L11 7Z"
          fill="currentColor"
        />
        {/* Carved Ember flame accent inside the kinetic diagonal notch */}
        <path
          d="M19.8 12.1C20.9 9.5 22.8 7.5 25.3 6.2C24.4 8.6 25.1 10.4 26.8 11.7C24.4 12.5 21.9 12.8 19.8 12.1Z"
          fill="#EB4A1E"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className={cn("size-8 shrink-0 select-none", className)}
    >
      <defs>
        <linearGradient id="krave-badge-flame" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#EB4A1E" />
        </linearGradient>
      </defs>
      {/* Architectural rounded-squircle emblem */}
      <rect width="40" height="40" rx="11" className="fill-foreground" />
      {/* Sculpted slanted geometric K */}
      <path
        d="M12.4 10.2H17.8L16.6 18.2L23.5 10.2H29.7L21.1 19.8L28.4 29.8H22.2L17.1 22.4L15.6 24.1L14.7 29.8H9.5L12.4 10.2Z"
        className="fill-background"
      />
      {/* Negative-space geometric ember flame rising out of the K's top-right fork */}
      <path
        d="M18.9 14.7C19.3 11.6 21.1 9.1 23.5 7.4C22.8 9.8 23.6 11.5 25.2 12.7C23.1 13.7 20.9 14.5 18.9 14.7Z"
        fill="url(#krave-badge-flame)"
      />
    </svg>
  );
}
