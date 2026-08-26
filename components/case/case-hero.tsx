import { Building2, MapPin } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseHero({ item }: { item: CaseItem }) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.11_0.025_252)]">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_70%_0%,oklch(0.5_0.16_240/0.15),transparent_68%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="grid items-center gap-8 xl:grid-cols-[27rem_minmax(0,1fr)] xl:gap-8">
          <div className="flex w-full max-w-[27rem] flex-col justify-self-center px-1 py-2 sm:px-2 xl:min-h-[23rem] xl:justify-self-end xl:py-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-xs font-medium text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              客户案例
            </span>
            <h1 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-[26rem] text-pretty text-sm leading-7 text-blue-50/72">
              {item.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-50/75">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-accent" />
                {item.client}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-accent" />
                {item.location}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-blue-50/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-6 sm:grid-cols-4 xl:grid-cols-2">
              {item.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg bg-white/[0.05] px-3 py-2.5 transition-colors hover:bg-white/[0.08]"
                >
                  <div className="bg-gradient-to-br from-white to-accent bg-clip-text font-mono text-lg font-bold text-transparent">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-blue-50/65">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-video w-full justify-self-start overflow-hidden bg-[oklch(0.075_0.025_252)]">
            <img
              src={item.image || "/cases/detail/hero-twin.png"}
              alt={`${item.title}项目效果图`}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
