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

// ---------- 等距投影参数 ----------
const VB_W = 380
const VB_H = 380

const W = 46 // 立方体宽
const QH = W / 4 // 顶面菱形半高 = 11.5
const H = 26 // 立方体高

// 积木塔底层 (0,0) 的锚点（屏幕坐标，顶面中心）
const BASE_X = 190
const BASE_Y = 188

// 塔位 → 屏幕坐标（2x2 footprint，向上叠层）
function towerXY(col: number, row: number, level: number) {
  return {
    x: BASE_X + (col - row) * (W / 2),
    y: BASE_Y + (col + row) * QH - level * H,
  }
}

// 填充顺序：自底层逐层填满，再叠上一层（积木「长高」的观感）
const FILL_SLOTS = [
  { col: 0, row: 0, level: 0 },
  { col: 1, row: 0, level: 0 },
  { col: 0, row: 1, level: 0 },
  { col: 1, row: 1, level: 0 },
  { col: 0, row: 0, level: 1 },
  { col: 1, row: 0, level: 1 },
  { col: 0, row: 1, level: 1 },
  { col: 1, row: 1, level: 1 },
  { col: 0, row: 0, level: 2 },
  { col: 1, row: 1, level: 2 },
]

// 以本地原点 (0,0) 为顶面中心绘制立方体三面
function localFaces(w: number, qh: number, h: number) {
  const hw = w / 2
  return {
    top: `0,${-qh} ${hw},0 0,${qh} ${-hw},0`,
    left: `${-hw},0 0,${qh} 0,${qh + h} ${-hw},${h}`,
    right: `0,${qh} ${hw},0 ${hw},${h} 0,${qh + h}`,
  }
}

const CUBE = localFaces(W, QH, H)

// AI 晶体（浮于塔顶上方）
const AI_X = BASE_X
const AI_Y = BASE_Y - 2 * H - 46
const AI_W = 50
const AI_QH = AI_W / 4
const AI_H = 26
const AI_CUBE = localFaces(AI_W, AI_QH, AI_H)

// 发光底座（全息方形平台）
const PED_CX = BASE_X
const PED_TOP_Y = BASE_Y + QH + H + 6 // 略低于最低立方体底部
const PED_HW = 96 // 半宽
const PED_QH = 48 // 菱形半高
const PED_SLAB = 16 // 平台厚度
const pedTop = `${PED_CX},${PED_TOP_Y - PED_QH} ${PED_CX + PED_HW},${PED_TOP_Y} ${PED_CX},${PED_TOP_Y + PED_QH} ${PED_CX - PED_HW},${PED_TOP_Y}`
const pedLeft = `${PED_CX - PED_HW},${PED_TOP_Y} ${PED_CX},${PED_TOP_Y + PED_QH} ${PED_CX},${PED_TOP_Y + PED_QH + PED_SLAB} ${PED_CX - PED_HW},${PED_TOP_Y + PED_SLAB}`
const pedRight = `${PED_CX},${PED_TOP_Y + PED_QH} ${PED_CX + PED_HW},${PED_TOP_Y} ${PED_CX + PED_HW},${PED_TOP_Y + PED_SLAB} ${PED_CX},${PED_TOP_Y + PED_QH + PED_SLAB}`

// 底座四角向外辐射的数据光束目标点（数字孪生地景节点）
const BEAM_NODES = [
  { x: 40, y: PED_TOP_Y + 30 },
  { x: 340, y: PED_TOP_Y + 30 },
  { x: 70, y: PED_TOP_Y + 86 },
  { x: 312, y: PED_TOP_Y + 86 },
  { x: 150, y: PED_TOP_Y + 104 },
  { x: 250, y: PED_TOP_Y + 104 },
]
const PED_CORNERS = [
  { x: PED_CX - PED_HW, y: PED_TOP_Y },
  { x: PED_CX + PED_HW, y: PED_TOP_Y },
  { x: PED_CX - PED_HW, y: PED_TOP_Y },
  { x: PED_CX + PED_HW, y: PED_TOP_Y },
  { x: PED_CX, y: PED_TOP_Y + PED_QH },
  { x: PED_CX, y: PED_TOP_Y + PED_QH },
]

// 数字孪生地景：散布的发光节点
const LANDSCAPE_DOTS = [
  { x: 56, y: 250, r: 2 },
  { x: 110, y: 286, r: 1.6 },
  { x: 300, y: 244, r: 2.2 },
  { x: 336, y: 292, r: 1.6 },
  { x: 88, y: 320, r: 1.4 },
  { x: 286, y: 322, r: 1.8 },
  { x: 196, y: 332, r: 1.6 },
  { x: 44, y: 296, r: 1.4 },
]

