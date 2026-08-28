"use client"

import { ArrowDown } from "lucide-react"
import { CwCloudSlide } from "@/components/cw-cloud-slide"
import { Cw3dpSlide } from "@/components/cw-3dp-slide"

export function Products() {
  return (
    <section id="products" className="v4-section bg-[#05090c]">
      <div className="relative z-[1]">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="v4-kicker">Core Products / 核心产品</span>
            <h2 className="v4-display mt-6 max-w-5xl text-foreground">从运营出发，<br /><span className="text-white/36">让系统持续进化。</span></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground lg:text-right">两套核心产品贯通业务运营与空间孪生，支撑从单一场景到集团化多业态的一体化建设。</p>
        </div>

        {/* 两大产品定位：左右分立，中间“端到端”连接 */}
        <div className="v4-flat-grid mt-10 lg:grid-cols-2">
          {/* CW-Cloud */}
          <a
            href="#cw-cloud"
            aria-label="进入 CW-Cloud 水务 AI 运营平台"
            className="v4-flat-cell group relative flex min-h-[20rem] flex-col overflow-hidden p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:p-10"
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.79 0.13 200 / 0.6), transparent)" }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="v4-rule-label text-accent/70">CW-Cloud</span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-accent">
                进入产品
                <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <span className="pointer-events-none absolute -right-4 bottom-8 select-none text-[clamp(4rem,9vw,9rem)] font-semibold leading-none tracking-[-.08em] text-white/[0.035]" aria-hidden="true">CLOUD</span>
            <div className="relative mt-auto max-w-xl"><span className="v4-index block">PRODUCT / 01</span><h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-4xl">水务 AI 运营平台</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              以运营管理为核心，覆盖生产运行、设备运维、工单闭环、数据分析与 AI 辅助决策，支撑多业态统一运营。
            </p></div>
          </a>

          {/* 弱化连接符：数据贯通 / 场景联动，不喧宾夺主 */}
          <div className="hidden">
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
            className="v4-flat-cell group relative flex min-h-[20rem] flex-col overflow-hidden p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:p-10"
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.63 0.17 250 / 0.6), transparent)" }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="v4-rule-label text-accent/70">CW-Visual</span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-accent">
                进入产品
                <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
            <span className="pointer-events-none absolute -right-4 bottom-8 select-none text-[clamp(4rem,9vw,9rem)] font-semibold leading-none tracking-[-.08em] text-white/[0.035]" aria-hidden="true">VISUAL</span>
            <div className="relative mt-auto max-w-xl"><span className="v4-index block">PRODUCT / 02</span><h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-4xl">三维数字孪生平台</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              以三维空间为载体，融合 BIM/GIS、实时数据和业务信息，实现对象可视、状态联动、过程还原与仿真推演。
            </p></div>
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
