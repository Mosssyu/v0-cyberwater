"use client"

import { motion, AnimatePresence } from "framer-motion"

export type ModulePalette = { top: string; left: string; right: string; glow: string }

export type ModuleDef = {
  id: string
  label: string
  /** 积木上展示的系统简称 */
  short?: string
  col: number
  row: number
  palette: ModulePalette
  /** AI 智能体：浮于积木塔上方的智能中枢 */
  float?: boolean
}

// ---------- 画布参数（与底图一致的宽幅舞台） ----------
const VB_W = 900
const VB_H = 520

// 积木塔基准点：对齐底图中央全息平台顶面（cover 裁切后平台顶面中心约 (450, 240)）
const ORIGIN_X = 450
const ORIGIN_Y = 240

// 玻璃晶体积木尺寸（适配 3×3 占位）
const W = 54
const QH = W / 4 // 13.5
const H = 34
const HALF_W = W / 2 // 27
const HALF_TH = W / 4 // 13.5

// 金字塔式堆叠：底层 3×3 → 中层 2×2（居中偏移 0.5）→ 顶层 1×1
// 每层自后向前逐格填充，形成宣传图中的彩色积木塔堆积感
const PYRAMID_LAYERS: [number, number][][] = [
  // 底层 3×3
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [2, 0],
    [1, 1],
    [0, 2],
    [2, 1],
    [1, 2],
    [2, 2],
  ],
  // 中层 2×2（+0.5 居中对齐底层）
  [
    [0.5, 0.5],
    [1.5, 0.5],
    [0.5, 1.5],
    [1.5, 1.5],
  ],
  // 顶层 1×1
  [[1, 1]],
]

