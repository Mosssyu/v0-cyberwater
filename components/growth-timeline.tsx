"use client"

import { useEffect, useRef, useState } from "react"

type Milestone = {
  year: string
  title: string
  desc: string
  /** 关键节点：2018 / 2022 / 2026 */
  key: boolean
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "聚焦 BIM / CIM 与数字化工程能力起步。",
    key: false,
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "通过高新技术企业认定，夯实技术资质。",
    key: false,
  },
  {
    year: "2018",
    title: "进入水务运营场景",
    desc: "深度绑定国内头部水务集团，从技术能力真正进入真实水务运营场景，迈入行业深水区。",
    key: true,
  },
  {
    year: "2020",
    title: "参与行业标准建设",
    desc: "加入水协智慧水务委员会，参与行业标准建设，沉淀管理标准与业务流程。",
    key: false,
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "从内部能力沉淀走向外部产品化服务，能力成熟、对外开放，开始规模化服务行业客户。",
    key: true,
  },
  {
    year: "2024 - 2025",
    title: "智水积木云与智能体布局",
    desc: "推出标准化、可配置的智水积木云产品，并前瞻布局水务智能体。",
    key: false,
  },
  {
    year: "2026",
    title: "新一代 AI 水务运营平台",
    desc: "AI 化、平台化、一体化，感知—认知—决策—执行—进化，全面赋能水务智能化运营。",
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

  const activeItem = milestones[active]

  return (
    <div
      className="relative mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 横向基线（大屏） */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[2.25rem] hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block"
        aria-hidden="true"
      />

      {/* 节点行 */}
      <ol className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:flex lg:items-start lg:justify-between lg:gap-0">
        {milestones.map((m, i) => {
          const isActive = i === active
          return (
            <li key={m.year} className="relative flex flex-col items-center lg:flex-1">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group flex flex-col items-center outline-none"
                aria-pressed={isActive}
                aria-label={`${m.year} ${m.title}`}
              >
                {/* 节点 */}
                <span className="relative flex h-10 items-center justify-center">
                  {/* 活跃外圈 */}
                  {isActive ? (
                    <span
                      className="absolute size-10 rounded-full border border-accent/50"
                      style={{ animation: "ring-pulse 2s ease-in-out infinite" }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={[
                      "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border font-bold transition-all duration-500",
                      m.key ? "size-6 text-[11px]" : "size-4 text-[0px]",
                      isActive
                        ? "scale-125 border-accent bg-accent text-background shadow-[0_0_20px_2px_oklch(0.79_0.13_200/0.75)]"
                        : m.key
                          ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_12px_-2px_oklch(0.79_0.13_200/0.6)]"
                          : "border-accent/30 bg-card text-transparent group-hover:border-accent/60",
                    ].join(" ")}
                  >
                    {m.key ? "★" : <span className="size-1.5 rounded-full bg-accent/70" aria-hidden="true" />}
                  </span>
                </span>

                {/* 年份 */}
                <span
                  className={[
                    "mt-3 font-mono text-sm font-bold tabular-nums transition-colors duration-300",
                    isActive ? "text-accent" : m.key ? "text-foreground" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {m.year}
                </span>
                {/* 标题 */}
                <span
                  className={[
                    "mt-1 max-w-[9rem] text-pretty text-center text-xs leading-snug transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground/80",
                  ].join(" ")}
                >
                  {m.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* 聚焦说明卡片 */}
      <div className="mx-auto mt-10 max-w-2xl">
        <div
          key={active}
          className="reveal-focus rounded-2xl border border-accent/30 bg-card/70 p-6 text-center shadow-lg shadow-accent/10 ring-hairline backdrop-blur"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-bold text-accent tabular-nums">{activeItem.year}</span>
            <span className="h-5 w-px bg-border" />
            <span className="text-base font-semibold text-foreground">{activeItem.title}</span>
          </div>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{activeItem.desc}</p>
        </div>
      </div>
    </div>
  )
}
