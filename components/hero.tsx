import {
  ArrowRight,
  LayoutGrid,
  Bot,
  Factory,
  Network,
  Box,
  Radio,
  Brain,
  BarChart3,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroDashboard } from "@/components/hero-dashboard"

const productPills = [
  { name: "CW-Agent", icon: Bot, color: "text-[oklch(0.7_0.13_300)]" },
  { name: "CW-POM", icon: Factory, color: "text-emerald-400" },
  { name: "CW-PPI", icon: Network, color: "text-accent" },
  { name: "CW-3DP", icon: Box, color: "text-primary" },
]

const chain = [
  { label: "感知", icon: Radio },
  { label: "认知", icon: Brain },
  { label: "决策", icon: BarChart3 },
  { label: "执行", icon: Zap },
  { label: "进化", icon: TrendingUp },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
      {/* 科技网格 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          {/* 左侧：价值主张 */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
              企业级 AI 水务操作系统 · CW-Cloud
            </div>

            {/* 主标题 */}
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              新一代 AI 水务
              <br />
              <span className="text-gradient">智能运营平台</span>
            </h1>

            {/* 副标题 */}
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              融合 IoT 感知、数字孪生与 AI 智能体，构建厂、网、河、湖一体化运营体系，全面赋能水厂、泵站、管网、河湖、防汛与调度的智能化运营与科学决策。
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-full shadow-lg shadow-primary/25"
                nativeButton={false}
                render={<a href="/#contact" />}
              >
                预约演示
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-accent/30 bg-card/40 text-foreground hover:border-accent/50 hover:bg-card"
                nativeButton={false}
                render={<a href="/#products" />}
              >
                <LayoutGrid className="size-4" />
                查看核心产品
              </Button>
            </div>

            {/* 产品入口标签 */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {productPills.map((p) => (
                <a
                  key={p.name}
                  href="/#products"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:border-accent/40 hover:bg-card"
                >
                  <p.icon className={`size-3.5 ${p.color}`} />
                  {p.name}
                </a>
              ))}
            </div>

            {/* 能力链路 */}
            <div className="mt-7 flex flex-wrap items-center gap-x-1 gap-y-2">
              {chain.map((c, i) => (
                <div key={c.label} className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/15 bg-accent/[0.06] px-2.5 py-1 text-xs text-foreground/80">
                    <c.icon className="size-3 text-accent" />
                    {c.label}
                  </span>
                  {i < chain.length - 1 ? (
                    <span className="text-accent/40">·</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：产品总览大屏 */}
          <div className="lg:pl-4">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* 下方架构图区（保留不变） */}
      <div className="relative mx-auto mt-4 max-w-5xl px-6 pb-8">
        <img
          src="/platform-architecture-wide.png"
          alt="新一代水务运营平台架构图：五层平台架构、六大能力中心，以及 CW-Agent、CW-PPI、CW-3DP、CW-POM 四大产品"
          className="w-full"
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 45%, #000 55%, transparent 96%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 45%, #000 55%, transparent 96%)",
          }}
        />
      </div>
    </section>
  )
}
