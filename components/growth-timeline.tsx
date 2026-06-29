"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, ArrowRight, ChevronLeft } from "lucide-react"

type Milestone = {
  year: string
  title: string
  desc: string
  /** 重点高亮节点：2018 / 2022 / 2026 */
  key: boolean
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中国首批聚焦“中国智慧水务建设”计算研究院联盟团队，开启布局高级数字化服务。",
    key: false,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    key: false,
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，深度融入头部水务集团运营体系，从技术能力真正进入实战水务运营场景。",
    key: true,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。",
    key: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步建立水务 SaaS 产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。",
    key: true,
  },
  {
    year: "2025",
    title: "智水积木云产品化",
    desc: "构建管理、技术、产品体系重构，沉淀并打造智水云平台，并结合大型项目积累形成高水准产品化能力。",
    key: false,
  },
  {
    year: "2026",
    title: "AI 智能运营平台发布",
    desc: "深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    key: true,
  },
]

const keyIndices = milestones.reduce<number[]>((acc, m, i) => {
  if (m.key) acc.push(i)
  return acc
}, [])

/* 波形带高度（px）；节点在带内的纵向落点（贴合波峰/波谷） */
const BAND_H = 132
const NODE_Y = [96, 72, 44, 76, 40, 78, 50]
/* 7 列中心 x（百分比），与 SVG viewBox x（÷700）一一对应 */
const colX = (i: number) => ((i + 0.5) / milestones.length) * 100

/* ===== 交织水脉：Catmull-Rom 样条 + 多相位正弦偏移，生成相互编织的曲线 ===== */
type Pt = { x: number; y: number }

/* 主水脉锚点（穿过 7 个节点 + 两端，viewBox 0 0 700 132） */
const ANCHORS: [number, number][] = [
  [0, 110],
  [50, 96],
  [150, 72],
  [250, 44],
  [350, 76],
  [450, 40],
  [550, 78],
  [650, 50],
  [700, 46],
]

