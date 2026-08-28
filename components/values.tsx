import { NeonIcon } from "@/components/neon-icon"

const values = [
  {
    img: "/icons/val-dedication.png",
    glow: "oklch(0.79 0.13 200)",
    title: "执着",
    en: "Dedication",
    headline: "秉承技术基因，打造极致化产品",
  },
  {
    img: "/icons/val-symbiosis.png",
    glow: "oklch(0.74 0.14 205)",
    title: "共生",
    en: "Symbiosis",
    headline: "与客户和伙伴共建、共享、共发展",
  },
  {
    img: "/icons/val-evolution.png",
    glow: "oklch(0.72 0.14 300)",
    title: "求变",
    en: "Evolution",
    headline: "秉承技术基因，持续进化",
  },
]

export function Values() {
  return (
    <section
      id="values"
      className="v4-section bg-[#040709]"
    >
      <div className="relative z-[1]">
        {/* 总纲 */}
        <div className="max-w-4xl">
          <span className="v4-kicker">Values / 企业价值观</span>
          <h2 className="mt-6 text-balance text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-6xl">
            执着 · 共生 · <span className="text-white/34">求变</span>
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            以执着深耕行业，以共生连接客户与生态，以求变推动产品和组织持续进化。
          </p>
        </div>

        {/* 与全站一致的单线平面价值观矩阵 */}
        <div className="v4-flat-grid mt-14 lg:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="v4-flat-cell group relative flex min-h-72 flex-col p-7 sm:p-9"
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

              <div className="mt-auto flex items-baseline gap-2 pt-12">
                <h3 className="text-3xl font-medium tracking-[-0.04em] text-foreground">
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
