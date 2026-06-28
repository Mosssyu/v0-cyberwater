"use client"

import { useMemo, useState } from "react"
import {
  Boxes,
  Box,
  Blocks,
  Network,
  Sparkles,
  Check,
  Plus,
  ChevronRight,
  Globe,
  Puzzle,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BuildingBlocks } from "@/components/building-blocks"
import { ProductScene } from "@/components/product-scene"
import { GrowthTimeline } from "@/components/growth-timeline"
import { productModules, listedModules, productInfo } from "@/components/product-data"

// ---------- 顶部演进路径 ----------
const evolutionSteps: { icon: LucideIcon; label: string }[] = [
  { icon: Boxes, label: "模块池选择" },
  { icon: Box, label: "单业态独立建设" },
  { icon: Blocks, label: "多模块自由组合" },
  { icon: Network, label: "跨场景一体化" },
  { icon: Sparkles, label: "AI 持续升级" },
]

// ---------- 左侧价值点 ----------
const valuePoints: { icon: LucideIcon; word: string; desc: string }[] = [
  { icon: Globe, word: "全场景", desc: "覆盖厂、站、网、河湖" },
  { icon: Puzzle, word: "易组合", desc: "模块配置，自由扩展" },
  { icon: TrendingUp, word: "可演进", desc: "按需建设，持续升级" },
  { icon: BrainCircuit, word: "智决策", desc: "AI 赋能分析与决策" },
]

