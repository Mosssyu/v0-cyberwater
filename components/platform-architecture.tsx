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
// 上两层为塔尖，底三层作为旋转轨道的承载基座
const topTiers = [
  { n: 5, label: "业务应用层", width: "48%", icons: [Layers, TrendingUp], accent: "oklch(0.62 0.2 295)" },
  { n: 4, label: "AI 智能体层", width: "62%", icons: [Bot, Brain], accent: "oklch(0.6 0.2 270)" },
]
const bottomTiers = [
  { n: 3, label: "平台能力层", width: "82%", icons: [Settings, Sparkles], accent: "oklch(0.66 0.16 235)" },
  { n: 2, label: "数据底座层", width: "92%", icons: [Database, Boxes], accent: "oklch(0.72 0.14 212)" },
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

/* 六大能力中心 —— 缓慢旋转轨道 */
function CapabilityOrbit() {
  const radius = 118 // px
  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[300px]">
      {/* 轨道圈 */}
      <span
        className="ring-pulse-anim pointer-events-none absolute inset-6 rounded-full border border-accent/25"
        style={{ animation: "ring-pulse 4s ease-in-out infinite" }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-12 rounded-full border border-dashed border-accent/20"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-[4.5rem] rounded-full border border-primary/15"
        aria-hidden="true"
      />

      {/* 旋转节点层 */}
      <div
        className="orbit-anim absolute inset-0"
        style={{ animation: "orbit-spin 36s linear infinite" }}
      >
        {capabilities.map((c, i) => {
          const angle = (i / capabilities.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <div
              key={c.label}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              {/* 反向旋转，保持文字正向 */}
              <div
                className="orbit-anim flex flex-col items-center gap-1"
                style={{ animation: "orbit-spin-rev 36s linear infinite" }}
              >
                <span
                  className="flex size-12 items-center justify-center rounded-xl border border-accent/40 bg-[oklch(0.16_0.03_240/0.85)] backdrop-blur transition-transform duration-300 hover:scale-110"
                  style={{ boxShadow: "0 0 18px -4px oklch(0.72 0.15 215 / 0.7), inset 0 1px 0 0 oklch(1 0 0 / 0.18)" }}
                >
                  <c.icon className="size-5 text-accent" />
                </span>
                <span className="rounded-full bg-[oklch(0.12_0.02_240/0.7)] px-2 py-0.5 text-[10px] font-medium text-foreground/85 backdrop-blur">
                  {c.short}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 中心核心球 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="core-pulse-anim flex size-[78px] flex-col items-center justify-center rounded-full text-center"
          style={{
            animation: "core-pulse 4s ease-in-out infinite",
            background:
              "radial-gradient(circle at 50% 32%, oklch(0.85 0.13 205 / 0.96) 0%, oklch(0.55 0.18 235 / 0.92) 52%, oklch(0.32 0.16 255 / 0.96) 100%)",
          }}
        >
          <span className="text-base font-extrabold leading-tight text-white drop-shadow">六大</span>
          <span className="text-[11px] font-semibold leading-tight text-white/90">能力中心</span>
        </div>
      </div>

      {/* 扫描高光点 */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_var(--color-accent)]"
        style={{ transform: `translate(-50%, calc(-50% - ${radius + 24}px))` }}
        aria-hidden="true"
      />
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
    <div className="relative flex justify-center" style={{ marginTop: n === 5 ? 0 : "-12px" }}>
      <div
        className="relative flex h-[54px] items-center justify-center gap-3 rounded-[50%] border px-6 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
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
      {/* cyber 网格地面 */}
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

        {/* 中央三维分层塔，六大能力中心旋转轨道嵌入底三层 */}
        <div className="order-first lg:order-2">
          <div className="relative mx-auto w-full max-w-md">
            {/* 上两层（塔尖） */}
            <div className="relative z-20">
              {topTiers.map((t, i) => (
                <PyramidTier key={t.n} {...t} index={i} />
              ))}
            </div>

            {/* 底三层 + 旋转轨道叠加区 */}
            <div className="relative mt-[-12px]">
              <div className="relative z-10 opacity-90">
                {bottomTiers.map((t, i) => (
                  <PyramidTier key={t.n} {...t} index={i + topTiers.length} />
                ))}
              </div>
              {/* 旋转轨道居中叠加于底三层 */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <CapabilityOrbit />
              </div>
            </div>
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
