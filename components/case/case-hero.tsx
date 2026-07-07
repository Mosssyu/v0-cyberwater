import Link from "next/link"
import { ArrowLeft, Building2, MapPin, Factory, Waves, Network, Activity } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

/* 右侧数字孪生场景上的 HUD 浮标 */
function HudTag({
  icon: Icon,
  title,
  sub,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  sub: string
  className?: string
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-1.5 rounded-md border border-accent/30 bg-[oklch(0.12_0.02_240/0.82)] px-2 py-1 backdrop-blur-sm">
        <Icon className="size-3 text-accent" />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-foreground">{title}</div>
          <div className="text-[8px] text-accent">{sub}</div>
        </div>
      </div>
    </div>
  )
}

export function CaseHero({ item }: { item: CaseItem }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[oklch(0.17_0.03_256)]">
      {/* 顶部青光 + 网格 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 glow-cyan" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[28rem] rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回客户案例
        </Link>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* 左侧文案 + 指标 */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {item.category}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-blue-100/80">
              {item.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/80">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-accent" />
                {item.client}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-accent" />
                {item.location}
              </span>
            </div>

            {/* 核心指标卡 */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {item.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 ring-hairline backdrop-blur-sm transition-colors hover:border-accent/40"
                >
                  <div className="bg-gradient-to-br from-white to-accent bg-clip-text font-mono text-2xl font-bold text-transparent">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-blue-100/70">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧数字孪生运营中心 */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.02_240)] shadow-2xl shadow-black/60 ring-hairline">
              {/* 标题栏 */}
              <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-3.5 py-2.5">
                <Network className="size-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">集团级水务数字运营中心</span>
                <span className="ml-auto flex gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span className="size-1.5 rounded-full bg-amber-400/70" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                </span>
              </div>
              {/* 场景图 */}
              <div className="relative aspect-[4/3]">
                <img
                  src={item.image || "/cases/detail/hero-twin.png"}
                  alt={`${item.title}数字孪生运营场景`}
                  className="absolute inset-0 size-full object-cover opacity-40"
                />
                <img
                  src="/cases/detail/hero-twin.png"
                  alt="集团水务节点分布与数据流"
                  className="absolute inset-0 size-full object-cover mix-blend-screen"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.1_0.02_240/0.55)_0%,transparent_35%,transparent_70%,oklch(0.1_0.02_240/0.6)_100%)]"
                />
                <HudTag icon={Factory} title="水厂节点" sub="356 座在线" className="left-3 top-3" />
                <HudTag icon={Activity} title="泵站" sub="运行正常" className="right-3 top-10" />
                <HudTag icon={Waves} title="管网/河湖" sub="监测中" className="bottom-4 left-3" />
                <HudTag icon={Network} title="数据协同" sub="268 节点" className="bottom-3 right-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
