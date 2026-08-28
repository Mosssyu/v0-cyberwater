"use client"

import { Building2, Boxes, BrainCircuit, Droplets, Layers } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type GeneItem = {
  id: string
  index: string
  title: string
  desc: string
  icon: LucideIcon
  path: string
  end: [number, number]
  position: string
}

const genes: GeneItem[] = [
  {
    id: "standard",
    index: "01",
    title: "运营标准化体系",
    desc: "数字化建设标准、运营考核指标、水务知识库",
    icon: Layers,
    path: "M174 260 C238 260 258 72 360 72",
    end: [360, 72],
    position: "left-[52%] top-[4%]",
  },
  {
    id: "scene",
    index: "02",
    title: "多项目场景沉淀",
    desc: "380+ 座水厂、2000+ 公里河道 / 管网、1000+ 座泵闸 / 厂站、100+ 项目落地",
    icon: Boxes,
    path: "M174 260 C250 260 282 190 382 190",
    end: [382, 190],
    position: "left-[55%] top-[27%]",
  },
  {
    id: "group",
    index: "03",
    title: "集团化多业态",
    desc: "多层级管理、一厂一策、供排一体化",
    icon: Building2,
    path: "M174 260 C250 260 278 330 360 330",
    end: [360, 330],
    position: "left-[52%] top-[54%]",
  },
  {
    id: "fusion",
    index: "04",
    title: "技术和业务融合",
    desc: "跨专业团队、产学研生态、行业专家指导、AI coding",
    icon: BrainCircuit,
    path: "M174 260 C235 260 264 450 382 450",
    end: [382, 450],
    position: "left-[55%] top-[78%]",
  },
]

function GeneCore({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`company-gene-core relative flex items-center justify-center rounded-full ${compact ? "size-40" : "size-44"}`}
      aria-label="水务运营管理基因"
    >
      <span className="gene-source-pulse absolute inset-0 rounded-full border border-accent/18" aria-hidden="true" />
      <span className="absolute inset-4 rounded-full border border-dashed border-accent/24" aria-hidden="true" />
      <span className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_48%_38%,rgba(93,219,241,.2),rgba(8,28,36,.82)_58%,rgba(2,5,8,.96))]" aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center">
        <Droplets className="size-5 text-accent" aria-hidden="true" />
        <span className="mt-2 text-sm font-medium leading-5 text-white/92">水务运营<br />管理基因</span>
        <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">Operating DNA</span>
      </div>
    </div>
  )
}

function GeneContent({ gene }: { gene: GeneItem }) {
  const Icon = gene.icon

  return (
    <div className="gene-flow-item grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
      <span className="flex size-9 items-center justify-center bg-accent/[0.07] text-accent/80">
        <Icon className="size-[17px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[9px] tracking-[0.16em] text-accent/45">{gene.index}</span>
          <h3 className="text-sm font-medium text-white/90">{gene.title}</h3>
        </div>
        <p className="mt-2 max-w-[18rem] text-xs leading-5 text-white/46">{gene.desc}</p>
      </div>
    </div>
  )
}

export function CompanyGene() {
  return (
    <div className="w-full" aria-label="水务运营管理基因能力图谱">
      <div className="gene-flow-stage relative mx-auto hidden aspect-[720/520] w-full max-w-[720px] overflow-hidden lg:block">
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(4rem,7vw,7rem)] font-semibold leading-none tracking-[-0.07em] text-white/[0.018]" aria-hidden="true">
          OPERATING DNA
        </span>

        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 720 520" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="gene-base-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(84, 215, 239, 0)" />
              <stop offset="0.42" stopColor="rgba(84, 215, 239, 0.24)" />
              <stop offset="1" stopColor="rgba(84, 215, 239, 0.08)" />
            </linearGradient>
          </defs>

          <path d="M0 260 C62 260 108 260 174 260" stroke="url(#gene-base-flow)" strokeWidth="1.2" />
          <path d="M0 260 C62 260 108 260 174 260" className="gene-stream-flow" stroke="rgba(111, 229, 248, .75)" strokeWidth="1.6" />

          {genes.map((gene, index) => (
            <g key={gene.id}>
              <path d={gene.path} stroke="rgba(104, 212, 232, .14)" strokeWidth="1" />
              <path
                d={gene.path}
                className="gene-stream-flow"
                stroke="rgba(111, 229, 248, .72)"
                strokeWidth="1.4"
                style={{ animationDelay: `${index * -0.8}s` }}
              />
              <circle cx={gene.end[0]} cy={gene.end[1]} r="3" fill="rgba(111, 229, 248, .82)" />
              <circle cx={gene.end[0]} cy={gene.end[1]} r="8" fill="none" stroke="rgba(111, 229, 248, .16)" />
            </g>
          ))}
        </svg>

        <div className="absolute left-[24.2%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <GeneCore />
        </div>

        <ol>
          {genes.map((gene) => (
            <li key={gene.id} className={`absolute w-[43%] ${gene.position}`}>
              <GeneContent gene={gene} />
            </li>
          ))}
        </ol>
      </div>

      <div className="lg:hidden">
        <div className="relative mx-auto flex max-w-sm justify-center py-7">
          <span className="absolute left-0 right-1/2 top-1/2 h-px bg-gradient-to-r from-transparent to-accent/30" aria-hidden="true" />
          <GeneCore compact />
        </div>
        <ol className="relative mt-6 space-y-8 before:absolute before:bottom-4 before:left-[1.1rem] before:top-4 before:w-px before:bg-gradient-to-b before:from-accent/35 before:to-transparent">
          {genes.map((gene) => (
            <li key={gene.id} className="relative pl-1">
              <GeneContent gene={gene} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
