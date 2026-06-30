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
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            两大核心产品协同联动，<span className="text-foreground/90">从智能运营到空间仿真</span>，构建端到端的智慧水务能力。
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
              以 AI 智能体驱动，贯通厂网河湖业务，
              <br className="hidden sm:block" />
              实现一体化智能运营与科学决策。
            </p>
          </div>

          {/* 端到端连接符 */}
          <div className="flex shrink-0 items-center justify-center md:flex-col">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-accent/50 to-accent/50 md:h-8 md:w-px md:bg-gradient-to-b" />
            <span className="mx-2 whitespace-nowrap rounded-full border border-accent/30 bg-background px-3 py-1 font-mono text-[11px] text-accent md:my-2 md:mx-0">
              端到端
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-accent/50 via-accent/50 to-transparent md:h-8 md:w-px md:bg-gradient-to-b" />
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
            <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">三维数字孪生</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              融合 BIM/GIS 与实时数据，
              <br className="hidden sm:block" />
              还原水务对象，实现全景空间仿真。
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
