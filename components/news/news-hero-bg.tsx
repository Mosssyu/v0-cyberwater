// 新闻动态横幅背景 —— 纯矢量科技水纹（SVG 绘制，任意宽度都锐利清晰，不会拉伸失真）
// 右侧：同心涟漪线框 + 悬浮水滴 + 数据粒子；整体：细网格底纹 + 深蓝渐变
export function NewsHeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 深蓝渐变底 */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,oklch(0.15_0.05_256)_0%,oklch(0.18_0.06_250)_55%,oklch(0.22_0.08_235)_100%)]" />

      {/* 细网格底纹（矢量，永远清晰） */}
      <svg className="absolute inset-0 size-full opacity-[0.13]" aria-hidden="true">
        <defs>
          <pattern id="nh-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="oklch(0.7 0.1 220)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nh-grid)" />
      </svg>

      {/* 右侧涟漪主视觉（viewBox 固定比例，靠右锚定，不随宽度拉伸） */}
      <svg
        className="absolute -right-16 top-1/2 h-[128%] -translate-y-[46%] sm:-right-8 lg:right-12"
        viewBox="0 0 640 420"
        fill="none"
        style={{ aspectRatio: "640 / 420" }}
      >
        <defs>
          <radialGradient id="nh-pool" cx="50%" cy="58%" r="55%">
            <stop offset="0%" stopColor="oklch(0.55 0.13 220)" stopOpacity="0.28" />
            <stop offset="55%" stopColor="oklch(0.4 0.1 240)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nh-drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7af3ff" />
            <stop offset="100%" stopColor="#2EA8FF" />
          </linearGradient>
        </defs>

        {/* 水面光晕 */}
        <ellipse cx="320" cy="245" rx="300" ry="150" fill="url(#nh-pool)" />

        {/* 同心涟漪线框（由内向外渐淡） */}
        {[
          { rx: 46, ry: 15, o: 0.9, w: 1.6 },
          { rx: 92, ry: 31, o: 0.65, w: 1.3 },
          { rx: 148, ry: 50, o: 0.45, w: 1.1 },
          { rx: 210, ry: 71, o: 0.3, w: 1 },
          { rx: 276, ry: 94, o: 0.18, w: 0.9 },
        ].map((r, i) => (
          <ellipse
            key={i}
            cx="320"
            cy="245"
            rx={r.rx}
            ry={r.ry}
            stroke="#21E6F3"
            strokeOpacity={r.o}
            strokeWidth={r.w}
          />
        ))}
        {/* 第二组偏移涟漪（青蓝，增加层次） */}
        {[
          { rx: 70, ry: 23, o: 0.35 },
          { rx: 124, ry: 41, o: 0.22 },
          { rx: 184, ry: 61, o: 0.14 },
        ].map((r, i) => (
          <ellipse
            key={`b-${i}`}
            cx="320"
            cy="245"
            rx={r.rx}
            ry={r.ry}
            stroke="#2EA8FF"
            strokeOpacity={r.o}
            strokeWidth="0.9"
            strokeDasharray="6 10"
          />
        ))}

        {/* 悬浮水滴 + 垂落光束 */}
        <line x1="320" y1="96" x2="320" y2="218" stroke="#21E6F3" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 6" />
        <path
          d="M320 64c10 14 17 23 17 33a17 17 0 1 1-34 0c0-10 7-19 17-33Z"
          fill="url(#nh-drop)"
          fillOpacity="0.92"
        />
        <path d="M320 64c10 14 17 23 17 33a17 17 0 1 1-34 0c0-10 7-19 17-33Z" stroke="#7af3ff" strokeOpacity="0.8" strokeWidth="1" fill="none" />
        {/* 水滴高光 */}
        <ellipse cx="313" cy="92" rx="3.4" ry="5.4" fill="#eafcff" fillOpacity="0.75" />

        {/* 落点中心亮斑 */}
        <ellipse cx="320" cy="245" rx="14" ry="4.6" fill="#21E6F3" fillOpacity="0.5" />
        <ellipse cx="320" cy="245" rx="26" ry="8.6" stroke="#7af3ff" strokeOpacity="0.55" strokeWidth="1.2" />

        {/* 数据粒子（错落分布在涟漪四周） */}
        {[
          [186, 170, 2.4, 0.85],
          [452, 190, 2, 0.7],
          [500, 268, 1.6, 0.5],
          [232, 305, 1.8, 0.6],
          [396, 140, 1.5, 0.55],
          [148, 238, 1.4, 0.45],
          [420, 330, 1.6, 0.4],
          [282, 128, 1.3, 0.5],
        ].map(([x, y, r, o], i) => (
          <circle key={`p-${i}`} cx={x} cy={y} r={r} fill="#7af3ff" fillOpacity={o} />
        ))}
        {/* 粒子连线（科技数据连接感） */}
        <path d="M186 170L282 128L396 140" stroke="#21E6F3" strokeOpacity="0.25" strokeWidth="0.8" />
        <path d="M452 190L500 268" stroke="#2EA8FF" strokeOpacity="0.22" strokeWidth="0.8" />
      </svg>

      {/* 顶部青色描边光线 */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.78_0.13_205/0.5),transparent)]" />
    </div>
  )
}
