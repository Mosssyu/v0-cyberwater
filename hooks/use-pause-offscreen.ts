"use client"

import { useEffect, useRef } from "react"

/**
 * 离屏暂停 SVG SMIL 动画（<animate>/<animateMotion>）。
 * - 元素滚出视口时调用 pauseAnimations()，滚回时 unpauseAnimations()
 * - 标签页隐藏时同样暂停，避免后台空转
 * - 尊重 prefers-reduced-motion：直接暂停并不再恢复
 *
 * 用法：const ref = usePauseOffscreen<SVGSVGElement>(); <svg ref={ref} ... />
 */
export function usePauseOffscreen<T extends SVGSVGElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      try {
        el.pauseAnimations()
      } catch {}
      return
    }

    let visible = true

    const apply = () => {
      try {
        if (visible && !document.hidden) el.unpauseAnimations()
        else el.pauseAnimations()
      } catch {}
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        apply()
      },
      { threshold: 0.01 },
    )
    io.observe(el)

    const onVisibility = () => apply()
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return ref
}
