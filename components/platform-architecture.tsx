"use client"

import { useEffect, useRef } from "react"
import {
  Bot,
  Brain,
  Factory,
  ClipboardList,
  Network,
  Database,
  Sparkles,
  Eye,
  Box,
  Boxes,
  ShieldCheck,
  TrendingUp,
  Cloud,
  Cpu,
  Layers,
  Settings,
  Workflow,
  Radio,
  Share2,
  GitBranch,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ----------------------------- 数据 ----------------------------- */

type Product = {
  name: string
  desc: string
  sub: string
  icon: LucideIcon
  iconColor: string
  glow: string
  tags: { label: string; icon: LucideIcon }[]
}

const leftProducts: Product[] = [
  {
    name: "CW-Agent",
    desc: "水务智能体",
    sub: "AI 驱动 · 智能决策",
    icon: Bot,
    iconColor: "text-[oklch(0.72_0.14_300)]",
    glow: "oklch(0.62 0.2 300)",
    tags: [
      { label: "决策增强", icon: TrendingUp },
      { label: "知识进化", icon: Brain },
    ],
  },
  {
    name: "CW-POM",
    desc: "水厂智慧运营系统",
    sub: "生产高效 · 全面闭环",
    icon: Factory,
    iconColor: "text-emerald-400",
    glow: "oklch(0.7 0.16 160)",
    tags: [
      { label: "生产监控", icon: Settings },
      { label: "全面闭环", icon: ClipboardList },
    ],
  },
]

const rightProducts: Product[] = [
  {
    name: "CW-PPI",
    desc: "厂网河湖一体化",
    sub: "数据贯通 · 智能治理",
    icon: Network,
    iconColor: "text-accent",
    glow: "oklch(0.74 0.14 205)",
    tags: [
      { label: "数据集成", icon: Database },
      { label: "智能治理", icon: Sparkles },
    ],
  },
  {
    name: "CW-Visual",
    desc: "三维数字孪生",
    sub: "全域可感知 · 数字孪生",
    icon: Box,
    iconColor: "text-primary",
    glow: "oklch(0.62 0.18 250)",
    tags: [
      { label: "全域可视化", icon: Eye },
      { label: "数字孪生", icon: Boxes },
    ],
  },
]

// 塔体五层，从上到下（上窄下宽）
const upperTiers = [
  { n: 5, label: "业务应用层", width: "46%", icons: [Layers, TrendingUp], accent: "oklch(0.62 0.2 295)" },
  { n: 4, label: "AI 智能体层", width: "60%", icons: [Bot, Brain], accent: "oklch(0.6 0.2 270)" },
]
// 第 3 层及以下；旋转的六大能力中心放在第 4 层与第 3 层之间
const lowerTiers = [
  { n: 3, label: "平台能力层", width: "76%", icons: [Settings, Sparkles], accent: "oklch(0.66 0.16 235)" },
  { n: 2, label: "数据底座层", width: "88%", icons: [Database, Boxes], accent: "oklch(0.72 0.14 212)" },
  { n: 1, label: "基础设施层", width: "100%", icons: [Cloud, Cpu, ShieldCheck], accent: "oklch(0.76 0.13 205)" },
]

// 六大能力中心（环绕旋转）
const capabilities: { label: string; short: string; icon: LucideIcon }[] = [
  { label: "AI知识中心", short: "AI知识", icon: Brain },
  { label: "数据智能中心", short: "数据智能", icon: Database },
  { label: "组织运营中心", short: "组织运营", icon: Workflow },
  { label: "感知空间中心", short: "感知空间", icon: Radio },
  { label: "业务闭环中心", short: "业务闭环", icon: GitBranch },
  { label: "联动调度中心", short: "联动调度", icon: Share2 },
]

const bottomStrip: { label: string; icon: LucideIcon }[] = [
  { label: "多业态融合", icon: Boxes },
  { label: "数据驱动", icon: TrendingUp },
  { label: "AI 赋能", icon: Cpu },
  { label: "安全可靠", icon: ShieldCheck },
]

/* ----------------------------- 子组件 ----------------------------- */

function ProductCard({ p, align }: { p: Product; align: "left" | "right" }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-5 ring-hairline backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-card/70"
      style={{ boxShadow: `0 0 0 0 transparent` }}
    >
      {/* 角标线条 */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-opacity duration-300"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${p.glow}, transparent)` }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-px -top-px size-8 rounded-bl-2xl border-l border-b opacity-50"
        style={{ borderColor: p.glow }}
        aria-hidden="true"
      />
      <div className={`flex items-start gap-3 ${align === "right" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent transition-shadow duration-300 group-hover:shadow-[0_0_22px_-4px_var(--g)]"
          style={{ ["--g" as string]: p.glow }}
        >
          <p.icon className={`size-6 ${p.iconColor}`} />
        </span>
        <div className="min-w-0">
          <div className="text-base font-bold tracking-tight text-foreground">{p.name}</div>
          <div className="text-sm text-foreground/80">{p.desc}</div>
        </div>
      </div>
      <p className={`mt-3 text-xs leading-relaxed text-muted-foreground ${align === "right" ? "lg:text-right" : ""}`}>
        {p.sub}
      </p>
      <div className={`mt-4 flex flex-wrap gap-2 ${align === "right" ? "lg:justify-end" : ""}`}>
        {p.tags.map((t) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground/75"
          >
            <t.icon className="size-3 text-accent" />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* 六大能力中心 —— 俯视盘面旋转轨道（节点直立，沿压扁椭圆环绕） */
function CapabilityOrbit() {
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const rx = 168 // 椭圆水平半径
  const ry = 60 // 椭圆垂直半径（俯视压扁）

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const n = nodesRef.current.length
    const speed = (2 * Math.PI) / 36000 // 一圈 36s
    let start: number | null = null

    const frame = (t: number) => {
      if (start === null) start = t
      const base = reduce ? Math.PI / 2 : (t - start) * speed

      nodesRef.current.forEach((el, i) => {
        if (!el) return
        const angle = base + (i / n) * 2 * Math.PI
        const x = Math.cos(angle) * rx
        const y = Math.sin(angle) * ry
        const depth = Math.sin(angle) // -1 远(上) → 1 近(下)
        const scale = 0.7 + ((depth + 1) / 2) * 0.45 // 0.7 ~ 1.15
        const opacity = 0.5 + ((depth + 1) / 2) * 0.5 // 0.5 ~ 1
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(50 + Math.round(depth * 40))
      })

      if (!reduce) rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="relative mx-auto h-[240px] w-full max-w-[440px]">
      {/* 俯视盘面装饰圈（倾斜椭圆） */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="ring-pulse-anim block rounded-[50%] border border-accent/30"
          style={{
            width: rx * 2 + 48,
            height: ry * 2 + 48,
            animation: "ring-pulse 4s ease-in-out infinite",
            boxShadow:
              "0 0 60px -8px oklch(0.7 0.15 215 / 0.5), inset 0 0 50px -10px oklch(0.62 0.16 225 / 0.45)",
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.5 0.16 230 / 0.14), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-accent/20"
          style={{ width: rx * 2 - 30, height: ry * 2 - 18 }}
          aria-hidden="true"
        />
      </div>

      {/* 中心核心球 */}
      <div className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2">
        <div
          className="core-pulse-anim flex size-[96px] flex-col items-center justify-center rounded-full text-center"
          style={{
            animation: "core-pulse 4s ease-in-out infinite",
            background:
              "radial-gradient(circle at 50% 30%, oklch(0.88 0.11 200 / 0.98) 0%, oklch(0.6 0.17 225 / 0.95) 46%, oklch(0.34 0.16 250 / 0.98) 100%)",
          }}
        >
          <span className="text-lg font-extrabold leading-tight text-white drop-shadow">六大</span>
          <span className="text-xs font-semibold leading-tight text-white/90">能力中心</span>
        </div>
        <span
          className="pointer-events-none absolute left-1/2 top-full h-7 w-32 -translate-x-1/2 -translate-y-2 rounded-[50%] bg-accent/30 blur-md"
          aria-hidden="true"
        />
      </div>

      {/* 环绕节点（JS 驱动俯视位置，节点始终直立） */}
      {capabilities.map((c, i) => (
        <div
          key={c.label}
          ref={(el) => {
            nodesRef.current[i] = el
          }}
          className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1 will-change-transform"
        >
          <span
            className="flex size-12 items-center justify-center rounded-xl border border-accent/40 bg-[oklch(0.16_0.03_240/0.9)] backdrop-blur"
            style={{
              boxShadow:
                "0 0 18px -4px oklch(0.72 0.15 215 / 0.75), inset 0 1px 0 0 oklch(1 0 0 / 0.18)",
            }}
          >
            <c.icon className="size-5 text-accent" />
          </span>
          <span className="whitespace-nowrap rounded-full bg-[oklch(0.12_0.02_240/0.78)] px-2 py-0.5 text-[10px] font-medium text-foreground/90 backdrop-blur">
            {c.short}
          </span>
        </div>
      ))}
    </div>
  )
}

/* 三维分层塔 */
function PyramidTier({
  n,
  label,
  width,
  accent,
  icons,
  index,
}: {
  n: number
  label: string
  width: string
  accent: string
  icons: LucideIcon[]
  index: number
}) {
  return (
    <div className="relative flex justify-center">
      <div
        className="relative flex h-[52px] items-center justify-center gap-3 rounded-[50%] border px-6 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
        style={{
          width,
          borderColor: `color-mix(in oklab, ${accent} 60%, transparent)`,
          background: `radial-gradient(120% 170% at 50% 0%, color-mix(in oklab, ${accent} 38%, transparent) 0%, color-mix(in oklab, ${accent} 12%, transparent) 55%, transparent 100%)`,
          boxShadow: `0 0 30px -6px ${accent}, inset 0 1px 0 0 oklch(1 0 0 / 0.22), inset 0 -12px 26px -10px ${accent}`,
          animation: `tier-rise 0.6s cubic-bezier(0.22,0.61,0.36,1) ${index * 0.08}s both`,
        }}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: `color-mix(in oklab, ${accent} 75%, transparent)`, boxShadow: `0 0 12px -2px ${accent}` }}
        >
          {n}
        </span>
        <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {label}
        </span>
        <span className="flex items-center gap-1.5">
          {icons.map((Icon, i) => (
            <Icon key={i} className="size-3.5 text-foreground/85" />
          ))}
        </span>
      </div>
    </div>
  )
}

/* ----------------------------- 主组件 ----------------------------- */

export function PlatformArchitecture() {
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-10">
      {/* cyber 网格���面 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px]" aria-hidden="true">
        <div className="cyber-grid-floor absolute inset-x-0 bottom-0 h-full" />
      </div>

      {/* 标题 */}
      <div className="relative text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          <span className="text-gradient">新一代水务运营平台</span>
        </h2>
        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-accent/60 sm:block" />
          六大能力中心为核心，支撑多业态组合运营与 AI 智能决策
          <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-accent/60 sm:block" />
        </div>
      </div>

      {/* 三列：左卡 / 中央塔+旋转核心 / 右卡 */}
      <div className="relative mt-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 lg:order-1">
          {leftProducts.map((p) => (
            <ProductCard key={p.name} p={p} align="left" />
          ))}
        </div>

        {/* 中央三维分层塔：六大能力中心旋转轨道位于第 4 层与第 3 层之间 */}
        <div className="order-first lg:order-2">
          <div className="relative mx-auto flex w-full max-w-md flex-col gap-[18px]">
            {/* 上两层（塔尖） */}
            {upperTiers.map((t, i) => (
              <PyramidTier key={t.n} {...t} index={i} />
            ))}

            {/* 六大能力中心：360° 旋转轨道（第 4 与第 3 层之间） */}
            <div className="relative flex justify-center py-2">
              <CapabilityOrbit />
            </div>

            {/* 第 3 层及以下 */}
            {lowerTiers.map((t, i) => (
              <PyramidTier key={t.n} {...t} index={i + upperTiers.length} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:order-3">
          {rightProducts.map((p) => (
            <ProductCard key={p.name} p={p} align="right" />
          ))}
        </div>
      </div>

      {/* 底部能力条 */}
      <div className="relative mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-card/50 p-4 ring-hairline backdrop-blur sm:grid-cols-4">
        {bottomStrip.map((b) => (
          <div key={b.label} className="flex items-center justify-center gap-2 py-1 text-sm text-foreground/85">
            <span className="flex size-8 items-center justify-center rounded-lg border border-accent/25 bg-accent/10">
              <b.icon className="size-4 text-accent" />
            </span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  )
}
