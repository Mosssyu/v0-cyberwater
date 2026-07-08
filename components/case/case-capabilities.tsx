import { BrainCircuit, Building2, ScanEye, Copy, type LucideIcon } from "lucide-react"
import { GlowIcon } from "@/components/glow-icon"

const CAPS: { icon: LucideIcon; title: string; desc: string; glow: string }[] = [
  {
    icon: BrainCircuit,
    title: "数据驱动决策",
    desc: "统一数据标准与模型能力，让运营决策从经验判断转向实时数据驱动。",
    glow: "oklch(0.63 0.17 250)",
  },
  {
    icon: Building2,
    title: "集团集约管控",
    desc: "打通集团—区域—子公司—水厂的数据链路，实现 1+N 集约化协同管理。",
    glow: "oklch(0.74 0.14 205)",
  },
  {
    icon: ScanEye,
    title: "全域可视可控",
    desc: "厂、站、网、河、湖全要素三维可视，运行态势与设备健康一屏尽览。",
    glow: "oklch(0.62 0.2 295)",
  },
  {
    icon: Copy,
    title: "快速复制落地",
    desc: "标准化产品体系与可复用数据资产，支撑方案在多厂多区快速复制推广。",
    glow: "oklch(0.72 0.15 165)",
  },
]

export function CaseCapabilities() {
  return (
    <section className="relative border-y border-border bg-secondary/30">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-medium tracking-wider text-accent">04 / CAPABILITY</span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
            核心能力 / 方案亮点
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 ring-hairline backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: c.glow }}
              />
              <GlowIcon icon={c.icon} size="lg" glow={c.glow} />
              <h3 className="mt-5 text-base font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
