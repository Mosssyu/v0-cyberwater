"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Boxes,
  Blocks,
  Network,
  Sparkles,
  Building2,
  BrainCircuit,
  RotateCcw,
  Check,
  Plus,
  ShieldCheck,
  Recycle,
  Factory,
  Gauge,
  Waves,
  GitFork,
  Cpu,
  CloudRain,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { BuildingBlocks, type ModuleDef } from "@/components/building-blocks"
import { ProductScene } from "@/components/product-scene"

// ---------- 产品模块池（数据驱动，按指定顺序） ----------
const P = {
  cyan: { top: "#46dced", left: "#0d6f9e", right: "#1597c0", glow: "oklch(0.78 0.13 205)" },
  blue: { top: "#3a86e6", left: "#143a72", right: "#1d5fae", glow: "oklch(0.66 0.15 250)" },
  sky: { top: "#47b8ff", left: "#104a8c", right: "#1c74c6", glow: "oklch(0.7 0.14 230)" },
  teal: { top: "#2fd1c4", left: "#0c6f6a", right: "#149a91", glow: "oklch(0.78 0.14 185)" },
  green: { top: "#3ce6b4", left: "#0e6f5c", right: "#16a585", glow: "oklch(0.78 0.14 175)" },
  ai: { top: "#bfe9ff", left: "#2f6fd0", right: "#3f9fe6", glow: "oklch(0.8 0.12 220)" },
}

// 列表顺序即为用户指定顺序；col/row 仅决定等距组合体中的位置
const productModules: ModuleDef[] = [
  { id: "group", label: "集团运营管理", col: 0, row: 0, palette: P.cyan },
  { id: "integrated", label: "厂网河湖一体化", col: 1, row: 0, palette: P.blue },
  { id: "sewage", label: "分布式污水设施", col: 2, row: 0, palette: P.green },
  { id: "plant", label: "水厂运营管理", col: 0, row: 1, palette: P.cyan },
  { id: "pump", label: "泵闸站管理", col: 1, row: 1, palette: P.sky },
  { id: "pipe", label: "管网管理", col: 2, row: 1, palette: P.blue },
  { id: "reservoir", label: "水库标准化管理", col: 0, row: 2, palette: P.teal },
  { id: "flood", label: "城市防汛内涝管理", col: 1, row: 2, palette: P.sky },
  { id: "iot", label: "IoT 物联平台", col: 2, row: 2, palette: P.teal },
  { id: "sso", label: "SSO 统一登录", col: 3, row: 1, palette: P.blue },
  { id: "ai", label: "水务智能体", col: 0, row: 0, palette: P.ai, float: true },
]

// 模块池仅列出 10 类业务模块（AI 作为可持续叠加的智能层，不计入列表）
const listedModules = productModules.filter((m) => !m.float)

// ---------- 每个模块的详细介绍（图标 + 简述 + 关键能力） ----------
const productInfo: Record<string, { icon: LucideIcon; desc: string; features: string[] }> = {
  group: {
    icon: Building2,
    desc: "面向水务集团，多区域、多公司、多厂站统一管理与运营分析，支撑集团级决策。",
    features: ["多组织架构", "运营驾驶舱", "经营分析"],
  },
  integrated: {
    icon: Network,
    desc: "打通水厂、管网、泵站与河湖数据，实现厂网河湖联调与一体化运营。",
    features: ["厂网联动", "全要素感知", "协同调度"],
  },
  sewage: {
    icon: Recycle,
    desc: "面向分散式、农村污水厂站点的集中监控、远程运维与达标管理。",
    features: ["集中监控", "远程运维", "达标排放"],
  },
  plant: {
    icon: Factory,
    desc: "覆盖供水、污水厂的生产、工艺、能耗与设备全流程精细化运营。",
    features: ["工艺管控", "能耗优化", "设备管理"],
  },
  pump: {
    icon: Gauge,
    desc: "泵站、水闸的远程监控、智能调度与运行优化，保障安全高效运行。",
    features: ["远程监控", "智能调度", "运行优化"],
  },
  pipe: {
    icon: GitFork,
    desc: "管网 GIS、压力流量监测、漏损分析与分区计量（DMA）一体化管理。",
    features: ["管网 GIS", "漏损分析", "分区计量"],
  },
  reservoir: {
    icon: Waves,
    desc: "水库标准化管理与大坝安全运行监测，实现规范化、可视化运营。",
    features: ["标准化管理", "大坝监测", "水位预警"],
  },
  flood: {
    icon: CloudRain,
    desc: "城市内涝预警、排水调度与应急指挥一体化，提升城市防汛能力。",
    features: ["内涝预警", "排水调度", "应急指挥"],
  },
  iot: {
    icon: Cpu,
    desc: "多协议设备接入、数据采集与边缘计算底座，支撑全平台物联感知。",
    features: ["多协议接入", "数据采集", "边缘计算"],
  },
  sso: {
    icon: ShieldCheck,
    desc: "统一身份认证与权限管理，一次登录贯通全平台应用，安全可控。",
    features: ["统一认证", "权限管理", "单点登录"],
  },
  ai: {
    icon: BrainCircuit,
    desc: "大模型驱动的问数、报表、告警、工单与知识助手，叠加在业务模块之上。",
    features: ["智能问数", "智能报表", "知识助手"],
  },
}

