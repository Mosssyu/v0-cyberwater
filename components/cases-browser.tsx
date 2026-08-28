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
      {/* 一级筛选：沿用首屏的黑白按钮与微量光色 */}
      <div className="flex flex-wrap justify-start gap-2">
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
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.04em] transition-all ${
                isActive
                  ? "border-white bg-white text-black"
                  : "border-white/12 bg-transparent text-white/48 hover:border-white/35 hover:text-white"
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
        <div className="mt-6 max-w-3xl border-l border-accent/40 pl-5 text-left">
          <p className="text-pretty leading-relaxed text-muted-foreground">{solutionIntro[filter]}</p>
        </div>
      )}

      {/* 地图 + 案例信息联动模块 */}
      <div id="project-map" className="scroll-mt-24">
        <CasesMap activeCategory={filter} highlightName={highlightName} />
      </div>

      {/* 案例卡片网格（与筛选联动） */}
      <div className="v4-flat-grid mt-12 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="v4-flat-cell group flex flex-col overflow-hidden"
          >
            <div className="relative overflow-hidden border-b border-white/10 bg-black/20">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`${item.title}示意图`}
                className="aspect-[16/9] w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
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
                className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 border border-white/12 bg-[#020508]/80 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70 backdrop-blur"
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
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {item.location}
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.025em] text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>

              {/* 应用产品 */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.products.map((p) => (
                  <span
                    key={p}
                    className="border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-white/55"
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
                    className="text-[11px] text-muted-foreground before:mr-1 before:text-white/20 before:content-['/']"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.12em] text-white/48 transition-colors group-hover:text-accent">
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
