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
import { IsoBlocks } from "@/components/iso-blocks"

const features = [
  { icon: Building2, title: "全场景", desc: "覆盖厂、站、网、河湖" },
  { icon: BrainCircuit, title: "智决策", desc: "AI 赋能分析与决策" },
  { icon: Box, title: "易组合", desc: "模块配置，自由扩展" },
  { icon: ShieldCheck, title: "便维护", desc: "一体化架构，运行稳定" },
  { icon: TrendingUp, title: "懂业务", desc: "行业标准，水务知识" },
]

const steps = [
  { icon: MousePointerClick, label: "选择模块" },
  { icon: Boxes, label: "自由组合" },
  { icon: SlidersHorizontal, label: "按需扩展 / 可跨域" },
  { icon: TrendingUp, label: "持续升级" },
]

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

export function CwCloudSlide({ active }: { active: boolean }) {
  const [stage, setStage] = useState(0)

  // 仅当本幻灯片处于激活态时自动逐级堆叠
  useEffect(() => {
    if (!active) {
      setStage(0)
      return
    }
    const t = setInterval(() => setStage((s) => (s + 1) % 3), 2600)
    return () => clearInterval(t)
  }, [active])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      {/* 背景氛围 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* 顶部：标题 + 积木体 */}
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
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

          {/* 流程条 */}
          <div className="mt-6 hidden flex-wrap items-center gap-x-2 gap-y-3 rounded-2xl border border-border bg-card/40 px-4 py-3 sm:flex">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-foreground/85">
                  <s.icon className="size-3.5 text-accent" />
                  {s.label}
                </span>
                {i < steps.length - 1 && <ChevronRight className="size-3.5 text-accent/50" />}
              </div>
            ))}
          </div>
        </div>

        {/* 积木体动效 */}
        <div className="relative h-44 sm:h-52 lg:h-56">
          <div className="absolute right-0 top-0 h-full w-full">
            <IsoBlocks stage={stage} />
          </div>
        </div>
      </div>

      {/* 主体：左侧能力卡 + 右侧三阶段 */}
      <div className="relative mt-6 grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        {/* 五大能力 */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-3"
            >
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

        {/* 三阶段 */}
        <div className="grid gap-4 md:grid-cols-3">
          {stages.map((st, idx) => {
            const isActive = stage === idx
            return (
              <div
                key={st.n}
                className="flex flex-col rounded-2xl border bg-card/40 p-4 transition-all duration-500"
                style={{
                  borderColor: isActive ? "oklch(0.7 0.13 215 / 0.6)" : undefined,
                  boxShadow: isActive ? "0 0 28px -8px oklch(0.7 0.14 215 / 0.7)" : undefined,
                  transform: isActive ? "translateY(-2px)" : undefined,
                }}
                onMouseEnter={() => setStage(idx)}
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
                    <img
                      src={st.img || "/placeholder.svg"}
                      alt={st.caption}
                      className="size-full object-cover"
                    />
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
