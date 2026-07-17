"use client"

import { useEffect, useRef, useState } from "react"
import {
  Activity,
  ChevronLeft,
  Building2,
  ShieldCheck,
  Users,
  UserRound,
  Box,
  Layers,
  Sparkles,
  Gem,
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
  /** 节点上方短标签（仅核心里程碑使用） */
  short?: string
  title: string
  desc: string
  Icon: LucideIcon
}

/* 顶部核心里程碑：位于能量轨迹上并对应上排大卡（含新增「未来」） */
const coreMilestones: Milestone[] = [
  {
    year: "2018",
    short: "战略入股",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，深度融入头部水务集团运营体系，从技术能力真正进入实战水务运营场景。",
    Icon: Users,
  },
  {
    year: "2022",
    short: "全面对外服务",
    title: "全面对外服务",
    desc: "逐步建立水务 SaaS 产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。",
    Icon: Box,
  },
  {
    year: "2026",
    short: "AI 智能运营发布",
    title: "AI 智能运营平台发布",
    desc: "深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    Icon: Sparkles,
  },
  {
    year: "未来",
    short: "持续创新",
    title: "持续创新 引领未来",
    desc: "以执着、共生、求变持续推动技术与业务创新，构建更智能、更高效、更绿色的水务数字化未来。",
    Icon: Gem,
  },
]

/* 底部次要里程碑：不在轨迹上，横向虚线分隔下方展示 */
const subMilestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中信国安+中国建筑标准院团队，以数字技术推动水务运营管理升级，开启云建标创新发展之路。",
    Icon: Building2,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业双高认证，技术研发能力获得认可。",
    Icon: ShieldCheck,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。",
    Icon: UserRound,
  },
  {
    year: "2025",
    title: "智水积木云产品化",
    desc: "管理、技术、产品体系重构，沉淀并打造智水云平台，并结合大型项目积累形成高水准产品化能力。",
    Icon: Layers,
  },
]

/* 轨迹带尺寸（viewBox 0 0 700 BAND_H）。节点纵向落点贴合波形 */
const BAND_W = 700
const BAND_H = 140
/* 四个核心节点水平位置（百分比）：对齐到下方 grid-cols-4 四张大卡的中心
   （1/8、3/8、5/8、7/8），使节点光柱垂直下贯、精准对准卡片。 */
const NODE_X = [12.5, 37.5, 62.5, 87.5]
/* 轻柔波形：2018 → 2022 微降 → 2026 回升 → 未来 上扬（末端箭头向上） */
const NODE_Y = [58, 66, 50, 42]
const colX = (i: number) => NODE_X[i]

/* ===== Catmull-Rom 样条：穿过 4 个节点 + 两端，生成平滑波形 ===== */
type Pt = { x: number; y: number }

