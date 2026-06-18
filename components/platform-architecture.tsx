"use client"

import { useEffect, useRef } from "react"
import {
  Bot,
  Brain,
  ClipboardList,
  Database,
  Sparkles,
  Eye,
  Boxes,
  ShieldCheck,
  TrendingUp,
  Cloud,
  Cpu,
  Layers,
  Settings,
  Bot as BotIcon,
  MessageSquare,
  Wand2,
  Wrench,
  ListChecks,
  Network,
  Waves,
  Map,
  Box,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { NeonIcon } from "@/components/neon-icon"

/* ----------------------------- 数据 ----------------------------- */

type Product = {
  name: string
  desc: string
  sub: string
  img: string
  glow: string
  tags: { label: string; icon: LucideIcon }[]
}

const leftProducts: Product[] = [
  {
    name: "CW-Agent",
    desc: "水务智能体",
    sub: "AI 驱动 · 智能决策",
    img: "/icons/prod-agent.png",
    glow: "oklch(0.62 0.2 300)",
    tags: [
      { label: "决策增强", icon: TrendingUp },
      { label: "知识进化", icon: Brain },
      { label: "智能问数", icon: MessageSquare },
      { label: "工艺优化", icon: Wand2 },
    ],
  },
  {
    name: "CW-POM",
    desc: "水厂智慧运营系统",
    sub: "生产高效 · 全面闭环",
    img: "/icons/prod-pom.png",
    glow: "oklch(0.7 0.16 160)",
    tags: [
      { label: "生产监控", icon: Settings },
      { label: "全面闭环", icon: ClipboardList },
      { label: "设备运维", icon: Wrench },
      { label: "巡检工单", icon: ListChecks },
    ],
  },
]

const rightProducts: Product[] = [
  {
    name: "CW-PPI",
    desc: "厂网河湖一体化",
    sub: "数据贯通 · 智能治理",
    img: "/icons/prod-ppi.png",
    glow: "oklch(0.74 0.14 205)",
    tags: [
      { label: "数据集成", icon: Database },
      { label: "智能治理", icon: Sparkles },
      { label: "厂网协同", icon: Network },
      { label: "防汛调度", icon: Waves },
    ],
  },
  {
    name: "CW-3DP",
    desc: "三维孪生",
    sub: "全域可感知 · 数字孪生",
    img: "/icons/prod-3dp.png",
    glow: "oklch(0.62 0.18 250)",
    tags: [
      { label: "全域可视化", icon: Eye },
      { label: "数字孪生", icon: Boxes },
      { label: "BIM+GIS", icon: Map },
      { label: "三维建模", icon: Box },
    ],
  },
]

// 塔体五层，从上到下（上窄下宽），每层带关键词说明
type Tier = {
  n: number
  label: string
  width: string
  icons: LucideIcon[]
  accent: string
  keys: string[]
}
const upperTiers: Tier[] = [
  { n: 5, label: "业务应用层", width: "60%", icons: [Layers, TrendingUp], accent: "oklch(0.62 0.2 295)", keys: ["多场景应用", "业务闭环", "智能决策"] },
  { n: 4, label: "AI 智能体层", width: "72%", icons: [BotIcon, Brain], accent: "oklch(0.6 0.2 270)", keys: ["智能体开发", "知识驱动", "自主决策"] },
]
// 第 3 层及以下；旋转的六大能力中心放在第 4 层与第 3 层之间
const lowerTiers: Tier[] = [
  { n: 3, label: "平台能力层", width: "82%", icons: [Settings, Sparkles], accent: "oklch(0.66 0.16 235)", keys: ["统一能力", "开放接口", "中台服务", "低代码"] },
  { n: 2, label: "数据底座层", width: "92%", icons: [Database, Boxes], accent: "oklch(0.72 0.14 212)", keys: ["数据汇聚", "数据治理", "数据资产", "数据服务"] },
  { n: 1, label: "基础设施层", width: "100%", icons: [Cloud, Cpu, ShieldCheck], accent: "oklch(0.76 0.13 205)", keys: ["云计算", "物联网", "网络通信", "安全防护"] },
]

// 六大能力中心（环绕旋转）
const capabilities: { label: string; img: string }[] = [
  { label: "AI知识中心", img: "/icons/cap-ai.png" },
  { label: "数据智能中心", img: "/icons/cap-data.png" },
  { label: "组织运营中心", img: "/icons/cap-org.png" },
  { label: "感知空间中心", img: "/icons/cap-space.png" },
  { label: "业务闭环中心", img: "/icons/cap-loop.png" },
  { label: "联动调度中心", img: "/icons/cap-dispatch.png" },
]

const bottomStrip: { label: string; sub: string; img: string; glow: string }[] = [
  { label: "多业态融合", sub: "资源整合 · 协同联动", img: "/icons/val-fusion.png", glow: "oklch(0.62 0.2 295)" },
  { label: "数据驱动", sub: "数据汇聚 · 智能分析", img: "/icons/val-data.png", glow: "oklch(0.66 0.16 250)" },
  { label: "AI 赋能", sub: "智能决策 · 持续进化", img: "/icons/val-ai.png", glow: "oklch(0.62 0.2 285)" },
  { label: "安全可靠", sub: "安全防护 · 稳定运行", img: "/icons/val-secure.png", glow: "oklch(0.74 0.14 205)" },
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
        <NeonIcon src={p.img} alt={p.name} glow={p.glow} className="size-14" />
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
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] text-foreground/85 transition-colors"
            style={{
              borderColor: `color-mix(in oklch, ${p.glow} 35%, transparent)`,
              backgroundColor: `color-mix(in oklch, ${p.glow} 10%, transparent)`,
            }}
          >
            <t.icon className="size-3" style={{ color: p.glow }} />
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
      {/* 俯视盘面装饰圈（多层同心椭圆 + 虚线轨道） */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* 最外发光盘面 */}
        <span
          className="ring-pulse-anim block rounded-[50%] border border-accent/25"
          style={{
            width: rx * 2 + 80,
            height: ry * 2 + 80,
            animation: "ring-pulse 4s ease-in-out infinite",
            boxShadow:
              "0 0 70px -8px oklch(0.7 0.15 215 / 0.5), inset 0 0 60px -12px oklch(0.62 0.16 225 / 0.45)",
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.5 0.16 230 / 0.14), transparent 72%)",
          }}
          aria-hidden="true"
        />
        {/* 节点所在主轨道（实线椭圆） */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-accent/35"
          style={{ width: rx * 2 + 4, height: ry * 2 + 4 }}
          aria-hidden="true"
        />
        {/* 中层虚线轨道 */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-accent/25"
          style={{ width: rx * 2 - 56, height: ry * 2 - 20 }}
          aria-hidden="true"
        />
        {/* 内层轨道圈（贴近核心球） */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/20"
          style={{ width: rx * 2 - 116, height: ry * 2 - 36 }}
          aria-hidden="true"
        />
      </div>

      {/* 中心核心球 —— 赛博朋克 HUD 风格 */}
      <div className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2">
        <div className="relative size-[124px]">
          {/* 外层旋转刻度环 */}
          <span
            className="core-ticks pointer-events-none absolute -inset-3 rounded-full opacity-70"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, transparent 60%, #000 62%, #000 70%, transparent 73%)",
              maskImage:
                "radial-gradient(circle at 50% 50%, transparent 60%, #000 62%, #000 70%, transparent 73%)",
            }}
            aria-hidden="true"
          />
          {/* 旋转扫光环 */}
          <span
            className="core-sweep pointer-events-none absolute -inset-1 rounded-full opacity-80"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, transparent 70%, #000 74%, #000 86%, transparent 90%)",
              maskImage:
                "radial-gradient(circle at 50% 50%, transparent 70%, #000 74%, #000 86%, transparent 90%)",
            }}
            aria-hidden="true"
          />
          {/* 静态描边圈（断点弧线 HUD 感） */}
          <span
            className="pointer-events-none absolute -inset-1 rounded-full border border-accent/40"
            style={{ boxShadow: "0 0 18px -4px oklch(0.78 0.16 215 / 0.7)" }}
            aria-hidden="true"
          />

          {/* 主球体 */}
          <div
            className="core-pulse-anim relative flex size-full flex-col items-center justify-center overflow-hidden rounded-full text-center"
            style={{
              animation: "core-pulse 4s ease-in-out infinite",
              background:
                "radial-gradient(circle at 50% 28%, oklch(0.92 0.1 198 / 0.98) 0%, oklch(0.62 0.18 222 / 0.96) 44%, oklch(0.3 0.16 255 / 0.98) 100%)",
            }}
          >
            {/* 内部网格 */}
            <span className="core-grid-mask pointer-events-none absolute inset-0" aria-hidden="true" />
            {/* HUD 扫描线 */}
            <span
              className="core-scan-line pointer-events-none absolute inset-x-0 h-[3px] bg-[oklch(0.98_0.05_195/0.9)]"
              style={{ boxShadow: "0 0 12px 2px oklch(0.95 0.08 200 / 0.9)" }}
              aria-hidden="true"
            />
            {/* 顶部高光 */}
            <span
              className="pointer-events-none absolute inset-x-3 top-2 h-6 rounded-[50%] bg-white/45 blur-md"
              aria-hidden="true"
            />
            {/* 文字 */}
            <span className="core-flicker-anim relative z-10 text-lg font-extrabold leading-tight text-white">
              六大
            </span>
            <span className="relative z-10 text-xs font-semibold leading-tight tracking-wide text-white/95">
              能力中心
            </span>
          </div>

          {/* 底部投影光晕 */}
          <span
            className="pointer-events-none absolute left-1/2 top-full h-8 w-36 -translate-x-1/2 -translate-y-3 rounded-[50%] bg-accent/35 blur-lg"
            aria-hidden="true"
          />
        </div>
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
          <NeonIcon src={c.img} alt={c.label} glow="oklch(0.74 0.14 205)" className="size-12" />
          <span className="whitespace-nowrap rounded-full border border-accent/25 bg-[oklch(0.12_0.02_240/0.82)] px-2 py-0.5 text-[10px] font-medium text-foreground/90 backdrop-blur">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* 三维分层塔（每层含关键词说明行） */
