import Link from "next/link"
import { ArrowUpRight, Newspaper } from "lucide-react"
import { news } from "@/lib/news"

const featured = news[0]
const list = news.slice(1, 7)

export function News() {
  return (
    <section id="news" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
              Newsroom
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              洞察行业趋势，见证项目落地
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* 头条 */}
          <Link
            href={`/news/${featured.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div>
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{featured.tag}</span>
                <span className="text-muted-foreground">{featured.date}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-snug text-foreground">{featured.title}</h3>
              <p className="mt-2 text-sm font-medium text-accent">{featured.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              阅读全文
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          {/* 列表 */}
          <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
            {list.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group flex items-start gap-4 p-5 transition-colors hover:bg-muted/50"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Newspaper className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-accent">{item.tag}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="mt-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h4>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