// ---------- 5 个演示阶段 ----------
const demoStages: { title: string; flow: number; active: string[]; note: string }[] = [
  { title: "产品模块池", flow: 0, active: [], note: "10+ 类水务产品模块，能力可选、模块丰富、按需建设。" },
  {
    title: "单业态独立建设",
    flow: 1,
    active: ["plant"],
    note: "单业态可任选——水厂仅为演示示例，管网、泵闸站、分布式污水、水库、防汛等均可独立建设。",
  },
  {
    title: "多模块自由组合",
    flow: 2,
    active: ["plant", "pump", "pipe", "iot", "sso"],
    note: "厂网河湖一体化只是典型组合之一，可按项目需要自由组合、不限定模块顺序。",
  },
  {
    title: "跨场景一体化",
    flow: 3,
    active: ["group", "plant", "pump", "pipe", "sewage", "reservoir", "flood", "iot", "sso"],
    note: "支持集团、区域、多厂站、多业态统一运营。",
  },
  {
    title: "AI 智能运营平台",
    flow: 4,
    active: ["group", "plant", "pump", "pipe", "sewage", "reservoir", "flood", "iot", "sso", "ai"],
    note: "AI 智能体叠加在业务模块之上，增强问数、报表、告警、工单、知识与运营分析能力。",
  },
]

// 各业务模块对应的产品大屏示意图（AI 智能体无图，使用动画示意）
const productImages: Record<string, string> = {
  group: "/products/group.png",
  integrated: "/products/integrated.png",
  sewage: "/products/sewage.png",
  plant: "/products/plant.png",
  pump: "/products/pump.png",
  pipe: "/products/pipe.png",
  reservoir: "/products/reservoir.png",
  flood: "/products/flood.png",
  iot: "/products/iot.png",
  sso: "/products/sso.png",
}

// 单业态阶段轮播展示的候选模块（表达「任一业务模块都可独立建设」）
const soloRotation = ["plant", "pipe", "pump", "sewage", "reservoir", "flood"]

const flowSteps = [
  { icon: Boxes, label: "模块池选择" },
  { icon: Box, label: "单业态独立建设" },
  { icon: Blocks, label: "多模块自由组合" },
  { icon: Network, label: "跨场景一体化" },
  { icon: Sparkles, label: "AI 持续升级" },
]

// CW-Cloud 水务AI运营平台 · 五大产品特性标签
const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Building2, title: "全场景", desc: "覆盖厂、站、网、河湖" },
  { icon: BrainCircuit, title: "智决策", desc: "AI 赋能分析与决策" },
  { icon: Boxes, title: "易组合", desc: "模块配置，自由扩展" },
  { icon: ShieldCheck, title: "便维护", desc: "一体化架构，运行稳定" },
  { icon: TrendingUp, title: "懂业务", desc: "行业标准，水务知识" },
]