const ANCHORS: [number, number][] = [
  [0, 74],
  ...NODE_X.map((px, i) => [(px / 100) * BAND_W, NODE_Y[i]] as [number, number]),
  [BAND_W, 24],
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
   分层：basePath（细暗底���/ glowPath（宽发光 blur）/ animatedPath（流光 dash）
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

      {/* 大流光水滴 + 拖尾（源源向右流动）
          性能优化：运动元素不挂 blur 滤镜（每帧重算高斯模糊是 GPU 大头），
          改用宽幅低透明度叠加图层模拟辉光，观感接近、开销极低 */}
      <g opacity="0.95">
        {/* 辉光底层：更宽更淡的拖尾 + 大半径光晕圆 */}
        <rect x="-30" y="-3.5" width="30" height="7" rx="3.5" fill="url(#etCometTail)" opacity="0.35">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <rect x="-30" y="-1.5" width="30" height="3" rx="1.5" fill="url(#etCometTail)">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <circle r="6.5" fill="#aef6ff" opacity="0.28">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </circle>
        <circle r="3" fill="#aef6ff">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </circle>
      </g>
      <g opacity="0.85">
        <rect x="-20" y="-2.6" width="20" height="5.2" rx="2.6" fill="url(#etCometTail)" opacity="0.35">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <rect x="-20" y="-1.1" width="20" height="2.2" rx="1.1" fill="url(#etCometTail)">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </rect>
        <circle r="5" fill="#7fe9ff" opacity="0.28">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
        </circle>
        <circle r="2.2" fill="#7fe9ff">
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
   WaterDrop —— 2026 ���点上方蓝色水滴（上下浮动 + glow 呼吸 + 水花溅射）
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
  const hasDrop = m.year === "2026"

  return (
    <div className="absolute -translate-x-1/2" style={{ left: `${colX(index)}%`, top: 0, bottom: 0 }}>
      {/* 2026 上方水滴 */}
      {hasDrop ? <WaterDrop top={y - 86} /> : null}

      {/* 节点上方标签：仅显示年份 */}
      <span
        className="absolute left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center text-center"
        style={{ top: y - 18 }}
      >
        <span
          className={[
            "whitespace-nowrap font-mono text-xl font-bold tabular-nums leading-none transition-colors duration-300",
            active ? "text-accent" : "text-accent/85",
          ].join(" ")}
        >
          {m.year}
        </span>
      </span>

      {/* 连接竖线（脉冲流动） */}
      <span
        className={[
          "cw-stem-flow absolute left-1/2 w-px -translate-x-1/2 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-70",
        ].join(" ")}
        style={{
          top: y,
          height: BAND_H - y,
          backgroundImage:
            "linear-gradient(to bottom, rgb(127 233 255 / 0.9) 0%, rgb(127 233 255 / 0.9) 45%, transparent 45%, transparent 100%)",
          filter: "drop-shadow(0 0 4px rgb(0 229 255 / 0.7))",
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
        {/* 水平透视能量环（多层同心椭圆 + 呼吸） */}
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

        {/* 圆形水波涟漪 */}
        <span className="cw-ripple" aria-hidden="true" />

        {/* 中心圆点 */}
        <span
          className={[
            "cw-node-breathe relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-accent bg-accent/30 transition-all duration-300",
            active ? "scale-125" : "",
          ].join(" ")}
          style={{ boxShadow: "0 0 14px 1px rgb(0 229 255 / 0.75)" }}
        >
          <span className="size-1.5 rounded-full bg-[oklch(0.96_0.09_200)]" aria-hidden="true" />
        </span>
      </button>

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
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border px-4 py-3.5 text-left outline-none backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1",
        active
          ? "border-accent/40 bg-[oklch(0.15_0.03_246)]/65"
          : "border-border/55 bg-[oklch(0.13_0.025_247)]/45 hover:border-accent/30",
      ].join(" ")}
    >
      {/* 图标 + 年份 + 标题 */}
      <span className="flex items-center gap-2">
        <span
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-accent/25 bg-accent/[0.06] text-accent/75 transition-colors duration-300"
          aria-hidden="true"
        >
          <milestone.Icon className="size-4" />
        </span>
        <span className="inline-flex shrink-0 items-center rounded-md border border-accent/45 bg-accent/[0.08] px-2 py-0.5 font-mono text-xs font-bold tabular-nums text-accent">
          {milestone.year}
        </span>
        <span className="text-pretty text-base font-semibold leading-snug text-foreground/90 transition-colors duration-300">
          {milestone.title}
        </span>
      </span>
      <span className="mt-2.5 block flex-1 text-pretty text-sm leading-relaxed text-foreground/75">
        {milestone.desc}
      </span>
    </button>
  )
}

/* =========================================================================
   FeatureCard —— 顶部核心大卡（图标 + 年份 + 标题 + 描述）
   ========================================================================= */
function FeatureCard({ milestone, active, onSelect }: { milestone: Milestone; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "group relative flex w-full items-stretch gap-4 overflow-hidden rounded-2xl border px-6 py-6 text-left outline-none backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-1",
        active ? "border-accent/70 bg-[oklch(0.16_0.04_246)]/80" : "border-accent/40 bg-[oklch(0.14_0.032_247)]/65 hover:border-accent/60",
      ].join(" ")}
      style={{
        boxShadow: active
          ? "0 0 40px -6px rgb(0 229 255 / 0.55), inset 0 0 26px -14px rgb(0 229 255 / 0.7)"
          : "0 0 22px -8px rgb(0 229 255 / 0.42)",
      }}
    >
      {/* HUD 边角 */}
      <span className="pointer-events-none absolute left-0 top-0 size-4 border-l border-t border-accent/60" aria-hidden="true" />
      <span className="pointer-events-none absolute right-0 top-0 size-4 border-r border-t border-accent/60" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 left-0 size-4 border-b border-l border-accent/60" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 right-0 size-4 border-b border-r border-accent/60" aria-hidden="true" />
      {/* 底部氛围光 */}
      <span
        className="pointer-events-none absolute inset-x-6 bottom-0 h-16"
        style={{ background: "radial-gradient(60% 100% at 50% 100%, rgb(0 229 255 / 0.18), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 卡片内容 */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-2.5">
          <span
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent/55 bg-accent/15 text-accent"
            style={{ boxShadow: "0 0 12px -3px rgb(0 229 255 / 0.7)" }}
            aria-hidden="true"
          >
            <milestone.Icon className="size-5" />
          </span>
          <span className="inline-flex items-center rounded-md border border-accent/45 bg-accent/[0.08] px-2 py-0.5 font-mono text-xs font-bold tabular-nums text-accent">
            {milestone.year}
          </span>
        </span>
        <h4 className="mt-3.5 text-pretty text-lg font-bold leading-snug text-foreground">{milestone.title}</h4>
        <span className="mt-2 block flex-1 text-pretty text-[13px] leading-relaxed text-foreground/70">{milestone.desc}</span>
      </div>
    </button>
  )
}

