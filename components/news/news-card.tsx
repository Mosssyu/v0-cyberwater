import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import type { NewsItem } from "@/lib/news"

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          {item.tag}
        </span>
        {item.location && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <MapPin className="size-3" />
            {item.location}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-balance text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.solutionTags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-primary/25 bg-primary/[0.07] px-2 py-0.5 text-[11px] font-medium text-primary"
            >
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            阅读全文
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
