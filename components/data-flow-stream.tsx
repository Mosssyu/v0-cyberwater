"use client"

// 数据粒子流光带 —— Hero 左下角背景氛围层
// 由多条蓝/青蓝发光曲线组成，曲线上的粒子沿路径缓慢流动，
// 形成“数字水流 + 科技数据流”的克制高级氛围。

// 多条曲线：从左向右延展，整体向上轻微抬升，彼此有前后远近层次
const streams = [
  // d: 路径; w: 线宽; o: 基础透明度; dur: 流光速度(秒); color
  { d: "M-40 360 C 180 330, 320 300, 520 250 S 820 150, 1040 120", w: 1.6, o: 0.42, dur: 9, delay: 0, color: "#21E6F3" },
  { d: "M-40 392 C 160 372, 340 348, 560 296 S 860 196, 1080 168", w: 1.2, o: 0.34, dur: 11, delay: 1.2, color: "#2EA8FF" },
  { d: "M-40 330 C 200 300, 360 268, 600 222 S 900 132, 1120 108", w: 1, o: 0.26, dur: 13, delay: 0.6, color: "#0B7CFF" },
  { d: "M-40 420 C 220 404, 420 384, 660 332 S 940 236, 1160 212", w: 0.9, o: 0.2, dur: 15, delay: 2, color: "#2EA8FF" },
  { d: "M-40 300 C 160 274, 300 248, 500 206 S 800 116, 1020 92", w: 0.8, o: 0.18, dur: 12, delay: 1.8, color: "#21E6F3" },
]

// 沿曲线流动的粒子（引用上面的 path）
const particles = [
  { path: 0, r: 2.2, dur: 7, delay: 0, color: "#21E6F3" },
  { path: 0, r: 1.5, dur: 7, delay: 3.5, color: "#7af3ff" },
  { path: 1, r: 1.8, dur: 9, delay: 1, color: "#2EA8FF" },
  { path: 1, r: 1.3, dur: 9, delay: 5, color: "#9cd2ff" },
  { path: 2, r: 1.6, dur: 11, delay: 2, color: "#0B7CFF" },
  { path: 3, r: 1.4, dur: 13, delay: 0.5, color: "#2EA8FF" },
  { path: 4, r: 1.5, dur: 10, delay: 2.5, color: "#21E6F3" },
]

export function DataFlowStream() {
  return (
    <div
      className="data-flow pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden lg:w-[58%]"
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 left-0 h-[78%] w-full"
        viewBox="0 0 1040 460"
        preserveAspectRatio="xMinYMax slice"
        fill="none"
      >
        <defs>
          {/* 左下亮、右上淡出的线性渐变 */}
          {streams.map((s, i) => (
            <linearGradient key={`g-${i}`} id={`flow-grad-${i}`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor={s.color} stopOpacity="0" />
              <stop offset="18%" stopColor={s.color} stopOpacity={s.o} />
              <stop offset="60%" stopColor={s.color} stopOpacity={s.o * 0.5} />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
          {/* 粒子柔光 */}
          <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* 左下角整体亮度蒙版（向右上淡出） */}
          <radialGradient id="flow-fade" cx="6%" cy="98%" r="95%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="flow-mask">
            <rect x="0" y="0" width="1040" height="460" fill="url(#flow-fade)" />
          </mask>
        </defs>

        <g mask="url(#flow-mask)">
          {/* 曲线（带流光 dash） */}
          {streams.map((s, i) => (
            <path
              key={`p-${i}`}
              id={`flow-path-${i}`}
              d={s.d}
              stroke={`url(#flow-grad-${i})`}
              strokeWidth={s.w}
              strokeLinecap="round"
              className="flow-line"
              style={
                {
                  "--flow-dur": `${s.dur}s`,
                  "--flow-delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}

          {/* 流动粒子 */}
          {particles.map((p, i) => (
            <circle key={`c-${i}`} r={p.r} fill={p.color} filter="url(#flow-glow)" className="flow-dot">
              <animateMotion
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#flow-path-${p.path}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                keyTimes="0;0.12;0.82;1"
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  )
}
