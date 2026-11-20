import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const BAYER: ReadonlyArray<ReadonlyArray<number>> = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const CELL = 3;
const PANEL_WIDTH = 230;
const COLUMNS = Math.ceil(PANEL_WIDTH / CELL);

const DITHER_ROWS =
  "32573863 7245--51 40693459 --53--47 32573863 7245--51 40653459 --537447 32573863 6845--51 40653459 --537047 " +
  "32573863 68457451 40653459 --537047 32573863 68457451 40653459 76537047 32573863 68457451 40653459 --537047 " +
  "32573863 68457451 40653459 --537447 32573863 6845--51 40653459 --537447 32573863 7245--51 40693459 --53--47 " +
  "32573863 7245--51 44693463 --57--47 32573867 --45--51 44733863 --57--51 32613867 --45--55 44--3863 --57--51 " +
  "36614271 --49--55 44--3867 --57--51 366542-- --49--55 44--3871 --61--51 366542-- --49--59 48--3875 --61--55 " +
  "366942-- --49--59 48--42-- --65--55 36--46-- --53--63 48--42-- --69--59 40--46-- --53--63 52--42-- ------59 " +
  "40--46-- --57--67 52--46-- ------63 40--50-- --61---- 56--46-- ------67 44--50-- --61---- 56--50-- -------- " +
  "44--54-- --69---- 60--50-- -------- 48--58-- -------- 64--54-- -------- 48--58-- -------- 72--54-- -------- " +
  "52--66-- -------- ----58-- -------- 56--70-- -------- ----62-- -------- 60------ -------- ----70-- -------- " +
  "64------ -------- -------- -------- 72------";

interface DitherArt {
  readonly levels: ReadonlyArray<string>;
  readonly height: number;
}

function buildDitherArt(): DitherArt {
  const levels: Array<string> = Array.from({ length: 16 }, () => "");
  const lines = DITHER_ROWS.split(" ");

  lines.forEach((line, row) => {
    const y = row * CELL;
    for (let phase = 0; phase < 4; phase += 1) {
      const start = Number.parseInt(line.slice(phase * 2, phase * 2 + 2), 10);
      if (Number.isNaN(start)) {
        continue;
      }
      const level = BAYER[row % 4]?.[phase] ?? 0;
      for (let col = start; col < COLUMNS; col += 4) {
        levels[level] += `M${col * CELL} ${y}h${CELL}v${CELL}h-${CELL}z`;
      }
    }
  });

  return { levels, height: lines.length * CELL };
}

const DITHER_ART = buildDitherArt();

interface DitherGlowProps {
  readonly className?: string;
}

/**
 * Zero-dependency Bayer 4x4 ordered-dither SVG art panel.
 * Styled purely through semantic `--primary` tokens; mirrors cleanly in RTL.
 */
export function DitherGlow({ className }: DitherGlowProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      width={PANEL_WIDTH}
      height={DITHER_ART.height}
      viewBox={`0 0 ${PANEL_WIDTH} ${DITHER_ART.height}`}
      shapeRendering="crispEdges"
      className={cn(
        "pointer-events-none absolute top-0 end-0 select-none fill-primary/65 rtl:-scale-x-100",
        className,
      )}
    >
      {DITHER_ART.levels.map((pathData, level) =>
        pathData ? (
          <motion.path
            key={level}
            d={pathData}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.2, delay: level * 0.03, ease: "easeOut" }
            }
          />
        ) : null,
      )}
    </svg>
  );
}
