"use client"

import { ArrowDown } from "lucide-react"
import { CwCloudSlide } from "@/components/cw-cloud-slide"
import { Cw3dpSlide } from "@/components/cw-3dp-slide"

export function Products() {
  return (
    <section id="products" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Core Products
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            核心产品
          </h2>
        </div>

        {/* 两大产品定位：左右分立，中间“端到端”连接 */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-stretch gap-4 md:flex-row md:items-center">
          {/* CW-Cloud */}
          <a
            href="#cw-cloud"
            aria-label="进入 CW-Cloud 水务 AI 运营平台"
            className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.79 0.13 200 / 0.6), transparent)" }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs tracking-wider text-accent">CW-Cloud</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/[0.06] px-2 py-1 text-[10px] text-accent/80 transition-colors group-hover:border-accent/45 group-hover:text-accent">
                进入产品
                <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">水务 AI 运营平台</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              以运营管理为核心，覆盖生产运行、设备运维、工单闭环、数据分析与 AI 辅助决策，支撑多业态统一运营。
            </p>
          </a>

          {/* 弱化连接符：数据贯通 / 场景联动，不喧宾夺主 */}
          <div className="flex shrink-0 items-center justify-center gap-2 md:flex-col md:gap-1.5">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-border md:h-6 md:w-px md:bg-gradient-to-b" />
            <div className="flex flex-col items-center whitespace-nowrap text-center text-[11px] leading-tight text-muted-foreground/70">
              <span>数据贯通</span>
              <span>场景联动</span>
            </div>
            <span className="h-px w-6 bg-gradient-to-r from-border to-transparent md:h-6 md:w-px md:bg-gradient-to-b" />
          </div>

          {/* CW-Visual */}
          <a
            href="#cw-visual"
            aria-label="进入 CW-Visual 三维数字孪生平台"
            className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.63 0.17 250 / 0.6), transparent)" }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs tracking-wider text-accent">CW-Visual</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/[0.06] px-2 py-1 text-[10px] text-primary/80 transition-colors group-hover:border-primary/45 group-hover:text-primary">
                进入产品
                <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">三维数字孪生平台</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              以三维空间为载体，融合 BIM/GIS、实时数据和业务信息，实现对象可视、状态联动、过程还原与仿真推演。
            </p>
          </a>
        </div>

        {/* 产品一：CW-Cloud */}
        <div id="cw-cloud" className="mt-12 scroll-mt-24">
          <CwCloudSlide active />
        </div>

        {/* 产品二：CW-Visual */}
        <div id="cw-visual" className="mt-10 scroll-mt-24">
          <Cw3dpSlide />
        </div>
      </div>
    </section>
  )
}
