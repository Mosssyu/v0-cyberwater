"use client"

import { useEffect, useRef, useState } from "react"

type Milestone = {
  year: string
  title: string
  desc: string
  /** 关键节点：2018 / 2022 / 2026（置于轴线下方重点强调） */
  key: boolean
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中信国安 + 中国建筑标准设计研究院相关团队创立云建标，开始布局城市数字化服务。",
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
    desc: "北控水务战略入股，云建标深入头部水务集团运营体系，从技术能力真正进入真实水务运营场景。",
    key: true,
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委筹委委员单位，进一步参与智慧水务行业实践与交流，沉淀管理标准与业务流程。",
    key: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步掌握水务全业务核心产品能力，从集团内部场景沉淀走向行业市场，开始规模化服务行业客户。",
    key: true,
  },
  {
    year: "2024 - 2025",
    title: "智水积木云产品化",
    desc: "推进管理、技术、产品体系重构，沉淀 CW-Cloud 新一代水务运营平台，并结合大模型前瞻布局水务智能体（CW-Agent）产品化。",
    key: false,
  },
  {
    year: "2026",
    title: "新一代 AI 智能运营平台发布",
    desc: "全面发布新一代 AI 智能运营平台，深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
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
    <div
      className="relative mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ===== 大屏：上下分布时间轴 ===== */}
      <div className="relative hidden lg:block">
        {/* 中轴基线（从左到右生长） */}
        <div
          className="tl-line-grow pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          aria-hidden="true"
        />

        <ol className="relative flex items-stretch">
          {milestones.map((m, i) => {
            const isActive = i === active
            return (
              <li key={m.year} className="relative flex h-72 flex-1 flex-col items-center">
                {/* 上方区：非关键年份卡片 */}
                <div className="flex flex-1 flex-col items-center justify-end pb-3">
                  {!m.key ? (
                    <div
                      className="tl-item-up flex flex-col items-center"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <NodeCard milestone={m} active={isActive} onSelect={() => setActive(i)} placement="up" />
                      {/* 连接茎（卡片 → 轴线） */}
                      <span
                        className="mt-2 w-px flex-none bg-gradient-to-b from-accent/50 to-accent/20"
                        style={{ height: "1.5rem" }}
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}
                </div>

                {/* 轴线上的节点 */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative z-10 flex h-0 items-center justify-center outline-none"
                  aria-pressed={isActive}
                  aria-label={`${m.year} ${m.title}`}
                >
                  {isActive ? (
                    <span
                      className="absolute size-10 rounded-full border border-accent/50"
                      style={{ animation: "ring-pulse 2s ease-in-out infinite" }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={[
                      "relative inline-flex shrink-0 items-center justify-center rounded-full border font-bold transition-all duration-500",
                      m.key ? "size-7 text-xs" : "size-4 text-[0px]",
                      isActive
                        ? "scale-125 border-accent bg-accent text-background shadow-[0_0_20px_3px_oklch(0.79_0.13_200/0.8)]"
                        : m.key
                          ? "border-accent/70 bg-accent/20 text-accent shadow-[0_0_14px_-2px_oklch(0.79_0.13_200/0.65)]"
                          : "border-accent/40 bg-card text-transparent group-hover:border-accent/70",
                    ].join(" ")}
                  >
                    {m.key ? "★" : <span className="size-1.5 rounded-full bg-accent/70" aria-hidden="true" />}
                  </span>
                </button>

                {/* 下方区：关键年份强调卡片 */}
                <div className="flex flex-1 flex-col items-center justify-start pt-3">
                  {m.key ? (
                    <div
                      className="tl-item-down flex flex-col items-center"
                      style={{ animationDelay: `${i * 0.12 + 0.1}s` }}
                    >
                      {/* 连接茎（轴线 → 卡片） */}
                      <span
                        className="mb-2 w-px flex-none bg-gradient-to-t from-accent/50 to-accent/20"
                        style={{ height: "1.5rem" }}
                        aria-hidden="true"
                      />
                      <NodeCard milestone={m} active={isActive} onSelect={() => setActive(i)} placement="down" />
                    </div>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ===== 移动端：纵向时间轴 ===== */}
      <ol className="relative space-y-4 lg:hidden">
        <span
          className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/40 via-accent/30 to-transparent"
          aria-hidden="true"
        />
        {milestones.map((m, i) => {
          const isActive = i === active
          return (
            <li key={m.year} className="relative pl-7">
              <span
                className={[
                  "absolute left-0 top-1.5 inline-flex size-4 items-center justify-center rounded-full border",
                  m.key
                    ? "border-accent bg-accent/20 text-[8px] text-accent"
                    : "border-accent/40 bg-card",
                ].join(" ")}
                aria-hidden="true"
              >
                {m.key ? "★" : null}
              </span>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "w-full rounded-xl border p-3 text-left transition-colors",
                  m.key
                    ? "border-accent/40 bg-card/70"
                    : "border-border bg-card/40",
                  isActive ? "ring-1 ring-accent/50" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold tabular-nums text-accent">{m.year}</span>
                  <span className="text-sm font-semibold text-foreground">{m.title}</span>
                </div>
                <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function NodeCard({
  milestone,
  active,
  onSelect,
  placement,
}: {
  milestone: Milestone
  active: boolean
  onSelect: () => void
  placement: "up" | "down"
}) {
  const isKey = milestone.key
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "group flex flex-col items-center rounded-xl border px-3 py-2.5 text-center outline-none transition-all duration-300",
        isKey ? "w-48" : "w-44",
        active
          ? "border-accent/60 bg-card/80 shadow-lg shadow-accent/15 ring-hairline"
          : isKey
            ? "border-accent/35 bg-card/60 hover:border-accent/55"
            : "border-border bg-card/40 hover:border-accent/40",
      ].join(" ")}
    >
      <span
        className={[
          "font-mono font-bold tabular-nums transition-colors duration-300",
          isKey ? "text-base" : "text-sm",
          active ? "text-accent" : isKey ? "text-foreground" : "text-muted-foreground",
        ].join(" ")}
      >
        {milestone.year}
      </span>
      <span
        className={[
          "mt-0.5 text-pretty leading-snug transition-colors duration-300",
          isKey ? "text-sm font-semibold" : "text-xs font-medium",
          active ? "text-foreground" : isKey ? "text-foreground/90" : "text-muted-foreground/90",
        ].join(" ")}
      >
        {milestone.title}
      </span>
      {/* 关键节点：激活时展开完整说明 */}
      {isKey ? (
        <span
          className={[
            "grid transition-all duration-500",
            active ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <span className="overflow-hidden">
            <span className="block text-pretty text-[11px] leading-relaxed text-muted-foreground">
              {milestone.desc}
            </span>
          </span>
        </span>
      ) : (
        /* 非关键年份：常显简要说明 */
        <span className="mt-1.5 block text-pretty text-[11px] leading-relaxed text-muted-foreground/80">
          {milestone.desc}
        </span>
      )}
    </button>
  )
}
