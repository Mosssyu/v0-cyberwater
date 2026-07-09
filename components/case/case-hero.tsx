import Link from "next/link"
import { ArrowLeft, Building2, MapPin } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseHero({ item }: { item: CaseItem }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* 铺满的案例场景图 */}
      <img
        src={item.image || "/cases/detail/hero-twin.png"}
        alt={`${item.title}数字孪生运营场景`}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/* 遮罩：左侧压暗保证文字清晰，底部渐隐衔接下方内容 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.12_0.03_256/0.92)_0%,oklch(0.12_0.03_256/0.7)_38%,oklch(0.12_0.03_256/0.25)_70%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent_0%,oklch(0.14_0.03_256/0.85)_75%,oklch(0.14_0.03_256)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-center px-6 py-16 lg:min-h-[36rem] lg:py-24">
        <Link
          href="/cases"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回客户案例
        </Link>

        <div className="mt-8 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-xs font-medium text-accent backdrop-blur-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            {item.category}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-blue-50/90 drop-shadow sm:text-lg">
            {item.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-50/85">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-4 text-accent" />
              {item.client}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-accent" />
              {item.location}
            </span>
          </div>

          {/* 项目亮点标签 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-50/90 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 核心指标卡 —— 叠在图片上 */}
        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {item.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/15 bg-white/[0.06] p-4 ring-hairline backdrop-blur-md transition-colors hover:border-accent/50"
            >
              <div className="bg-gradient-to-br from-white to-accent bg-clip-text font-mono text-2xl font-bold text-transparent">
                {m.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-blue-50/80">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
