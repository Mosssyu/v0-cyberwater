import { Bot, BadgeCheck, Building2, Cloud, Globe2, Handshake, Rocket, Users, type LucideIcon } from "lucide-react"

type Milestone = {
  year: string
  title: string
  desc: string
  icon: LucideIcon
  /** 节点在曲线上的横向位置（百分比） */
  x: number
  /** 节点在曲线上的纵向位置（百分比，基于 stage 高度） */
  y: number
  /** 文案卡片相对节点的位置 */
  place: "above" | "below"
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "公司成立",
    desc: "中信国安 + 中国建筑标准设计研究院相关团队创立云建标，开始布局城市数字化服务。",
    icon: Building2,
    x: 7,
    y: 73,
    place: "below",
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    icon: BadgeCheck,
    x: 20.5,
    y: 63,
    place: "above",
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，云建标深入头部水务集团运营体系。",
    icon: Handshake,
    x: 34,
    y: 57,
    place: "below",
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委常委委员单位，进一步参与智慧水务行业实践与交流。",
    icon: Users,
    x: 47.5,
    y: 48,
    place: "above",
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步掌握水务全业态核心产品能力，从集团内部场景沉淀走向行业市场。",
    icon: Globe2,
    x: 60,
    y: 46,
    place: "below",
  },
  {
    year: "2024",
    title: "智水积木云产品化",
    desc: "推进管理、技术、产品体系重构，沉淀 CW-Cloud 新一代水务运营平台。",
    icon: Cloud,
    x: 69,
    y: 39,
    place: "above",
  },
  {
    year: "2025",
    title: "智能体前瞻布局",
    desc: "结合大模型技术，持续推进水务智能体（CW-Agent）产品化。",
    icon: Bot,
    x: 85,
    y: 30,
    place: "above",
  },
  {
    year: "2026",
    title: "新一代 AI 智能运营平台发布",
    desc: "全面发布新一代 AI 智能运营平台，深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    icon: Rocket,
    x: 92,
    y: 23,
    place: "below",
  },
]

// 贯穿全程的能量曲线（viewBox 0 0 1200 520），节点 y(px) = y% * 5.2
const CURVE =
  "M 84 380 C 170 380 190 328 246 328 S 350 300 408 296 S 510 256 570 250 S 690 244 720 240 S 824 206 864 198 S 980 168 1002 161 S 1108 100 1128 94"

