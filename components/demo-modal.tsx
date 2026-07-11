"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Bot, Waypoints, Boxes, Factory, ScanLine, MessageSquareText, FileText, Sparkles } from "lucide-react"
import { GlowIcon } from "@/components/glow-icon"

const products = [
  {
    icon: Bot,
    code: "CW-Agent",
    name: "水务智能体",
    desc: "面向运营的 AI 助手，主动监盘、异常预测与智能决策。",
    glow: "oklch(0.74 0.14 205)",
  },
  {
    icon: Waypoints,
    code: "CW-PPI",
    name: "厂网河湖一体化",
    desc: "打通厂、站、网、河湖全要素，实现协同调度与运营闭环。",
    glow: "oklch(0.68 0.15 235)",
  },
  {
    icon: Boxes,
    code: "CW-Visual",
    name: "数字孪生",
    desc: "三维可视化还原水务对象，支持状态联动与仿真推演。",
    glow: "oklch(0.7 0.16 260)",
  },
  {
    icon: Factory,
    code: "CW-POM",
    name: "数字水厂",
    desc: "水厂生产运行全流程线上化、标准化与智能运营管理。",
    glow: "oklch(0.72 0.14 190)",
  },
]

const benefits = [
  { icon: ScanLine, label: "产品演示" },
  { icon: FileText, label: "行业案例" },
  { icon: MessageSquareText, label: "技术交流" },
]

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-[oklch(0.09_0.02_252/0.78)] backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 弹窗主体 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        className="ring-hairline relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-[oklch(0.19_0.017_248)] to-[oklch(0.13_0.014_252)] shadow-2xl shadow-black/60"
      >
        {/* 顶部柔光 + 网格 */}
        <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true" />
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/40 text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
        >
          <X className="size-4.5" />
        </button>

        <div className="relative p-6 sm:p-8">
          {/* 标题 */}
          <div className="mb-7 text-center sm:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-xs text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              BOOK A DEMO
            </span>
            <h2
              id="demo-modal-title"
              className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              预约产品演示
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            {/* 左侧：产品能力 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <p className="text-sm font-semibold text-foreground">新一代 AI 水务运营平台</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {products.map((p) => (
                  <div
                    key={p.code}
                    className="group ring-hairline rounded-2xl border border-border/50 bg-card/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card/70"
                  >
                    <GlowIcon icon={p.icon} size="md" glow={p.glow} />
                    <div className="mt-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-sm font-bold text-accent">{p.code}</span>
                        <span className="text-sm font-semibold text-foreground">{p.name}</span>
                      </div>
                      <p className="mt-1 text-pretty text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：微信二维码 */}
            <div className="ring-hairline relative flex flex-col items-center overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-[oklch(0.2_0.03_240/0.5)] to-[oklch(0.14_0.015_252/0.5)] p-6 text-center">
              <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-24" aria-hidden="true" />
              <p className="relative text-base font-semibold text-foreground">扫码添加水务顾问</p>
              <div className="relative mt-4 rounded-2xl border border-accent/30 bg-white p-2.5 shadow-[0_0_28px_-6px_oklch(0.79_0.13_200/0.7)]">
                <img
                  src="/wechat-sales-qr.png"
                  alt="销售顾问微信二维码"
                  decoding="async"
                  className="size-40 rounded-lg object-contain"
                />
              </div>
              <div className="relative mt-5 w-full">
                <p className="mb-2.5 text-xs font-medium text-muted-foreground">扫码即可获取</p>
                <ul className="flex flex-col gap-2">
                  {benefits.map((b) => (
                    <li
                      key={b.label}
                      className="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card/40 px-3 py-2 text-left"
                    >
                      <b.icon className="size-4 shrink-0 text-accent" />
                      <span className="text-sm text-foreground">{b.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
