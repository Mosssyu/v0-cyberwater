"use client"

import { useEffect, useRef, useState } from "react"
import {
  Activity,
  Star,
  ChevronLeft,
  Building2,
  ShieldCheck,
  Users,
  UserRound,
  Box,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { usePauseOffscreen } from "@/hooks/use-pause-offscreen"

/* =========================================================================
   水务数字化能力演进轨迹 —— 科技能量轨迹视觉组件
   组件分层：
     EvolutionSection  顶层容器（标题 + 轨迹层 + 卡片层 + 移动端）
       ├─ BackgroundGrid   深蓝黑背景 + 科技网格 + 冷光
       ├─ EnergyTrackSvg   SVG 波形能量轨迹（base / glow / animated dash + 流光粒子）
       ├─ TimelineNode     年份标签 / 大小节点 / 能量环 / 光柱 / 2026 水滴
       └─ MilestoneCard    下方里程碑卡片
   ========================================================================= */

type Milestone = {
  year: string
  title: string
  desc: string
  Icon: LucideIcon
  /** 重点高亮节点：2018 / 2022 / 2026 */
  key: boolean
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "首批聚焦“中国智慧水务建设”计算研究院联盟团队，开启布局高级数字化服务。",
    Icon: Building2,
    key: false,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    Icon: ShieldCheck,
    key: false,
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，深度融入头部水务集团运营体系，从技术能力真正进入实战水务运营场景。",
    Icon: Users,
    key: true,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。",
    Icon: UserRound,
    key: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步建立水务 SaaS 产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。",
    Icon: Box,
    key: true,
  },
  {
    year: "2025",
    title: "智水积木云产品化",
    desc: "管理、技术、产品体系重构，沉淀并打造智水云平台，并结合大型项目积累形成高水准产品化能力。",
    Icon: Layers,
    key: false,
  },
  {
    year: "2026",
    title: "AI 智能运营平台发布",
    desc: "深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    Icon: Sparkles,
    key: true,
  },
]

const keyIndices = milestones.reduce<number[]>((acc, m, i) => {
  if (m.key) acc.push(i)
  return acc
}, [])

/* 轨迹带尺寸（viewBox 0 0 700 BAND_H）。节点纵向落点贴合波峰/波谷 */
const BAND_W = 700
const BAND_H = 140
/* 2015 低 → 2018 峰 → 2020 降 → 2022 峰 → 2025 降 → 2026 上扬 */
const NODE_Y = [100, 78, 44, 82, 40, 84, 38]
const colX = (i: number) => ((i + 0.5) / milestones.length) * 100

/* ===== Catmull-Rom 样条：穿过 7 个节点 + 两端，生成平滑波形 ===== */
type Pt = { x: number; y: number }

const ANCHORS: [number, number][] = [
  [0, 114],
  [BAND_W * (0.5 / 7), 100],
  [BAND_W * (1.5 / 7), 78],
  [BAND_W * (2.5 / 7), 44],
  [BAND_W * (3.5 / 7), 82],
  [BAND_W * (4.5 / 7), 40],
  [BAND_W * (5.5 / 7), 84],
  [BAND_W * (6.5 / 7), 38],
  [BAND_W, 30],
]

