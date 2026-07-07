import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseRelated({ items }: { items: CaseItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-medium tracking-wider text-accent">06 / RELATED</span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">相关案例推荐</h2>
        </div>
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {items.map((r) => (
            <Link
              key={r.slug}
              href={`/cases/${r.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-hairline transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="overflow-hidden bg-black/20 p-3">
                <img
                  src={r.image || "/placeholder.svg"}
                  alt={r.title}
                  className="aspect-[16/9] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {r.category}
                </span>
                <h3 className="mt-3 flex items-start justify-between gap-2 font-semibold text-foreground">
                  <span className="text-balance">{r.title}</span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {r.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
