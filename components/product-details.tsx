import {
  Dna,
  Server,
  BrainCircuit,
  Building2,
  TrendingUp,
  Activity,
  SlidersHorizontal,
  Wrench,
  Siren,
  MessageSquareText,
  Boxes,
  Map as MapIcon,
  Database,
  Radio,
  Share2,
  CloudRain,
  Network,
  LayoutDashboard,
  Waves,
  ClipboardCheck,
  ClipboardList,
  Box as Cube,
  Layers,
  MapPin,
  Link2,
  GraduationCap,
  Route,
  Smartphone,
  RotateCcw,
  Library,
  ShieldCheck,
  Workflow,
  LineChart,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

type FlowItem = { icon: LucideIcon; label: string; note?: string }
type SceneItem = { icon: LucideIcon; title: string; value: string; diagram: string }
type VersionItem = { name: string; tag: string; desc: string }

type ProductData = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  image: string
  glow: string
  flow: FlowItem[]
  versions?: VersionItem[]
  scenes: SceneItem[]
  variant: "flagship" | "dark" | "default"
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 flex items-center gap-3">
      <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-wider text-accent">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  )
}

function ProductDetail({ data }: { data: ProductData }) {
  const isDark = data.variant === "dark" || data.variant === "flagship"
  const isFlagship = data.variant === "flagship"
  return (
    <section
      id={data.id}
      className={
        isDark
          ? "relative overflow-hidden border-y border-border bg-[oklch(0.13_0.012_252)] py-24"
          : "relative overflow-hidden bg-background py-24"
      }
    >
      {isDark && (
        <>
          <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
          <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {(() => {
            const parts = data.eyebrow.split(" · ")
            return (
              <div className="flex flex-col items-center">
                {/* 标签胶囊：核心产品 */}
                {parts[0] && (
                  <span
                    className={
                      isFlagship
                        ? "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent backdrop-blur"
                        : "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-accent backdrop-blur"
                    }
                  >
                    {isFlagship && <Sparkles className="size-3.5 shrink-0" />}
                    {parts[0]}
                  </span>
                )}
                {/* 产品名：核心主标题 */}
                {parts[1] && (
                  <h2 className="mt-5 font-mono text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
                    {parts[1]}
                  </h2>
                )}
                {/* 产品定位：副标题 */}
                {parts[2] && (
                  <p className="mt-2 text-lg font-semibold tracking-wide text-foreground/90 sm:text-xl">
                    {parts[2]}
                  </p>
                )}
              </div>
            )
          })()}
          {/* 说明文案：进一步弱化 */}
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground/70">{data.title}</span>
            <span className="mx-1.5 text-border">·</span>
            {data.subtitle}
          </p>
        </div>

        {/* 能力抽象链路 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {data.flow.map((d, i) => (
            <div key={d.label} className="flex items-center gap-2.5 sm:gap-3">
              <div className="ring-hairline flex min-w-28 flex-col items-center gap-1.5 rounded-2xl border border-border bg-card/70 px-4 py-3.5 text-center backdrop-blur">
                <d.icon className="size-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">{d.label}</span>
                {d.note && <span className="text-xs text-muted-foreground">{d.note}</span>}
              </div>
              {i < data.flow.length - 1 && (
                <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 版本说明（仅 CW-POM） */}
        {data.versions && (
          <>
            <SectionLabel>Editions · 版本</SectionLabel>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {data.versions.map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl border border-border bg-card p-6 ring-hairline"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">{v.name}</span>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {v.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 场景价值 · 中心内凹式双栏透视布局 */}
        <SectionLabel>Scenarios · 场景价值</SectionLabel>
        <div className="mt-10 [perspective:1900px] [perspective-origin:50%_42%]">
          <div className="flex flex-col gap-6 [transform-style:preserve-3d] lg:flex-row lg:items-stretch lg:gap-8">
            {/* 左栏 · 大主系统界面（向中心内凹右收） */}
            <div className="lg:w-[56%] lg:origin-right lg:[transform:rotateY(9deg)]">
              <div
                className="group relative h-full min-h-72 overflow-hidden rounded-3xl border border-accent/30 bg-[oklch(0.13_0.012_252)]"
                style={{ boxShadow: `0 30px 80px -30px ${data.glow}, inset 0 0 120px -60px ${data.glow}` }}
              >
                <img
                  src={data.image || "/placeholder.svg"}
                  alt={`${data.title} 系统示意图`}
                  className="size-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{ background: `radial-gradient(circle at 50% 120%, ${data.glow} 0%, transparent 55%)` }}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: "inset 0 0 60px 8px oklch(0.13 0.012 252)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 右栏 · 编号场景卡片列（向中心内凹左收） */}
            <ul className="flex flex-1 flex-col gap-3 lg:origin-left lg:[transform:rotateY(-9deg)]">
              {data.scenes.map((s, i) => (
                <li
                  key={s.title}
                  className="group flex flex-1 items-start gap-4 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-semibold tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.value}</p>
                    <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-accent">
                      <LayoutDashboard className="size-3 shrink-0" />
                      {s.diagram}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const agent: ProductData = {
  id: "product-agent",
  eyebrow: "核心产品 · CW-Agent · 水务智能体",
  title: "水务智能体，让 AI 深入运营每一环节",
  subtitle:
    "融合大模型、RAG 与知识图谱技术，打通感知、认知、决策执行与进化全链路，持续优化水厂运行效率与决策质量。",
  image: "/products/agent-dashboard.png",
  glow: "oklch(0.62 0.19 250)",
  flow: [
    { icon: Dna, label: "水务基因", note: "运营场景内生" },
    { icon: Server, label: "自研底座", note: "工业级智能体" },
    { icon: BrainCircuit, label: "专业认知", note: "水务知识引擎" },
    { icon: Building2, label: "集团运营", note: "多层级多业态" },
    { icon: TrendingUp, label: "个性化适配", note: "持续进化" },
  ],
  scenes: [
    {
      icon: Activity,
      title: "实时态势感知",
      value: "系统主动识别风险并给出当班结论，替代人工盯屏判断。",
      diagram: "态势驾驶舱 · 风险识别",
    },
    {
      icon: SlidersHorizontal,
      title: "工艺调控助手",
      value: "将专家经验与运行数据转化为可执行调控建议，提升出水稳定性、降低能耗药耗。",
      diagram: "工艺参数 · 调控建议",
    },
    {
      icon: Wrench,
      title: "设备运维助手",
      value: "快速定位故障原因与处置方法，减少盲目排查。",
      diagram: "设备画像 · 故障诊断",
    },
    {
      icon: Siren,
      title: "异常处置助手",
      value: "报警自动升级为诊断—派单—处置—复盘闭环，提升响应速度与可追溯性。",
      diagram: "异常流转 · 处置闭环",
    },
    {
      icon: MessageSquareText,
      title: "智能问答与洞察",
      value: "自然语言提问即可获得答案���分析与成稿，降低检索与报告成本。",
      diagram: "AI 问答 · 报告生成",
    },
  ],
  variant: "flagship",
}

const ppi: ProductData = {
  id: "product-ppi",
  eyebrow: "核心产品 · CW-PPI · 厂网河湖一体化",
  title: "厂网河湖一体化，从单点管理走向全域治理",
  subtitle:
    "以多业态对象统一建模、地图空间运营、数据融合与业务协同为核心，打通水厂、泵站、管网、河道、湖泊、排口、雨量站、重点部位、防汛与调度等场景，支撑集团全域感知、协同运营、联动调度与一体化治理。",
  image: "/products/ppi-dashboard.png",
  glow: "oklch(0.74 0.14 205)",
  flow: [
    { icon: Boxes, label: "统一对象" },
    { icon: MapIcon, label: "空间融合" },
    { icon: Database, label: "数据贯通" },
    { icon: Share2, label: "业务协同" },
    { icon: Network, label: "联动调度" },
    { icon: Building2, label: "集团监管" },
  ],
  scenes: [
    {
      icon: LayoutDashboard,
      title: "多业态统一运营",
      value: "水厂、管网、河湖、排口等全域对象纳入一个平台统一掌握。",
      diagram: "一张图运营总览",
    },
    {
      icon: Network,
      title: "厂网联动分析",
      value: "关联水厂、管网、泵站与用水数据，支撑调度优化与风险预判。",
      diagram: "厂网联动分析",
    },
    {
      icon: CloudRain,
      title: "排水防汛联动",
      value: "融合降雨、液位、泵站与易涝点信息，快速判断积水风险与处置优先级。",
      diagram: "防汛调度地图",
    },
    {
      icon: Waves,
      title: "河湖排口监管",
      value: "关联水质、排口与巡检任务，及时发现异常排放与水环境风险。",
      diagram: "河湖排口监管",
    },
    {
      icon: ClipboardCheck,
      title: "统一巡检与工单协同",
      value: "厂内外巡检任务统一管理，现场问题直接生成工单并联动处置。",
      diagram: "巡检工单闭环",
    },
    {
      icon: Building2,
      title: "集团级运营监管",
      value: "跨区域、跨业态统一监管，实现多厂对标、风险汇总与标准制定。",
      diagram: "集团运营驾驶舱",
    },
  ],
  variant: "default",
}

const twin: ProductData = {
  id: "product-3dp",
  eyebrow: "核心产品 · CW-3DP · 三维孪生",
  title: "数字孪生，空间可视、状态可感、决策可推演",
  subtitle:
    "以三维实景还原为基础，以运行数据融合为核心，以场景联动和仿真推演为延伸，支撑水厂实现空间可视、状态可感、过程可巡、风险可控与决策可推演。",
  image: "/products/twin-dashboard.png",
  glow: "oklch(0.62 0.18 250)",
  flow: [
    { icon: Cube, label: "建模" },
    { icon: Layers, label: "融合" },
    { icon: MapPin, label: "定位" },
    { icon: Link2, label: "联动" },
    { icon: Activity, label: "推演" },
  ],
  scenes: [
    {
      icon: Boxes,
      title: "设备、管线、回路可视化管理",
      value: "设备、管线、回路在三维空间可查可定位可追溯，降低排查难度。",
      diagram: "三维厂区定位",
    },
    {
      icon: Siren,
      title: "告警与安全联动处置",
      value: "水质、设备、安防告警联动空间位置与视频，快速判断风险范围。",
      diagram: "三维告警联动",
    },
    {
      icon: GraduationCap,
      title: "工艺展示与培训讲解",
      value: "三维动画呈现工艺流程与设备原理，适合参观、展示与培训。",
      diagram: "工艺流程展示",
    },
    {
      icon: Route,
      title: "厂区巡检线上化",
      value: "现场巡检转为三维漫游与自动巡检，支持 AR 并自动生成报告。",
      diagram: "三维巡检漫游",
    },
    {
      icon: Activity,
      title: "仿真与辅助决策",
      value: "通过工艺仿真与调度推演，支持水量调度、加药、风机调控等预测。",
      diagram: "仿真推演",
    },
  ],
  variant: "dark",
}

const pom: ProductData = {
  id: "product-pom",
  eyebrow: "核心产品 · CW-POM · 数字水厂",
  title: "数字水厂，从高效运营到集团化经营决策",
  subtitle:
    "以运营闭环为基础，以经营分析为延伸，以集团管控为目标，支撑水务企业实现单厂高效运营、成本精细管理与集团化决策升级。",
  image: "/products/pom-dashboard.png",
  glow: "oklch(0.7 0.16 160)",
  flow: [
    { icon: Radio, label: "感知" },
    { icon: BarChart3, label: "分析" },
    { icon: ClipboardList, label: "派单" },
    { icon: Smartphone, label: "执行" },
    { icon: RotateCcw, label: "复盘" },
    { icon: Library, label: "标准化" },
  ],
  scenes: [
    {
      icon: Activity,
      title: "运行状态实时感知",
      value: "生产、水质、设备、告警、视频统一监控，快速判断运行状态与风险。",
      diagram: "生产运行驾驶舱",
    },
    {
      icon: Workflow,
      title: "生产过程协同管理",
      value: "工艺、化验、巡检、排班、交接班线上化流程化，减少信息断点。",
      diagram: "生产协同页面",
    },
    {
      icon: Wrench,
      title: "设备全生命周期管理",
      value: "以台账为基础、工单为抓手，贯通设备采购到大修全过程。",
      diagram: "设备全生命周期",
    },
    {
      icon: ShieldCheck,
      title: "安全与合规闭环管控",
      value: "隐患排查、作业审批、应急处置线上流转，闭环追踪与责任落实。",
      diagram: "安全管理闭环",
    },
    {
      icon: LineChart,
      title: "成本能耗精细分析",
      value: "电耗、药耗、污泥、成本统一分析，识别异��、支撑降本增效。",
      diagram: "成本能耗分析",
    },
    {
      icon: Building2,
      title: "集团化经营决策",
      value: "多厂数据汇总、经营驾驶舱与预算碳排分析，支撑集团决策。",
      diagram: "集团经营驾驶舱",
    },
  ],
  variant: "default",
}

export function ProductAgent() {
  return <ProductDetail data={agent} />
}

export function ProductPPI() {
  return <ProductDetail data={ppi} />
}

export function ProductTwin() {
  return <ProductDetail data={twin} />
}

export function ProductPOM() {
  return <ProductDetail data={pom} />
}
