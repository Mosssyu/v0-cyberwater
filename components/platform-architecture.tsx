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
  tags: { label: string; icon: LucideIcon }[]
}

const leftProducts: Product[] = [
  {
    name: "CW-Agent",
    desc: "水务智能体",
    sub: "AI 驱动 · 智能决策",
    icon: Bot,
    iconColor: "text-[oklch(0.7_0.14_300)]",
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
    tags: [
      { label: "全域可视化", icon: Eye },
      { label: "数字孪生", icon: Boxes },
    ],
  },
]

// 塔体五层，从上到下（上窄下宽）
const tiers = [
  {
    n: 5,
    label: "业务应用层",
    width: "46%",
    icons: [Settings, LayoutIconFallback, BarFallback],
    accent: "oklch(0.62 0.2 295)",
  },
  {
    n: 4,
    label: "AI 智能体层",
    width: "60%",
    icons: [Bot, Brain],
    accent: "oklch(0.6 0.2 285)",
  },
  {
    n: 3,
    label: "平台能力层",
    width: "82%",
    icons: [Settings, Sparkles],
    accent: "oklch(0.7 0.15 220)",
  },
  {
    n: 2,
    label: "数据底座层",
    width: "92%",
    icons: [Database, Boxes, Layers],
    accent: "oklch(0.72 0.14 210)",
  },
  {
    n: 1,
    label: "基础设施层",
    width: "100%",
    icons: [Cloud, Cpu, ShieldCheck],
    accent: "oklch(0.74 0.13 205)",
  },
]

// 六大能力中心
const capabilities: { label: string; icon: LucideIcon }[] = [
  { label: "AI知识中心", icon: Brain },
  { label: "数据智能中心", icon: Database },
  { label: "组织运营中心", icon: Workflow },
  { label: "感知空间中心", icon: Radio },
  { label: "业务闭环中心", icon: GitBranch },
  { label: "联动调度中心", icon: Share2 },
]

const bottomStrip: { label: string; icon: LucideIcon }[] = [
  { label: "多业态融合", icon: Boxes },
  { label: "数据驱动", icon: TrendingUp },
  { label: "AI 赋能", icon: Cpu },
  { label: "安全可靠", icon: ShieldCheck },
]

/* lucide 占位（避免命名冲突，直接复用已有图标） */
function LayoutIconFallback(props: React.ComponentProps<typeof Layers>) {
  return <Layers {...props} />
}
function BarFallback(props: React.ComponentProps<typeof TrendingUp>) {
  return <TrendingUp {...props} />
}

/* ----------------------------- 子组件 ----------------------------- */

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-5 ring-hairline backdrop-blur transition-all duration-300 hover:border-accent/40 hover:bg-card/80">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_18px_-6px_var(--color-accent)]">
          <p.icon className={`size-6 ${p.iconColor}`} />
        </span>
        <div className="min-w-0">
          <div className="text-base font-bold tracking-tight text-foreground">{p.name}</div>
          <div className="text-sm text-foreground/80">{p.desc}</div>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.sub}</p>
      <div className="mt-4 flex flex-wrap gap-2">
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

function PyramidTier({
  n,
  label,
  width,
  accent,
  icons,
}: {
  n: number
  label: string
  width: string
  accent: string
  icons: LucideIcon[]
}) {
  return (
    <div className="relative flex justify-center" style={{ marginTop: n === 5 ? 0 : "-14px" }}>
      <div
        className="relative flex h-[58px] items-center justify-center gap-3 rounded-[50%] border px-6 transition-transform duration-300 hover:-translate-y-0.5"
        style={{
          width,
          borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
          background: `radial-gradient(120% 160% at 50% 0%, color-mix(in oklab, ${accent} 32%, transparent) 0%, color-mix(in oklab, ${accent} 10%, transparent) 55%, transparent 100%)`,
          boxShadow: `0 0 28px -6px ${accent}, inset 0 1px 0 0 oklch(1 0 0 / 0.18), inset 0 -10px 22px -10px ${accent}`,
        }}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-foreground"
          style={{
            background: `color-mix(in oklab, ${accent} 70%, transparent)`,
            boxShadow: `0 0 12px -2px ${accent}`,
          }}
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

function CapabilityCore() {
  return (
    <div className="pointer-events-none absolute left-[68%] top-[30%] z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="relative flex size-[100px] items-center justify-center">
        {/* 外环 */}
        <span
          className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-accent/40"
          aria-hidden="true"
        />
        {/* 核心球 */}
        <span
          className="relative flex size-[66px] flex-col items-center justify-center rounded-full text-center"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, oklch(0.8 0.13 210 / 0.95) 0%, oklch(0.55 0.18 235 / 0.92) 55%, oklch(0.35 0.15 250 / 0.96) 100%)",
            boxShadow: "0 0 30px -4px oklch(0.7 0.15 220 / 0.8), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
          }}
        >
          <span className="text-[13px] font-bold leading-tight text-white">六大</span>
          <span className="text-[11px] font-semibold leading-tight text-white/90">能力中心</span>
        </span>
      </div>
    </div>
  )
}

/* ----------------------------- 主组件 ----------------------------- */

export function PlatformArchitecture() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 pb-10">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          <span className="text-gradient">新一代水务运营平台</span>
        </h2>
        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-accent/60 sm:block" />
          六大能力中心为核心，支撑多业态组合运营与 AI 智能决策
          <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-accent/60 sm:block" />
        </div>
      </div>

      {/* 三列：左卡 / 中央塔 / 右卡 */}
      <div className="mt-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* 左侧产品卡 */}
        <div className="flex flex-col gap-5 lg:order-1">
          {leftProducts.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>

        {/* 中央三维分层塔 */}
        <div className="order-first lg:order-2">
          <div className="relative mx-auto w-full max-w-md py-4">
            {/* 能力中心节点（环绕） */}
            <div className="relative">
              {tiers.map((t) => (
                <PyramidTier key={t.n} {...t} />
              ))}
              <CapabilityCore />
            </div>

            {/* 六大能力中心节点标签 */}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {capabilities.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-card/50 px-2.5 py-1.5 text-[11px] text-foreground/80 backdrop-blur"
                >
                  <c.icon className="size-3 text-accent" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧产品卡 */}
        <div className="flex flex-col gap-5 lg:order-3">
          {rightProducts.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>

      {/* 底部能力条 */}
      <div className="mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-card/50 p-4 ring-hairline backdrop-blur sm:grid-cols-4">
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
