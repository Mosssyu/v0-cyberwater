import { CompanyStats } from "@/components/company-stats"

const aboutIntro =
  "北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，形成了面向水务行业的标准化、产品化、可配置的软件服务能力。"

export function About() {
  return (
    <section id="about" className="v4-section scroll-mt-16 bg-[#060a0d]">
      <div className="relative z-[1]">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div><span className="v4-kicker">About / 关于云建标</span>
          <h2 className="mt-6 max-w-5xl text-balance text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-6xl">
            从水务运营中长出来的数字化产品公司
          </h2></div>
          <p className="text-pretty leading-8 text-muted-foreground">{aboutIntro}</p>
        </div>
        <CompanyStats className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4" />
      </div>
    </section>
  )
}
