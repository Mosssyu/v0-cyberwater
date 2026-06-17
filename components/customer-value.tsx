import { NeonIcon } from "@/components/neon-icon"

const values = [
  {
    img: "/icons/val-platform.png",
    glow: "oklch(0.74 0.14 205)",
    title: "统一平台",
    desc: "降低多系统割裂，统一数据与业务入口。",
  },
  {
    img: "/icons/val-collab.png",
    glow: "oklch(0.7 0.16 160)",
    title: "多业态协同",
    desc: "提升集团化管理与跨业务协同能力。",
  },
  {
    img: "/icons/val-data.png",
    glow: "oklch(0.79 0.13 200)",
    title: "数据驱动",
    desc: "提升运行分析效率与决策科学性。",
  },
  {
    img: "/icons/val-ai.png",
    glow: "oklch(0.72 0.14 300)",
    title: "AI 赋能",
    desc: "沉淀企业运营经验，持续优化运营。",
  },
]

export function CustomerValue() {
  return (
    <section className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Value
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            为水务集团创造可衡量的运营价值
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-2xl border border-border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <NeonIcon src={value.img} alt={value.title} glow={value.glow} className="mx-auto size-16" />
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
