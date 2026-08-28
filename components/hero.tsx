import { CompanyGene } from "@/components/company-gene"
import { CompanyStats } from "@/components/company-stats"
import { GrowthTimelineV4 } from "@/components/growth-timeline-v4"
import { DataFlowStream } from "@/components/data-flow-stream"
import { LiquidWaterCanvas } from "@/components/liquid-water-canvas"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="liquid-hero relative min-h-[calc(100svh-4rem)] overflow-hidden">
        <LiquidWaterCanvas />
        <div className="liquid-hero-noise pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,8,.92)_0%,rgba(2,5,8,.52)_46%,rgba(2,5,8,.06)_78%)]" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between px-5 py-8 sm:px-8 lg:px-14 lg:py-12 xl:px-20">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-xs">
            <span>Cyberwater · Beijing</span>
            <span className="hidden sm:block">Water intelligence / 2015—2026</span>
          </div>

          <div className="max-w-4xl py-16 lg:py-20">
            <div className="mb-6 flex items-center gap-3 text-xs tracking-[0.2em] text-white/58 sm:text-sm">
              <span className="h-px w-10 bg-white/45" />
              源于水务集团运营实践
            </div>
            <h1 className="text-balance text-[clamp(3.35rem,7.7vw,8.4rem)] font-medium leading-[0.86] tracking-[-0.065em] text-white">
              水，正在被
              <br />
              <span className="liquid-title">重新理解</span>
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-sm leading-7 text-white/62 sm:text-base lg:mt-10 lg:text-lg lg:leading-8">
              做更懂水务运营管理的数字化产品公司。让每一次感知、决策与执行，汇入可持续进化的水务智能运营体系。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/#products" className="liquid-primary-action inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">
                探索核心产品 <ArrowUpRight className="size-4" />
              </a>
              <a href="/#cases" className="inline-flex items-center rounded-full border border-white/20 bg-black/10 px-6 py-3 text-sm text-white/78 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white">
                查看客户实践
              </a>
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-white/12 pt-5 text-xs text-white/42">
            <span className="max-w-[12rem] leading-5 sm:max-w-none">执着 · 共生 · 求变</span>
            <a href="#company-gene" className="flex items-center gap-2 transition-colors hover:text-white">
              向下探索 <ArrowDown className="size-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      <div id="company-gene" className="relative bg-[#020508] px-5 pt-24 sm:px-8 lg:px-14 lg:pt-32 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,oklch(0.55_0.08_220/.12),transparent_34%),linear-gradient(to_bottom,rgba(20,43,53,.12),transparent_22%)]" aria-hidden="true" />
        <DataFlowStream />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020508] via-[#020508]/80 to-transparent" aria-hidden="true" />
        <div className="relative z-10 grid items-center gap-16 xl:grid-cols-[minmax(0,.8fr)_minmax(620px,1.2fr)]">
          <div className="max-w-2xl">
            <span className="v4-kicker">Our origin / 水务运营管理基因</span>
            <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-foreground sm:text-6xl">不是为水务增加一个系统，<br /><span className="text-white/34">而是让运营成为能力。</span></h2>
            <p className="mt-7 max-w-xl text-pretty leading-7 text-muted-foreground">北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。依托国内头部水务集团运营实践，持续沉淀管理标准、业务流程与技术能力。</p>
            <CompanyStats compact className="v4-origin-stats mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4" />
          </div>
          <CompanyGene />
        </div>
        <div className="relative z-10 mt-20 lg:mt-28">
          <GrowthTimelineV4 />
        </div>
      </div>
    </section>
  )
}
