import {
  Network,
  Factory,
  Radio,
  Bot,
  CloudRain,
  GitBranch,
  ArrowUpRight,
} from "lucide-react"

const products = [
  {
    icon: Network,
    title: "厂网河湖一体化平台",
    desc: "统一管理水厂、泵站、管网、河道、湖泊、防汛与调度业务，打通多业态运营。",
  },
  {
    icon: Factory,
    title: "水厂运营管理系统",
    desc: "覆盖生产运行、工艺管理、设备运维、巡检工单、报表分析的全流程闭环。",
  },
  {
    icon: Radio,
    title: "物联网 IoT 平台",
    desc: "统一接入液位计、流量计、雨量计、压力传感器、RTU、PLC 等设备数据。",
  },
  {
    icon: Bot,
    title: "AI 水务智能体平台",
    desc: "支持知识问数、报表生成、告警分析、调度辅助与工艺优化等智能能力。",
  },
  {
    icon: CloudRain,
    title: "防汛调度平台",
    desc: "支持雨情、水情、泵站、管网、积水点、预警预案的联动调度。",
  },
  {
    icon: GitBranch,
    title: "泵站 / 管网管理系统",
    desc: "实现资产、巡检、维修、告警、运行数据的一体化管理。",
  },
]

export function Products() {
  return (
    <section id="products" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">核心产品</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            面向集团化运营的智慧水务产品矩阵
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            从底层数据接入到上层业务应用，云建标提供端到端的智慧水务产品能力。
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <product.icon className="size-6" />
              </div>
              <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-foreground">
                {product.title}
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
