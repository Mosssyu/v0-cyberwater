"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SHOTS = [
  {
    src: "/cases/detail/gallery-cockpit.png",
    title: "集团运营驾驶舱",
    desc: "集团—区域—水厂多层级运行指标一屏总览，支撑集约化运营决策。",
  },
  {
    src: "/cases/detail/gallery-twin.png",
    title: "智慧水厂数字孪生",
    desc: "1:1 还原厂区空间、设备与工艺，叠加实时数据与告警联动。",
  },
  {
    src: "/cases/detail/gallery-quality.png",
    title: "水质监测与预警",
    desc: "全流程水质指标实时监测、趋势分析与超标预警联动处置。",
  },
  {
    src: "/cases/detail/gallery-om.png",
    title: "设备运维管理",
    desc: "设备健康度评估、工单闭环与巡检运维全过程数字化管理。",
  },
]

export function CaseGallery() {
  const [active, setActive] = useState(0)
  const current = SHOTS[active]

  function go(dir: number) {
    setActive((prev) => (prev + dir + SHOTS.length) % SHOTS.length)
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-medium tracking-wider text-accent">05 / GALLERY</span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">平台应用展示</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="上一张"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="下一张"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* 主展示图 */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-[oklch(0.13_0.02_245)] ring-hairline">
        <div className="relative aspect-[16/9] w-full">
          <img
            key={current.src}
            src={current.src || "/placeholder.svg"}
            alt={current.title}
            className="size-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.1_0.02_240/0.85)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-xl font-semibold text-white">{current.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-blue-100/80">{current.desc}</p>
          </div>
        </div>
      </div>

      {/* 缩略图切换 */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SHOTS.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
              i === active
                ? "border-accent/70 ring-1 ring-accent/40"
                : "border-border hover:border-accent/40"
            }`}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={s.src || "/placeholder.svg"}
                alt={s.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span
              className={`absolute inset-x-0 bottom-0 truncate px-2.5 py-1.5 text-left text-xs font-medium backdrop-blur-sm ${
                i === active
                  ? "bg-accent/20 text-white"
                  : "bg-black/40 text-blue-100/80"
              }`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
