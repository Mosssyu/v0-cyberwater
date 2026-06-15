import {
  Award,
  Sprout,
  Boxes,
  Code2,
  Network,
  Building2,
  FileCheck,
  ShieldCheck,
} from "lucide-react"

const intro =
  "北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，形成了面向水务行业的标准化、产品化、可配置的软件服务能力。"

const tags = [
  {
    icon: Sprout,
    title: "运营场景内生",
    desc: "源于真实水务运营体系，贴近一线业务需求。",
  },
  {
    icon: Boxes,
    title: "产品能力沉淀",
    desc: "标准化、模块化、配置化，支撑快速复用、灵活扩展。",
  },
  {
    icon: Code2,
    title: "自主研发交付",
    desc: "平台自研、低代码配置，提升建设与迭代效率。",
  },
  {
    icon: Network,
    title: "开放融合共建",
    desc: "兼容既有系统，连接客户、伙伴与行业生态，集成交付。",
  },
]

const stats = [
  { icon: Building2, num: "2015", label: "公司成立" },
  { icon: FileCheck, num: "30+", label: "软件著作权" },
  { icon: ShieldCheck, num: "10+", label: "硬件发明专利" },
  { icon: Award, num: "AAA", label: "企业信用等级" },
]

const timeline = [
  { year: "2015", title: "公司成立", desc: "中信国安 + 中国建筑标准设计研究院相关团队创立云建标，开始布局城市数字化服务。" },
  { year: "2016", title: "双高认证", desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。" },
  { year: "2018", title: "北控水务战略入股", desc: "北控水务战略入股，云建标深入头部水务集团运营体系。" },
  { year: "2020", title: "加入水协智慧委", desc: "成为水协智慧委常委委员单位，进一步参与智慧水务行业实践与交流。" },
  { year: "2022", title: "全面对外服务", desc: "逐步掌握水务全业态核心产品能力，从集团内部场景沉淀走向行业市场。" },
  { year: "2024", title: "智水积木云产品化", desc: "推进管理、技术、产品体系重构，沉淀 CW-Cloud 新一代水务运营平台。" },
  { year: "2025", title: "智能体前瞻布局", desc: "结合大模型技术，持续推进水务智能体（CW-Agent）产品化。" },
]

const honors = [
  "国家高新技术企业",
  "中国水协智慧水务专业委员会委员单位",
  "企业信用等级 AAA",
  "CMMI3 认证",
  "ITSS 认证",
  "电子与智能化专业承包二级",
  "ISO9001 认证",
  "ISO20000 认证",
  "ISO27001 认证",
  "诚信系统集成企业",
]

export function About() {
  return (
    <section id="about" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* 公司简介 */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium text-primary">关于云建标</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            从水务运营中长出来的数字化产品公司
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>

        {/* 四大标签 */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tags.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <t.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 资质数据 */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <s.icon className="mx-auto size-5 text-primary" />
              <div className="mt-2 text-xl font-bold text-foreground">
                {s.num}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 发展历程 */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              十余年沉淀，从项目能力走向产品能力
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              从 BIM / CIM 到智慧水务，从数字孪生到智水积木云与水务智能体。
            </p>
          </div>

          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={t.year} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-lg font-bold text-primary">{t.year}</span>
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{t.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 荣誉资质 */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h3 className="text-lg font-semibold text-foreground">荣誉资质</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {honors.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-foreground"
              >
                <Award className="size-3.5 text-accent" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
