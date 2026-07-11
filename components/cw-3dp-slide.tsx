"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Box, MapPin, Layers, Activity, Wrench, Cuboid, Library } from "lucide-react"

// 顶部能力标签
const tags = [
  { icon: Cuboid, label: "三维实景" },
  { icon: MapPin, label: "BIM + GIS" },
  { icon: Layers, label: "场景联动" },
  { icon: Activity, label: "仿真推演" },
  { icon: Wrench, label: "孪生运维" },
]

// 三维不同呈现方式（手动切换，无自动轮播）
type Presentation = {
  id: string
  mode: string
  img: string
  caption: string
  scene: string
  stats: { k: string; v: string; u?: string }[]
}

const presentations: Presentation[] = [
  {
    id: "city",
    mode: "城市级孪生",
    img: "/products/cw3dp-city-river.png",
    caption: "城市级水务全域孪生",
    scene: "CITY · DIGITAL TWIN",
    stats: [
      { k: "处理水量", v: "12.8", u: "万m³/日" },
      { k: "水质指数", v: "89.7", u: "优" },
      { k: "管网健康", v: "92", u: "%" },
    ],
  },
  {
    id: "plant",
    mode: "数字水厂",
    img: "/products/cw3dp-water-plant.png",
    caption: "数字水厂三维孪生",
    scene: "PLANT · DIGITAL TWIN",
    stats: [
      { k: "出水浊度", v: "0.32", u: "NTU" },
      { k: "实时能耗", v: "256", u: "MWh" },
      { k: "工艺状态", v: "正常", u: "" },
    ],
  },
  {
    id: "pipe",
    mode: "管网透视",
    img: "/products/cw3dp-pipeline-new.png",
    caption: "地下管网三维透视",
    scene: "PIPELINE · PERSPECTIVE",
    stats: [
      { k: "供水压力", v: "0.35", u: "MPa" },
      { k: "实时流量", v: "12,845", u: "m³/h" },
      { k: "漏损风险", v: "中", u: "" },
    ],
  },
  {
    id: "device",
    mode: "设备拆解",
    img: "/products/cw3dp-pump-new.png",
    caption: "泵房设备三维拆解",
    scene: "DEVICE · EXPLODED",
    stats: [
      { k: "机组流量", v: "12.8", u: "万m³/日" },
      { k: "扬程", v: "42.1", u: "m" },
      { k: "振动值", v: "0.32", u: "mm/s" },
    ],
  },
]

// 仅展示 2 个产品模块（数字孪生 / 模型族库）
type TwinModule = {
  id: string
  label: string
  code: string
  img: string
  points: string[]
}

const twinModules: TwinModule[] = [
  {
    id: "twin",
    label: "数字孪生",
    code: "TWIN-3D",
    img: "/products/cw3dp-twin-city.png",
    points: [
      "汇聚生产运行、视频监控、安防告警与人员定位等多源数据，拓展数据空间属性",
      "支持工艺流程走向、设备实时状态、管线流向联动，配电控制回路的三维可视化管理",
      "深度融合 AI 与水力水质仿真模型，支撑突发事件的预测预警与动态推演",
      "BIM+GIS 服务集成，支持从泵站到厂网到流域不同规模场景的孪生",
      "支持 C/S 端、私有化与云端多形态部署，无需复杂安装，网页多端即开即看",
      "内置 AI 智能助手，一句话全量操控三维底座，涵盖场景导览、数据查找与业务调度",
    ],
  },
  {
    id: "modellib",
    label: "模型族库",
    code: "MODEL-LIB",
    img: "/products/cw3dp-modellib-screen.png",
    points: [
      "整合 150+ 模型类型与 1000+ 模型资产，构建企业级专属族库，支持统一展示与复用",
      "内建严谨模型规则与专属模型编码，结合 BIM 标识支持自定义类目，形成标准化分类",
      "支持 360° 拖拽式三维预览，全景展示材质、法线、UV、面数、动画及尺寸等模型详情",
      "支持单件 / 批量上传、条件检索与规范的发布下架审核，实现模型全生命周期闭环管理",
      "内置精细化用户权限体系与全链路操作日志，保障模型成果共享过程安全可控",
    ],
  },
]

