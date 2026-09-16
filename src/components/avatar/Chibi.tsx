import { motion } from "framer-motion";

export type ChibiPose =
  | "cute-sitting"
  | "study-vibes"
  | "coding"
  | "headphones"
  | "night-coding"
  | "happy-wink";

export type ChibiStyle = "color" | "sketch";

interface ChibiProps {
  pose: ChibiPose;
  chibiStyle?: ChibiStyle;
  hoodie?: string;
  className?: string;
  animated?: boolean;
}

const SKIN = "#EBBB8C";
const HAIR = "#4A3728";
const DENIM = "#9AA6C4";
const INK = "#2B2438";
const BLUSH = "#E8A6A0";

/**
 * Shared chibi silhouette. All poses reuse the same head/hair/body rig and
 * differ only in limb placement + accessories, so the character reads as
 * one consistent person across the site. `chibiStyle="sketch"` renders the
 * identical geometry as loose line art for the hero's sketch -> color reveal.
 */
export function Chibi({
  pose,
  chibiStyle = "color",
  hoodie = "#B08BBB",
  className,
  animated = true,
}: ChibiProps) {
  const sketch = chibiStyle === "sketch";
  const line = sketch ? "#8b8296" : "none";
  const skinFill = sketch ? "none" : SKIN;
  const hairFill = sketch ? "none" : HAIR;
  const hoodieFill = sketch ? "none" : hoodie;
  const denimFill = sketch ? "none" : DENIM;
  const strokeProps = sketch
    ? { stroke: line, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
    : {};

  return (
    <svg
      viewBox="0 0 260 320"
      className={className}
      role="img"
      aria-label={`Illustration of Gauri, ${pose.replace("-", " ")} pose`}
    >
      {/* hair — back layer */}
      <path
        d="M63 128 C55 95 78 48 130 46 C182 48 205 95 197 128
           C202 165 196 225 186 262 C182 245 178 220 176 200
           C176 235 172 262 166 270 L156 268 C160 235 160 205 156 185
           C154 220 150 248 142 262 L128 260 C134 232 134 200 128 178
           C124 205 118 235 108 258 L96 256 C102 232 104 205 100 182
           C96 210 88 238 80 258 C72 225 66 165 63 128 Z"
        fill={hairFill}
        {...strokeProps}
      />

      {/* body / hoodie */}
      <g>
        {/* left leg (viewer's left) */}
        <path
          d="M96 232 Q70 244 66 268 Q64 282 78 284 Q96 286 110 274 Q120 266 116 250 Z"
          fill={denimFill}
          {...strokeProps}
        />
        {/* right leg */}
        <path
          d="M164 232 Q190 244 194 268 Q196 282 182 284 Q164 286 150 274 Q140 266 144 250 Z"
          fill={denimFill}
          {...strokeProps}
        />
        {/* sneakers */}
        <ellipse cx="80" cy="282" rx="17" ry="9" fill={sketch ? "none" : "#FBF7F2"} {...strokeProps} />
        <ellipse cx="180" cy="282" rx="17" ry="9" fill={sketch ? "none" : "#FBF7F2"} {...strokeProps} />

        {/* torso */}
        <path
          d="M92 168 Q90 150 130 150 Q170 150 168 168 L172 244 Q172 262 130 264 Q88 262 88 244 Z"
          fill={hoodieFill}
          {...strokeProps}
        />
        {/* hoodie pocket */}
        {!sketch && (
          <path
            d="M106 220 Q130 232 154 220 L152 238 Q130 248 108 238 Z"
            fill="rgba(43,36,56,0.08)"
          />
        )}
        {/* drawstrings */}
        <line x1="122" y1="168" x2="120" y2="196" stroke={sketch ? line : "#FBF7F2"} strokeWidth="3" strokeLinecap="round" />
        <line x1="138" y1="168" x2="140" y2="196" stroke={sketch ? line : "#FBF7F2"} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* neck */}
      <rect x="118" y="150" width="24" height="18" fill={skinFill} {...strokeProps} />

      {/* head */}
      <circle cx="130" cy="108" r="60" fill={skinFill} {...strokeProps} />

      {/* ears */}
      <circle cx="72" cy="112" r="9" fill={skinFill} {...strokeProps} />
      <circle cx="188" cy="112" r="9" fill={skinFill} {...strokeProps} />

      {/* face */}
      <PoseFace pose={pose} sketch={sketch} />

      {/* hair — natural side-swept fringe (over head), full forehead coverage, no bald gaps */}
      <path
        d="M66 106 C56 58 88 26 130 26 C172 26 204 58 194 106
           Q190 80 181 71 Q172 62 161 67 Q150 72 139 65
           Q128 58 117 64 Q106 70 95 78 Q84 86 76 93 L68 100 Z"
        fill={hairFill}
        {...strokeProps}
      />
      <path
        d="M60 110 C56 140 58 176 66 208 C58 178 54 142 58 108 Z"
        fill={hairFill}
        {...strokeProps}
      />
      <path
        d="M200 110 C204 140 202 176 194 208 C202 178 206 142 202 108 Z"
        fill={hairFill}
        {...strokeProps}
      />

      {/* small gold jewelry */}
      {!sketch && <circle cx="72" cy="120" r="2.4" fill="var(--color-gold)" />}
      {!sketch && <circle cx="188" cy="120" r="2.4" fill="var(--color-gold)" />}

      <PoseArms pose={pose} skinFill={skinFill} hoodieFill={hoodieFill} strokeProps={strokeProps} />
      <PoseProps pose={pose} sketch={sketch} animated={animated} />
    </svg>
  );
}

