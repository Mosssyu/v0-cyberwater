import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { news } from "@/lib/news"

const featured = news[0]
// 头条之外的全部动态进入自动上滚列表
const scrolling = news.slice(1)

function NewsRow({ slug, tag, date, title, index }: { slug: string; tag: string; date: string; title: string; index: number }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group grid min-h-[5.5rem] grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-white/[0.08] px-5 py-4 transition-colors hover:bg-white/[0.025] sm:px-7"
    >
      <span className="v4-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span className="text-accent/70">{tag}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
        <h4 className="mt-1 truncate text-sm font-medium text-white/82 transition-colors group-hover:text-white">
          {title}
        </h4>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </Link>
  )
}

export function News() {
  return (
    <section id="news" className="v4-section bg-[#040709]">
      <div className="relative z-[1]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="v4-kicker">Newsroom / 新闻动态</span>
            <h2 className="mt-6 max-w-5xl text-balance text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              洞察行业趋势，见证项目落地
            </h2>
          </div>
          <Link
            href="/news"
            className="v4-action-line group shrink-0"
          >
            更多动态
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="v4-flat-grid mt-12 lg:grid-cols-2">
          {/* 头条 */}
          <Link
            href={`/news/${featured.slug}`}
            className="v4-flat-cell group relative flex min-h-[28rem] flex-col justify-between overflow-hidden p-8 sm:p-12"
          >
            <span className="pointer-events-none absolute -right-8 bottom-4 select-none text-[clamp(5rem,11vw,11rem)] font-semibold leading-none tracking-[-.08em] text-white/[0.03]" aria-hidden="true">NEWS</span>
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-accent/70">{featured.tag}</span>
                <span className="text-white/30">{featured.date}</span>
              </div>
              <h3 className="mt-8 max-w-2xl text-3xl font-medium leading-[1.12] tracking-[-0.035em] text-foreground sm:text-5xl">{featured.title}</h3>
              <p className="mt-2 text-sm font-medium text-accent">{featured.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>
            </div>
            <span className="relative mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/50 transition-colors group-hover:text-accent">
              阅读全文
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          {/* 自动上滚列表：默认可见约 6 条，其余缓慢向上滚动，悬停暂停 */}
          <div className="news-marquee relative h-[452px] overflow-hidden bg-[#081015]">
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
                  index={i % scrolling.length}
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
