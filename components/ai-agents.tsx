import {
  MessageSquareText,
  FileBarChart,
  AlertTriangle,
  ShieldCheck,
  Workflow,
  CloudRain,
  Sparkles,
} from "lucide-react"

const agents = [
  { icon: MessageSquareText, title: "AI 知识问数", desc: "自然语言查询运营数据与指标。" },
  { icon: FileBarChart, title: "AI 报表报告", desc: "自动生成运营分析报表与汇报材料。" },
  { icon: AlertTriangle, title: "AI 告警风险分析", desc: "智能研判告警根因与风险等级。" },
  { icon: ShieldCheck, title: "AI 巡检安全助手", desc: "辅助巡检识别隐患与作业规范。" },
  { icon: Workflow, title: "AI 调度决策辅助", desc: "面向调度场景生成决策建议。" },
  { icon: CloudRain, title: "AI 防汛预警分析", desc: "结合雨水情研判防汛风险态势。" },
  { icon: Sparkles, title: "AI 工艺优化建议", desc: "基于运行数据给出工艺优化方案。" },
]

export function AiAgents() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.21_0.06_256)] py-24 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, oklch(0.7 0.13 215) 0, transparent 40%), radial-gradient(circle at 90% 80%, oklch(0.52 0.18 252) 0, transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-cyan-300">AI 智能体能力</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            让 AI 智能体深入水务运营每一环节
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-blue-100/75">
            围绕问数、报表、告警、巡检、调度、防汛与工艺，构建可落地的 AI 智能体能力体系。
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <div
              key={agent.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-primary/30 text-cyan-200">
                <agent.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{agent.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/70">
                {agent.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
