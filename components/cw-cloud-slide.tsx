"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Boxes,
  Blocks,
  Network,
  Sparkles,
  Building2,
  BrainCircuit,
  Plus,
  ShieldCheck,
  Recycle,
  Factory,
  Gauge,
  Waves,
  GitFork,
  Cpu,
  CloudRain,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { BuildingBlocks, type ModuleDef } from "@/components/building-blocks"
import { ProductScene } from "@/components/product-scene"

// ---------- 产品模块池（数据驱动，按指定顺序） ----------
// 每个模块独立配色（参考宣传底图的彩色积木塔：青/绿/紫/洋红/蓝/红/橙/金 等）
const P = {
  cyan: { top: "#35d6e8", left: "#0b6f86", right: "#129cb8", glow: "oklch(0.78 0.13 205)" },
  green: { top: "#4ade80", left: "#14652f", right: "#1e9048", glow: "oklch(0.78 0.16 155)" },
  violet: { top: "#a78bfa", left: "#45298a", right: "#6d4fc4", glow: "oklch(0.7 0.16 295)" },
  magenta: { top: "#f472b6", left: "#7c2257", right: "#bb3f85", glow: "oklch(0.72 0.19 350)" },
  blue: { top: "#3b82f6", left: "#153a75", right: "#1d5cba", glow: "oklch(0.64 0.17 255)" },
  sky: { top: "#38bdf8", left: "#0c4a73", right: "#1580b8", glow: "oklch(0.74 0.14 230)" },
  teal: { top: "#2dd4bf", left: "#0c5f57", right: "#149c8d", glow: "oklch(0.78 0.14 180)" },
  red: { top: "#f87171", left: "#7c1f1f", right: "#c23b3b", glow: "oklch(0.66 0.2 25)" },
  orange: { top: "#fb923c", left: "#84400f", right: "#c9661d", glow: "oklch(0.74 0.17 55)" },
  gold: { top: "#facc15", left: "#6f5405", right: "#bd950e", glow: "oklch(0.85 0.16 95)" },
  ai: { top: "#bfe9ff", left: "#2f6fd0", right: "#3f9fe6", glow: "oklch(0.8 0.12 220)" },
}

// 列表顺序即为用户指定顺序；short 为积木上展示的系统简称
const productModules: ModuleDef[] = [
  { id: "group", label: "集团运营管理", short: "集团运营", col: 0, row: 0, palette: P.cyan },
  { id: "integrated", label: "厂网河湖一体化", short: "厂网河湖", col: 1, row: 0, palette: P.green },
  { id: "plant", label: "水厂运营管理", short: "水厂运营", col: 2, row: 0, palette: P.magenta },
  { id: "sewage", label: "村镇污水管理", short: "村镇污水", col: 0, row: 1, palette: P.violet },
  { id: "pump", label: "泵闸站管理", short: "泵闸站", col: 1, row: 1, palette: P.sky },
  { id: "pipe", label: "管网管理", short: "管网管理", col: 2, row: 1, palette: P.blue },
  { id: "reservoir", label: "河湖管理", short: "河湖管理", col: 0, row: 2, palette: P.teal },
  { id: "flood", label: "防汛内涝管理", short: "防汛内涝", col: 1, row: 2, palette: P.red },
  { id: "ai", label: "水务智能体", short: "AI智能体", col: 1, row: 3, palette: P.ai },
  { id: "iot", label: "IoT 物联平台", short: "IoT平台", col: 2, row: 2, palette: P.orange },
  { id: "sso", label: "SSO 统一登录", short: "统一登录", col: 3, row: 1, palette: P.gold },
]

// 模块池列出全部业务模块（含水务智能体，共 11 类）
const listedModules = productModules.filter((m) => !m.float)

