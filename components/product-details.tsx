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
  BookOpen,
  ShieldCheck,
  Workflow,
  LineChart,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

type FlowItem = { icon: LucideIcon; label: string; note?: string }
type CapItem = { icon: LucideIcon; label: string; sub?: string; desc: string }
type SceneItem = { icon: LucideIcon; title: string; value: string; diagram: string }
type VersionItem = { name: string; tag: string; desc: string }

type ProductData = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  flow: FlowItem[]
  versions?: VersionItem[]
  caps: CapItem[]
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
          <span
            className={
              isFlagship
                ? "inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent backdrop-blur"
                : "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent backdrop-blur"
            }
          >
            {isFlagship && <Sparkles className="size-3.5" />}
            {data.eyebrow}
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
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

        {/* 核心能力 */}
        <SectionLabel>Capabilities · 核心能力</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.caps.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-2.5">
                <c.icon className="size-5 shrink-0 text-accent" />
                <span className="text-[15px] font-semibold text-foreground">{c.label}</span>
              </div>
              {c.sub && (
                <p className="mt-2.5 text-xs font-medium text-accent">{c.sub}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* 场景价值 */}
        <SectionLabel>Scenarios · 场景价值</SectionLabel>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.scenes.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <s.icon className="size-6 text-primary" />
              <h3 className="mt-5 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.value}</p>
              <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-4 font-mono text-xs text-accent">
                <LayoutDashboard className="size-3.5 shrink-0" />
                {s.diagram}
              </p>
            </div>
          ))}
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
    "融合大模型、RAG 与知识图谱技术，打通感知、认知、决策�����执行与进化全链路，持续优化水厂运行效率与决策质量。",
  flow: [
    { icon: Dna, label: "水务基因", note: "运营场��内生" },
    { icon: Server, label: "自研底座", note: "工业级智能体" },
    { icon: BrainCircuit, label: "专业认知", note: "水务知识引擎" },
    { icon: Building2, label: "集团运营", note: "多层级多业态" },
    { icon: TrendingUp, label: "个性化适配", note: "持续进化" },
  ],
  caps: [
    {
      icon: Dna,
      label: "运营场景内生产品基因",
      sub: "不是拿 AI 找场景",
      desc: "产品源于真实水务运营场景和一线管理需求，不是通用 AI 能力的简单套壳，而是在长期运营实践中沉淀业务流程、岗位经验、处置规则和管理方法，再以智能体方式进行重构和放大。",
    },
    {
      icon: Server,
      label: "工业级智能体底座",
      sub: "灵活、稳定、可集成",
      desc: "基于 Spring AI 深度定制智能体编排框架，兼容主流大模型、行业小模型、算法工具和业务系统，支持多工具调用、任务编排、权限控制和稳定运行，满足水务生产运营对可靠性、扩展性和可集成性的要求。",
    },
    {
      icon: BrainCircuit,
      label: "水务专业认知引擎",
      sub: "理解对象、工艺、设备与规则",
      desc: "沉淀行业标准、运行规程、工艺机理、设备知识、故障案例、应急预案和专家经验，构建向量知识库与水务知识图谱，使智能体不仅能回答问题，更能理解水务对象、工艺逻辑、设备关系和处置规则。",
    },
    {
      icon: Building2,
      label: "集团化协同运营能力",
      sub: "多层级、多业态、可复用",
      desc: "支持集团—区域—厂站多层级运营管理，满足权限分级、数据隔离、跨厂协同、集中监管和横向对标需求，帮助集团沉淀统一管理标准，并在不同厂站之间实现经验复用、能力复制和运营协同。",
    },
    {
      icon: Sparkles,
      label: "企业专属知识与模型进化",
      sub: "持续进化与适配",
      desc: "结合企业运行数据、工单处置结果、人工确认反馈和专家经验，持续优化知识库、案例库、规则库和模型工具，形成企业专属的水务运营知识资产与智能决策能力，使系统不断适配自身工况与处置习惯。",
    },
  ],
  scenes: [
    {
      icon: Activity,
      title: "实时态势感知",
      value:
        "帮助厂长和值班班组快速了解当前水厂是否正常、哪里存在风险、哪些事项需要优先关注，实现从「人工盯屏、人工判断」到「系统主动识别风险、给出当班结论」的升级。",
      diagram: "态势驾驶舱 · 风险识别 · 告警摘要",
    },
    {
      icon: SlidersHorizontal,
      title: "工艺调控助手",
      value:
        "降低工艺调控门槛，把专家经验、工艺模型和运行数据转化为一线人员可理解、可执行的调控建议，帮助水厂提升出水稳定性，降低能耗、药耗和对少数专家经验的依赖。",
      diagram: "工艺参数 · 调控建议 · 趋势预测",
    },
    {
      icon: Wrench,
      title: "设备运维助手",
      value:
        "帮助设备运维人员更快定位故障原因、明确检查路径和处置方法，减少盲目排查和经验依赖，提升维修响应效率。",
      diagram: "设备画像 · 故障诊断 · 维修建议",
    },
    {
      icon: Siren,
      title: "异常处置助手",
      value:
        "把报警提示升级为「诊断—派单—处置—复盘」的闭环管理能力，帮助值班与管理人员快速判断事件性质、明确处置步骤、协同相关岗位，提升异常响应速度、处置规范性和过程可追溯性。",
      diagram: "异常事件流转 · 派单 · 处置闭环",
    },
    {
      icon: MessageSquareText,
      title: "智能问答与洞察",
      value:
        "把「查系统、翻文档、问专家、写报告」升级为「自然语言提问即可获得答案、分析和成稿」，帮助厂长、工艺与运营管理人员快速获取知识、理解数据、形成判断并完成汇报，显著降低信息检索、数据分析和报告编制成本。",
      diagram: "AI 问答 · 数据分析 · 报告生成",
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
  flow: [
    { icon: Boxes, label: "统一对象" },
    { icon: MapIcon, label: "空间融合" },
    { icon: Database, label: "数据贯通" },
    { icon: Share2, label: "业务协同" },
    { icon: Network, label: "联动调度" },
    { icon: Building2, label: "集团监管" },
  ],
  caps: [
    {
      icon: Boxes,
      label: "多业态对象统一管理",
      desc: "统一管理水厂、泵站、管网、河湖、排口、雨量站、重点部位、闸站等多类水务对象，建立组织、业态、对象、设备、测点和业务流程之间的统一关系。",
    },
    {
      icon: MapIcon,
      label: "一张图空间运营",
      desc: "基于地图能力融合厂站、管网、河湖、排口、雨量、积水点、人员、车辆和视频资源，实现对象可查、位置可见、状态可感、事件可追踪。",
    },
    {
      icon: Radio,
      label: "感知数据统一接入",
      desc: "打通 IoT 设备、在线仪表、视频监控、告警事件、工单任务和业务系统数据，形成跨业态、跨系统的数据汇聚与关联分析能力。",
    },
    {
      icon: Share2,
      label: "厂网河湖业务协同",
      desc: "围绕水量、水质、液位、流量、降雨、排口、管网运行和泵站调度等关键场景，建立多对象之间的业务关联，支撑厂网联动、排水防汛、河湖治理和调度协同。",
    },
    {
      icon: Network,
      label: "联动调度与应急处置",
      desc: "结合降雨、液位、泵站运行、管网负荷、排口状态和重点部位风险，辅助形成调度建议、预警研判、任务派发和处置闭环。",
    },
    {
      icon: Building2,
      label: "集团化监管与横向对标",
      desc: "面向集团、区域、厂站多层级管理，支持数据汇总、权限分级、指标对标、运营监管和跨厂协同，帮助集团建立统一的运营标准和监管体系。",
    },
  ],
  scenes: [
    {
      icon: LayoutDashboard,
      title: "多业态统一运营",
      value:
        "将水厂、泵站、管网、河湖、排口、雨量站和重点部位纳入统一平台，减少多系统割裂和数据分散，让管理者在一个平台中掌握全域运行状态。",
      diagram: "一张图运营总览",
    },
    {
      icon: Network,
      title: "厂网联动分析",
      value:
        "通过水厂运行、管网压力、流量、泵站状态和区域用水数据的关联分析，帮助管理者判断供排水系统运行是否协调，支撑调度优化和风险预判。",
      diagram: "厂网联动分析页面",
    },
    {
      icon: CloudRain,
      title: "排水防汛联动",
      value:
        "融合降雨、液位、泵站、管网、易涝点、排口和人员车辆信息，帮助防汛管理人员快速判断积水风险、泵站负荷和处置优先级。",
      diagram: "防汛调度地图",
    },
    {
      icon: Waves,
      title: "河湖排口监管",
      value:
        "将河湖水质、排口状态、周边泵站、管网和巡检任务进行关联，辅助发现异常排放、液位异常和水环境风险。",
      diagram: "河湖排口监管页面",
    },
    {
      icon: ClipboardCheck,
      title: "统一巡检与工单协同",
      value:
        "将厂内、泵站、管网、河湖和重点部位巡检任务统一纳入平台，现场问题可直接形成工单并联动设备、位置、视频和处置记录。",
      diagram: "巡检工单闭环页面",
    },
    {
      icon: Building2,
      title: "集团级运营监管",
      value:
        "帮助集团从单个厂站管理升级为跨区域、跨业态的统一监管，实现多厂对标、风险汇总、运营分析和管理标准复制。",
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
  flow: [
    { icon: Cube, label: "建模" },
    { icon: Layers, label: "融合" },
    { icon: MapPin, label: "定位" },
    { icon: Link2, label: "联动" },
    { icon: Activity, label: "推演" },
  ],
  caps: [
    {
      icon: Cube,
      label: "建模",
      desc: "厂区、构筑物、设备、管线 1:1 三维还原，构建可量算、可拆解、可漫游的数字孪生底座。",
    },
    {
      icon: Layers,
      label: "融合",
      desc: "运行数据、视频、台账、告警、工单数据统一接入，实现三维空间与运行状态的实时映射。",
    },
    {
      icon: MapPin,
      label: "定位",
      desc: "设备、管线、人员、告警、摄像头在三维空间中精准定位，所见即所得。",
    },
    {
      icon: Link2,
      label: "联动",
      desc: "告警联动视频、设备联动台账、回路联动图纸，构建空间与业务之间的双向联动关系。",
    },
    {
      icon: Activity,
      label: "推演",
      desc: "支持原理展现、应急模拟、巡检漫游和工艺仿真，把三维场景从「看得见」延伸到「可推演」。",
    },
  ],
  scenes: [
    {
      icon: Boxes,
      title: "设备、管线、回路可视化管理",
      value:
        "让设备、管线、回路、楼层结构和隐蔽设施在三维空间中可查、可定位、可追溯，降低查找设备、理解管线关系和排查问题的难度。",
      diagram: "三维厂区和设备定位页面",
    },
    {
      icon: Siren,
      title: "告警与安全联动处置",
      value:
        "将水质、设备、安防、电子围栏等告警与三维空间位置、视频监控和人员轨迹联动，帮助管理者快速判断风险位置和影响范围。",
      diagram: "三维告警联动页面",
    },
    {
      icon: GraduationCap,
      title: "工艺展示与培训讲解",
      value:
        "通过数字窗口和工艺原理动画，把水厂建设历程、供水范围、原水来源、工艺流程和设备运行原理可视化，适合领导参观、成果展示和员工培训。",
      diagram: "工艺流程展示页面",
    },
    {
      icon: Route,
      title: "厂区巡检线上化",
      value:
        "将传统现场巡检转化为三维漫游和自动巡检，支持 AR 功能，可快速进入构筑物、查看设备信息、调用视频画面，并自动生成巡检报告。",
      diagram: "三维巡检漫游页面",
    },
    {
      icon: Activity,
      title: "仿真与辅助决策",
      value:
        "通过工艺模拟、在线仿真和调度策略分析，支持水量调度、加药变化、风机调控等场景的预测与推演。",
      diagram: "仿真推演页面",
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
  flow: [
    { icon: Radio, label: "感知" },
    { icon: BarChart3, label: "分析" },
    { icon: ClipboardList, label: "派单" },
    { icon: Smartphone, label: "执行" },
    { icon: RotateCcw, label: "复盘" },
    { icon: Library, label: "标准化" },
  ],
  versions: [
    {
      name: "标准版",
      tag: "运营数字化",
      desc: "适合先完成水厂基础运营数字化建设，重点打通生产、设备、安全、巡检、工单和移动执行闭环。",
    },
    {
      name: "Plus 版",
      tag: "经营分析",
      desc: "在标准版基础上，进一步面向碳排放、成本、能耗、药耗、污泥和预算管理，支持水厂从运营管理走向经营分析。",
    },
  ],
  caps: [
    {
      icon: Radio,
      label: "感知",
      desc: "实时数据、分级告警、视频监控、语音助手，构建覆盖生产运行的实时感知体系。",
    },
    {
      icon: BarChart3,
      label: "分析",
      desc: "多厂 KPI、单厂组态、生产驾驶舱、经营驾驶舱，支撑从运行到经营的多维分析。",
    },
    {
      icon: ClipboardList,
      label: "派单",
      desc: "巡检、维修、维保、工艺、安全等任务统一派发，明确责任与处置路径。",
    },
    {
      icon: Smartphone,
      label: "执行",
      desc: "移动端接收任务、NFC/RFID 打卡、现场反馈，支持离线场景下持续作业。",
    },
    {
      icon: RotateCcw,
      label: "复盘",
      desc: "设备评价、工单考核、工作轨迹分析，让每一次执行可追溯、可评估。",
    },
    {
      icon: Library,
      label: "标准化",
      desc: "指标标准、报表标准、流程标准与知识库沉淀，形成可复用的水厂运营标准。",
    },
  ],
  scenes: [
    {
      icon: Activity,
      title: "运行状态实时感知",
      value:
        "将水厂生产运行、水质变化、设备状态、告警事件和现场视频统一纳入实时监控体系，帮助管理者快速判断当前运行是否正常、哪里存在风险、哪些事项需要优先关注。",
      diagram: "生产运行驾驶舱",
    },
    {
      icon: Workflow,
      title: "生产过程协同管理",
      value:
        "围绕日常生产运行，将工艺调整、化验检测、巡检任务、班组排班和交接班等关键环节线上化、流程化、可追溯，提升岗位之间的协同效率，减少信息断点和人工交接遗漏。",
      diagram: "生产协同页面",
    },
    {
      icon: Wrench,
      title: "设备全生命周期管理",
      value:
        "以设备台账为基础、工单为抓手，贯通设备采购、入库、盘点、维保、维修、校准和大修重置全过程，帮助水厂掌握设备状态、维护记录和运行表现。",
      diagram: "设备全生命周期页面",
    },
    {
      icon: ShieldCheck,
      title: "安全与合规闭环管控",
      value:
        "将安全隐患排查、特殊作业审批、应急预案和事件处置流程统一纳入系统管理，推动安全管理从线下记录、分散处置转向线上流转、闭环追踪和责任落实。",
      diagram: "安全管理闭环页面",
    },
    {
      icon: BookOpen,
      title: "标准与知识沉淀",
      value:
        "将运营中的流程、指标、报表、知识和经验沉淀为可复用的管理标准，减少对个人经验的依赖，支撑多岗位、多班组、多水厂之间的标准化执行和��续优化。",
      diagram: "标准知识库页面",
    },
    {
      icon: Smartphone,
      title: "移动端现场执行",
      value:
        "将巡检、维修、维保、异常上报和任务通知延伸到移动端，现场人员可实时接收任务、扫码/NFC/RFID 打卡、反馈处理结果，并支持离线作业，实现任务从派发到执行再到复盘的完整闭环。",
      diagram: "移动端任务执行页面",
    },
    {
      icon: LineChart,
      title: "成本能耗精细分析",
      value:
        "面向水厂经营管理，将电耗、药耗、污泥、物资和生产成本等关键经营数据统一汇聚分析，帮助管理者识别成本波动、能耗异常和资源消耗结构，支撑降本增效和精细化经营。",
      diagram: "成本能耗分析页面",
    },
    {
      icon: Building2,
      title: "集团化经营决策",
      value:
        "面向集团多厂管理场景，支持多厂数据汇总、经营驾驶舱、预算管理、碳排管理和多维报表分析，帮助集团从单厂运营监管升级为跨厂对标、经营分析和决策支持。",
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
