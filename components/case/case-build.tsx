import { Cpu, Box, Grid2x2, Workflow, Database, ShieldCheck, type LucideIcon } from "lucide-react"
import { GlowIcon } from "@/components/glow-icon"
import type { CaseItem } from "@/lib/cases"

const ICONS: LucideIcon[] = [Cpu, Box, Grid2x2, Workflow, Database, ShieldCheck]
const GLOWS = [
  "oklch(0.63 0.17 250)",
  "oklch(0.74 0.14 205)",
  "oklch(0.62 0.2 295)",
  "oklch(0.72 0.15 165)",
  "oklch(0.68 0.14 225)",
  "oklch(0.79 0.13 200)",
]

export function CaseBuild({ item }: { item: CaseItem }) {
  return (
    <div>
      <span className="font-mono text-xs font-medium tracking-wider text-accent">02 / SOLUTION</span>
      <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">建设内容</h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        围绕平台底座、数字孪生、多业态覆盖与集约运营，构建可复制的数字化能力组合。
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {item.scope.map((s, i) => {
          const Icon = ICONS[i % ICONS.length]
          const glow = GLOWS[i % GLOWS.length]
          return (
            <div
              key={s}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 ring-hairline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(120% 80% at 100% 0%, color-mix(in oklab, ${glow} 12%, transparent), transparent 60%)` }}
              />
              <GlowIcon icon={Icon} size="lg" glow={glow} />
              <div className="relative">
                <span className="font-mono text-xs text-accent">能力 {String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{s}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
