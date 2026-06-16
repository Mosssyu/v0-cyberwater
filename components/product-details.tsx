import {
  Factory,
  Network,
  Gauge,
  Waves,
  CloudRain,
  Database,
  Building2,
  Map as MapIcon,
  Siren,
  BarChart3,
  Box as Cube,
  Boxes,
  Eye,
  Activity,
  Layers,
  Wrench,
  LayoutDashboard,
  Radio,
  SlidersHorizontal,
  ClipboardCheck,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react"

type FlowItem = { icon: LucideIcon; label: string; note: string }
type SceneItem = { icon: LucideIcon; title: string; desc: string; value: string }

type ProductData = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  flowLabel: string
  flow: FlowItem[]
  scenes: SceneItem[]
  variant: "dark" | "default"
}

function ProductDetail({ data }: { data: ProductData }) {
  const isDark = data.variant === "dark"
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
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent backdrop-blur">
            {data.eyebrow}
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {data.subtitle}
          </p>
        </div>

        {/* 流程条 */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {data.flow.map((d, i) => (
            <div key={d.label} className="flex items-center gap-3 sm:gap-4">
              <div className="ring-hairline flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-4 text-center backdrop-blur">
                <d.icon className="size-6 text-accent" />
                <span className="text-sm font-semibold text-foreground">{d.label}</span>
                <span className="text-xs text-muted-foreground">{d.note}</span>
              </div>
              {i < data.flow.length - 1 && (
                <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 场景价值 */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.scenes.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 text-accent">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-accent">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ppi: ProductData = {
  id: "product-ppi",
  eyebrow: "核心产品 · CW-PPI",
  title: "厂网河湖一体化，打通集团多业态运营",
  subtitle:
    "统一管理水厂、泵站、管网、河道、湖库与防汛调度业务，以数据赋能、智能治理，实现集团化多业态一体化运营。",
  flowLabel: "一体化业务对象",
  flow: [
    { icon: Factory, label: "水厂", note: "生产运营" },
    { icon: Network, label: "管网", note: "排水管控" },
    { icon: Gauge, label: "泵站", note: "联动调度" },
    { icon: Waves, label: "河湖", note: "水环境治理" },
    { icon: CloudRain, label: "防汛", note: "应急调度" },
  ],
  scenes: [
    {
      icon: Database,
      title: "统一数据标准",
      desc: "多厂站数据口径统一、统一编码与指标体系，构建集团级数据资产底座，消除信息孤岛。",
      value: "解决多系统割裂、数据口径不一的问题。",
    },
    {
      icon: Building2,
      title: "集团化多业态运营",
      desc: "集团—公司—厂站分级管控，多业态、多层级权限统一运营与穿透式管理。",
      value: "让集团管控真正下穿到一线。",
    },
    {
      icon: MapIcon,
      title: "厂网河湖一张图",
      desc: "基于 GIS 一张图统一呈现厂站、管网、河湖与监测点位的实时运行态势。",
      value: "全域运行态势一屏掌控。",
    },
    {
      icon: CloudRain,
      title: "防汛应急调度",
      desc: "雨水情监测、积水点预警、泵站联动调度、应急预案一键启动。",
      value: "提前研判、快速联动调度。",
    },
    {
      icon: Siren,
      title: "告警与工单中心",
      desc: "多源告警统一汇聚、智能分级、自动派单与处置跟踪闭环。",
      value: "打通报警到处置的全流程闭环。",
    },
    {
      icon: BarChart3,
      title: "集团运营报表",
      desc: "生产、水质、能耗、设备等多维报表自动生成与下钻分析。",
      value: "报表自动化，决策有据可依。",
    },
  ],
  variant: "default",
}

const visual: ProductData = {
  id: "product-visual",
  eyebrow: "核心产品 · CW-Visual",
  title: "数字孪生，让水务全域可感可视",
  subtitle:
    "融合 BIM + GIS 的二三维一体化平台，构建数字孪生水厂与流域级孪生，实现全域可感知与沉浸式可视化运维。",
  flowLabel: "技术栈",
  flow: [
    { icon: Cube, label: "BIM", note: "三维建模" },
    { icon: MapIcon, label: "GIS", note: "空间底图" },
    { icon: Boxes, label: "孪生建模", note: "数字映射" },
    { icon: Eye, label: "可视化", note: "全域呈现" },
    { icon: Activity, label: "仿真推演", note: "辅助决策" },
  ],
  scenes: [
    {
      icon: Layers,
      title: "二三维一体化",
      desc: "融合 BIM + GIS，实现从宏观流域到微观设备的二三维一体化呈现。",
      value: "一套底座覆盖全尺度场景。",
    },
    {
      icon: Factory,
      title: "数字孪生水厂",
      desc: "1:1 还原水厂工艺与设备，实时映射运行状态与工艺流程。",
      value: "让老厂换新颜，资产工艺可视可控。",
    },
    {
      icon: Waves,
      title: "流域级孪生",
      desc: "构建河湖、管网、流域级孪生体，模拟水流与污染扩散过程。",
      value: "全域水环境态势可视化推演。",
    },
    {
      icon: Wrench,
      title: "全要素可视化运维",
      desc: "资产、工艺、运行全要素挂接，三维场景中查看设备与运维信息。",
      value: "运维场景直观，巡检定位高效。",
    },
    {
      icon: Activity,
      title: "仿真与推演",
      desc: "工况模拟、应急推演与方案预演，辅助调度与运营决策。",
      value: "把「事后处置」前置为「事前推演」。",
    },
    {
      icon: LayoutDashboard,
      title: "沉浸式大屏展示",
      desc: "面向集团、政府与参观的沉浸式三维可视化汇报场景。",
      value: "专业、震撼的对外展示能力。",
    },
  ],
  variant: "dark",
}

const pom: ProductData = {
  id: "product-pom",
  eyebrow: "核心产品 · CW-POM",
  title: "数字水厂，构建生产运营全流程闭环",
  subtitle:
    "覆盖生产监控、工艺管理、设备运维、巡检工单与报表分析的全流程闭环，结合 AI 优化打造新一代未来水厂。",
  flowLabel: "运营闭环",
  flow: [
    { icon: Radio, label: "感知", note: "数据接入" },
    { icon: Activity, label: "监控", note: "实时运行" },
    { icon: SlidersHorizontal, label: "工艺", note: "参数优化" },
    { icon: Wrench, label: "运维", note: "设备保障" },
    { icon: BarChart3, label: "报表", note: "分析对标" },
  ],
  scenes: [
    {
      icon: Activity,
      title: "生产实时监控",
      desc: "集成 SCADA 与在线仪表，实时监测生产、水质、能耗与设备运行。",
      value: "生产运行状态一屏总览。",
    },
    {
      icon: SlidersHorizontal,
      title: "工艺参数管理",
      desc: "工艺参数在线分析、加药与能耗优化、工艺调整建议。",
      value: "提升运行稳定性、降低药耗能耗。",
    },
    {
      icon: Wrench,
      title: "设备预测性运维",
      desc: "设备台账、点检保养、故障管理与预测性维护一体化。",
      value: "设备运维从被动响应到主动预测。",
    },
    {
      icon: ClipboardCheck,
      title: "巡检与工单",
      desc: "移动巡检、缺陷上报、工单派发与处置跟踪全流程闭环。",
      value: "巡检工单全流程在线闭环。",
    },
    {
      icon: BarChart3,
      title: "报表与分析",
      desc: "生产、水质、能耗、药耗多维报表自动生成与对标分析。",
      value: "报表自动化，运营有数可依。",
    },
    {
      icon: BrainCircuit,
      title: "AI 工艺优化",
      desc: "结合 AI 模型实现工艺优化与智能巡检，打造未来水厂。",
      value: "用 AI 持续优化运行与成本。",
    },
  ],
  variant: "default",
}

export function ProductPPI() {
  return <ProductDetail data={ppi} />
}

export function ProductVisual() {
  return <ProductDetail data={visual} />
}

export function ProductPOM() {
  return <ProductDetail data={pom} />
}
