"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Activity,
  Bot,
  Box,
  BrainCircuit,
  Cuboid,
  Database,
  Globe2,
  Layers,
  Library,
  MapPin,
  MonitorSmartphone,
  Rotate3D,
  ScanSearch,
  ShieldCheck,
  UploadCloud,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react"

const tags = [
  { icon: Cuboid, label: "三维实景" },
  { icon: MapPin, label: "BIM + GIS" },
  { icon: Layers, label: "场景联动" },
  { icon: Activity, label: "仿真推演" },
  { icon: Wrench, label: "孪生运维" },
]

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
    mode: "城市级三维",
    img: "/products/cw3dp-city-river.png",
    caption: "城市、流域、厂站与管网全域联动，形成城市级水务空间底座。",
    scene: "CITY · DIGITAL TWIN",
    stats: [
      { k: "孪生对象", v: "18,620", u: "个" },
      { k: "联动场景", v: "36", u: "类" },
      { k: "在线率", v: "98.7", u: "%" },
    ],
  },
  {
    id: "plant",
    mode: "水厂三维",
    img: "/products/cw3dp-water-plant.png",
    caption: "还原水厂工艺流程、设备状态与能耗水质，实现生产过程可视可控。",
    scene: "PLANT · DIGITAL TWIN",
    stats: [
      { k: "工艺单元", v: "28", u: "组" },
      { k: "在线设备", v: "428", u: "台" },
      { k: "能耗偏差", v: "-6.2", u: "%" },
    ],
  },
  {
    id: "pump",
    mode: "泵闸三维",
    img: "/products/cw3dp-pump-gate-twin.png",
    caption: "贯通泵站、闸门与机组运行数据，支撑远程调度、诊断和应急处置。",
    scene: "PUMP · GATE · DIGITAL TWIN",
    stats: [
      { k: "泵闸站点", v: "86", u: "座" },
      { k: "运行机组", v: "128", u: "台" },
      { k: "联动响应", v: "1.8", u: "秒" },
    ],
  },
]

type Capability = { icon: LucideIcon; title: string; detail: string }

const twinCapabilities: Capability[] = [
  { icon: Database, title: "多源数据融合", detail: "汇聚生产运行、视频监控、安防告警与人员定位等数据，拓展空间属性。" },
  { icon: Workflow, title: "状态与工艺联动", detail: "联动工艺走向、设备状态、管线流向及配电控制回路。" },
  { icon: BrainCircuit, title: "AI 仿真推演", detail: "融合 AI 与水力水质模型，支撑事件预测预警与动态推演。" },
  { icon: Globe2, title: "BIM + GIS 融合", detail: "覆盖泵站、厂网与流域不同规模场景的一体化孪生。" },
  { icon: MonitorSmartphone, title: "多形态部署", detail: "支持 C/S、私有化与云端部署，网页多端即开即看。" },
  { icon: Bot, title: "AI 智能助手", detail: "一句话操控三维底座，完成场景导览、数据查找与业务调度。" },
]

const modelCapabilities: Capability[] = [
  { icon: Library, title: "企业级模型资产库", detail: "整合 150+ 模型类型与 1000+ 模型资产，统一沉淀和复用。" },
  { icon: Layers, title: "标准编码与分类", detail: "内建模型规则、专属编码及 BIM 标识，支持自定义类目。" },
  { icon: Rotate3D, title: "360° 三维预览", detail: "查看材质、法线、UV、面数、动画与尺寸等模型详情。" },
  { icon: UploadCloud, title: "全生命周期管理", detail: "支持单件或批量上传、检索、审核及规范化发布下架。" },
  { icon: ShieldCheck, title: "权限与安全审计", detail: "精细化用户权限与全链路日志，保障模型共享安全可控。" },
]

const modules = [
  { id: "twin", label: "数字孪生", code: "TWIN-3D", icon: Box },
  { id: "modellib", label: "模型族库", code: "MODEL-LIB", icon: Library },
] as const

const plantFeatures = [
  { id: "exploded", label: "设备爆炸图", detail: "构件拆解 · 结构透视", status: "128 台设备可查看", image: "/products/cw3dp-effect-exploded.png" },
  { id: "circuit", label: "控制回路", detail: "工艺联动 · 回路追踪", status: "36 条回路在线", image: "/products/cw3dp-effect-circuit.png" },
  { id: "inspection", label: "智能巡检", detail: "路线规划 · 缺陷闭环", status: "12 条路线执行中", image: "/products/cw3dp-effect-inspection.png" },
  { id: "personnel", label: "人员定位", detail: "电子围栏 · 安全联动", status: "46 人实时在线", image: "/products/cw3dp-effect-personnel.png" },
] as const

