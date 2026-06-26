"use client"

import { Layers, Building2, Boxes, BrainCircuit, Droplets } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type GeneCard = {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  /** 角落定位：tl 左上 / tr 右上 / bl 左下 / br 右下 */
  corner: "tl" | "tr" | "bl" | "br"
  /** 连线在 viewBox(600x480) 中的路径与流光起始延迟 */
  path: string
  begin: string
}

const cards: GeneCard[] = [
  {
    id: "scene",
    title: "运营场景基因",
    desc: "深度理解水厂、泵站、管网、集团运营等真实管理场景",
    icon: Layers,
    corner: "tl",
    path: "M300,232 Q200,150 132,120",
    begin: "0s",
  },
  {
    id: "product",
    title: "产品化沉淀基因",
    desc: "将项目经验转化为标准模块、业务模型和配置能力",
    icon: Boxes,
    corner: "tr",
    path: "M300,232 Q400,150 468,120",
    begin: "0.6s",
  },
  {
    id: "group",
    title: "集团化管理基因",
    desc: "支撑集团、区域、公司、厂站多层级协同运营",
    icon: Building2,
    corner: "bl",
    path: "M300,232 Q200,318 132,356",
    begin: "1.2s",
  },
  {
    id: "ai",
    title: "AI 演进基因",
    desc: "围绕问数、报表、告警、工单和知识持续构建智能体能力",
    icon: BrainCircuit,
    corner: "br",
    path: "M300,232 Q400,318 468,356",
    begin: "1.8s",
  },
]

const orbitTags = [
  { label: "水厂", x: "50%", y: "18%", d: "0s" },
  { label: "泵站", x: "82%", y: "50%", d: "0.6s" },
  { label: "管网", x: "50%", y: "82%", d: "1.2s" },
  { label: "集团运营", x: "18%", y: "50%", d: "1.8s" },
]

const cornerClass: Record<GeneCard["corner"], string> = {
  tl: "left-0 top-[8%]",
  tr: "right-0 top-[8%]",
  bl: "left-0 bottom-[8%]",
  br: "right-0 bottom-[8%]",
}

function GeneCardBox({ card }: { card: GeneCard }) {
  return (
    <div className="group/card gene-float-anim w-[200px] rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_28px_-6px_oklch(0.79_0.13_200/0.6)]">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors group-hover/card:bg-accent/20">
          <card.icon className="size-[18px]" />
        </span>
        <h4 className="text-sm font-semibold leading-snug text-foreground">{card.title}</h4>
      </div>
      <p className="mt-2.5 text-pretty text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
    </div>
  )
}

function Core() {
  return (
    <div className="relative flex size-36 items-center justify-center lg:size-40">
      {/* 外圈脉冲 */}
      <span className="ring-pulse-anim absolute inset-0 rounded-full border border-accent/30" aria-hidden="true" />
      <span
        className="ring-pulse-anim absolute -inset-4 rounded-full border border-accent/15"
        style={{ animationDelay: "0.8s" }}
        aria-hidden="true"
      />
      {/* 旋转刻度环 */}
      <span className="core-ticks absolute -inset-2 rounded-full opacity-60" aria-hidden="true" />
      {/* 扫光环 */}
      <span className="core-sweep absolute inset-1 rounded-full opacity-70" aria-hidden="true" />
      {/* 核心球 */}
      <div className="gene-core-breathe relative flex size-28 items-center justify-center rounded-full border border-accent/40 bg-[radial-gradient(circle_at_50%_35%,oklch(0.45_0.12_220/0.9),oklch(0.2_0.04_240/0.95))] lg:size-32">
        <span className="core-grid-mask absolute inset-0 rounded-full opacity-50" aria-hidden="true" />
        <div className="relative flex flex-col items-center">
          <Droplets className="size-5 text-accent" />
          <span className="core-flicker-anim mt-1 text-center text-sm font-bold leading-tight text-foreground">
            水务运营
            <br />
            认知
          </span>
        </div>
      </div>
    </div>
  )
}

export function CompanyGene() {
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center gap-3 lg:justify-end">
        <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-accent/40 lg:block" aria-hidden="true" />
        <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
        <h2 className="text-sm font-semibold tracking-wide text-foreground/90">
          公司基因 / 水务运营数字化能力沉淀
        </h2>
      </div>

      {/* ---------- 大屏：能力基因图谱舞台 ---------- */}
      <div className="relative mx-auto hidden aspect-[600/480] w-full max-w-[600px] lg:block">
        {/* 连线层 */}
        <svg
          viewBox="0 0 600 480"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gene-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.79 0.13 200)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.63 0.17 250)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {cards.map((c) => (
            <g key={c.id}>
              <path d={c.path} fill="none" stroke="url(#gene-line)" strokeWidth="1.5" />
              <path d={c.path} fill="none" stroke="oklch(0.85 0.13 200)" strokeWidth="1.5" className="gene-flow" />
              {/* 流动光点 */}
              <circle r="3" fill="oklch(0.9 0.12 200)">
                <animateMotion dur="3s" begin={c.begin} repeatCount="indefinite" path={c.path} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3s"
                  begin={c.begin}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* 轨道点缀标签 */}
        {orbitTags.map((t) => (
          <span
            key={t.label}
            className="gene-twinkle-anim pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-card/60 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur"
            style={{ left: t.x, top: t.y, animationDelay: t.d }}
          >
            {t.label}
          </span>
        ))}

        {/* 中心核心 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Core />
        </div>

        {/* 四角能力卡片 */}
        {cards.map((c) => (
          <div key={c.id} className={`absolute ${cornerClass[c.corner]}`}>
            <GeneCardBox card={c} />
          </div>
        ))}
      </div>

      {/* ---------- 移动端：简化堆叠 ---------- */}
      <div className="lg:hidden">
        <div className="mb-6 flex justify-center">
          <Core />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <GeneCardBox key={c.id} card={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
