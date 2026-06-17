import {
  Bot,
  Bell,
  ChevronRight,
  Cpu,
  Gauge,
  Move3d,
  AlertCircle,
  Workflow,
  Layers,
  Activity,
  Waves,
  Factory,
  Network,
  Droplets,
} from "lucide-react"

/* ----------------------------- 迷你折线/面积图 ----------------------------- */
function MiniChart({ className = "" }: { className?: string }) {
  // 归一化点位（0-100 坐标系）
  const pts = [38, 32, 44, 30, 52, 40, 58, 46, 64, 54, 72, 60]
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const stepX = 100 / (pts.length - 1)
  const coords = pts.map((p, i) => {
    const x = i * stepX
    const y = 100 - ((p - min) / (max - min)) * 80 - 10
    return [x, y] as const
  })
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ")
  const area = `0,100 ${line} 100,100`
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.79 0.13 200)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.79 0.13 200)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#trendFill)" />
      <polyline
        points={line}
        fill="none"
        stroke="oklch(0.82 0.12 200)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ------------------------------- 运行总览指标 ------------------------------- */
function MetricRow({
  icon: Icon,
  label,
  value,
  pct,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  pct: number
  tone: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-3.5 shrink-0 text-accent" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-[10px] text-muted-foreground">{label}</span>
          <span className="font-mono text-[11px] font-semibold text-foreground">{value}</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
          <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- 地图标签 -------------------------------- */
function MapTag({
  icon: Icon,
  title,
  sub,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  sub: string
  className?: string
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-1.5 rounded-md border border-accent/30 bg-[oklch(0.12_0.02_240/0.85)] px-2 py-1 backdrop-blur-sm">
        <Icon className="size-3 text-accent" />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-foreground">{title}</div>
          <div className="text-[8px] text-accent">{sub}</div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------- 厂网河湖一体化地图 ---------------------------- */
function MapView() {
  return (
    <div className="relative h-full min-h-44 overflow-hidden rounded-lg border border-white/8 bg-[oklch(0.12_0.02_240)]">
      {/* 写实城市夜景底图 */}
      <img
        src="/dashboard-city-map.png"
        alt="厂网河湖一体化城市总览地图"
        className="absolute inset-0 size-full object-cover opacity-90"
      />
      {/* 顶部压暗渐变，保证标题可读 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.1_0.02_240/0.7)_0%,transparent_30%,transparent_70%,oklch(0.1_0.02_240/0.55)_100%)]"
        aria-hidden="true"
      />

      {/* 标题 */}
      <div className="absolute left-2.5 top-2 text-[10px] font-semibold text-foreground/90">
        厂·网·河·湖一体化总览
      </div>

      {/* 浮动标签 */}
      <MapTag icon={Factory} title="水厂" sub="12 座正常" className="left-3 top-7" />
      <MapTag icon={Activity} title="泵站" sub="45 座正常" className="left-2.5 bottom-3" />
      <MapTag icon={Waves} title="河湖" sub="28 处良好" className="right-3 top-9" />
      <MapTag icon={Network} title="管网" sub="正常率 97.6%" className="bottom-4 left-1/2 -translate-x-1/2" />
    </div>
  )
}

/* ------------------------------- 设备健康度环 ------------------------------ */
function HealthGauge() {
  const pct = 92.4
  const r = 22
  const c = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-[60px] shrink-0">
        <svg viewBox="0 0 60 60" className="size-full -rotate-90">
          <circle cx="30" cy="30" r={r} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="5" />
          <circle
            cx="30"
            cy="30"
            r={r}
            fill="none"
            stroke="oklch(0.82 0.13 200)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct / 100)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] font-bold text-foreground">{pct}%</span>
        </div>
      </div>
      <div className="space-y-1 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="text-muted-foreground">健康</span>
          <span className="ml-auto font-mono text-foreground">321</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-amber-400" />
          <span className="text-muted-foreground">关注</span>
          <span className="ml-auto font-mono text-foreground">28</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-destructive" />
          <span className="text-muted-foreground">故障</span>
          <span className="ml-auto font-mono text-foreground">5</span>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- 浮动卡片 -------------------------------- */
function FloatingCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-accent/25 bg-[oklch(0.14_0.02_240/0.82)] p-3 shadow-2xl shadow-black/50 backdrop-blur-md ring-hairline ${className}`}
    >
      {children}
    </div>
  )
}

const tabs = ["总览", "生产运行", "管网监测", "河湖管理", "防汛调度", "能耗管理", "AI智能体"]
const events = [
  { t: "泵站水位高", time: "09:35", tone: "bg-destructive" },
  { t: "出厂水浊度超标", time: "09:22", tone: "bg-amber-400" },
  { t: "管网压力异常", time: "09:15", tone: "bg-amber-400" },
  { t: "河道水质预警", time: "09:05", tone: "bg-accent" },
]

export function HeroDashboard() {
  return (
    <div className="relative">
      {/* 底部发光圆环 */}
      <div
        className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-[80%] -translate-x-1/2 rounded-[50%] bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      {/* 主驾驶舱面板 */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.13_0.018_245)] shadow-2xl shadow-black/60 ring-hairline">
        {/* 标题栏 */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-3.5 py-2.5">
          <Layers className="size-3.5 text-accent" />
          <span className="text-xs font-semibold text-foreground">CW-Cloud 智慧水务运营平台</span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">10:34:36</span>
          <div className="flex gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="size-1.5 rounded-full bg-amber-400/70" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-hidden border-b border-white/8 px-3 py-1.5">
          {tabs.map((t, i) => (
            <span
              key={t}
              className={`whitespace-nowrap rounded px-2 py-1 text-[10px] ${
                i === 0
                  ? "bg-accent/15 font-semibold text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* 主体三栏 */}
        <div className="grid grid-cols-12 gap-2.5 p-3">
          {/* 左栏：运行总览 + 趋势 */}
          <div className="col-span-3 space-y-2.5">
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5">
              <div className="mb-2 text-[10px] font-semibold text-foreground/90">运行总览</div>
              <div className="space-y-2">
                <MetricRow icon={Cpu} label="在线设备" value="128" pct={82} tone="bg-accent" />
                <MetricRow icon={Workflow} label="运行工艺" value="45" pct={56} tone="bg-primary" />
                <MetricRow icon={Gauge} label="达标率" value="97.6%" pct={97} tone="bg-emerald-400" />
                <MetricRow icon={Activity} label="运行率" value="98.2%" pct={98} tone="bg-accent" />
              </div>
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5">
              <div className="mb-1.5 text-[10px] font-semibold text-foreground/90">用水量趋势</div>
              <MiniChart className="h-12 w-full" />
            </div>
          </div>

          {/* 中栏：地图 */}
          <div className="col-span-6">
            <MapView />
          </div>

          {/* 右栏：告警 + 健康度 */}
          <div className="col-span-3 space-y-2.5">
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5">
              <div className="mb-2 flex items-center gap-1.5">
                <Bell className="size-3 text-accent" />
                <span className="text-[10px] font-semibold text-foreground/90">告警与事件</span>
              </div>
              <div className="mb-2 grid grid-cols-3 gap-1 text-center">
                <div>
                  <div className="font-mono text-sm font-bold text-destructive">12</div>
                  <div className="text-[8px] text-muted-foreground">未处理</div>
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-amber-400">36</div>
                  <div className="text-[8px] text-muted-foreground">预警</div>
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-accent">5</div>
                  <div className="text-[8px] text-muted-foreground">待办</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {events.map((e) => (
                  <div key={e.t} className="flex items-center gap-1.5">
                    <span className={`size-1.5 shrink-0 rounded-full ${e.tone}`} />
                    <span className="truncate text-[9px] text-foreground/80">{e.t}</span>
                    <span className="ml-auto font-mono text-[8px] text-muted-foreground">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/8 bg-white/[0.02] p-2.5">
              <div className="mb-2 text-[10px] font-semibold text-foreground/90">设备健康度</div>
              <HealthGauge />
            </div>
          </div>
        </div>
      </div>

      {/* 浮动卡片：AI 智能问答（右上） */}
      <FloatingCard className="absolute -right-4 -top-6 hidden w-52 lg:block">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Bot className="size-3.5 text-accent" />
          <span className="text-[11px] font-semibold text-foreground">AI 智能问答</span>
        </div>
        <div className="mb-1.5 rounded-md bg-accent/10 px-2 py-1 text-[10px] text-foreground/90">
          如何降低泵站能耗？
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          建议���优化运行策略、设备启停调度、变频控制等方面综合优化。
        </p>
        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-accent">
          查看分析结果
          <ChevronRight className="size-3" />
        </div>
      </FloatingCard>

      {/* 浮动卡片：水厂运营看板（左下） */}
      <FloatingCard className="absolute -bottom-8 -left-5 hidden w-48 lg:block">
        <div className="mb-2 flex items-center gap-1.5">
          <Droplets className="size-3.5 text-accent" />
          <span className="text-[11px] font-semibold text-foreground">水厂运营看板</span>
        </div>
        {/* 厂区俯视实景缩略图 */}
        <div className="relative mb-2 overflow-hidden rounded-md border border-white/8">
          <img
            src="/plant-aerial-gold.png"
            alt="水厂俯视 3D 实景，金色厂房与蓝色处理池"
            className="aspect-[16/7] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,oklch(0.1_0.02_240/0.6)_100%)]" />
          <span className="absolute bottom-1 left-1.5 inline-flex items-center gap-1 rounded-sm bg-background/70 px-1.5 py-0.5 text-[8px] font-medium text-accent backdrop-blur">
            <span className="size-1 animate-pulse rounded-full bg-accent" />
            实时俯视
          </span>
        </div>
        <div className="space-y-1.5 text-[10px]">
          {[
            ["日供水量", "152,680 m³"],
            ["出厂水浊度", "0.23 NTU"],
            ["设备运行率", "98.7%"],
            ["能耗", "0.32 kWh/m³"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-mono font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </FloatingCard>

      {/* 浮动卡片：三维孪生 / 3D 场景（右下） */}
      <FloatingCard className="absolute -bottom-10 right-2 hidden w-52 lg:block">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Move3d className="size-3.5 text-accent" />
          <span className="text-[11px] font-semibold text-foreground">三维孪生 / 3D 场景</span>
        </div>
        {/* 3D 厂区数字孪生场景 */}
        <div className="relative h-16 overflow-hidden rounded-md border border-white/8">
          <img
            src="/scene-twin-aerial.png"
            alt="水厂园区数字孪生 3D 航拍场景，叠加多个传感器监测点"
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.1_0.02_240/0.55)_100%)]" />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[9px] text-muted-foreground">
          <span className="flex items-center gap-0.5"><Move3d className="size-2.5" />漫游</span>
          <span className="flex items-center gap-0.5"><AlertCircle className="size-2.5" />告警</span>
          <span className="flex items-center gap-0.5"><Activity className="size-2.5" />分析</span>
          <span className="flex items-center gap-0.5"><Workflow className="size-2.5" />联动</span>
        </div>
      </FloatingCard>
    </div>
  )
}
