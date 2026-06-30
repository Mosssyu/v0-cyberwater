"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Box, MapPin, Layers, Activity, Wrench, Cuboid, Boxes, Library, type LucideIcon } from "lucide-react"

const features = [
  { icon: Cuboid, title: "三维实景", desc: "BIM + GIS 二三维一体化建模" },
  { icon: MapPin, title: "空间定位", desc: "设备资产精准空间定位" },
  { icon: Layers, title: "场景联动", desc: "多源数据与三维场景联动" },
  { icon: Activity, title: "模拟推演", desc: "运行工况仿真与推演" },
  { icon: Wrench, title: "孪生运维", desc: "全生命周期孪生运维" },
]

// 右上角主视口轮播场景
const scenes = [
  {
    img: "/products/twin-dashboard.png",
    caption: "数字水厂三维孪生",
    labels: [
      { t: "沉淀池 · 运行正常", x: "30%", y: "58%" },
      { t: "鼓风机房 · 负荷 78%", x: "78%", y: "30%" },
    ],
  },
  {
    img: "/products/cw3dp-pipes.png",
    caption: "地下管网三维透视",
    labels: [
      { t: "DN800 主干管 · 0.42MPa", x: "30%", y: "46%" },
      { t: "阀门节点 · 开度 100%", x: "68%", y: "30%" },
    ],
  },
  {
    img: "/products/cw3dp-pump.png",
    caption: "泵房设备三维拆解",
    labels: [
      { t: "1# 机组 · 1250 m³/h", x: "34%", y: "34%" },
      { t: "电机温度 · 56℃", x: "62%", y: "64%" },
    ],
  },
]

// 仅展示 2 个模块（数字孪生 / 数字孪生模型族库）
type TwinModule = {
  id: string
  label: string
  icon: LucideIcon
  img: string
  desc: string
  features: string[]
  points: string[]
}

const twinModules: TwinModule[] = [
  {
    id: "twin",
    label: "数字孪生",
    icon: Box,
    img: "/products/twin-dashboard.png",
    desc: "面向水厂、泵闸站、河道、管网、防汛等场景，构建高精度三维数字孪生空间，实现全景可视化与仿真推演。",
    features: ["全景可视化", "数据联动", "仿真推演"],
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
    label: "数字孪生模型族库",
    icon: Library,
    img: "/products/cw3dp-modellib.png",
    desc: "沉淀水务模型资产，构建企业级模型族库，实现已发布模型的统一展示、下载与复用。",
    features: ["模型资产", "标准分类", "全生命周期"],
    points: [
      "沉淀水务模型资产，构建企业级模型族库，已发布模型统一展示与下载复用",
      "支持自定义类目管理与 BIM 编码标识，形成标准化模型分类体系",
      "模型上传后自动渲染预览，支持拖拽查看、标签维护与详情管理",
      "支持单模型 / 批量上传、查询筛选、发布下架，实现模型全生命周期管控",
      "配套用户权限和操作日志，保障成果共享可控可追溯",
    ],
  },
]

export function Cw3dpSlide({ active }: { active: boolean }) {
  const [scene, setScene] = useState(0)
  const [showId, setShowId] = useState<string>("twin")

  useEffect(() => {
    if (!active) {
      setScene(0)
      return
    }
    const t = setInterval(() => setScene((s) => (s + 1) % scenes.length), 3200)
    return () => clearInterval(t)
  }, [active])

  const showModule = twinModules.find((m) => m.id === showId) ?? twinModules[0]

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-6 sm:p-8 lg:p-10">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* ===== 顶部：品牌文案 + 主视口 ===== */}
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
            以三维可视化方式呈现水厂、泵站、闸站、河湖等水务对象，支持状态联动与业务场景还原，让厂、网、河、湖全域可感知、可推演、可运维。
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

      {/* ===== 产品示意区：左 模块（2 个）｜ 右 示意图 + 核心能力 ===== */}
      <div className="relative mt-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">产品示意</span>
          <span className="text-[11px] text-muted-foreground">（左侧选择 / 悬停，右侧实时呈现该模块大屏与核心能力）</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)]">
          {/* 左：模块列表（仅 2 个） */}
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-3.5">
            <div className="mb-3 flex items-center gap-1.5">
              <Boxes className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">产品模块 · 2</span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {twinModules.map((m) => {
                const hot = showId === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onMouseEnter={() => setShowId(m.id)}
                    onClick={() => setShowId(m.id)}
                    className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[13px] transition-all duration-300"
                    style={{
                      borderColor: hot ? "oklch(0.7 0.16 250 / 0.6)" : "oklch(0.32 0.03 240 / 0.55)",
                      backgroundColor: hot ? "oklch(0.7 0.16 250 / 0.14)" : "oklch(0.2 0.03 245 / 0.35)",
                      opacity: hot ? 1 : 0.82,
                    }}
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                      style={{ boxShadow: hot ? "0 0 10px -2px oklch(0.7 0.16 250 / 0.7)" : "none" }}
                    >
                      <m.icon className="size-4 text-primary" />
                    </span>
                    <span className="min-w-0 flex-1 font-medium text-foreground/90">{m.label}</span>
                  </button>
                )
              })}
            </div>
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
