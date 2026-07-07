import { CheckCircle2, TrendingUp } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseOutcomes({ item }: { item: CaseItem }) {
  return (
    <div>
      <span className="font-mono text-xs font-medium tracking-wider text-accent">03 / IMPACT</span>
      <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">应用成效</h2>

      {/* 数字大屏指标条 */}
      <div className="mt-7 overflow-hidden rounded-2xl border border-primary/20 bg-[oklch(0.14_0.02_245)] ring-hairline">
        <div className="grid grid-cols-2 divide-white/8 lg:grid-cols-4 lg:divide-x">
          {item.metrics.map((m) => (
            <div key={m.label} className="relative px-5 py-7 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />
              <div className="bg-gradient-to-b from-white to-accent bg-clip-text font-mono text-2xl font-bold text-transparent sm:text-3xl">
                {m.value}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 成效清单 */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {item.results.map((r) => (
          <div
            key={r}
            className="group relative flex items-start gap-3 rounded-2xl border border-border bg-card/70 p-5 ring-hairline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
            <span className="text-sm leading-relaxed text-foreground">{r}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
        <TrendingUp className="size-3.5" />
        持续沉淀可复制的数字化运营经验
      </div>
    </div>
  )
}
