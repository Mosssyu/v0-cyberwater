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
import { PlatformArchitecture } from "@/components/platform-architecture"

const productPills = [
  { name: "CW-Agent", icon: Bot, color: "text-[oklch(0.7_0.13_300)]", href: "/#product-agent" },
  { name: "CW-POM", icon: Factory, color: "text-emerald-400", href: "/#product-pom" },
  { name: "CW-PPI", icon: Network, color: "text-accent", href: "/#product-ppi" },
  { name: "CW-3DP", icon: Box, color: "text-primary", href: "/#product-3dp" },
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

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-20 [perspective:2000px] [perspective-origin:50%_45%] lg:pt-24">
        <div className="grid items-center gap-12 [transform-style:preserve-3d] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          {/* 左侧：价值主张（向中心右收内凹） */}
          <div className="max-w-xl lg:origin-right lg:[transform:rotateY(8deg)_translateZ(-20px)]">
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
                href={p.href}
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

          {/* 右侧：产品总览大屏（向中心左收内凹） */}
          <div className="lg:origin-left lg:pl-4 lg:[transform:rotateY(-8deg)_translateZ(-20px)]">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* 下方三维分层平台架构 */}
      <div className="relative mt-4 pb-12">
        <PlatformArchitecture />
      </div>
    </section>
  )
}
