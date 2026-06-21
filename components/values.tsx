import { NeonIcon } from "@/components/neon-icon"

const values = [
  {
    img: "/icons/val-dedication.png",
    glow: "oklch(0.79 0.13 200)",
    title: "执着",
    en: "Dedication",
    headline: "长期深耕，把复杂问题做扎实",
  },
  {
    img: "/icons/val-symbiosis.png",
    glow: "oklch(0.74 0.14 205)",
    title: "共生",
    en: "Symbiosis",
    headline: "与客户、伙伴和行业共同成长",
  },
  {
    img: "/icons/val-evolution.png",
    glow: "oklch(0.72 0.14 300)",
    title: "求变",
    en: "Evolution",
    headline: "拥抱变化，持续进化",
  },
]

export function Values() {
  return (
    <section
      id="values"
      className="relative overflow-hidden border-y border-border bg-[oklch(0.13_0.012_252)] py-24"
    >
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 总纲 */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent backdrop-blur">
            Values
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            执着 · 共生 · <span className="text-gradient">求变</span>
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            以执着深耕行业，以共生连接客户与生态，以求变推动产品和组织持续进化。
          </p>
        </div>

        {/* 三张发光卡片 */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 ring-hairline transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <NeonIcon src={v.img} alt={v.title} glow={v.glow} className="size-14" />
                <span className="font-mono text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {v.en}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.headline}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
