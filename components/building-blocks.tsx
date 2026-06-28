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

// ---------- 等距画布参数 ----------
const VB_W = 460
const VB_H = 470
const CX = 230
const BASE_Y = 312 // 沙盘底座中心
// 沙盘等距网格单元
const CW = 56
const CH = 28
// 中央 AI 核心底座（悬浮于沙盘中心上方）
const HUB_CX = CX
const HUB_CY = BASE_Y - 56
// 积木塔基准（坐落于核心底座之上）
const ORIGIN_X = CX
const ORIGIN_Y = BASE_Y - 70
// 玻璃晶体积木尺寸
const W = 64
const QH = W / 4 // 16
const H = 38
const HALF_W = W / 2 // 32
const HALF_TH = W / 4 // 16

// 沙盘网格坐标 → 屏幕坐标
function iso(gx: number, gy: number) {
  return { x: CX + (gx - gy) * CW, y: BASE_Y + (gx + gy) * CH }
}

// 2×2 占位填充顺序（自底层向上层逐格填充）
const FOOT: [number, number][] = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
]
const PER_LAYER = FOOT.length

// 按「激活顺序索引」分配塔内槽位：每层 2×2，自底向上紧凑叠层
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
const SANDBOX_NODES: { id: string; gx: number; gy: number }[] = [
  { id: "plant", gx: -1.8, gy: -0.2 },
  { id: "pump", gx: -0.9, gy: -1.5 },
  { id: "pipe", gx: 0.2, gy: -1.7 },
  { id: "sso", gx: 1.3, gy: -1.2 },
  { id: "flood", gx: 1.9, gy: 0.0 },
  { id: "reservoir", gx: 1.4, gy: 1.2 },
  { id: "iot", gx: 0.4, gy: 1.8 },
  { id: "sewage", gx: -0.7, gy: 1.8 },
  { id: "group", gx: -1.7, gy: 1.0 },
]

