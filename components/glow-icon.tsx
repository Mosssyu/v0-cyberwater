import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type GlowIconSize = "xs" | "sm" | "md" | "lg" | "xl"
type GlowIconShape = "square" | "circle"

const sizeMap: Record<GlowIconSize, { box: string; icon: string; radius: string }> = {
  xs: { box: "size-7", icon: "size-3.5", radius: "rounded-lg" },
  sm: { box: "size-9", icon: "size-4", radius: "rounded-lg" },
  md: { box: "size-11", icon: "size-5", radius: "rounded-xl" },
  lg: { box: "size-12", icon: "size-6", radius: "rounded-xl" },
  xl: { box: "size-14", icon: "size-7", radius: "rounded-2xl" },
}

/**
 * 发光科技图标基元：渐变底座 + 发光描边 + 内高光 + 外光晕。
 * 通过 `glow`（oklch 颜色）控制主色调，让全站图标拥有统一的立体科技质感。
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
  /** 是否在 group-hover 时增强光晕 */
  interactive?: boolean
}) {
  const s = sizeMap[size]
  const radius = shape === "circle" ? "rounded-full" : s.radius
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center border transition-all duration-300",
        s.box,
        radius,
        interactive && "group-hover:scale-105",
        className,
      )}
      style={{
        borderColor: `color-mix(in oklab, ${glow} 55%, transparent)`,
        background: `radial-gradient(120% 120% at 50% 0%, color-mix(in oklab, ${glow} 26%, transparent) 0%, color-mix(in oklab, ${glow} 8%, transparent) 55%, oklch(0.16 0.03 240 / 0.85) 100%)`,
        boxShadow: `0 0 18px -5px ${glow}, inset 0 1px 0 0 oklch(1 0 0 / 0.22), inset 0 -8px 18px -10px ${glow}`,
        ["--g" as string]: glow,
      }}
    >
      {/* 顶部高光弧 */}
      <span
        className={cn("pointer-events-none absolute inset-x-1 top-0.5 h-1/3 opacity-60", radius)}
        style={{ background: "linear-gradient(180deg, oklch(1 0 0 / 0.28), transparent)" }}
        aria-hidden="true"
      />
      <Icon
        className={cn("relative z-10 drop-shadow-[0_0_6px_var(--g)]", s.icon, iconClassName)}
        style={{ color: glow }}
      />
    </span>
  )
}
