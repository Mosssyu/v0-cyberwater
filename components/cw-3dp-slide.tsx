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
    img: "/products/cw3dp-twin-city.png",
    caption: "城市级水务全域孪生",
    labels: [
      { t: "水厂 · 12.8 万m³/日", x: "34%", y: "26%" },
      { t: "闸坝 · 水位 4.21m", x: "62%", y: "62%" },
    ],
  },
  {
    id: "plant",
    mode: "数字水厂",
    img: "/products/twin-dashboard.png",
    caption: "数字水厂三维孪生",
    labels: [
      { t: "沉淀池 · 运行正常", x: "30%", y: "58%" },
      { t: "鼓风机房 · 负荷 78%", x: "78%", y: "30%" },
    ],
  },
  {
    id: "pipe",
    mode: "管网透视",
    img: "/products/cw3dp-pipes.png",
    caption: "地下管网三维透视",
    labels: [
      { t: "DN800 主干管 · 0.42MPa", x: "30%", y: "46%" },
      { t: "阀门节点 · 开度 100%", x: "68%", y: "30%" },
    ],
  },
  {
    id: "device",
    mode: "设备拆解",
    img: "/products/cw3dp-pump.png",
    caption: "泵房设备三维拆解",
    labels: [
      { t: "1# 机组 · 1250 m³/h", x: "34%", y: "34%" },
      { t: "电机温度 · 56℃", x: "62%", y: "64%" },
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
      "面向水厂、泵闸站、河道、管网、防汛等场景，构建高精度三维数字孪生空间",
      "融合 BIM/GIS、三维建模、实时数据、视频监控与 AI 仿真模型，实现全景可视化呈现",
      "支持设备运行、水质水量、能耗药耗、告警事件等多源数据与三维模型联动",
      "直观展示工艺流程、管线流向、泵组启停、阀门开度、液位变化等运行过程",
      "结合机理模型、大数据模型与 AI 算法，支撑运行分析、能耗优化、风险预警和调度推演",
      "联动巡检、维修、工单、告警等业务，实现异常定位、过程跟踪和闭环处置",
      "支持工艺讲解、设备展示、AI 问答、仿真推演和运营大屏展示",
      "打造可看、可查、可管、可控、可预测、可推演的水务三维孪生底座",
    ],
  },
  {
    id: "modellib",
    label: "模型族库",
    code: "MODEL-LIB",
    img: "/products/cw3dp-modellib-screen.png",
    points: [
      "沉淀水务模型资产，构建企业级模型族库，已发布模型统一展示与下载复用",
      "支持自定义类目管理与 BIM 编码标识，形成标准化模型分类体系",
      "模型上传后自动渲染预览，支持拖拽查看、标签维护与详情管理",
      "支持单模型 / 批量上传、查询筛选、发布下架，实现模型全生命周期管控",
      "配套用户权限和操作日志，保障成果共享可控可追溯",
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

        <div className="grid gap-5 lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)]">
          {/* 左：两个产品标签卡片 */}
          <div className="flex h-full flex-col gap-3">
            {twinModules.map((m) => {
              const hot = showId === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => setShowId(m.id)}
                  onClick={() => setShowId(m.id)}
                  aria-pressed={hot}
                  className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300"
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
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-shadow"
                      style={{ boxShadow: hot ? "0 0 12px -2px oklch(0.7 0.16 250 / 0.7)" : "none" }}
                    >
                      {m.id === "twin" ? <Box className="size-5" /> : <Library className="size-5" />}
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground">CW-3DP · {m.code}</span>
                  </div>
                  <span className="mt-3 text-lg font-bold tracking-tight text-foreground">{m.label}</span>
                </button>
              )
            })}
          </div>

          {/* 右：模块大屏示意图 + 核心能力 */}
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