function PoseFace({ pose, sketch }: { pose: ChibiPose; sketch: boolean }) {
  const eyesClosed = pose === "headphones";
  const wink = pose === "happy-wink";
  const fill = sketch ? "none" : INK;
  const stroke = sketch ? "#8b8296" : INK;

  return (
    <g>
      {/* blush */}
      <circle cx="96" cy="126" r="10" fill={BLUSH} opacity={sketch ? 0.3 : 0.55} />
      <circle cx="164" cy="126" r="10" fill={BLUSH} opacity={sketch ? 0.3 : 0.55} />

      {/* eyes */}
      {eyesClosed ? (
        <>
          <path d="M100 112 Q108 118 116 112" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M144 112 Q152 118 160 112" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : wink ? (
        <>
          <path d="M100 112 Q108 118 116 112" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="152" cy="110" rx="6.5" ry="9" fill={fill} />
          <circle cx="150" cy="106" r="2" fill="#fff" opacity={sketch ? 0 : 1} />
        </>
      ) : (
        <>
          <ellipse cx="108" cy="110" rx="6.5" ry="9" fill={fill} stroke={sketch ? stroke : "none"} strokeWidth={sketch ? 2 : 0} />
          <ellipse cx="152" cy="110" rx="6.5" ry="9" fill={fill} stroke={sketch ? stroke : "none"} strokeWidth={sketch ? 2 : 0} />
          <circle cx="106" cy="106" r="2" fill="#fff" opacity={sketch ? 0 : 1} />
          <circle cx="150" cy="106" r="2" fill="#fff" opacity={sketch ? 0 : 1} />
        </>
      )}

      {/* mouth */}
      <path d="M118 134 Q130 141 142 134" stroke={stroke} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  );
}

