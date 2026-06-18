import { Bot, Network, Box, Factory } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { NeonIcon } from "@/components/neon-icon"

type Product = {
  icon: LucideIcon
  name: string
  href: string
  title: string
  desc: string
  tags: string[]
  accent: string
  featured?: boolean
}

const products: Product[] = [
  {
    icon: Bot,
    name: "CW-Agent",
    href: "/#product-agent",
    title: "智能认知与决策中枢",
    desc: "面向运营的 AI 大脑，负责知识问答、运行诊断、优化建议、报告生成与智能体闭环，让运营经验沉淀为可复用的智能能力。",
    tags: ["智能问答", "运行诊断", "优化建议", "报告生成", "智能体闭环"],
    accent: "oklch(0.62 0.19 250)",
    featured: true,
  },
  {
    icon: Network,
    name: "CW-PPI",
    href: "/#product-ppi",
    title: "多业态一体化运营平台",
    desc: "统一管理厂、站、网、河、湖、防汛与调度业务，打通集团化多业态运营，实现数据赋能与协同治理。",
    tags: ["水厂运营", "泵站调度", "管网管理", "河湖治理", "防汛调度"],
    accent: "oklch(0.74 0.14 205)",
  },
  {
    icon: Box,
    name: "CW-3DP",
    href: "/#product-3dp",
    title: "空间可视化与仿真推演平台",
    desc: "融合 BIM+GIS 的二三维一体化平台，提供三维实景、空间定位、场景联动与模拟推演，实现全域可感知。",
    tags: ["三维实景", "空间定位", "场景联动", "模拟推演", "孪生运维"],
    accent: "oklch(0.62 0.18 250)",
  },
  {
    icon: Factory,
    name: "CW-POM",
    href: "/#product-pom",
    title: "数字水厂运营管理平台",
    desc: "覆盖生产、设备、安全、巡检、工单、移动执行与经营分析的全流程闭环，打造新一代未来水厂。",
    tags: ["生产监控", "设备运维", "安全巡检", "工单移动执行", "经营分析"],
    accent: "oklch(0.7 0.16 160)",
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
            Capability Matrix
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            四大产品，各司其职，协同成网
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            从智能决策到一体化运营、空间仿真与数字水厂，四大产品分层协同，构建端到端的智慧水务能力。
          </p>
        </div>

        {/* 四大核心产品 */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="group relative flex flex-col rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              style={{
                borderColor: product.featured
                  ? `color-mix(in oklab, ${product.accent} 55%, transparent)`
                  : undefined,
                boxShadow: product.featured
                  ? `0 0 32px -12px ${product.accent}`
                  : undefined,
              }}
            >
              {/* 图标 + 产品名 */}
              <div className="flex items-center gap-4">
                <span
                  className="flex size-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: product.featured
                      ? product.accent
                      : `color-mix(in oklab, ${product.accent} 14%, transparent)`,
                    boxShadow: product.featured ? `0 0 24px -6px ${product.accent}` : undefined,
                  }}
                >
                  <product.icon
                    className="size-7"
                    style={{ color: product.featured ? "oklch(0.99 0 0)" : product.accent }}
                  />
                </span>
                <span className="font-mono text-xl font-semibold tracking-wide text-foreground">
                  {product.name}
                </span>
              </div>

              {/* 副标题 + 描述 */}
              <h3 className="mt-7 text-xl font-bold text-foreground">{product.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{product.desc}</p>

              {/* 分隔线 */}
              <span className="mt-7 h-px w-full bg-border" />

              {/* 标签胶囊 */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-secondary/30 px-3.5 py-1.5 text-[13px] text-foreground/80 transition-colors group-hover:border-border/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
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
