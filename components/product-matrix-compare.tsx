import { Bot, Network, Box as Cube, Factory } from "lucide-react"

const products = [
  {
    icon: Bot,
    code: "CW-Agent",
    tag: "智能认知与决策中枢",
    position: "智能认知与决策中枢",
    desc: "面向运营的 AI 大脑，负责知识问答、运行诊断、优化建议、报告生成与智能体闭环，让运营经验沉淀为可复用的智能能力。",
    duties: ["智能问答", "运行诊断", "优化建议", "报告生成", "智能体闭环"],
  },
  {
    icon: Network,
    code: "CW-PPI",
    tag: "多业态一体化运营平台",
    position: "多业态一体化运营平台",
    desc: "统一管理厂、站、网、河、湖、防汛与调度业务，打通集团化多业态运营，实现数据赋能与协同治理。",
    duties: ["水厂运营", "泵站调度", "管网管理", "河湖治理", "防汛调度"],
  },
  {
    icon: Cube,
    code: "CW-Visual",
    tag: "空间可视化与仿真推演平台",
    position: "空间可视化与仿真推演平台",
    desc: "融合 BIM+GIS 的二三维一体化平台，提供三维实景、空间定位、场景联动与模拟推演，实现全域可感知。",
    duties: ["三维实景", "空间定位", "场景联动", "模拟推演", "孪生运维"],
  },
  {
    icon: Factory,
    code: "CW-POM",
    tag: "数字水厂运营管理平台",
    position: "数字水厂运营管理平台",
    desc: "覆盖生产、设备、安全、巡检、工单、移动执行与经营分析的全流程闭环，打造新一代未来水厂。",
    duties: ["生产监控", "设备运维", "安全巡检", "工单移动执行", "经营分析"],
  },
]

export function ProductMatrixCompare() {
  return (
    <section id="product-compare" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Capability Matrix
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            四大产品，各司其职，协同成网
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            从智能决策到一体化运营、空间仿真与数字水厂，四大产品分层协同，构建端到端的智慧水务能力。
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.code}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span
                className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="size-5" />
                </div>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {p.code}
                </span>
              </div>

              <p className="mt-5 text-base font-semibold leading-snug text-foreground">
                {p.position}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                {p.duties.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
