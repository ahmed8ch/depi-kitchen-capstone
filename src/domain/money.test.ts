import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { formatEgp, splitEquallyPiasters } from "./money";

describe("splitEquallyPiasters", () => {
  it("distributes indivisible totals without floating-point drift", () => {
    const shares = splitEquallyPiasters(10_000, 3);
    expect(shares).toEqual([3334, 3333, 3333]);
    expect(shares.reduce((sum, value) => sum + value, 0)).toBe(10_000);
  });

  it("handles zero piasters cleanly", () => {
    expect(splitEquallyPiasters(0, 4)).toEqual([0, 0, 0, 0]);
  });

  it("rejects negative totals and invalid diner counts", () => {
    expect(() => splitEquallyPiasters(-1, 2)).toThrow(RangeError);
    expect(() => splitEquallyPiasters(100, 0)).toThrow(RangeError);
    expect(() => splitEquallyPiasters(10.5, 2)).toThrow(RangeError);
  });

  it("always preserves exact total and at most 1 piaster drift across randomized splits", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1_000_000 }),
        fc.integer({ min: 1, max: 20 }),
        (totalPiasters, dinerCount) => {
          const shares = splitEquallyPiasters(totalPiasters, dinerCount);
          const sum = shares.reduce((acc, value) => acc + value, 0);
          const minShare = Math.min(...shares);
          const maxShare = Math.max(...shares);

          expect(shares).toHaveLength(dinerCount);
          expect(sum).toBe(totalPiasters);
          expect(maxShare - minShare).toBeLessThanOrEqual(1);
        },
      ),
      { numRuns: 250 },
    );
  });
});

describe("formatEgp", () => {
  it("formats whole and fractional EGP amounts cleanly", () => {
    expect(formatEgp(29_500, "en")).toBe("295 EGP");
    expect(formatEgp(3334, "en")).toBe("33.34 EGP");
    expect(formatEgp(29_500, "ar")).toContain("ج.م");
  });
});
