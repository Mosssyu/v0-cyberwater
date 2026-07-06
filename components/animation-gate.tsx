"use client"

import { useEffect, useRef } from "react"

/**
 * AnimationGate —— 视口外自动暂停动画的性能门控容器。
 *
 * 作用：
 * 1. 区块滚出视口（含 200px 预加载缓冲）时，暂停子树内所有 CSS 动画
 *    （通过 .cw-anim-off 类 + animation-play-state: paused）。
 * 2. 同时暂停子树内所有 SVG SMIL 动画（svg.pauseAnimations()），
 *    SMIL + feGaussianBlur 滤镜是页面卡顿的主要来源。
 * 3. 页面切到后台标签页时同样暂停，回到前台且在视口内时恢复。
 *
 * 用法：将首屏以下、含持续动效的区块包裹起来即可，不影响布局与交互。
 */
export function AnimationGate({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inViewRef = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const applyPaused = (paused: boolean) => {
      el.classList.toggle("cw-anim-off", paused)
      const svgs = el.querySelectorAll("svg")
      svgs.forEach((svg) => {
        try {
          if (paused) svg.pauseAnimations()
          else svg.unpauseAnimations()
        } catch {
          // 部分环境不支持 SMIL API，忽略
        }
      })
    }

    const sync = () => {
      applyPaused(!inViewRef.current || document.hidden)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        sync()
      },
      { rootMargin: "200px 0px 200px 0px" },
    )
    io.observe(el)

    document.addEventListener("visibilitychange", sync)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