// 沙盘底座菱形
const PLATE = { bw: 212, bh: 112 }
const platePts = [
  `${CX},${BASE_Y - PLATE.bh}`,
  `${CX + PLATE.bw},${BASE_Y}`,
  `${CX},${BASE_Y + PLATE.bh}`,
  `${CX - PLATE.bw},${BASE_Y}`,
].join(" ")

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

  // 激活的业务模块按选择顺序紧凑堆叠成塔
  const activeBusiness = business.filter((b) => isActive(b.id))
  const slotted = activeBusiness.map((m, i) => ({ m, slot: towerSlot(i) }))
  const drawn = [...slotted].sort((a, b) => a.slot.layer - b.slot.layer || a.slot.depth - b.slot.depth)

  // 悬停未激活模块时，预览下一个槽位的幽灵积木
  const ghostModule =
    hoveredId && !isActive(hoveredId) ? business.find((b) => b.id === hoveredId) : undefined
  const ghostSlot = ghostModule ? towerSlot(activeBusiness.length) : null

  const layersFilled = Math.ceil(activeBusiness.length / PER_LAYER)
  // 塔尖「更多+」收束块（无积木时坐于核心底座）
  const capCy = ORIGIN_Y - layersFilled * H
  const CAP = { cx: ORIGIN_X, cy: capCy, w: W * 0.7, qh: (W * 0.7) / 4, h: H * 0.8 }
  // AI 核心晶体浮于塔尖之上
  const AI = { cx: ORIGIN_X, cy: CAP.cy - CAP.h - 10, w: 54, qh: 13.5, h: 27 }

  const integratedLit = isActive("integrated") || hoveredId === "integrated"

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="厂网河湖 AI 一体化积木自由组合舱：在数字孪生沙盘上自由组合水务业务模块，实时激活全场景 AI 能力"
    >
      {/* 整体氛围光晕 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-700"
        style={{
          width: aiActive ? "80%" : "58%",
          height: aiActive ? "70%" : "52%",
          background: "radial-gradient(circle, oklch(0.7 0.15 210 / 0.4), transparent 70%)",
          opacity: aiActive ? 0.95 : 0.55,
        }}
        aria-hidden="true"
      />

      {/* AI 叠加完成爆闪 */}
      <AnimatePresence>
        {aiActive && (
          <motion.div
            key="ai-flash"
            className="pointer-events-none absolute left-1/2 rounded-full blur-2xl"
            style={{
              top: `${(AI.cy / VB_H) * 100}%`,
              width: "70%",
              height: "70%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle, oklch(0.96 0.1 200 / 0.75), transparent 60%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.15, 1.35] }}
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
          <filter id="bb-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bb-soft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="plate-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.26 0.05 245)" />
            <stop offset="100%" stopColor="oklch(0.17 0.04 250)" />
          </linearGradient>
          <radialGradient id="hub-grad" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="oklch(0.85 0.13 200 / 0.95)" />
            <stop offset="55%" stopColor="oklch(0.6 0.15 220 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.4 0.1 240 / 0.1)" />
          </radialGradient>
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.16 235 / 0.1)" />
            <stop offset="50%" stopColor="oklch(0.78 0.16 215 / 0.85)" />
            <stop offset="100%" stopColor="oklch(0.55 0.16 235 / 0.1)" />
          </linearGradient>
        </defs>

        {/* ===== 底层：厂网河湖数字孪生沙盘 ===== */}
        <g aria-hidden="true">
          {/* 底座光晕 */}
          <ellipse cx={CX} cy={BASE_Y} rx={PLATE.bw + 10} ry={PLATE.bh + 8} fill="oklch(0.6 0.14 215 / 0.12)" filter="url(#bb-soft)" />
          {/* 底座厚度侧壁 */}
          <polygon
            points={`${CX - PLATE.bw},${BASE_Y} ${CX},${BASE_Y + PLATE.bh} ${CX + PLATE.bw},${BASE_Y} ${CX + PLATE.bw},${BASE_Y + 16} ${CX},${BASE_Y + PLATE.bh + 16} ${CX - PLATE.bw},${BASE_Y + 16}`}
            fill="oklch(0.12 0.03 250)"
          />
          {/* 底座顶面 */}
          <polygon points={platePts} fill="url(#plate-grad)" stroke="oklch(0.6 0.12 215 / 0.6)" strokeWidth={1.4} />

          {/* 等距网格线 */}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = -3 + i
            const a = iso(t, -3)
            const b = iso(t, 3)
            const c = iso(-3, t)
            const d = iso(3, t)
            return (
              <g key={`grid-${i}`} stroke="oklch(0.55 0.1 220 / 0.18)" strokeWidth={0.7}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
              </g>
            )
          })}

          {/* 河流（幽蓝发光曲线）+ 湖泊 */}
          {(() => {
            const p0 = iso(-2.4, 1.0)
            const p1 = iso(-0.6, -0.2)
            const p2 = iso(0.8, 0.9)
            const p3 = iso(2.2, -0.4)
            const dPath = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y} T ${p3.x} ${p3.y}`
            const lake = iso(1.4, 1.2)
            return (
              <>
                <path d={dPath} fill="none" stroke="oklch(0.45 0.12 235 / 0.5)" strokeWidth={9} strokeLinecap="round" filter="url(#bb-soft)" />
                <path d={dPath} fill="none" stroke="url(#river-grad)" strokeWidth={3} strokeLinecap="round" />
                <path d={dPath} fill="none" stroke="oklch(0.92 0.08 205)" strokeWidth={1.2} strokeLinecap="round" strokeDasharray="2 12">
                  <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="2.6s" repeatCount="indefinite" />
                </path>
                <ellipse cx={lake.x} cy={lake.y} rx={26} ry={13} fill="oklch(0.5 0.13 230 / 0.5)" stroke="oklch(0.8 0.12 210 / 0.7)" strokeWidth={1} />
              </>
            )
          })()}
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
          const beam = `M ${HUB_CX} ${HUB_CY + 4} L ${p.x} ${p.y - 8}`
          return (
            <g key={`node-${n.id}`}>
              {/* 流光赋能：中枢 → 节点 */}
              {lit && (
                <>
                  <path d={beam} stroke={col} strokeOpacity={0.45} strokeWidth={1.3} fill="none" strokeDasharray="3 7">
                    <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="1.1s" repeatCount="indefinite" />
                  </path>
                  <circle r={2.4} fill="oklch(0.96 0.06 205)" filter="url(#bb-glow)">
                    <animateMotion dur="1.3s" repeatCount="indefinite" path={beam} />
                  </circle>
                </>
              )}
              {/* 节点立柱 + 顶灯 */}
              <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - (lit ? 16 : 9)} stroke={col} strokeOpacity={lit ? 0.9 : 0.3} strokeWidth={1.6} />
              <circle
                cx={p.x}
                cy={p.y - (lit ? 16 : 9)}
                r={lit ? 3.4 : 2}
                fill={lit ? col : "oklch(0.55 0.06 230)"}
                filter={lit ? "url(#bb-glow)" : undefined}
              />
              {/* 地面光环 */}
              <ellipse cx={p.x} cy={p.y} rx={lit ? 10 : 6} ry={lit ? 5 : 3} fill="none" stroke={col} strokeOpacity={lit ? 0.7 : 0.22} strokeWidth={1}>
                {lit && <animate attributeName="rx" values="6;13;6" dur="2.4s" repeatCount="indefinite" />}
                {lit && <animate attributeName="stroke-opacity" values="0.7;0.1;0.7" dur="2.4s" repeatCount="indefinite" />}
              </ellipse>
            </g>
          )
        })}

        {/* ===== 中央 AI 核心底座（科幻层叠 + 阵列灯光） ===== */}
        <g aria-hidden="true">
          {/* 底座光池 */}
          <ellipse cx={HUB_CX} cy={HUB_CY + 10} rx={70} ry={34} fill="oklch(0.7 0.15 210 / 0.18)" filter="url(#bb-soft)" />
          {/* 双层平台 */}
          {[{ w: 120, th: 30, y: HUB_CY + 14, o: 0.5 }, { w: 92, th: 23, y: HUB_CY + 4, o: 0.85 }].map((r, i) => {
            const hw = r.w / 2
            const hh = r.th / 2
            return (
              <g key={`hub-${i}`}>
                <polygon
                  points={`${HUB_CX},${r.y - hh} ${HUB_CX + hw},${r.y} ${HUB_CX},${r.y + hh} ${HUB_CX - hw},${r.y}`}
                  fill="url(#hub-grad)"
                  fillOpacity={r.o}
                  stroke="oklch(0.85 0.12 205 / 0.8)"
                  strokeWidth={1}
                />
              </g>
            )
          })}
          {/* 阵列灯光点（integrated 联动增亮） */}
          {Array.from({ length: 8 }).map((_, i) => {
            const ang = (i / 8) * Math.PI * 2
            const lx = HUB_CX + Math.cos(ang) * 40
            const ly = HUB_CY + 4 + Math.sin(ang) * 20
            return (
              <circle key={`hl-${i}`} cx={lx} cy={ly} r={1.6} fill="oklch(0.95 0.07 205)" opacity={integratedLit ? 0.95 : 0.5} filter="url(#bb-glow)">
                <animate attributeName="opacity" values={`${integratedLit ? 0.95 : 0.4};0.15;${integratedLit ? 0.95 : 0.4}`} dur="2.2s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
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
                {/* 玻璃质感：低透明度色面 + 亮边 + 顶面霜光 */}
                <polygon points={f.left} fill={m.palette.left} fillOpacity={0.52} stroke={m.palette.glow} strokeOpacity={0.5} strokeWidth={0.8} />
                <polygon points={f.right} fill={m.palette.right} fillOpacity={0.62} stroke={m.palette.glow} strokeOpacity={0.5} strokeWidth={0.8} />
                <polygon points={f.top} fill={m.palette.top} fillOpacity={isHot ? 0.82 : 0.66} stroke={isHot ? "oklch(0.98 0.04 200)" : "oklch(0.92 0.08 200 / 0.9)"} strokeWidth={isHot ? 1.8 : 1.1} />
                <polygon points={f.top} fill="oklch(0.99 0.01 200)" fillOpacity={0.16} />
                {/* 内部流光：竖直高光线（模块激活赋能感） */}
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

        {/* ===== 塔尖「更多+」收束块（持续旋转） ===== */}
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
                  <polygon points={f.left} fill="oklch(0.6 0.13 245)" fillOpacity={0.92} />
                  <polygon points={f.right} fill="oklch(0.72 0.12 235)" fillOpacity={0.92} />
                  <polygon points={f.top} fill="oklch(0.96 0.03 220)" stroke="oklch(0.99 0.02 210)" strokeWidth={1.4} />
                </>
              )
            })()}
          </motion.g>
          <text
            x={CAP.cx}
            y={CAP.cy + CAP.h / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}
            fill="oklch(0.18 0.04 245)"
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
          pos = { cx: p.x, cy: p.y - 18, qh: 4 }
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
