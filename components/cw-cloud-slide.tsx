"use client"

import { useEffect, useState } from "react"
import {
  Building2,
  BrainCircuit,
  Box,
  ShieldCheck,
  TrendingUp,
  MousePointerClick,
  Boxes,
  SlidersHorizontal,
  Check,
  ChevronRight,
} from "lucide-react"
import { BuildingBlocks, type ModuleId } from "@/components/building-blocks"

const features = [
  { icon: Building2, title: "全场景", desc: "覆盖厂、站、网、河湖" },
  { icon: BrainCircuit, title: "智决策", desc: "AI 赋能分析与决策" },
  { icon: Box, title: "易组合", desc: "模块配置，自由扩展" },
  { icon: ShieldCheck, title: "便维护", desc: "一体化架构，运行稳定" },
  { icon: TrendingUp, title: "懂业务", desc: "行业标准，水务知识" },
]

const flowSteps = [
  { icon: MousePointerClick, label: "选择模块" },
  { icon: Boxes, label: "自由组合" },
  { icon: SlidersHorizontal, label: "按需扩展 / 可跨域" },
  { icon: TrendingUp, label: "持续升级" },
]

// 每个阶段点亮的流程条节点
const STAGE_FLOW: number[][] = [[0], [1], [2, 3]]

const stages = [
  {
    n: 1,
    title: "单场景运营",
    sub: "选择「水厂管理」",
    mods: ["水厂管理"],
    img: "/products/cwcloud-plant.png",
    caption: "水厂运营驾驶舱",
    metrics: [
      { v: "28,560 m³/d", l: "日供水量" },
      { v: "96.1%", l: "设备运行率" },
      { v: "0.23 kWh/m³", l: "能耗 / 产水量" },
    ],
  },
  {
    n: 2,
    title: "厂网站一体化",
    sub: "选择「水厂 + 管网 + 泵站」",
    mods: ["水厂管理", "管网管理", "泵站管理"],
    img: "/products/cwcloud-network.png",
    caption: "厂网站一体化运营",
    metrics: [
      { v: "28,560 m³/d", l: "日水量" },
      { v: "96.3%", l: "管网压力合格率" },
      { v: "97.6%", l: "泵站运行率" },
      { v: "8.2%", l: "漏损率" },
    ],
  },
  {
    n: 3,
    title: "厂网河湖 AI 一体化",
    sub: "选择「水厂 + 管网 + 泵站 + 河湖 + AI 智能体」",
    mods: ["水厂管理", "管网管理", "泵站管理", "河湖管理", "AI 智能体"],
    img: "/products/cwcloud-river.png",
    caption: "厂网河湖 AI 一体化运营",
    metrics: [
      { v: "28,560 m³/d", l: "供水量" },
      { v: "100%", l: "水质达标率" },
      { v: "97.8%", l: "设备运行率" },
      { v: "7.6%", l: "漏损率" },
      { v: "0.32 kWh/m³", l: "综合能耗" },
    ],
  },
]

// 积木 id -> 所属阶段（悬停积木时切换到对应阶段）
const MODULE_STAGE: Record<ModuleId, number> = {
  waterPlant: 0,
  pipeNetwork: 1,
  pumpStation: 1,
  riverLake: 2,
  aiAgent: 2,
}

export function CwCloudSlide({ active }: { active: boolean }) {
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredModule, setHoveredModule] = useState<ModuleId | null>(null)

  // 本板块激活且未被悬停暂停时，自动 Step1 → Step2 → Step3 循环
  useEffect(() => {
    if (!active || paused) return
    const t = setInterval(() => setStage((s) => (s + 1) % 3), 2800)
    return () => clearInterval(t)
  }, [active, paused])

  const activeFlow = STAGE_FLOW[stage] ?? []

  const handleModuleHover = (id: ModuleId | null) => {
    setHoveredModule(id)
    if (id) {
      setPaused(true)
      setStage(MODULE_STAGE[id])
    } else {
      setPaused(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      {/* 背景氛围 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* 第一行：标题 | 流程条 + 单一积木组合体（视觉焦点） */}
      <div className="relative grid items-start gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
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
          <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
            像积木一样，从单一水厂模块起步，按需叠加泵站、管网、河湖与 AI 智能体，逐步组合为一体化智能运营平台。
          </p>
        </div>

        {/* 右上：流程条（与积木联动）+ 积木组合体 */}
        <div className="relative">
          {/* 流程条 */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-3 rounded-2xl border border-border bg-card/40 px-4 py-3">
            {flowSteps.map((s, i) => {
              const on = activeFlow.includes(i)
              return (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs transition-all duration-500"
                    style={{
                      color: on ? "oklch(0.9 0.08 200)" : "oklch(0.62 0.02 240)",
                      backgroundColor: on ? "oklch(0.7 0.14 215 / 0.14)" : "transparent",
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

          {/* 单一积木组合体 */}
          <div className="mx-auto mt-2 max-w-[360px] lg:mr-0 lg:ml-auto">
            <BuildingBlocks step={stage} hovered={hoveredModule} onHover={handleModuleHover} />
          </div>
        </div>
      </div>

      {/* 第二行：五大能力 | 三阶段描述卡（与积木联动高亮） */}
      <div className="relative mt-2 grid gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        {/* 五大能力 */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <f.icon className="size-4.5 text-accent" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{f.title}</div>
                <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 三阶段描述卡 */}
        <div className="grid gap-4 md:grid-cols-3">
          {stages.map((st, idx) => {
            const isActive = stage === idx
            return (
              <div
                key={st.n}
                className="flex flex-col rounded-2xl border bg-card/40 p-4 transition-all duration-500"
                style={{
                  borderColor: isActive ? "oklch(0.7 0.13 215 / 0.55)" : undefined,
                  boxShadow: isActive ? "0 0 26px -8px oklch(0.7 0.14 215 / 0.65)" : undefined,
                  opacity: isActive ? 1 : 0.72,
                }}
                onMouseEnter={() => {
                  setPaused(true)
                  setStage(idx)
                }}
                onMouseLeave={() => setPaused(false)}
              >
                {/* 阶段头 */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors"
                    style={{
                      borderColor: isActive ? "oklch(0.75 0.13 210)" : "oklch(0.4 0.05 240)",
                      color: isActive ? "oklch(0.85 0.12 205)" : "oklch(0.7 0.03 240)",
                      backgroundColor: isActive ? "oklch(0.7 0.14 215 / 0.12)" : "transparent",
                    }}
                  >
                    {st.n}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{st.title}</span>
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{st.sub}</p>

                {/* 模块勾选 */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {st.mods.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/30 px-2 py-1 text-[11px] text-foreground/85"
                    >
                      <Check className="size-3 text-accent" />
                      {m}
                    </span>
                  ))}
                </div>

                {/* 驾驶舱预览 */}
                <div className="mt-3 overflow-hidden rounded-xl border border-border">
                  <div className="relative aspect-[16/10]">
                    <img src={st.img || "/placeholder.svg"} alt={st.caption} className="size-full object-cover" />
                    <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-[oklch(0.12_0.03_245)] to-transparent px-2.5 py-1.5">
                      <span className="text-[11px] font-medium text-foreground">{st.caption}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 bg-card/70 px-2.5 py-2">
                    {st.metrics.map((m) => (
                      <div key={m.l} className="min-w-0">
                        <div className="text-xs font-bold text-accent">{m.v}</div>
                        <div className="text-[10px] leading-none text-muted-foreground">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
