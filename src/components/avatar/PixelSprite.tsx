const COLORS: Record<string, string> = {
  ".": "transparent",
  H: "#4A3728",
  h: "#6B4F38",
  S: "#EBBB8C",
  K: "#2B2438",
  B: "var(--color-accent)",
  D: "#9AA6C4",
  W: "#FBF7F2",
  G: "#E8B24D",
  C: "#141018",
  E: "#39FF6A",
};

const CHILL = [
  "....HHHH....",
  "...HhhhhH...",
  "..HSSSSSSH..",
  ".HSSKSSKSSH.",
  ".HSSSSSSSSH.",
  "..HSSSSSSH..",
  "....HHHHH...",
  "..BBBBBBBB..",
  ".SBBBBBBBBS.",
  ".SBBBBBBBBS.",
  "..BBBBBBBB..",
  "..BBGGGGBB..",
  "..DD....DD..",
  "..DD....DD..",
  "..DD....DD..",
  ".WWW....WWW.",
];

const WAVE = [
  "....HHHH....",
  "...HhhhhH...",
  "..HSSSSSSH..",
  ".HSSKSSKSSHS",
  ".HSSSSSSSSHB",
  "..HSSSSSSHBB",
  "....HHHHH.BB",
  "..BBBBBBBB..",
  ".SBBBBBBBBB.",
  ".SBBBBBBBBB.",
  "..BBBBBBBB..",
  "..BBGGGGBB..",
  "..DD....DD..",
  "..DD....DD..",
  "..DD....DD..",
  ".WWW....WWW.",
];

const WORK = [
  "....HHHH....",
  "...HhhhhH...",
  "..HSSSSSSH..",
  ".HSSKSSKSSH.",
  ".HSSSSSSSSH.",
  "..HSSSSSSH..",
  "....HHHHH...",
  "..BBBBBBBB..",
  ".SBBBBBBBBS.",
  ".SBBBBBBBBS.",
  "..BBBBBBBB..",
  "..BBBBBBBB..",
  "..DD....DD..",
  "..DDCCCCDD..",
  "..DD.EE.DD..",
  ".WWW....WWW.",
];

const SPRITES = { chill: CHILL, wave: WAVE, work: WORK } as const;

interface PixelSpriteProps {
  sprite: keyof typeof SPRITES;
  className?: string;
  cell?: number;
}

/** Hand-authored 13x16 pixel-grid sprites for the console/retro re-skin. */
export function PixelSprite({ sprite, className, cell = 10 }: PixelSpriteProps) {
  const grid = SPRITES[sprite];
  const cols = grid[0].length;
  const rows = grid.length;

  return (
    <svg
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      width={cols * cell}
      height={rows * cell}
      className={`pixelated ${className ?? ""}`}
      role="img"
      aria-label="Pixel-art illustration of Gauri"
    >
      {grid.map((row, y) =>
        [...row].map((ch, x) => {
          if (ch === ".") return null;
          const color = COLORS[ch] ?? "transparent";
          return <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={color} />;
        }),
      )}
    </svg>
  );
}
