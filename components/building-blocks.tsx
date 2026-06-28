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

// ---------- 全景沙盘画布参数（宽幅，铺满展示区） ----------
const VB_W = 900
const VB_H = 520
const CX = 450
const GROUND_Y = 268
const TW = 60 // 等距单元半宽
const TH = 30 // 等距单元半高

// 沙盘网格坐标 → 屏幕坐标
function iso(gx: number, gy: number) {
  return { x: CX + (gx - gy) * TW, y: GROUND_Y + (gx + gy) * TH }
}

// 中央 AI 核心底座中心
const HUB_CX = CX
const HUB_CY = GROUND_Y

// 玻璃晶体积木尺寸
const W = 72
const QH = W / 4 // 18
const H = 44
const HALF_W = W / 2 // 36
const HALF_TH = W / 4 // 18

// 积木塔基准（坐落于核心底座中心上方）
const ORIGIN_X = CX
const ORIGIN_Y = GROUND_Y - 24

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

// 沙盘建筑节点（业务模块 ↔ 厂网河湖场景点；integrated 映射为中央核心底座本身）
// 节点在全幅网格上散开布局，避开左侧浮动模块池
const SANDBOX_NODES: { id: string; gx: number; gy: number; kind: "plant" | "tower" | "pump" | "dam" }[] = [
  { id: "plant", gx: -2.4, gy: -0.6, kind: "plant" },
  { id: "pump", gx: -1.6, gy: -2.4, kind: "pump" },
  { id: "pipe", gx: 0.0, gy: -2.8, kind: "tower" },
  { id: "sso", gx: 1.7, gy: -2.5, kind: "tower" },
  { id: "flood", gx: 3.0, gy: -0.8, kind: "tower" },
  { id: "reservoir", gx: 3.2, gy: 1.1, kind: "dam" },
  { id: "iot", gx: 1.7, gy: 2.5, kind: "tower" },
  { id: "sewage", gx: -0.3, gy: 2.7, kind: "plant" },
  { id: "group", gx: -1.7, gy: 1.6, kind: "tower" },
]

// 底层管网路由（沿等距网格纵横交错）
const PIPE_ROUTES: [number, number][][] = [
  [
    [-4, 1.6],
    [-1.6, 1.6],
    [-1.6, -1.2],
    [1.6, -1.2],
    [1.6, 1.6],
    [4, 1.6],
  ],
  [
    [-3.2, -2.6],
    [-3.2, -0.4],
    [0.6, -0.4],
    [0.6, 2.2],
    [3.6, 2.2],
  ],
  [
    [-4, -0.6],
    [-1, -0.6],
    [-1, 2.6],
  ],
]

// 泵站标记（管网拐点 / 河流交汇）
const PUMP_MARKS: [number, number][] = [
  [-1.6, -1.2],
  [1.6, -1.2],
  [0.6, -0.4],
  [0.6, 2.2],
]

