"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, ArrowUpRight } from "lucide-react"

type Milestone = {
  year: string
  title: string
  desc: string
  /** 重点高亮节点：2018 / 2022 / 2026 */
  key: boolean
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中国首批聚焦“中国智慧水务建设”计算研究院联盟团队，开启布局高级数字化服务。",
    key: false,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    key: false,
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，深度融入头部水务集团运营体系，从技术能力真正进入实战水务运营场景。",
    key: true,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。",
    key: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步建立水务 SaaS 产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。",
    key: true,
  },
  {
    year: "2025",
    title: "智水积木云产品化",
    desc: "构建管理、技术、产品体系重构，沉淀并打造智水云平台，并结合大型项目积累形成高水准产品化能力。",
    key: false,
  },
  {
    year: "2026",
    title: "AI 智能运营平台发布",
    desc: "深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    key: true,
  },
]

const keyIndices = milestones.reduce<number[]>((acc, m, i) => {
  if (m.key) acc.push(i)
  return acc
}, [])

export function GrowthTimeline() {
  const [active, setActive] = useState(keyIndices[0])
  const [paused, setPaused] = useState(false)
  const cursorRef = useRef(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      cursorRef.current = (cursorRef.current + 1) % keyIndices.length
      setActive(keyIndices[cursorRef.current])
    }, 3600)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[oklch(0.12_0.03_248)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 背景：网格 + 径向冷光 + 微弱流光 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, oklch(0.5 0.14 235 / 0.16) 0%, transparent 60%)",
        }}
      />

      {/* 标题区 */}
      <div className="relative flex items-start gap-3.5">
        <span
          className="cw-node-breathe mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/[0.08]"
          aria-hidden="true"
        >
          <Activity className="size-5 text-accent" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              水务数字化能力演进轨迹
            </h2>
            <span
              className="hidden h-px w-16 bg-gradient-to-r from-accent/60 to-transparent sm:block"
              aria-hidden="true"
            />
          </div>
          <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
            十年项目实践沉淀，持续形成标准化、产品化、智能化能力。
          </p>
        </div>
      </div>

      {/* ===== 桌面端：横向能量轨迹时间轴 ===== */}
      <div className="relative mt-12 hidden lg:block">
        {/* 主线：多层叠加的流动数据能量轨迹 */}
        <div className="pointer-events-none absolute inset-x-0 top-7 h-px" aria-hidden="true">
          {/* 底层暗线 */}
          <div className="absolute inset-0 bg-accent/15" />
          {/* 上层流动渐变光带 */}
          <div
            className="cw-rail-flow absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.82 0.14 205 / 0.7) 20%, oklch(0.9 0.12 200 / 0.95) 50%, oklch(0.82 0.14 205 / 0.7) 80%, transparent 100%)",
              boxShadow: "0 0 10px 0 oklch(0.78 0.14 205 / 0.5)",
            }}
          />
          {/* 两端能量延展箭头 */}
          <span className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b border-l border-accent/50" />
          <span className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-accent/50" />
        </div>
        {/* 穿梭光点 */}
        <div className="pointer-events-none absolute inset-x-0 top-7 h-px" aria-hidden="true">
          <span
            className="cw-spark-run absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[oklch(0.95_0.1_200)]"
            style={{ boxShadow: "0 0 10px 2px oklch(0.85 0.14 205 / 0.9)", ["--spark-dur" as string]: "7s" }}
          />
          <span
            className="cw-spark-run absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-[oklch(0.9_0.1_205)]"
            style={{ boxShadow: "0 0 8px 1px oklch(0.85 0.14 205 / 0.8)", ["--spark-dur" as string]: "9s", ["--spark-delay" as string]: "2.5s" }}
          />
        </div>

        <ol className="relative grid grid-cols-7 gap-x-4">
          {milestones.map((m, i) => {
            const isActive = i === active
            return (
              <li key={m.year} className="relative flex flex-col items-center">
                {/* 节点行（与主线对齐：top-7 ≈ 1.75rem，这里用 h-14 容纳节点 + 年份） */}
                <div className="relative flex h-14 w-full flex-col items-center justify-start">
                  {/* 年份（线上方） */}
                  <span
                    className={[
                      "font-mono text-sm font-bold tabular-nums transition-colors duration-300",
                      m.key ? "text-accent" : isActive ? "text-foreground/90" : "text-muted-foreground/70",
                    ].join(" ")}
                  >
                    {m.year}
                  </span>

                  {/* 重点节点上方扫描光柱 */}
                  {m.key ? (
                    <span
                      className="cw-beam pointer-events-none absolute -top-3 h-6 w-px"
                      style={{
                        background: "linear-gradient(to top, oklch(0.85 0.14 205 / 0.8), transparent)",
                      }}
                      aria-hidden="true"
                    />
                  ) : null}

                  {/* 节点本体（位于主线 top-7 处） */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group absolute top-7 flex -translate-y-1/2 items-center justify-center outline-none"
                    aria-pressed={isActive}
                    aria-label={`${m.year} ${m.title}`}
                  >
                    {isActive ? (
                      <span
                        className="absolute size-9 rounded-full border border-accent/50"
                        style={{ animation: "ring-pulse 2s ease-in-out infinite" }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={[
                        "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        m.key
                          ? "size-4 border-accent bg-accent/30"
                          : "size-2.5 border-accent/45 bg-[oklch(0.16_0.03_245)]",
                        m.key ? "cw-node-breathe" : "",
                        isActive && m.key ? "scale-125" : "",
                      ].join(" ")}
                    >
                      {m.key ? (
                        <span className="size-1.5 rounded-full bg-[oklch(0.95_0.1_200)]" aria-hidden="true" />
                      ) : null}
                    </span>
                  </button>
                </div>

                {/* 连接竖线：重点节点更亮 + 能量下行流动 */}
                <span
                  className={[
                    "h-7 w-px flex-none transition-opacity duration-300",
                    m.key ? "cw-stem-flow" : "",
                    isActive ? "opacity-100" : "opacity-70",
                  ].join(" ")}
                  style={
                    m.key
                      ? {
                          backgroundImage:
                            "linear-gradient(to bottom, oklch(0.85 0.14 205 / 0.9) 0%, oklch(0.85 0.14 205 / 0.9) 45%, transparent 45%, transparent 100%)",
                          filter: "drop-shadow(0 0 4px oklch(0.8 0.14 205 / 0.7))",
                        }
                      : {
                          background: "linear-gradient(to bottom, oklch(0.7 0.1 215 / 0.4), oklch(0.7 0.1 215 / 0.08))",
                        }
                  }
                  aria-hidden="true"
                />

                {/* 卡片 */}
                <div className="mt-2 w-full">
                  <NodeCard milestone={m} active={isActive} onSelect={() => setActive(i)} />
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ===== 移动端：纵向能量轨迹 ===== */}
      <ol className="relative mt-8 space-y-4 lg:hidden">
        <span
          className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/50 via-accent/30 to-transparent"
          aria-hidden="true"
        />
        {milestones.map((m, i) => {
          const isActive = i === active
          return (
            <li key={m.year} className="relative pl-7">
              <span
                className={[
                  "absolute left-0 top-2 inline-flex items-center justify-center rounded-full border",
                  m.key
                    ? "cw-node-breathe size-4 border-accent bg-accent/30"
                    : "size-3 border-accent/45 bg-[oklch(0.16_0.03_245)]",
                ].join(" ")}
                aria-hidden="true"
              >
                {m.key ? <span className="size-1.5 rounded-full bg-[oklch(0.95_0.1_200)]" /> : null}
              </span>
              <NodeCard milestone={m} active={isActive} onSelect={() => setActive(i)} />
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function NodeCard({
  milestone,
  active,
  onSelect,
}: {
  milestone: Milestone
  active: boolean
  onSelect: () => void
}) {
  const isKey = milestone.key
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "group relative flex w-full flex-col overflow-hidden rounded-xl border px-3.5 py-3 text-left outline-none transition-all duration-300",
        isKey
          ? active
            ? "border-accent/70 bg-[oklch(0.17_0.04_245)]"
            : "border-accent/45 bg-[oklch(0.15_0.035_246)] hover:border-accent/65"
          : active
            ? "border-accent/40 bg-[oklch(0.15_0.03_246)]"
            : "border-border/70 bg-[oklch(0.14_0.025_247)]/60 hover:border-accent/35",
      ].join(" ")}
      style={
        isKey
          ? {
              boxShadow: active
                ? "0 0 24px -4px oklch(0.78 0.14 205 / 0.55), inset 0 0 18px -10px oklch(0.8 0.14 205 / 0.6)"
                : "0 0 16px -6px oklch(0.78 0.14 205 / 0.4)",
            }
          : undefined
      }
    >
      {/* HUD 边角装饰（仅重点卡片） */}
      {isKey ? (
        <>
          <span className="pointer-events-none absolute left-0 top-0 size-3 border-l border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute right-0 top-0 size-3 border-r border-t border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 left-0 size-3 border-b border-l border-accent/60" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-0 right-0 size-3 border-b border-r border-accent/60" aria-hidden="true" />
        </>
      ) : null}

      <div className="flex items-center gap-2">
        <span
          className={[
            "font-mono text-sm font-bold tabular-nums transition-colors duration-300",
            isKey || active ? "text-accent" : "text-muted-foreground",
          ].join(" ")}
        >
          {milestone.year}
        </span>
        {isKey ? (
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[9px] font-medium text-accent">
            里程碑
          </span>
        ) : null}
      </div>
      <span
        className={[
          "mt-1 text-pretty text-[13px] font-semibold leading-snug transition-colors duration-300",
          isKey ? "text-foreground" : "text-foreground/85",
        ].join(" ")}
      >
        {milestone.title}
      </span>
      <span className="mt-1.5 block text-pretty text-[11px] leading-relaxed text-muted-foreground/85">
        {milestone.desc}
      </span>

      {/* 重点卡片底部箭头装饰 */}
      {isKey ? (
        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-accent/80 transition-colors group-hover:text-accent">
          关键里程碑
          <ArrowUpRight className="size-3" />
        </span>
      ) : null}
    </button>
  )
}
