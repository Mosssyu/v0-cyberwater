"use client"

/**
 * 等距(isometric)积木体动效。
 * 三组积木分别对应下方三个阶段：
 *   group 0 → 水厂
 *   group 1 → 泵站 + 管网
 *   group 2 → 河湖 + AI 智能体
 * 随 stage(0/1/2) 逐级点亮、升起、发光，并在 stage 2 出现右侧悬浮的 AI 线框积木。
 */

const TW = 26 // tile half width
const TH = 15 // tile half height
const H = 30 // cube height

type CubeDef = { a: number; b: number; s: number; g: number }

// a,b 为等距网格坐标，s 为堆叠层级，g 为所属阶段组
const cubes: CubeDef[] = [
  // group 0 —— 水厂（左下小簇）
  { a: 0, b: 1, s: 0, g: 0 },
  { a: 1, b: 1, s: 0, g: 0 },
  { a: 0, b: 1, s: 1, g: 0 },
  // group 1 —— 泵站 + 管网（中部，较高）
  { a: 1, b: 0, s: 0, g: 1 },
  { a: 2, b: 0, s: 0, g: 1 },
  { a: 1, b: 0, s: 1, g: 1 },
  { a: 1, b: 0, s: 2, g: 1 },
  // group 2 —— 河湖 + AI（右侧高塔）
  { a: 2, b: -1, s: 0, g: 2 },
  { a: 2, b: -1, s: 1, g: 2 },
  { a: 2, b: -1, s: 2, g: 2 },
  { a: 3, b: -1, s: 0, g: 2 },
]

function facesFor(a: number, b: number, s: number) {
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

const groupLabels = [
  { g: 0, text: "水厂", a: 0.5, b: 1, s: 1 },
  { g: 1, text: "泵站·管网", a: 1, b: 0, s: 3 },
  { g: 2, text: "河湖·AI", a: 2, b: -1, s: 3 },
]

export function IsoBlocks({ stage }: { stage: number }) {
  // 绘制顺序：先后(远)后前(近) —— 按 (a+b) 升序, 再按 s 升序
  const ordered = [...cubes].sort((c1, c2) => a_plus_b(c1) - a_plus_b(c2) || c1.s - c2.s)

  return (
    <svg
      viewBox="-90 -60 320 220"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
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

      {ordered.map((c, i) => {
        const { topFace, leftFace, rightFace } = facesFor(c.a, c.b, c.s)
        const active = c.g <= stage
        return (
          <g
            key={i}
            style={{
              opacity: active ? 1 : 0.22,
              transform: active ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1)",
              transitionDelay: active ? `${(c.s) * 90}ms` : "0ms",
              filter: active
                ? "drop-shadow(0 0 6px oklch(0.8 0.15 210 / 0.55))"
                : "none",
            }}
          >
            <polygon
              points={leftFace}
              fill={active ? "url(#cube-left)" : "oklch(0.28 0.04 245)"}
              stroke={active ? "oklch(0.62 0.13 215 / 0.5)" : "oklch(0.35 0.04 245)"}
              strokeWidth="0.6"
            />
            <polygon
              points={rightFace}
              fill={active ? "url(#cube-right)" : "oklch(0.22 0.03 245)"}
              stroke={active ? "oklch(0.62 0.13 215 / 0.5)" : "oklch(0.32 0.04 245)"}
              strokeWidth="0.6"
            />
            <polygon
              points={topFace}
              fill={active ? "url(#cube-top)" : "oklch(0.34 0.05 240)"}
              stroke={active ? "oklch(0.88 0.1 200 / 0.8)" : "oklch(0.4 0.04 240)"}
              strokeWidth="0.8"
            />
          </g>
        )
      })}

      {/* 阶段标签 */}
      {groupLabels.map((l) => {
        const cx = (l.a - l.b) * TW
        const y = (l.a + l.b) * TH - (l.s + 1) * H - TH - 8
        const active = l.g <= stage
        return (
          <text
            key={l.g}
            x={cx}
            y={y}
            textAnchor="middle"
            className="font-sans"
            style={{
              fontSize: 9,
              fontWeight: 600,
              fill: active ? "oklch(0.9 0.07 200)" : "oklch(0.55 0.03 240)",
              opacity: active ? 1 : 0,
              transition: "opacity .5s ease",
            }}
          >
            {l.text}
          </text>
        )
      })}

      {/* stage 2 出现的右侧悬浮 AI 线框积木 + 虚线连接 */}
      {(() => {
        const show = stage >= 2
        const ax = 4.4
        const ay = -1.6
        const { topFace, leftFace, rightFace } = facesFor(ax, ay, 0)
        const fromX = (3 - -1) * TW
        const fromY = (3 + -1) * TH - H
        const toX = (ax - ay) * TW
        const toY = (ax + ay) * TH
        return (
          <g
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity .6s ease .15s, transform .6s ease .15s",
            }}
          >
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="oklch(0.8 0.13 205 / 0.7)"
              strokeWidth="1"
              strokeDasharray="3 4"
              className={show ? "gene-flow" : ""}
            />
            <polygon points={leftFace} fill="oklch(0.5 0.13 230 / 0.12)" stroke="oklch(0.75 0.13 210 / 0.7)" strokeWidth="0.8" />
            <polygon points={rightFace} fill="oklch(0.4 0.12 240 / 0.12)" stroke="oklch(0.75 0.13 210 / 0.7)" strokeWidth="0.8" />
            <polygon points={topFace} fill="oklch(0.7 0.14 210 / 0.18)" stroke="oklch(0.9 0.1 200 / 0.9)" strokeWidth="1" />
          </g>
        )
      })()}
    </svg>
  )
}

function a_plus_b(c: CubeDef) {
  return c.a + c.b
}