// 未选模块在地景上的陈列位（线框待选块），2 行居中
function shelfXY(i: number) {
  const col = i % 5
  const rowi = Math.floor(i / 5)
  return { x: 78 + col * 58, y: 60 + rowi * 30 + (col % 2) * 5 }
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
  const aiActive = ai ? activeIds.includes(ai.id) : false

  // 激活的业务模块按模块顺序填充塔位
  const activeBusiness = business.filter((m) => activeIds.includes(m.id))
  const placed = activeBusiness.map((m, i) => ({ m, slot: FILL_SLOTS[Math.min(i, FILL_SLOTS.length - 1)] }))
  // 画家算法：先画后排/底层（深度 = col+row，其次 level）
  const drawn = [...placed].sort(
    (a, b) => a.slot.col + a.slot.row - (b.slot.col + b.slot.row) || a.slot.level - b.slot.level,
  )

  // 未选业务模块（陈列于地景）
  const unselected = business.filter((m) => !activeIds.includes(m.id))

  // 任意模块的当前屏幕位（用于悬停标签）
  const labelPos = (id: string): { x: number; y: number } | null => {
    if (ai && id === ai.id) return { x: AI_X, y: AI_Y - AI_QH }
    const p = placed.find((x) => x.m.id === id)
    if (p) {
      const { x, y } = towerXY(p.slot.col, p.slot.row, p.slot.level)
      return { x, y: y - QH }
    }
    const ui = unselected.findIndex((m) => m.id === id)
    if (ui >= 0) {
      const s = shelfXY(ui)
      return { x: s.x, y: s.y - QH }
    }
    return null
  }

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="CW-Cloud 模块池组合体：从 10+ 类水务产品模块中按需选择，自底向上层叠组合为一体化智能运营平台"
    >
      {/* 底座主光晕 */}
      <div
        className="pointer-events-none absolute left-1/2 rounded-full blur-3xl transition-all duration-700"
        style={{
          width: aiActive ? "80%" : "62%",
          height: "30%",
          top: `${(PED_TOP_Y / VB_H) * 100 - 8}%`,
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, oklch(0.72 0.15 210 / 0.55), transparent 70%)",
          opacity: aiActive ? 1 : 0.7,
        }}
        aria-hidden="true"
      />

      {/* AI 叠加完成时的整体爆闪反馈 */}
      <AnimatePresence>
        {aiActive && (
          <motion.div
            key="ai-flash"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              width: "94%",
              height: "80%",
              background: "radial-gradient(circle, oklch(0.95 0.1 200 / 0.6), transparent 62%)",
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.55, 1.12, 1.3] }}
            transition={{ duration: 1.3, times: [0, 0.28, 1], ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <svg className="relative h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          <filter id="bb-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ped-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.92 0.1 200)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="oklch(0.72 0.15 210)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 230)" stopOpacity="0.35" />
          </radialGradient>
          <linearGradient id="ai-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.99 0.02 200)" />
            <stop offset="100%" stopColor="oklch(0.82 0.1 220)" />
          </linearGradient>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.85 0.14 205)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.7 0.14 215)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---------- 数字孪生地景层 ---------- */}
        <g opacity={0.55}>
          {/* 等距网格地面 */}
          {Array.from({ length: 11 }).map((_, i) => {
            const t = i - 5
            return (
              <g key={`grid-${i}`} stroke="oklch(0.6 0.08 225 / 0.18)" strokeWidth={0.6}>
                <line x1={PED_CX + t * 30} y1={PED_TOP_Y - 4} x2={PED_CX + t * 30 - 150} y2={PED_TOP_Y + 71} />
                <line x1={PED_CX + t * 30} y1={PED_TOP_Y - 4} x2={PED_CX + t * 30 + 150} y2={PED_TOP_Y + 71} />
              </g>
            )
          })}
          {/* 河流（半透明青色曲带） */}
          <path
            d={`M 30 ${PED_TOP_Y + 40} C 120 ${PED_TOP_Y + 20}, 150 ${PED_TOP_Y + 95}, 210 ${PED_TOP_Y + 80} S 330 ${PED_TOP_Y + 60}, 356 ${PED_TOP_Y + 96}`}
            stroke="oklch(0.72 0.13 210 / 0.45)"
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
          />
          {/* 发光节点 */}
          {LANDSCAPE_DOTS.map((d, i) => (
            <circle key={`dot-${i}`} cx={d.x} cy={d.y} r={d.r} fill="oklch(0.85 0.12 205)" filter="url(#bb-glow)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.4 + (i % 4) * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* ---------- 底座辐射数据光束 ---------- */}
        <g>
          {BEAM_NODES.map((n, i) => (
            <g key={`beam-${i}`}>
              <line x1={PED_CORNERS[i].x} y1={PED_CORNERS[i].y} x2={n.x} y2={n.y} stroke="url(#beam-grad)" strokeWidth={1.4} />
              <line
                x1={PED_CORNERS[i].x}
                y1={PED_CORNERS[i].y}
                x2={n.x}
                y2={n.y}
                stroke="oklch(0.9 0.12 200)"
                strokeWidth={1.4}
                className="gene-flow"
              />
            </g>
          ))}
        </g>

        {/* ---------- 发光全息底座 ---------- */}
        <g filter="url(#bb-glow)">
          <polygon points={pedLeft} fill="oklch(0.4 0.1 235 / 0.85)" />
          <polygon points={pedRight} fill="oklch(0.5 0.12 225 / 0.85)" />
          <polygon points={pedTop} fill="url(#ped-grad)" stroke="oklch(0.92 0.09 200)" strokeWidth={1.4} />
          {/* 顶面内描边光环 */}
          <polygon
            points={`${PED_CX},${PED_TOP_Y - PED_QH + 10} ${PED_CX + PED_HW - 18},${PED_TOP_Y} ${PED_CX},${PED_TOP_Y + PED_QH - 10} ${PED_CX - PED_HW + 18},${PED_TOP_Y}`}
            fill="none"
            stroke="oklch(0.98 0.04 200 / 0.5)"
            strokeWidth={0.8}
          />
        </g>

        {/* ---------- 未选模块：地景上的线框待选块（可点选加入） ---------- */}
        {unselected.map((m, i) => {
          const s = shelfXY(i)
          const isHot = hoveredId === m.id
          return (
            <g
              key={`shelf-${m.id}`}
              transform={`translate(${s.x} ${s.y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onHover(m.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onToggle(m.id)}
            >
              <polygon
                points={localFaces(W * 0.82, QH * 0.82, 0).top}
                fill={isHot ? "oklch(0.7 0.14 210 / 0.25)" : "oklch(0.5 0.06 235 / 0.1)"}
                stroke={isHot ? "oklch(0.85 0.13 205 / 0.9)" : "oklch(0.6 0.08 228 / 0.45)"}
                strokeWidth={isHot ? 1.3 : 0.8}
                strokeDasharray={isHot ? undefined : "3 3"}
              />
              <circle r={1.6} fill={isHot ? "oklch(0.88 0.12 205)" : m.palette.top} opacity={isHot ? 1 : 0.7} />
            </g>
          )
        })}

        {/* ---------- 积木塔：激活模块自底向上叠层 ---------- */}
        {drawn.map(({ m, slot }) => {
          const { x, y } = towerXY(slot.col, slot.row, slot.level)
          const isHot = hoveredId === m.id
          const dim = hoveredId && !isHot ? 0.45 : 1
          return (
            <motion.g
              key={`cube-${m.id}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ x, y: y + (isHot ? -8 : 0), opacity: dim, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.7 }}
              style={{ cursor: "pointer" }}
              filter="url(#bb-glow)"
              onMouseEnter={() => onHover(m.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onToggle(m.id)}
            >
              <polygon points={CUBE.left} fill={m.palette.left} fillOpacity={0.96} />
              <polygon points={CUBE.right} fill={m.palette.right} fillOpacity={0.96} />
              <polygon
                points={CUBE.top}
                fill={m.palette.top}
                stroke={isHot ? "oklch(0.98 0.05 200)" : "oklch(0.9 0.09 200 / 0.75)"}
                strokeWidth={isHot ? 1.6 : 0.9}
              />
            </motion.g>
          )
        })}

        {/* ---------- AI 智能体：顶部悬浮发光晶体 ---------- */}
        {ai && (
          <AnimatePresence>
            {aiActive && (
              <motion.g
                key="ai-crystal"
                initial={{ opacity: 0, y: AI_Y - 40, scale: 0.5 }}
                animate={{
                  opacity: hoveredId && hoveredId !== ai.id ? 0.5 : 1,
                  y: [AI_Y, AI_Y - 7, AI_Y],
                  scale: 1,
                }}
                exit={{ opacity: 0, y: AI_Y - 40, scale: 0.5 }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { type: "spring", stiffness: 150, damping: 16 },
                  y: { duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                style={{ cursor: "pointer", x: AI_X }}
                filter="url(#bb-glow)"
                onMouseEnter={() => onHover(ai.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(ai.id)}
              >
                <polygon points={AI_CUBE.left} fill={ai.palette.left} fillOpacity={0.55} />
                <polygon points={AI_CUBE.right} fill={ai.palette.right} fillOpacity={0.55} />
                <polygon points={AI_CUBE.top} fill="url(#ai-top)" fillOpacity={0.9} stroke="oklch(0.99 0.03 205)" strokeWidth={1.3} />
              </motion.g>
            )}
          </AnimatePresence>
        )}
      </svg>

      {/* 悬停模块标签 */}
      {modules.map((m) => {
        if (hoveredId !== m.id) return null
        const pos = labelPos(m.id)
        if (!pos) return null
        return (
          <span
            key={`lbl-${m.id}`}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-accent/60 bg-[oklch(0.16_0.03_245/0.92)] px-2 py-0.5 text-[11px] font-medium leading-none text-foreground backdrop-blur"
            style={{ left: `${(pos.x / VB_W) * 100}%`, top: `${((pos.y - 6) / VB_H) * 100}%` }}
          >
            {m.label}
          </span>
        )
      })}
    </div>
  )
}