function towerSlot(index: number) {
  let layer = 0
  let rem = index
  while (layer < PYRAMID_LAYERS.length - 1 && rem >= PYRAMID_LAYERS[layer].length) {
    rem -= PYRAMID_LAYERS[layer].length
    layer++
  }
  const cell = PYRAMID_LAYERS[layer][Math.min(rem, PYRAMID_LAYERS[layer].length - 1)]
  const [fcol, frow] = cell
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
  const isActive = (id: string) => activeIds.includes(id)

  const activeBusiness = business.filter((b) => isActive(b.id))
  const slotted = activeBusiness.map((m, i) => ({ m, slot: towerSlot(i) }))
  const drawn = [...slotted].sort((a, b) => a.slot.layer - b.slot.layer || a.slot.depth - b.slot.depth)

  const ghostModule = hoveredId && !isActive(hoveredId) ? business.find((b) => b.id === hoveredId) : undefined
  const ghostSlot = ghostModule ? towerSlot(activeBusiness.length) : null

  // 已填充层数（金字塔各层容量 9 / 4 / 1）
  const n = activeBusiness.length
  const filledLayers = n > 13 ? 3 : n > 9 ? 2 : 1
  // 塔顶高度（后排顶面中心约 ORIGIN_Y - (filledLayers-1)*H）
  const towerTopY = ORIGIN_Y - (filledLayers - 1) * H
  // 「更多+」块：悬浮在整座塔顶中心上方（带旋转 + 上下浮动）
  const CAP = { cx: ORIGIN_X, cy: towerTopY - 30, w: W, qh: QH, h: H }

  // 中枢上升光束顶端（连接平台与塔）
  const beamTopY = CAP.cy - 6

  // 发光承载平台（卡槽底盘）：尺寸略大于 3×3 积木底面，承托整组积木
  // 积木底面中心约在 (ORIGIN_X, ORIGIN_Y + 2*HALF_TH + H) = (450, 301)
  const PLATE = { cx: ORIGIN_X, cy: ORIGIN_Y + 2 * HALF_TH + H - 6, w: 212, qh: 53, h: 18 }
  const plateF = faces(PLATE.cx, PLATE.cy, PLATE.w, PLATE.qh, PLATE.h)

  return (
    <div
      className="relative size-full overflow-hidden"
      role="img"
      aria-label="厂网河湖 AI 一体化数字孪生沙盘：在发光全息底座上自由组合水务业务模块，叠加 AI 智能中枢"
    >
      {/* ===== 底图：数字孪生沙盘（发光平台 + 厂网河湖设施） ===== */}
      <img
        src="/scenes/cw-sandbox-empty.png"
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

        {/* 中枢上升光束（仅辅助，连接承载平台与塔顶，弱化不喧宾夺主） */}
        <rect
          x={ORIGIN_X - 5}
          y={beamTopY}
          width={10}
          height={PLATE.cy - beamTopY}
          fill="url(#bb-beam)"
          filter="url(#bb-soft)"
          opacity={0.4}
        />

        {/* ===== 发光承载平台 / 卡槽底盘（承托整组积木，配色与地图科技蓝一致） ===== */}
        {/* 平台底部投影辉光 */}
        <ellipse cx={PLATE.cx} cy={PLATE.cy + PLATE.h + 8} rx={PLATE.w / 2 + 16} ry={PLATE.qh * 0.7} fill="oklch(0.55 0.2 255 / 0.32)" filter="url(#bb-soft)" />
        {/* 平台厚度侧面 */}
        <polygon points={plateF.left} fill="oklch(0.28 0.11 255 / 0.94)" stroke="oklch(0.66 0.18 252 / 0.85)" strokeWidth={1.2} />
        <polygon points={plateF.right} fill="oklch(0.36 0.13 250 / 0.94)" stroke="oklch(0.66 0.18 252 / 0.85)" strokeWidth={1.2} />
        {/* 平台上表面（半透明玻璃发光承载面） */}
        <polygon points={plateF.top} fill="oklch(0.48 0.17 252 / 0.52)" stroke="oklch(0.72 0.16 250)" strokeWidth={1.6} />
        {/* 承载面同心发光卡槽环（与积木底面尺寸匹配） */}
        {[0.74, 0.5, 0.28].map((s, i) => (
          <polygon
            key={`ring-${i}`}
            points={faces(PLATE.cx, PLATE.cy, PLATE.w * s, PLATE.qh * s, 0).top}
            fill="none"
            stroke="oklch(0.78 0.16 250)"
            strokeWidth={1.1}
            strokeOpacity={0.5}
          >
            <animate attributeName="stroke-opacity" values="0.2;0.7;0.2" dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </polygon>
        ))}
        {/* 承载面中心向上发光核心 */}
        <ellipse cx={PLATE.cx} cy={PLATE.cy} rx={26} ry={13} fill="oklch(0.82 0.15 250 / 0.9)" filter="url(#bb-glow)" />

        {/* ===== 全息玻璃晶体积木（painter 排序，自底向上堆叠，完整落座于承载平台） ===== */}
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
                {/* 左侧面系统简称（沿等距左面角度排布，如宣传图积木标签） */}
                {m.short && (
                  <text
                    x={slot.cx - HALF_W / 2}
                    y={slot.cy + QH / 2 + H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(26.57 ${slot.cx - HALF_W / 2} ${slot.cy + QH / 2 + H / 2 + 1})`}
                    style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.6, pointerEvents: "none", paintOrder: "stroke" }}
                    fill="#ffffff"
                    stroke="oklch(0.2 0.05 250 / 0.65)"
                    strokeWidth={2}
                  >
                    {m.short}
                  </text>
                )}
                {/* 底层积木与承载平台接触处的高亮底边（强化“已安装/卡接”关系） */}
                {slot.layer === 0 && (
                  <polyline
                    points={`${slot.cx - HALF_W},${slot.cy + QH + H} ${slot.cx},${slot.cy + 2 * QH + H} ${slot.cx + HALF_W},${slot.cy + QH + H}`}
                    fill="none"
                    stroke="oklch(0.98 0.07 205)"
                    strokeOpacity={0.85}
                    strokeWidth={1.6}
                  />
                )}
              </motion.g>
            </AnimatePresence>
          )
        })}

        {/* 幽灵预览块（悬停未选模块���，预览下一个槽位） */}
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

        {/* ===== 「更多+」虚框块：堆叠塔的下一个待扩展槽位（持续旋转） ===== */}
        <motion.g
          initial={false}
          animate={{ opacity: ghostModule ? 0 : hoveredId ? 0.55 : 1 }}
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
      </svg>
    </div>
  )
}
