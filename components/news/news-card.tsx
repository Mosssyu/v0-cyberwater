import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import type { NewsItem } from "@/lib/news"

export function NewsCard({ item, fromPage }: { item: NewsItem; fromPage?: number }) {
  const href = fromPage && fromPage > 1 ? `/news/${item.slug}?fromPage=${fromPage}` : `/news/${item.slug}`

  return (
    <Link
      href={href}
      className="v4-flat-cell group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020508]/70 via-transparent to-transparent" />
        {item.location && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 border border-white/15 bg-[#020508]/65 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm">
            <MapPin className="size-3" />
            {item.location}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-balance text-xl font-medium leading-snug tracking-[-0.025em] text-foreground transition-colors group-hover:text-white">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.solutionTags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/38"
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
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-white/40 transition-colors group-hover:text-accent">
            阅读全文
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
