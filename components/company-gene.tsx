"use client"

import { Layers, Building2, Boxes, BrainCircuit, Droplets } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ParticleSphere } from "@/components/particle-sphere"

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
    id: "standard",
    title: "运营标准化体系",
    desc: "数字化建设标准、运营考核指标、水务知识库",
    icon: Layers,
    corner: "tl",
    path: "M300,232 Q200,150 132,120",
    begin: "0s",
  },
  {
    id: "scene",
    title: "多项目场景沉淀",
    desc: "380+ 座水厂、2000+ 公里河道 / 管网、1000+ 座泵闸 / 厂站、100+项目落地",
    icon: Boxes,
    corner: "tr",
    path: "M300,232 Q400,150 468,120",
    begin: "0.6s",
  },
  {
    id: "group",
    title: "集团化多业态",
    desc: "多层级管理、一厂一策、供排一体化",
    icon: Building2,
    corner: "bl",
    path: "M300,232 Q200,318 132,356",
    begin: "1.2s",
  },
  {
    id: "fusion",
    title: "技术和业务融合",
    desc: "跨专业团队、产学研生态、行业专家指导、AI coding",
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
    <div className="group/card gene-float-anim w-[200px] rounded-2xl border border-transparent bg-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-card/60 hover:backdrop-blur-md hover:shadow-[0_0_28px_-6px_oklch(0.79_0.13_200/0.5)]">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/[0.06] text-accent/80 transition-colors group-hover/card:border-accent/25 group-hover/card:bg-accent/15 group-hover/card:text-accent">
          <card.icon className="size-[18px]" />
        </span>
        <h4 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover/card:text-foreground">
          {card.title}
        </h4>
      </div>
      <p className="mt-2.5 text-pretty text-xs leading-relaxed text-foreground/85 transition-colors group-hover/card:text-foreground">
        {card.desc}
      </p>
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
            基因
          </span>
        </div>
      </div>
    </div>
  )
}

export function CompanyGene() {
  return (
    <div className="w-full">
      {/* ---------- 大屏：能力基因图谱舞台 ---------- */}
      <div className="relative mx-auto hidden aspect-[600/480] w-full max-w-[600px] lg:block">
        {/* 三维粒子球体神经网络（纯 Canvas 渲染） */}
        <ParticleSphere className="absolute inset-0 size-full" />

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

      {/* ---------- 移动端：轻量粒子球体舞台 + 卡片堆叠 ---------- */}
      <div className="lg:hidden">
        {/* 轻量版三维粒子球体（移动端 24fps / 精简粒子，离屏与后台自动暂停） */}
        <div className="relative mx-auto mb-6 aspect-square w-full max-w-[340px]">
          <ParticleSphere className="absolute inset-0 size-full" />

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