function sampleSpline(anchors: [number, number][], perSeg = 20): Pt[] {
  const P = anchors.map(([x, y]) => ({ x, y }))
  const n = P.length
  const out: Pt[] = []
  for (let i = 0; i < n - 1; i++) {
    const p0 = P[i - 1] ?? P[i]
    const p1 = P[i]
    const p2 = P[i + 1]
    const p3 = P[i + 2] ?? P[i + 1]
    for (let s = 0; s < perSeg; s++) {
      const t = s / perSeg
      const t2 = t * t
      const t3 = t2 * t
      const x =
        0.5 *
        (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3)
      const y =
        0.5 *
        (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
      out.push({ x, y })
    }
  }
  out.push({ x: P[n - 1].x, y: P[n - 1].y })
  return out
}

const BASE_PTS = sampleSpline(ANCHORS)

function toPath(pts: Pt[]): string {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
}

/* 在主脉基础上叠加正弦垂直偏移，得到相互交织的辅流线 */
function strandPath(amp: number, phase: number, freq: number): string {
  const pts = BASE_PTS.map((p) => ({
    x: p.x,
    y: p.y + amp * Math.sin(((freq * p.x) / BAND_W) * Math.PI * 2 + phase) * (0.4 + (0.6 * p.x) / BAND_W),
  }))
  return toPath(pts)
}

const MAIN_PATH = toPath(BASE_PTS)
const STRAND_A = strandPath(5.5, 0, 3.4)
const STRAND_B = strandPath(5.5, Math.PI, 3.4)

/* 流光粒子：大小/速度/相位错落，沿主脉非匀速流动（性能考量适度精简数量） */
const PARTICLES = Array.from({ length: 6 }).map((_, i) => {
  const r = [0.8, 1.3, 1.8, 1.0, 1.5, 0.9][i % 6]
  const dur = 6.4 + (i % 5) * 1.9
  const begin = -(i * 1.1)
  const fill = ["#aef6ff", "#7fe9ff", "#4facfe", "#00e5ff"][i % 4]
  const op = 0.5 + (i % 4) * 0.12
  return { r, dur, begin, fill, op }
})

/* 上升粒子：从波面向上漂浮并淡出（能量蒸腾感） */
const yAtX = (x: number) => {
  let best = BASE_PTS[0]
  let bestD = Infinity
  for (const p of BASE_PTS) {
    const d = Math.abs(p.x - x)
    if (d < bestD) {
      bestD = d
      best = p
    }
  }
  return best.y
}
const RISE_PARTICLES = Array.from({ length: 8 }).map((_, i) => {
  const x = 18 + (664 / 8) * i + ((i * 53) % 17) - 8
  const baseY = yAtX(x)
  const rise = 24 + ((i * 37) % 22)
  const r = [0.6, 0.9, 1.2, 0.7][i % 4]
  const dur = 3.4 + ((i * 31) % 28) / 10
  const begin = -((i * 0.47) % dur)
  const fill = ["#aef6ff", "#7fe9ff", "#4facfe"][i % 3]
  const drift = ((i % 5) - 2) * 2.2
  return { x, baseY, rise, r, dur, begin, fill, drift }
})

/* 2026 水滴四周的水花溅射 */
const SPLASH = [
  { dx: "-15px", dy: "-7px", dur: "2.4s", delay: "0s" },
  { dx: "13px", dy: "-11px", dur: "2.9s", delay: "0.6s" },
  { dx: "17px", dy: "5px", dur: "2.2s", delay: "1.1s" },
  { dx: "-13px", dy: "9px", dur: "3.0s", delay: "0.3s" },
  { dx: "3px", dy: "-17px", dur: "2.6s", delay: "0.9s" },
  { dx: "-5px", dy: "15px", dur: "3.2s", delay: "1.5s" },
]

/* =========================================================================
   BackgroundGrid —— 深蓝黑背景 + 科技网格 + 顶部冷光
   ========================================================================= */
function BackgroundGrid() {
  return (
    <>
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(70% 80% at 50% 24%, oklch(0.5 0.14 235 / 0.16) 0%, transparent 64%)",
        }}
      />
    </>
  )
}

/* =========================================================================
   EnergyTrackSvg —— SVG 波形能量轨迹
   分层：basePath（细暗底）/ glowPath（宽发光 blur）/ animatedPath（流光 dash）
         + 交织辅流线 + 流光粒子 + 上升粒子
   ========================================================================= */
