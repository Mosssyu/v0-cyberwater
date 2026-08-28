import { CalendarClock, CheckCircle2, Layers, Sparkles, Target, type LucideIcon } from "lucide-react"
import { GlowIcon } from "@/components/glow-icon"
import type { CaseItem } from "@/lib/cases"

export function CaseOverview({ item }: { item: CaseItem }) {
  const cards: { icon: LucideIcon; title: string; desc: string; glow: string }[] = [
    { icon: Target, title: "建设目标", desc: item.overview.target, glow: "oklch(0.63 0.17 250)" },
    { icon: Layers, title: "覆盖范围", desc: item.overview.coverage, glow: "oklch(0.74 0.14 205)" },
    { icon: Sparkles, title: "核心价值", desc: item.overview.value, glow: "oklch(0.62 0.2 295)" },
    { icon: CalendarClock, title: "建设周期", desc: item.overview.period, glow: "oklch(0.72 0.15 165)" },
  ]
  const highlights = [...item.scope, ...item.results]

  return (
    <div>
      <span className="v4-kicker">01 / Overview / 项目概览</span>
      <h2 className="mt-6 text-balance text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl">从真实业务出发，<br /><span className="text-white/34">构建可持续的运营能力。</span></h2>
      <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-stretch">
        <div className="bg-[#040a0e] p-6 sm:p-10">
          <p className="text-pretty text-base leading-8 text-foreground/85">{item.background}</p>
          <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {highlights.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" />
                <p className="text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden bg-[#050b0f] p-5 transition-colors hover:bg-[#0a151a] sm:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: c.glow }}
              />
              <GlowIcon icon={c.icon} size="md" glow={c.glow} />
              <h3 className="mt-4 text-sm font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
