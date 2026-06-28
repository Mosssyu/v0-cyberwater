"use client"

import type { ModulePalette } from "@/components/building-blocks"

/** 沿路径流动的数据点 */
function FlowDots({ path, color, n = 3, dur = 2.4, w = 1.4 }: { path: string; color: string; n?: number; dur?: number; w?: number }) {
  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeOpacity={0.25} strokeWidth={w} strokeDasharray="3 4" />
      {Array.from({ length: n }).map((_, i) => (
        <circle key={i} r={2.4} fill={color}>
          <animateMotion dur={`${dur}s`} begin={`${(i * dur) / n}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </g>
  )
}

/** 脉冲节点 */
function Node({ x, y, r = 11, color, icon }: { x: number; y: number; r?: number; color: string; icon?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} fillOpacity={0.16} stroke={color} strokeOpacity={0.6} />
      <circle cx={x} cy={y} r={r * 0.42} fill={color}>
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
      {icon ? (
        <text x={x} y={y + r + 11} textAnchor="middle" fontSize="9" fill={color} fillOpacity={0.85}>
          {icon}
        </text>
      ) : null}
    </g>
  )
}

/** 扩散信号环 */
function Rings({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="none" stroke={color} strokeWidth={1.2}>
          <animate attributeName="r" values="6;30" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  )
}

const VB = "0 0 320 176"

/** 根据产品 id 渲染专属动画示意场景 */
export function ProductScene({ id, palette }: { id: string; palette: ModulePalette }) {
  const c = palette.top
  const c2 = palette.right

  let scene: React.ReactNode = null

  switch (id) {
    case "group": // 集团运营管理：多站点汇聚到中心枢纽
      scene = (
        <>
          {[
            [46, 44],
            [274, 44],
            [46, 132],
            [274, 132],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 14} y={y - 12} width={28} height={24} rx={3} fill={c2} fillOpacity={0.25} stroke={c} strokeOpacity={0.5} />
              <FlowDots path={`M${x} ${y} Q160 88 160 88`} color={c} n={2} dur={2.6} />
            </g>
          ))}
          <circle cx={160} cy={88} r={26} fill={c} fillOpacity={0.18} stroke={c} strokeOpacity={0.7} />
          <circle cx={160} cy={88} r={13} fill={c}>
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={160} y={130} textAnchor="middle" fontSize="9" fill={c} fillOpacity={0.85}>
            集团运营中心
          </text>
        </>
      )
      break
    case "integrated": // 厂网河湖一体化：厂→网→河湖联调
      scene = (
        <>
          <FlowDots path="M58 60 Q110 100 160 120" color={c} n={2} dur={2.4} />
          <FlowDots path="M160 120 Q210 100 262 60" color={c} n={2} dur={2.4} />
          <Node x={58} y={60} r={13} color={c} icon="水厂" />
          <Node x={160} y={120} r={13} color={c2} icon="管网" />
          <Node x={262} y={60} r={13} color={c} icon="河湖" />
        </>
      )
      break
    case "sewage": // 分布式污水厂：多站点集中监控
      scene = (
        <>
          <rect x={70} y={28} width={180} height={22} rx={5} fill={c} fillOpacity={0.15} stroke={c} strokeOpacity={0.5} />
          <text x={160} y={43} textAnchor="middle" fontSize="9" fill={c}>
            集中监控中心
          </text>
          {[60, 110, 160, 210, 260].map((x, i) => (
            <g key={i}>
              <FlowDots path={`M${x} 130 L160 50`} color={c} n={1} dur={2.8} />
              <Node x={x} y={134} r={8} color={i % 2 ? c2 : c} />
            </g>
          ))}
        </>
      )
      break
    case "plant": // 水厂运营：处理池水位起伏
      scene = (
        <>
          {[30, 128, 226].map((bx, i) => (
            <g key={i}>
              <rect x={bx} y={56} width={64} height={88} rx={5} fill="none" stroke={c} strokeOpacity={0.5} />
              <rect x={bx} width={64} rx={5} fill={c} fillOpacity={0.35}>
                <animate attributeName="y" values="110;78;110" dur={`${3 + i}s`} repeatCount="indefinite" />
                <animate attributeName="height" values="34;66;34" dur={`${3 + i}s`} repeatCount="indefinite" />
              </rect>
            </g>
          ))}
          <FlowDots path="M30 50 L290 50" color={c} n={4} dur={3} />
        </>
      )
      break
    case "pump": // 泵闸站：仪表盘指针 + 叶轮转动
      scene = (
        <>
          <path d="M96 128 A64 64 0 0 1 224 128" fill="none" stroke={c} strokeOpacity={0.35} strokeWidth={5} />
          <line x1={160} y1={128} x2={160} y2={74} stroke={c} strokeWidth={3} strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="-58 160 128;58 160 128;-58 160 128" dur="3.4s" repeatCount="indefinite" />
          </line>
          <circle cx={160} cy={128} r={7} fill={c} />
          <g>
            {[0, 60, 120, 240, 300].map((a) => (
              <line key={a} x1={160} y1={128} x2={160} y2={113} stroke={c2} strokeWidth={3} strokeLinecap="round" transform={`rotate(${a} 160 128)`} />
            ))}
            <animateTransform attributeName="transform" type="rotate" from="0 160 128" to="360 160 128" dur="2.4s" repeatCount="indefinite" />
          </g>
        </>
      )
      break
    case "pipe": // 管网管理：管网流动 + 漏损告警
      scene = (
        <>
          {[52, 96, 140].map((y) => (
            <line key={`h${y}`} x1={30} y1={y} x2={290} y2={y} stroke={c} strokeOpacity={0.18} strokeWidth={1.4} />
          ))}
          {[70, 160, 250].map((x) => (
            <line key={`v${x}`} x1={x} y1={40} x2={x} y2={152} stroke={c} strokeOpacity={0.18} strokeWidth={1.4} />
          ))}
          <FlowDots path="M30 96 L290 96" color={c} n={4} dur={2.6} />
          <FlowDots path="M160 40 L160 152" color={c} n={3} dur={2.8} />
          <circle cx={250} cy={52} r={6} fill="#ff5a5a">
            <animate attributeName="r" values="6;11;6" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x={250} y={36} textAnchor="middle" fontSize="8" fill="#ff8a8a">
            漏损预警
          </text>
        </>
      )
      break
    case "reservoir": // 水库标准化：水体波动 + 大坝 + 水位线
      scene = (
        <>
          <rect x={30} y={86} width={230} height={66} fill={c} fillOpacity={0.2} />
          {[0, 1].map((i) => (
            <path
              key={i}
              d="M30 86 q28 -10 56 0 t56 0 t56 0 t56 0"
              fill="none"
              stroke={c}
              strokeOpacity={0.6 - i * 0.25}
              strokeWidth={2}
            >
              <animateTransform attributeName="transform" type="translate" values="0 0;-28 0;0 0" dur={`${3 + i}s`} repeatCount="indefinite" />
            </path>
          ))}
          <rect x={260} y={60} width={30} height={92} rx={2} fill={c2} fillOpacity={0.4} stroke={c} strokeOpacity={0.5} />
          <line x1={30} y1={92} x2={250} y2={92} stroke={c} strokeDasharray="4 4" strokeOpacity={0.7} />
          <text x={40} y={84} fontSize="8" fill={c}>
            正常水位
          </text>
        </>
      )
      break
    case "flood": // 城市防汛内涝：降雨 + 积水上涨 + 预警
      scene = (
        <>
          {[50, 90, 130, 170, 210, 250].map((x, i) => (
            <line key={x} x1={x} y1={30} x2={x - 8} y2={48} stroke={c} strokeWidth={1.6} strokeLinecap="round">
              <animate attributeName="y1" values="30;120" dur={`${1 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="y2" values="48;138" dur={`${1 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur={`${1 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
            </line>
          ))}
          <rect x={30} width={260} rx={2} fill={c} fillOpacity={0.3}>
            <animate attributeName="y" values="148;126;148" dur="4s" repeatCount="indefinite" />
            <animate attributeName="height" values="20;42;20" dur="4s" repeatCount="indefinite" />
          </rect>
          <g>
            <path d="M160 70 L176 100 L144 100 Z" fill="none" stroke="#ffb84d" strokeWidth={2} />
            <text x={160} y={96} textAnchor="middle" fontSize="13" fill="#ffb84d">
              !
            </text>
            <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          </g>
        </>
      )
      break
    case "iot": // IoT 物联平台：网关 + 传感节点信号
      scene = (
        <>
          <rect x={132} y={70} width={56} height={36} rx={6} fill={c} fillOpacity={0.2} stroke={c} strokeOpacity={0.6} />
          <text x={160} y={92} textAnchor="middle" fontSize="9" fill={c}>
            网关
          </text>
          {[
            [56, 50],
            [264, 50],
            [56, 132],
            [264, 132],
          ].map(([x, y], i) => (
            <g key={i}>
              <FlowDots path={`M${x} ${y} L160 88`} color={c} n={1} dur={2.6} />
              <Rings x={x} y={y} color={i % 2 ? c2 : c} />
            </g>
          ))}
        </>
      )
      break
    case "sso": // SSO 统一登录：盾牌 + 多应用授权
      scene = (
        <>
          <path
            d="M160 52 L186 62 V92 Q186 118 160 130 Q134 118 134 92 V62 Z"
            fill={c}
            fillOpacity={0.18}
            stroke={c}
            strokeOpacity={0.7}
          />
          <rect x={152} y={84} width={16} height={14} rx={2} fill={c} />
          <path d="M154 84 V79 a6 6 0 0 1 12 0 V84" fill="none" stroke={c} strokeWidth={2}>
            <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
          </path>
          {[
            [54, 70],
            [266, 70],
            [160, 150],
          ].map(([x, y], i) => (
            <g key={i}>
              <FlowDots path={`M160 90 L${x} ${y}`} color={c} n={1} dur={2.4} />
              <rect x={x - 13} y={y - 11} width={26} height={22} rx={4} fill={c2} fillOpacity={0.3} stroke={c} strokeOpacity={0.5} />
            </g>
          ))}
        </>
      )
      break
    case "ai": // 水务智能体：智能中枢向各模块辐射
      scene = (
        <>
          <Rings x={160} y={88} color={c} />
          <circle cx={160} cy={88} r={24} fill={c} fillOpacity={0.2} stroke={c} strokeOpacity={0.7} />
          <text x={160} y={92} textAnchor="middle" fontSize="11" fill={c}>
            AI
          </text>
          {[
            [50, 50],
            [270, 50],
            [50, 130],
            [270, 130],
          ].map(([x, y], i) => (
            <g key={i}>
              <FlowDots path={`M160 88 L${x} ${y}`} color={c} n={2} dur={2.2} />
              <Node x={x} y={y} r={8} color={i % 2 ? c2 : c} />
            </g>
          ))}
        </>
      )
      break
    default:
      scene = <circle cx={160} cy={88} r={20} fill={c} fillOpacity={0.3} />
  }

  return (
    <div className="absolute inset-0">
      {/* 3D 场景效果底图 */}
      <img
        src={`/scenes/${id}.png`}
        alt={`${id} 产品 3D 运营场景示意图`}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      {/* 暗色渐变蒙版，确保叠加的动态节点与文字可读 */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, oklch(0.14 0.03 245 / 0.75), oklch(0.14 0.03 245 / 0.15) 55%, oklch(0.14 0.03 245 / 0.35)), radial-gradient(circle at 50% 42%, ${c}1a, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {/* 动态发光节点 / 数据流叠加层 */}
      <svg className="absolute inset-0 size-full" viewBox={VB} preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        {scene}
      </svg>
    </div>
  )
}