function PoseArms({
  pose,
  skinFill,
  hoodieFill,
  strokeProps,
}: {
  pose: ChibiPose;
  skinFill: string;
  hoodieFill: string;
  strokeProps: Record<string, unknown>;
}) {
  if (pose === "coding" || pose === "cute-sitting") {
    return (
      <g>
        <path d="M96 190 Q76 206 84 226 Q90 236 104 230 L110 208 Z" fill={hoodieFill} {...strokeProps} />
        <path d="M164 190 Q184 206 176 226 Q170 236 156 230 L150 208 Z" fill={hoodieFill} {...strokeProps} />
        <circle cx="92" cy="228" r="9" fill={skinFill} {...strokeProps} />
        <circle cx="168" cy="228" r="9" fill={skinFill} {...strokeProps} />
      </g>
    );
  }
  if (pose === "study-vibes") {
    return (
      <g>
        <path d="M98 190 Q80 210 90 232 Q98 240 110 228 L112 206 Z" fill={hoodieFill} {...strokeProps} />
        <path d="M162 190 Q182 208 172 230 Q164 240 152 228 L150 206 Z" fill={hoodieFill} {...strokeProps} />
        <circle cx="94" cy="230" r="9" fill={skinFill} {...strokeProps} />
        <circle cx="166" cy="230" r="9" fill={skinFill} {...strokeProps} />
      </g>
    );
  }
  if (pose === "headphones") {
    return (
      <g>
        <path d="M100 188 Q118 200 118 220 Q116 234 100 228 L92 204 Z" fill={hoodieFill} {...strokeProps} />
        <path d="M160 188 Q142 200 142 220 Q144 234 160 228 L168 204 Z" fill={hoodieFill} {...strokeProps} />
      </g>
    );
  }
  if (pose === "night-coding") {
    return (
      <g>
        <path d="M94 190 Q74 202 82 222 Q88 232 102 226 L108 206 Z" fill={hoodieFill} {...strokeProps} />
        <path d="M166 190 Q186 202 178 222 Q172 232 158 226 L152 206 Z" fill={hoodieFill} {...strokeProps} />
        <circle cx="90" cy="224" r="9" fill={skinFill} {...strokeProps} />
        <circle cx="170" cy="224" r="9" fill={skinFill} {...strokeProps} />
      </g>
    );
  }
  return (
    <g>
      <path d="M98 190 Q78 204 86 224 Q94 234 106 226 L112 206 Z" fill={hoodieFill} {...strokeProps} />
      <motion.g
        style={{ transformOrigin: "162px 190px" }}
        animate={{ rotate: [0, -18, 0, -18, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
      >
        <path d="M162 190 Q186 172 196 148 Q200 138 190 134 Q182 132 178 142 L162 172 Z" fill={hoodieFill} {...strokeProps} />
        <circle cx="192" cy="138" r="9" fill={skinFill} {...strokeProps} />
      </motion.g>
    </g>
  );
}

function PoseProps({ pose, sketch, animated }: { pose: ChibiPose; sketch: boolean; animated: boolean }) {
  if (sketch) return null;

  if (pose === "cute-sitting") {
    return (
      <g>
        <rect x="86" y="222" width="88" height="54" rx="6" fill="#EDE1DC" stroke={INK} strokeWidth="2" />
        <rect x="94" y="228" width="72" height="38" rx="3" fill="#2B2438" />
        <path d="M124 240 q6 -8 12 0 q6 -8 12 0 q0 10 -12 16 q-12 -6 -12 -16 Z" fill="#E8B24D" opacity="0.9" />
      </g>
    );
  }
  if (pose === "study-vibes") {
    return (
      <g>
        <rect x="72" y="268" width="120" height="14" rx="3" fill="var(--color-gold)" />
        <rect x="80" y="254" width="104" height="14" rx="3" fill="var(--color-accent)" opacity="0.85" />
        <rect x="88" y="240" width="88" height="14" rx="3" fill="#EDE1DC" stroke={INK} strokeWidth="1.5" />
      </g>
    );
  }
  if (pose === "coding") {
    return (
      <g>
        <rect x="82" y="220" width="96" height="58" rx="6" fill="#EDE1DC" stroke={INK} strokeWidth="2" />
        <rect x="90" y="226" width="80" height="40" rx="3" fill="#2B2438" />
        <text x="130" y="252" textAnchor="middle" fontSize="14" fill="var(--color-gold)" fontFamily="var(--font-console)">
          {"</>"}
        </text>
        <rect x="102" y="100" width="56" height="20" rx="8" fill="none" stroke={INK} strokeWidth="3" opacity="0.75" />
        <circle cx="112" cy="110" r="9" fill="rgba(255,255,255,0.35)" stroke={INK} strokeWidth="2.5" />
        <circle cx="148" cy="110" r="9" fill="rgba(255,255,255,0.35)" stroke={INK} strokeWidth="2.5" />
        <line x1="121" y1="110" x2="139" y2="110" stroke={INK} strokeWidth="2.5" />
      </g>
    );
  }
  if (pose === "headphones") {
    return (
      <g>
        <path d="M81 92 Q130 12 179 92" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="72" y="92" width="18" height="30" rx="9" fill="var(--color-accent)" stroke={INK} strokeWidth="2" />
        <rect x="170" y="92" width="18" height="30" rx="9" fill="var(--color-accent)" stroke={INK} strokeWidth="2" />
        {["♪", "♫", "♪"].map((n, i) => (
          <motion.text
            key={i}
            x={56 + i * 76}
            y={60}
            fontSize="20"
            fill="var(--color-accent)"
            animate={animated ? { y: [60, 30, 60], opacity: [0.3, 1, 0.3] } : undefined}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
          >
            {n}
          </motion.text>
        ))}
      </g>
    );
  }
  if (pose === "night-coding") {
    return (
      <g>
        <rect x="80" y="216" width="100" height="60" rx="6" fill="#1c1830" stroke="#B08BBB" strokeWidth="2" />
        <rect x="88" y="222" width="84" height="42" rx="3" fill="#0f0c1c" />
        <rect x="94" y="230" width="40" height="4" rx="2" fill="#E8B24D" opacity="0.8" />
        <rect x="94" y="240" width="60" height="4" rx="2" fill="#B08BBB" opacity="0.8" />
        <rect x="94" y="250" width="30" height="4" rx="2" fill="#7fd8c9" opacity="0.8" />
        <circle cx="200" cy="70" r="26" fill="#E8B24D" opacity="0.12" />
      </g>
    );
  }
  return null;
}
