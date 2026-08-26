import { CompanyStats } from "@/components/company-stats"

const aboutIntro =
  "北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，形成了面向水务行业的标准化、产品化、可配置的软件服务能力。"

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-border/60 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            About
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            从水务运营中长出来的数字化产品公司
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{aboutIntro}</p>
        </div>
        <CompanyStats className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4" />
      </div>
    </section>
  )
}
