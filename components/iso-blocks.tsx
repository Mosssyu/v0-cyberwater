"use client"

/**
 * 等距(isometric)积木动效。
 *  - StageBlocks：每个阶段卡上方对齐的小积木簇，积木逐个「跑动」出现。
 *      stage 0 → 1 个积木（水厂）
 *      stage 1 → 3 个积木（水厂 + 泵站 + 管网）
 *      stage 2 → 河湖 + AI 积木 + 更多虚框积木
 *  - CompleteAssembly：右上角「完成体」堆叠积木塔（厂网河湖 AI 一体化的整体形态）。
 */

type Cube = { a: number; b: number; s: number; dashed?: boolean; ai?: boolean }

function cubeFaces(a: number, b: number, s: number, TW: number, TH: number, H: number) {
  const cx = (a - b) * TW
  const baseY = (a + b) * TH
  const topCY = baseY - (s + 1) * H

  const top = `${cx},${topCY - TH}`
  const right = `${cx + TW},${topCY}`
  const bottom = `${cx},${topCY + TH}`
  const left = `${cx - TW},${topCY}`

  const topFace = `${top} ${right} ${bottom} ${left}`
  const leftFace = `${left} ${bottom} ${cx},${topCY + TH + H} ${cx - TW},${topCY + H}`
  const rightFace = `${bottom} ${right} ${cx + TW},${topCY + H} ${cx},${topCY + TH + H}`
  return { topFace, leftFace, rightFace }
}

function IsoDefs() {
  return (
    <defs>
      <linearGradient id="cube-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.82 0.13 205)" />
        <stop offset="1" stopColor="oklch(0.7 0.15 220)" />
      </linearGradient>
      <linearGradient id="cube-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.5 0.14 235)" />
        <stop offset="1" stopColor="oklch(0.38 0.12 245)" />
      </linearGradient>
      <linearGradient id="cube-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.42 0.13 240)" />
        <stop offset="1" stopColor="oklch(0.3 0.1 250)" />
      </linearGradient>
    </defs>
  )
}

/** 单个等距立方体（实心 / 线框 / AI 线框） */
function Cube({
  c,
  TW,
  TH,
  H,
  index,
  animate,
}: {
  c: Cube
  TW: number
  TH: number
  H: number
  index: number
  animate: boolean
}) {
  const { topFace, leftFace, rightFace } = cubeFaces(c.a, c.b, c.s, TW, TH, H)
  const wire = c.dashed || c.ai

  return (
    <g
      className={animate ? "iso-pop" : undefined}
      style={animate ? { animationDelay: `${index * 150}ms` } : undefined}
    >
      {wire ? (
        <>
          <polygon
            points={leftFace}
            fill={c.ai ? "oklch(0.6 0.14 230 / 0.14)" : "oklch(0.5 0.1 235 / 0.06)"}
            stroke={c.ai ? "oklch(0.78 0.13 205 / 0.85)" : "oklch(0.66 0.1 215 / 0.5)"}
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          <polygon
            points={rightFace}
            fill={c.ai ? "oklch(0.45 0.13 240 / 0.14)" : "oklch(0.4 0.1 245 / 0.05)"}
            stroke={c.ai ? "oklch(0.78 0.13 205 / 0.85)" : "oklch(0.6 0.1 220 / 0.45)"}
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          <polygon
            points={topFace}
            fill={c.ai ? "oklch(0.7 0.14 210 / 0.2)" : "oklch(0.6 0.12 210 / 0.08)"}
            stroke={c.ai ? "oklch(0.92 0.1 200 / 0.95)" : "oklch(0.78 0.1 205 / 0.7)"}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </>
      ) : (
        <g style={{ filter: "drop-shadow(0 0 5px oklch(0.8 0.15 210 / 0.5))" }}>
          <polygon points={leftFace} fill="url(#cube-left)" stroke="oklch(0.62 0.13 215 / 0.5)" strokeWidth="0.6" />
          <polygon points={rightFace} fill="url(#cube-right)" stroke="oklch(0.62 0.13 215 / 0.5)" strokeWidth="0.6" />
          <polygon points={topFace} fill="url(#cube-top)" stroke="oklch(0.88 0.1 200 / 0.85)" strokeWidth="0.8" />
        </g>
      )}
    </g>
  )
}

const stageCubes: Cube[][] = [
  // stage 0 —— 水厂（单个）
  [{ a: 0, b: 0, s: 0 }],
  // stage 1 —— 水厂 + 泵站 + 管网（三个）
  [
    { a: 0, b: 0, s: 0 },
    { a: 1, b: 0, s: 0 },
    { a: 0, b: 1, s: 0 },
  ],
  // stage 2 —— 河湖 + AI + 更多虚框积木
  [
    { a: 0, b: 0, s: 0 },
    { a: 1, b: 0, s: 0 },
    { a: 0, b: 1, s: 0 },
    { a: 1, b: 0, s: 1, ai: true }, // AI 线框积木
    { a: 2, b: 0, s: 0, dashed: true },
    { a: 1, b: 1, s: 0, dashed: true },
    { a: 0, b: 0, s: 1, dashed: true },
  ],
]

/** 阶段积木簇：与下方阶段卡对齐，积木逐个跑动出现 */
export function StageBlocks({ stage, active }: { stage: number; active: boolean }) {
  const TW = 15
  const TH = 8.5
  const H = 19
  const cubes = stageCubes[stage] ?? []
  const ordered = [...cubes].sort((c1, c2) => c1.a + c1.b - (c2.a + c2.b) || c1.s - c2.s)

  return (
    <svg
      viewBox="-52 -58 104 96"
      preserveAspectRatio="xMidYMax meet"
      className="h-full w-full overflow-visible"
      style={{ opacity: active ? 1 : 0.4, transition: "opacity .5s ease" }}
      aria-hidden="true"
    >
      <IsoDefs />
      {ordered.map((c, i) => (
        <Cube key={i} c={c} TW={TW} TH={TH} H={H} index={i} animate={active} />
      ))}
    </svg>
  )
}

const assemblyCubes: Cube[] = [
  { a: 0, b: 0, s: 0 },
  { a: 1, b: 0, s: 0 },
  { a: 0, b: 1, s: 0 },
  { a: 1, b: 1, s: 0 },
  { a: 0, b: 0, s: 1 },
  { a: 1, b: 0, s: 1 },
  { a: 0, b: 1, s: 1 },
  { a: 0, b: 0, s: 2 },
  { a: 0, b: 0, s: 3, ai: true }, // 顶部 AI 线框
  { a: 2, b: 0, s: 0, dashed: true },
  { a: 2, b: 0, s: 1, dashed: true },
  { a: -1, b: 0, s: 0, dashed: true },
]

/** 完成体堆叠积木塔（右上角整体形态） */
export function CompleteAssembly() {
  const TW = 19
  const TH = 11
  const H = 25
  const ordered = [...assemblyCubes].sort((c1, c2) => c1.a + c1.b - (c2.a + c2.b) || c1.s - c2.s)

  return (
    <svg
      viewBox="-64 -108 150 180"
      preserveAspectRatio="xMidYMax meet"
      className="iso-float h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <IsoDefs />
      {ordered.map((c, i) => (
        <Cube key={i} c={c} TW={TW} TH={TH} H={H} index={i} animate={false} />
      ))}
    </svg>
  )
}
