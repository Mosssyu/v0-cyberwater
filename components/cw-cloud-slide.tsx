"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Box,
  Boxes,
  Blocks,
  Network,
  Sparkles,
  Building2,
  BrainCircuit,
  ChevronRight,
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
  type LucideIcon,
} from "lucide-react"
import { BuildingBlocks, type ModuleDef } from "@/components/building-blocks"

// ---------- 11 个产品模块池（数据驱动） ----------
const P = {
  cyan: { top: "#46dced", left: "#0d6f9e", right: "#1597c0", glow: "oklch(0.78 0.13 205)" },
  blue: { top: "#3a86e6", left: "#143a72", right: "#1d5fae", glow: "oklch(0.66 0.15 250)" },
  sky: { top: "#47b8ff", left: "#104a8c", right: "#1c74c6", glow: "oklch(0.7 0.14 230)" },
  teal: { top: "#2fd1c4", left: "#0c6f6a", right: "#149a91", glow: "oklch(0.78 0.14 185)" },
  green: { top: "#3ce6b4", left: "#0e6f5c", right: "#16a585", glow: "oklch(0.78 0.14 175)" },
  ai: { top: "#bfe9ff", left: "#2f6fd0", right: "#3f9fe6", glow: "oklch(0.8 0.12 220)" },
}

const productModules: ModuleDef[] = [
  { id: "group", label: "集团运营管理", col: 0, row: 0, palette: P.cyan },
  { id: "integrated", label: "厂网站一体化管理", col: 1, row: 0, palette: P.blue },
  { id: "sso", label: "SSO 统一登录", col: 2, row: 0, palette: P.blue },
  { id: "sewage", label: "分布式污水运营管理", col: 0, row: 1, palette: P.green },
  { id: "plant", label: "水厂运营管理", col: 1, row: 1, palette: P.cyan },
  { id: "pump", label: "泵闸站管理", col: 2, row: 1, palette: P.sky },
  { id: "reservoir", label: "水库标化管理", col: 0, row: 2, palette: P.teal },
  { id: "pipe", label: "管网管理", col: 1, row: 2, palette: P.blue },
  { id: "iot", label: "IoT 物联网平台", col: 2, row: 2, palette: P.teal },
  { id: "flood", label: "城市防汛管理", col: 3, row: 2, palette: P.sky },
  { id: "ai", label: "水务智能体", col: 0, row: 0, palette: P.ai, float: true },
]

// ---------- 11 个模块的详细介绍（图标 + 简要说明） ----------
const productInfo: Record<string, { icon: LucideIcon; desc: string }> = {
  group: { icon: Building2, desc: "面向水务集团，多区域、多公司、多厂站统一管理与运营分析。" },
  integrated: { icon: Network, desc: "打通水厂、管网、泵站数据，实现厂网联调与一体化运营。" },
  sso: { icon: ShieldCheck, desc: "统一身份认证与权限管理，一次登录贯通全平台应用。" },
  sewage: { icon: Recycle, desc: "面向分散式、农村污水站点的集中监控与远程运维。" },
  plant: { icon: Factory, desc: "覆盖供水、污水厂的生产、工艺、能耗与设备全流程运营。" },
  pump: { icon: Gauge, desc: "泵站、水闸的远程监控、智能调度与运行优化。" },
  reservoir: { icon: Waves, desc: "水库标准化管理与大坝安全运行监测。" },
  pipe: { icon: GitFork, desc: "管网 GIS、压力流量监测、漏损分析与分区计量。" },
  iot: { icon: Cpu, desc: "多协议设备接入、数据采集与边缘计算底座。" },
  flood: { icon: CloudRain, desc: "内涝预警、排水调度与应急指挥一体化。" },
  ai: { icon: BrainCircuit, desc: "大模型驱动的问数、报表、告警、工单与知识助手。" },
}