function EvolutionSteps() {
  return (
    <div className="relative mx-auto mb-10 w-full overflow-x-auto">
      <ol className="flex min-w-max items-center justify-center gap-1.5 sm:gap-2">
        {evolutionSteps.map((s, i) => {
          const last = i === evolutionSteps.length - 1
          return (
            <li key={s.label} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={[
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors sm:px-3.5",
                  last
                    ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_18px_-4px_oklch(0.79_0.13_200/0.7)]"
                    : "border-border bg-card/50 text-muted-foreground backdrop-blur",
                ].join(" ")}
              >
                <s.icon className={last ? "size-3.5 text-accent" : "size-3.5 text-foreground/60"} />
                <span className={last ? "font-semibold" : ""}>{s.label}</span>
              </div>
              {!last && <ArrowRight className="size-3.5 shrink-0 text-accent/40" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function Hero() {
  // 默认呈现一套丰富的跨场景一体化 + AI 组合
  const [activeIds, setActiveIds] = useState<string[]>([
    "group",
    "plant",
    "pump",
    "pipe",
    "iot",
    "sso",
    "ai",
  ])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setActiveIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  // 右侧场景底图聚焦：悬停模块优先，否则取最近选中的业务模块，兜底「厂网河湖一体化」
  const focusId = useMemo(() => {
    if (hoveredId && hoveredId !== "ai") return hoveredId
    const business = activeIds.filter((id) => id !== "ai")
    return business.length ? business[business.length - 1] : "integrated"
  }, [hoveredId, activeIds])

  const focusModule = productModules.find((m) => m.id === focusId) ?? productModules[1]
  const focusInfo = productInfo[focusId] ?? productInfo.integrated

  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 + 科技网格 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-7xl px-6 pt-16 pb-16 lg:pt-20">
        {/* 顶部演进路径 */}
        <EvolutionSteps />

        {/* 三栏：左品牌价值 · 中模块池 · 右主视觉 */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          {/* ===== 左侧：品牌与价值 ===== */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
              CW-Cloud
            </div>

            <h1 className="mt-5 text-balance text-3xl font-bold leading-[1.14] tracking-tight text-foreground sm:text-4xl xl:text-5xl">
              新一代 AI 水务
              <br />
              <span className="text-gradient">智能运营平台</span>
            </h1>

            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              从单一业态到多业态组合，从业务系统到 AI 智能运营平台，CW-Cloud 支持 10+ 类产品模块按需选择、灵活组合、持续扩展。
            </p>

            {/* 四个价值点 */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              {valuePoints.map((v) => (
                <div
                  key={v.word}
                  className="group rounded-xl border border-border bg-card/40 p-3.5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <v.icon className="size-4" />
                    </span>
                    <span className="text-base font-bold text-foreground">{v.word}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* 底部 AI 能力说明卡 */}
            <div className="mt-5 rounded-xl border border-accent/25 bg-card/55 p-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">AI 智能运营平台</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                AI 智能体叠加在业务模块之上，增强问数、报表、告警、工单、知识与运营分析能力。
              </p>
            </div>
          </div>

          {/* ===== 中间：产品模块池 ===== */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-accent/20 bg-card/50 p-4 shadow-[0_0_40px_-16px_oklch(0.79_0.13_200/0.5)] backdrop-blur">
              <div className="mb-3 flex items-center gap-1.5">
                <Boxes className="size-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">产品模块池 · 10+</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {listedModules.map((m) => {
                  const on = activeIds.includes(m.id)
                  const hot = hoveredId === m.id
                  return (
                    <button
                      key={m.id}
                      onMouseEnter={() => setHoveredId(m.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => toggle(m.id)}
                      className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[12px] transition-all duration-300"
                      style={{
                        borderColor: on
                          ? "oklch(0.7 0.13 210 / 0.5)"
                          : hot
                            ? "oklch(0.6 0.1 215 / 0.6)"
                            : "oklch(0.32 0.03 240 / 0.6)",
                        backgroundColor: on ? "oklch(0.7 0.14 215 / 0.14)" : "transparent",
                        opacity: on || hot ? 1 : 0.6,
                      }}
                    >
                      <span
                        className="size-2 shrink-0 rounded-[3px]"
                        style={{
                          backgroundColor: m.palette.top,
                          boxShadow: on ? `0 0 7px 1px ${m.palette.glow}` : "none",
                        }}
                      />
                      <span className="min-w-0 flex-1 truncate text-foreground/90">{m.label}</span>
                      {on ? (
                        <Check className="size-3.5 shrink-0 text-accent" />
                      ) : (
                        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" />
                      )}
                    </button>
                  )
                })}
                {/* 更多+ */}
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-accent/30 px-2.5 py-2 text-[12px] opacity-70">
                  <Plus className="size-3 shrink-0 text-accent" />
                  <span className="min-w-0 flex-1 truncate text-foreground/80">更多+</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">持续扩展</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 右侧：积木组合 + 发光底座 + 场景底图 ===== */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-2xl border border-accent/20 bg-[oklch(0.12_0.025_245)] sm:aspect-[16/11]">
              {/* 第三层：场景底图（数字孪生业务场景） */}
              <div className="absolute inset-x-0 bottom-0 top-[34%]">
                <ProductScene id={focusId} palette={focusModule.palette} />
                {/* 顶部融合渐变，让积木从场景中「长出来」 */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24"
                  style={{
                    background: "linear-gradient(to bottom, oklch(0.12 0.025 245), transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* 第二层：发光底座 */}
              <div
                className="pointer-events-none absolute left-1/2 top-[52%] h-16 w-[62%] -translate-x-1/2 rounded-[50%] blur-md"
                style={{
                  background: "radial-gradient(ellipse, oklch(0.7 0.14 205 / 0.55), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-[51%] h-1.5 w-[46%] -translate-x-1/2 rounded-full"
                style={{
                  background: "linear-gradient(to right, transparent, oklch(0.82 0.13 205 / 0.7), transparent)",
                }}
                aria-hidden="true"
              />

              {/* 第一层：积木组合（悬浮于底座之上） */}
              <div className="absolute inset-x-0 top-2 mx-auto w-[78%] sm:w-[68%]">
                <BuildingBlocks
                  modules={productModules}
                  activeIds={activeIds}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  onToggle={toggle}
                />
              </div>

              {/* 右上角小文案 */}
              <div className="pointer-events-none absolute right-4 top-4 text-right">
                <p className="text-xs font-medium leading-tight text-accent">
                  像搭积木一样
                  <br />
                  构建水务平台
                </p>
              </div>

              {/* 左下角：当前聚焦模块说明 */}
              <div className="absolute bottom-3 left-3 max-w-[62%] rounded-lg border border-accent/25 bg-[oklch(0.12_0.025_245/0.82)] px-3 py-2 backdrop-blur">
                <div className="flex items-center gap-1.5">
                  <focusInfo.icon className="size-3.5 shrink-0 text-accent" />
                  <span className="truncate text-xs font-semibold text-foreground">{focusModule.label}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{focusInfo.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下方：十年水务数字化实践沉淀 */}
      <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-center gap-3">
          <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
          <h2 className="whitespace-nowrap text-sm font-semibold tracking-wide text-foreground/90">
            十年水务数字化实践沉淀
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
        </div>
        <GrowthTimeline />
      </div>
    </section>
  )
}
