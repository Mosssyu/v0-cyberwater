import { CompanyGene } from "@/components/company-gene"
import { GrowthTimeline } from "@/components/growth-timeline"
import { DataFlowStream } from "@/components/data-flow-stream"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
      {/* 科技网格 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* 数据粒子流光带（左下角氛围层，z 低于内容、高于网格） */}
      <DataFlowStream />

      <div className="relative z-[1] mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          {/* 左侧：价值主张 */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
              企业级 AI 水务操作系统 · CW-Cloud
            </div>

            {/* 主标题 */}
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.16] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              做最懂水务运营管理的
              <br />
              <span className="text-gradient">数字化产品公司</span>
            </h1>

            {/* 副标题 */}
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，打造面向水务行业的标准化、产品化、可配置的软件服务能力。
            </p>
          </div>

          {/* 右侧：公司基因 / 水务运营数字化能力沉淀 */}
          <div>
            <CompanyGene />
          </div>
        </div>
      </div>

      {/* 下方：十年水务数字化实践沉淀 */}
      <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20">
        {/* 区块标签：小圆点 + 标题 + 细线（弱化处理，不与主标题抢层级） */}
        <div className="flex items-center gap-3">
          <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
          <h2 className="text-sm font-semibold tracking-wide text-foreground/90 whitespace-nowrap">
            十年水务数字化实践沉淀
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" aria-hidden="true" />
        </div>
        <GrowthTimeline />
      </div>
    </section>
  )
}
