"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import {
  cases,
  caseCategories,
  categoryColor,
  solutionIntro,
  type CaseCategory,
} from "@/lib/cases"
import { CasesMap } from "@/components/cases-map"

type Filter = "all" | CaseCategory

export function CasesBrowser() {
  const [filter, setFilter] = useState<Filter>("all")
  const [highlightName, setHighlightName] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get("category")
    if (category && caseCategories.includes(category as CaseCategory)) {
      setFilter(category as CaseCategory)
    }
    setHighlightName(params.get("highlight"))
  }, [])

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "经典案例集" },
    ...caseCategories.map((c) => ({ key: c, label: c })),
  ]

  const filtered = cases.filter((c) => filter === "all" || c.category === filter)

  return (
    <div>
      {/* 一级筛选：解决方案类型胶囊 */}
      <div className="flex flex-wrap justify-start gap-2.5">
        {chips.map((chip) => {
          const isActive = filter === chip.key
          const dotColor = chip.key === "all" ? undefined : categoryColor[chip.key]
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => {
                setFilter(chip.key)
                setHighlightName(null)
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-4px_oklch(0.63_0.17_250/0.85)]"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {dotColor && (
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
                  aria-hidden="true"
                />
              )}
              {chip.label}
            </button>
          )
        })}
      </div>

      {/* 选中方案简介 */}
      {filter !== "all" && (
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-pretty leading-relaxed text-muted-foreground">{solutionIntro[filter]}</p>
        </div>
      )}

      {/* 地图 + 案例信息联动模块 */}
      <div id="project-map" className="scroll-mt-24">
        <CasesMap activeCategory={filter} highlightName={highlightName} />
      </div>

      {/* 案例卡片网格（与筛选联动） */}
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="v4-panel group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="relative overflow-hidden rounded-t-2xl bg-black/20 p-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`${item.title}示意图`}
                className="aspect-[16/9] w-full rounded-xl object-contain"
                loading="lazy"
                decoding="async"
              />
              {/* 底部渐变遮罩，与文字区自然过渡 */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent"
                aria-hidden="true"
              />
              {/* 解决方案类型徽标 */}
              <span
                className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: categoryColor[item.category],
                    boxShadow: `0 0 8px ${categoryColor[item.category]}`,
                  }}
                  aria-hidden="true"
                />
                {item.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {item.location}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>

              {/* 应用产品 */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.products.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* 项目亮点 */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                查看项目详情
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}
