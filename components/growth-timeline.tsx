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
    x: 7.6,
    y: 84.1,
    place: "below",
  },
  {
    year: "2016",
    title: "双高认证",
    desc: "获得国家高新技术企业、中关村高新技术企业认证，技术研发能力获得认可。",
    icon: BadgeCheck,
    x: 19,
    y: 72,
    place: "above",
  },
  {
    year: "2018",
    title: "北控水务战略入股",
    desc: "北控水务战略入股，云建标深入头部水务集团运营体系。",
    icon: Handshake,
    x: 31,
    y: 66,
    place: "below",
  },
  {
    year: "2020",
    title: "加入水协智慧委",
    desc: "成为水协智慧委常委委员单位，进一步参与智慧水务行业实践与交流。",
    icon: Users,
    x: 43,
    y: 60,
    place: "above",
  },
  {
    year: "2022",
    title: "全面对外服务",
    desc: "逐步掌握水务全业态核心产品能力，从集团内部场景沉淀走向行业市场。",
    icon: Globe2,
    x: 55,
    y: 56,
    place: "below",
  },
  {
    year: "2024",
    title: "智水积木云产品化",
    desc: "推进管理、技术、产品体系重构，沉淀 CW-Cloud 新一代水务运营平台。",
    icon: Cloud,
    x: 67,
    y: 47,
    place: "above",
  },
  {
    year: "2025",
    title: "智能体前瞻布局",
    desc: "结合大模型技术，持续推进水务智能体（CW-Agent）产品化。",
    icon: Bot,
    x: 79,
    y: 36,
    place: "below",
  },
  {
    year: "2026",
    title: "新一代 AI 智能运营平台发布",
    desc: "全面发布新一代 AI 智能运营平台，深度融合大模型、智能体与数字孪生，实现感知、认知、决策、执行全链路智能闭环。",
    icon: Rocket,
    x: 91,
    y: 25,
    place: "above",
  },
]

// 贯穿全程的 S 型上升能量曲线（viewBox 0 0 1440 600）
const CURVE =
  "M 60 516 C 150 505 205 450 274 432 C 350 412 388 405 446 396 C 520 385 565 372 619 360 C 690 345 735 344 792 336 C 865 325 905 305 965 282 C 1040 253 1085 235 1138 216 C 1210 190 1260 178 1310 150 C 1360 122 1388 100 1410 70"

