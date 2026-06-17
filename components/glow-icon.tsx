import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type GlowIconSize = "xs" | "sm" | "md" | "lg" | "xl"
type GlowIconShape = "square" | "circle"

const sizeMap: Record<GlowIconSize, { box: string; icon: string; radius: string; stroke: number }> = {
  xs: { box: "size-7", icon: "size-3.5", radius: "rounded-lg", stroke: 2.2 },
  sm: { box: "size-9", icon: "size-4", radius: "rounded-lg", stroke: 2.1 },
  md: { box: "size-11", icon: "size-5", radius: "rounded-xl", stroke: 2 },
  lg: { box: "size-12", icon: "size-6", radius: "rounded-xl", stroke: 1.9 },
  xl: { box: "size-14", icon: "size-7", radius: "rounded-2xl", stroke: 1.8 },
}

/**
 * 霓虹科技图标基元（NeonIcon 风格）：
 * 玻璃质感容器 + 渐变描边 + 双色外发光 + 内层 radial 光晕 + 悬浮上浮动效。
 * 通过 `glow`（oklch 颜色）控制主色调，让全站图标拥有统一的赛博数字孪生质感。
 */
export function GlowIcon({
  icon: Icon,
  size = "md",
  shape = "square",
  glow = "oklch(0.74 0.14 205)",
  iconClassName,
  className,
  interactive = true,
}: {
  icon: LucideIcon
  size?: GlowIconSize
  shape?: GlowIconShape
  /** 主色调（oklch 颜色字符串） */
  glow?: string
  iconClassName?: string
  className?: string
  /** 是否在 group-hover / hover 时增强光晕并上浮 */
  interactive?: boolean
}) {
  const s = sizeMap[size]
  const radius = shape === "circle" ? "rounded-full" : s.radius
  // 紫色辅助发光，营造蓝紫双色霓虹层次
  const accentGlow = "oklch(0.62 0.2 295)"
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center border backdrop-blur-md transition-all duration-300 ease-out",
        s.box,
        radius,
        interactive && "group-hover:-translate-y-0.5 group-hover:scale-105 hover:-translate-y-0.5",
        className,
      )}
      style={{
        borderColor: `color-mix(in oklab, ${glow} 50%, transparent)`,
        background: `radial-gradient(125% 120% at 50% 18%, color-mix(in oklab, ${glow} 30%, transparent) 0%, color-mix(in oklab, ${glow} 9%, transparent) 52%, oklch(0.13 0.025 245 / 0.82) 100%)`,
        boxShadow: `0 0 0 1px color-mix(in oklab, ${glow} 14%, transparent), 0 0 20px -4px ${glow}, 0 0 34px -10px ${accentGlow}, inset 0 1px 0 0 oklch(1 0 0 / 0.25), inset 0 -10px 20px -12px ${glow}`,
        ["--g" as string]: glow,
        ["--a" as string]: accentGlow,
      }}
    >
      {/* 内层 radial 光晕 */}
      <span
        className={cn("pointer-events-none absolute inset-0", radius)}
        style={{
          background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${glow} 22%, transparent), transparent 68%)`,
        }}
        aria-hidden="true"
      />
      {/* 顶部高光弧（玻璃反光） */}
      <span
        className={cn("pointer-events-none absolute inset-x-1 top-0.5 h-1/3 opacity-65", radius)}
        style={{ background: "linear-gradient(180deg, oklch(1 0 0 / 0.32), transparent)" }}
        aria-hidden="true"
      />
      <Icon
        className={cn(
          "relative z-10 transition-[filter] duration-300",
          interactive && "group-hover:drop-shadow-[0_0_10px_var(--g)]",
          s.icon,
          iconClassName,
        )}
        strokeWidth={s.stroke}
        style={{
          color: glow,
          filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 12px color-mix(in oklab, ${accentGlow} 55%, transparent))`,
        }}
      />
    </span>
  )
}
