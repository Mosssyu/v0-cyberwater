import { Boxes, type LucideIcon } from "lucide-react"
import { GlowIcon } from "@/components/glow-icon"
import type { CaseItem } from "@/lib/cases"

const PRODUCT_META: Record<string, { name: string; description: string }> = {
  "CW-Agent": {
    name: "水务运营管理智能体",
    description: "连接运营数据、业务流程与专业模型，辅助主动监盘、异常研判和运营决策。",
  },
  "CW-POM": {
    name: "水厂运营管理系统",
    description: "贯通生产运行、设备、巡检、化验与工单业务，形成标准化运营闭环。",
  },
  "CW-GOM": {
    name: "集团运营管理系统",
    description: "面向集团、区域、子公司和水厂的多层级协同与集约化运营管理。",
  },
  "CW-PPI": {
    name: "厂站网一体化管理系统",
    description: "统一连接厂、站、网、河、湖等设施，支撑监测、调度与协同运营。",
  },
  "CW-IOT": {
    name: "物联数据平台",
    description: "汇聚多源异构数据，提供统一接入、治理、服务与实时计算能力。",
  },
  "CW-Visual": {
    name: "三维数字孪生系统",
    description: "还原空间对象、设备状态与业务过程，支持场景联动和仿真推演。",
  },
  "FPM®系统": {
    name: "河道防汛管理系统",
    description: "融合水文监测、视频与防汛业务，实现风险预警、调度和应急处置。",
  },
  "防汛管理模块": {
    name: "城市防汛管理系统",
    description: "面向内涝风险识别、预警响应、事件处置和防汛指挥的一体化应用。",
  },
  "智能巡检机器人": {
    name: "智能巡检",
    description: "融合视觉算法与多模态设备，支撑人机协同巡检和异常自动发现。",
  },
}

const GLOWS = [
  "oklch(0.63 0.17 250)",
  "oklch(0.74 0.14 205)",
  "oklch(0.62 0.2 295)",
  "oklch(0.72 0.15 165)",
  "oklch(0.68 0.14 225)",
]

export function CaseProducts({ item }: { item: CaseItem }) {
  const ProductIcon: LucideIcon = Boxes

  return (
    <section className="relative border-y border-border bg-secondary/30">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-35" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <span className="font-mono text-xs font-medium tracking-wider text-accent">02 / PRODUCTS</span>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">核心产品</h2>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {item.products.map((code, index) => {
            const product = PRODUCT_META[code] ?? {
              name: code,
              description: "面向项目业务需求提供标准化、可配置的数字化产品能力。",
            }
            const glow = GLOWS[index % GLOWS.length]

            return (
              <article
                key={code}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/75 p-6 ring-hairline transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: glow }}
                />
                <div className="relative flex items-start gap-4">
                  <GlowIcon icon={ProductIcon} size="lg" glow={glow} />
                  <div className="min-w-0">
                    <div className="font-mono text-xs font-medium tracking-wide text-accent">{code}</div>
                    <h3 className="mt-1 text-base font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
