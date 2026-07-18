import { Building2, Award, FileCheck, ShieldCheck } from "lucide-react"
import { CompanyGene } from "@/components/company-gene"
import { GrowthTimeline } from "@/components/growth-timeline"
import { DataFlowStream } from "@/components/data-flow-stream"

const heroStats = [
  { icon: Building2, num: "2015", label: "公司成立" },
  { icon: FileCheck, num: "50+", label: "软件著作权" },
  { icon: ShieldCheck, num: "10+", label: "硬件发明专利" },
  { icon: Award, num: "AAA", label: "企业信用等级" },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
      {/* 科技网格 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-7xl px-6 pt-10 pb-16 lg:pt-12">
        {/* 顶部价值观 */}
        <div className="mb-10 flex items-center justify-center gap-4 lg:mb-14 lg:gap-6">
          <span
            className="h-px w-16 bg-gradient-to-r from-transparent to-accent/60 sm:w-24 lg:w-32"
            aria-hidden="true"
          />
          <p className="flex items-center gap-3 lg:gap-4">
            {["执着", "共生", "求变"].map((w, i) => (
              <span key={w} className="flex items-center gap-3 lg:gap-4">
                {i > 0 && (
                  <span
                    className="size-1 rotate-45 bg-accent/70 shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.5)]"
                    aria-hidden="true"
                  />
                )}
                <span className="text-gradient text-lg font-semibold tracking-[0.4em] lg:text-xl">{w}</span>
              </span>
            ))}
          </p>
          <span
            className="h-px w-16 bg-gradient-to-l from-transparent to-accent/60 sm:w-24 lg:w-32"
            aria-hidden="true"
          />
        </div>

        {/* 数据粒子流光带（约束在 Hero 文案区域下方，不触及时间轴） */}
        <DataFlowStream />
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          {/* 左侧：价值主张 */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
              源于水务集团运营实践
            </div>

            {/* 主标题 */}
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.16] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              做更懂水务运营管理的
              <br />
              <span className="text-gradient">数字化产品公司</span>
            </h1>

            {/* 副标题 */}
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，打造面向水务行业的标准化、产品化、可配置的软件服务能力。
            </p>

            {/* 资质数据（弱化为轻量行内标签） */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {heroStats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <s.icon className="size-4 text-primary/70" />
                  <span className="text-sm font-bold text-foreground/90">{s.num}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：公司基因 / 水务运营数字化能力沉淀 */}
          <div>
            <CompanyGene />
          </div>
        </div>
      </div>

      {/* 下方：水务数字化能力演进轨迹 */}
      <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-20">
        <GrowthTimeline />
      </div>
    </section>
  )
}