export function GrowthTimeline() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/40 bg-[oklch(0.08_0.014_255)] px-6 py-12 sm:px-10">
      {/* 背景：深蓝渐变 + 网格 + 环境光 */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.1_0.03_255)] via-[oklch(0.08_0.016_255)] to-[oklch(0.06_0.01_250)]"
        aria-hidden="true"
      />
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      {/* 右上角能量氛围光（最亮区） */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.16_215/0.28),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      {/* 星点粒子 */}
      <StarField />
      {/* 底部水务城市剪影 */}
      <CitySilhouette />

      {/* 桌面端：能量轨迹布局 */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative mx-auto aspect-[1440/600] w-full">
          {/* 曲线 SVG */}
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <defs>
              {/* 核心能量线渐变 */}
              <linearGradient id="gt-core" x1="60" y1="516" x2="1410" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006BFF" />
                <stop offset="0.55" stopColor="#00E5FF" />
                <stop offset="1" stopColor="#BFFFFF" />
              </linearGradient>
              {/* 箭头渐变 */}
              <linearGradient id="gt-arrow-grad" x1="1330" y1="120" x2="1442" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#007BFF" />
                <stop offset="0.5" stopColor="#00E5FF" />
                <stop offset="1" stopColor="#E6FFFF" />
              </linearGradient>
              {/* 超大范围环境柔光 */}
              <filter id="gt-haze" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              {/* 主能量带发光 */}
              <filter id="gt-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              {/* 箭头强发光 */}
              <filter id="gt-strong-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 第1层：超大外发光环境光 */}
            <path d={CURVE} stroke="#00BFFF" strokeWidth="40" strokeLinecap="round" opacity="0.12" filter="url(#gt-haze)" />
            {/* 第2层：主光带（厚度） */}
            <path d={CURVE} stroke="#008CFF" strokeWidth="22" strokeLinecap="round" opacity="0.35" filter="url(#gt-glow)" />
            {/* 第3层：核心能量线（渐变） */}
            <path d={CURVE} stroke="url(#gt-core)" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
            {/* 第4层：高光细线 */}
            <path d={CURVE} stroke="#E6FFFF" strokeWidth="3" strokeLinecap="round" opacity="1" />
            {/* 第5层：流光动画 */}
            <path
              d={CURVE}
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              className="gt-flow"
              strokeDasharray="36 320"
              opacity="0.85"
            />

            {/* 右上能量冲刺箭头 */}
            <g className="gt-arrow">
              {/* 拖尾光束（2 条） */}
              <path d="M 1248 198 L 1382 96" stroke="#00E5FF" strokeWidth="5" strokeLinecap="round" opacity="0.35" filter="url(#gt-glow)" />
              <path d="M 1238 232 L 1360 140" stroke="#00BFFF" strokeWidth="3" strokeLinecap="round" opacity="0.28" filter="url(#gt-glow)" />
              {/* 箭杆核心高亮 */}
              <path d="M 1300 162 L 1402 78" stroke="#E6FFFF" strokeWidth="4" strokeLinecap="round" filter="url(#gt-strong-glow)" />
              {/* 大尺寸发光箭头三角 */}
              <path
                d="M 1442 38 L 1404 105 L 1366 53 Z"
                fill="url(#gt-arrow-grad)"
                filter="url(#gt-strong-glow)"
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
          {milestones.map((m, i) => {
            const featured = m.year === "2026"
            return (
              <div
                key={m.year}
                className="group/node absolute"
                style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* 节点发光圆 icon */}
                <div className={`relative flex items-center justify-center ${featured ? "size-14" : "size-12"}`}>
                  <span
                    className={`absolute inset-0 rounded-full border bg-[oklch(0.12_0.025_255)] ${
                      featured
                        ? "border-[#00E5FF]/80 shadow-[0_0_34px_-2px_#00E5FF]"
                        : "border-[#00BFFF]/45 shadow-[0_0_22px_-4px_#00BFFF]"
                    } gt-breathe`}
                  />
                  <m.icon className={`relative text-[#7FE9FF] ${featured ? "size-6" : "size-5"}`} />
                  {/* 编号小圆点 */}
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-[#00BFFF]/50 bg-[oklch(0.16_0.025_255)] font-mono text-[10px] font-bold text-[#7FE9FF]">
                    {i + 1}
                  </span>
                </div>

                {/* 连接虚线 */}
                <span
                  className={`absolute left-1/2 h-7 w-px -translate-x-1/2 ${
                    m.place === "above"
                      ? "bottom-full bg-gradient-to-b from-transparent to-[#00BFFF]/60"
                      : "top-full bg-gradient-to-b from-[#00BFFF]/60 to-transparent"
                  }`}
                  aria-hidden="true"
                />

                {/* 文案卡片 */}
                <div
                  className={`absolute left-1/2 w-44 -translate-x-1/2 rounded-xl border p-3 backdrop-blur-md transition-all duration-300 group-hover/node:-translate-y-1 ${
                    featured
                      ? "border-[#00E5FF]/55 bg-[oklch(0.13_0.03_245/0.8)] shadow-[0_0_36px_-8px_#00E5FF] gt-card-breathe"
                      : "border-border/40 bg-[oklch(0.1_0.018_255/0.62)] group-hover/node:border-[#00BFFF]/55 group-hover/node:shadow-[0_0_24px_-8px_#00BFFF]"
                  } ${m.place === "above" ? "bottom-[calc(100%+1.75rem)]" : "top-[calc(100%+1.75rem)]"}`}
                >
                  <div className={`font-mono text-base font-bold ${featured ? "text-[#9FF0FF]" : "text-[#7FE9FF]"}`}>
                    {m.year}
                  </div>
                  <h4 className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{m.title}</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 移动端：竖向发光时间轴 */}
      <ol className="relative z-10 lg:hidden">
        <span className="absolute bottom-2 left-[1.4rem] top-2 w-px bg-gradient-to-b from-[#00BFFF]/70 via-[#00BFFF]/30 to-transparent" aria-hidden="true" />
        {milestones.map((m, i) => {
          const featured = m.year === "2026"
          return (
            <li key={m.year} className="relative flex gap-4 pb-8 last:pb-0">
              <div
                className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-[oklch(0.12_0.025_255)] ${
                  featured ? "border-[#00E5FF]/80 shadow-[0_0_24px_-4px_#00E5FF]" : "border-[#00BFFF]/45 shadow-[0_0_18px_-6px_#00BFFF]"
                }`}
              >
                <m.icon className="size-5 text-[#7FE9FF]" />
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-[#00BFFF]/50 bg-[oklch(0.16_0.025_255)] font-mono text-[10px] font-bold text-[#7FE9FF]">
                  {i + 1}
                </span>
              </div>
              <div className="pt-0.5">
                <div className="font-mono text-base font-bold text-[#7FE9FF]">{m.year}</div>
                <h4 className="mt-0.5 font-semibold text-foreground">{m.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <style>{`
        @keyframes gt-flow {
          0% { stroke-dashoffset: 1450; }
          100% { stroke-dashoffset: 0; }
        }
        .gt-flow { animation: gt-flow 5.5s linear infinite; }
        @keyframes gt-breathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.78; }
        }
        .gt-breathe { animation: gt-breathe 3.4s ease-in-out infinite; }
        @keyframes gt-card-breathe {
          0%, 100% { box-shadow: 0 0 30px -10px #00E5FF; }
          50% { box-shadow: 0 0 42px -6px #00E5FF; }
        }
        .gt-card-breathe { animation: gt-card-breathe 3.6s ease-in-out infinite; }
        @keyframes gt-arrow {
          0%, 100% { opacity: 0.9; transform: translate(0, 0); }
          50% { opacity: 1; transform: translate(4px, -4px); }
        }
        .gt-arrow { animation: gt-arrow 3.2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        .gt-particle {
          position: absolute;
          top: 0;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: #E6FFFF;
          box-shadow: 0 0 12px 3px #00E5FF;
          offset-rotate: 0deg;
          animation: gt-particle-move 7.5s linear infinite;
        }
        @keyframes gt-particle-move {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gt-flow, .gt-breathe, .gt-card-breathe, .gt-arrow, .gt-particle { animation: none; }
        }
      `}</style>
    </div>
  )
}

function StarField() {
  const stars = [
    { x: 12, y: 18, s: 2, o: 0.5 },
    { x: 28, y: 30, s: 1.5, o: 0.4 },
    { x: 44, y: 14, s: 2, o: 0.5 },
    { x: 58, y: 26, s: 1.5, o: 0.35 },
    { x: 72, y: 12, s: 2.5, o: 0.6 },
    { x: 84, y: 22, s: 1.5, o: 0.45 },
    { x: 92, y: 40, s: 2, o: 0.5 },
    { x: 20, y: 48, s: 1.5, o: 0.3 },
    { x: 66, y: 44, s: 1.5, o: 0.35 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#BFFFFF]"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.s}px`,
            height: `${st.s}px`,
            opacity: st.o,
            boxShadow: "0 0 6px 1px #00E5FF",
          }}
        />
      ))}
    </div>
  )
}

function CitySilhouette() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full opacity-[0.26]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gt-city" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E72C8" />
          <stop offset="1" stopColor="#0A2540" />
        </linearGradient>
        <linearGradient id="gt-pipe" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00BFFF" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#00E5FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#00BFFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* 河道轮廓 */}
      <path d="M0 176 C 240 160 360 192 600 182 C 840 172 980 196 1200 184 C 1320 178 1390 186 1440 182 L 1440 200 L 0 200 Z" fill="#0A2540" opacity="0.55" />

      {/* 城市建筑群 */}
      <path
        d="M40 180 V120 H96 V180 M120 180 V92 H168 V180 M150 92 H144 V78 H174 V92
           M250 180 V132 H300 V180 M360 180 V104 H420 V180 M395 104 H389 V88 H425 V104
           M470 180 V140 H510 V180
           M1120 180 V96 H1180 V180 M1150 96 H1144 V80 H1180 V96
           M1210 180 V128 H1256 V180 M1300 180 V108 H1356 V180 M1330 108 H1324 V90 H1360 V108 M1390 180 V136 H1430 V180"
        fill="url(#gt-city)"
      />

      {/* 水厂圆形池体（沉淀池） */}
      <g stroke="#00CFFF" fill="none">
        <circle cx="560" cy="168" r="26" strokeWidth="1.5" opacity="0.7" />
        <circle cx="560" cy="168" r="15" strokeWidth="1" opacity="0.5" />
        <circle cx="624" cy="172" r="20" strokeWidth="1.5" opacity="0.6" />
        <circle cx="690" cy="170" r="16" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* 泵站 / 矩形处理单元 */}
      <g stroke="#0FA8E0" fill="#0A2540" fillOpacity="0.4">
        <rect x="760" y="150" width="60" height="30" strokeWidth="1.4" opacity="0.6" />
        <rect x="836" y="156" width="44" height="24" strokeWidth="1.2" opacity="0.55" />
        <rect x="906" y="148" width="70" height="32" strokeWidth="1.4" opacity="0.6" />
      </g>

      {/* 发光管网线条 */}
      <path d="M60 188 H1380" stroke="url(#gt-pipe)" strokeWidth="1.5" />
      <path d="M120 184 H520 L560 168" stroke="#00E5FF" strokeWidth="1" opacity="0.45" />
      <path d="M624 172 H820 L880 156" stroke="#00E5FF" strokeWidth="1" opacity="0.45" />
      <path d="M976 164 H1210 L1256 152" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />

      {/* 小型点位光标 */}
      <g fill="#9FF0FF">
        <circle cx="300" cy="132" r="2.5" />
        <circle cx="389" cy="88" r="2.5" />
        <circle cx="560" cy="168" r="3" />
        <circle cx="690" cy="170" r="2.5" />
        <circle cx="906" cy="148" r="2.5" />
        <circle cx="1144" cy="80" r="2.5" />
        <circle cx="1324" cy="90" r="2.5" />
      </g>
    </svg>
  )
}
