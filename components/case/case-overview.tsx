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
      <span className="font-mono text-xs font-medium tracking-wider text-accent">01 / OVERVIEW</span>
      <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">项目概览</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-start">
        <div className="rounded-2xl bg-card/45 p-6 ring-hairline sm:p-8">
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 ring-hairline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
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