// ---------- 5 个演示阶段 ----------
const demoStages: { title: string; flow: number; active: string[]; note: string }[] = [
  { title: "产品模块池", flow: 0, active: [], note: "11 类水务产品模块，能力可选、模块丰富、按需建设。" },
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
    note: "厂网站一体化只是典型组合之一，可按项目需要自由组合、不限定模块顺序。",
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

// 单业态阶段轮播展示的候选模块（表达「任一业务模块都可独立建设」）
const soloRotation = ["plant", "pipe", "pump", "sewage", "reservoir", "flood"]

const flowSteps = [
  { icon: Boxes, label: "模块池选择" },
  { icon: Box, label: "单业态独立建设" },
  { icon: Blocks, label: "多模块自由组合" },
  { icon: Network, label: "跨场景一体化" },
  { icon: Sparkles, label: "AI 持续升级" },
]

const descriptors = ["单业态可独立建设", "多模块可自由组合", "集团级可统一运营", "AI 能力可持续叠加"]

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
  const note = custom ? demoStages[inferFlow(custom)].note : demoStages[stageIdx].note

  const handleHover = (id: string | null) => {
    setHoveredId(id)
    setPaused(!!id)
  }

  const toggleModule = (id: string) => {
    setPaused(true)
    setCustom((prev) => {
      const base = prev ?? activeIds
      return base.includes(id) ? base.filter((x) => x !== id) : [...base, id]
    })
  }

  const reset = () => {
    setCustom(null)
    setPaused(false)
    setStageIdx(0)
    setHoveredId(null)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* 顶部流程条（5 步，与组合体联动高亮） */}
      <div className="relative flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 rounded-2xl border border-border bg-card/40 px-3 py-2.5">
        {flowSteps.map((s, i) => {
          const on = i <= flowIdx
          const current = i === flowIdx
          return (
            <div key={s.label} className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all duration-500"
                style={{
                  color: on ? "oklch(0.9 0.08 200)" : "oklch(0.62 0.02 240)",
                  backgroundColor: current ? "oklch(0.7 0.14 215 / 0.18)" : "transparent",
                  fontWeight: current ? 600 : 400,
                }}
              >
                <s.icon className="size-3.5" style={{ color: on ? "oklch(0.82 0.13 205)" : "oklch(0.55 0.04 240)" }} />
                {s.label}
              </span>
              {i < flowSteps.length - 1 && (
                <ChevronRight
                  className="size-3.5 transition-colors duration-500"
                  style={{ color: on ? "oklch(0.8 0.13 205)" : "oklch(0.4 0.04 240)" }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* 主区：左标题文案 | 右模块池 + 组合体 */}
      <div className="relative mt-6 grid gap-8 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)]">
        {/* 左：标题 + 文案 + 说明标签 */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 font-mono text-xs text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            CW-Cloud
          </span>
          <h3 className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            新一代 AI 水务
            <br />
            <span className="text-gradient">智能运营平台</span>
          </h3>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            从单一业态到多业态组合，从业务系统到 AI 智能运营平台，CW-Cloud 支持 11 类产品模块按需选择、灵活组合、持续扩展。
          </p>

          {/* 说明标签 */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {descriptors.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-2.5 py-1 text-[11px] text-foreground/80"
              >
                <span className="size-1 rounded-full bg-accent" />
                {d}
              </span>
            ))}
          </div>

          {/* 当前阶段说明 + 重置 */}
          <div className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.05] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">
                {custom ? "自定义组合" : demoStages[stageIdx].title}
              </span>
              {custom && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-card/60 px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="size-3" />
                  重置
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{note}</p>
          </div>
        </div>

        {/* 右：模块池面板 | 组合体 */}
        <div className="grid gap-5 sm:grid-cols-[minmax(0,210px)_minmax(0,1fr)]">
          {/* 产品模块池 */}
          <div className="rounded-2xl border border-border bg-card/40 p-3.5">
            <div className="mb-2.5 flex items-center gap-1.5">
              <Boxes className="size-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">产品模块池 · 12 类</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {productModules.map((m) => {
                const on = activeIds.includes(m.id)
                const hot = hoveredId === m.id
                return (
                  <button
                    key={m.id}
                    onMouseEnter={() => handleHover(m.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => toggleModule(m.id)}
                    className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-[12px] transition-all duration-300"
                    style={{
                      borderColor: on ? "oklch(0.7 0.13 210 / 0.5)" : hot ? "oklch(0.6 0.1 215 / 0.6)" : "oklch(0.32 0.03 240 / 0.6)",
                      backgroundColor: on ? "oklch(0.7 0.14 215 / 0.14)" : "transparent",
                      opacity: on || hot ? 1 : 0.55,
                    }}
                  >
                    <span
                      className="size-2 shrink-0 rounded-[3px]"
                      style={{ backgroundColor: m.palette.top, boxShadow: on ? `0 0 7px 1px ${m.palette.glow}` : "none" }}
                    />
                    <span className="min-w-0 flex-1 truncate text-foreground/90">{m.label}</span>
                    {on && <Check className="size-3 shrink-0 text-accent" />}
                  </button>
                )
              })}
              {/* 第 12 项：更多模块持续扩展 */}
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-accent/30 px-2.5 py-1.5 text-[12px] opacity-70">
                <Plus className="size-3 shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-foreground/80">更多+</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">持续扩展</span>
              </div>
            </div>
          </div>

          {/* 组合体 */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[330px]">
                <BuildingBlocks
                  modules={productModules}
                  activeIds={activeIds}
                  hoveredId={hoveredId}
                  onHover={handleHover}
                  onToggle={toggleModule}
                />
              </div>
            </div>
            <p className="mt-1 text-center text-[11px] text-muted-foreground">
              已选 {activeIds.length} / {productModules.length} 个模块 · 点击模块可加入或移除组合
            </p>
          </div>
        </div>
      </div>

      {/* 11 个产品模块详解（带动画 + 简要说明，联动组合体高亮） */}
      <div className="relative mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">产品模块详解 · 11 类</span>
          <span className="text-[11px] text-muted-foreground">（悬停联动组合体高亮，点击可加入 / 移除组合）</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productModules.map((m, i) => {
            const info = productInfo[m.id]
            const Icon = info.icon
            const on = activeIds.includes(m.id)
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => handleHover(m.id)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => toggleModule(m.id)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card/40 p-4 text-left transition-colors duration-300"
                style={{ borderColor: on ? "oklch(0.7 0.13 215 / 0.55)" : "oklch(0.32 0.03 240 / 0.6)" }}
              >
                {/* 顶部色条：悬停时由左铺开 */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: m.palette.top, boxShadow: `0 0 10px 1px ${m.palette.glow}` }}
                  aria-hidden="true"
                />
                <span
                  className="flex size-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${m.palette.top}1f` }}
                >
                  <Icon className="size-4.5" style={{ color: m.palette.top }} />
                </span>
                <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  {m.label}
                  {on && <Check className="size-3.5 text-accent" />}
                </span>
                <span className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{info.desc}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
