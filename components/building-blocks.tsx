"use client"

import { motion, AnimatePresence } from "framer-motion"

export type ModulePalette = { top: string; left: string; right: string; glow: string }

export type ModuleDef = {
  id: string
  label: string
  col: number
  row: number
  palette: ModulePalette
  /** AI 智能体：浮于积木塔上方的智能中枢 */
  float?: boolean
}

// 等距投影参数（viewBox 380 x 360）
const VB_W = 380
const VB_H = 360
const ORIGIN_X = 190
const ORIGIN_Y = 184 // 塔底基准点
const W = 68 // 立方体宽
const QH = W / 4 // 顶面菱形半高 = 17
const H = 40 // 立方体高
const HALF_W = W / 2 // 34
const HALF_TH = W / 4 // 17

// 2×2 占位填充顺序（自底层向上层逐格填充）
const FOOT: [number, number][] = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
]
const PER_LAYER = FOOT.length

// 根据「业务模块索引」分配塔内固定槽位：每层 2×2，自底向上叠层
function towerSlot(index: number) {
  const layer = Math.floor(index / PER_LAYER)
  const [fcol, frow] = FOOT[index % PER_LAYER]
  return {
    layer,
    depth: fcol + frow, // 同层内绘制顺序（小者在后）
    cx: ORIGIN_X + (fcol - frow) * HALF_W,
    cy: ORIGIN_Y + (fcol + frow) * HALF_TH - layer * H,
  }
}

function faces(cx: number, cy: number, w: number, qh: number, h: number) {
  const hw = w / 2
  return {
    top: `${cx},${cy - qh} ${cx + hw},${cy} ${cx},${cy + qh} ${cx - hw},${cy}`,
    left: `${cx - hw},${cy} ${cx},${cy + qh} ${cx},${cy + qh + h} ${cx - hw},${cy + h}`,
    right: `${cx},${cy + qh} ${cx + hw},${cy} ${cx + hw},${cy + h} ${cx},${cy + qh + h}`,
  }
}

