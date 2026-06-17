import { cn } from "@/lib/utils"

/**
 * 霓虹插画图标（基于生成的 PNG）。
 * 图片为「黑底霓虹」素材，使用 mix-blend-screen 让黑色背景在深色页面中自动隐去，
 * 仅保留发光主体，并叠加柔光投影增强立体悬浮感。
 */
export function NeonIcon({
  src,
  alt,
  className,
  glow = "oklch(0.74 0.14 205)",
}: {
  src: string
  alt: string
  className?: string
  glow?: string
}) {
  return (
    <span className={cn("relative inline-flex shrink-0 items-center justify-center", className)}>
      {/* 背后光晕 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full opacity-70 blur-md"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        draggable={false}
        className="relative h-full w-full select-none object-contain mix-blend-screen"
      />
    </span>
  )
}
