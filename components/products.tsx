"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CwCloudSlide } from "@/components/cw-cloud-slide"
import { Cw3dpSlide } from "@/components/cw-3dp-slide"
import { NeonIcon } from "@/components/neon-icon"

const slides = [
  { id: "cw-cloud", name: "CW-Cloud 水务 AI 运营平台" },
  { id: "cw-3dp", name: "CW-3DP 三维数字孪生" },
]

const support = [
  {
    img: "/icons/sup-iot.png",
    tag: "IoT",
    glow: "oklch(0.79 0.13 200)",
    title: "智能感知 IoT 平台",
    desc: "统一接入液位计、流量计、雨量计、压力传感器、RTU、PLC 等设备数据，实现精确感知。",
  },
  {
    img: "/icons/sup-sso.png",
    tag: "SSO",
    glow: "oklch(0.63 0.17 250)",
    title: "统一登录 SSO 平台",
    desc: "统一身份认证与单点登录，打通产品矩阵账号体系，实现一次登录、全平台无缝协同。",
  },
]

export function Products() {
  const [active, setActive] = useState(0)

  // 轮播自动切换
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 12000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => setActive((a) => (a + dir + slides.length) % slides.length)

  return (
    <section id="products" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Core Products
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            核心产品
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            CW-Cloud 水务 AI 运营平台与 CW-3DP 三维数字孪生，从智能运营到空间仿真，构建端到端的智慧水务能力。
          </p>
        </div>

        {/* 产品标签页 */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
              style={{
                borderColor: active === i ? "oklch(0.7 0.13 215 / 0.6)" : "var(--border)",
                color: active === i ? "oklch(0.88 0.1 205)" : "var(--muted-foreground)",
                backgroundColor: active === i ? "oklch(0.7 0.14 215 / 0.1)" : "transparent",
                boxShadow: active === i ? "0 0 22px -10px oklch(0.7 0.14 215)" : undefined,
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* 轮播 */}
        <div className="relative mt-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              <div className="w-full shrink-0 px-1">
                <CwCloudSlide active={active === 0} />
              </div>
              <div className="w-full shrink-0 px-1">
                <Cw3dpSlide active={active === 1} />
              </div>
            </div>
          </div>

          {/* 左右切换 */}
          <button
            type="button"
            aria-label="上一个产品"
            onClick={() => go(-1)}
            className="absolute -left-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent lg:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="下一个产品"
            onClick={() => go(1)}
            className="absolute -right-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-accent/50 hover:text-accent lg:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* 进度点 */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.name}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: active === i ? 28 : 8,
                backgroundColor: active === i ? "oklch(0.7 0.14 215)" : "oklch(0.4 0.04 245)",
              }}
            />
          ))}
        </div>

        {/* 矩阵支撑 */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              矩阵支撑 · Foundation
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {support.map((item) => (
              <div
                key={item.title}
                className="group relative flex items-start gap-4 bg-card p-6 transition-colors duration-300 hover:bg-secondary/40"
              >
                <NeonIcon src={item.img} alt={item.title} glow={item.glow} className="size-11" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