function sampleSpline(anchors: [number, number][], perSeg = 18): Pt[] {
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

/* 在主水脉基础上叠加正弦垂直偏移，得到相互交织（异相则交叉）的辅流线 */
function strandPath(amp: number, phase: number, freq: number): string {
  const pts = BASE_PTS.map((p) => ({
    x: p.x,
    y: p.y + amp * Math.sin((freq * p.x) / 700 * Math.PI * 2 + phase) * (0.4 + (0.6 * p.x) / 700),
  }))
  return toPath(pts)
}

const MAIN_PATH = toPath(BASE_PTS)
const STRAND_A = strandPath(5.5, 0, 3.4)
const STRAND_B = strandPath(5.5, Math.PI, 3.4)
const STRAND_C = strandPath(9, Math.PI / 2, 2.5)

/* 液体粒子喷涌：大小/速度/相位错落，沿主水脉非匀速流动 */
const PARTICLES = Array.from({ length: 16 }).map((_, i) => {
  const r = [0.8, 1.3, 1.8, 1.0, 1.5, 0.9][i % 6]
  const dur = 6.4 + (i % 5) * 1.9
  const begin = -(i * 1.05)
  const fill = ["#aef6ff", "#7fe9ff", "#4facfe", "#00f2fe"][i % 4]
  const op = 0.5 + (i % 4) * 0.12
  return { r, dur, begin, fill, op }
})

/* 上升粒子：沿水脉各处从波面向上漂浮并淡出（能量蒸腾感） */
const yAtX = (x: number) => {
  // 在采样点中找最接近 x 的波面 y
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
const RISE_PARTICLES = Array.from({ length: 26 }).map((_, i) => {
  const x = 18 + (664 / 26) * i + ((i * 53) % 17) - 8
  const baseY = yAtX(x)
  const rise = 26 + ((i * 37) % 22) // 上升高度
  const r = [0.6, 0.9, 1.2, 0.7][i % 4]
  const dur = 3.4 + ((i * 31) % 28) / 10 // 3.4 ~ 6.1s
  const begin = -((i * 0.47) % dur)
  const fill = ["#aef6ff", "#7fe9ff", "#4facfe"][i % 3]
  const drift = ((i % 5) - 2) * 2.2 // 轻微横向漂移
  return { x, baseY, rise, r, dur, begin, fill, drift }
})

/* 终点水滴四周的水花溅射粒子 */
const SPLASH = [
  { dx: "-15px", dy: "-7px", dur: "2.4s", delay: "0s" },
  { dx: "13px", dy: "-11px", dur: "2.9s", delay: "0.6s" },
  { dx: "17px", dy: "5px", dur: "2.2s", delay: "1.1s" },
  { dx: "-13px", dy: "9px", dur: "3.0s", delay: "0.3s" },
  { dx: "3px", dy: "-17px", dur: "2.6s", delay: "0.9s" },
  { dx: "-5px", dy: "15px", dur: "3.2s", delay: "1.5s" },
]

export function GrowthTimeline() {
  const [active, setActive] = useState(keyIndices[0])
  const [paused, setPaused] = useState(false)
  const cursorRef = useRef(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      cursorRef.current = (cursorRef.current + 1) % keyIndices.length
      setActive(keyIndices[cursorRef.current])
    }, 3600)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 背景：网格 + 顶部径向冷光 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(70% 80% at 50% 30%, oklch(0.5 0.14 235 / 0.14) 0%, transparent 65%)",
        }}
      />

      {/* 标题区：六边形发光徽章 + 标题 + EVOLUTION + 箭头装饰 */}
      <div className="relative flex items-center gap-3.5 px-1">
        <span className="relative flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
          <span
            className="cw-node-breathe absolute inset-0"
            style={{
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              border: "1.5px solid oklch(0.78 0.14 205 / 0.6)",
              background: "oklch(0.7 0.14 210 / 0.12)",
            }}
          />
          <Activity className="relative size-5 text-accent" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              水务数字化能力演进轨迹
            </h2>
            {/* 递减箭头装饰 */}
            <span className="hidden items-center gap-0.5 sm:flex" aria-hidden="true">
              <ChevronLeft className="size-4 text-accent/80" />
              <ChevronLeft className="size-3.5 text-accent/55" />
              <ChevronLeft className="size-3 text-accent/35" />
            </span>
          </div>
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.35em] text-accent/55">
            Evolution
          </span>
        </div>
      </div>

      {/* ===== 桌面端：交织水脉能量轨迹 ===== */}
      <div className="relative mt-8 hidden lg:block">
        <div className="relative w-full" style={{ height: BAND_H }}>
          {/* 交织水脉（SVG 多轨编织） */}
          <svg
            className="absolute inset-0 size-full overflow-visible"
            viewBox={`0 0 700 ${BAND_H}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              {/* 水流蓝主渐变：#00f2fe → #4facfe */}
              <linearGradient id="cwWaveGrad" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00f2fe" stopOpacity="0.08" />
                <stop offset="0.28" stopColor="#00f2fe" stopOpacity="0.75" />
                <stop offset="0.6" stopColor="#33d6fe" stopOpacity="0.9" />
                <stop offset="1" stopColor="#4facfe" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="cwStrandGrad" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00f2fe" stopOpacity="0.05" />
                <stop offset="0.5" stopColor="#4facfe" stopOpacity="0.6" />
                <stop offset="1" stopColor="#aef6ff" stopOpacity="0.75" />
              </linearGradient>
              {/* 柔性泛光（多层模糊，液体发光感） */}
              <filter id="cwWaveGlow" x="-10%" y="-160%" width="120%" height="420%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="wide" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="mid" />
                <feMerge>
                  <feMergeNode in="wide" />
                  <feMergeNode in="mid" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cwWaveHalo" x="-12%" y="-200%" width="124%" height="500%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              {/* 水滴拖尾渐变 */}
              <linearGradient id="cwCometTail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4facfe" stopOpacity="0" />
                <stop offset="0.6" stopColor="#00f2fe" stopOpacity="0.45" />
                <stop offset="1" stopColor="#aef6ff" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 外侧水汽光晕（最底层，宽柔弥散，细一档） */}
            <path d={MAIN_PATH} stroke="#4facfe" strokeOpacity="0.18" strokeWidth="13" strokeLinecap="round" filter="url(#cwWaveHalo)" />

            {/* —— 交织辅流线 A（与 B 异相，相互穿插交叉） —— */}
            <path
              d={STRAND_A}
              stroke="url(#cwStrandGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="12 16"
              filter="url(#cwWaveGlow)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-84" dur="4.4s" repeatCount="indefinite" />
            </path>
            {/* —— 交织辅流线 B —— */}
            <path
              d={STRAND_B}
              stroke="url(#cwStrandGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="10 20"
              filter="url(#cwWaveGlow)"
              opacity="0.85"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-96" dur="5.6s" repeatCount="indefinite" />
            </path>
            {/* —— 大幅缠绕流线 C（缠绕主脉） —— */}
            <path
              d={STRAND_C}
              stroke="#7fe9ff"
              strokeOpacity="0.5"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="5 26"
              filter="url(#cwWaveGlow)"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-124" dur="6.8s" repeatCount="indefinite" />
            </path>

            {/* —— 主水脉（细一档到 3.5px） —— */}
            <path d={MAIN_PATH} stroke="#0a3a55" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
            <path
              d={MAIN_PATH}
              stroke="url(#cwWaveGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#cwWaveGlow)"
              strokeDasharray="40 10"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="3.8s" repeatCount="indefinite" />
            </path>

            {/* —— 末端箭头（2026 之后，指向右方，引导水流流向终点） —— */}
            <g filter="url(#cwWaveGlow)">
              <path
                d="M689,42 L700,46 L689,50"
                stroke="#aef6ff"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <animate attributeName="opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" />
              </path>
            </g>

            {/* —— 大水滴光点 + 拖尾（源源流动，细一档 + 放慢） —— */}
            <g opacity="0.95">
              <rect x="-30" y="-1.5" width="30" height="3" rx="1.5" fill="url(#cwCometTail)" filter="url(#cwWaveGlow)">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
              </rect>
              <circle r="3" fill="#aef6ff" filter="url(#cwWaveGlow)">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
              </circle>
            </g>
            <g opacity="0.85">
              <rect x="-20" y="-1.1" width="20" height="2.2" rx="1.1" fill="url(#cwCometTail)" filter="url(#cwWaveGlow)">
                <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
              </rect>
              <circle r="2.2" fill="#7fe9ff" filter="url(#cwWaveGlow)">
                <animateMotion dur="12s" begin="3s" repeatCount="indefinite" rotate="auto" path={MAIN_PATH} />
              </circle>
            </g>

            {/* —— 液体粒子喷涌（大小/速度错落，非匀速 spline 流动，波光粼粼） —— */}
            {PARTICLES.map((p, i) => (
              <circle key={i} r={p.r} fill={p.fill} opacity={p.op} filter="url(#cwWaveGlow)">
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

            {/* —— 上升粒子：从波面向上漂浮并淡出（能量蒸腾） —— */}
            {RISE_PARTICLES.map((p, i) => (
              <circle key={`rise-${i}`} cx={p.x} cy={p.baseY} r={p.r} fill={p.fill} filter="url(#cwWaveGlow)">
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

          {/* 年份 + 节点 + 全息底座 + 终点水滴（HTML 绝对定位，贴合波形） */}
          {milestones.map((m, i) => {
            const y = NODE_Y[i]
            const isActive = i === active
            const isLast = i === milestones.length - 1
            /* 悬浮水滴挂在 2026 上方（年份文字上方更高处，避免重叠） */
            const hasDrop = m.year === "2026"
            return (
              <div
                key={m.year}
                className="absolute -translate-x-1/2"
                style={{ left: `${colX(i)}%`, top: 0, bottom: 0 }}
              >
                {/* 悬浮水滴（挂在 2025 上方，取代锐利箭头，四周水花溅射） */}
                {hasDrop ? (
                  <span
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{ top: y - 82 }}
                    aria-hidden="true"
                  >
                    {/* 水花溅射 */}
                    {SPLASH.map((s, si) => (
                      <span
                        key={si}
                        className="cw-splash absolute left-1/2 top-1/2 size-1 rounded-full"
                        style={
                          {
                            backgroundColor: "#aef6ff",
                            boxShadow: "0 0 5px 1px rgb(0 242 254 / 0.9)",
                            ["--dx" as string]: s.dx,
                            ["--dy" as string]: s.dy,
                            ["--sp-dur" as string]: s.dur,
                            ["--sp-delay" as string]: s.delay,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                    {/* 立体发光水滴 */}
                    <span className="cw-drop-float relative block">
                      <svg width="26" height="34" viewBox="0 0 26 34" fill="none" aria-hidden="true">
                        <defs>
                          <radialGradient id="cwDrop" cx="40%" cy="32%" r="70%">
                            <stop offset="0" stopColor="#eafdff" />
                            <stop offset="0.4" stopColor="#7fe9ff" />
                            <stop offset="1" stopColor="#0091ea" />
                          </radialGradient>
                          <filter id="cwDropGlow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="2.4" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <path
                          d="M13 1 C13 1 23 16 23 23 A10 10 0 1 1 3 23 C3 16 13 1 13 1 Z"
                          fill="url(#cwDrop)"
                          filter="url(#cwDropGlow)"
                        />
                        {/* 内部高光 */}
                        <ellipse className="cw-drop-glow" cx="9.5" cy="20" rx="2.6" ry="4" fill="#ffffff" opacity="0.7" />
                      </svg>
                    </span>
                  </span>
                ) : null}

                {/* 年份（节点上方） */}
                <span
                  className={[
                    "absolute left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono font-bold tabular-nums transition-colors duration-300",
                    m.key ? "text-accent" : isActive ? "text-foreground/90" : "text-muted-foreground/70",
                    m.key ? "text-lg" : "text-[13px]",
                  ].join(" ")}
                  style={{ top: y - 14 }}
                >
                  {m.year}
                </span>

                {/* 重点节点上方扫描光柱 */}
                {m.key && !isLast ? (
                  <span
                    className="cw-beam pointer-events-none absolute left-1/2 -translate-x-1/2 w-px"
                    style={{
                      top: y - 30,
                      height: 24,
                      background: "linear-gradient(to top, rgb(127 233 255 / 0.85), transparent)",
                    }}
                    aria-hidden="true"
                  />
                ) : null}

                {/* 节点本体 */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none"
                  style={{ top: y }}
                  aria-pressed={isActive}
                  aria-label={`${m.year} ${m.title}`}
                >
                  {m.key || isActive ? <span className="cw-ripple" aria-hidden="true" /> : null}
                  <span
                    className={[
                      "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      m.key
                        ? "size-4 border-accent bg-accent/30 cw-node-breathe"
                        : "size-2.5 border-accent/45 bg-[oklch(0.16_0.03_245)]",
                      isActive && m.key ? "scale-125" : "",
                    ].join(" ")}
                  >
                    {m.key ? <span className="size-1.5 rounded-full bg-[oklch(0.96_0.09_200)]" aria-hidden="true" /> : null}
                  </span>
                </button>

                {/* 全息光锥（仅重点节点：从卡片顶部向上直射到水脉，上窄下宽） */}
                {m.key ? (
                  <span
                    className="cw-holo-cone pointer-events-none absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: y,
                      height: BAND_H - y,
                      width: 26,
                      clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
                      background: "linear-gradient(to top, rgb(0 242 254 / 0.22), rgb(79 172 254 / 0.05) 70%, transparent)",
                    }}
                    aria-hidden="true"
                  />
                ) : null}

                {/* 连接竖线 */}
                <span
                  className={[
                    "absolute left-1/2 w-px -translate-x-1/2 transition-opacity duration-300",
                    m.key ? "cw-stem-flow" : "",
                    isActive ? "opacity-100" : "opacity-70",
                  ].join(" ")}
                  style={{
                    top: y,
                    height: BAND_H - y,
                    ...(m.key
                      ? {
                          backgroundImage:
                            "linear-gradient(to bottom, rgb(127 233 255 / 0.9) 0%, rgb(127 233 255 / 0.9) 45%, transparent 45%, transparent 100%)",
                          filter: "drop-shadow(0 0 4px rgb(0 242 254 / 0.7))",
                        }
                      : {
                          background: "linear-gradient(to bottom, oklch(0.7 0.1 215 / 0.45), oklch(0.7 0.1 215 / 0.06))",
                        }),
                  }}
                  aria-hidden="true"
                />

                {/* 全息投影底座（仅重点节点：卡片顶部的发光光带） */}
                {m.key ? (
                  <span
                    className="cw-holo-base pointer-events-none absolute left-1/2"
                    style={{
                      bottom: -2,
                      width: 30,
                      height: 7,
                      borderRadius: "50%",
                      background: "radial-gradient(closest-side, rgb(0 242 254 / 0.7), rgb(79 172 254 / 0.18) 60%, transparent)",
                      filter: "blur(0.5px)",
                    }}
                    aria-hidden="true"
                  />
                ) : null}

                {/* 重点光柱内向下流动的粒子 */}
                {m.key ? (
                  <span
                    className="pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 overflow-hidden"
                    style={{ top: y, height: BAND_H - y }}
                    aria-hidden="true"
                  >
                    {[0, 1, 2].map((p) => (
                      <span
                        key={p}
                        className="cw-stem-particle absolute left-1/2 size-1 -translate-x-1/2 rounded-full"
                        style={
                          {
                            backgroundColor: "#eafdff",
                            boxShadow: "0 0 6px 1px rgb(0 242 254 / 0.9)",
                            ["--p-dur" as string]: `${1.6 + p * 0.3}s`,
                            ["--p-delay" as string]: `${p * 0.5}s`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* 卡片行 */}
        <ol className="mt-3 grid grid-cols-7 gap-x-3.5">
          {milestones.map((m, i) => (
            <li key={m.year}>
              <NodeCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
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
            <NodeCard milestone={m} active={i === active} onSelect={() => setActive(i)} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function NodeCard({
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
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border px-3.5 py-3 text-left outline-none transition-all duration-300",
        isKey
          ? active
            ? "border-accent/70 bg-[oklch(0.17_0.04_245)]"
            : "border-accent/45 bg-[oklch(0.15_0.035_246)] hover:border-accent/65"
          : active
            ? "border-accent/40 bg-[oklch(0.15_0.03_246)]"
            : "border-border/60 bg-[oklch(0.14_0.025_247)]/50 hover:border-accent/30",
      ].join(" ")}
      style={
        isKey
          ? {
              boxShadow: active
                ? "0 0 26px -4px oklch(0.78 0.14 205 / 0.6), inset 0 0 18px -10px oklch(0.8 0.14 205 / 0.6)"
                : "0 0 16px -6px oklch(0.78 0.14 205 / 0.4)",
            }
          : undefined
      }
    >
      {/* HUD 边角装饰（仅重点卡片） */}
      {isKey ? (
        <>
          <span className="pointer-events-none absolute left-0 top-0 size-3 border-l border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute right-0 top-0 size-3 border-r border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 left-0 size-3 border-b border-l border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 right-0 size-3 border-b border-r border-accent/60" aria-hidden="true" />
        </>
      ) : null}

      <span
        className={[
          "text-pretty text-[13px] font-semibold leading-snug transition-colors duration-300",
          isKey ? "text-accent" : "text-foreground/85",
        ].join(" ")}
      >
        {milestone.title}
      </span>
      <span className="mt-1.5 block flex-1 text-pretty text-[11px] leading-relaxed text-muted-foreground/85">
        {milestone.desc}
      </span>

      {/* 重点卡片右下角箭头按钮 */}
      {isKey ? (
        <span
          className="mt-2 inline-flex size-6 items-center justify-center self-end rounded-md border border-accent/50 bg-accent/10 text-accent transition-colors group-hover:bg-accent/20"
          aria-hidden="true"
        >
          <ArrowRight className="size-3.5" />
        </span>
      ) : null}
    </button>
  )
}
