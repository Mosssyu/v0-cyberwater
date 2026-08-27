"use client"

import { useEffect, useRef } from "react"

type Drop = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
}

export function LiquidWaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    let width = 0
    let height = 0
    let animationFrame = 0
    let visible = true
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const drops: Drop[] = []

    const makeDrops = () => {
      drops.length = 0
      const count = Math.min(72, Math.max(28, Math.round(width / 22)))
      for (let index = 0; index < count; index += 1) {
        drops.push({
          x: Math.random() * width,
          y: height * (0.48 + Math.random() * 0.48),
          radius: 0.7 + Math.random() * 3.7,
          speed: 0.08 + Math.random() * 0.24,
          drift: (Math.random() - 0.5) * 0.1,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      makeDrops()
    }

    const waterY = (x: number, time: number) => {
      const main = Math.sin(x * 0.0055 + time * 0.00055) * height * 0.045
      const detail = Math.sin(x * 0.013 - time * 0.00032 + 1.4) * height * 0.018
      return height * 0.54 + main + detail
    }

    const draw = (time: number) => {
      if (!visible) return
      context.clearRect(0, 0, width, height)

      const water = new Path2D()
      water.moveTo(0, waterY(0, time))
      for (let x = 0; x <= width + 8; x += 8) water.lineTo(x, waterY(x, time))
      water.lineTo(width, height)
      water.lineTo(0, height)
      water.closePath()

      const fill = context.createLinearGradient(0, height * 0.44, 0, height)
      fill.addColorStop(0, "rgba(226, 239, 245, 0.76)")
      fill.addColorStop(0.05, "rgba(109, 136, 150, 0.5)")
      fill.addColorStop(0.2, "rgba(19, 29, 36, 0.92)")
      fill.addColorStop(1, "rgba(2, 5, 8, 0.99)")
      context.fillStyle = fill
      context.fill(water)

      context.save()
      context.clip(water)
      const reflection = context.createLinearGradient(0, 0, width, height)
      reflection.addColorStop(0, "rgba(255,255,255,0.03)")
      reflection.addColorStop(0.43, "rgba(255,255,255,0.16)")
      reflection.addColorStop(0.6, "rgba(255,255,255,0.02)")
      reflection.addColorStop(1, "rgba(255,255,255,0.08)")
      context.fillStyle = reflection
      context.fillRect(0, height * 0.42, width, height)

      for (const drop of drops) {
        drop.y -= drop.speed
        drop.x += drop.drift
        if (drop.y < waterY(drop.x, time) + 12) {
          drop.y = height * (0.78 + Math.random() * 0.2)
          drop.x = Math.random() * width
        }
        const pulse = 0.75 + Math.sin(time * 0.001 + drop.phase) * 0.25
        const orb = context.createRadialGradient(
          drop.x - drop.radius * 0.35,
          drop.y - drop.radius * 0.35,
          0,
          drop.x,
          drop.y,
          drop.radius * 2.4,
        )
        orb.addColorStop(0, `rgba(255,255,255,${0.62 * pulse})`)
        orb.addColorStop(0.28, `rgba(160,205,225,${0.28 * pulse})`)
        orb.addColorStop(0.62, "rgba(10,18,23,0.18)")
        orb.addColorStop(1, "rgba(0,0,0,0)")
        context.fillStyle = orb
        context.beginPath()
        context.arc(drop.x, drop.y, drop.radius * 2.4, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()

      context.beginPath()
      for (let x = 0; x <= width + 4; x += 4) {
        const y = waterY(x, time)
        if (x === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = "rgba(239, 249, 252, 0.72)"
      context.lineWidth = 1.25
      context.shadowColor = "rgba(174, 231, 247, 0.6)"
      context.shadowBlur = 14
      context.stroke()
      context.shadowBlur = 0

      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      visible = document.visibilityState === "visible"
      if (visible && !animationFrame) animationFrame = window.requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible"
      if (visible) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = window.requestAnimationFrame(draw)
      }
    })
    observer.observe(canvas)
    resize()
    draw(0)
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
}
