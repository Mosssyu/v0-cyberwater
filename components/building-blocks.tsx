"use client"

import { motion, AnimatePresence } from "framer-motion"

export type ModuleId = "waterPlant" | "pumpStation" | "pipeNetwork" | "riverLake" | "aiAgent"

type ModuleDef = {
  label: string
  cx: number
  cy: number
  w: number
  h: number
  top: string
  left: string
  right: string
  glow: string
  from: { x: number; y: number }
  /** 是否为半透明晶体/线框风格（用于 AI 智能体顶部模块） */
  crystal?: boolean
}

// 同一个组合体中每个模块的固定坐标（等距投影，viewBox 320 x 300）
const MODULES: Record<ModuleId, ModuleDef> = {
  // 基础核心：水厂（center-bottom）
  waterPlant: {
    label: "水厂管理",
    cx: 162,
    cy: 184,
    w: 116,
    h: 60,
    top: "#46dced",
    left: "#0d6f9e",
    right: "#1597c0",
    glow: "oklch(0.78 0.13 205)",
    from: { x: -70, y: 40 },
  },
  // 左上叠加：管网
  pipeNetwork: {
    label: "管网管理",
    cx: 106,
    cy: 138,
    w: 78,
    h: 42,
    top: "#3a86e6",
    left: "#143a72",
    right: "#1d5fae",
    glow: "oklch(0.66 0.15 250)",
    from: { x: -80, y: -36 },
  },
  // 右上叠加：泵站
  pumpStation: {
    label: "泵站管理",
    cx: 220,
    cy: 134,
    w: 78,
    h: 42,
    top: "#47b8ff",
    left: "#104a8c",
    right: "#1c74c6",
    glow: "oklch(0.7 0.14 230)",
    from: { x: 84, y: -36 },
  },
  // 外延场景：河湖（back-left 外围）
  riverLake: {
    label: "河湖管理",
    cx: 66,
    cy: 196,
    w: 70,
    h: 38,
    top: "#3ce6b4",
    left: "#0e6f5c",
    right: "#16a585",
    glow: "oklch(0.78 0.14 175)",
    from: { x: -90, y: 26 },
  },
  // 智能中枢：AI 智能体（top-center，浮于组合体上方）
  aiAgent: {
    label: "AI智能体",
    cx: 162,
    cy: 78,
    w: 66,
    h: 36,
    top: "#a9b6ff",
    left: "#3b3fb4",
    right: "#5f6fe6",
    glow: "oklch(0.72 0.16 285)",
    from: { x: 56, y: -64 },
    crystal: true,
  },
}

// 演进步骤：每步只是「增加」新模块，已有模块全部保留
const STEP_MODULES: ModuleId[][] = [
  ["waterPlant"],
  ["waterPlant", "pipeNetwork", "pumpStation"],
  ["waterPlant", "pipeNetwork", "pumpStation", "riverLake", "aiAgent"],
]

// 固定的绘制顺序（画家算法：后绘制者在上层）
const DRAW_ORDER: ModuleId[] = ["pipeNetwork", "pumpStation", "waterPlant", "riverLake", "aiAgent"]

// 连接线：从水厂核心连向各扩展模块
const LINKS: { from: ModuleId; to: ModuleId }[] = [
  { from: "waterPlant", to: "pipeNetwork" },
  { from: "waterPlant", to: "pumpStation" },
  { from: "waterPlant", to: "riverLake" },
  { from: "waterPlant", to: "aiAgent" },
]

function cubeFaces(cx: number, cy: number, w: number, h: number) {
  const hw = w / 2
  const qh = w / 4
  return {
    top: `${cx},${cy - qh} ${cx + hw},${cy} ${cx},${cy + qh} ${cx - hw},${cy}`,
    left: `${cx - hw},${cy} ${cx},${cy + qh} ${cx},${cy + qh + h} ${cx - hw},${cy + h}`,
    right: `${cx},${cy + qh} ${cx + hw},${cy} ${cx + hw},${cy + h} ${cx},${cy + qh + h}`,
  }
}

const VB_W = 320
const VB_H = 300