export function BuildingBlocks({
  modules,
  activeIds,
  hoveredId,
  onHover,
  onToggle,
}: {
  modules: ModuleDef[]
  activeIds: string[]
  hoveredId: string | null
  onHover: (id: string | null) => void
  onToggle: (id: string) => void
}) {
  const business = modules.filter((m) => !m.float)
  const ai = modules.find((m) => m.float)
  const isActive = (id: string) => activeIds.includes(id)
  const aiActive = ai ? isActive(ai.id) : false

  // 为每个业务模块分配固定塔槽，并按等距画家算法排序（先画底层/后排）
  const slotted = business.map((m, i) => ({ m, slot: towerSlot(i) }))
  const drawn = [...slotted].sort(
    (a, b) => a.slot.layer - b.slot.layer || a.slot.depth - b.slot.depth,
  )

  const hasTower = activeIds.some((id) => business.find((b) => b.id === id))
  // 已选业务模块所达到的最高层
  const activeCount = business.filter((b) => isActive(b.id)).length
  const topActiveLayer = Math.max(0, Math.floor((Math.max(activeCount, 1) - 1) / PER_LAYER))
  // 塔尖收束块：居中，叠于已选塔体之上
  const CAP = { cx: ORIGIN_X, cy: ORIGIN_Y - (topActiveLayer + 1) * H, w: W * 0.74, qh: (W * 0.74) / 4, h: H * 0.82 }
  // AI 晶体浮于塔尖之上
  const AI = { cx: ORIGIN_X, cy: CAP.cy - CAP.h - 8, w: 56, qh: 14, h: 28 }

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="CW-Cloud 积木塔：从 10+ 类水务产品模块中按需选择，自底向上层叠组合为一体化智能运营平台"
    >
      {/* 塔体整体光晕（AI 叠加后增强） */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-700"
        style={{
          width: aiActive ? "70%" : "48%",
          height: aiActive ? "78%" : "56%",
          background: "radial-gradient(circle, oklch(0.7 0.14 210 / 0.42), transparent 70%)",
          opacity: aiActive ? 0.92 : 0.5,
        }}
        aria-hidden="true"
      />

      {/* AI 叠加完成时的整体爆闪反馈 */}
      <AnimatePresence>
        {aiActive && (
          <motion.div
            key="ai-flash"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              width: "82%",
              height: "88%",
              background: "radial-gradient(circle, oklch(0.95 0.1 200 / 0.7), transparent 62%)",
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.55, 1.12, 1.3] }}
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

        {/* 业务模块立方体：激活为实心彩块、未激活为半透明线框，构成完整塔体轮廓 */}
        {drawn.map(({ m, slot }) => {
          const active = isActive(m.id)
          const isHot = hoveredId === m.id
          const dim = hoveredId && !isHot ? 0.35 : 1

          if (!active) {
            // 未激活：塔内空位线框，提示「可加入组合」
            const f = faces(slot.cx, slot.cy, W, QH, H)
            return (
              <g
                key={`ghost-${m.id}`}
                style={{ cursor: "pointer", opacity: dim }}
                onMouseEnter={() => onHover(m.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(m.id)}
              >
                <polygon points={f.left} fill={m.palette.left} fillOpacity={isHot ? 0.32 : 0.07} />
                <polygon points={f.right} fill={m.palette.right} fillOpacity={isHot ? 0.32 : 0.07} />
                <polygon
                  points={f.top}
                  fill={m.palette.top}
                  fillOpacity={isHot ? 0.3 : 0.05}
                  stroke={isHot ? "oklch(0.85 0.12 205 / 0.9)" : "oklch(0.6 0.07 230 / 0.4)"}
                  strokeWidth={isHot ? 1.3 : 0.8}
                  strokeDasharray={isHot ? undefined : "3 3"}
                />
              </g>
            )
          }

          // 激活：实心立方体，自下方升入塔槽
          const f = faces(slot.cx, slot.cy, W, QH, H)
          return (
            <AnimatePresence key={`cube-${m.id}`}>
              <motion.g
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={{ opacity: dim, y: isHot ? -8 : 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.7 }}
                style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                filter="url(#bb-glow)"
                onMouseEnter={() => onHover(m.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(m.id)}
              >
                <polygon points={f.left} fill={m.palette.left} fillOpacity={0.96} />
                <polygon points={f.right} fill={m.palette.right} fillOpacity={0.96} />
                <polygon
                  points={f.top}
                  fill={m.palette.top}
                  stroke={isHot ? "oklch(0.96 0.05 200)" : "oklch(0.9 0.09 200 / 0.75)"}
                  strokeWidth={isHot ? 1.8 : 0.9}
                />
              </motion.g>
            </AnimatePresence>
          )
        })}

        {/* 塔尖收束块：白蓝高亮单块，叠于塔体顶部 */}
        <AnimatePresence>
          {hasTower && (
            <motion.g
              key={`cap-${topActiveLayer}`}
              initial={{ opacity: 0, y: -24, scale: 0.6 }}
              animate={{ opacity: hoveredId ? 0.55 : 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 170, damping: 19, mass: 0.7 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              filter="url(#bb-glow)"
              aria-hidden="true"
            >
              {(() => {
                const f = faces(CAP.cx, CAP.cy, CAP.w, CAP.qh, CAP.h)
                return (
                  <>
                    <polygon points={f.left} fill="oklch(0.62 0.13 245)" fillOpacity={0.97} />
                    <polygon points={f.right} fill="oklch(0.72 0.12 235)" fillOpacity={0.97} />
                    <polygon
                      points={f.top}
                      fill="oklch(0.96 0.03 220)"
                      stroke="oklch(0.99 0.02 210)"
                      strokeWidth={1.4}
                    />
                  </>
                )
              })()}
            </motion.g>
          )}
        </AnimatePresence>

        {/* AI 智能体：塔顶悬浮半透明晶体（持续轻微上下浮动） */}
        {ai && (
          <AnimatePresence>
            {aiActive && (
              <motion.g
                initial={{ opacity: 0, y: -44, scale: 0.5 }}
                animate={{ opacity: hoveredId && hoveredId !== ai.id ? 0.4 : 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -44, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.8 }}
                style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                onMouseEnter={() => onHover(ai.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(ai.id)}
              >
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  filter="url(#bb-glow)"
                >
                  {(() => {
                    const f = faces(AI.cx, AI.cy, AI.w, AI.qh, AI.h)
                    return (
                      <>
                        <polygon points={f.left} fill={ai.palette.left} fillOpacity={0.5} />
                        <polygon points={f.right} fill={ai.palette.right} fillOpacity={0.5} />
                        <polygon
                          points={f.top}
                          fill={ai.palette.top}
                          fillOpacity={0.66}
                          stroke="oklch(0.96 0.05 205)"
                          strokeWidth={1.3}
                        />
                      </>
                    )
                  })()}
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        )}
      </svg>

      {/* 悬停模块标签（仅悬停时显示） */}
      {modules.map((m) => {
        if (hoveredId !== m.id) return null
        let pos: { cx: number; cy: number; qh: number }
        if (m.float) {
          pos = { cx: AI.cx, cy: AI.cy, qh: AI.qh }
        } else {
          const i = business.findIndex((b) => b.id === m.id)
          const s = towerSlot(i < 0 ? 0 : i)
          pos = { cx: s.cx, cy: s.cy, qh: QH }
        }
        return (
          <span
            key={`lbl-${m.id}`}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-accent/60 bg-[oklch(0.16_0.03_245/0.92)] px-2 py-0.5 text-[11px] font-medium leading-none text-foreground backdrop-blur"
            style={{
              left: `${(pos.cx / VB_W) * 100}%`,
              top: `${((pos.cy - pos.qh - 6) / VB_H) * 100}%`,
            }}
          >
            {m.label}
          </span>
        )
      })}
    </div>
  )
}