function EnergyTrackSvg() {
  const svgRef = usePauseOffscreen<SVGSVGElement>()
  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 size-full overflow-visible"
      viewBox={`0 0 ${BAND_W} ${BAND_H}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* 主轨渐变：#00e5ff → #2f8cff */}
        <linearGradient id="etTrackGrad" x1="0" y1="0" x2={BAND_W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00e5ff" stopOpacity="0.1" />
          <stop offset="0.3" stopColor="#00e5ff" stopOpacity="0.85" />
          <stop offset="0.65" stopColor="#33d6fe" stopOpacity="0.95" />
          <stop offset="1" stopColor="#2f8cff" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="etStrandGrad" x1="0" y1="0" x2={BAND_W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00e5ff" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#2f8cff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#aef6ff" stopOpacity="0.8" />
        </linearGradient>
        {/* 流光粒子拖尾 */}
        <linearGradient id="etCometTail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f8cff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#00e5ff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#aef6ff" stopOpacity="0.95" />
        </linearGradient>
        {/* 强发光（轨迹外发光 blur） */}
        <filter id="etGlow" x="-10%" y="-180%" width="120%" height="460%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="wide" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="mid" />
          <feMerge>
            <feMergeNode in="wide" />
            <feMergeNode in="mid" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* 宽幅水汽光晕 */}
        <filter id="etHalo" x="-12%" y="-220%" width="124%" height="540%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ① 外侧水汽光晕（最底层） */}
      <path d={MAIN_PATH} stroke="#2f8cff" strokeOpacity="0.2" strokeWidth="16" strokeLinecap="round" filter="url(#etHalo)" />

      {/* 交织辅流线 A / B（相互穿插交叉） */}
      <path
        d={STRAND_A}
        stroke="url(#etStrandGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="12 16"
        opacity="0.85"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-84" dur="4.6s" repeatCount="indefinite" />
      </path>
      <path
        d={STRAND_B}
        stroke="url(#etStrandGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="10 20"
        opacity="0.8"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-96" dur="5.8s" repeatCount="indefinite" />
      </path>

      {/* ② basePath：细暗底轨迹 */}
      <path d={MAIN_PATH} stroke="#0a3a55" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />

      {/* ③ glowPath：宽发光轨迹（blur 外发光） */}
      <path d={MAIN_PATH} stroke="url(#etTrackGrad)" strokeOpacity="0.45" strokeWidth="9" strokeLinecap="round" filter="url(#etHalo)" />

      {/* ④ animatedPath：流光 dash 动画（光从左向右流动） */}
      <path
        d={MAIN_PATH}
        stroke="url(#etTrackGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="46 12"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-116" dur="7s" repeatCount="indefinite" />
      </path>

      {/* 大流光水滴 + 拖尾（源源向右流动） */}
      <g opacity="0.95">
        <rect x="-30" y="-1.5" width="30" height="3" rx="1.5" fill="url(#etCometTail)" filter="url(#etGlow)">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <circle r="3" fill="#aef6ff" filter="url(#etGlow)">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </circle>
      </g>
      <g opacity="0.85">
        <rect x="-20" y="-1.1" width="20" height="2.2" rx="1.1" fill="url(#etCometTail)" filter="url(#etGlow)">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <circle r="2.2" fill="#7fe9ff" filter="url(#etGlow)">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </circle>
      </g>

      {/* 流光粒子（非匀速 spline 流动，波光粼粼；不加 blur 滤镜以保证流畅） */}
      {PARTICLES.map((p, i) => (
        <circle key={i} r={p.r} fill={p.fill} opacity={p.op}>
          <animateMotion
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
            rotate="auto"
            path={MAIN_PATH}
            calcMode="spline"
            keyTimes="0;1"
            keySplines={i % 2 === 0 ? "0.45 0 0.55 1" : "0.3 0 0.7 1"}
          />
          <animate
            attributeName="opacity"
            values={`0;${p.op};${p.op};0`}
            keyTimes="0;0.12;0.85;1"
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* 上升粒子（能量蒸腾） */}
      {RISE_PARTICLES.map((p, i) => (
        <circle key={`rise-${i}`} cx={p.x} cy={p.baseY} r={p.r} fill={p.fill}>
          <animate
            attributeName="cy"
            values={`${p.baseY};${p.baseY - p.rise}`}
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            values={`${p.x};${p.x + p.drift}`}
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0"
            keyTimes="0;0.3;1"
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values={`${p.r};${(p.r * 0.4).toFixed(2)}`}
            dur={`${p.dur}s`}
            begin={`${p.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

/* =========================================================================
   WaterDrop —— 2026 节点上方蓝色水滴（上下浮动 + glow 呼吸 + 水花溅射）
   ========================================================================= */
function WaterDrop({ top }: { top: number }) {
  return (
    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2" style={{ top }} aria-hidden="true">
      {SPLASH.map((s, si) => (
        <span
          key={si}
          className="cw-splash absolute left-1/2 top-1/2 size-1 rounded-full"
          style={
            {
              backgroundColor: "#aef6ff",
              boxShadow: "0 0 5px 1px rgb(0 229 255 / 0.9)",
              ["--dx" as string]: s.dx,
              ["--dy" as string]: s.dy,
              ["--sp-dur" as string]: s.dur,
              ["--sp-delay" as string]: s.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <span className="cw-drop-float relative block">
        <svg width="28" height="36" viewBox="0 0 26 34" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id="etDrop" cx="40%" cy="32%" r="70%">
              <stop offset="0" stopColor="#eafdff" />
              <stop offset="0.4" stopColor="#7fe9ff" />
              <stop offset="1" stopColor="#0091ea" />
            </radialGradient>
            <filter id="etDropGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M13 1 C13 1 23 16 23 23 A10 10 0 1 1 3 23 C3 16 13 1 13 1 Z"
            fill="url(#etDrop)"
            filter="url(#etDropGlow)"
          />
          <ellipse className="cw-drop-glow" cx="9.5" cy="20" rx="2.6" ry="4" fill="#ffffff" opacity="0.7" />
        </svg>
      </span>
    </span>
  )
}

/* =========================================================================
   TimelineNode —— 年份标签 / 大小节点 / 能量环 / 垂直光柱 / 底座 / 2026 水滴
   ========================================================================= */
function TimelineNode({
  m,
  index,
  active,
  onSelect,
}: {
  m: Milestone
  index: number
  active: boolean
  onSelect: () => void
}) {
  const y = NODE_Y[index]
  const isKey = m.key
  const hasDrop = m.year === "2026"

  return (
    <div className="absolute -translate-x-1/2" style={{ left: `${colX(index)}%`, top: 0, bottom: 0 }}>
      {/* 2026 上方水滴 */}
      {hasDrop ? <WaterDrop top={y - 86} /> : null}

      {/* 年份标签 */}
      <span
        className={[
          "absolute left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono font-bold tabular-nums transition-colors duration-300",
          isKey ? "text-accent" : active ? "text-foreground/90" : "text-muted-foreground/70",
          isKey ? "text-lg" : "text-[13px]",
        ].join(" ")}
        style={{ top: y - 16 }}
      >
        {m.year}
      </span>

      {/* 垂直光柱（仅大节点：从节点向下直射到卡片，上窄下宽光锥） */}
      {isKey ? (
        <span
          className="cw-holo-cone pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: y,
            height: BAND_H - y,
            width: 30,
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            background: "linear-gradient(to top, rgb(0 229 255 / 0.28), rgb(47 140 255 / 0.06) 70%, transparent)",
          }}
          aria-hidden="true"
        />
      ) : null}

      {/* 连接竖线（细脉冲；大节点更亮带流动） */}
      <span
        className={[
          "absolute left-1/2 w-px -translate-x-1/2 transition-opacity duration-300",
          isKey ? "cw-stem-flow" : "",
          active ? "opacity-100" : "opacity-70",
        ].join(" ")}
        style={{
          top: y,
          height: BAND_H - y,
          ...(isKey
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, rgb(127 233 255 / 0.9) 0%, rgb(127 233 255 / 0.9) 45%, transparent 45%, transparent 100%)",
                filter: "drop-shadow(0 0 4px rgb(0 229 255 / 0.7))",
              }
            : {
                background: "linear-gradient(to bottom, oklch(0.7 0.1 215 / 0.45), oklch(0.7 0.1 215 / 0.06))",
              }),
        }}
        aria-hidden="true"
      />

      {/* 节点本体 */}
      <button
        type="button"
        onClick={onSelect}
        className="group absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
        style={{ top: y }}
        aria-pressed={active}
        aria-label={`${m.year} ${m.title}`}
      >
        {/* 大节点：水平透视能量环（多层同心椭圆 + 呼吸） */}
        {isKey ? (
          <>
            <span
              className="cw-node-breathe pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
              style={{
                width: 52,
                height: 18,
                borderColor: "rgb(0 229 255 / 0.55)",
                boxShadow: "0 0 14px -2px rgb(0 229 255 / 0.65), inset 0 0 9px -4px rgb(127 233 255 / 0.7)",
              }}
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
              style={{ width: 34, height: 12, borderColor: "rgb(127 233 255 / 0.7)" }}
              aria-hidden="true"
            />
          </>
        ) : null}

        {/* 圆形水波涟漪：大节点常驻，小节点选中时触发 */}
        {isKey || active ? <span className="cw-ripple" aria-hidden="true" /> : null}

        {/* 中心圆点（大/小） */}
        <span
          className={[
            "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isKey ? "cw-node-breathe size-4 border-accent bg-accent/30" : "size-2.5 border-accent/45 bg-[oklch(0.16_0.03_245)]",
            active && isKey ? "scale-125" : "",
          ].join(" ")}
          style={isKey ? { boxShadow: "0 0 14px 1px rgb(0 229 255 / 0.75)" } : undefined}
        >
          {isKey ? <span className="size-1.5 rounded-full bg-[oklch(0.96_0.09_200)]" aria-hidden="true" /> : null}
        </span>
      </button>

      {/* 底部光盘 + 落点同心水波（仅大节点，光柱落点） */}
      {isKey ? (
        <>
          <span
            className="cw-holo-base pointer-events-none absolute left-1/2"
            style={{
              bottom: 0,
              width: 36,
              height: 9,
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgb(0 229 255 / 0.78), rgb(47 140 255 / 0.18) 60%, transparent)",
              filter: "blur(0.5px)",
            }}
            aria-hidden="true"
          />
          {[0, 1].map((ri) => (
            <span
              key={ri}
              className="cw-disc-ripple pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] border"
              style={
                {
                  width: 28,
                  height: 10,
                  borderColor: "rgb(0 229 255 / 0.55)",
                  ["--rd-delay" as string]: `${ri * 1.3}s`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            />
          ))}
        </>
      ) : null}
    </div>
  )
}

/* =========================================================================
   MilestoneCard —— 下方里程碑卡片（玻璃拟态深色卡片；大节点高亮）
   ========================================================================= */
function MilestoneCard({
  milestone,
  active,
  onSelect,
}: {
  milestone: Milestone
  active: boolean
  onSelect: () => void
}) {
  const isKey = milestone.key
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border px-4 py-3.5 text-left outline-none backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1",
        isKey
          ? active
            ? "border-accent/70 bg-[oklch(0.17_0.04_245)]/80"
            : "border-accent/45 bg-[oklch(0.15_0.035_246)]/70 hover:border-accent/65"
          : active
            ? "border-accent/40 bg-[oklch(0.15_0.03_246)]/65"
            : "border-border/55 bg-[oklch(0.13_0.025_247)]/45 hover:border-accent/30",
      ].join(" ")}
      style={
        isKey
          ? {
              boxShadow: active
                ? "0 0 28px -4px rgb(0 229 255 / 0.55), inset 0 0 18px -10px rgb(0 229 255 / 0.6)"
                : "0 0 18px -6px rgb(0 229 255 / 0.4)",
            }
          : undefined
      }
    >
      {/* HUD 边角（仅大节点卡片） */}
      {isKey ? (
        <>
          <span className="pointer-events-none absolute left-0 top-0 size-3 border-l border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute right-0 top-0 size-3 border-r border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 left-0 size-3 border-b border-l border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 right-0 size-3 border-b border-r border-accent/60" aria-hidden="true" />
        </>
      ) : null}

      {/* 图标 + 标题 */}
      <span className="flex items-center gap-2">
        <span
          className={[
            "inline-flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors duration-300",
            isKey ? "border-accent/55 bg-accent/15 text-accent" : "border-accent/25 bg-accent/[0.06] text-accent/75",
          ].join(" ")}
          style={isKey ? { boxShadow: "0 0 10px -3px rgb(0 229 255 / 0.7)" } : undefined}
          aria-hidden="true"
        >
          <milestone.Icon className="size-4" />
        </span>
        <span
          className={[
            "text-pretty text-[13px] font-semibold leading-snug transition-colors duration-300",
            isKey ? "text-accent" : "text-foreground/85",
          ].join(" ")}
        >
          {milestone.title}
        </span>
      </span>
      <span className="mt-2 block flex-1 text-pretty text-[11px] leading-relaxed text-muted-foreground/85">
        {milestone.desc}
      </span>

      {/* 大节点卡片右下角圆形箭头按钮 */}
      {isKey ? (
        <span
          className="mt-2.5 inline-flex size-6 items-center justify-center self-end rounded-full border border-accent/50 bg-accent/10 text-accent transition-colors group-hover:bg-accent/25"
          aria-hidden="true"
        >
                    <Star className="size-3.5 fill-current" />
        </span>
      ) : null}
    </button>
  )
}

/* =========================================================================
   EvolutionSection —— 顶层容器
   ========================================================================= */
function EvolutionSection() {
  const [active, setActive] = useState(keyIndices[0])
  const [paused, setPaused] = useState(false)
  const [onscreen, setOnscreen] = useState(true)
  const cursorRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  // 离屏暂停自动轮播，避免滚动离开后仍持续重渲染
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => setOnscreen(entries[0]?.isIntersecting ?? true),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !onscreen) return
    const id = setInterval(() => {
      cursorRef.current = (cursorRef.current + 1) % keyIndices.length
      setActive(keyIndices[cursorRef.current])
    }, 3600)
    return () => clearInterval(id)
  }, [paused, onscreen])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BackgroundGrid />

      {/* 标题区：六边形发光徽章 + 标题 + EVOLUTION + 箭头装饰 */}
      <div className="relative flex items-center gap-3.5 px-1">
        <span className="relative flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
          <span
            className="cw-node-breathe absolute inset-0"
            style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              border: "1.5px solid rgb(0 229 255 / 0.6)",
              background: "rgb(0 229 255 / 0.1)",
            }}
          />
          <Activity className="relative size-5 text-accent" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">水务数字化能力演进轨迹</h2>
            <span className="hidden items-center gap-0.5 sm:flex" aria-hidden="true">
              <ChevronLeft className="size-4 text-accent/80" />
              <ChevronLeft className="size-3.5 text-accent/55" />
              <ChevronLeft className="size-3 text-accent/35" />
            </span>
          </div>
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.35em] text-accent/55">Evolution</span>
        </div>
      </div>

      {/* ===== 桌面端：SVG 能量轨迹 + 节点光效 + 卡片 ===== */}
      <div className="relative mt-10 hidden lg:block">
        <div className="relative w-full" style={{ height: BAND_H }}>
          <EnergyTrackSvg />
          {milestones.map((m, i) => (
            <TimelineNode key={m.year} m={m} index={i} active={i === active} onSelect={() => setActive(i)} />
          ))}
        </div>

        {/* 卡片层：留出与轨迹的空间感 */}
        <ol className="mt-9 grid grid-cols-7 gap-x-5">
          {milestones.map((m, i) => (
            <li key={m.year}>
              <MilestoneCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
            </li>
          ))}
        </ol>
      </div>

      {/* ===== 移动端：纵向能量轨迹 ===== */}
      <ol className="relative mt-8 space-y-4 lg:hidden">
        <span
          className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/50 via-accent/30 to-transparent"
          aria-hidden="true"
        />
        {milestones.map((m, i) => (
          <li key={m.year} className="relative pl-7">
            <span
              className={[
                "absolute left-0 top-2 inline-flex items-center justify-center rounded-full border",
                m.key ? "cw-node-breathe size-4 border-accent bg-accent/30" : "size-3 border-accent/45 bg-[oklch(0.16_0.03_245)]",
              ].join(" ")}
              aria-hidden="true"
            >
              {m.key ? <span className="size-1.5 rounded-full bg-[oklch(0.96_0.09_200)]" /> : null}
            </span>
            <MilestoneCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
          </li>
        ))}
      </ol>
    </section>
  )
}

/* 对外保持原导出名，避免影响 hero.tsx 引用 */
export function GrowthTimeline() {
  return <EvolutionSection />
}