// ---------- 每个模块的详细介绍（图标 + 简述 + 关键能力） ----------
const productInfo: Record<string, { icon: LucideIcon; desc: string; features: string[]; points: string[] }> = {
  group: {
    icon: Building2,
    desc: "面向水务集团，多区域、多公司、多厂站统一管理与运营分析，支撑集团级决策。",
    features: ["多组织架构", "运营驾驶舱", "经营分析"],
    points: [
      "支持单厂 / 多厂 / 分布式厂站 / 泵闸等多业务场景",
      "贯穿决策层—管理层—执行层，灵活适配多层级、组团式管理",
      "支持业财一体化，实现数据资产化、决策科学化",
      "运营评价标准体系支撑运行、设备、排班、巡检、化验、报表数字化量化考核",
      "数字化建设标准体系实现人、事、物全在线、闭环留痕",
    ],
  },
  integrated: {
    icon: Network,
    desc: "打通水厂、管网、泵站与河湖数据，实现厂网河湖联调与一体化运营。",
    features: ["厂网联动", "全要素感知", "协同调度"],
    points: [
      "水厂、泵站、管网、防汛事件各要素精细化管理",
      "机理 + 大数据模型，实现水量科学调配、各厂均衡",
      "降低城市内涝风险，大幅提升防汛调度效率",
      "对接智慧城市，工单无缝流转，改善民众体验",
      "集约化运营、一体化调控，实现管理模式创新",
    ],
  },
  sewage: {
    icon: Recycle,
    desc: "面向村镇分散式污水处理场景，实现设施接入、运行监测、水质达标、巡检工单与运维协同的一体化管理。",
    features: ["统一监管", "水质达标", "协同运维"],
    points: [
      "支持超千个分散式站点统一接入，集中管控、无人值守",
      "视频巡检 + AI 识别，异常问题及时发现、及时上报",
      "以工单流转贯通班组、巡检、设备、告警等业务闭环",
      "工单、异常、电耗、药耗多维分析，支撑运营决策",
      "内置站点评分工具，量化评价运行效果与绩效表现",
    ],
  },
  plant: {
    icon: Factory,
    desc: "覆盖供水、污水厂的生产、工艺、能耗与设备全流程精细化运营。",
    features: ["工艺管控", "能耗优化", "设备管理"],
    points: [
      "行业应用最多的水厂运营软件，系统流畅、稳定、可靠",
      "内置标准化体系与行业知识库，快速建立数字化运营能力",
      "功能全面，支持功能配置化与定制化",
      "支持定制化数据驾驶舱，为不同层级管理人员定制运营主题",
      "设备、工艺、安全、药剂、物资全业务贯通",
      "智能报表灵活配置数据源、公式与样式，一次配置、定期自动生成",
      "拖拽配置流程与自定义表单，业务调整无需依赖厂家支持",
    ],
  },
  pump: {
    icon: Gauge,
    desc: "泵站、水闸的远程监控、智能调度与运行优化，保障安全高效运行。",
    features: ["远程监控", "智能调度", "运行优化"],
    points: [
      "泵站、闸站统一接入，集中管理运行、设备、巡检、维修、告警等业务",
      "接入实时数据，展示水位、流量、泵组启停、闸门开度、能耗等关键指标",
      "支持泵组运行、闸门控制、排涝能力等过程分析，辅助科学调度与应急处置",
      "巡检、维保、抢修全流程工单化流转，现场执行留痕、精细化运营",
    ],
  },
  pipe: {
    icon: GitFork,
    desc: "管网 GIS、压力流量监测、漏损分析与分区计量（DMA）一体化管理。",
    features: ["管网 GIS", "漏损分析", "分区计量"],
    points: [
      "管网资产全要素、全周期展示查询与分析，高精度 BIM 接入、影视级三维呈现",
      "支持多公司、多项目集中部署，快速接入供排新业务，减少重复建设",
      "建立 GIS 数据审核录入规范，自动属性 / 拓扑检查，多层级审核保障数据质量",
      "巡检、养护、抢维修在线工单化流转，移��外业轨迹留痕、全过程可追踪",
      "连通性、断面、流向与人员绩效分析联动，辅助施工指导与精细化运营",
    ],
  },
  reservoir: {
    icon: Waves,
    desc: "面向河道、湖泊、水库等水体对象的数字化建档、实时监测与河湖长制闭环治理。",
    features: ["统一建档", "实时监测", "闭环治理"],
    points: [
      "河道、湖泊、断面、排口、闸站等对象统一建档，水体资源数字化管理",
      "接入水位、水质、流量、视频、雨情等数据，实时掌握运行状态",
      "围绕巡河巡湖、问题上报、整改处置、复核销号构建闭环管理",
      "支持异常告警、问题台账、治理成效分析，辅助河湖长制考核与精细化治理",
    ],
  },
  flood: {
    icon: CloudRain,
    desc: "城市内涝预警、排水调度与应急指挥一体化，提升城市防汛能力。",
    features: ["内涝预警", "排水调度", "应急指挥"],
    points: [
      "以水文模型应用为核心，强化预报、预警、预演、预案“四预”能力",
      "基于未来降雨与潮位数据开展水位模拟推演，超阈值自动匹配并下发预案",
      "预案库支持结构化配置，人员、物资、闸站可按等级灵活调整",
      "复盘历史重大防汛事件，模型推演反向优化预案配置",
      "贯通预报、预警、上级指令等事件来源，下发、审批、执行、总结全流程闭环",
    ],
  },
  iot: {
    icon: Cpu,
    desc: "多协议设备接入、数据采集与边缘计算底座，支撑全平台物联感知。",
    features: ["多协议接入", "数据采集", "边缘计算"],
    points: [
      "海量物联、工控设备一站接入集成，快速应用集成",
      "可视化配置，高效实现厂站数据上云",
      "支持百亿级数据的存储、治理、查询和聚合分析",
      "支持大容量分布式部署，灵活伸缩，适配不同业务规模",
    ],
  },
  sso: {
    icon: ShieldCheck,
    desc: "统一身份认证与权限管理，一次登录贯通全平台应用，安全可控。",
    features: ["统一认证", "权限管理", "单点登录"],
    points: [
      "支持集团、区域、公司、厂站多级组织统一账号管理，一套身份贯通多系统",
      "集成单点登录、权限控制、角色管理、菜单配置，降低重复建设成本",
      "支持按组织、岗位、角色、业务场景灵活授权，满足多业态、千人千面需求",
      "打通水厂、泵站、管网、防汛、物联等系统入口，统一门户、待办、消息",
    ],
  },
  ai: {
    icon: BrainCircuit,
    desc: "融合大模型、RAG 与知识图谱，打通感知、认知、决策、执行与进化闭环，支撑智能问答、告警研判、工艺优化与运营决策。",
    features: ["智能问答", "告警研判", "工艺优化", "运营决策"],
    points: [
      "工业级智能体底座，支撑水务场景灵活扩展与稳定落地",
      "水务专业认知引擎，融合行业标准与专家经验",
      "厂站网一体化推理，贯通排水运营全链路",
      "跨系统工具编排，实现诊断、调度与工单闭环",
      "企业专属知识进化，持续沉淀运营知识资产",
    ],
  },
}

