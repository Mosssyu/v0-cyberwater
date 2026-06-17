"use client"

import { useEffect } from "react"

/**
 * 滚动入场动画：自动观测 <main> 下的各 section，
 * 进入视口时添加 reveal-in 类，淡入上移。无侵入，无需改动各 section 组件。
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > div[id]"),
    )
    if (targets.length === 0) return

    targets.forEach((el) => el.classList.add("reveal-init"))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