function CapabilityDock({ title, items, fiveColumns = false }: { title: string; items: Capability[]; fiveColumns?: boolean }) {
  return (
    <div className="mt-3 rounded-2xl border border-primary/15 bg-[oklch(0.08_0.04_250/0.28)] p-3 shadow-[0_18px_55px_-28px_oklch(0.55_0.18_245/0.58)] backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-4 w-0.5 rounded-full bg-primary shadow-[0_0_9px_oklch(0.72_0.16_235)]" />
          <span className="text-xs font-semibold text-foreground/90">{title}</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-primary/65">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          REAL-TIME SYNC
        </span>
      </div>
      <div className={`grid gap-2 sm:grid-cols-2 ${fiveColumns ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
        {items.map((item, index) => (
          <div key={item.title} className="group flex min-w-0 gap-2 rounded-xl border border-primary/10 bg-[oklch(0.11_0.04_248/0.18)] p-2 backdrop-blur-[2px] transition-colors hover:border-primary/30 hover:bg-[oklch(0.16_0.055_245/0.32)]">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <item.icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/90">
                <span className="font-mono text-[9px] text-primary/55">0{index + 1}</span>
                {item.title}
              </span>
              <span className="mt-0.5 block text-pretty text-[9px] leading-[1.45] text-muted-foreground/85">{item.detail}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Cw3dpSlide() {
  const [viewId, setViewId] = useState("city")
  const [showId, setShowId] = useState<"twin" | "modellib">("twin")
  const [plantFeatureId, setPlantFeatureId] = useState<(typeof plantFeatures)[number]["id"]>("exploded")
  const [viewPaused, setViewPaused] = useState(false)
  const [showPaused, setShowPaused] = useState(false)

  useEffect(() => {
    if (viewPaused) return
    const timer = setInterval(() => {
      setViewId((current) => {
        const index = presentations.findIndex((item) => item.id === current)
        return presentations[(index + 1) % presentations.length].id
      })
    }, 4200)
    return () => clearInterval(timer)
  }, [viewPaused])

  useEffect(() => {
    if (showPaused) return
    const timer = setInterval(() => setShowId((current) => (current === "twin" ? "modellib" : "twin")), 8000)
    return () => clearInterval(timer)
  }, [showPaused])

  const view = presentations.find((item) => item.id === viewId) ?? presentations[0]
  const activePlantFeature = plantFeatures.find((item) => item.id === plantFeatureId) ?? plantFeatures[0]

  return (
    <div data-testid="cw-visual-workspace" className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.16_0.03_245)] p-4 sm:p-5">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex flex-wrap items-baseline gap-x-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-foreground">CW-Visual</span>
          <span className="text-gradient">三维数字孪生平台</span>
        </h3>

        <div className="grid w-full grid-cols-2 gap-2 sm:w-[340px]">
          {modules.map((module) => {
            const selected = showId === module.id
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => setShowId(module.id)}
                onMouseEnter={() => setShowPaused(true)}
                onMouseLeave={() => setShowPaused(false)}
                aria-pressed={selected}
                className="group relative flex min-w-0 items-center gap-2 overflow-hidden rounded-xl border px-3 py-2 text-left transition-all duration-300"
                style={{
                  borderColor: selected ? "oklch(0.66 0.18 245)" : "oklch(0.35 0.05 245 / 0.55)",
                  backgroundColor: selected ? "oklch(0.62 0.18 245 / 0.17)" : "oklch(0.13 0.035 248 / 0.62)",
                  boxShadow: selected ? "0 0 22px -8px oklch(0.68 0.18 242 / 0.95)" : "none",
                }}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <module.icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-mono text-[8px] tracking-wider text-primary/75">CW-Visual · {module.code}</span>
                  <span className="mt-0.5 block truncate text-sm font-bold text-foreground">{module.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag.label} className="flex w-[124px] min-w-0 items-center gap-1.5 rounded-lg border border-primary/20 bg-[oklch(0.12_0.035_250/0.5)] px-2 py-1.5 backdrop-blur-sm sm:w-[132px]">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <tag.icon className="size-3" />
            </span>
            <span className="truncate text-[11px] font-medium text-foreground/85">{tag.label}</span>
          </div>
        ))}
      </div>

      <div
        className="relative mt-3"
        onMouseEnter={() => {
          setShowPaused(true)
          setViewPaused(true)
        }}
        onMouseLeave={() => {
          setShowPaused(false)
          setViewPaused(false)
        }}
      >
        <AnimatePresence mode="wait">
          {showId === "twin" ? (
            <motion.div key="twin-stage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative min-h-[760px] overflow-hidden rounded-2xl border border-primary/30 sm:min-h-[660px] lg:min-h-[650px]">
              <AnimatePresence mode="wait">
                <motion.img key={view.id} src={view.img} alt={view.caption} initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65, ease: "easeOut" }} className="absolute inset-0 size-full object-cover brightness-[1.18] saturate-[1.12]" draggable={false} />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(90deg, oklch(0.08 0.035 250 / 0.25) 0%, transparent 30%), linear-gradient(0deg, oklch(0.07 0.035 250 / 0.34) 0%, transparent 34%), radial-gradient(circle at 58% 38%, transparent 42%, oklch(0.08 0.04 250 / 0.06) 100%)" }} />
              <div className="twin-scan pointer-events-none absolute inset-0" aria-hidden="true" />

              <div className="relative z-10 flex min-h-[760px] flex-col p-3 sm:min-h-[660px] sm:p-5 lg:min-h-[650px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-[oklch(0.09_0.04_250/0.62)] px-3 py-1 font-mono text-[10px] text-primary backdrop-blur-md">
                      <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                      CW-Visual · TWIN-3D
                    </span>
                    <span className="hidden font-mono text-[9px] tracking-[0.18em] text-primary/60 sm:inline">{view.scene}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={`${view.id}-metrics`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="hidden w-64 rounded-xl border border-primary/25 bg-[oklch(0.09_0.04_250/0.68)] p-3 backdrop-blur-xl sm:block">
                      <div className="mb-2 flex items-center gap-1.5 border-b border-primary/15 pb-2 text-[10px] font-medium text-foreground/80">
                        <ScanSearch className="size-3.5 text-primary" />
                        {view.mode}运行概览
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {view.stats.map((stat) => (
                          <div key={stat.k} className="min-w-0">
                            <span className="block truncate text-[8px] text-muted-foreground">{stat.k}</span>
                            <span className="mt-1 block truncate font-mono text-sm font-semibold text-primary">
                              {stat.v}<span className="ml-0.5 text-[8px] font-normal text-foreground/45">{stat.u}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-auto">
                  <AnimatePresence initial={false}>
                    {view.id === "plant" && (
                      <motion.div key="plant-features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.28 }} className="mb-3 w-full">
                        <div className="mb-1.5 flex items-center justify-between gap-3 px-1">
                          <span className="font-mono text-[9px] tracking-[0.16em] text-primary/70">PLANT SCENE EFFECTS</span>
                          <AnimatePresence mode="wait">
                            <motion.span key={activePlantFeature.id} initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }} className="flex items-center gap-1.5 text-[9px] text-foreground/65">
                              <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_oklch(0.72_0.16_235)]" />
                              {activePlantFeature.status}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-[linear-gradient(180deg,oklch(0.085_0.045_250/0.78),oklch(0.055_0.035_252/0.9))] p-2.5 shadow-[0_18px_46px_-22px_oklch(0.03_0.03_250/0.95),inset_0_1px_0_oklch(0.9_0.08_220/0.12)] backdrop-blur-xl sm:p-3">
                          <span
                            className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent shadow-[0_0_14px_oklch(0.78_0.15_215/0.85)]"
                            aria-hidden
                          />
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                          {plantFeatures.map((feature, index) => {
                            const selected = plantFeatureId === feature.id
                            return (
                              <motion.button
                                key={feature.id}
                                type="button"
                                onClick={() => setPlantFeatureId(feature.id)}
                                aria-pressed={selected}
                                animate={{ opacity: selected ? 1 : 0.94, scale: selected ? 1.025 : 1, y: selected ? -3 : 0 }}
                                whileHover={{ opacity: 1, scale: 1.025, y: -3 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="group relative flex min-w-0 flex-col items-center justify-end overflow-hidden rounded-xl border px-2 pb-2.5 pt-1.5 text-center outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-cyan-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.06_0.035_252)]"
                                style={{
                                  borderColor: selected ? "oklch(0.8 0.14 215 / 0.78)" : "oklch(0.78 0.06 225 / 0.2)",
                                  background: selected
                                    ? "linear-gradient(180deg, oklch(0.19 0.085 235 / 0.86), oklch(0.095 0.05 250 / 0.94))"
                                    : "linear-gradient(180deg, oklch(0.13 0.05 245 / 0.76), oklch(0.075 0.035 252 / 0.9))",
                                  boxShadow: selected
                                    ? "0 0 0 1px oklch(0.86 0.11 210 / 0.18) inset, 0 0 26px -8px oklch(0.72 0.18 220 / 0.82), 0 14px 30px -18px oklch(0.02 0.03 250 / 0.95)"
                                    : "0 1px 0 oklch(0.9 0.05 220 / 0.08) inset, 0 12px 24px -18px oklch(0.02 0.03 250 / 0.95)",
                                }}
                              >
                                <span
                                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/75 to-transparent transition-opacity duration-300"
                                  style={{ opacity: selected ? 1 : 0.22 }}
                                  aria-hidden
                                />
                                <span className="absolute left-2 top-2 z-10 font-mono text-[8px] tracking-[0.14em] text-cyan-100/45">
                                  0{index + 1}
                                </span>
                                <span className="pointer-events-none absolute inset-x-[14%] bottom-9 h-12 rounded-[50%] bg-cyan-300/20 blur-xl" aria-hidden />
                                <img
                                  src={feature.image}
                                  alt={`${feature.label}三维效果`}
                                  loading="lazy"
                                  decoding="async"
                                  className="relative h-28 w-full object-contain transition-[filter,transform] duration-300 sm:h-32"
                                  style={{
                                    filter: selected
                                      ? "drop-shadow(0 0 13px oklch(0.76 0.17 216 / 0.9)) drop-shadow(0 10px 12px oklch(0.02 0.04 250 / 0.75))"
                                      : "drop-shadow(0 0 8px oklch(0.64 0.15 230 / 0.62)) drop-shadow(0 8px 10px oklch(0.02 0.04 250 / 0.7))",
                                  }}
                                  draggable={false}
                                />
                                <span className="relative mt-0.5 min-w-0 border-t border-white/8 pt-2">
                                  <span className="block truncate text-[11px] font-semibold text-white drop-shadow-[0_1px_6px_oklch(0.02_0.03_250)]">{feature.label}</span>
                                  <span className="mt-0.5 block truncate text-[8px] text-cyan-100/70">{feature.detail}</span>
                                </span>
                              </motion.button>
                            )
                          })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-lg">
                      <h4 className="text-3xl font-bold text-gradient drop-shadow-[0_2px_18px_oklch(0.62_0.18_242/0.62)] sm:text-4xl">{view.mode}</h4>
                      <p className="mt-2 text-pretty text-xs leading-relaxed text-foreground/75 sm:text-sm">{view.caption}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {presentations.map((item) => {
                        const selected = viewId === item.id
                        return (
                          <button key={item.id} type="button" onClick={() => setViewId(item.id)} aria-pressed={selected} className="rounded-lg border px-3.5 py-2 text-[11px] font-medium backdrop-blur-md transition-all duration-300" style={{ borderColor: selected ? "oklch(0.68 0.18 242)" : "oklch(0.62 0.08 245 / 0.35)", backgroundColor: selected ? "oklch(0.65 0.18 242 / 0.88)" : "oklch(0.1 0.04 250 / 0.62)", color: selected ? "white" : "oklch(0.76 0.03 240)", boxShadow: selected ? "0 0 18px -4px oklch(0.68 0.18 242 / 0.9)" : "none" }}>
                            {item.mode}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <CapabilityDock title="数字孪生核心能力" items={twinCapabilities} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="modellib-stage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative min-h-[720px] overflow-hidden rounded-2xl border border-primary/30 sm:min-h-[650px]">
              <img src="/products/cw3dp-modellib-screen.png" alt="CW-Visual 企业级三维模型族库产品大屏" className="absolute inset-0 size-full object-cover" draggable={false} />
              <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(90deg, oklch(0.08 0.035 250 / 0.64) 0%, transparent 42%), linear-gradient(0deg, oklch(0.07 0.035 250 / 0.93) 0%, transparent 60%), radial-gradient(circle at 55% 38%, transparent 24%, oklch(0.08 0.04 250 / 0.24) 100%)" }} />
              <div className="twin-scan pointer-events-none absolute inset-0" aria-hidden="true" />

              <div className="relative z-10 flex min-h-[720px] flex-col p-3 sm:min-h-[650px] sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-[oklch(0.09_0.04_250/0.62)] px-3 py-1 font-mono text-[10px] text-primary backdrop-blur-md">
                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                    CW-Visual · MODEL-LIB
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-primary/60">MODEL ASSET ONLINE · 1,000+</span>
                </div>

                <div className="mt-auto max-w-xl">
                  <h4 className="text-3xl font-bold text-gradient drop-shadow-[0_2px_18px_oklch(0.62_0.18_242/0.62)] sm:text-4xl">企业级三维模型族库</h4>
                  <p className="mt-2 text-pretty text-xs leading-relaxed text-foreground/75 sm:text-sm">统一沉淀水务设施、设备与构筑物模型资产，以标准化编码、在线预览和全生命周期治理支撑三维场景快速建设。</p>
                </div>

                <CapabilityDock title="模型资产核心能力" items={modelCapabilities} fiveColumns />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
