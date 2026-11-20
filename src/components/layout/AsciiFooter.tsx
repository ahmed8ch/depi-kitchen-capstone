import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import { KraveMark } from "@/components/brand/KraveMark";
import {
  AppIcon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  InstagramIcon,
  Moon02Icon,
  NewTwitterIcon,
  Sun03Icon,
  TiktokIcon,
} from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { PLATFORM_BRAND, RESTAURANT_BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

interface CairoClockState {
  readonly isOpen: boolean;
  readonly formattedTime: string;
}

function getCairoClockState(now: Date): CairoClockState {
  const hourParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);

  const hourValue = Number(
    hourParts.find((part) => part.type === "hour")?.value ?? "12",
  );
  const isOpen = hourValue >= 12 || hourValue < 1;

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  return { isOpen, formattedTime };
}

interface GlyphCell {
  readonly x: number;
  readonly y: number;
  readonly cov: number;
  readonly gi: number;
  readonly delay: number;
  readonly seed: number;
  heat: number;
  wait: number;
}

const RAMP = " .:-=+*#%@";
const GREY_LEVELS = 24;
const WORDMARK_STRETCH = 1.34;
const RIPPLE_DURATION_MS = 1450;
// Palette B Amber Vermilion RGB (#EB4A1E) for unmistakable hover glow & ripple
const AMBER_VERMILION_RGB = "235,74,30";

function pseudoRandom(index: number): number {
  const raw = Math.sin(index * 127.1 + 311.7) * 43_758.5453;
  return raw - Math.floor(raw);
}

/**
 * Hybrid Kurawa Editorial Layout × Stitch Loop Warm Ambient Glow × Interactive 60fps
 * Cursor-Reactive ASCII `KRAVE` Canvas + Hilarious 3-Click "Dark Kitchen" Joke that
 * actually unlocks Soft-Charcoal Dark Mode on Click #3!
 */
