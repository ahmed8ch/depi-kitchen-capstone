/**
 * Splits an integer piaster total equally across `dinerCount` diners.
 * Remainder piasters are assigned 1 each to the earliest indices so
 * `shares.reduce((a, b) => a + b, 0) === totalPiasters` and max drift <= 1.
 */
export function splitEquallyPiasters(
  totalPiasters: number,
  dinerCount: number,
): Array<number> {
  if (!Number.isInteger(totalPiasters) || totalPiasters < 0) {
    throw new RangeError("totalPiasters must be a non-negative integer");
  }
  if (!Number.isInteger(dinerCount) || dinerCount < 1) {
    throw new RangeError("dinerCount must be a positive integer");
  }

  const baseShare = Math.floor(totalPiasters / dinerCount);
  const remainder = totalPiasters % dinerCount;

  return Array.from({ length: dinerCount }, (_, index) =>
    index < remainder ? baseShare + 1 : baseShare,
  );
}

/**
 * Formats an integer piaster amount (1 EGP = 100 piasters) cleanly.
 */
export function formatEgp(
  piasters: number,
  locale: "en" | "ar" = "en",
): string {
  if (!Number.isInteger(piasters)) {
    throw new RangeError("piasters must be an integer");
  }

  const egp = piasters / 100;
  const formatted = new Intl.NumberFormat("en-EG", {
    minimumFractionDigits: piasters % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(egp);

  return locale === "ar" ? `${formatted} ج.م` : `${formatted} EGP`;
}
