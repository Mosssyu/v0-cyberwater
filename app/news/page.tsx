import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { news } from "@/lib/news"

export const metadata: Metadata = {
  title: "新闻动态 | 云建标智慧水务",
  description: "洞察行业趋势，见证项目落地。查看云建标智慧水务的最新客户案例、产品动态与行业观察。",
}

export default function NewsListPage() {
  // 按年份分组（news 数据已按时间倒序排列）
  const years = Array.from(new Set(news.map((n) => n.year)))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-[oklch(0.21_0.06_256)]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-blue-100/90">
              Newsroom
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">新闻动态</h1>
            <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/90">
              洞察行业趋势，见证项目落地。汇聚客户案例、产品动态与行业观察。
            </p>
          </div>
        </section>

        {/* 按年份分组列表 */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            {years.map((year) => (
              <div key={year} className="mb-16 last:mb-0">
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="font-mono text-2xl font-bold text-foreground">{year}</h2>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {news
                    .filter((n) => n.year === year)
                    .map((item) => (
                      <Link
                        key={item.slug}
                        href={`/news/${item.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            loading="lazy"
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                            {item.tag}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                          <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-accent">{item.subtitle}</p>
                          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {item.summary}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.solutionTags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-primary/25 bg-primary/[0.07] px-2 py-0.5 text-[11px] font-medium text-primary"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                            阅读全文
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
