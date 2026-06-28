"use client"

import { useEffect, useRef } from "react"

type P3 = { x: number; y: number; z: number }

/** 科技蓝 / 青绿主色 */
const COLOR_CORE = { r: 0, g: 240, b: 255 } // #00f0ff
const COLOR_EDGE = { r: 0, g: 255, b: 200 } // 青绿 #00ffc8

/**
 * 纯 Canvas 2D 实现的三维粒子球体神经网络：
 * - Fibonacci 球面均匀分布的发光粒子
 * - 预计算的邻接动态网格连线（数据流脉动）
 * - 呼吸效应（球半径正弦缩放）+ 自发光（shadowBlur / lighter 混合）
 * - 四象限向外延伸的触须粒子，作为业务文本视觉锚点
 * - 鼠标磁性排斥交互
 */
export function ParticleSphere({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ---------- 生成球面粒子（Fibonacci 分布） ----------
    const SPHERE_COUNT = 150
    const sphere: P3[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const y = 1 - (i / (SPHERE_COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      sphere.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })
    }

    // ---------- 预计算邻接连线（基于球面 3D 距离，刚体不变） ----------
    const LINK_DIST = 0.42
    const links: { a: number; b: number; phase: number }[] = []
    for (let i = 0; i < SPHERE_COUNT; i++) {
      for (let j = i + 1; j < SPHERE_COUNT; j++) {
        const dx = sphere[i].x - sphere[j].x
        const dy = sphere[i].y - sphere[j].y
        const dz = sphere[i].z - sphere[j].z
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < LINK_DIST) links.push({ a: i, b: j, phase: Math.random() * Math.PI * 2 })
      }
    }

    // ---------- 四象限延伸触须 ----------
    type Tendril = { dirX: number; dirY: number; spread: number; speed: number; phase: number; len: number }
    const tendrils: Tendril[] = []
    const quadrants = [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]
    for (const [qx, qy] of quadrants) {
      const count = 5
      for (let k = 0; k < count; k++) {
        tendrils.push({
          dirX: qx * (0.55 + Math.random() * 0.5),
          dirY: qy * (0.45 + Math.random() * 0.45),
          spread: 1.05 + k * 0.16,
          speed: 0.0004 + Math.random() * 0.0004,
          phase: Math.random() * Math.PI * 2,
          len: 0.5 + Math.random() * 0.5,
        })
      }
    }

    // ---------- 鼠标 ----------
    const mouse = { x: -9999, y: -9999, active: false }

    function resize() {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }
    container.addEventListener("pointermove", onMove)
    container.addEventListener("pointerleave", onLeave)

    // ---------- 投影缓存 ----------
    const proj = new Array(SPHERE_COUNT)
      .fill(null)
      .map(() => ({ x: 0, y: 0, scale: 0, depth: 0 }))

    let raf = 0
    let t = 0

    function mix(c1: typeof COLOR_CORE, c2: typeof COLOR_EDGE, k: number) {
      return {
        r: Math.round(c1.r + (c2.r - c1.r) * k),
        g: Math.round(c1.g + (c2.g - c1.g) * k),
        b: Math.round(c1.b + (c2.b - c1.b) * k),
      }
    }

    function frame() {
      t += prefersReduced ? 0 : 1
      const time = t * 0.016

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      // 呼吸效应：半径正弦缩放
      const breathe = 1 + Math.sin(time * 0.9) * 0.05
      const baseR = Math.min(width, height) * 0.34 * breathe
      const focal = baseR * 3.2

      // 旋转角度
      const ay = time * 0.18
      const ax = Math.sin(time * 0.25) * 0.35
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)
      const cosX = Math.cos(ax)
      const sinX = Math.sin(ax)

      // 投影所有球面粒子
      for (let i = 0; i < SPHERE_COUNT; i++) {
        const p = sphere[i]
        // 绕 Y
        let x = p.x * cosY - p.z * sinY
        let z = p.x * sinY + p.z * cosY
        let y = p.y
        // 绕 X
        const y2 = y * cosX - z * sinX
        const z2 = y * sinX + z * cosX
        y = y2
        z = z2

        const scale = focal / (focal + z * baseR)
        let sx = cx + x * baseR * scale
        let sy = cy + y * baseR * scale

        // 鼠标磁性排斥
        if (mouse.active) {
          const ddx = sx - mouse.x
          const ddy = sy - mouse.y
          const dist = Math.hypot(ddx, ddy)
          const R = 120
          if (dist < R && dist > 0.001) {
            const force = (1 - dist / R) * 26
            sx += (ddx / dist) * force
            sy += (ddy / dist) * force
          }
        }

        proj[i].x = sx
        proj[i].y = sy
        proj[i].scale = scale
        proj[i].depth = z // -1(近) .. 1(远)
      }

      // ---------- 连线层（lighter 叠加自发光） ----------
      ctx.globalCompositeOperation = "lighter"
      for (let l = 0; l < links.length; l++) {
        const { a, b, phase } = links[l]
        const pa = proj[a]
        const pb = proj[b]
        const avgDepth = (pa.depth + pb.depth) / 2
        // 远端淡出
        const depthAlpha = (1 - (avgDepth + 1) / 2) * 0.55 + 0.08
        // 数据流脉动
        const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 1.6 + phase))
        const alpha = depthAlpha * pulse * 0.5
        if (alpha < 0.02) continue
        const k = (avgDepth + 1) / 2
        const c = mix(COLOR_CORE, COLOR_EDGE, k * 0.6)
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
        ctx.lineWidth = 0.6 + (1 - k) * 0.7
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }

      // ---------- 触须层 ----------
      for (let i = 0; i < tendrils.length; i++) {
        const td = tendrils[i]
        const drift = Math.sin(time * (0.6 + td.speed * 800) + td.phase) * 0.12
        const ex = cx + (td.dirX + drift) * baseR * td.spread
        const ey = cy + (td.dirY - drift) * baseR * td.spread
        // 从球面边缘连向触须末端
        const sxEdge = cx + td.dirX * baseR * 0.92
        const syEdge = cy + td.dirY * baseR * 0.92
        const flow = 0.5 + 0.5 * Math.sin(time * 1.4 + td.phase)
        const grad = ctx.createLinearGradient(sxEdge, syEdge, ex, ey)
        grad.addColorStop(0, `rgba(0,240,255,${0.28 * flow})`)
        grad.addColorStop(1, `rgba(0,255,200,0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(sxEdge, syEdge)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        // 末端发光点
        const dotA = 0.5 * flow
        ctx.fillStyle = `rgba(120,250,255,${dotA})`
        ctx.beginPath()
        ctx.arc(ex, ey, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // ---------- 粒子层 ----------
      for (let i = 0; i < SPHERE_COUNT; i++) {
        const pp = proj[i]
        const k = (pp.depth + 1) / 2 // 0近 1远
        const sizeBase = 1.1 + (1 - k) * 2.2
        const alpha = 0.35 + (1 - k) * 0.6
        const c = mix(COLOR_CORE, COLOR_EDGE, k * 0.5)
        ctx.shadowBlur = 8 + (1 - k) * 10
        ctx.shadowColor = `rgba(${c.r},${c.g},${c.b},0.9)`
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
        ctx.beginPath()
        ctx.arc(pp.x, pp.y, sizeBase, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = "source-over"

      // ---------- 中心辉光 ----------
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.9)
      glow.addColorStop(0, `rgba(0,240,255,${0.16 + Math.sin(time * 0.9) * 0.04})`)
      glow.addColorStop(0.5, "rgba(0,200,220,0.05)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, baseR * 0.9, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = "source-over"

      if (!prefersReduced) raf = requestAnimationFrame(frame)
    }

    frame()
    // 静态模式也渲染一帧
    if (prefersReduced) frame()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