// ---------- 5 个演示阶段 ----------
const demoStages: { title: string; flow: number; active: string[]; note: string }[] = [
  { title: "产品模块池", flow: 0, active: [], note: "10+ 类水务产品模块，能力可选、模块丰富、按需建设。" },
  {
    title: "单业态独立建设",
    flow: 1,
    active: ["plant"],
    note: "单业态可任选——水厂仅为演示示例，管网、泵闸站、分布式污水、水库、防汛等均可独立建设。",
  },
  {
    title: "多模块自由组合",
    flow: 2,
    active: ["plant", "pump", "pipe", "iot", "sso"],
    note: "厂网河湖一体化只是典型组合之一，可按项目需要自由组合、不限定模块顺序。",
  },
  {
    title: "跨场景一体化",
    flow: 3,
    active: ["group", "plant", "pump", "pipe", "sewage", "reservoir", "flood", "iot", "sso"],
    note: "支持集团、区域、多厂站、多业态统一运营。",
  },
  {
    title: "AI 智能运营平台",
    flow: 4,
    active: ["group", "plant", "pump", "pipe", "sewage", "reservoir", "flood", "iot", "sso", "ai"],
    note: "AI 智能体叠加在业务模块之上，增强问数、报表、告警、工单、知识与运营分析能力。",
  },
]

// 各业务模块对应的产品大屏示意图（AI 智能体无图，使用动画示意）
const productImages: Record<string, string> = {
  group: "/products/group.png",
  integrated: "/products/integrated.png",
  sewage: "/products/sewage.png",
  plant: "/products/plant.png",
  pump: "/products/pump.png",
  pipe: "/products/pipe.png",
  reservoir: "/products/river-lake.png",
  flood: "/products/flood.png",
  iot: "/products/iot.png",
  sso: "/products/sso.png",
  ai: "/products/ai.png",
}

// 单业态阶段轮播展示的候选模块（表达「任一业务模块都可独立建设」）
const soloRotation = ["plant", "pipe", "pump", "sewage", "reservoir", "flood"]

const flowSteps = [
  { icon: Boxes, label: "模块池选择" },
  { icon: Box, label: "单业态独立建设" },
  { icon: Blocks, label: "多模块自由组合" },
  { icon: Network, label: "跨场景一体化" },
  { icon: Sparkles, label: "AI 持续升级" },
]

