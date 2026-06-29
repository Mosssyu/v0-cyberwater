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

/* 流动波形主路径（viewBox 0 0 700 132，preserveAspectRatio=none 横向拉伸铺满） */
const WAVE_PATH =
  "M0,108 C20,104 34,99 50,96 C92,90 112,80 150,72 C198,62 210,50 250,44 C298,38 322,72 350,76 C398,82 414,46 450,40 C500,33 522,74 550,78 C602,82 622,56 650,50 C672,47 686,46 700,45"

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

      {/* ===== 桌面端：波浪能量轨迹 ===== */}
      <div className="relative mt-8 hidden lg:block">
        {/* 波形带 */}
        <div className="relative w-full" style={{ height: BAND_H }}>
          {/* 流动波形主线（SVG） */}
          <svg
            className="absolute inset-0 size-full overflow-visible"
            viewBox={`0 0 700 ${BAND_H}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              {/* 水流蓝主渐变：#00f2fe → #4facfe（两端半透明，中段水脉明亮） */}
              <linearGradient id="cwWaveGrad" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00f2fe" stopOpacity="0.08" />
                <stop offset="0.28" stopColor="#00f2fe" stopOpacity="0.7" />
                <stop offset="0.6" stopColor="#33d6fe" stopOpacity="0.85" />
                <stop offset="1" stopColor="#4facfe" stopOpacity="0.9" />
              </linearGradient>
              {/* 柔性泛光（多层模糊叠加，宽柔光包裹细亮芯，不尖锐） */}
              <filter id="cwWaveGlow" x="-10%" y="-160%" width="120%" height="420%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="wide" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="mid" />
                <feMerge>
                  <feMergeNode in="wide" />
                  <feMergeNode in="mid" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* 柔和外侧光晕（更大扩散，营造水汽弥散感） */}
              <filter id="cwWaveHalo" x="-12%" y="-200%" width="124%" height="500%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              {/* 水滴拖尾渐变（沿运动方向，前端亮、尾端淡） */}
              <linearGradient id="cwCometTail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4facfe" stopOpacity="0" />
                <stop offset="0.6" stopColor="#00f2fe" stopOpacity="0.45" />
                <stop offset="1" stopColor="#aef6ff" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 外侧水汽光晕（最底层，宽而极淡，柔和弥散） */}
            <path
              d={WAVE_PATH}
              stroke="#4facfe"
              strokeOpacity="0.18"
              strokeWidth="11"
              strokeLinecap="round"
              filter="url(#cwWaveHalo)"
            />
            {/* 底层暗轨 */}
            <path d={WAVE_PATH} stroke="#4facfe" strokeOpacity="0.14" strokeWidth="1.4" />

            {/* 上偏移细流光线（水流分层） */}
            <path
              d={WAVE_PATH}
              stroke="#00f2fe"
              strokeOpacity="0.4"
              strokeWidth="0.8"
              strokeLinecap="round"
              transform="translate(0,-4)"
              strokeDasharray="6 22"
              filter="url(#cwWaveGlow)"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-84" dur="2.6s" repeatCount="indefinite" />
            </path>
            {/* 下偏移细流光线 */}
            <path
              d={WAVE_PATH}
              stroke="#4facfe"
              strokeOpacity="0.38"
              strokeWidth="0.8"
              strokeLinecap="round"
              transform="translate(0,4)"
              strokeDasharray="5 26"
              filter="url(#cwWaveGlow)"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-93" dur="3.4s" repeatCount="indefinite" />
            </path>

            {/* 发光主轨（渐变 + 较连续的流动虚线，柔和不尖锐） */}
            <path
              d={WAVE_PATH}
              stroke="url(#cwWaveGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="url(#cwWaveGlow)"
              strokeDasharray="26 8"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-68" dur="2s" repeatCount="indefinite" />
            </path>

            {/* 向右流动的水滴光点 + 拖尾（柔光水滴，源源汇入 2026） */}
            <g opacity="0.9">
              <rect x="-26" y="-1.2" width="26" height="2.4" rx="1.2" fill="url(#cwCometTail)" filter="url(#cwWaveGlow)">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path={WAVE_PATH} />
              </rect>
              <circle r="2.4" fill="#aef6ff" filter="url(#cwWaveGlow)">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path={WAVE_PATH} />
              </circle>
            </g>
            <g opacity="0.78">
              <rect x="-18" y="-0.9" width="18" height="1.8" rx="0.9" fill="url(#cwCometTail)" filter="url(#cwWaveGlow)">
                <animateMotion dur="8s" begin="2s" repeatCount="indefinite" rotate="auto" path={WAVE_PATH} />
              </rect>
              <circle r="1.8" fill="#7fe9ff" filter="url(#cwWaveGlow)">
                <animateMotion dur="8s" begin="2s" repeatCount="indefinite" rotate="auto" path={WAVE_PATH} />
              </circle>
            </g>
            <circle r="1.3" fill="#4facfe" filter="url(#cwWaveGlow)" opacity="0.72">
              <animateMotion dur="10s" begin="4s" repeatCount="indefinite" rotate="auto" path={WAVE_PATH} />
            </circle>

            {/* 轨道粒子（沿曲线附近分��，轻微明灭） */}
            {[
              [60, 102],
              [165, 70],
              [255, 43],
              [352, 78],
              [452, 38],
              [552, 80],
              [648, 49],
              [115, 86],
              [300, 60],
              [500, 56],
            ].map(([px, py], idx) => (
              <circle
                key={idx}
                cx={px}
                cy={py}
                r={idx % 2 === 0 ? 0.9 : 0.7}
                fill="#7fe9ff"
                filter="url(#cwWaveGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.15;0.85;0.15"
                  dur={`${2.4 + (idx % 4) * 0.6}s`}
                  begin={`${(idx % 5) * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* 末端：水流柔和汇入终点（无尖锐箭头，改为呼吸晕散光点） */}
            <g filter="url(#cwWaveGlow)">
              {/* 外层柔光晕（吸纳水流） */}
              <circle cx="694" cy="45.5" r="6" fill="#4facfe" opacity="0.22">
                <animate attributeName="r" values="5;9;5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.28;0.1;0.28" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* 内层亮芯 */}
              <circle cx="694" cy="45.5" r="2.2" fill="#aef6ff" opacity="0.9">
                <animate attributeName="opacity" values="0.65;1;0.65" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>

          {/* 年份 + 节点 + 光柱（HTML 绝对定位，贴合波形） */}
          {milestones.map((m, i) => {
            const y = NODE_Y[i]
            const isActive = i === active
            return (
              <div
                key={m.year}
                className="absolute -translate-x-1/2"
                style={{ left: `${colX(i)}%`, top: 0, bottom: 0 }}
              >
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
                {m.key ? (
                  <span
                    className="cw-beam pointer-events-none absolute left-1/2 -translate-x-1/2 w-px"
                    style={{
                      top: y - 30,
                      height: 24,
                      background: "linear-gradient(to top, oklch(0.85 0.14 205 / 0.85), transparent)",
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
                  {/* 水滴落水般的向外扩散水波纹：重点节点常驻，其余节点选中时触发 */}
                  {m.key || isActive ? <span className="cw-ripple" aria-hidden="true" /> : null}
                  <span
                    className={[
                      "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      m.key ? "size-4 border-accent bg-accent/30 cw-node-breathe" : "size-2.5 border-accent/45 bg-[oklch(0.16_0.03_245)]",
                      isActive && m.key ? "scale-125" : "",
                    ].join(" ")}
                  >
                    {m.key ? <span className="size-1.5 rounded-full bg-[oklch(0.96_0.09_200)]" aria-hidden="true" /> : null}
                  </span>
                </button>

                {/* 连接竖线：从节点向下延伸到带底（重点更亮 + 能量下行 + 粒子） */}
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
                            "linear-gradient(to bottom, oklch(0.85 0.14 205 / 0.9) 0%, oklch(0.85 0.14 205 / 0.9) 45%, transparent 45%, transparent 100%)",
                          filter: "drop-shadow(0 0 4px oklch(0.8 0.14 205 / 0.7))",
                        }
                      : {
                          background: "linear-gradient(to bottom, oklch(0.7 0.1 215 / 0.45), oklch(0.7 0.1 215 / 0.06))",
                        }),
                  }}
                  aria-hidden="true"
                />
                {/* ���点光柱内向下流动的粒子 */}
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
                            backgroundColor: "oklch(0.96 0.08 200)",
                            boxShadow: "0 0 6px 1px oklch(0.85 0.14 205 / 0.9)",
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
