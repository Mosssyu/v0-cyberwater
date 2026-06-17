import { Target, Network, Rocket } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "执着",
    en: "Dedication",
    headline: "长期深耕，把复杂问题做扎实",
    paras: [
      "水务行业复杂、专业、长期，真正的价值来自持续理解现场、理解工艺、理解运营、理解管理。",
      "我们坚持从真实场景出发，持续打磨产品细节，重视每一次交付、每一个流程、每一个数据、每一次用户反馈。",
    ],
    note: "执着不是固执，而是对行业价值、产品质量和客户结果的长期坚持。",
    keywords: ["长期主义", "深耕水务", "产品打磨", "交付负责", "结果导向"],
  },
  {
    icon: Network,
    title: "共生",
    en: "Symbiosis",
    headline: "与客户、伙伴和行业共同成长",
    paras: [
      "水务数字化不是单一系统的建设，而是客户、业务、设备、数据、伙伴和生态之间的协同。",
      "我们坚持开放合作，尊重客户现有系统与管理基础，连接设备厂商、算法厂商、GIS、三维、AI、大模型和业务平台，共同构建可持续演进的水务数字化生态。",
    ],
    note: "共生不是简单合作，而是在共同目标下实现能力互补、价值共创和长期成长。",
    keywords: ["客户共创", "生态开放", "系统融合", "伙伴协同", "价值共享"],
  },
  {
    icon: Rocket,
    title: "求变",
    en: "Evolution",
    headline: "拥抱变化，持续进化",
    paras: [
      "水务行业正在从信息化、数字化走向智能化，AI、大模型、数字孪生、物联网和数据智能正在重塑运营管理方式。",
      "我们保持对新技术、新模式和新需求的敏感，不断推动产品架构、业务能力和服务模式升级。",
    ],
    note: "求变不是盲目追新，而是在理解行业本质的基础上，用更好的技术和方法解决真实问题。",
    keywords: ["持续创新", "AI 驱动", "架构升级", "快速迭代", "面向未来"],
  },
]

const summary = [
  { k: "执着", v: "让我们把水务行业做深、做细、做扎实。" },
  { k: "共生", v: "让我们与客户、伙伴和行业一起成长。" },
  { k: "求变", v: "让我们持续进化，面向未来构建新一代水务智能运营平台。" },
]

export function Values() {
  return (
    <section
      id="values"
      className="relative overflow-hidden border-y border-border bg-[oklch(0.13_0.012_252)] py-24"
    >
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 总纲 */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent backdrop-blur">
            Values
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            执着 · 共生 · <span className="text-gradient">求变</span>
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            我们相信，真正有价值的水务数字化产品，不是短期包装出来的概念，而是在长期行业实践中持续打磨、与客户共同成长、不断适应变化的结果。
          </p>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            我们以执着深耕行业，以共生连接客户与生态，以求变推动产品和组织持续进化。
          </p>
        </div>

        {/* 三张发光卡片 */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 ring-hairline transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 text-accent">
                  <v.icon className="size-6" />
                </div>
                <span className="font-mono text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {v.en}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground/90">
                {v.headline}
              </p>

              <div className="mt-4 space-y-2.5">
                {v.paras.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>

              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-accent">
                {v.note}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {v.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground/80"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 价值观总结 */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card/60 p-8 ring-hairline backdrop-blur">
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            aria-hidden="true"
          />
          <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

          <div className="relative grid gap-px sm:grid-cols-3">
            {summary.map((s, i) => (
              <div
                key={s.k}
                className="group relative flex flex-col gap-3 px-6 py-2 first:pl-0 last:pr-0"
              >
                {/* 列间发光分隔线 */}
                {i > 0 && (
                  <span
                    className="pointer-events-none absolute -left-px top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center gap-3">
                  <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-gradient-to-br from-accent/20 to-primary/20 font-mono text-sm font-bold text-accent transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_0_18px_-4px_var(--color-accent)]">
                    0{i + 1}
                  </span>
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    {s.k}
                  </span>
                  <span
                    className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-accent/60 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