export function BuildingBlocks({
  step,
  hovered,
  onHover,
}: {
  step: number
  hovered: ModuleId | null
  onHover: (id: ModuleId | null) => void
}) {
  const activeModules = STEP_MODULES[step] ?? STEP_MODULES[0]
  const isActive = (id: ModuleId) => activeModules.includes(id)
  const allComplete = step === 2

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="CW-Cloud 积木式模块组合体：水厂、泵站、管网、河湖、AI 智能体逐步叠加为一体化平台"
    >
      {/* 组合体整体光晕（Step 3 完成时增强） */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-700"
        style={{
          width: allComplete ? "78%" : "52%",
          height: allComplete ? "70%" : "48%",
          background: "radial-gradient(circle, oklch(0.7 0.14 210 / 0.45), transparent 70%)",
          opacity: allComplete ? 0.9 : 0.5,
        }}
        aria-hidden="true"
      />

      {/* Step 3 完成时的整体闪光反馈（一次性爆闪） */}
      <AnimatePresence>
        {allComplete && (
          <motion.div
            key="complete-flash"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              width: "92%",
              height: "82%",
              background: "radial-gradient(circle, oklch(0.95 0.1 200 / 0.75), transparent 62%)",
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0.95, 0], scale: [0.55, 1.12, 1.28] }}
            transition={{ duration: 1.2, times: [0, 0.28, 1], ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <svg
        className="relative h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <filter id="bb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 连接光线（仅两端模块都激活时显示，带流光） */}
        <g>
          {LINKS.map((lk) => {
            const a = MODULES[lk.from]
            const b = MODULES[lk.to]
            const show = isActive(lk.from) && isActive(lk.to)
            return (
              <AnimatePresence key={`${lk.from}-${lk.to}`}>
                {show && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <line
                      x1={a.cx}
                      y1={a.cy + a.w / 4}
                      x2={b.cx}
                      y2={b.cy + b.w / 4}
                      stroke="oklch(0.78 0.13 205 / 0.35)"
                      strokeWidth={1.4}
                    />
                    <line
                      x1={a.cx}
                      y1={a.cy + a.w / 4}
                      x2={b.cx}
                      y2={b.cy + b.w / 4}
                      stroke="oklch(0.85 0.14 200)"
                      strokeWidth={1.6}
                      className="gene-flow"
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            )
          })}
        </g>

        {/* 积木模块（固定绘制顺序，逐个飞入叠加） */}
        {DRAW_ORDER.map((id) => {
          const m = MODULES[id]
          const show = isActive(id)
          const f = cubeFaces(m.cx, m.cy, m.w, m.h)
          const isHot = hovered === id
          const dim = hovered && !isHot ? 0.45 : 1
          const opacityBase = m.crystal ? 0.82 : 1

          return (
            <AnimatePresence key={id}>
              {show && (
                <motion.g
                  initial={{ opacity: 0, x: m.from.x, y: m.from.y, scale: 0.6 }}
                  animate={{
                    opacity: opacityBase * dim,
                    x: 0,
                    y: isHot ? -7 : 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, x: m.from.x, y: m.from.y, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 170, damping: 20, mass: 0.7 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                  filter="url(#bb-glow)"
                  onMouseEnter={() => onHover(id)}
                  onMouseLeave={() => onHover(null)}
                >
                  {/* 左面 / 右面 / 顶面 */}
                  <polygon points={f.left} fill={m.left} fillOpacity={m.crystal ? 0.5 : 0.95} />
                  <polygon points={f.right} fill={m.right} fillOpacity={m.crystal ? 0.5 : 0.95} />
                  <polygon
                    points={f.top}
                    fill={m.top}
                    fillOpacity={m.crystal ? 0.55 : 1}
                    stroke={isHot ? "oklch(0.92 0.06 200)" : "oklch(0.85 0.1 200 / 0.6)"}
                    strokeWidth={isHot ? 1.6 : 0.8}
                  />
                  {/* 顶面高光描边（晶体感） */}
                  <polygon points={f.top} fill="none" stroke="oklch(0.95 0.04 200 / 0.5)" strokeWidth={0.6} />
                </motion.g>
              )}
            </AnimatePresence>
          )
        })}
      </svg>

      {/* 模块标签层（HTML 覆盖，按 viewBox 百分比定位） */}
      {DRAW_ORDER.map((id) => {
        const m = MODULES[id]
        const show = isActive(id)
        const isHot = hovered === id
        return (
          <AnimatePresence key={`label-${id}`}>
            {show && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[10px] font-medium leading-none backdrop-blur transition-colors"
                style={{
                  left: `${(m.cx / VB_W) * 100}%`,
                  top: `${((m.cy - m.w / 4 - 6) / VB_H) * 100}%`,
                  borderColor: isHot ? "oklch(0.8 0.13 200)" : "oklch(0.5 0.08 220 / 0.5)",
                  backgroundColor: isHot ? "oklch(0.7 0.14 210 / 0.22)" : "oklch(0.16 0.03 245 / 0.7)",
                  color: isHot ? "oklch(0.92 0.06 200)" : "oklch(0.86 0.02 230)",
                  zIndex: isHot ? 5 : 2,
                }}
              >
                {m.label}
              </motion.span>
            )}
          </AnimatePresence>
        )
      })}
    </div>
  )
}