/* =========================================================================
   RowDivider —— 上下两排之间的横向虚线分隔（带节点，不与上方竖直连接）
   ========================================================================= */
function RowDivider() {
  return (
    <div className="relative my-9 h-px" aria-hidden="true">
      {/* 横向虚线 */}
      <span
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 0%, rgb(127 233 255 / 0.4) 8%, rgb(127 233 255 / 0.4) 92%, transparent 100%)",
          backgroundSize: "10px 1px",
          backgroundRepeat: "repeat-x",
          maskImage: "repeating-linear-gradient(to right, #000 0 6px, transparent 6px 12px)",
          WebkitMaskImage: "repeating-linear-gradient(to right, #000 0 6px, transparent 6px 12px)",
          filter: "drop-shadow(0 0 3px rgb(0 229 255 / 0.45))",
        }}
      />
      {/* 四个分隔节点，落在下排四列卡片中心 */}
      {NODE_X.map((leftPct, i) => (
        <span
          key={i}
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 bg-[oklch(0.16_0.03_245)]"
          style={{ left: `${leftPct}%`, boxShadow: "0 0 8px 1px rgb(0 229 255 / 0.55)" }}
        />
      ))}
    </div>
  )
}

/* =========================================================================
   EvolutionSection —— 顶层容器
   ========================================================================= */
function EvolutionSection() {
  const [active, setActive] = useState(0)
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
      cursorRef.current = (cursorRef.current + 1) % coreMilestones.length
      setActive(cursorRef.current)
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

      {/* ===== 桌面端：能量轨迹 + 4 核��节点 → 4 核心大卡 → 横向虚线 → 4 次��卡片 ===== */}
      <div className="hidden lg:block">
        {/* ���量轨迹 + 四个核心节点 */}
        <div className="relative mt-12 w-full" style={{ height: BAND_H }}>
          <EnergyTrackSvg />
          {coreMilestones.map((m, i) => (
            <TimelineNode key={m.year} m={m} index={i} active={i === active} onSelect={() => setActive(i)} />
          ))}
        </div>

        {/* 顶部核心大卡（2018 / 2022 / 2026 / 未来） */}
        <ol className="mt-8 grid grid-cols-4 gap-5">
          {coreMilestones.map((m, i) => (
            <li key={m.year}>
              <FeatureCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
            </li>
          ))}
        </ol>

        {/* 横向虚线分隔（下排不与上排竖直连接） */}
        <RowDivider />

        {/* 底部次要里程碑卡片（2015 / 2016 / 2020 / 2025） */}
        <ol className="grid grid-cols-4 gap-5">
          {subMilestones.map((m) => (
            <li key={m.year}>
              <MilestoneCard milestone={m} active={false} onSelect={() => {}} />
            </li>
          ))}
        </ol>
      </div>

      {/* ===== 移动端：核心大卡 → 横向虚线 → 次要卡片 ===== */}
      <ol className="mt-8 space-y-4 lg:hidden">
        {coreMilestones.map((m, i) => (
          <li key={m.year}>
            <FeatureCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
          </li>
        ))}
      </ol>

      <div className="lg:hidden">
        <RowDivider />
      </div>

      <ol className="space-y-4 lg:hidden">
        {subMilestones.map((m) => (
          <li key={m.year}>
            <MilestoneCard milestone={m} active={false} onSelect={() => {}} />
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
