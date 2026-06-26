"use client"

import { useEffect, useState } from "react"
import { Box, MapPin, Layers, Activity, Wrench, Cuboid } from "lucide-react"

const features = [
  { icon: Cuboid, title: "三维实景", desc: "BIM + GIS 二三维一体化建模" },
  { icon: MapPin, title: "空间定位", desc: "设备资产精准空间定位" },
  { icon: Layers, title: "场景联动", desc: "多源数据与三维场景联动" },
  { icon: Activity, title: "模拟推演", desc: "运行工况仿真与推演" },
  { icon: Wrench, title: "孪生运维", desc: "全生命周期孪生运维" },
]

const scenes = [
  {
    img: "/products/cw3dp-twin.png",
    caption: "数字水厂三维孪生",
    labels: [
      { t: "沉淀池 · 运行正常", x: "22%", y: "38%" },
      { t: "鼓风机房 · 负荷 78%", x: "64%", y: "60%" },
    ],
  },
  {
    img: "/products/cw3dp-pipes.png",
    caption: "地下管网三维透视",
    labels: [
      { t: "DN800 主干管 · 压力 0.42MPa", x: "30%", y: "46%" },
      { t: "阀门节点 · 开度 100%", x: "68%", y: "30%" },
    ],
  },
  {
    img: "/products/cw3dp-pump.png",
    caption: "泵房设备三维拆解",
    labels: [
      { t: "1# 机组 · 流量 1250 m³/h", x: "34%", y: "34%" },
      { t: "电机温度 · 56℃", x: "62%", y: "64%" },
    ],
  },
]

export function Cw3dpSlide({ active }: { active: boolean }) {
  const [scene, setScene] = useState(0)

  useEffect(() => {
    if (!active) {
      setScene(0)
      return
    }
    const t = setInterval(() => setScene((s) => (s + 1) % scenes.length), 3200)
    return () => clearInterval(t)
  }, [active])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
        {/* 左侧文案 + 能力 */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 font-mono text-xs text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            CW-3DP
          </span>
          <h3 className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            三维数字孪生
            <br />
            <span className="text-gradient">空间可视化与仿真推演</span>
          </h3>
          <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
            融合 BIM + GIS 的二三维一体化平台，提供三维实景、空间定位、场景联动与模拟推演，让厂、网、河、湖全域可感知、可推演、可运维。
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5 rounded-xl border border-border bg-card/50 p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="size-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{f.title}</div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧三维视口：场景交叉切换 + 扫描线 */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[oklch(0.1_0.03_245)]">
          <div className="relative aspect-[16/10]">
            {scenes.map((sc, i) => (
              <img
                key={sc.img}
                src={sc.img || "/placeholder.svg"}
                alt={sc.caption}
                className="absolute inset-0 size-full object-cover transition-opacity duration-1000"
                style={{ opacity: scene === i ? 1 : 0 }}
              />
            ))}

            {/* 扫描线 */}
            <div className="twin-scan pointer-events-none absolute inset-0" aria-hidden="true" />

            {/* 标题条 */}
            <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-gradient-to-b from-[oklch(0.1_0.03_245)] to-transparent px-4 py-2.5">
              <Box className="size-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{scenes[scene].caption}</span>
            </div>

            {/* 浮动数据标签 */}
            {scenes[scene].labels.map((l) => (
              <div
                key={l.t}
                className="reveal-focus absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-primary/40 bg-[oklch(0.12_0.03_245/0.85)] px-2 py-1 text-[11px] text-foreground backdrop-blur"
                style={{ left: l.x, top: l.y }}
              >
                <span className="mr-1 inline-block size-1.5 rounded-full bg-primary align-middle shadow-[0_0_6px_2px_oklch(0.7_0.16_250/0.7)]" />
                {l.t}
              </div>
            ))}
          </div>

          {/* 场景指示器 */}
          <div className="flex items-center justify-center gap-2 bg-card/60 py-2.5">
            {scenes.map((sc, i) => (
              <button
                key={sc.img}
                type="button"
                aria-label={sc.caption}
                onClick={() => setScene(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: scene === i ? 24 : 8,
                  backgroundColor: scene === i ? "oklch(0.7 0.16 250)" : "oklch(0.4 0.04 245)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
