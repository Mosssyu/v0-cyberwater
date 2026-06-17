"use client"

import { useEffect, useRef } from "react"

export function ClickRipple() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    function spawn(x: number, y: number) {
      const layerEl = layerRef.current
      if (!layerEl) return
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      layerEl.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true })
      // 兜底清理，防止动画事件未触发时残留
      window.setTimeout(() => ripple.remove(), 1000)
    }

    function onPointerDown(e: PointerEvent) {
      spawn(e.clientX, e.clientY)
    }

    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [])

  return <div ref={layerRef} className="ripple-layer" aria-hidden="true" />
}
