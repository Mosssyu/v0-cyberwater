"use client"

import { Bot, BadgeCheck, Building2, Cloud, Globe2, Handshake, Rocket, Users, type LucideIcon } from "lucide-react"

type Milestone = {
  year: string
  title: string
  desc: string
  icon: LucideIcon
  /** 节点圆点在底图轨迹上的横向位置（百分比） */
  x: number
  /** 节点圆点在底图轨迹上的纵向位置（百分比） */
  y: number
  /** 文案卡片相对圆点的方向 */
  place: "above" | "below"
  /** 卡片相对圆点的水平锚点 */
  align: "left" | "center" | "right"
  /** 重点高亮节点 */
  featured?: boolean
}

// 坐标对应底图 timeline-bg-v3.png 中能量光带的走向（从左下连续爬升到右上箭头）
const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中信国安 + 中国建筑标准设计研究院相关团队创立云建标，开始布局城市数字化服务。",
    icon: Building2,
    x: 6,
    y: 78,
    place: "above",
    align: "left",
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    icon: BadgeCheck,
    x: 16,
    y: 70,
    place: "below",
    align: "center",
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，云建标深入头部水务集团运营体系。",
    icon: Handshake,
    x: 27,
    y: 62,
    place: "above",
    align: "center",
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委常委委员单位，进一步参与智慧水务行业实践与交流。",
    icon: Users,
    x: 38,
    y: 54,
    place: "below",
    align: "center",
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步掌握水务全业态核心产品能力，从集团内部场景沉淀走向行业市场。",
    icon: Globe2,
    x: 49,
    y: 46,
    place: "above",
    align: "center",
  },
  {
    year: "2024",
    title: "智水积木云产品化",
    desc: "推进管理、技术、产品体系重构，沉淀 CW-Cloud 新一代水务运营平台。",
    icon: Cloud,
    x: 59,
    y: 39,
    place: "below",
    align: "center",
  },
  {
    year: "2025",
    title: "智能体前瞻布局",
    desc: "结合大模型技术，持续推进水务智能体（CW-Agent）产品化。",
    icon: Bot,
    x: 68,
    y: 32,
    place: "above",
    align: "center",
  },
  {
    year: "2026",
    title: "新一代 AI 智能运营平台发布",
    desc: "全面发布新一代 AI 智能运营平台，深度融合大模型、智能体与数字孪生，实现全链路智能闭环。",
    icon: Rocket,
    x: 76,
    y: 26,
    place: "below",
    align: "center",
    featured: true,
  },
]

export function GrowthTimeline() {
  return (
    <div className="relative mt-12">
      {/* ===== 桌面端：海报式两层结构 ===== */}
      <div className="relative hidden overflow-hidden rounded-3xl border border-[oklch(0.5_0.12_240/0.3)] bg-[oklch(0.05_0.012_255)] shadow-[0_0_80px_-20px_oklch(0.6_0.18_245/0.4)] lg:block">
        {/* 第一层：视觉背景底图 */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src="/growth/timeline-bg-v3.png"
            alt="公司发展能量轨迹：从 2015 到 2026 持续上升的蓝色科技光带与水务城市天际线"
            className="absolute inset-0 h-full w-full object-fill"
          />
          {/* 边缘柔化压暗，提升节点可读性 */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,oklch(0.05_0.012_255/0.55)_100%)]"
            aria-hidden="true"
          />

          {/* 第二层：节点叠加层 */}
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="absolute"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              {/* 轨迹圆点 */}
              <span
                className={[
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[oklch(0.7_0.16_220/0.5)]",
                  m.featured
                    ? "size-4 bg-[oklch(0.85_0.13_205)] shadow-[0_0_18px_4px_oklch(0.8_0.15_205/0.8)]"
                    : "size-3 bg-[oklch(0.78_0.13_210)] shadow-[0_0_12px_2px_oklch(0.75_0.15_215/0.7)]",
                ].join(" ")}
                aria-hidden="true"
              />
              {/* 连接圆点与卡片的细发光柄 */}
              <span
                className={[
                  "absolute left-0 w-px -translate-x-1/2 bg-gradient-to-b from-[oklch(0.8_0.14_210/0.7)] to-transparent",
                  m.place === "above" ? "bottom-1.5 h-5 -translate-y-full" : "top-1.5 h-5",
                ].join(" ")}
                aria-hidden="true"
              />

              {/* 玻璃拟态文案卡片 */}
              <div
                className={[
                  "absolute w-40 rounded-xl border p-3 backdrop-blur-md transition-transform duration-300",
                  "bg-[oklch(0.45_0.08_245/0.18)]",
                  m.featured
                    ? "border-[oklch(0.8_0.14_205/0.65)] shadow-[0_0_28px_-4px_oklch(0.7_0.16_205/0.6)]"
                    : "border-[oklch(0.6_0.1_230/0.35)] shadow-[0_8px_30px_-12px_oklch(0_0_0/0.6)]",
                  m.place === "above" ? "bottom-[calc(50%+2.25rem)]" : "top-[calc(50%+2.25rem)]",
                  m.align === "center"
                    ? "left-1/2 -translate-x-1/2"
                    : m.align === "left"
                      ? "left-0"
                      : "right-0",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "flex size-7 shrink-0 items-center justify-center rounded-lg border",
                      m.featured
                        ? "border-[oklch(0.8_0.14_205/0.6)] bg-[oklch(0.7_0.16_205/0.22)] text-[oklch(0.9_0.1_200)]"
                        : "border-[oklch(0.6_0.1_230/0.4)] bg-[oklch(0.5_0.1_240/0.25)] text-[oklch(0.85_0.11_210)]",
                    ].join(" ")}
                  >
                    <m.icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-sm font-bold text-[oklch(0.88_0.11_210)]">{m.year}</span>
                  <span className="ml-auto font-mono text-[10px] text-[oklch(0.7_0.08_230/0.8)]">0{i + 1}</span>
                </div>
                <h4 className="mt-2 text-sm font-semibold leading-snug text-foreground">{m.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 移动端：底图横幅 + 竖向玻璃卡片 ===== */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.5_0.12_240/0.3)]">
          <img
            src="/growth/timeline-bg-v3.png"
            alt="公司发展能量轨迹"
            className="h-44 w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.05_0.012_255)] to-transparent" />
        </div>
        <ol className="mt-6 space-y-4">
          {milestones.map((m, i) => (
            <li
              key={m.year}
              className={[
                "relative rounded-xl border p-4 backdrop-blur-md",
                "bg-[oklch(0.45_0.08_245/0.14)]",
                m.featured
                  ? "border-[oklch(0.8_0.14_205/0.6)] shadow-[0_0_24px_-6px_oklch(0.7_0.16_205/0.55)]"
                  : "border-[oklch(0.6_0.1_230/0.3)]",
              ].join(" ")}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[oklch(0.6_0.1_230/0.4)] bg-[oklch(0.5_0.1_240/0.25)] text-[oklch(0.85_0.11_210)]">
                  <m.icon className="size-4" />
                </span>
                <span className="font-mono text-base font-bold text-[oklch(0.88_0.11_210)]">{m.year}</span>
                <span className="ml-auto font-mono text-xs text-[oklch(0.7_0.08_230/0.8)]">0{i + 1}</span>
              </div>
              <h4 className="mt-2.5 font-semibold text-foreground">{m.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
