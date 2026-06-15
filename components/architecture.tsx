import {
  Droplet,
  Crosshair,
  Cog,
  Joystick,
  CloudRain,
  CalendarClock,
  CircleDollarSign,
  Share2,
  Radar,
  SlidersHorizontal,
  Wrench,
  Siren,
  BarChart3,
  BookOpen,
  Users,
  Wifi,
  Workflow,
  Network,
  Database,
  BrainCircuit,
  Server,
  Boxes,
  Cpu,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

type Tone = "primary" | "ai" | "capability" | "data"

const toneStyles: Record<
  Tone,
  { badge: string; accent: string; chipHover: string; ring: string }
> = {
  primary: {
    badge: "bg-primary/10 text-primary",
    accent: "text-primary",
    chipHover: "hover:border-primary/40 hover:bg-primary/5",
    ring: "border-primary/20",
  },
  ai: {
    badge: "bg-emerald-500/15 text-emerald-400",
    accent: "text-emerald-400",
    chipHover: "hover:border-emerald-500/40 hover:bg-emerald-500/5",
    ring: "border-emerald-500/20",
  },
  capability: {
    badge: "bg-orange-500/15 text-orange-400",
    accent: "text-orange-400",
    chipHover: "hover:border-orange-500/40 hover:bg-orange-500/5",
    ring: "border-orange-500/20",
  },
  data: {
    badge: "bg-primary/10 text-primary",
    accent: "text-primary",
    chipHover: "hover:border-primary/40 hover:bg-primary/5",
    ring: "border-primary/20",
  },
}

type Item = { icon: LucideIcon; title: string; sub?: string }

type Layer = {
  no: string
  title: string
  note: string
  desc: string
  tone: Tone
  items: Item[]
  aside: string[]
}

const layers: Layer[] = [
  {
    no: "1",
    title: "业务应用层",
    note: "单业态可独立 · 多业态可组合",
    desc: "支持单业态独立运行与多业态组合协同，满足不同组织、区域、场景的业务需求",
    tone: "primary",
    items: [
      { icon: Droplet, title: "水厂管理", sub: "工艺 / 生产" },
      { icon: Crosshair, title: "管网管理", sub: "资产 / 诊断" },
      { icon: Cog, title: "泵站管理", sub: "运行 / 安全" },
      { icon: Joystick, title: "河湖管理", sub: "生态 / 洪涝" },
    ],
    aside: ["业务入口", "独立使用", "组合协同", "统一门户"],
  },
  {
    no: "1.5",
    title: "跨场景使用层",
    note: "跨业态组合运营",
    desc: "面向多业态协同与组合运营，支撑跨场景综合管理与决策",
    tone: "primary",
    items: [
      { icon: CloudRain, title: "防汛管理", sub: "预报 / 预警" },
      { icon: CalendarClock, title: "调度管理", sub: "调度 / 指挥" },
      { icon: CircleDollarSign, title: "经营预算", sub: "预算 / 成本" },
      { icon: Share2, title: "厂网联动", sub: "联动 / 协同" },
    ],
    aside: ["超级入口", "AI 赋能", "智能决策", "持续进化"],
  },
]

const aiAssistants = [
  {
    icon: Radar,
    title: "态势感知助手",
    sub: "全域感知 / 风险洞察",
    points: ["运行态势监测", "风险识别预警", "负荷冲击分析", "事件异常感知"],
  },
  {
    icon: SlidersHorizontal,
    title: "调控决策助手",
    sub: "协同调度 / 优化运行",
    points: ["工艺优化建议", "进水均衡调控", "泵站联调联控", "调度方案生成"],
  },
  {
    icon: Wrench,
    title: "运维助手",
    sub: "设备运维 / 故障诊断",
    points: ["巡检计划生成", "缺陷识别诊断", "故障根因定位", "维保建议推荐"],
  },
  {
    icon: Siren,
    title: "应急处置助手",
    sub: "应急联动 / 快速处置",
    points: ["防汛协同处置", "泵站应急指挥", "污染事件处置", "应急资源调度"],
  },
  {
    icon: BarChart3,
    title: "运营分析助手",
    sub: "经营分析 / 洞察决策",
    points: ["知识问答服务", "报表报告生成", "趋势预测分析", "决策建议输出"],
  },
  {
    icon: BookOpen,
    title: "知识沉淀助手",
    sub: "沉淀学习 / 持续进化",
    points: ["知识库构建", "经验沉淀管理", "模型持续训练", "智能推送推荐"],
  },
]

const capabilityCenters = [
  {
    icon: Users,
    title: "组织运营中心",
    points: ["组织 / 权限", "班组管理", "排班值班", "人员绩效", "单点登录"],
  },
  {
    icon: Wifi,
    title: "感知空间中心",
    points: ["IoT 接入", "实时数据", "GIS 空间", "视频监控", "空间定位"],
  },
  {
    icon: Workflow,
    title: "业务闭环中心",
    points: ["工单管理", "巡检管理", "维修维保", "资产管理", "流程引擎"],
  },
  {
    icon: Network,
    title: "联动调度中心",
    points: ["事件联动", "指令下发", "应急预案", "联合调度", "防汛指挥"],
  },
  {
    icon: Database,
    title: "数据智能中心",
    points: ["数据治理", "数据建模", "指标体系", "BI 报表", "数据资产"],
  },
  {
    icon: BrainCircuit,
    title: "AI 知识中心",
    points: ["知识管理", "知识库", "向量库", "知识图谱", "AI 智能体"],
  },
]

const bottomLayers: Layer[] = [
  {
    no: "4",
    title: "数据底座层",
    note: "统一存储 · 治理 · 服务",
    desc: "沉淀原始数据，支撑上层数据分析与 AI 应用",
    tone: "data",
    items: [
      { icon: Database, title: "主数据" },
      { icon: Database, title: "时序数据" },
      { icon: Database, title: "空间数据" },
      { icon: Database, title: "业务数据" },
      { icon: Database, title: "文档数据" },
      { icon: Database, title: "视频数据" },
    ],
    aside: ["数据沉淀", "统一治理", "数据服务"],
  },
  {
    no: "5",
    title: "生态集成层",
    note: "合作能力 · 标准接口适配",
    desc: "适配各类外部系统与设备，统一接入",
    tone: "primary",
    items: [
      { icon: Boxes, title: "专业 GIS" },
      { icon: Cog, title: "SCADA 控制" },
      { icon: Cpu, title: "算法模型" },
      { icon: Radar, title: "视频 AI 平台" },
      { icon: CloudRain, title: "气象水文" },
      { icon: CircleDollarSign, title: "财务/ERP/OA" },
    ],
    aside: ["生态接入", "系统适配", "统一接入"],
  },
  {
    no: "6",
    title: "基础设施层",
    note: "云 · 网 · 端 · 安全",
    desc: "提供稳定、安全、可扩展的基础支撑",
    tone: "primary",
    items: [
      { icon: Server, title: "云平台 / 容器" },
      { icon: Network, title: "网络" },
      { icon: ShieldCheck, title: "安全" },
      { icon: Boxes, title: "中间件" },
      { icon: Cpu, title: "边缘计算" },
    ],
    aside: ["基础支撑", "稳定可靠", "弹性扩展"],
  },
]

const closedLoop = [
  { icon: BarChart3, title: "感知", sub: "实时数据" },
  { icon: Siren, title: "预警", sub: "风险预警" },
  { icon: Radar, title: "分析", sub: "事件洞察" },
  { icon: SlidersHorizontal, title: "决策", sub: "工单 / 调度" },
  { icon: Wrench, title: "执行", sub: "联动处置" },
  { icon: BarChart3, title: "评估", sub: "效果反馈" },
  { icon: BookOpen, title: "沉淀", sub: "知识沉淀" },
  { icon: BrainCircuit, title: "优化", sub: "模型进化" },
]

function LayerCard({ layer }: { layer: Layer }) {
  const t = toneStyles[layer.tone]
  return (
    <div
      className={`rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30 lg:flex lg:items-stretch lg:gap-6 ${t.ring}`}
    >
      <div className="mb-4 flex shrink-0 items-start gap-3 lg:mb-0 lg:w-48 lg:flex-col lg:gap-2">
        <span
          className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${t.badge}`}
        >
          {layer.no}
        </span>
        <div>
          <h4 className="text-base font-bold text-foreground">{layer.title}</h4>
          <p className="text-xs text-muted-foreground">{layer.note}</p>
        </div>
      </div>

      <div className="flex-1">
        <p className={`mb-3 text-xs font-medium ${t.accent}`}>{layer.desc}</p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {layer.items.map((item) => (
            <div
              key={item.title}
              className={`flex flex-col items-start gap-1 rounded-xl border border-border bg-muted/40 px-3 py-2.5 transition-colors ${t.chipHover}`}
            >
              <item.icon className={`size-4 ${t.accent}`} />
              <span className="text-sm font-medium text-foreground">
                {item.title}
              </span>
              {item.sub ? (
                <span className="text-[11px] text-muted-foreground">
                  {item.sub}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 hidden shrink-0 flex-col justify-center gap-1.5 border-t border-border pt-3 lg:mt-0 lg:flex lg:w-28 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
        {layer.aside.map((a) => (
          <span key={a} className={`text-xs ${t.accent}`}>
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Architecture() {
  return (
    <section id="capabilities" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Architecture
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            厂网河湖 AI 一体化平台
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            六大能力中心为核心，支撑多业态组合运营与 AI 智能决策。
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {/* 业务应用层 + 跨场景使用层 */}
          {layers.map((layer) => (
            <LayerCard key={layer.title} layer={layer} />
          ))}

          {/* AI 智能体层 */}
          <div className="rounded-2xl border border-emerald-500/20 bg-card p-5 lg:flex lg:gap-6">
            <div className="mb-4 flex shrink-0 items-start gap-3 lg:mb-0 lg:w-48 lg:flex-col lg:gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400">
                2
              </span>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  AI 智能体层
                </h4>
                <p className="text-xs text-muted-foreground">超级入口</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white">
                  感知
                  <ArrowRight className="size-3.5" />
                  处置
                  <ArrowRight className="size-3.5" />
                  沉淀优化
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  AI 能力统一入口，赋能业务与场景，驱动智能决策
                </span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {aiAssistants.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-xl border border-border bg-muted/40 p-3.5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5"
                  >
                    <div className="flex items-center gap-2">
                      <a.icon className="size-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-foreground">
                        {a.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {a.sub}
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
                      {a.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-1 text-[11px] text-foreground/80"
                        >
                          <span className="size-1 shrink-0 rounded-full bg-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs font-medium text-emerald-400">
                基于数据 + 知识 + 模型，提供智能问答、分析、预测、决策能力
              </p>
            </div>

            <div className="mt-4 hidden shrink-0 flex-col justify-center gap-1.5 border-t border-border pt-3 lg:mt-0 lg:flex lg:w-28 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              {["超级入口", "AI 赋能", "智能决策", "持续进化"].map((a) => (
                <span key={a} className="text-xs text-emerald-400">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* 平台能力中心 */}
          <div className="rounded-2xl border border-orange-500/20 bg-card p-5 lg:flex lg:gap-6">
            <div className="mb-4 flex shrink-0 items-start gap-3 lg:mb-0 lg:w-48 lg:flex-col lg:gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-400">
                3
              </span>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  平台能力中心
                </h4>
                <p className="text-xs text-muted-foreground">原子能力</p>
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-3 text-xs font-medium text-orange-400">
                可复用、可组合的核心能力中心，为上层场景与 AI 智能体提供统一能力支撑
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {capabilityCenters.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border bg-muted/40 p-3 transition-colors hover:border-orange-500/40 hover:bg-orange-500/5"
                  >
                    <div className="flex items-center gap-1.5">
                      <c.icon className="size-4 text-orange-400" />
                      <span className="text-[13px] font-semibold text-foreground">
                        {c.title}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-1 text-[11px] text-foreground/80"
                        >
                          <span className="size-1 shrink-0 rounded-full bg-orange-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs font-medium text-orange-400">
                为上层场景与 AI 能力提供统一、标准、可复用的能力支撑
              </p>
            </div>

            <div className="mt-4 hidden shrink-0 flex-col justify-center gap-1.5 border-t border-border pt-3 lg:mt-0 lg:flex lg:w-28 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              {["能力支撑", "平台核心", "服务化能力"].map((a) => (
                <span key={a} className="text-xs text-orange-400">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* 数据底座 / 生态集成 / 基础设施 */}
          {bottomLayers.map((layer) => (
            <LayerCard key={layer.title} layer={layer} />
          ))}

          {/* 运营闭环层 */}
          <div className="rounded-2xl border border-primary/20 bg-card p-5 lg:flex lg:gap-6">
            <div className="mb-4 flex shrink-0 items-start gap-3 lg:mb-0 lg:w-48 lg:flex-col lg:gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                7
              </span>
              <div>
                <h4 className="text-base font-bold text-foreground">
                  运营闭环层
                </h4>
                <p className="text-xs text-muted-foreground">全流程闭环驱动</p>
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-3 text-xs font-medium text-primary">
                实现运营全流程闭环驱动，持续优化业务与决策
              </p>
              <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
                {closedLoop.map((step, i) => (
                  <div key={step.title} className="flex items-center gap-1">
                    <div className="flex w-16 flex-col items-center gap-1 text-center">
                      <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="size-4" />
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        {step.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {step.sub}
                      </span>
                    </div>
                    {i < closedLoop.length - 1 ? (
                      <ArrowRight className="size-4 shrink-0 text-primary/40" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 hidden shrink-0 flex-col justify-center gap-1.5 border-t border-border pt-3 lg:mt-0 lg:flex lg:w-28 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              {["闭环驱动", "持续优化", "价值提升"].map((a) => (
                <span key={a} className="text-xs text-primary">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 底部标语 */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-5 text-center text-primary-foreground sm:flex-row sm:gap-8">
          <span className="text-base font-bold tracking-wide">
            统一标准 · 开放兼容 · 智能驱动 · 持续进化
          </span>
          <span className="hidden h-5 w-px bg-primary-foreground/30 sm:block" />
          <span className="flex items-center gap-2 text-sm">
            <ShieldCheck className="size-4" />
            安全合规保障贯穿全链路
          </span>
        </div>
      </div>
    </section>
  )
}