export function AsciiFooter() {
  const { locale, theme, setTheme } = useAppAppearance();
  const { waitlistEmail, joinWaitlist } = useKraveStore();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const [now, setNow] = useState(() => new Date());
  const clock = getCairoClockState(now);

  // 0 = fresh, 1 = roasted once, 2 = roasted twice, 3+ = real dark mode unlocked
  const [jokeAttempts, setJokeAttempts] = useState(0);
  const [shakeTick, setShakeTick] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [offerEmail, setOfferEmail] = useState(waitlistEmail ?? "");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const toggleAnchorRef = useRef<HTMLDivElement | null>(null);

  const liveRef = useRef({
    tStart: -1,
    ox: 0,
    oy: 0,
    maxR: 1,
    dirty: true,
    isDark: theme === "dark",
    reduced: Boolean(shouldReduceMotion),
  });

  useEffect(() => {
    liveRef.current.reduced = Boolean(shouldReduceMotion);
    liveRef.current.isDark = theme === "dark";
    liveRef.current.dirty = true;
  }, [theme, shouldReduceMotion]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) {
      return;
    }
    const ctx = cv.getContext("2d");
    if (!ctx) {
      return;
    }

    const brandWord = RESTAURANT_BRAND.wordmarkEn;
    const live = liveRef.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let width = 0;
    let height = 0;
    let cellW = 0;
    let glyphW = 0;
    let glyphH = 0;
    let cells: Array<GlyphCell> = [];
    let atlas: HTMLCanvasElement | null = null;
    let atlasKey = "";
    let rafId = 0;
    let alive = true;
    let pointerX = -1e4;
    let pointerY = -1e4;
    let inside = false;
    let lastTime = performance.now();

    const ensureAtlas = () => {
      const key = `${RAMP}|${glyphW}|${live.isDark ? "d" : "l"}`;
      if (atlas && atlasKey === key) {
        return;
      }
      atlasKey = key;
      atlas = document.createElement("canvas");
      atlas.width = RAMP.length * glyphW * dpr;
      atlas.height = (GREY_LEVELS + 1) * glyphH * dpr;
      const ax = atlas.getContext("2d");
      if (!ax) {
        return;
      }
      ax.scale(dpr, dpr);
      ax.font = `700 ${Math.round(cellW * 1.38)}px "JetBrains Mono", ui-monospace, monospace`;
      ax.textAlign = "center";
      ax.textBaseline = "middle";

      for (let row = 0; row <= GREY_LEVELS; row += 1) {
        const lum = Math.round(24 + ((232 - 24) * row) / (GREY_LEVELS - 1));
        ax.fillStyle =
          row === GREY_LEVELS
            ? `rgb(${AMBER_VERMILION_RGB})`
            : `rgb(${lum},${lum},${Math.min(255, lum + 4)})`;
        for (let k = 1; k < RAMP.length; k += 1) {
          ax.fillText(
            RAMP[k] ?? "",
            k * glyphW + glyphW / 2,
            row * glyphH + glyphH / 2,
          );
        }
      }
    };

    const drawFrame = (timestamp: number) => {
      const dt = Math.min(0.05, (timestamp - lastTime) / 1000);
      lastTime = timestamp;

      const tt =
        live.tStart < 0
          ? -1
          : Math.max(0, (timestamp - live.tStart) / RIPPLE_DURATION_MS);
      const waving = tt >= 0 && tt <= 1 && !live.reduced;
      if (tt > 1) {
        live.tStart = -1;
      }

      const ring = waving
        ? live.maxR * (0.5 - 0.5 * Math.cos(Math.PI * tt))
        : -1;
      let active = waving || (inside && !live.reduced);
      const radius = Math.max(155, width * 0.17);
      const seconds = timestamp / 1000;

      if (!live.reduced) {
        for (const cell of cells) {
          let dist = 1e5;
          if (inside) {
            dist = Math.hypot(cell.x - pointerX, cell.y - pointerY);
            const rawK = Math.max(0, 1 - dist / radius);
            const smoothK = rawK * rawK * (3 - 2 * rawK);
            if (smoothK > 0) {
              cell.wait += dt;
              if (cell.wait >= cell.delay) {
                cell.heat = Math.min(1, cell.heat + dt * 14 * smoothK);
              }
            } else {
              cell.wait = 0;
            }
          }
          if (cell.heat > 0 && (!inside || dist >= radius)) {
            cell.heat = Math.max(0, cell.heat - dt * (1.8 + cell.seed * 1.4));
          }
          if (cell.heat > 0.002) {
            active = true;
          }
        }
      }

      if (active || live.dirty) {
        live.dirty = false;
        ctx.clearRect(0, 0, width, height);
        ensureAtlas();
        if (!atlas) {
          return;
        }
        const maxGlyphIndex = RAMP.length - 1;
        const tick16 = seconds * 16;
        const tick10 = seconds * 10;

        for (const cell of cells) {
          let gi = cell.gi;
          let rotation = 0;
          let isAccent = false;

          const baseLum = live.isDark ? 98 : 158;
          const baseAlpha = 0.36 + cell.cov * 0.52;
          let lum = baseLum;
          let alpha = baseAlpha;

          // Unmistakable Amber Vermilion hover glow + live glyph scramble + subtle tilt
          if (cell.heat > 0.04) {
            if (
              cell.heat < 0.96 ||
              Math.floor(tick10 + cell.seed * 12) % 5 === 0
            ) {
              gi = 1 + (Math.floor(tick16 + cell.seed * 36) % maxGlyphIndex);
            }
            if (cell.heat > 0.22) {
              isAccent = true;
            } else {
              lum = live.isDark ? 210 : 34;
            }
            rotation = Math.sin(seconds * 5 + cell.seed * 18) * 0.22 * cell.heat;
            alpha = baseAlpha + (1 - baseAlpha) * cell.heat;
          }

          if (waving) {
            const delta = Math.hypot(cell.x - live.ox, cell.y - live.oy) - ring;
            if (delta > -155 && delta < 155) {
              const weight = 1 - Math.abs(delta) / 155;
              const eased = weight * weight * (3 - 2 * weight);
              if (eased > 0.02) {
                rotation = (cell.seed - 0.5) * Math.PI * 1.4 * eased;
                gi = Math.max(
                  1,
                  Math.min(
                    maxGlyphIndex,
                    Math.round((cell.cov * 0.5 + 0.5 * eased) * maxGlyphIndex),
                  ),
                );
                isAccent = true;
                alpha = baseAlpha * (1 - eased) + eased;
              }
            }
          }

          const atlasRow = isAccent
            ? GREY_LEVELS
            : Math.max(
                0,
                Math.min(
                  GREY_LEVELS - 1,
                  Math.round(((lum - 24) / (232 - 24)) * (GREY_LEVELS - 1)),
                ),
              );

          ctx.globalAlpha = Math.min(1, alpha);
          const sx = gi * glyphW * dpr;
          const sy = atlasRow * glyphH * dpr;
          const sw = glyphW * dpr;
          const sh = glyphH * dpr;

          if (rotation !== 0) {
            ctx.save();
            ctx.translate(cell.x, cell.y);
            ctx.rotate(rotation);
            ctx.drawImage(
              atlas,
              sx,
              sy,
              sw,
              sh,
              -glyphW / 2,
              -glyphH / 2,
              glyphW,
              glyphH,
            );
            ctx.restore();
          } else {
            ctx.drawImage(
              atlas,
              sx,
              sy,
              sw,
              sh,
              cell.x - glyphW / 2,
              cell.y - glyphH / 2,
              glyphW,
              glyphH,
            );
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const buildGrid = () => {
      width = cv.clientWidth;
      if (!width) {
        return;
      }
      height = Math.round(width * 0.30);
      cv.width = width * dpr;
      cv.height = height * dpr;
      cv.style.height = `${height}px`;

      cellW = Math.max(5.5, width / 195);
      const cellH = cellW * 1.5;

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const mx = maskCanvas.getContext("2d");
      if (!mx) {
        return;
      }

      const fontFamily = '"Plus Jakarta Sans", Inter, system-ui, sans-serif';
      mx.font = `800 ${height / WORDMARK_STRETCH}px ${fontFamily}`;
      const scale = width / Math.max(1, mx.measureText(brandWord).width);
      mx.font = `800 ${(height / WORDMARK_STRETCH) * scale * 0.96}px ${fontFamily}`;
      let metrics = mx.measureText(brandWord);
      const baseline = height * 1.02;
      const available = baseline - height * 0.03;
      if (metrics.actualBoundingBoxAscent * WORDMARK_STRETCH > available) {
        const clampedSize =
          ((height / WORDMARK_STRETCH) * scale * 0.96 * available) /
          (metrics.actualBoundingBoxAscent * WORDMARK_STRETCH);
        mx.font = `800 ${clampedSize}px ${fontFamily}`;
        metrics = mx.measureText(brandWord);
      }

      mx.save();
      mx.scale(1, WORDMARK_STRETCH);
      mx.fillText(
        brandWord,
        (width - metrics.width) / 2,
        baseline / WORDMARK_STRETCH,
      );
      mx.restore();

      const data = mx.getImageData(0, 0, width, height).data;
      const nextCells: Array<GlyphCell> = [];

      for (let y = 0; y < height; y += cellH) {
        for (let x = 0; x < width; x += cellW) {
          let sumAlpha = 0;
          let samples = 0;
          for (let yy = 0; yy < cellH; yy += 2) {
            for (let xx = 0; xx < cellW; xx += 2) {
              const qx = Math.floor(x + xx);
              const qy = Math.floor(y + yy);
              if (qx < width && qy < height) {
                sumAlpha += data[(qy * width + qx) * 4 + 3] ?? 0;
                samples += 1;
              }
            }
          }
          const cov = samples > 0 ? sumAlpha / samples / 255 : 0;
          if (cov < 0.04) {
            continue;
          }
          const idx = nextCells.length;
          const gi = Math.min(
            RAMP.length - 1,
            Math.round(cov * (RAMP.length - 1)),
          );
          nextCells.push({
            x: x + cellW / 2,
            y: y + cellH / 2,
            cov,
            gi,
            heat: 0,
            // Fast 0-40ms delay so hovering across KRAVE reacts instantly
            delay: pseudoRandom(idx) * 0.04,
            seed: pseudoRandom(idx + 7),
            wait: 0,
          });
        }
      }

      cells = nextCells;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glyphW = Math.ceil(cellW * 1.4);
      glyphH = Math.ceil(cellH * 1.15);
      atlasKey = "";
      live.dirty = true;
      drawFrame(performance.now());
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || live.reduced) {
        return;
      }
      const rect = cv.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      inside = true;
      live.dirty = true;
    };

    const handlePointerLeave = () => {
      inside = false;
      pointerX = -1e4;
      pointerY = -1e4;
    };

    const loop = (timestamp: number) => {
      if (!alive) {
        return;
      }
      drawFrame(timestamp);
      rafId = window.requestAnimationFrame(loop);
    };

    buildGrid();
    if (!live.reduced) {
      rafId = window.requestAnimationFrame(loop);
    }

    cv.addEventListener("pointermove", handlePointerMove);
    cv.addEventListener("pointerleave", handlePointerLeave);

    const ro = new ResizeObserver(() => {
      if (alive) {
        buildGrid();
      }
    });
    ro.observe(cv);

    const onFontsDone = () => {
      if (alive) {
        buildGrid();
      }
    };
    document.fonts?.addEventListener?.("loadingdone", onFontsDone);

    return () => {
      alive = false;
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", onFontsDone);
      cv.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const fireCanvasRipple = () => {
    const cv = canvasRef.current;
    const toggleButton = toggleBtnRef.current;
    if (cv && !shouldReduceMotion) {
      const cr = cv.getBoundingClientRect();
      const tr = toggleButton
        ? toggleButton.getBoundingClientRect()
        : ({
            left: cr.right - 40,
            top: cr.top - 40,
            width: 0,
            height: 0,
          } as DOMRect);
      const ox = tr.left + tr.width / 2 - cr.left;
      const oy = tr.top + tr.height / 2 - cr.top;
      liveRef.current.ox = ox;
      liveRef.current.oy = oy;
      liveRef.current.maxR =
        Math.max(
          Math.hypot(ox, oy - cr.height),
          Math.hypot(ox - cr.width, oy - cr.height),
          Math.hypot(ox, oy),
          Math.hypot(ox - cr.width, oy),
        ) + 170;
      liveRef.current.tStart = performance.now() + 16;
      liveRef.current.dirty = true;
    }
  };

  const handleDarkKitchenToggle = () => {
    fireCanvasRipple();

    // If dark mode is already on, smoothly toggle back to warm daylight!
    if (theme === "dark") {
      setTheme("light");
      setPopoverOpen(false);
      toast.add({
        type: "success",
        title: isAr ? "رجعنا لضوء النهار" : "Back to sunlit service",
        description: isAr
          ? "شارع 9 في المعادي منور تاني."
          : "Road 9 daylight restored.",
      });
      return;
    }

    const nextAttempt = jokeAttempts + 1;
    setJokeAttempts(nextAttempt);

    if (nextAttempt < 3) {
      setShakeTick((tick) => tick + 1);
      setPopoverOpen(true);
      return;
    }

    // CLICK #3: Actually switches into eye-friendly Soft Charcoal Dark Mode!
    setPopoverOpen(false);
    setTheme("dark");
    toast.add({
      type: "success",
      title: isAr ? "خلاص كسبت! أهلا بالشيفت الليلي" : "Fine, you win. Night Service ON.",
      description: isAr
        ? "الوضع الداكن المريح للعين شغال دلوقتي."
        : "Eye-friendly charcoal dark mode activated.",
    });
  };

  const arrowLabel =
    theme === "dark"
      ? isAr
        ? "ارجع للنهار"
        : "Back to daylight"
      : jokeAttempts === 0
        ? isAr
          ? "جرب الوضع الداكن"
          : "Try dark mode"
        : jokeAttempts === 1
          ? isAr
            ? "لسه مصمم على الدارك؟"
            : "Still want dark mode?"
          : isAr
            ? "خلاص.. ضغطة كمان!"
            : "Fine, one more click...";

  const handleOfferSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!offerEmail.trim() || !offerEmail.includes("@")) {
      return;
    }
    joinWaitlist(offerEmail);
    toast.add({
      type: "success",
      title: isAr ? "سجلناك في قائمة التوصيل" : "You're on the Krave list!",
      description: isAr
        ? "هنبعتلك أول ما التوصيل والأبلكيشن يفتحوا."
        : "First dibs on Maadi delivery & secret drops.",
    });
  };

  return (
    <div className="bg-background px-4 pt-8 pb-8 sm:px-6 sm:pb-12">
      {/* Hybrid Kurawa × Stitch Loop × Interactive ASCII `KRAVE` Footer */}
      <footer className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-between overflow-hidden rounded-[36px] border border-border bg-card px-6 pt-10 pb-0 shadow-card-hover sm:px-10 sm:pt-12">
        {/* Stitch Loop Ambient Warm Amber Vermilion Bottom Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-[radial-gradient(65%_100%_at_50%_100%,oklch(0.605_0.21_35/0.20),transparent_76%)] dark:bg-[radial-gradient(65%_100%_at_50%_100%,oklch(0.655_0.20_35/0.24),transparent_76%)]"
        />

        {/* Top Editorial Row: Brand + Single Personality-Packed Cairo Time Pill */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <KraveMark variant="ember" className="size-10" />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                {isAr ? RESTAURANT_BRAND.nameAr : RESTAURANT_BRAND.nameEn}
              </span>
              <span className="text-xs text-muted-foreground">
                {isAr
                  ? "مطبخ نار مفتوحة · شارع 9، المعادي"
                  : "Open-Fire Kitchen · Road 9, Maadi"}
              </span>
            </div>
          </div>

          {/* One concise, soulful Cairo live status badge (Zero redundant address lines!) */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-tint px-4 py-2 text-xs font-medium text-foreground">
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full",
                clock.isOpen
                  ? "bg-primary/14 text-primary"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              <AppIcon
                icon={clock.isOpen ? Sun03Icon : Moon02Icon}
                size={14}
              />
            </span>
            <span>
              {clock.isOpen
                ? isAr
                  ? "الفحم والع الآن في المعادي"
                  : "Embers live in Maadi"
                : isAr
                  ? "بنرتاح لبكرة الضهر"
                  : "Resting until noon"}
            </span>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <bdi
              dir="ltr"
              className="font-mono font-semibold text-foreground tabular-price"
            >
              {clock.formattedTime}
            </bdi>
          </div>
        </div>

        {/* Middle Kurawa-Inspired Editorial Columns + Big Contact + Compact Waitlist Card */}
        <div className="relative z-10 grid grid-cols-1 gap-10 py-10 lg:grid-cols-12">
          {/* Left 7 cols: Slash-Prefixed Navigation + Oversized Contact + Tactile Social Tiles */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="flex flex-col gap-2.5 text-sm">
                <span className="font-mono text-xs text-muted-foreground">
                  {isAr ? "/استكشف" : "/Explore"}
                </span>
                <Link
                  to="/menu"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "المنيو الكامل" : "Full Menu"}
                </Link>
                <Link
                  to="/table"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "احجز أو انضم لترابيزة" : "Floor Plan & Table"}
                </Link>
                <Link
                  to="/track"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "متابعة الأوردر" : "Track Order"}
                </Link>
                <Link
                  to="/about"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "قصتنا" : "Our Story"}
                </Link>
              </div>

              <div className="flex flex-col gap-2.5 text-sm">
                <span className="font-mono text-xs text-muted-foreground">
                  {isAr ? "/الحساب" : "/Guest"}
                </span>
                <Link
                  to="/account"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "حسابي والمفضلة" : "Account & Favorites"}
                </Link>
                <Link
                  to="/kds"
                  className="w-fit font-medium text-foreground transition-colors hover:text-primary"
                >
                  {isAr ? "شاشة المطبخ (KDS)" : "Kitchen Pass (KDS)"}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {isAr ? RESTAURANT_BRAND.hoursAr : RESTAURANT_BRAND.hoursEn}
                </span>
              </div>

              <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {isAr ? "/النظام" : "/Platform"}
                </span>
                <Link
                  to="/kds"
                  className="inline-flex w-fit items-center gap-2.5 rounded-2xl border border-border bg-surface-tint px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  <FlameLinkMark variant="mark" className="h-5 w-auto" />
                  <span>
                    {isAr
                      ? PLATFORM_BRAND.poweredByAr
                      : PLATFORM_BRAND.poweredByEn}
                  </span>
                </Link>
              </div>
            </div>

            {/* Kurawa-Style Bold Editorial Contact + Hover-Fill Social Buttons */}
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border/70 pt-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {isAr ? "/تواصل معنا" : "/Get in touch"}
                </span>
                <a
                  href="mailto:hello@krave.eg"
                  className="text-2xl font-extrabold tracking-[-0.04em] text-foreground transition-colors hover:text-primary sm:text-3xl"
                >
                  hello@krave.eg
                </a>
                <bdi
                  dir="ltr"
                  className="w-fit font-mono text-sm font-semibold text-muted-foreground tabular-price"
                >
                  {RESTAURANT_BRAND.phoneDisplay}
                </bdi>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { label: "Instagram", icon: InstagramIcon },
                  { label: "X", icon: NewTwitterIcon },
                  { label: "TikTok", icon: TiktokIcon },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#top"
                    onClick={(event) => {
                      event.preventDefault();
                      toast.add({
                        type: "info",
                        title: `@krave.maadi · ${social.label}`,
                        description: isAr
                          ? "تابع يوميات النار المفتوحة في المعادي."
                          : "Daily open-fire drops from Maadi.",
                      });
                    }}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-[background-color,color,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <AppIcon icon={social.icon} size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 cols: Kurawa-Style Compact Secret Drops / Delivery Waitlist Card */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-border bg-surface-tint p-5 sm:p-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  {isAr ? (
                    <>
                      <span className="text-primary">عروض خاصة</span> وأولوية
                      التوصيل
                    </>
                  ) : (
                    <>
                      <span className="text-primary">Get Special Drops</span> &
                      Maadi Delivery Early Access
                    </>
                  )}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {isAr
                    ? "سجل إيميلك لأولوية تجربة توصيل كريف والأبلكيشن الجديد."
                    : "Join our waitlist for free first delivery when the Krave app launches."}
                </p>
              </div>

              <form
                onSubmit={handleOfferSubmit}
                className="flex flex-col gap-2.5"
              >
                <Input
                  type="email"
                  required
                  value={offerEmail}
                  onChange={(event) => setOfferEmail(event.target.value)}
                  placeholder={isAr ? "بريدك الإلكتروني" : "you@example.com"}
                  className="h-10 rounded-xl bg-background"
                />
                <Button
                  type="submit"
                  className="h-10 w-full rounded-xl bg-foreground font-semibold text-background hover:bg-foreground/90"
                >
                  {waitlistEmail
                    ? isAr
                      ? "تم التسجيل — هتسمع مننا قريب"
                      : "You're on the list!"
                    : isAr
                      ? "سجلني معاكم"
                      : "Count me in!"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Hairline Control Row + Hand-Drawn Curved Arrow + 3-Click Dark Kitchen Joke */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>
            © 2026 {isAr ? RESTAURANT_BRAND.nameAr : RESTAURANT_BRAND.nameEn}
          </span>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                })
              }
            >
              <span>{isAr ? "للأعلى" : "Back to top"}</span>
              <AppIcon icon={ArrowUp01Icon} size={14} />
            </Button>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <motion.div
                key={shakeTick}
                ref={toggleAnchorRef}
                animate={
                  shouldReduceMotion || shakeTick === 0
                    ? undefined
                    : { x: [0, -8, 8, -5, 5, 0] }
                }
                transition={{ duration: 0.36, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                {/* Hand-Drawn Curved Arrow + Dynamic Escalating Joke Prompt */}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                  <span>{arrowLabel}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 28 16"
                    fill="none"
                    className="h-3.5 w-6 text-primary rtl:-scale-x-100"
                  >
                    <path
                      d="M2 12C9 12 16 10 23 4M23 4L18 3.8M23 4L22.2 9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <button
                  ref={toggleBtnRef}
                  type="button"
                  role="switch"
                  aria-checked={theme === "dark"}
                  aria-label={arrowLabel}
                  onClick={handleDarkKitchenToggle}
                  className={cn(
                    "relative flex h-8 w-[58px] shrink-0 items-center rounded-full border p-0.5 transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
                    theme === "dark"
                      ? "border-primary/50 bg-primary/20"
                      : "border-border bg-secondary hover:bg-secondary/80",
                  )}
                >
                  <motion.span
                    key={`${shakeTick}-${theme}`}
                    animate={
                      theme === "dark"
                        ? { x: isAr ? -24 : 24 }
                        : shouldReduceMotion || shakeTick === 0
                          ? { x: 0 }
                          : { x: [0, isAr ? -16 : 16, 0] }
                    }
                    transition={{ duration: 0.42, ease: [0.34, 1.3, 0.5, 1] }}
                    className={cn(
                      "flex size-6.5 items-center justify-center rounded-full shadow-sm",
                      theme === "dark"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-primary",
                    )}
                  >
                    <AppIcon
                      icon={theme === "dark" ? Moon02Icon : Sun03Icon}
                      size={14}
                    />
                  </motion.span>
                </button>
              </motion.div>

              <PopoverContent
                anchor={toggleAnchorRef}
                side="top"
                align="end"
                sideOffset={12}
                className="w-80 rounded-3xl p-4"
              >
                <PopoverHeader>
                  <PopoverTitle>
                    {jokeAttempts === 1
                      ? isAr
                        ? "إحنا مش دارك كيتشن!"
                        : "Not a dark kitchen!"
                      : isAr
                        ? "لسه بتحاول تطفي النور؟"
                        : "Still trying to dim the grill?"}
                  </PopoverTitle>
                  <PopoverDescription>
                    {jokeAttempts === 1
                      ? isAr
                        ? "كريف مطعم حقيقي منور في شارع 9 المعادي، مش كلاود كيتشن مستخبي في بدروم! الوضع الداكن للمطبخ فقط."
                        : "Krave is a real sunlit dining room on Road 9, Maadi — not a mysterious ghost kitchen in a basement."
                      : isAr
                        ? "صاج السماش الـ 250 درجة ملهوش زرار دارك مود... بس اضغط مرة تالتة وشوف هيحصل إيه."
                        : "Our 250°C cast-iron doesn't even come with a dimmer switch... though one more click might change my mind."}
                  </PopoverDescription>
                </PopoverHeader>
                <div className="pt-2">
                  <Link
                    to="/kds"
                    onClick={() => setPopoverOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full",
                    )}
                  >
                    <span>
                      {isAr ? "شوف شاشة المطبخ" : "Visit Kitchen Pass"}
                    </span>
                    <AppIcon
                      icon={ArrowUpRight01Icon}
                      data-icon="inline-end"
                      mirrorInRtl
                    />
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Full-Width 60fps Interactive Amber-Vermilion Hover ASCII Wordmark */}
        <div className="relative z-10 -mx-6 mt-4 sm:-mx-10">
          <canvas
            ref={canvasRef}
            aria-label={RESTAURANT_BRAND.nameEn}
            role="img"
            className="block w-full cursor-crosshair touch-pan-y"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%]"
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(1.5px)",
                WebkitBackdropFilter: "blur(1.5px)",
                maskImage: "linear-gradient(transparent 0%, #000 55%)",
                WebkitMaskImage: "linear-gradient(transparent 0%, #000 55%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                maskImage: "linear-gradient(transparent 45%, #000 100%)",
                WebkitMaskImage: "linear-gradient(transparent 45%, #000 100%)",
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
