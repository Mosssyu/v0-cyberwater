import { Building2, MapPin } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseHero({ item }: { item: CaseItem }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#020508]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_4%,rgba(130,195,212,.12),transparent_32%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-12 bottom-4 select-none text-[clamp(6rem,16vw,17rem)] font-semibold leading-none tracking-[-.08em] text-white/[0.025]" aria-hidden="true">CASE</div>

      <div className="relative px-5 py-12 sm:px-8 lg:px-14 lg:py-20 xl:px-20">
        <div className="grid items-stretch gap-px overflow-hidden border border-white/10 bg-white/10 xl:grid-cols-[.82fr_1.18fr]">
          <div className="flex flex-col bg-[#03080b] p-7 sm:p-10 xl:min-h-[35rem] xl:p-14">
            <span className="v4-kicker">Case Study / 客户案例</span>
            <h1 className="mt-8 max-w-2xl text-balance text-4xl font-medium leading-[.98] tracking-[-0.055em] text-white sm:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-white/52">
              {item.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-accent" />
                {item.client}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-accent" />
                {item.location}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/38 before:mr-1.5 before:text-accent/50 before:content-['/']"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-px bg-white/10 pt-px sm:grid-cols-4 xl:grid-cols-2">
              {item.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-[#050b0f] px-3 py-4 transition-colors hover:bg-[#0a151a]"
                >
                  <div className="font-mono text-lg font-medium text-white/85">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-white/36">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[22rem] w-full overflow-hidden bg-[#03070a] xl:min-h-[35rem]">
            <img
              src={item.image || "/cases/detail/hero-twin.png"}
              alt={`${item.title}项目效果图`}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-contain object-center p-3 sm:p-6"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
