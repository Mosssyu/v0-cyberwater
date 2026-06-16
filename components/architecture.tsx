export function Architecture() {
  return (
    <section id="capabilities" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Architecture
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            厂网河湖 AI 一体化平台
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            六大能力中心为核心，支撑多业态组合运营与 AI 智能决策。
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card ring-hairline">
          <img
            src="/platform-architecture.png"
            alt="新一代水务运营平台架构图：五层平台架构、六大能力中心，以及 CW-Agent、CW-PPI、CW-POM、CW-Visual 四大产品"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
