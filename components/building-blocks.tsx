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

// ---------- 画布参数（与底图一致的宽幅舞台） ----------
const VB_W = 900
const VB_H = 520

// 积木塔基准点：对齐底图中央全息平台正上方（cover 裁切后平台中心约 (450, 287)）
const ORIGIN_X = 450
const ORIGIN_Y = 250

// 玻璃晶体积木尺寸
const W = 70
const QH = W / 4 // 17.5
const H = 42
const HALF_W = W / 2 // 35
const HALF_TH = W / 4 // 17.5

// 2×2 占位填充顺序（自底层向上层逐格填充）
const FOOT: [number, number][] = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
]
const PER_LAYER = FOOT.length

function towerSlot(index: number) {
  const layer = Math.floor(index / PER_LAYER)
  const [fcol, frow] = FOOT[index % PER_LAYER]
  return {
    layer,
    depth: fcol + frow,
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

  const activeBusiness = business.filter((b) => isActive(b.id))
  const slotted = activeBusiness.map((m, i) => ({ m, slot: towerSlot(i) }))
  const drawn = [...slotted].sort((a, b) => a.slot.layer - b.slot.layer || a.slot.depth - b.slot.depth)

  const ghostModule = hoveredId && !isActive(hoveredId) ? business.find((b) => b.id === hoveredId) : undefined
  const ghostSlot = ghostModule ? towerSlot(activeBusiness.length) : null

  const layersFilled = Math.max(1, Math.ceil(activeBusiness.length / PER_LAYER))
  const capCy = ORIGIN_Y - layersFilled * H
  const CAP = { cx: ORIGIN_X, cy: capCy, w: W, qh: QH, h: H }
  const AI = { cx: ORIGIN_X, cy: CAP.cy - CAP.h - 14, w: 56, qh: 14, h: 30 }

  // 中枢上升光束顶端（随塔高变化）
  const beamTopY = CAP.cy - 10

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="厂网河湖 AI 一体化数字孪生沙盘：在发光全息底座上自由组合水务业务模块，叠加 AI 智能中枢"
    >
      {/* ===== 底图：数字孪生沙盘（发光平台 + 厂网河湖设施） ===== */}
      <img
        src="/scenes/cw-sandbox-base.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
        draggable={false}
      />

      {/* ===== 叠加层：动态玻璃晶体积木 ===== */}
      <svg
        className="absolute inset-0 size-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="bb-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bb-soft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <linearGradient id="bb-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.95 0.08 200 / 0)" />
            <stop offset="100%" stopColor="oklch(0.9 0.1 200 / 0.85)" />
          </linearGradient>
        </defs>

        {/* 平台中枢上升光束（连接底座与积木塔） */}
        <rect
          x={ORIGIN_X - 7}
          y={beamTopY}
          width={14}
          height={ORIGIN_Y + 40 - beamTopY}
          fill="url(#bb-beam)"
          filter="url(#bb-soft)"
          opacity={0.7}
        />
        {/* 塔底辉光 */}
        <ellipse cx={ORIGIN_X} cy={ORIGIN_Y + 46} rx={120} ry={42} fill="oklch(0.7 0.15 210 / 0.22)" filter="url(#bb-soft)" />

        {/* ===== 全息玻璃晶体积木（painter 排序，自底向上堆叠） ===== */}
        {drawn.map(({ m, slot }) => {
          const isHot = hoveredId === m.id
          const dim = hoveredId && !isHot ? 0.45 : 1
          const f = faces(slot.cx, slot.cy, W, QH, H)
          return (
            <AnimatePresence key={`cube-${m.id}`}>
              <motion.g
                initial={{ opacity: 0, y: -40, scale: 0.7 }}
                animate={{ opacity: dim, y: isHot ? -9 : 0, scale: 1 }}
                exit={{ opacity: 0, y: 34, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 190, damping: 18, mass: 0.7 }}
                style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                filter="url(#bb-glow)"
                onMouseEnter={() => onHover(m.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(m.id)}
              >
                <polygon points={f.left} fill={m.palette.left} fillOpacity={0.62} stroke={m.palette.glow} strokeOpacity={0.6} strokeWidth={0.9} />
                <polygon points={f.right} fill={m.palette.right} fillOpacity={0.72} stroke={m.palette.glow} strokeOpacity={0.6} strokeWidth={0.9} />
                <polygon points={f.top} fill={m.palette.top} fillOpacity={isHot ? 0.9 : 0.78} stroke={isHot ? "oklch(0.98 0.04 200)" : "oklch(0.94 0.08 200 / 0.95)"} strokeWidth={isHot ? 1.9 : 1.2} />
                {/* 顶面霜光高光 */}
                <polygon points={f.top} fill="oklch(0.99 0.01 200)" fillOpacity={0.18} />
                {/* 内部竖向流光 */}
                <line x1={slot.cx} y1={slot.cy + QH} x2={slot.cx} y2={slot.cy + QH + H} stroke="oklch(0.98 0.05 200)" strokeOpacity={0.5} strokeWidth={1}>
                  <animate attributeName="stroke-opacity" values="0.12;0.7;0.12" dur="2.2s" repeatCount="indefinite" />
                </line>
              </motion.g>
            </AnimatePresence>
          )
        })}

        {/* 幽灵预览块（悬停未选模块时，预览下一个槽位） */}
        {ghostModule && ghostSlot && (
          <g style={{ pointerEvents: "none" }}>
            {(() => {
              const f = faces(ghostSlot.cx, ghostSlot.cy, W, QH, H)
              return (
                <>
                  <polygon points={f.left} fill={ghostModule.palette.left} fillOpacity={0.2} />
                  <polygon points={f.right} fill={ghostModule.palette.right} fillOpacity={0.22} />
                  <polygon points={f.top} fill={ghostModule.palette.top} fillOpacity={0.18} stroke={ghostModule.palette.glow} strokeOpacity={0.85} strokeWidth={1.2} strokeDasharray="4 3" />
                </>
              )
            })()}
          </g>
        )}

        {/* ===== 塔尖「更多+」虚框收束块（持续旋转） ===== */}
        <motion.g
          initial={false}
          animate={{ opacity: hoveredId ? 0.6 : 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          aria-hidden="true"
        >
          <motion.g
            animate={{ scaleX: [1, -1, 1], y: [0, -4, 0] }}
            transition={{
              scaleX: { duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              y: { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            filter="url(#bb-glow)"
          >
            {(() => {
              const f = faces(CAP.cx, CAP.cy, CAP.w, CAP.qh, CAP.h)
              return (
                <>
                  <polygon points={f.left} fill="oklch(0.7 0.12 220 / 0.06)" stroke="oklch(0.85 0.1 210 / 0.7)" strokeWidth={1.1} strokeDasharray="5 4" />
                  <polygon points={f.right} fill="oklch(0.7 0.12 220 / 0.08)" stroke="oklch(0.85 0.1 210 / 0.7)" strokeWidth={1.1} strokeDasharray="5 4" />
                  <polygon points={f.top} fill="oklch(0.7 0.12 210 / 0.1)" stroke="oklch(0.95 0.06 205 / 0.9)" strokeWidth={1.3} strokeDasharray="5 4" />
                </>
              )
            })()}
          </motion.g>
          <text
            x={CAP.cx}
            y={CAP.cy + CAP.qh + CAP.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}
            fill="oklch(0.95 0.05 205)"
          >
            更多+
          </text>
        </motion.g>

        {/* ===== AI 核心晶体（顶部悬浮，持续上下浮动） ===== */}
        {ai && (
          <motion.g
            animate={aiActive ? { y: [0, -7, 0] } : { y: 0 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
            filter="url(#bb-glow)"
            onMouseEnter={() => onHover(ai.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onToggle(ai.id)}
          >
            {(() => {
              const f = faces(AI.cx, AI.cy, AI.w, AI.qh, AI.h)
              const op = aiActive ? 1 : 0.4
              return (
                <>
                  <polygon points={f.left} fill="oklch(0.55 0.13 250)" fillOpacity={0.85 * op} />
                  <polygon points={f.right} fill="oklch(0.68 0.12 240)" fillOpacity={0.9 * op} />
                  <polygon points={f.top} fill="oklch(0.97 0.03 220)" fillOpacity={op} stroke="oklch(0.99 0.02 210)" strokeWidth={1.5} strokeOpacity={op} />
                  {aiActive && (
                    <polygon points={f.top} fill="none" stroke="oklch(0.99 0.04 205)" strokeWidth={1.2}>
                      <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
                    </polygon>
                  )}
                </>
              )
            })()}
          </motion.g>
        )}
      </svg>
    </div>
  )
}
