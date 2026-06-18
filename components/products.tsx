import { ArrowUpRight } from "lucide-react"
import { NeonIcon } from "@/components/neon-icon"

const products = [
  {
    img: "/icons/prod-agent.png",
    tag: "AI Agent",
    glow: "oklch(0.72 0.14 300)",
    title: "CW-Agent · 水务智能体",
    href: "/#product-agent",
    desc: "新一代 AI 智能体，支持知识问数、报表生成、告警分析、调度辅助与工艺优化，让运营经验沉淀为智能能力。",
  },
  {
    img: "/icons/prod-ppi.png",
    tag: "Platform",
    glow: "oklch(0.74 0.14 205)",
    title: "CW-PPI · 厂网河湖一体化",
    href: "/#product-ppi",
    desc: "统一管理水厂、泵站、管网、河道、湖泊、防汛与调度业务，数据赋能、智能治理，打通集团化多业态运营。",
  },
  {
    img: "/icons/prod-3dp.png",
    tag: "Digital Twin",
    glow: "oklch(0.62 0.18 250)",
    title: "CW-3DP · 三维孪生",
    href: "/#product-3dp",
    desc: "融合 BIM + GIS 的二三维一体化平台，构建数字孪生水厂与流域级孪生，实现全域可感知与可视化运维。",
  },
  {
    img: "/icons/prod-pom.png",
    tag: "Operation",
    glow: "oklch(0.7 0.16 160)",
    title: "CW-POM · 数字水厂",
    href: "/#product-pom",
    desc: "覆盖生产监控、工艺管理、设备运维、巡检工单、报表分析的全流程闭环，打造新一代未来水厂。",
  },
]

const support = [
  {
    img: "/icons/sup-iot.png",
    tag: "IoT",
    glow: "oklch(0.79 0.13 200)",
    title: "智能感知 IoT 平台",
    desc: "统一接入液位计、流量计、雨量计、压力传感器、RTU、PLC 等设备数据，实现精确感知。",
  },
  {
    img: "/icons/sup-sso.png",
    tag: "SSO",
    glow: "oklch(0.63 0.17 250)",
    title: "统一登录 SSO 平台",
    desc: "统一身份认证与单点登录，打通产品矩阵账号体系，实现一次登录、全平台无缝协同。",
  },
]

export function Products() {
  return (
    <section id="products" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Products
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            产品矩阵
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            以 CW-Agent、CW-PPI、CW-3DP、CW-POM 为核心，从智能感知到智慧决策，云建标提供端到端的新一代智慧水务产品能力。
          </p>
        </div>

        {/* 四大核心产品 */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.title}
              href={product.href}
              className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-secondary/40"
            >
              {/* hover 顶部高亮线 */}
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-center justify-between">
                <NeonIcon src={product.img} alt={product.title} glow={product.glow} className="size-14" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {product.tag}
                </span>
              </div>

              <h3 className="mt-6 flex justify-start items-center gap-2 text-lg font-semibold text-foreground">
                {product.title}
                <ArrowUpRight className="size-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.desc}
              </p>
            </a>
          ))}
        </div>

        {/* 矩阵支撑 */}
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              矩阵支撑 · Foundation
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {support.map((item) => (
              <div
                key={item.title}
                className="group relative flex items-start gap-4 bg-card p-6 transition-colors duration-300 hover:bg-secondary/40"
              >
                <NeonIcon src={item.img} alt={item.title} glow={item.glow} className="size-11" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
