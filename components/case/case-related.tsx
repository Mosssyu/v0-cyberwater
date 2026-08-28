import Link from "next/link"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import {
  categoryColor,
  mapMarkers,
  otherCases,
  type CaseCategory,
  type CaseItem,
} from "@/lib/cases"

export function CaseRelated({ items, category }: { items: CaseItem[]; category: CaseCategory }) {
  const references = otherCases[category] ?? []
  const markerNames = new Set(mapMarkers.filter((marker) => marker.category === category).map((marker) => marker.name))

  if (items.length === 0 && references.length === 0) return null
  return (
    <>
      {items.length > 0 && (
        <section className="v4-section">
          <div className="relative z-[1]">
            <span className="v4-kicker">03 / Related / 同类案例</span>
            <h2 className="mt-6 text-balance text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl">同一场景，<br /><span className="text-white/34">不同项目的持续验证。</span></h2>
            <div className="v4-flat-grid mt-12 md:grid-cols-2 lg:grid-cols-3">
              {items.map((related) => (
                <Link
                  key={related.slug}
                  href={`/cases/${related.slug}`}
                  className="v4-flat-cell group relative flex flex-col overflow-hidden"
                >
                  <div className="overflow-hidden bg-black/20 p-3">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="flex items-start justify-between gap-2 font-semibold text-foreground">
                      <span className="text-balance">{related.title}</span>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {related.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {references.length > 0 && (
        <section className="v4-section">
          <div className="relative z-[1]">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="font-mono text-xs font-medium tracking-wider text-accent">04 / MORE</span>
                <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
                  更多{category}案例
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">点击项目可在案例地图中定位查看。</p>
              </div>
              <Link
                href={`/cases/?category=${encodeURIComponent(category)}#project-map`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                查看全部项目
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {references.map((name) => {
                const hasMarker = markerNames.has(name)
                const query = new URLSearchParams({ category })
                if (hasMarker) query.set("highlight", name)
                return (
                  <Link
                    key={name}
                    href={`/cases/?${query.toString()}#project-map`}
                    className="group/reference inline-flex items-center gap-2 rounded-full border border-white/12 bg-transparent px-3.5 py-2 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-white/35 hover:text-foreground"
                  >
                    <MapPin
                      className="size-3.5 shrink-0 transition-colors group-hover/reference:text-primary"
                      style={{ color: hasMarker ? categoryColor[category] : undefined }}
                    />
                    <span>{name}</span>
                    <ArrowUpRight className="size-3.5 shrink-0 opacity-45 transition-all group-hover/reference:translate-x-0.5 group-hover/reference:-translate-y-0.5 group-hover/reference:opacity-100" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
