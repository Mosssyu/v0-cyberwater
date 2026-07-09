"use client"

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
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            <span className="text-foreground/90">CW-Cloud</span> 与 <span className="text-foreground/90">CW-3DP</span>{" "}
            分别面向水务运营管理和三维空间表达，既可独立建设，也可组合应用，支撑水厂、泵站、管网、河湖等场景的数字化升级。
          </p>
        </div>

        {/* 两大产品定位：左右分立，中间“端到端”连接 */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-stretch gap-4 md:flex-row md:items-center">
          {/* CW-Cloud */}
          <div className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-left transition-colors duration-300 hover:border-accent/50">
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.79 0.13 200 / 0.6), transparent)" }}
            />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider text-accent">CW-Cloud</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase text-accent">
                AI Operation
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">水务 AI 运营平台</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              以运营管理为核心，覆盖生产运行、设备运维、工单闭环、数据分析与 AI 辅助决策，支撑多业态统一运营。
            </p>
          </div>

          {/* 弱化连接符：数据贯通 / 场景联动，不喧宾夺主 */}
          <div className="flex shrink-0 items-center justify-center gap-2 md:flex-col md:gap-1.5">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-border md:h-6 md:w-px md:bg-gradient-to-b" />
            <div className="flex flex-col items-center whitespace-nowrap text-center text-[11px] leading-tight text-muted-foreground/70">
              <span>数据贯通</span>
              <span>场景联动</span>
            </div>
            <span className="h-px w-6 bg-gradient-to-r from-border to-transparent md:h-6 md:w-px md:bg-gradient-to-b" />
          </div>

          {/* CW-3DP */}
          <div className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-left transition-colors duration-300 hover:border-accent/50">
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, oklch(0.63 0.17 250 / 0.6), transparent)" }}
            />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider text-accent">CW-3DP</span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase text-accent">
                Digital Twin
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">三维数字孪生平台</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              以三维空间为载体，融合 BIM/GIS、实时数据和业务信息，实现对象可视、状态联动、过程还原与仿真推演。
            </p>
          </div>
        </div>

        {/* 产品一：CW-Cloud */}
        <div className="mt-12">
          <CwCloudSlide active />
        </div>

        {/* 产品二：CW-3DP */}
        <div className="mt-10">
          <Cw3dpSlide />
        </div>
      </div>
    </section>
  )
}