// CW-Cloud 水务AI运营平台 · 五大产品特性标签
const highlights: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Building2, title: "全场景", desc: "覆盖厂、站、网、河湖" },
  { icon: BrainCircuit, title: "智决策", desc: "AI 赋能分析与决策" },
  { icon: Boxes, title: "易组合", desc: "模块配置，自由扩展" },
  { icon: ShieldCheck, title: "便维护", desc: "一体化架构，运行稳定" },
  { icon: TrendingUp, title: "懂业务", desc: "行业标准，水务知识" },
]

// 由当前激活模块集合推断所处阶段（用于流程条/说明联动）
function inferFlow(active: string[]) {
  if (active.includes("ai")) return 4
  if (active.length === 0) return 0
  if (active.length === 1) return 1
  if (active.length <= 5) return 2
  return 3
}

export function CwCloudSlide({ active }: { active: boolean }) {
  const [stageIdx, setStageIdx] = useState(0)
  const [soloPick, setSoloPick] = useState(0)
  const [custom, setCustom] = useState<string[] | null>(null)
  const [paused, setPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [focusId, setFocusId] = useState<string>("group")

  // 自动播放 Stage 0 → 1 → 2 → 3 → 4 循环
  useEffect(() => {
    if (!active || paused || custom) return
    const t = setInterval(() => {
      setStageIdx((s) => {
        const next = (s + 1) % demoStages.length
        if (next === 1) setSoloPick((p) => (p + 1) % soloRotation.length)
        return next
      })
    }, 2400)
    return () => clearInterval(t)
  }, [active, paused, custom])

  // 当前生效的激活模块集合
  const activeIds = useMemo(() => {
    if (custom) return custom
    if (stageIdx === 1) return [soloRotation[soloPick]]
    return demoStages[stageIdx].active
  }, [custom, stageIdx, soloPick])

  const flowIdx = custom ? inferFlow(custom) : demoStages[stageIdx].flow

  // 展示区聚焦的产品：优先悬停项，其次点击聚焦项
  const showId = hoveredId ?? focusId
  const showModule = productModules.find((m) => m.id === showId) ?? listedModules[0]
  const showInfo = productInfo[showModule.id]

  const handleHover = (id: string | null) => {
    setHoveredId(id)
    setPaused(!!id)
    if (id) setFocusId(id)
  }

  const toggleModule = (id: string) => {
    setPaused(true)
    setFocusId(id)
    setCustom((prev) => {
      const base = prev ?? activeIds
      return base.includes(id) ? base.filter((x) => x !== id) : [...base, id]
    })
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-[oklch(0.1_0.03_248)]">
      {/* ===== 主视觉舞台：右侧数字孪生场景为绝对主角，左/上/下为轻量叠加 ===== */}
      <div className="relative min-h-[600px] w-full lg:min-h-[680px]">
        {/* 底图：全幅数字孪生沙盘（发光平台 + 中心积木组合体） */}
        <div className="absolute inset-0">
          <BuildingBlocks
            modules={productModules}
            activeIds={activeIds}
            hoveredId={hoveredId}
            onHover={handleHover}
            onToggle={toggleModule}
          />
        </div>

        {/* 左侧可读性渐隐遮罩（让文案浮于场景之上，不压实心面板） */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.09 0.03 248 / 0.96) 0%, oklch(0.09 0.03 248 / 0.7) 30%, oklch(0.09 0.03 248 / 0.15) 52%, transparent 68%)",
          }}
        />
        {/* 顶部 / 底部轻微压暗，提升标签与流程可读性 */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.09 0.03 248 / 0.55) 0%, transparent 22%, transparent 70%, oklch(0.09 0.03 248 / 0.85) 100%)",
          }}
        />

        {/* ===== 内容叠加层（默认穿透，交互元素单独开启指针事件，保证场景可点选） ===== */}
        <div className="pointer-events-none relative z-10 flex min-h-[600px] flex-col p-6 sm:p-8 lg:min-h-[680px] lg:p-10">
          {/* 左侧品牌文案（轻、透、简洁，不使用实心面板） */}
          <div className="pointer-events-auto mt-4 max-w-md lg:mt-6 lg:max-w-sm">
            <h3 className="text-balance text-4xl font-bold leading-[1.12] tracking-tight text-foreground lg:text-5xl">
              CW-Cloud
              <br />
              <span className="text-gradient">水务 AI 运营平台</span>
            </h3>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              从单一业务到多业态组合，从业务系统到 AI 智能运营平台，CW-Cloud 支持 10+ 类产品模块按需选择、灵活组合、持续扩展。
            </p>

            {/* 五大产品特性（紧凑卡片，纵向排列，副标题保持单行） */}
            <div className="mt-6 flex max-w-xs flex-col gap-2">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="pointer-events-auto flex items-start gap-2 rounded-lg border border-accent/25 bg-[oklch(0.12_0.04_248/0.78)] px-2.5 py-2 backdrop-blur-sm transition-colors hover:border-accent/45"
                  style={{ boxShadow: "0 0 18px -8px oklch(0.7 0.14 215 / 0.55)" }}
                >
                  <span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/[0.12]"
                    aria-hidden="true"
                  >
                    <h.icon className="size-4 text-accent" />
                  </span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-sm font-bold text-foreground">{h.title}</span>
                    <span className="whitespace-nowrap text-[10px] tracking-tight text-muted-foreground/95">{h.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 桌面端产品模块池：移至主视觉右侧空白区域 */}
          <div className="pointer-events-auto absolute right-8 top-8 hidden w-52 rounded-2xl border border-accent/20 bg-[oklch(0.1_0.03_248/0.78)] p-3 backdrop-blur-md lg:block">
            <div className="mb-2.5 flex items-center gap-1.5">
              <Boxes className="size-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">产品模块池 · 11</span>
            </div>
            <div className="grid gap-1.5">
              {listedModules.map((m) => {
                const on = activeIds.includes(m.id)
                const hot = showId === m.id
                return (
                  <button
                    key={m.id}
                    onMouseEnter={() => handleHover(m.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => toggleModule(m.id)}
                    className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition-all duration-300"
                    style={{
                      borderColor: on ? `${m.palette.top}8c` : hot ? `${m.palette.top}66` : "oklch(0.32 0.03 240 / 0.55)",
                      backgroundColor: on ? `${m.palette.top}24` : hot ? `${m.palette.top}1a` : "oklch(0.2 0.03 245 / 0.35)",
                      opacity: on || hot ? 1 : 0.78,
                    }}
                  >
                    <span className="size-2 shrink-0 rounded-[3px]" style={{ backgroundColor: m.palette.top }} />
                    <span className="min-w-0 flex-1 truncate text-foreground/90">{m.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 弹性占位：把流程/状态推到底部 */}
          <div className="flex-1" />

          {/* 底部状态胶囊（右侧对齐，避开左侧内容） */}
          <div className="mb-4 flex justify-center lg:justify-end">
            <span className="pointer-events-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/20 bg-[oklch(0.12_0.04_248/0.7)] px-4 py-1.5 text-[11px] text-muted-foreground backdrop-blur-sm sm:text-[12px]">
              已选{" "}
              <span className="font-mono font-semibold text-accent">{activeIds.length}</span> / {listedModules.length} 个模块 ·
              点击下方模块加入组合
            </span>
          </div>

          {/* 底部横向发光流程路径（替代竖向箭头，融入场景） */}
          <div className="pointer-events-auto flex items-center overflow-x-auto pb-1">
            {flowSteps.map((s, i) => {
              const done = i <= flowIdx
              const current = i === flowIdx
              return (
                <div key={s.label} className="flex flex-1 items-center">
                  {/* 节点 */}
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span
                      className="relative flex items-center justify-center transition-all duration-500"
                      style={{
                        width: current ? 52 : 38,
                        height: current ? 52 : 38,
                        clipPath: current
                          ? "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)"
                          : "none",
                        borderRadius: current ? 0 : 9999,
                        border: `1.5px solid ${
                          current
                            ? "oklch(0.85 0.15 200)"
                            : done
                              ? "oklch(0.7 0.13 210 / 0.7)"
                              : "oklch(0.4 0.04 240 / 0.6)"
                        }`,
                        backgroundColor: current
                          ? "oklch(0.7 0.16 210 / 0.22)"
                          : done
                            ? "oklch(0.5 0.1 220 / 0.25)"
                            : "oklch(0.18 0.03 245 / 0.5)",
                        boxShadow: current ? "0 0 22px 1px oklch(0.7 0.16 205 / 0.75)" : "none",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <s.icon
                        className="transition-colors duration-500"
                        style={{
                          width: current ? 20 : 16,
                          height: current ? 20 : 16,
                          color: done ? "oklch(0.92 0.1 200)" : "oklch(0.55 0.04 240)",
                        }}
                      />
                    </span>
                    <span
                      className="whitespace-nowrap text-center text-[11px] leading-tight transition-colors duration-500 sm:text-[12px]"
                      style={{
                        color: current
                          ? "oklch(0.95 0.06 200)"
                          : done
                            ? "oklch(0.82 0.05 220)"
                            : "oklch(0.6 0.02 240)",
                        fontWeight: current ? 700 : 500,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* 连接线 */}
                  {i < flowSteps.length - 1 && (
                    <span
                      className="mx-1.5 mb-6 h-px flex-1 transition-colors duration-500 sm:mx-2.5"
                      style={{
                        background:
                          i < flowIdx
                            ? "linear-gradient(90deg, oklch(0.78 0.14 205 / 0.9), oklch(0.7 0.13 215 / 0.6))"
                            : "oklch(0.4 0.04 240 / 0.4)",
                        boxShadow: i < flowIdx ? "0 0 8px 0 oklch(0.7 0.14 205 / 0.6)" : "none",
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 产品示意区：左 产品模块池 10+ ｜ 右 产品示意图 + 图下文字描述 */}
      <div className="relative mt-6">
        <div className="mb-3 px-6 sm:px-8 lg:px-10">
          <span className="text-sm font-semibold text-foreground">产品示意</span>
        </div>

        <div className="grid gap-5">
          {/* 移动端产品模块池；桌面端已移至上方主视觉右侧 */}
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-3.5 lg:hidden">
            <div className="mb-3 flex items-center gap-1.5">
              <Boxes className="size-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">产品模块池 · 11</span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-1.5">
              {listedModules.map((m) => {
                const on = activeIds.includes(m.id)
                const hot = showId === m.id
                return (
                  <button
                    key={m.id}
                    onMouseEnter={() => handleHover(m.id)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => toggleModule(m.id)}
                    className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[12px] transition-all duration-300"
                    style={{
                      borderColor: on ? `${m.palette.top}8c` : hot ? `${m.palette.top}66` : "oklch(0.32 0.03 240 / 0.55)",
                      backgroundColor: on ? `${m.palette.top}24` : hot ? `${m.palette.top}1a` : "oklch(0.2 0.03 245 / 0.35)",
                      opacity: on || hot ? 1 : 0.78,
                    }}
                  >
                    <span
                      className="size-2.5 shrink-0 rounded-[3px]"
                      style={{ backgroundColor: m.palette.top, boxShadow: on ? `0 0 7px 1px ${m.palette.glow}` : "none" }}
                    />
                    <span className="min-w-0 flex-1 truncate text-foreground/90">{m.label}</span>
                  </button>
                )
              })}
              {/* 更多模块持续扩展 */}
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-accent/30 px-2.5 py-2 text-[12px] opacity-70">
                <Plus className="size-3.5 shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-foreground/80">更多+</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">持续扩展</span>
              </div>
            </div>
          </div>

          {/* 右：产品示意图 + 图下方文字描述 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showModule.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-3 overflow-hidden rounded-2xl border border-border bg-card/35 p-3 lg:grid-cols-[minmax(0,1.9fr)_minmax(260px,0.75fr)]"
            >
              {/* 左：内收式产品大屏示意图 */}
              <div
                className="relative aspect-video w-full overflow-hidden rounded-xl border border-accent/15 lg:aspect-auto lg:min-h-[430px]"
                style={{ background: "oklch(0.12 0.025 248)" }}
              >
                {productImages[showModule.id] ? (
                  <>
                    <img
                      src={productImages[showModule.id] || "/placeholder.svg"}
                      alt={`${showModule.label}产品大屏示意`}
                      className="size-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    {/* 柔和暗角让图片自然向内收拢 */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      aria-hidden="true"
                      style={{
                        background:
                          "radial-gradient(115% 110% at 50% 48%, transparent 62%, oklch(0.09 0.025 248 / 0.62) 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div className="flex size-full items-center justify-center p-4">
                    <ProductScene id={showModule.id} palette={showModule.palette} />
                  </div>
                )}
              </div>

              {/* 右：内嵌式核心能力面板 */}
              <div className="flex flex-col justify-center rounded-xl border border-accent/15 bg-card/55 p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-6 w-1 rounded-full" style={{ backgroundColor: showModule.palette.top }} />
                  <span className="text-lg font-bold text-foreground">核心能力</span>
                </div>
                <ul className="grid gap-4">
                  {showInfo.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-[7px] size-1.5 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: showModule.palette.top }}
                        aria-hidden="true"
                      />
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
