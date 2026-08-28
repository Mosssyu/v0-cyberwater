"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { news } from "@/lib/news"
import { NewsCard } from "@/components/news/news-card"

const PAGE_SIZE = 9

export function NewsExplorer() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.max(1, Math.ceil(news.length / PAGE_SIZE))
  const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const current = Math.min(Math.max(Number.isFinite(parsedPage) ? parsedPage : 1, 1), totalPages)
  const visible = news.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function goToPage(nextPage: number) {
    const target = Math.min(Math.max(nextPage, 1), totalPages)
    router.push(target === 1 ? "/news" : `/news?page=${target}`, { scroll: false })
    window.requestAnimationFrame(() => {
      document.querySelector("main")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <section className="v4-section bg-[#060a0d]">
      <div className="relative z-[1]">
        {/* 卡片网格 */}
        {visible.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {visible.map((item) => (
              <NewsCard key={item.slug} item={item} fromPage={current} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">暂无新闻内容</p>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(current - 1)}
              disabled={current === 1}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="上一页"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => goToPage(p)}
                className={`inline-flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                  p === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-label={`第 ${p} 页`}
                aria-current={p === current ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(current + 1)}
              disabled={current === totalPages}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="下一页"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
