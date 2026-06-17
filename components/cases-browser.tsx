"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { cases, caseProducts } from "@/lib/cases"
import { CasesMap } from "@/components/cases-map"

type Dimension = "product" | "map"

export function CasesBrowser() {
  const [dimension, setDimension] = useState<Dimension>("product")
  const [filter, setFilter] = useState<string>("全部")

  const chips = ["全部", ...caseProducts]

  const filtered = cases.filter((c) => {
    if (filter === "全部") return true
    return c.product === filter
  })

  function switchDimension(next: Dimension) {
    setDimension(next)
    setFilter("全部")
  }

  return (
    <div>
      {/* 维度切换 */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => switchDimension("product")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              dimension === "product"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            按产品划分
          </button>
          <button
            type="button"
            onClick={() => switchDimension("map")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              dimension === "map"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            按地图划分
          </button>
        </div>
      </div>

      {/* 地图视图 */}
      {dimension === "map" && <CasesMap />}

      {/* 筛选标签 */}
      {dimension === "product" && (
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setFilter(chip)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === chip
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* 案例网格 */}
      {dimension === "product" && (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title}示意图`}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {item.product}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {item.location}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  查看项目详情
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
