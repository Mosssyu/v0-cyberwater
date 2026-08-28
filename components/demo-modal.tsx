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
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:items-center sm:p-6">
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 弹窗主体 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-4xl flex-col overflow-hidden border border-white/12 bg-[#03080b] sm:max-h-[calc(100dvh-3rem)]"
      >
        {/* 顶部柔光 + 网格 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_72%_0%,rgba(99,191,214,.12),transparent_62%)]" aria-hidden="true" />

        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/12 bg-black/20 text-muted-foreground backdrop-blur transition-colors hover:border-white/40 hover:text-foreground"
        >
          <X className="size-4.5" />
        </button>

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
          {/* 标题 */}
          <div className="mb-7 border-b border-white/10 pb-7 text-left sm:mb-8">
            <span className="v4-kicker">CONTACT US / 联系我们</span>
            <h2
              id="demo-modal-title"
              className="mt-5 text-balance text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-5xl"
            >
              从一次沟通开始，<br /><span className="text-white/34">让运营持续进化。</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            {/* 左侧：产品能力 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <p className="text-sm font-semibold text-foreground">新一代 AI 水务运营平台</p>
              </div>
              <div className="v4-flat-grid grid-cols-1 sm:grid-cols-2">
                {products.map((p) => (
                  <div
                    key={p.code}
                    className="v4-flat-cell group p-4"
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
            <div className="relative flex flex-col items-center overflow-hidden border border-white/10 bg-white/[0.018] p-6 text-center">
              <p className="relative text-base font-semibold text-foreground">扫码添加水务顾问</p>
              <div className="relative mt-4 border border-white/20 bg-white p-2.5">
                <img
                  src="/wechat-sales-qr.png"
                  alt="销售顾问微信二维码"
                  decoding="async"
                  className="size-40 object-contain"
                />
              </div>
              <div className="relative mt-5 w-full">
                <p className="mb-2.5 text-xs font-medium text-muted-foreground">扫码即可获取</p>
                <ul className="flex flex-col gap-2">
                  {benefits.map((b) => (
                    <li
                      key={b.label}
                      className="flex items-center gap-2.5 border-t border-white/10 px-3 py-2 text-left"
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