function routePts(route: [number, number][]) {
  return route.map(([gx, gy]) => { const p = iso(gx, gy); return `${p.x},${p.y}` }).join(" ")
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

  const layersFilled = Math.ceil(activeBusiness.length / PER_LAYER)
  const capCy = ORIGIN_Y - layersFilled * H
  const CAP = { cx: ORIGIN_X, cy: capCy, w: W, qh: QH, h: H }
  const AI = { cx: ORIGIN_X, cy: CAP.cy - CAP.h - 14, w: 58, qh: 14.5, h: 30 }

  // 厂网河湖联动：勾选「厂网河湖一体化 / 管网管理」点亮整张管网与泵站
  const networkLit = isActive("integrated") || isActive("pipe") || hoveredId === "integrated" || hoveredId === "pipe"
  const integratedLit = isActive("integrated") || hoveredId === "integrated"
  // 河湖联动：一体化 / 水库 / 防汛
  const waterLit =
    isActive("integrated") || isActive("reservoir") || isActive("flood") ||
    hoveredId === "integrated" || hoveredId === "reservoir" || hoveredId === "flood"

  // 中央核心菱形底座角点
  const coreR = 1.85
  const coreTop = iso(-coreR, -coreR)
  const coreRight = iso(coreR, -coreR)
  const coreBottom = iso(coreR, coreR)
  const coreLeft = iso(-coreR, coreR)
  const corePts = `${coreTop.x},${coreTop.y} ${coreRight.x},${coreRight.y} ${coreBottom.x},${coreBottom.y} ${coreLeft.x},${coreLeft.y}`

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="厂网河湖 AI 一体化全景组合舱：在数字孪生沙盘上自由组合水务业务模块，实时激活全场景 AI 能力"
    >
      <svg
        className="relative h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
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
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="oklch(0.85 0.13 200 / 0.7)" />
            <stop offset="55%" stopColor="oklch(0.58 0.15 222 / 0.3)" />
            <stop offset="100%" stopColor="oklch(0.4 0.1 240 / 0)" />
          </radialGradient>
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.16 235 / 0.1)" />
            <stop offset="50%" stopColor="oklch(0.74 0.16 215 / 0.8)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 235 / 0.1)" />
          </linearGradient>
        </defs>

        {/* ===== 底层：全幅等距科技网格 ===== */}
        <g aria-hidden="true">
          {Array.from({ length: 11 }).map((_, i) => {
            const t = -5 + i
            const a = iso(t, -5)
            const b = iso(t, 5)
            const c = iso(-5, t)
            const d = iso(5, t)
            return (
              <g key={`grid-${i}`} stroke="oklch(0.5 0.09 222 / 0.14)" strokeWidth={0.7}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
              </g>
            )
          })}
        </g>

        {/* ===== 河湖水系（横跨全图的发光蓝带 + 湖泊） ===== */}
        <g aria-hidden="true">
          <path
            d="M -30 392 C 150 332 270 452 460 392 S 760 330 940 404"
            fill="none"
            stroke={waterLit ? "oklch(0.55 0.14 230 / 0.65)" : "oklch(0.42 0.1 235 / 0.4)"}
            strokeWidth={13}
            strokeLinecap="round"
            filter="url(#bb-soft)"
          />
          <path
            d="M -30 392 C 150 332 270 452 460 392 S 760 330 940 404"
            fill="none"
            stroke="url(#river-grad)"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={waterLit ? 1 : 0.5}
          />
          <path
            d="M -30 392 C 150 332 270 452 460 392 S 760 330 940 404"
            fill="none"
            stroke="oklch(0.92 0.08 205)"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeDasharray="2 14"
            opacity={waterLit ? 0.95 : 0.4}
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-64" dur="2.4s" repeatCount="indefinite" />
          </path>
          {/* 湖泊（靠近水库节点） */}
          {(() => {
            const lake = iso(3.2, 1.1)
            return (
              <ellipse
                cx={lake.x}
                cy={lake.y + 8}
                rx={34}
                ry={16}
                fill={waterLit ? "oklch(0.5 0.14 228 / 0.55)" : "oklch(0.42 0.1 232 / 0.35)"}
                stroke="oklch(0.78 0.12 210 / 0.6)"
                strokeWidth={1}
              />
            )
          })()}
        </g>

        {/* ===== 底层管网（纵横交错的青色光带，联动点亮+流光） ===== */}
        <g aria-hidden="true">
          {PIPE_ROUTES.map((route, i) => (
            <g key={`pipe-${i}`}>
              <polyline
                points={routePts(route)}
                fill="none"
                stroke={networkLit ? "oklch(0.8 0.14 200 / 0.7)" : "oklch(0.5 0.08 222 / 0.28)"}
                strokeWidth={networkLit ? 2 : 1.2}
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={networkLit ? "url(#bb-glow)" : undefined}
              />
              {networkLit && (
                <polyline
                  points={routePts(route)}
                  fill="none"
                  stroke="oklch(0.97 0.05 200)"
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray="3 13"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-64" dur="1.5s" repeatCount="indefinite" />
                </polyline>
              )}
            </g>
          ))}
          {/* 泵站标记 */}
          {PUMP_MARKS.map(([gx, gy], i) => {
            const p = iso(gx, gy)
            const lit = networkLit || isActive("pump") || hoveredId === "pump"
            return (
              <g key={`pump-${i}`}>
                <ellipse cx={p.x} cy={p.y} rx={lit ? 7 : 4} ry={lit ? 3.5 : 2} fill="none" stroke={lit ? "oklch(0.85 0.13 200)" : "oklch(0.5 0.07 225)"} strokeWidth={1}>
                  {lit && <animate attributeName="rx" values="4;9;4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
                </ellipse>
                <circle cx={p.x} cy={p.y - 3} r={lit ? 2.6 : 1.6} fill={lit ? "oklch(0.92 0.1 200)" : "oklch(0.55 0.06 228)"} filter={lit ? "url(#bb-glow)" : undefined} />
              </g>
            )
          })}
        </g>

        {/* ===== 沙盘建筑节点 + 中枢→节点流光 ===== */}
        {SANDBOX_NODES.map((n) => {
          const mod = business.find((b) => b.id === n.id)
          if (!mod) return null
          const p = iso(n.gx, n.gy)
          const on = isActive(n.id)
          const hot = hoveredId === n.id
          const lit = on || hot
          const col = mod.palette.top
          const beam = `M ${HUB_CX} ${HUB_CY} L ${p.x} ${p.y - 6}`
          return (
            <g key={`node-${n.id}`}>
              {lit && (
                <>
                  <path d={beam} stroke={col} strokeOpacity={0.5} strokeWidth={1.4} fill="none" strokeDasharray="3 7">
                    <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="1.1s" repeatCount="indefinite" />
                  </path>
                  <circle r={2.6} fill="oklch(0.96 0.06 205)" filter="url(#bb-glow)">
                    <animateMotion dur="1.3s" repeatCount="indefinite" path={beam} />
                  </circle>
                </>
              )}
              {/* 厂：矩阵式微型方块建筑 */}
              {n.kind === "plant" && (
                <g filter={lit ? "url(#bb-glow)" : undefined}>
                  {[[-9, 0], [0, 5], [9, 0], [0, -5]].map(([dx, dy], k) => (
                    <rect
                      key={k}
                      x={p.x + dx - 4}
                      y={p.y + dy - 8}
                      width={8}
                      height={8}
                      rx={1}
                      fill={lit ? col : "oklch(0.4 0.05 232)"}
                      fillOpacity={lit ? 0.9 : 0.5}
                    />
                  ))}
                  <ellipse cx={p.x} cy={p.y + 2} rx={lit ? 16 : 11} ry={lit ? 7 : 5} fill="none" stroke={col} strokeOpacity={lit ? 0.6 : 0.22} strokeWidth={1}>
                    {lit && <animate attributeName="rx" values="11;19;11" dur="2.4s" repeatCount="indefinite" />}
                  </ellipse>
                </g>
              )}
              {/* 塔：发光立柱节点 */}
              {n.kind === "tower" && (
                <g>
                  <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - (lit ? 18 : 10)} stroke={col} strokeOpacity={lit ? 0.9 : 0.32} strokeWidth={1.8} />
                  <circle cx={p.x} cy={p.y - (lit ? 18 : 10)} r={lit ? 3.6 : 2.2} fill={lit ? col : "oklch(0.55 0.06 230)"} filter={lit ? "url(#bb-glow)" : undefined} />
                </g>
              )}
              {/* 泵：圆柱节点 */}
              {n.kind === "pump" && (
                <g filter={lit ? "url(#bb-glow)" : undefined}>
                  <ellipse cx={p.x} cy={p.y - 10} rx={6} ry={3} fill={lit ? col : "oklch(0.42 0.05 232)"} />
                  <rect x={p.x - 6} y={p.y - 10} width={12} height={10} fill={lit ? mod.palette.right : "oklch(0.34 0.04 236)"} fillOpacity={0.8} />
                  <ellipse cx={p.x} cy={p.y} rx={6} ry={3} fill={lit ? mod.palette.left : "oklch(0.3 0.04 238)"} />
                </g>
              )}
              {/* 坝：水库大坝 */}
              {n.kind === "dam" && (
                <g filter={lit ? "url(#bb-glow)" : undefined}>
                  <polygon points={`${p.x - 14},${p.y} ${p.x - 10},${p.y - 12} ${p.x + 10},${p.y - 12} ${p.x + 14},${p.y}`} fill={lit ? mod.palette.right : "oklch(0.34 0.04 236)"} fillOpacity={0.85} stroke={col} strokeOpacity={lit ? 0.8 : 0.3} strokeWidth={1} />
                </g>
              )}
              {/* 地面光环（除厂外，厂已自带） */}
              {n.kind !== "plant" && (
                <ellipse cx={p.x} cy={p.y} rx={lit ? 11 : 6} ry={lit ? 5.5 : 3} fill="none" stroke={col} strokeOpacity={lit ? 0.65 : 0.2} strokeWidth={1}>
                  {lit && <animate attributeName="rx" values="6;14;6" dur="2.4s" repeatCount="indefinite" />}
                  {lit && <animate attributeName="stroke-opacity" values="0.65;0.1;0.65" dur="2.4s" repeatCount="indefinite" />}
                </ellipse>
              )}
            </g>
          )
        })}

        {/* ===== 中央 AI 核心底座（强蓝光菱形平台 + 阵列灯光） ===== */}
        <g aria-hidden="true">
          <ellipse cx={HUB_CX} cy={HUB_CY} rx={210} ry={108} fill="oklch(0.68 0.15 212 / 0.16)" filter="url(#bb-soft)" />
          {/* 同心菱形 */}
          {[1, 0.74, 0.5].map((s, i) => (
            <polygon
              key={`core-${i}`}
              points={[
                `${HUB_CX},${HUB_CY - coreR * 2 * TH * s}`,
                `${HUB_CX + coreR * 2 * TW * s},${HUB_CY}`,
                `${HUB_CX},${HUB_CY + coreR * 2 * TH * s}`,
                `${HUB_CX - coreR * 2 * TW * s},${HUB_CY}`,
              ].join(" ")}
              fill={i === 2 ? "url(#core-grad)" : "none"}
              stroke="oklch(0.78 0.13 205 / 0.55)"
              strokeWidth={i === 0 ? 1.6 : 1}
            />
          ))}
          {/* 8 颗环形阵列灯 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const ang = (i / 8) * Math.PI * 2
            const lx = HUB_CX + Math.cos(ang) * 90
            const ly = HUB_CY + Math.sin(ang) * 46
            return (
              <circle key={`hl-${i}`} cx={lx} cy={ly} r={2} fill="oklch(0.95 0.07 205)" opacity={integratedLit ? 0.95 : 0.5} filter="url(#bb-glow)">
                <animate attributeName="opacity" values={`${integratedLit ? 0.95 : 0.4};0.12;${integratedLit ? 0.95 : 0.4}`} dur="2.2s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
              </circle>
            )
          })}
        </g>

        {/* ===== 全息玻璃晶体积木（painter 排序） ===== */}
        {drawn.map(({ m, slot }) => {
          const isHot = hoveredId === m.id
          const dim = hoveredId && !isHot ? 0.4 : 1
          const f = faces(slot.cx, slot.cy, W, QH, H)
          return (
            <AnimatePresence key={`cube-${m.id}`}>
              <motion.g
                initial={{ opacity: 0, y: -36, scale: 0.7 }}
                animate={{ opacity: dim, y: isHot ? -8 : 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 190, damping: 18, mass: 0.7 }}
                style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                filter="url(#bb-glow)"
                onMouseEnter={() => onHover(m.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggle(m.id)}
              >
                <polygon points={f.left} fill={m.palette.left} fillOpacity={0.52} stroke={m.palette.glow} strokeOpacity={0.5} strokeWidth={0.8} />
                <polygon points={f.right} fill={m.palette.right} fillOpacity={0.62} stroke={m.palette.glow} strokeOpacity={0.5} strokeWidth={0.8} />
                <polygon points={f.top} fill={m.palette.top} fillOpacity={isHot ? 0.82 : 0.66} stroke={isHot ? "oklch(0.98 0.04 200)" : "oklch(0.92 0.08 200 / 0.9)"} strokeWidth={isHot ? 1.8 : 1.1} />
                <polygon points={f.top} fill="oklch(0.99 0.01 200)" fillOpacity={0.16} />
                <line x1={slot.cx} y1={slot.cy + QH} x2={slot.cx} y2={slot.cy + QH + H} stroke="oklch(0.98 0.05 200)" strokeOpacity={0.5} strokeWidth={1}>
                  <animate attributeName="stroke-opacity" values="0.1;0.7;0.1" dur="2.2s" repeatCount="indefinite" />
                </line>
              </motion.g>
            </AnimatePresence>
          )
        })}

        {/* 幽灵预览块（悬停未选模块） */}
        {ghostModule && ghostSlot && (
          <g style={{ pointerEvents: "none" }}>
            {(() => {
              const f = faces(ghostSlot.cx, ghostSlot.cy, W, QH, H)
              return (
                <>
                  <polygon points={f.left} fill={ghostModule.palette.left} fillOpacity={0.18} />
                  <polygon points={f.right} fill={ghostModule.palette.right} fillOpacity={0.2} />
                  <polygon points={f.top} fill={ghostModule.palette.top} fillOpacity={0.16} stroke={ghostModule.palette.glow} strokeOpacity={0.8} strokeWidth={1.1} strokeDasharray="4 3" />
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

        {/* ===== AI 核心晶体（璀璨青白光） ===== */}
        {ai && (
          <AnimatePresence>
            {aiActive && (
              <motion.g
                initial={{ opacity: 0, y: -44, scale: 0.5 }}
                animate={{ opacity: hoveredId && hoveredId !== ai.id ? 0.45 : 1, y: 0, scale: 1 }}
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
                        <polygon points={f.right} fill={ai.palette.right} fillOpacity={0.55} />
                        <polygon points={f.top} fill={ai.palette.top} fillOpacity={0.75} stroke="oklch(0.98 0.05 205)" strokeWidth={1.4} />
                        <polygon points={f.top} fill="oklch(0.99 0.01 200)" fillOpacity={0.3} />
                      </>
                    )
                  })()}
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        )}
      </svg>

      {/* 悬停模块标签 */}
      {modules.map((m) => {
        if (hoveredId !== m.id) return null
        let pos: { cx: number; cy: number; qh: number }
        if (m.float) {
          pos = { cx: AI.cx, cy: AI.cy, qh: AI.qh }
        } else if (isActive(m.id)) {
          const i = activeBusiness.findIndex((b) => b.id === m.id)
          const s = towerSlot(i < 0 ? 0 : i)
          pos = { cx: s.cx, cy: s.cy, qh: QH }
        } else {
          const node = SANDBOX_NODES.find((n) => n.id === m.id)
          const p = node ? iso(node.gx, node.gy) : { x: HUB_CX, y: HUB_CY }
          pos = { cx: p.x, cy: p.y - 20, qh: 4 }
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
