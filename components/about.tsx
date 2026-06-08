import { Award, Building2, FileCheck, ShieldCheck } from "lucide-react"

const intro =
  "北京云建标科技有限公司（CYBERWATER）成立于 2015 年，技术团队来自北控水务、威立雅、中信国安智慧城市、中国建筑标准设计研究院、阿里等，专注于水务 / 水利数字化建设与运营。我们将 AI、BIM、GIS、边云协同等技术应用于水务、水环境和水利的建设、运营、管理中，立志成为「最懂运营管理的智慧水务科技公司」。"

const intro2 =
  "借助与水务行业领先企业的深入合作，我们创新性地将水务运营管理经验与信息化技术、自控技术、专业模型深度融合，打造集「精确感知 + 无缝协同 + 智慧决策」为一体的多业态运营管理能力，赋能水务企业数字化转型，助力政府涉水业务的精细化监管。"

const stats = [
  { icon: Building2, num: "2015", label: "公司成立" },
  { icon: FileCheck, num: "30+", label: "软件著作权" },
  { icon: ShieldCheck, num: "10+", label: "硬件发明专利" },
  { icon: Award, num: "AAA", label: "企业信用等级" },
]

const timeline = [
  { year: "2015", title: "公司成立", desc: "中信国安 + 中国建筑标准院团队组建" },
  { year: "2016", title: "双高认证", desc: "通过国家、中关村高新技术企业认证" },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "上海院士论坛首个推出数字孪生水厂，在鹤山实现流域级数字孪生",
  },
  {
    year: "2020",
    title: "加入中国水协智慧委",
    desc: "成为水协智慧委常委委员单位，掌握水务全业态核心产品",
  },
  { year: "2022", title: "对外服务", desc: "全面服务于行业市场" },
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
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-sm font-medium text-primary">关于云建标</span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              最懂运营管理的智慧水务科技公司
            </h2>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              {intro}
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {intro2}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
          </div>

          {/* 成长历程 */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">成长历程</h3>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[31px] top-1 flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-primary/15" />
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary">
                      {t.year}
                    </span>
                    <span className="font-semibold text-foreground">
                      {t.title}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 荣誉资质 */}
        <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8">
          <h3 className="text-lg font-semibold text-foreground">荣誉资质</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {honors.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
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
