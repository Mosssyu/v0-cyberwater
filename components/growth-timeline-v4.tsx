import { Building2, Box, Layers, Sparkles, UserRound, Users } from "lucide-react"

const milestones = [
  { year: "2015", title: "公司成立", desc: "中信国安+中国建筑标准院团队，以数字技术推动水务运营管理升级，开启云建标创新发展之路。", Icon: Building2 },
  { year: "2018", title: "北控水务战略入股", desc: "北控水务战略入股，深度融入头部水务集团运营体系，从技术能力真正进入实战水务运营场景。", Icon: Users },
  { year: "2020", title: "加入水协智慧委", desc: "成为水协智慧委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。", Icon: UserRound },
  { year: "2022", title: "全面对外服务", desc: "逐步建立水务 SaaS 产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。", Icon: Box },
  { year: "2025", title: "智水积木云产品化", desc: "管理、技术、产品体系重构，沉淀并打造智水云平台，并结合大型项目积累形成高水准产品化能力。", Icon: Layers },
  { year: "2026", title: "AI 智能运营平台发布", desc: "深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。", Icon: Sparkles },
]

export function GrowthTimelineV4() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <span className="v4-kicker">Evolution / 发展历程</span>
          <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-[.98] tracking-[-0.055em] text-foreground sm:text-6xl">
            <span className="block sm:inline">十一年，</span><span className="block sm:inline">沿着水务运营</span><br className="hidden sm:block" /><span className="block text-white/34">持续向前。</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-muted-foreground lg:text-right">从技术团队到水务智能运营平台，每一步都来自真实场景的沉淀与验证。</p>
      </div>

      <div className="relative mt-16">
        <div className="v4-timeline-line absolute inset-x-0 top-[1.1rem] hidden h-px bg-white/12 xl:block" aria-hidden="true" />
        <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-6">
          {milestones.map(({ year, title, desc, Icon }, index) => (
            <li key={year} className="group relative min-h-64 bg-transparent py-2 transition-colors hover:bg-white/[0.015]">
              <div className="relative z-[1] flex items-center justify-between">
                <span className={`v4-timeline-node flex size-9 items-center justify-center rounded-full border bg-[#050b0f] ${year === "2026" ? "border-accent text-accent" : "border-white/20 text-white/48"}`}>
                  <Icon className="size-4" />
                </span>
                <span className="v4-index">0{index + 1}</span>
              </div>
              <p className={`mt-10 font-mono text-3xl tracking-[-0.04em] ${year === "2026" ? "text-accent" : "text-white/82"}`}>{year}</p>
              <h3 className="mt-3 text-base font-medium text-foreground">{title}</h3>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{desc}</p>
              {year === "2026" && <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
