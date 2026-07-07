"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import {
  cases,
  caseCategories,
  categoryColor,
  solutionIntro,
  otherCases,
  type CaseCategory,
} from "@/lib/cases"
import { CasesMap } from "@/components/cases-map"

type Filter = "all" | CaseCategory

export function CasesBrowser() {
  const [filter, setFilter] = useState<Filter>("all")

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "全部案例" },
    ...caseCategories.map((c) => ({ key: c, label: c })),
  ]

  const filtered = cases.filter((c) => filter === "all" || c.category === filter)

  return (
    <div>
      {/* 一级筛选：解决方案类型胶囊 */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {chips.map((chip) => {
          const isActive = filter === chip.key
          const dotColor = chip.key === "all" ? undefined : categoryColor[chip.key]
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-primary/60 bg-primary/10 text-foreground shadow-[0_0_18px_-4px_oklch(0.7_0.14_215/0.7)]"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
      <CasesMap activeCategory={filter} />

      {/* 案例卡片网格（与筛选联动） */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="relative overflow-hidden rounded-t-2xl bg-black/20 p-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`${item.title}示意图`}
                className="aspect-[16/9] w-full rounded-xl object-contain"
              />
              {/* 底部渐变遮罩，与文字区自然过渡 */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent"
                aria-hidden="true"
              />
              {/* 解决方案类型徽标 */}
              <span
                className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur"
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

      {/* 其它案例（文字清单） */}
      <div className="mt-12 space-y-8">
        {(filter === "all" ? caseCategories : [filter]).map((cat) => {
          const others = otherCases[cat]
          if (!others || others.length === 0) return null
          return (
            <div key={cat}>
              <div className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: categoryColor[cat], boxShadow: `0 0 8px ${categoryColor[cat]}` }}
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-foreground">{cat} · 其它参考案例</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {others.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