export function GrowthTimeline() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/40 bg-[oklch(0.1_0.014_250)] px-6 py-12 sm:px-10">
      {/* 背景：网格 + 顶部光感 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-accent/10 to-transparent"
        aria-hidden="true"
      />
      {/* 底部水务城市剪影 */}
      <CitySilhouette />

      {/* 桌面端：能量轨迹布局 */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative mx-auto aspect-[1200/520] w-full">
          {/* 曲线 SVG */}
          <svg
            viewBox="0 0 1200 520"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="gt-line" x1="0" y1="520" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="oklch(0.55 0.2 255)" />
                <stop offset="0.45" stopColor="oklch(0.7 0.16 220)" />
                <stop offset="1" stopColor="oklch(0.9 0.1 200)" />
              </linearGradient>
              {/* 大范围柔光（光晕氛围） */}
              <filter id="gt-haze" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              {/* 主能量带发光 */}
              <filter id="gt-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* 箭头强发光 */}
              <filter id="gt-arrow-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 第1层：底部大光晕 */}
            <path d={CURVE} stroke="url(#gt-line)" strokeWidth="24" strokeLinecap="round" opacity="0.2" filter="url(#gt-haze)" />
            {/* 第2层：中层能量带 */}
            <path d={CURVE} stroke="url(#gt-line)" strokeWidth="10" strokeLinecap="round" opacity="0.7" filter="url(#gt-glow)" />
            {/* 第3层：核心高亮线 */}
            <path d={CURVE} stroke="oklch(0.95 0.05 200)" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" filter="url(#gt-glow)" />
            {/* 第4层：流光动画线 */}
            <path
              d={CURVE}
              stroke="oklch(0.97 0.04 200)"
              strokeWidth="3"
              strokeLinecap="round"
              className="gt-flow"
              strokeDasharray="50 1250"
            />

            {/* 右上能量冲刺箭头 */}
            <g className="gt-arrow">
              {/* 拖尾光束 */}
              <path d="M 1108 108 L 1182 40" stroke="url(#gt-line)" strokeWidth="14" strokeLinecap="round" opacity="0.22" filter="url(#gt-haze)" />
              <path d="M 1116 102 L 1184 38" stroke="url(#gt-line)" strokeWidth="7" strokeLinecap="round" opacity="0.55" filter="url(#gt-glow)" />
              {/* 箭杆核心 */}
              <path d="M 1124 96 L 1186 36" stroke="oklch(0.95 0.05 200)" strokeWidth="3" strokeLinecap="round" filter="url(#gt-arrow-glow)" />
              {/* 发光箭头三角 */}
              <path
                d="M 1162 18 L 1202 24 L 1176 56 Z"
                fill="oklch(0.93 0.07 200)"
                filter="url(#gt-arrow-glow)"
              />
            </g>
          </svg>

          {/* 沿曲线移动的粒子 */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="gt-particle"
              style={{ animationDelay: `${i * 2.6}s`, offsetPath: `path('${CURVE}')` }}
              aria-hidden="true"
            />
          ))}

          {/* 节点 */}
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="group/node absolute"
              style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* 节点发光圆 icon */}
              <div className="relative flex size-12 items-center justify-center">
                <span
                  className={`absolute inset-0 rounded-full border bg-[oklch(0.13_0.02_250)] shadow-[0_0_22px_-4px_oklch(0.74_0.14_205/0.8)] ${
                    m.year === "2026" ? "border-accent/70" : "border-accent/40"
                  } gt-breathe`}
                />
                <m.icon className="relative size-5 text-accent" />
                {/* 编号小圆点 */}
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-accent/40 bg-[oklch(0.16_0.02_250)] font-mono text-[10px] font-bold text-accent">
                  {i + 1}
                </span>
              </div>

              {/* 连接虚线 */}
              <span
                className={`absolute left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-accent/50 to-transparent ${
                  m.place === "above" ? "bottom-full" : "top-full bg-gradient-to-t"
                }`}
                aria-hidden="true"
              />

              {/* 文案卡片 */}
              <div
                className={`absolute left-1/2 w-44 -translate-x-1/2 rounded-xl border bg-[oklch(0.12_0.016_250/0.85)] p-3 backdrop-blur-sm transition-all duration-300 group-hover/node:-translate-y-0.5 group-hover/node:border-accent/50 ${
                  m.year === "2026" ? "border-accent/45 shadow-[0_0_28px_-8px_oklch(0.74_0.14_205/0.9)]" : "border-border/50"
                } ${m.place === "above" ? "bottom-[calc(100%+1.75rem)]" : "top-[calc(100%+1.75rem)]"}`}
              >
                <div className="font-mono text-base font-bold text-accent">{m.year}</div>
                <h4 className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{m.title}</h4>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 移动端：竖向发光时间轴 */}
      <ol className="relative z-10 lg:hidden">
        <span className="absolute bottom-2 left-[1.4rem] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" aria-hidden="true" />
        {milestones.map((m, i) => (
          <li key={m.year} className="relative flex gap-4 pb-8 last:pb-0">
            <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-[oklch(0.13_0.02_250)] shadow-[0_0_18px_-6px_oklch(0.74_0.14_205/0.8)]">
              <m.icon className="size-5 text-accent" />
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-accent/40 bg-[oklch(0.16_0.02_250)] font-mono text-[10px] font-bold text-accent">
                {i + 1}
              </span>
            </div>
            <div className="pt-0.5">
              <div className="font-mono text-base font-bold text-accent">{m.year}</div>
              <h4 className="mt-0.5 font-semibold text-foreground">{m.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <style>{`
        @keyframes gt-flow {
          0% { stroke-dashoffset: 1300; }
          100% { stroke-dashoffset: 0; }
        }
        .gt-flow { animation: gt-flow 6s linear infinite; opacity: 0.9; }
        @keyframes gt-breathe {
          0%, 100% { opacity: 1; box-shadow: 0 0 18px -6px oklch(0.74 0.14 205 / 0.7); }
          50% { opacity: 0.85; box-shadow: 0 0 30px -4px oklch(0.74 0.14 205 / 0.95); }
        }
        .gt-breathe { animation: gt-breathe 3.4s ease-in-out infinite; }
        @keyframes gt-arrow {
          0%, 100% { opacity: 0.85; transform: translate(0, 0); }
          50% { opacity: 1; transform: translate(3px, -3px); }
        }
        .gt-arrow { animation: gt-arrow 3.2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        .gt-particle {
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: oklch(0.92 0.06 200);
          box-shadow: 0 0 10px 2px oklch(0.82 0.13 200 / 0.9);
          offset-rotate: 0deg;
          animation: gt-particle-move 7.8s linear infinite;
        }
        @keyframes gt-particle-move {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gt-flow, .gt-breathe, .gt-arrow, .gt-particle { animation: none; }
        }
      `}</style>
    </div>
  )
}

function CitySilhouette() {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-[0.22]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gt-city" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.5 0.12 235)" />
          <stop offset="1" stopColor="oklch(0.2 0.04 245)" />
        </linearGradient>
      </defs>
      {/* 地面连接线 */}
      <line x1="0" y1="150" x2="1200" y2="150" stroke="oklch(0.6 0.12 210)" strokeWidth="1" opacity="0.5" />
      {/* 建筑剪影 */}
      <path
        d="M40 150 V96 H96 V150 M120 150 V70 H168 V150 M150 70 H144 V58 H174 V70 M210 150 V110 H252 V150 M300 150 V84 H352 V150 M380 150 V120 H414 V150 M470 150 V64 H520 V150 M500 64 H494 V50 H526 V64 M560 150 V104 H600 V150 M660 150 V92 H708 V150 M740 150 V120 H776 V150 M840 150 V72 H892 V150 M872 72 H866 V56 H902 V72 M940 150 V108 H980 V150 M1020 150 V80 H1072 V150 M1110 150 V116 H1150 V150"
        fill="url(#gt-city)"
      />
      {/* 圆形水厂池体 */}
      <circle cx="640" cy="140" r="22" stroke="oklch(0.62 0.13 205)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="640" cy="140" r="12" stroke="oklch(0.62 0.13 205)" strokeWidth="1" opacity="0.5" />
      <circle cx="402" cy="142" r="16" stroke="oklch(0.62 0.13 205)" strokeWidth="1.5" opacity="0.6" />
      {/* 发光点位 */}
      <circle cx="300" cy="84" r="2.5" fill="oklch(0.85 0.12 200)" />
      <circle cx="494" cy="50" r="2.5" fill="oklch(0.85 0.12 200)" />
      <circle cx="866" cy="56" r="2.5" fill="oklch(0.85 0.12 200)" />
      <circle cx="1020" cy="80" r="2.5" fill="oklch(0.85 0.12 200)" />
    </svg>
  )
}