export function Cw3dpSlide() {
  const [viewId, setViewId] = useState<string>("city")
  const [showId, setShowId] = useState<string>("twin")
  const [viewPaused, setViewPaused] = useState(false)
  const [showPaused, setShowPaused] = useState(false)

  // 顶部三维场景自动轮播（悬停暂停）
  useEffect(() => {
    if (viewPaused) return
    const t = setInterval(() => {
      setViewId((cur) => {
        const idx = presentations.findIndex((p) => p.id === cur)
        return presentations[(idx + 1) % presentations.length].id
      })
    }, 3800)
    return () => clearInterval(t)
  }, [viewPaused])

  // 底部产品模块自动轮播（悬停暂停）
  useEffect(() => {
    if (showPaused) return
    const t = setInterval(() => {
      setShowId((cur) => {
        const idx = twinModules.findIndex((m) => m.id === cur)
        return twinModules[(idx + 1) % twinModules.length].id
      })
    }, 5000)
    return () => clearInterval(t)
  }, [showPaused])

  const view = presentations.find((p) => p.id === viewId) ?? presentations[0]
  const showModule = twinModules.find((m) => m.id === showId) ?? twinModules[0]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* ===== 顶部：沉浸式三维数字孪生主视觉（文字/HUD 叠加在三维空间中） ===== */}
      <div
        className="relative min-h-[460px] overflow-hidden rounded-2xl border border-primary/25 sm:min-h-[520px] lg:min-h-[560px]"
        onMouseEnter={() => setViewPaused(true)}
        onMouseLeave={() => setViewPaused(false)}
      >
        {/* 三维场景背景（全铺） */}
        <AnimatePresence mode="wait">
          <motion.img
            key={view.id}
            src={view.img || "/placeholder.svg"}
            alt={view.caption}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>

        {/* 深蓝叠色 + 体积光 + 网格 + 扫描线 */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.1 0.04 250 / 0.92) 0%, oklch(0.1 0.04 250 / 0.55) 34%, transparent 62%), linear-gradient(0deg, oklch(0.09 0.035 250 / 0.9) 0%, transparent 46%)",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="twin-scan pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* HUD 边角描边 */}
        <div className="pointer-events-none absolute inset-3 rounded-xl border border-primary/15" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-3 top-3 size-8 rounded-tl-xl border-l-2 border-t-2 border-primary/70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-3 top-3 size-8 rounded-tr-xl border-r-2 border-t-2 border-primary/70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-3 left-3 size-8 rounded-bl-xl border-b-2 border-l-2 border-primary/70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-3 right-3 size-8 rounded-br-xl border-b-2 border-r-2 border-primary/70"
          aria-hidden="true"
        />

        {/* 场景编码（顶部漂浮 HUD） */}
        <div className="absolute left-6 top-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-[oklch(0.1_0.04_250/0.55)] px-3 py-1 font-mono text-xs text-primary backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_2px_oklch(0.7_0.16_250/0.8)]" />
            CW-Visual
          </span>
          <span className="hidden font-mono text-[11px] tracking-widest text-primary/70 sm:inline">{view.scene}</span>
        </div>

        {/* 左侧：主标题 + 说明 + 能力标签（直接叠加在三维空间上） */}
        <div className="absolute inset-x-6 bottom-24 max-w-md sm:bottom-20 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
          <h3 className="text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-gradient drop-shadow-[0_2px_20px_oklch(0.6_0.16_250/0.5)]">三维数字孪生</span>
          </h3>
          <p className="mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-foreground/85 drop-shadow-[0_1px_8px_oklch(0.1_0.04_250/0.9)] sm:text-[15px]">
            以三维可视化方式呈现水厂、泵站、闸站、河湖等水务对象，支持状态联动与业务场景还原。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[oklch(0.1_0.04_250/0.5)] px-3 py-1.5 text-[12px] text-foreground/90 backdrop-blur-md"
              >
                <t.icon className="size-3.5 text-primary" />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧：漂浮式数据 HUD 浮窗 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view.id + "-hud"}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute right-6 top-16 hidden w-52 flex-col gap-3 md:flex"
          >
            <div className="rounded-xl border border-primary/35 bg-[oklch(0.1_0.045_250/0.55)] p-3.5 shadow-[0_0_24px_-6px_oklch(0.5_0.16_250/0.6)] backdrop-blur-md">
              <div className="mb-2.5 flex items-center gap-1.5 border-b border-primary/20 pb-2">
                <Box className="size-3.5 text-primary" />
                <span className="text-[12px] font-medium text-foreground">{view.caption}</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {view.stats.map((s) => (
                  <li key={s.k} className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] text-foreground/60">{s.k}</span>
                    <span className="font-mono text-sm font-semibold text-primary">
                      {s.v}
                      {s.u ? <span className="ml-0.5 text-[10px] font-normal text-foreground/50">{s.u}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/25 bg-[oklch(0.1_0.045_250/0.45)] py-1.5 font-mono text-[10px] tracking-widest text-primary/70 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              REAL-TIME SYNC
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 底部：三维场景切换（漂浮 HUD 芯片） */}
        <div className="absolute inset-x-0 bottom-5 flex flex-wrap items-center justify-center gap-2 px-4">
          {presentations.map((p) => {
            const on = viewId === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setViewId(p.id)}
                aria-pressed={on}
                className="rounded-lg border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: on ? "oklch(0.63 0.17 250)" : "oklch(0.6 0.08 245 / 0.3)",
                  backgroundColor: on ? "oklch(0.63 0.17 250)" : "oklch(0.12 0.04 250 / 0.45)",
                  color: on ? "oklch(0.98 0.01 240)" : "oklch(0.72 0.04 240)",
                  boxShadow: on ? "0 0 18px -3px oklch(0.63 0.17 250 / 0.85)" : "none",
                }}
              >
                {p.mode}
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== 产品模块区：左 两个产品标签 ｜ 右 示意图 + 核心能力 ===== */}
      <div
        className="relative mt-8"
        onMouseEnter={() => setShowPaused(true)}
        onMouseLeave={() => setShowPaused(false)}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">产品模块</span>
          <span className="text-[11px] text-muted-foreground">（选择上侧产品，下侧实时呈现大屏与核心能力）</span>
        </div>

        <div className="flex flex-col gap-5">
          {/* 上：两个产品标签卡片，横向铺开 */}
          <div className="grid gap-4 sm:grid-cols-2">
            {twinModules.map((m) => {
              const hot = showId === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => setShowId(m.id)}
                  onClick={() => setShowId(m.id)}
                  aria-pressed={hot}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300"
                  style={{
                    borderColor: hot ? "oklch(0.63 0.17 250)" : "oklch(0.32 0.03 240 / 0.55)",
                    backgroundColor: hot ? "oklch(0.63 0.17 250 / 0.16)" : "oklch(0.2 0.03 245 / 0.4)",
                    boxShadow: hot ? "0 0 22px -6px oklch(0.63 0.17 250 / 0.75)" : "none",
                  }}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(0.7 0.16 250 / 0.7), transparent)",
                      opacity: hot ? 1 : 0,
                    }}
                  />
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-shadow"
                    style={{ boxShadow: hot ? "0 0 12px -2px oklch(0.7 0.16 250 / 0.7)" : "none" }}
                  >
                    {m.id === "twin" ? <Box className="size-5" /> : <Library className="size-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-semibold text-primary">CW-Visual · {m.code}</span>
                    <span className="mt-1 block text-lg font-bold tracking-tight text-foreground">{m.label}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* 下：模块大屏示意图 + 核心能力 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showModule.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40"
            >
              {/* 上：大屏示意图 */}
              <div className="relative aspect-video w-full overflow-hidden" style={{ background: "oklch(0.12 0.025 248)" }}>
                <img
                  src={showModule.img || "/placeholder.svg"}
                  alt={`${showModule.label}产品大屏示意`}
                  className="size-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background: "radial-gradient(120% 120% at 50% 50%, transparent 64%, oklch(0.1 0.025 248 / 0.5) 100%)",
                  }}
                />
              </div>

              {/* 下：核心能力（双列） */}
              <div className="flex flex-col border-t border-border p-5">
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="h-3 w-0.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-foreground/90">核心能力</span>
                </div>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {showModule.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[12px] leading-relaxed">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-[2px] bg-primary" aria-hidden="true" />
                      <span className="text-pretty text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
