"use client"

import { useEffect, useRef } from "react"

type Photon = { x: number; depth: number; phase: number; size: number; pink: boolean }
type Ripple = { x: number; y: number; born: number }
const TAU = Math.PI * 2

export function LiquidWaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    let width = 0, height = 0, raf = 0, nextDrop = 1200, falling = 0, visible = true, lastFrame = 0
    const photons: Photon[] = [], ripples: Ripple[] = []
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const surfaceY = () => height * (width < 640 ? .52 : .56)
    const impactX = () => width * (width < 640 ? .7 : .74)

    const seedPhotons = () => {
      photons.length = 0
      const step = width < 640 ? 20 : 18, rows = width < 640 ? 16 : 22
      for (let row = 0; row < rows; row++) for (let x = -step; x < width + step; x += step) {
        const n = Math.sin((x + 17) * 91.17 + row * 37.41) * 43758.5453
        const r = n - Math.floor(n)
        photons.push({ x: x + (r - .5) * step * .7, depth: row / (rows - 1), phase: r * TAU, size: .45 + r * 1.35, pink: (r + row * .07) % 1 > .79 })
      }
    }
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.25)
      width = canvas.clientWidth; height = canvas.clientHeight
      canvas.width = Math.max(1, width * dpr); canvas.height = Math.max(1, height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); seedPhotons()
    }
    const rippleOffset = (x: number, y: number, time: number) => {
      const r = ripples[0]
      if (!r) return 0
      const age = (time - r.born) / 1000, radius = age * Math.min(width, 920) * .24
      const distance = Math.hypot(x - r.x, (y - r.y) * 1.75)
      const delta = distance - radius
      if (Math.abs(delta) > 58) return 0
      return Math.sin(distance * .12 - age * 8.5) * Math.exp(-(delta * delta) / 484) * 24
    }

    const drawWord = (time: number) => {
      const text = "CYBERWATER", fs = Math.min(width * (width < 640 ? .115 : .102), 150)
      ctx.save(); ctx.font = `600 ${fs}px Arial, sans-serif`; ctx.textBaseline = "middle"; ctx.globalCompositeOperation = "lighter"
      const total = ctx.measureText(text).width
      let x = Math.min(width < 640 ? width * .08 : width * .39, width * .96 - total)
      const y = surfaceY() - fs * .08
      const wordGradient = ctx.createLinearGradient(0, y - fs, 0, y + fs)
      wordGradient.addColorStop(0, "rgba(210,248,255,.22)"); wordGradient.addColorStop(.47, "rgba(83,220,255,.48)")
      wordGradient.addColorStop(.68, "rgba(255,76,190,.24)"); wordGradient.addColorStop(1, "rgba(30,70,100,.05)")
      ctx.fillStyle = wordGradient; ctx.shadowColor = "rgba(84,221,255,.45)"; ctx.shadowBlur = 16
      for (const letter of text) {
        const w = ctx.measureText(letter).width, cx = x + w / 2, dy = rippleOffset(cx, y, time)
        ctx.save(); ctx.translate(cx, y + dy * .62); ctx.rotate(dy * .0009); ctx.transform(1, dy * .0018, dy * .0007, 1, 0, 0); ctx.fillText(letter, -w / 2, 0); ctx.restore(); x += w
      }
      ctx.restore()
    }
    const drawPhotons = (time: number) => {
      const base = surfaceY(); ctx.save(); ctx.globalCompositeOperation = "lighter"
      const cyan = new Path2D(), pink = new Path2D()
      for (const p of photons) {
        const depth = Math.pow(p.depth, 1.5)
        const y = base + depth * height * .48 + Math.sin(p.x * .018 + time * .0007 + p.phase) * (4 + depth * 13) + Math.sin(p.x * .006 - time * .00042) * 10
        const py = y + (p.depth < .72 ? rippleOffset(p.x, y, time) * (1 - p.depth * .45) : 0)
        const path = p.pink ? pink : cyan
        path.moveTo(p.x + p.size, py); path.arc(p.x, py, p.size * (1.15 - p.depth * .35), 0, TAU)
      }
      ctx.fillStyle = "rgba(89,220,255,.62)"; ctx.fill(cyan)
      ctx.fillStyle = "rgba(255,76,190,.44)"; ctx.fill(pink)
      ctx.restore()
    }
    const drawRings = (time: number) => {
      ctx.save(); ctx.globalCompositeOperation = "lighter"
      for (const r of ripples) {
        const age = (time - r.born) / 1000, radius = age * Math.min(width, 920) * .24, alpha = Math.max(0, 1 - age / 3.1)
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(r.x, r.y, radius + i * 17, (radius + i * 17) * .2, 0, 0, TAU); ctx.strokeStyle = i % 2 ? `rgba(255,70,192,${alpha * .14})` : `rgba(84,222,255,${alpha * .34})`; ctx.lineWidth = .8 + (4 - i) * .32; ctx.shadowColor = i % 2 ? "#ff4fc1" : "#67e7ff"; ctx.shadowBlur = 10; ctx.stroke() }
      }
      ctx.restore()
    }
    const drawDrop = (time: number) => {
      if (!falling) return
      const progress = Math.min(1, (time - falling) / 760), x = impactX(), end = surfaceY() - 3, y = -30 + (end + 30) * progress * progress, radius = 2.5 + progress * 2.2
      ctx.save(); ctx.globalCompositeOperation = "lighter"; const g = ctx.createRadialGradient(x - 1, y - 2, 0, x, y, radius * 5)
      g.addColorStop(0, "#fff"); g.addColorStop(.18, "rgba(95,231,255,.9)"); g.addColorStop(.5, "rgba(80,122,255,.34)"); g.addColorStop(1, "rgba(48,190,255,0)")
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, radius * 2.6, radius * 5, 0, 0, TAU); ctx.fill(); ctx.restore()
      if (progress >= 1) { ripples.push({ x, y: end, born: time }); falling = 0; nextDrop = time + 3900 }
    }
    const draw = (time: number) => {
      if (!visible) { raf = 0; return }
      if (time - lastFrame < 40) { raf = requestAnimationFrame(draw); return }
      lastFrame = time
      ctx.clearRect(0, 0, width, height)
      const glow = ctx.createRadialGradient(impactX(), surfaceY(), 0, impactX(), surfaceY(), width * .65); glow.addColorStop(0, "rgba(32,104,142,.16)"); glow.addColorStop(.45, "rgba(35,20,66,.07)"); glow.addColorStop(1, "transparent"); ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height)
      drawWord(time); drawPhotons(time); drawRings(time); drawDrop(time)
      while (ripples.length && time - ripples[0].born > 3300) ripples.shift()
      if (!falling && time >= nextDrop && !reduced.matches) falling = time
      if (!reduced.matches) raf = requestAnimationFrame(draw)
    }
    const resume = () => { visible = document.visibilityState === "visible"; if (visible && !raf) raf = requestAnimationFrame(draw) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && document.visibilityState === "visible"; if (visible && !raf) raf = requestAnimationFrame(draw) })
    observer.observe(canvas); resize(); draw(0); addEventListener("resize", resize); document.addEventListener("visibilitychange", resume)
    return () => { observer.disconnect(); cancelAnimationFrame(raf); removeEventListener("resize", resize); document.removeEventListener("visibilitychange", resume) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
}
