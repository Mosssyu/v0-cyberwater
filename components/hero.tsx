import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const domains = [
  "水厂",
  "泵站",
  "管网",
  "河湖",
  "防汛",
  "调度",
  "IoT 物联",
  "AI 智能体",
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[520px]" aria-hidden="true" />
      {/* 科技网格 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            企业级 AI 水务操作系统 · CW-Cloud
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI 驱动的厂网河湖
            <br />
            <span className="text-gradient">一体化智慧水务平台</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            云建标依托头部水务集团的运营实践，融合 IoT 感知、数字孪生、大屏可视化与 AI 智能体，
            把水厂、泵站、管网、河湖、防汛、调度统一到一个标准化、产品化、可配置的运营底座。
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full"
              nativeButton={false}
              render={<a href="/#contact" />}
            >
              预约演示
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-card/40 text-foreground hover:bg-card"
              nativeButton={false}
              render={<a href="/#solutions" />}
            >
              <Play className="size-4" />
              查看解决方案
            </Button>
          </div>

          {/* 业务域能力条 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {domains.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* 平台大屏可视化 */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="ring-hairline relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/60">
            {/* 窗口栏 */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
              <span className="size-3 rounded-full bg-destructive/70" />
              <span className="size-3 rounded-full bg-accent/70" />
              <span className="size-3 rounded-full bg-primary/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                cyberwater · 厂网河湖一体化运营大屏
              </span>
            </div>
            <img
              src="/water-dashboard.png"
              alt="智慧水务平台运营大屏，包含地图、管网、泵站、水厂、AI 分析、告警与工单"
              className="w-full"
            />
          </div>
        </div>

        {/* 关键指标 */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {[
            { num: "2015", label: "深耕水务数字化" },
            { num: "40+", label: "智慧水务项目" },
            { num: "30+", label: "软件著作权" },
            { num: "99.9%", label: "平台运行可用性" },
          ].map((item) => (
            <div key={item.label} className="bg-background px-6 py-7 text-center">
              <div className="text-2xl font-bold text-foreground sm:text-3xl">
                {item.num}
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
