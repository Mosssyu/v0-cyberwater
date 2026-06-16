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
} from "lucide-react"

const dna = [
  { icon: Dna, label: "水务基因", note: "运营场景内生" },
  { icon: Server, label: "自研底座", note: "工业级智能体" },
  { icon: BrainCircuit, label: "专业认知", note: "水务知识引擎" },
  { icon: Building2, label: "集团运营", note: "多层级多业态" },
  { icon: TrendingUp, label: "个性化适配", note: "持续进化" },
]

const scenes = [
  {
    icon: Activity,
    title: "实时态势感知",
    desc: "综合生产、设备、水质、能耗、视频等多模态数据，自动识别异常趋势与重点告警，输出运行健康结论与交接班关注事项。",
    value: "从「人工盯屏」升级为「系统主动识别风险、给出当班结论」。",
  },
  {
    icon: SlidersHorizontal,
    title: "工艺调控助手",
    desc: "用户口语化描述工况，智能体多轮思考并调用模型算法、知识库与知识图谱，输出参数建议并给出原理解释。",
    value: "降低工艺调控门槛，把专家经验转化为一线可执行的建议。",
  },
  {
    icon: Wrench,
    title: "设备运维助手",
    desc: "结合大模型、知识图谱与知识库实现诊断归因，检索相似故障案例与维修经验，输出针对性检查与处置建议。",
    value: "更快定位故障原因，减少盲目排查，提升维修响应效率。",
  },
  {
    icon: Siren,
    title: "异常处置助手",
    desc: "对安全与运行异常事件分析推理，给出处置建议并直接转派工单，安全边界下联动 SCADA，自动沉淀为案例库。",
    value: "把「报警提示」升级为「诊断—派单—处置—复盘」闭环。",
  },
  {
    icon: MessageSquareText,
    title: "智能问答与洞察",
    desc: "打通实时、历史、业务数据与制度规范、应急预案、知识库，自然语言提问即得答案，并自动生成报表与复盘报告。",
    value: "把「查系统、翻文档、问专家、写报告」升级为提问即成稿。",
  },
]

export function AiAgents() {
  return (
    <section id="product-agent" className="relative overflow-hidden border-y border-border bg-[oklch(0.13_0.012_252)] py-24">
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent backdrop-blur">
            核心产品 · CW-Agent
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            水务智能体，让 AI 深入运营每一环节
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            源于真实水务运营场景，沉淀业务流程、岗位经验与处置规则，再以智能体方式进行重构与放大。
          </p>
        </div>

        {/* 产品基因 */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {dna.map((d, i) => (
            <div key={d.label} className="flex items-center gap-3 sm:gap-4">
              <div className="ring-hairline flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 px-5 py-4 text-center backdrop-blur">
                <d.icon className="size-6 text-accent" />
                <span className="text-sm font-semibold text-foreground">{d.label}</span>
                <span className="text-xs text-muted-foreground">{d.note}</span>
              </div>
              {i < dna.length - 1 && (
                <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 场景价值 */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scenes.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-primary/25 text-accent">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
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