function PyramidTier({ n, label, width, accent, icons, keys, index }: Tier & { index: number }) {
  return (
    <div className="relative flex justify-center">
      <div
        className="group/tier relative flex h-[68px] flex-col items-center justify-center gap-1 rounded-[50%] border px-8 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
        style={{
          width,
          borderColor: `color-mix(in oklab, ${accent} 60%, transparent)`,
          background: `radial-gradient(120% 180% at 50% 0%, color-mix(in oklab, ${accent} 40%, transparent) 0%, color-mix(in oklab, ${accent} 12%, transparent) 55%, transparent 100%)`,
          boxShadow: `0 0 32px -6px ${accent}, inset 0 1px 0 0 oklch(1 0 0 / 0.22), inset 0 -14px 28px -10px ${accent}`,
          animation: `tier-rise 0.6s cubic-bezier(0.22,0.61,0.36,1) ${index * 0.08}s both`,
        }}
      >
        {/* 层名行 */}
        <div className="flex items-center gap-2.5">
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
              <Icon key={i} className="size-3.5 text-white/75" />
            ))}
          </span>
        </div>
        {/* 关键词说明行 */}
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 px-2">
          {keys.map((k, i) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className="whitespace-nowrap text-[10px] text-foreground/70">{k}</span>
              {i < keys.length - 1 && <span className="text-[10px] text-foreground/25">|</span>}
            </span>
          ))}
        </div>
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
          <span className="text-gradient">智能运营能力架构</span>
        </h2>
        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-accent/60 sm:block" />
          六大能力中心为核心，支撑多业态融合运营与 AI 智能决策
          <span className="hidden h-px w-12 bg-gradient-to-l from-transparent to-accent/60 sm:block" />
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
      <div className="relative mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-card/50 p-5 ring-hairline backdrop-blur sm:grid-cols-4">
        {bottomStrip.map((b, i) => (
          <div
            key={b.label}
            className="group flex items-center gap-3 py-1 sm:justify-start"
            style={{ borderLeft: i > 0 ? "1px solid color-mix(in oklab, var(--border) 60%, transparent)" : undefined }}
          >
            <NeonIcon src={b.img} alt={b.label} glow={b.glow} className="size-11 shrink-0 sm:ml-3" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{b.label}</div>
              <div className="truncate text-xs text-muted-foreground">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
