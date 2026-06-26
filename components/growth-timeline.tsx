const milestones = [
  {
    year: "2015",
    title: "公司成立",
    desc: "聚焦 BIM / CIM 与数字化工程能力起步。",
    highlight: false,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "通过高新技术企业认定，夯实技术资质。",
    highlight: false,
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "深度绑定国内头部水务集团，进入真实运营场景。",
    highlight: true,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "参与行业标准建设，沉淀管理标准与业务流程。",
    highlight: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "从集团内部能力走向行业，开放产品化技术服务。",
    highlight: true,
  },
  {
    year: "2024 - 2025",
    title: "智水积木云 · 智能体布局",
    desc: "推出标准化、可配置的智水积木云产品，并前瞻布局水务智能体。",
    highlight: false,
  },
  {
    year: "2026",
    title: "新一代 AI 智能运营平台发布",
    desc: "感知—认知—决策—执行—进化，全面赋能水务智能化运营。",
    highlight: true,
  },
]

export function GrowthTimeline() {
  return (
    <div className="relative mt-12">
      {/* 横向连接线（大屏） */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[1.125rem] hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"
        aria-hidden="true"
      />

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
        {milestones.map((m) => (
          <li key={m.year} className="relative flex flex-col">
            {/* 节点 */}
            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
              <span
                className={`relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                  m.highlight
                    ? "border-accent bg-accent/15 text-accent shadow-[0_0_18px_-2px_oklch(0.79_0.13_200/0.7)]"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {m.highlight ? "★" : "·"}
              </span>
            </div>

            {/* 卡片 */}
            <div
              className={`mt-0 flex flex-1 flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 lg:mt-4 ${
                m.highlight
                  ? "border-accent/40 bg-card shadow-lg shadow-accent/10 ring-hairline"
                  : "border-border bg-card/60 hover:border-accent/30"
              }`}
            >
              <div
                className={`font-mono text-sm font-bold ${
                  m.highlight ? "text-accent" : "text-foreground"
                }`}
              >
                {m.year}
              </div>
              <h4 className="mt-2 text-pretty text-sm font-semibold leading-snug text-foreground">
                {m.title}
              </h4>
              <p className="mt-2 text-pretty text-xs leading-relaxed text-muted-foreground">
                {m.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
