import {
  Building2,
  BrainCircuit,
  ShieldCheck,
  Recycle,
  Factory,
  Gauge,
  Waves,
  GitFork,
  Cpu,
  CloudRain,
  Network,
  type LucideIcon,
} from "lucide-react"
import type { ModuleDef } from "@/components/building-blocks"

// ---------- 配色 ----------
export const P = {
  cyan: { top: "#46dced", left: "#0d6f9e", right: "#1597c0", glow: "oklch(0.78 0.13 205)" },
  blue: { top: "#3a86e6", left: "#143a72", right: "#1d5fae", glow: "oklch(0.66 0.15 250)" },
  sky: { top: "#47b8ff", left: "#104a8c", right: "#1c74c6", glow: "oklch(0.7 0.14 230)" },
  teal: { top: "#2fd1c4", left: "#0c6f6a", right: "#149a91", glow: "oklch(0.78 0.14 185)" },
  green: { top: "#3ce6b4", left: "#0e6f5c", right: "#16a585", glow: "oklch(0.78 0.14 175)" },
  ai: { top: "#bfe9ff", left: "#2f6fd0", right: "#3f9fe6", glow: "oklch(0.8 0.12 220)" },
}

// ---------- 产品模块池（列表顺序即用户指定顺序；col/row 决定等距组合体中位置） ----------
export const productModules: ModuleDef[] = [
  { id: "group", label: "集团运营管理", col: 0, row: 0, palette: P.cyan },
  { id: "integrated", label: "厂网河湖一体化", col: 1, row: 0, palette: P.blue },
  { id: "sewage", label: "分布式污水厂运营管理", col: 2, row: 0, palette: P.green },
  { id: "plant", label: "水厂运营管理", col: 0, row: 1, palette: P.cyan },
  { id: "pump", label: "泵闸站管理", col: 1, row: 1, palette: P.sky },
  { id: "pipe", label: "管网管理", col: 2, row: 1, palette: P.blue },
  { id: "reservoir", label: "水库标准化管理", col: 0, row: 2, palette: P.teal },
  { id: "flood", label: "城市防汛内涝管理", col: 1, row: 2, palette: P.sky },
  { id: "iot", label: "IoT 物联平台", col: 2, row: 2, palette: P.teal },
  { id: "sso", label: "SSO 统一登录", col: 3, row: 1, palette: P.blue },
  { id: "ai", label: "水务智能体", col: 0, row: 0, palette: P.ai, float: true },
]

// 模块池仅列出 10 类业务模块（AI 作为可持续叠加的智能层，不计入列表）
export const listedModules = productModules.filter((m) => !m.float)

// ---------- 每个模块的详细介绍（图标 + 简述 + 关键能力） ----------
export const productInfo: Record<string, { icon: LucideIcon; desc: string; features: string[] }> = {
  group: {
    icon: Building2,
    desc: "面向水务集团，多区域、多公司、多厂站统一管理与运营分析，支撑集团级决策。",
    features: ["多组织架构", "运营驾驶舱", "经营分析"],
  },
  integrated: {
    icon: Network,
    desc: "打通水厂、管网、泵站与河湖数据，实现厂网河湖联调与一体化运营。",
    features: ["厂网联动", "全要素感知", "协同调度"],
  },
  sewage: {
    icon: Recycle,
    desc: "面向分散式、农村污水厂站点的集中监控、远程运维与达标管理。",
    features: ["集中监控", "远程运维", "达标排放"],
  },
  plant: {
    icon: Factory,
    desc: "覆盖供水、污水厂的生产、工艺、能耗与设备全流程精细化运营。",
    features: ["工艺管控", "能耗优化", "设备管理"],
  },
  pump: {
    icon: Gauge,
    desc: "泵站、水闸的远程监控、智能调度与运行优化，保障安全高效运行。",
    features: ["远程监控", "智能调度", "运行优化"],
  },
  pipe: {
    icon: GitFork,
    desc: "管网 GIS、压力流量监测、漏损分析与分区计量（DMA）一体化管理。",
    features: ["管网 GIS", "漏损分析", "分区计量"],
  },
  reservoir: {
    icon: Waves,
    desc: "水库标准化管理与大坝安全运行监测，实现规范化、可视化运营。",
    features: ["标准化管理", "大坝监测", "水位预警"],
  },
  flood: {
    icon: CloudRain,
    desc: "城市内涝预警、排水调度与应急指挥一体化，提升城市防汛能力。",
    features: ["内涝预警", "排水调度", "应急指挥"],
  },
  iot: {
    icon: Cpu,
    desc: "多协议设备接入、数据采集与边缘计算底座，支撑全平台物联感知。",
    features: ["多协议接入", "数据采集", "边缘计算"],
  },
  sso: {
    icon: ShieldCheck,
    desc: "统一身份认证与权限管理，一次登录贯通全平台应用，安全可控。",
    features: ["统一认证", "权限管理", "单点登录"],
  },
  ai: {
    icon: BrainCircuit,
    desc: "大模型驱动的问数、报表、告警、工单与知识助手，叠加在业务模块之上。",
    features: ["智能问数", "智能报表", "知识助手"],
  },
}
