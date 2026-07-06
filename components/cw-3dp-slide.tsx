"use client"

import { useState } from "react"
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
const presentations = [
  {
    id: "city",
    mode: "城市级孪生",
    img: "/products/cw3dp-city-river.png",
    caption: "城市级水务全域孪生",
    labels: [],
  },
  {
    id: "plant",
    mode: "数字水厂",
    img: "/products/cw3dp-water-plant.png",
    caption: "数字水厂三维孪生",
    labels: [],
  },
  {
    id: "pipe",
    mode: "管网透视",
    img: "/products/cw3dp-pipeline-new.png",
    caption: "地下管网三维透视",
    labels: [],
  },
  {
    id: "device",
    mode: "设备拆解",
    img: "/products/cw3dp-pump-new.png",
    caption: "泵房设备三维拆解",
    labels: [],
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

  const view = presentations.find((p) => p.id === viewId) ?? presentations[0]
  const showModule = twinModules.find((m) => m.id === showId) ?? twinModules[0]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* ===== 顶部：品牌文案 + 三维呈现视口 ===== */}
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
        {/* 左侧文案 + 标签 */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 font-mono text-xs text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            CW-3DP
          </span>
          <h3 className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            <span className="text-gradient">三维数字孪生</span>
          </h3>
          <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
            以三维可视化方式呈现水厂、泵站、闸站、河湖等水务对象，支持状态联动与业务场景还原。
          </p>

          {/* 能力标签 */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-[13px] text-foreground/90"
              >
                <t.icon className="size-3.5 text-primary" />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧三维视口：多种三维呈现，手动切换 */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[oklch(0.1_0.03_245)]">
          <div className="relative aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.img
                key={view.id}
                src={view.img || "/placeholder.svg"}
                alt={view.caption}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>

            {/* 扫描线 */}
            <div className="twin-scan pointer-events-none absolute inset-0" aria-hidden="true" />

            {/* 标题条 */}
            <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-gradient-to-b from-[oklch(0.1_0.03_245)] to-transparent px-4 py-2.5">
              <Box className="size-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{view.caption}</span>
            </div>

            {/* 浮动数据标签 */}
            {view.labels.map((l) => (
              <div
                key={l.t}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-primary/40 bg-[oklch(0.12_0.03_245/0.85)] px-2 py-1 text-[11px] text-foreground backdrop-blur"
                style={{ left: l.x, top: l.y }}
              >
                <span className="mr-1 inline-block size-1.5 rounded-full bg-primary align-middle shadow-[0_0_6px_2px_oklch(0.7_0.16_250/0.7)]" />
                {l.t}
              </div>
            ))}
          </div>

          {/* 三维呈现方式切换（手动） */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-card/60 px-3 py-2.5">
            {presentations.map((p) => {
              const on = viewId === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setViewId(p.id)}
                  aria-pressed={on}
                  className="rounded-md border px-3 py-1 text-xs font-medium transition-all duration-300"
                  style={{
                    borderColor: on ? "oklch(0.7 0.16 250 / 0.6)" : "oklch(0.32 0.03 240 / 0.55)",
                    backgroundColor: on ? "oklch(0.7 0.16 250 / 0.16)" : "transparent",
                    color: on ? "oklch(0.92 0.04 240)" : "oklch(0.62 0.03 240)",
                  }}
                >
                  {p.mode}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ===== 产品模块区：左 两个产品标签 ｜ 右 示意图 + 核心能力 ===== */}
      <div className="relative mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">产品模块</span>
          <span className="text-[11px] text-muted-foreground">（选择左侧产品，右侧实时呈现大屏与核心能力）</span>
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
                    borderColor: hot ? "oklch(0.7 0.16 250 / 0.6)" : "oklch(0.32 0.03 240 / 0.55)",
                    backgroundColor: hot ? "oklch(0.7 0.16 250 / 0.12)" : "oklch(0.2 0.03 245 / 0.4)",
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
                    <span className="block font-mono text-xs font-semibold text-primary">CW-3DP · {m.code}</span>
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
