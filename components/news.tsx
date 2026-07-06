import Link from "next/link"
import { ArrowUpRight, ArrowRight, Newspaper } from "lucide-react"
import { news } from "@/lib/news"

const featured = news[0]
// 头条之外的全部动态进入自动上滚列表
const scrolling = news.slice(1)

function NewsRow({ slug, tag, date, title }: { slug: string; tag: string; date: string; title: string }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex items-start gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-muted/50"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Newspaper className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-accent">{tag}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
        <h4 className="mt-1 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {title}
        </h4>
      </div>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  )
}

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
          <Link
            href="/news"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            更多动态
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
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

          {/* 自动上滚列表：默认可见约 6 条，其余缓慢向上滚动，悬停暂停 */}
          <div className="news-marquee relative h-[452px] overflow-hidden rounded-2xl border border-border bg-card">
            <div
              className="news-marquee-track flex flex-col"
              style={{ ["--news-duration" as string]: `${scrolling.length * 4.5}s` }}
            >
              {[...scrolling, ...scrolling].map((item, i) => (
                <NewsRow
                  key={`${item.slug}-${i}`}
                  slug={item.slug}
                  tag={item.tag}
                  date={item.date}
                  title={item.title}
                />
              ))}
            </div>
            {/* 顶部/底部渐隐遮罩 */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-card to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
