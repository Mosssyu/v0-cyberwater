"use client"

import { useEffect, useRef } from "react"

type P3 = { x: number; y: number; z: number }

/** 科技蓝 / 青绿主色 */
const COLOR_CORE = { r: 0, g: 240, b: 255 } // #00f0ff
const COLOR_EDGE = { r: 0, g: 255, b: 200 } // 青绿 #00ffc8

function mix(c1: typeof COLOR_CORE, c2: typeof COLOR_EDGE, k: number) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * k),
    g: Math.round(c1.g + (c2.g - c1.g) * k),
    b: Math.round(c1.b + (c2.b - c1.b) * k),
  }
}

/**
 * 纯 Canvas 2D 三维粒子球体神经网络（性能优化版）：
 * - 预渲染发光贴图（drawImage 替代逐帧 shadowBlur，去除主要卡顿源）
 * - 预渲染中心辉光贴图 + 缓存渐变，避免逐帧 createGradient
 * - 帧率上限 30fps，动画以真实时间驱动，降低 CPU 占用
 * - IntersectionObserver 离屏自动暂停，滚动后不再空转
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
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)

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

    // ---------- 预渲染发光贴图（按深度分 5 档配色，避免逐帧 shadowBlur） ----------
    const SPRITE_SIZE = 32
    function makeGlowSprite(color: { r: number; g: number; b: number }) {
      const c = document.createElement("canvas")
      c.width = SPRITE_SIZE
      c.height = SPRITE_SIZE
      const g = c.getContext("2d")!
      const r = SPRITE_SIZE / 2
      const grad = g.createRadialGradient(r, r, 0, r, r, r)
      grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},1)`)
      grad.addColorStop(0.3, `rgba(${color.r},${color.g},${color.b},0.55)`)
      grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`)
      g.fillStyle = grad
      g.beginPath()
      g.arc(r, r, r, 0, Math.PI * 2)
      g.fill()
      return c
    }
    const BUCKETS = 5
    const glowSprites: HTMLCanvasElement[] = []
    for (let b = 0; b < BUCKETS; b++) {
      const k = b / (BUCKETS - 1)
      glowSprites.push(makeGlowSprite(mix(COLOR_CORE, COLOR_EDGE, k * 0.5)))
    }
    // 触须末端光点贴图
    const dotSprite = makeGlowSprite({ r: 120, g: 250, b: 255 })

    // ---------- 预渲染中心辉光贴图 ----------
    const CENTER_SIZE = 256
    const centerGlow = (() => {
      const c = document.createElement("canvas")
      c.width = CENTER_SIZE
      c.height = CENTER_SIZE
      const g = c.getContext("2d")!
      const r = CENTER_SIZE / 2
      const grad = g.createRadialGradient(r, r, 0, r, r, r)
      grad.addColorStop(0, "rgba(0,240,255,1)")
      grad.addColorStop(0.5, "rgba(0,200,220,0.3)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      g.fillStyle = grad
      g.beginPath()
      g.arc(r, r, r, 0, Math.PI * 2)
      g.fill()
      return c
    })()

    // ---------- 鼠标 ----------
    const mouse = { x: -9999, y: -9999, active: false }

    function resize() {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
    const proj = new Array(SPHERE_COUNT).fill(null).map(() => ({ x: 0, y: 0, scale: 0, depth: 0 }))

    function render(time: number) {
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
        const x = p.x * cosY - p.z * sinY
        const z = p.x * sinY + p.z * cosY
        let y = p.y
        // 绕 X
        const y2 = y * cosX - z * sinX
        const z2 = y * sinX + z * cosX
        y = y2
        const zz = z2

        const scale = focal / (focal + zz * baseR)
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
        proj[i].depth = zz // -1(近) .. 1(远)
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

      // ---------- 触须层（固定色描边 + 光点贴图，去除逐帧渐变） ----------
      for (let i = 0; i < tendrils.length; i++) {
        const td = tendrils[i]
        const drift = Math.sin(time * (0.6 + td.speed * 800) + td.phase) * 0.12
        const ex = cx + (td.dirX + drift) * baseR * td.spread
        const ey = cy + (td.dirY - drift) * baseR * td.spread
        const sxEdge = cx + td.dirX * baseR * 0.92
        const syEdge = cy + td.dirY * baseR * 0.92
        const flow = 0.5 + 0.5 * Math.sin(time * 1.4 + td.phase)
        ctx.strokeStyle = `rgba(0,240,255,${0.2 * flow})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(sxEdge, syEdge)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        // 末端发光点（贴图）
        const dr = 5
        ctx.globalAlpha = 0.6 * flow
        ctx.drawImage(dotSprite, ex - dr, ey - dr, dr * 2, dr * 2)
        ctx.globalAlpha = 1
      }

      // ---------- 粒子层（发光贴图替代 shadowBlur） ----------
      for (let i = 0; i < SPHERE_COUNT; i++) {
        const pp = proj[i]
        const k = (pp.depth + 1) / 2 // 0近 1远
        const sizeBase = 1.1 + (1 - k) * 2.2
        const alpha = 0.35 + (1 - k) * 0.6
        const drawR = sizeBase * 3.2
        const bucket = Math.min(BUCKETS - 1, Math.max(0, Math.round(k * (BUCKETS - 1))))
        ctx.globalAlpha = alpha
        ctx.drawImage(glowSprites[bucket], pp.x - drawR, pp.y - drawR, drawR * 2, drawR * 2)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"

      // ---------- 中心辉光（贴图缩放，呼吸调制透明度） ----------
      const gr = baseR * 0.9
      ctx.globalCompositeOperation = "lighter"
      ctx.globalAlpha = 0.16 + Math.sin(time * 0.9) * 0.04
      ctx.drawImage(centerGlow, cx - gr, cy - gr, gr * 2, gr * 2)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"
    }

    // ---------- 帧率上限 + 真实时间驱动 + 离屏暂停 ----------
    let raf = 0
    let running = false
    const startTime = performance.now()
    let last = startTime
    const FRAME_MS = 1000 / 30 // 上限 30fps

    function computeTime(now: number) {
      // 保持与旧版一致的动画速度（原 60fps 下 time ≈ 0.96 * 秒）
      return ((now - startTime) / 1000) * 0.96
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop)
      const dt = now - last
      if (dt < FRAME_MS) return
      last = now - (dt % FRAME_MS)
      render(computeTime(now))
    }

    function start() {
      if (running || prefersReduced) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    // 首帧渲染（静态也可见）
    render(computeTime(performance.now()))

    // 离屏暂停
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start()
        else stop()
      },
      { threshold: 0.01 },
    )
    io.observe(container)

    // 标签页隐藏时暂停
    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
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
