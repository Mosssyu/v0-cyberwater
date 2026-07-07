"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { news, newsCategories } from "@/lib/news"
import { NewsCard } from "@/components/news/news-card"

const PAGE_SIZE = 9

export function NewsExplorer() {
  const [active, setActive] = useState<(typeof newsCategories)[number]>("全部")
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => (active === "全部" ? news : news.filter((n) => n.category === active)),
    [active],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function selectCategory(cat: (typeof newsCategories)[number]) {
    setActive(cat)
    setPage(1)
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* 分类 Tab */}
        <div className="flex flex-wrap items-center gap-3">
          {newsCategories.map((cat) => {
            const isActive = cat === active
            const count = cat === "全部" ? news.length : news.filter((n) => n.category === cat).length
            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                    isActive ? "bg-white/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* 卡片网格 */}
        {visible.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">该分类暂无内容</p>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                onClick={() => setPage(p)}
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
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