// 由当前激活模块集合推断所处阶段（用于流程条/说明联动）
function inferFlow(active: string[]) {
  if (active.includes("ai")) return 4
  if (active.length === 0) return 0
  if (active.length === 1) return 1
  if (active.length <= 5) return 2
  return 3
}

export function CwCloudSlide({ active }: { active: boolean }) {
  const [stageIdx, setStageIdx] = useState(0)
  const [soloPick, setSoloPick] = useState(0)
  const [custom, setCustom] = useState<string[] | null>(null)
  const [paused, setPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [focusId, setFocusId] = useState<string>("group")

  // 自动播放 Stage 0 → 1 → 2 → 3 → 4 循环
  useEffect(() => {
    if (!active || paused || custom) return
    const t = setInterval(() => {
      setStageIdx((s) => {
        const next = (s + 1) % demoStages.length
        if (next === 1) setSoloPick((p) => (p + 1) % soloRotation.length)
        return next
      })
    }, 3600)
    return () => clearInterval(t)
  }, [active, paused, custom])

  // 当前生效的激活模块集合
  const activeIds = useMemo(() => {
    if (custom) return custom
    if (stageIdx === 1) return [soloRotation[soloPick]]
    return demoStages[stageIdx].active
  }, [custom, stageIdx, soloPick])

  const flowIdx = custom ? inferFlow(custom) : demoStages[stageIdx].flow

  // 展示区聚焦的产品：优先悬停项，其次点击聚焦项
  const showId = hoveredId ?? focusId
  const showModule = productModules.find((m) => m.id === showId) ?? listedModules[0]
  const showInfo = productInfo[showModule.id]
  const showInPlatform = activeIds.includes(showModule.id)

  const handleHover = (id: string | null) => {
    setHoveredId(id)
    setPaused(!!id)
    if (id) setFocusId(id)
  }

  const toggleModule = (id: string) => {
    setPaused(true)
    setFocusId(id)
    setCustom((prev) => {
      const base = prev ?? activeIds
      return base.includes(id) ? base.filter((x) => x !== id) : [...base, id]
    })
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.1_0.03_248)]">
      {/* ===== 主视觉舞台：右侧数字孪生场景为绝对主角，左/上/下为轻量叠加 ===== */}
      <div className="relative min-h-[600px] w-full lg:min-h-[680px]">
        {/* 底图：全幅数字孪生沙盘（发光平台 + 中心积木组合体） */}
        <div className="absolute inset-0">
          <BuildingBlocks
            modules={productModules}
            activeIds={activeIds}
            hoveredId={hoveredId}
            onHover={handleHover}
            onToggle={toggleModule}
          />
        </div>

        {/* 左侧可读性渐隐遮罩（让文案浮于场景之上，不压实心面板） */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.09 0.03 248 / 0.96) 0%, oklch(0.09 0.03 248 / 0.7) 30%, oklch(0.09 0.03 248 / 0.15) 52%, transparent 68%)",
          }}
        />
        {/* 顶部 / 底部轻微压暗，提升标签与流程可读性 */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.09 0.03 248 / 0.55) 0%, transparent 22%, transparent 70%, oklch(0.09 0.03 248 / 0.85) 100%)",
          }}
        />

        {/* ===== 内容叠加层（默认穿透，交互元素单独开启指针事件，保证场景可点选） ===== */}
        <div className="pointer-events-none relative z-10 flex min-h-[600px] flex-col p-6 sm:p-8 lg:min-h-[680px] lg:p-10">
          {/* 顶部能力标签（漂浮，靠右，半透明描边轻发光） */}
          <div className="flex flex-wrap justify-center gap-2 lg:justify-end lg:gap-2.5">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="pointer-events-auto flex items-center gap-2 rounded-xl border border-accent/20 bg-[oklch(0.12_0.04_248/0.6)] px-3 py-2 backdrop-blur-sm transition-colors hover:border-accent/40"
                style={{ boxShadow: "0 0 18px -8px oklch(0.7 0.14 215 / 0.5)" }}
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.1]"
                  aria-hidden="true"
                >
                  <h.icon className="size-4 text-accent" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[13px] font-bold text-foreground">{h.title}</span>
                  <span className="text-[10px] text-muted-foreground">{h.desc}</span>
                </span>
              </div>
            ))}
          </div>

          {/* 左侧品牌文案（轻、透、简洁，不使用实心面板） */}
          <div className="pointer-events-auto mt-10 max-w-md lg:mt-14 lg:max-w-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-xs text-accent backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent" />
              CW-Cloud
            </span>
            <h3 className="mt-5 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-foreground lg:text-5xl">
              CW-Cloud
              <br />
              <span className="text-gradient">水务 AI 运营平台</span>
            </h3>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              从单一业务到多业态组合，从业务系统到 AI 智能运营平台，CW-Cloud 支持 10+ 类产品模块按需选择、灵活组合、持续扩展。
            </p>
          </div>

          {/* 弹性占位：把流程/状态推到底部 */}
          <div className="flex-1" />

          {/* 底部状态胶囊（低调半透明） */}
          <div className="mb-4 flex justify-center lg:justify-start">
            <span className="pointer-events-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/20 bg-[oklch(0.12_0.04_248/0.7)] px-4 py-1.5 text-[11px] text-muted-foreground backdrop-blur-sm sm:text-[12px]">
              已选{" "}
              <span className="font-mono font-semibold text-accent">
                {activeIds.filter((id) => id !== "ai").length}
              </span>{" "}
              / {listedModules.length} 个模块 · 点击下方模块加入组合
            </span>
          </div>

          {/* 底部横向发光流程路径（替代竖向箭头，融入场景） */}
          <div className="pointer-events-auto flex items-center overflow-x-auto pb-1">
            {flowSteps.map((s, i) => {
              const done = i <= flowIdx
              const current = i === flowIdx
              return (
                <div key={s.label} className="flex flex-1 items-center">
                  {/* 节点 */}
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span
                      className="relative flex items-center justify-center transition-all duration-500"
                      style={{
                        width: current ? 52 : 38,
                        height: current ? 52 : 38,
                        clipPath: current
                          ? "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)"
                          : "none",
                        borderRadius: current ? 0 : 9999,
                        border: `1.5px solid ${
                          current
                            ? "oklch(0.85 0.15 200)"
                            : done
                              ? "oklch(0.7 0.13 210 / 0.7)"
                              : "oklch(0.4 0.04 240 / 0.6)"
                        }`,
                        backgroundColor: current
                          ? "oklch(0.7 0.16 210 / 0.22)"
                          : done
                            ? "oklch(0.5 0.1 220 / 0.25)"
                            : "oklch(0.18 0.03 245 / 0.5)",
                        boxShadow: current ? "0 0 22px 1px oklch(0.7 0.16 205 / 0.75)" : "none",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <s.icon
                        className="transition-colors duration-500"
                        style={{
                          width: current ? 20 : 16,
                          height: current ? 20 : 16,
                          color: done ? "oklch(0.92 0.1 200)" : "oklch(0.55 0.04 240)",
                        }}
                      />
                    </span>
                    <span
                      className="whitespace-nowrap text-center text-[11px] leading-tight transition-colors duration-500 sm:text-[12px]"
                      style={{
                        color: current
                          ? "oklch(0.95 0.06 200)"
                          : done
                            ? "oklch(0.82 0.05 220)"
                            : "oklch(0.6 0.02 240)",
                        fontWeight: current ? 700 : 500,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* 连接线 */}
                  {i < flowSteps.length - 1 && (
                    <span
                      className="mx-1.5 mb-6 h-px flex-1 transition-colors duration-500 sm:mx-2.5"
                      style={{
                        background:
                          i < flowIdx
                            ? "linear-gradient(90deg, oklch(0.78 0.14 205 / 0.9), oklch(0.7 0.13 215 / 0.6))"
                            : "oklch(0.4 0.04 240 / 0.4)",
                        boxShadow: i < flowIdx ? "0 0 8px 0 oklch(0.7 0.14 205 / 0.6)" : "none",
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 产品示意区：左 产品模块池 10+ ｜ 右 产品示意图 + 图下文字描述 */}
      <div className="relative mt-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">产品示意</span>
          <span className="text-[11px] text-muted-foreground">（左侧模块池选择 / 悬停，右侧实时呈现该产品大屏与说明）</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)]">
          {/* 左：产品模块池 10+（竖向列表，与组合体实时联动） */}
          <div className="rounded-2xl border border-border bg-card/40 p-3.5">
            <div className="mb-3 flex items-center gap-1.5">
              <Boxes className="size-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">产品模块池 · 10+</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {listedModules.map((m) => {
                const on = activeIds.includes(m.id)
                const hot = showId === m.id
                return (
                  <button
                    key={m.id}
                    onMouseEnter={() => handleHover(m.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => toggleModule(m.id)}
                    className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[12px] transition-all duration-300"
                    style={{
                      borderColor: on ? "oklch(0.7 0.13 210 / 0.55)" : hot ? "oklch(0.6 0.1 215 / 0.6)" : "oklch(0.32 0.03 240 / 0.55)",
                      backgroundColor: on ? "oklch(0.7 0.14 215 / 0.16)" : hot ? "oklch(0.5 0.06 235 / 0.2)" : "oklch(0.2 0.03 245 / 0.35)",
                      opacity: on || hot ? 1 : 0.78,
                    }}
                  >
                    <span
                      className="size-2.5 shrink-0 rounded-[3px]"
                      style={{ backgroundColor: m.palette.top, boxShadow: on ? `0 0 7px 1px ${m.palette.glow}` : "none" }}
                    />
                    <span className="min-w-0 flex-1 truncate text-foreground/90">{m.label}</span>
                    {on && <Check className="size-3.5 shrink-0 text-accent" />}
                  </button>
                )
              })}
              {/* 更多模块持续扩展 */}
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-accent/30 px-2.5 py-2 text-[12px] opacity-70">
                <Plus className="size-3.5 shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-foreground/80">更多+</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">持续扩展</span>
              </div>
            </div>
          </div>

          {/* 右：产品示意图 + 图下方文字描述 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showModule.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40"
            >
              {/* 上：产品大屏示意图 */}
              <div
                className="relative aspect-video w-full overflow-hidden"
                style={{ background: "oklch(0.12 0.025 248)" }}
              >
                {productImages[showModule.id] ? (
                  <>
                    <img
                      src={productImages[showModule.id] || "/placeholder.svg"}
                      alt={`${showModule.label}产品大屏示意`}
                      className="size-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    {/* 边缘柔化暗角，让图片自然融入卡片 */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      aria-hidden="true"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 50% 50%, transparent 64%, oklch(0.1 0.025 248 / 0.5) 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div className="flex size-full items-center justify-center p-4">
                    <ProductScene id={showModule.id} palette={showModule.palette} />
                  </div>
                )}
              </div>

              {/* 下：产品文字描述 */}
              <div className="flex flex-col border-t border-border p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${showModule.palette.top}20` }}
                  >
                    <showInfo.icon className="size-5.5" style={{ color: showModule.palette.top }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-bold text-foreground">{showModule.label}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          color: showInPlatform ? "oklch(0.88 0.1 200)" : "oklch(0.62 0.02 240)",
                          backgroundColor: showInPlatform ? "oklch(0.7 0.14 215 / 0.16)" : "oklch(0.4 0.03 240 / 0.3)",
                        }}
                      >
                        {showInPlatform ? "已在组合中" : "未加入组合"}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">产品模块</span>
                  </div>
                  <button
                    onClick={() => toggleModule(showModule.id)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: showInPlatform ? "oklch(0.4 0.03 240 / 0.5)" : "oklch(0.7 0.13 215 / 0.55)",
                      color: showInPlatform ? "oklch(0.7 0.02 240)" : "oklch(0.88 0.1 200)",
                      backgroundColor: showInPlatform ? "transparent" : "oklch(0.7 0.14 215 / 0.12)",
                    }}
                  >
                    {showInPlatform ? <RotateCcw className="size-3.5" /> : <Plus className="size-3.5" />}
                    {showInPlatform ? "移除" : "加入组合"}
                  </button>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{showInfo.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {showInfo.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-2.5 py-1 text-[11px] text-foreground/85"
                    >
                      <span className="size-1.5 rounded-[2px]" style={{ backgroundColor: showModule.palette.top }} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
