export type CaseCategory =
  | "水务集团数字化运营"
  | "排水一体化管理"
  | "数字水厂"
  | "三维数字孪生"

// 产品短代码（项目能力组成，作为案例标签展示，不参与一级筛选）
export type CaseProduct = string

export interface CaseItem {
  slug: string
  title: string
  category: CaseCategory
  /** 项目中组合使用的产品（可多个） */
  products: CaseProduct[]
  location: string
  client: string
  image: string
  summary: string
  background: string
  scope: string[]
  results: string[]
  /** 项目亮点短标签 */
  tags: string[]
  /** Hero 核心指标（大屏数字，4 项） */
  metrics: { value: string; label: string }[]
  /** 项目概览四要素 */
  overview: {
    target: string
    coverage: string
    value: string
    period: string
  }
}

// 一级筛选：解决方案类型
export const caseCategories: CaseCategory[] = [
  "水务集团数字化运营",
  "排水一体化管理",
  "数字水厂",
  "三维数字孪生",
]

// 各解决方案类型的点位/标签配色
export const categoryColor: Record<CaseCategory, string> = {
  水务集团数字化运营: "oklch(0.6 0.19 295)", // 蓝紫色
  排水一体化管理: "oklch(0.6 0.2 255)", // 蓝色
  数字水厂: "oklch(0.72 0.14 205)", // 青蓝色
  三维数字孪生: "oklch(0.72 0.15 165)", // 青绿色
}

// 各解决方案类型简介
export const solutionIntro: Record<CaseCategory, string> = {
  水务集团数字化运营:
    "聚焦集团型水务企业的跨业态、多层级、统一化数字运营需求，构建从现场控制、运营管理到集团决策与业财融合的全链条数字化体系。",
  排水一体化管理:
    "厂—网—河—湖一体化管控，覆盖防汛预警、城市排水调度及溢流污染管控，推动排水系统运行监测、风险识别与应急处置全过程数字化。",
  数字水厂:
    "面向单体水厂的全流程数字化运营，覆盖供水、污水、再生水多类型水厂，融合平台底座、智能控制与智慧运营能力。",
  三维数字孪生:
    "依托 Visual 数字孪生平台，打造水厂 / 泵站 / 闸站的空间三维可视化与数字孪生运维体系，支持从单厂到流域的不同规模场景孪生。",
}

// 各解决方案下的其它案例（文字清单）
export const otherCases: Record<CaseCategory, string[]> = {
  水务集团数字化运营: ["浦东水务集团数字化运营"],
  排水一体化管理: ["黑龙江方正县智慧城市地下管网", "威宁县智慧城市地下管网"],
  数字水厂: [
    "西安第三污水厂",
    "西安将军山水厂",
    "惠州江北水厂",
    "增城地下污水厂",
    "浦东水务海滨数字污水厂",
    "300+ 数字水厂落地案例",
  ],
  三维数字孪生: [
    "上海临港水厂",
    "浦东水务北水厂",
    "杭州水务城北水厂",
    "北京稻香湖水厂",
    "北京冬奥会怀柔滑雪场 BIM 服务",
    "北京环球影城",
    "舟山定海水厂",
    "银川第一再生水厂",
    "成都双流水厂",
    "中科院江门中微子中心 BIM",
    "20+ 孪生 / BIM 服务案例",
  ],
}

export const cases: CaseItem[] = [
  // ===== 一、水务集团数字化运营 =====
  {
    slug: "beikong-shuiwu",
    title: "北控水务·集团数字化运营",
    category: "水务集团数字化运营",
    products: ["CW-POM", "CW-Visual", "CW-PPI"],
    location: "全国",
    client: "北控水务集团",
    image: "/cases/beikong-shuiwu.png",
    summary:
      "依托北控水务数据标准、运营评价标准与企业知识库建设，形成行业首个全面的企业数字化建设标准体系，支撑集团轻资产战略下的运营管理数字化转型。",
    background:
      "北控水务集团旗下水厂数量众多、分布广泛、业态多元。基于 300+ 数字化项目实践和持续研发，需要形成统一的数据标准、运营评价标准与企业知识库，支撑集团轻资产战略下的运营管理数字化转型。",
    scope: [
      "完成 POM、Visual、PPI、OPC、IOT 物联数据平台等核心产品自主研发",
      "赋能数字孪生、黑灯水厂、1+N 区域集约化管理",
      "覆盖水厂、泵站、管网、村镇污水、水环境等多类业务场景",
      "延伸至供水、排水、水环境多业态一体化建设",
    ],
    results: [
      "形成行业首个全面的企业数字化建设标准体系",
      "支撑从现场控制、运营管理到集团决策与业财融合的全链条数字化升级",
      "基于 300+ 数字化项目实践沉淀可复制的运营经验",
    ],
    tags: ["数字化标准体系", "轻资产战略", "1+N 集约化"],
    metrics: [
      { value: "300+", label: "数字化项目" },
      { value: "96.5%", label: "在线运行率" },
      { value: "268 个", label: "管理协同节点" },
      { value: "18.7 万/年", label: "运营优化收益" },
    ],
    overview: {
      target: "构建集团统一数据标准与运营评价体系，实现 1+N 区域集约化运营。",
      coverage: "覆盖水厂、泵站、管网、村镇污水、水环境等多业务场景。",
      value: "形成行业首个企业数字化建设标准体系，支撑集团轻资产战略。",
      period: "基于 300+ 项目多期持续迭代沉淀。",
    },
  },
  {
    slug: "tianjin-chuangye",
    title: "创业环保南部区域·多厂业财一体化管理",
    category: "水务集团数字化运营",
    products: ["CW-POM", "CW-GOM"],
    location: "天津",
    client: "天津创业环保南部区域公司",
    image: "/cases/tianjin-chuangye.png",
    summary:
      "面向南部区域公司及下属 10 个子公司、16 座污水处理厂，以数据中台为底座建设区域级运营管理平台，沉淀可复用的数据资产体系与业财融合经营体系。",
    background:
      "项目面向天津创业环保南部区域公司及下属 10 个子公司、16 座污水处理厂，需要在区域层面实现经营、运营、资产、安全、质量等多源异构数据的汇聚融合与标准化治理，为决策人员、管理人员和一线操作人员提供一体化数字化管理工具。",
    scope: [
      "以数据中台为底座，统一数据采集、清洗、建模与资产化管理",
      "一期落地单厂数字化运营管理平台 POM，同步搭建区域数据中台基础框架",
      "沉淀核心数据资产，构建数据服务目录",
      "迭代升级为集团级运营管理平台 GOM，完成与集团管理系统的数据互通",
    ],
    results: [
      "实现集团、区域、子公司和水厂之间的数据链路贯通与业务流程协同",
      "沉淀可复用的数据资产体系与业财融合经营体系",
      "以云平台 + 数据服务方式赋能南部大区 16 座污水处理厂",
    ],
    tags: ["数据中台", "业财一体化", "区域集约化"],
    metrics: [
      { value: "16 座", label: "污水处理厂" },
      { value: "10 个", label: "下属子公司" },
      { value: "1 个", label: "区域数据中台" },
      { value: "100%", label: "数据链路贯通" },
    ],
    overview: {
      target: "以数据中台为底座，建设区域级运营管理平台。",
      coverage: "覆盖南部大区 10 家子公司、16 座污水处理厂。",
      value: "沉淀可复用的数据资产体系与业财融合经营体系。",
      period: "一期 POM 落地 + 迭代升级 GOM。",
    },
  },

  // ===== 二、排水一体化管理 =====
  {
    slug: "qinhuangdao",
    title: "秦皇岛·排水防汛一体化管理平台",
    category: "排水一体化管理",
    products: ["CW-PPI", "防汛管理模块"],
    location: "河北·秦皇岛",
    client: "秦皇岛排水管理单位",
    image: "/cases/qinhuangdao.png",
    summary:
      "覆盖 4 座污水处理厂、2 座污泥处理厂、5 个非水管理处、51 座泵站及 400 余公里管网，构建厂、站、网一体化运营管理平台。",
    background:
      "项目覆盖城域范围内 4 座污水处理厂、2 座污泥处理厂、5 个非水管理处、51 座泵站及 400 余公里管网，依托云建标 IoT 物联数据平台、厂网一体化管理系统 PPI 和城市防汛管理系统 USM，构建厂、站、网一体化运营管理平台。",
    scope: [
      "融合实时运行数据与 AI 模型能力",
      "支撑排水综合决策、防汛应急、管网管理、泵站调度",
      "污水厂运营与厂网协同运营多业务场景",
      "设施运行监测、风险识别、调度联动与应急处置全过程管理",
    ],
    results: [
      "显著提升排水系统运行效率与管理协同能力",
      "提升水环境保障水平",
      "为城市排水业务一体化管理提供可复制的示范样板",
    ],
    tags: ["厂网一体化", "排水防汛调度", "厂网协同"],
    metrics: [
      { value: "4 座", label: "污水处理厂" },
      { value: "51 座", label: "泵站接入" },
      { value: "400+ km", label: "管网覆盖" },
      { value: "2 座", label: "污泥处理厂" },
    ],
    overview: {
      target: "构建厂、站、网一体化运营管理平台。",
      coverage: "覆盖厂、站、网及非水管理处全要素设施。",
      value: "提升排水系统运行效率与管理协同能力。",
      period: "厂网一体化平台整体交付。",
    },
  },
  {
    slug: "dalian-drainage",
    title: "大连·大连智慧排水防涝项目",
    category: "排水一体化管理",
    products: ["CW-PPI", "防汛管理模块"],
    location: "辽宁·大连",
    client: "大连排水管理单位",
    image: "/cases/dalian-drainage.png",
    summary:
      "统一接入排水户、泵站、管网、排口、易涝点等设施数据，形成运行监测、资产管理、风险预警、事件处置、调度指挥与综合分析能力。",
    background:
      "项目依托云建标 IoT 物联数据平台、厂网一体化管理系统 PPI 和城市防汛管理系统 USM，支撑大连城市排水日常运维与内涝应急管理。系统统一接入排水户、泵站、管网、排口、易涝点等设施数据。",
    scope: [
      "统一接入排水户、泵站、管网、排口、易涝点等设施数据",
      "形成运行监测、资产管理与风险预警能力",
      "事件处置、调度指挥与综合分析",
      "高度配置化、模块化架构，灵活扩展",
    ],
    results: [
      "提升排水设施感知、业务协同、风险研判与应急处置水平",
      "支撑向厂网一体化运营、排水调度延伸",
      "为城市水务综合管理提供平台底座",
    ],
    tags: ["内涝应急", "配置化平台", "厂网延伸"],
    metrics: [
      { value: "6 类", label: "排水设施接入" },
      { value: "全要素", label: "设施统一纳管" },
      { value: "100%", label: "易涝点覆盖" },
      { value: "模块化", label: "灵活扩展架构" },
    ],
    overview: {
      target: "支撑城市排水日常运维与内涝应急管理。",
      coverage: "接入排水户、泵站、管网、排口、易涝点等设施。",
      value: "提升感知、协同、风险研判与应急处置水平。",
      period: "平台底座建设 + 厂网一体化持续延伸。",
    },
  },

  // ===== 三、数字水厂 =====
  {
    slug: "shanghai-linkang",
    title: "上海临港·AI 全流程智慧水厂",
    category: "数字水厂",
    products: ["CW-Agent", "CW-POM", "CW-IOT", "CW-Visual", "智能巡检机器人"],
    location: "上海·临港",
    client: "上海城投",
    image: "/cases/shanghai-linkang.png",
    summary:
      "围绕“平台底座 + 智能控制 + 智慧运营”建设，以 CW-IOT 汇聚全厂数据、CW-3DP 构建全要素三维数字映射，依托 CW-Agent 智能体实现主动监盘与智能决策。",
    background:
      "项目以 CW-IOT 汇聚全厂数据，通过 CW-3DP 构建水厂“设施、设备、工艺、人员、事件”全要素三维数字映射，以 CW-POM 打通生产运营管理流程，并集成视觉智能算法与多模态机器人，形成数字化运营管理和人机协同智能巡检能力。",
    scope: [
      "CW-IOT 汇聚全厂数据构建平台底座",
      "CW-3DP 构建全要素三维数字映射",
      "CW-POM 打通生产运营管理流程",
      "融合机理与数据驱动模型，实现仿真、预测、优化与安全下控",
      "CW-Agent 智能体调用接口与模型能力辅助决策",
    ],
    results: [
      "依托智能体实现主动监盘、异常预测与智能决策",
      "有效提升水质保障、运行稳定与成本管控水平",
      "助力构建新一代 AI 驱动的无人值守水厂运营模式",
    ],
    tags: ["AI 全流程", "人机协同", "无人值守"],
    metrics: [
      { value: "全流程", label: "AI 智慧运营" },
      { value: "1 套", label: "CW-Agent 智能体" },
      { value: "全要素", label: "三维数字映射" },
      { value: "无人值守", label: "运营模式目标" },
    ],
    overview: {
      target: "按“平台底座 + 智能控制 + 智慧运营”一体化建设。",
      coverage: "覆盖设施、设备、工艺、人员、事件全要素。",
      value: "实现主动监盘、异常预测与智能决策。",
      period: "新一代 AI 驱动示范工程。",
    },
  },
  {
    slug: "xian-third-reclaimed",
    title: "西安·第三再生水厂数字化运营",
    category: "数字水厂",
    products: ["CW-POM", "CW-Visual"],
    location: "陕西·西安",
    client: "西安净水公司",
    image: "/cases/xian-third-reclaimed.png",
    summary:
      "作为西安净水公司从点状智能探索迈向全局智慧运营的重要样板，建设数字管理平台与三维数字孪生系统，提升水厂管理的线上化、标准化与可视化水平。",
    background:
      "西安市第三再生水厂智慧化项目是西安净水公司从点状智能探索迈向全局智慧运营的重要样板。我司作为项目数字化能力建设参与方，重点承担数字管理平台和三维数字孪生系统建设。",
    scope: [
      "CW-POM 打通巡检、维修、化验、交接班、培训、绩效等日常管理业务",
      "推动生产一线与管理后台的数据联动和流程闭环",
      "CW-Visual 三维数字孪生系统 1:1 还原厂区空间、设备状态与运行环境",
      "接入实时数据、视频分析和 AI 模型，实现运行态势可视化模拟推演",
    ],
    results: [
      "提升水厂管理的线上化、标准化、可追溯和可视化水平",
      "实现厂区运行态势、设备健康与关键工艺参数的可视化推演",
      "为多厂复制推广和厂网一体化运营奠定数字化基础",
    ],
    tags: ["生产运行闭环", "三维可视化", "可追溯"],
    metrics: [
      { value: "1:1", label: "三维空间还原" },
      { value: "6 类", label: "日常管理业务" },
      { value: "全流程", label: "数据联动闭环" },
      { value: "可复制", label: "多厂推广样板" },
    ],
    overview: {
      target: "建设数字管理平台与三维数字孪生系统。",
      coverage: "覆盖巡检、维修、化验、交接班、培训、绩效。",
      value: "提升管理线上化、标准化与可视化水平。",
      period: "从点状智能迈向全局智慧运营样板。",
    },
  },
  {
    slug: "mianyang-taziba",
    title: "四川·绵阳塔子坝黑灯水厂",
    category: "数字水厂",
    products: ["CW-POM", "CW-Visual"],
    location: "四川·绵阳",
    client: "绵阳塔子坝污水处理厂",
    image: "/cases/mianyang-taziba.png",
    summary:
      "作为北控水务集团标杆水厂及四川大区中心水厂，高标准建设智慧水务实现黑灯水厂目标，并以 1+N 组团式管理赋能其他分支水厂。",
    background:
      "塔子坝污水厂作为北控水务集团标杆水厂及四川大区的中心水厂，高标准建设智慧水务，实现黑灯水厂的目标。建设了 CW-POM 水厂运营管理系统、CW-Visual 水厂数字孪生、远程运维系统、专家远程支持系统、工艺仿真系统、全流程智能控制等多项系统。",
    scope: [
      "CW-POM 对运行、设备维修、水质检测进行规范化标准化可视化管理",
      "CW-Visual 水厂数字孪生与工艺仿真系统",
      "远程运维系统与专家远程支持系统",
      "以塔子坝为核心的 1+N 组团式管理，远程监控五座分支水厂",
    ],
    results: [
      "有效提高污水厂管理效能，实现黑灯水厂目标",
      "向其他分支水厂赋能，实现统一标准化运营",
      "获“双百跨越标杆型智慧污水厂”“全国先进城市污水处理厂”等荣誉",
    ],
    tags: ["黑灯水厂", "1+N 组团管理", "智慧运营标杆"],
    metrics: [
      { value: "黑灯", label: "无人值守水厂" },
      { value: "5 座", label: "远程分支水厂" },
      { value: "1+N", label: "组团式管理" },
      { value: "多项", label: "国家级荣誉" },
    ],
    overview: {
      target: "高标准建设智慧水务，实现黑灯水厂目标。",
      coverage: "覆盖运行、设备维修、水质检测全流程。",
      value: "提升管理效能并向分支水厂标准化赋能。",
      period: "北控水务集团标杆型智慧污水厂。",
    },
  },

  // ===== 四、三维数字孪生 =====
  {
    slug: "xian-third-twin",
    title: "西安第三再生水厂·三维数字孪生",
    category: "三维数字孪生",
    products: ["CW-Visual"],
    location: "陕西·西安",
    client: "西安净水公司",
    image: "/cases/xian-third-twin.png",
    summary:
      "引入数字孪生技术打造全息透明的水厂模型，融合运营管理实时数据与工单数据，实现再生水厂生产运营的全面三维运营管理。",
    background:
      "西安第三再生水厂通过引入数字孪生技术，打造了一个全息透明的水厂模型，融合运营管理实时数据、工单数据，构建“数字基座 + AI 模型”技术体系。",
    scope: [
      "实现线上巡检、三维设备管理、三维控制回路展现、工艺原理展现",
      "结合各类控制模型与工艺仿真模型",
      "以趋势图形式展示各工艺段污染物沿程降解趋势等实时与模拟数据",
      "构建“数字基座 + AI 模型”技术体系",
    ],
    results: [
      "首次实现进水至出水全工艺链智能协同调控",
      "推动水厂运营从经验驱动转向实时数据驱动",
      "实现再生水厂生产运营的全面三维运营管理",
    ],
    tags: ["全息透明", "工艺仿真", "数据驱动"],
    metrics: [
      { value: "全息", label: "透明水厂模型" },
      { value: "全工艺链", label: "智能协同调控" },
      { value: "实时", label: "数据驱动运营" },
      { value: "100%", label: "三维运营管理" },
    ],
    overview: {
      target: "打造全息透明的水厂数字孪生模型。",
      coverage: "覆盖巡检、设备、控制回路与工艺原理。",
      value: "推动水厂运营从经验驱动转向数据驱动。",
      period: "构建“数字基座 + AI 模型”技术体系。",
    },
  },
  {
    slug: "guangzhou-zengcheng",
    title: "广州增城开发区下沉式污水处理厂",
    category: "三维数字孪生",
    products: ["CW-Visual"],
    location: "广东·广州增城",
    client: "广州增城开发区",
    image: "/cases/guangzhou-zengcheng.png",
    summary:
      "针对全地下布置、地面景观公园的新模式水厂，以 BIM 模型建设地下空间，结合 UWB 人员定位与视频识别构建立体安全保障体系。",
    background:
      "广州增城开发区下沉式污水处理厂采用全地下布置形式、地面空间建设景观公园的新模式水厂。数字孪生系统利用 BIM 模型建设地下空间，全面展现下沉式污水厂运行状态、设备状态及工艺原理。",
    scope: [
      "利用 BIM 模型建设地下空间三维场景",
      "全面展现运行状态、设备状态及工艺原理",
      "UWB 人员定位、视频识别与数字孪生融合",
      "一键求助呼叫与人员快速定位",
    ],
    results: [
      "多维度监测人员与生产异常情况",
      "保障应急撤离及时、无遗漏",
      "形成“全息感知、统一预警、智能联动”的立体安全保障体系",
    ],
    tags: ["下沉式水厂", "UWB 人员定位", "立体安全"],
    metrics: [
      { value: "全地下", label: "下沉式布置" },
      { value: "BIM", label: "地下空间建模" },
      { value: "UWB", label: "人员精准定位" },
      { value: "立体", label: "安全保障体系" },
    ],
    overview: {
      target: "以 BIM 模型建设地下空间三维数字孪生。",
      coverage: "全面展现运行状态、设备状态与工艺原理。",
      value: "形成全息感知、统一预警、智能联动的安全体系。",
      period: "全地下 + 地面景观公园新模式水厂。",
    },
  },
  {
    slug: "shanghai-fangzha",
    title: "上海泵闸署·城市智慧防汛",
    category: "三维数字孪生",
    products: ["FPM®系统", "CW-Visual"],
    location: "上海·浦东",
    client: "上海泵闸管理署",
    image: "/cases/shanghai-fangzha.png",
    summary:
      "服务浦东新区城市内河运营管理，以 FPM® 系统与 Visual 数字孪生结合，“一图一屏”全景还原防汛业务关键要素，打造三维场景下一体化业务流转。",
    background:
      "上海泵闸署城市智慧防汛项目服务于浦东新区城市内河运营管理。利用 FPM® 系统与 Visual 数字孪生结合，整合城市 CIM 数据、水文资料、水位流量现场监测及视频数据，构建高仿真三维场景。",
    scope: [
      "整合 CIM 数据、水文资料、水位流量监测与视频数据",
      "构建高仿真三维场景，“一图一屏”全景还原防汛业务",
      "跨维度多角度关联各类业务数据",
      "直达工单、设备、巡检、安全管理等实际业务系统",
    ],
    results: [
      "为科学决策提供全面支撑",
      "实现三维场景下一体化的业务流转",
      "打造极致交互体验，推动实际业务应用创新",
    ],
    tags: ["一图一屏", "泵闸防汛", "业务一体化"],
    metrics: [
      { value: "一图一屏", label: "防汛全景还原" },
      { value: "高仿真", label: "三维孪生场景" },
      { value: "多源", label: "数据融合接入" },
      { value: "一体化", label: "业务流转闭环" },
    ],
    overview: {
      target: "以 FPM® + Visual 构建城市智慧防汛体系。",
      coverage: "整合 CIM、水文、水位流量与视频数据。",
      value: "为科学决策提供全面支撑与业务一体化流转。",
      period: "服务浦东新区城市内河运营管理。",
    },
  },
  {
    slug: "heshan-water-env",
    title: "鹤山水环境二三维智慧管控",
    category: "三维数字孪生",
    products: ["CW-Visual"],
    location: "广东·江门鹤山",
    client: "鹤山市水务管理单位",
    image: "/cases/heshan-water-env.png",
    summary:
      "首个大尺度、全要素流域数字孪生项目，将 45 条河流、74 宗水库、32 宗重点山塘纳入河长制管理，按“六个一”架构进行水环境信息化建设。",
    background:
      "鹤山市被列为首批广东省全面推行河长制示范县之一，境内河库众多。鹤山二三维水环境智慧管控项目为首个大尺度、全要素流域数字孪生项目，将 45 条河流、74 宗水库、32 宗重点山塘纳入河长制管理范围。",
    scope: [
      "一张空天地协同监测网",
      "二三维一张图实现可视化决策，一个本地水资源大数据库",
      "多级河长一体化扁平化管理与实时绩效考核排行榜",
      "对接 12345 市民热线与微信公众号，整合信息发布与公众监督",
    ],
    results: [
      "构建“六个一”水环境信息化架构",
      "形成信息双向流通渠道与事件上报闭环",
      "吸引群众参与水环境保护与水生态修复，服务智慧城市运营",
    ],
    tags: ["流域数字孪生", "河长制", "六个一架构"],
    metrics: [
      { value: "45 条", label: "河流纳管" },
      { value: "74 宗", label: "水库纳管" },
      { value: "32 宗", label: "重点山塘" },
      { value: "六个一", label: "信息化架构" },
    ],
    overview: {
      target: "打造首个大尺度、全要素流域数字孪生。",
      coverage: "将河流、水库、山塘全域纳入河长制管理。",
      value: "构建“六个一”水环境信息化架构与上报闭环。",
      period: "广东省全面推行河长制示范县。",
    },
  },
]

// 各项目大致经纬度坐标（[经度, 纬度]），用于中国地图标记示意
export const caseCoords: Record<string, [number, number]> = {
  "beikong-shuiwu": [116.4, 39.9], // 集团总部·北京
  "tianjin-chuangye": [117.2, 39.13], // 天津
  qinhuangdao: [119.6, 39.93], // 河北·秦皇岛
  "dalian-drainage": [121.6, 38.91], // 辽宁·大连
  "shanghai-linkang": [121.92, 30.9], // 上海·临港
  "xian-third-reclaimed": [108.94, 34.34], // 陕西·西安
  "mianyang-taziba": [104.74, 31.46], // 四川·绵阳
  "xian-third-twin": [108.6, 34.55], // 陕西·西安（偏移避免重叠）
  "guangzhou-zengcheng": [113.81, 23.29], // 广东·广州增城
  "shanghai-fangzha": [121.55, 31.23], // 上海·浦东
  "heshan-water-env": [112.96, 22.77], // 广东·江门鹤山
}

export function getCaseBySlug(slug: string) {
  return cases.find((c) => c.slug === slug)
}

// 仅地图定位展示的项目（无详情页）：地图上显示项目名称，不可点击进入详情
export interface MapMarker {
  name: string
  location: string
  /** 解决方案分类，用于地图点位着色与筛选 */
  category: CaseCategory
  coord: [number, number]
}

export const mapMarkers: MapMarker[] = [
  { name: "大岭山数字双胞胎", location: "广东·东莞大岭山", category: "三维数字孪生", coord: [113.9, 22.92] },
  { name: "凯里多厂集约化管理", location: "贵州·凯里", category: "水务集团数字化运营", coord: [107.98, 26.57] },
  { name: "安宁多厂集约化管理", location: "云南·安宁", category: "水务集团数字化运营", coord: [102.48, 24.92] },
  { name: "中科院江门项目", location: "广东·江门", category: "三维数字孪生", coord: [113.08, 22.58] },
  { name: "湘雅医院 BIM 咨询", location: "湖南·长沙", category: "三维数字孪生", coord: [113.15, 28.35] },
  { name: "智慧方正项目", location: "黑龙江·方正县", category: "三维数字孪生", coord: [128.83, 45.85] },
  {
    name: "威宁地理信息共享服务平台及可视化资源管理系统",
    location: "贵州·威宁",
    category: "三维数字孪生",
    coord: [104.28, 26.86],
  },
  { name: "四川眉山村镇污水智慧运营", location: "四川·眉山", category: "排水一体化管理", coord: [103.83, 30.05] },
  { name: "台州多厂集约化管理", location: "浙江·台州", category: "水务集团数字化运营", coord: [121.42, 28.66] },
  { name: "锦州多厂集约化管理", location: "辽宁·锦州", category: "水务集团数字化运营", coord: [121.13, 41.1] },
  { name: "绵阳多厂集约化管理", location: "四川·绵阳", category: "水务集团数字化运营", coord: [105.1, 31.7] },
  { name: "湘潭多厂集约化管理", location: "湖南·湘潭", category: "水务集团数字化运营", coord: [112.94, 27.83] },
  { name: "新疆多厂集约化管理", location: "新疆·乌鲁木齐", category: "水务集团数字化运营", coord: [87.62, 43.83] },
  { name: "胶州多厂集约化管理", location: "山东·胶州", category: "水务集团数字化运营", coord: [120.03, 36.28] },
  { name: "科源多厂集约化管理", location: "山东·潍坊", category: "水务集团数字化运营", coord: [119.16, 36.71] },
  { name: "昆山多厂集约化管理", location: "江苏·昆山", category: "水务集团数字化运营", coord: [120.98, 31.39] },
  { name: "永州多厂集约化管理", location: "湖南·永州", category: "水务集团数字化运营", coord: [111.61, 26.42] },
  { name: "银川永宁二污、九污集控", location: "宁夏·银川", category: "数字水厂", coord: [106.05, 38.28] },
  { name: "苏托垸智慧水厂建设", location: "湖南·长沙", category: "数字水厂", coord: [112.85, 28.05] },
  { name: "彭州智慧水务", location: "四川·彭州", category: "排水一体化管理", coord: [103.96, 30.99] },
  { name: "银川多厂集约化管理", location: "宁夏·银川", category: "水务集团数字化运营", coord: [106.4, 38.6] },
  { name: "香港佳发海上环卫管理系统", location: "香港", category: "水务集团数字化运营", coord: [114.17, 22.32] },
  { name: "陡沟河智慧水务建设", location: "四川·成都", category: "排水一体化管理", coord: [104.07, 30.57] },
  { name: "济南多厂集约化管理", location: "山东·济南", category: "水务集团数字化运营", coord: [117.0, 36.65] },
  { name: "临汾多厂集约化管理", location: "山西·临汾", category: "水务集团数字化运营", coord: [111.52, 36.08] },
  { name: "鹤山大规模村污智慧化提升", location: "广东·江门鹤山", category: "排水一体化管理", coord: [112.7, 22.6] },
  { name: "三河多厂集约化管理", location: "河北·廊坊三河", category: "水务集团数字化运营", coord: [117.0, 39.98] },
  { name: "董大水库数字孪生管控平台", location: "安徽·合肥", category: "排水一体化管理", coord: [117.28, 31.86] },
  { name: "红旗水厂智慧化", location: "湖北·随州", category: "数字水厂", coord: [113.38, 31.69] },
  {
    name: "云冈经济技术开发区工业污水处理厂智慧水务",
    location: "山西·大同云冈",
    category: "数字水厂",
    coord: [113.2, 40.05],
  },
  { name: "揭阳空港智慧水务", location: "广东·揭阳", category: "数字水厂", coord: [116.37, 23.55] },
  { name: "惠州江北智慧水务管理平台", location: "广东·惠州江北", category: "数字水厂", coord: [114.42, 23.13] },
  {
    name: "营口市老边区污水处理厂智慧水务系统",
    location: "辽宁·营口老边",
    category: "数字水厂",
    coord: [122.35, 40.68],
  },
  {
    name: "增城区开发区下沉式污水处理厂智慧水务系���",
    location: "广东·广州增城",
    category: "数字水厂",
    coord: [113.9, 23.4],
  },
  { name: "舟山市定海水厂智慧水务项目", location: "浙江·舟山定海", category: "数�����水厂", coord: [122.1, 30.02] },
  { name: "杭州水务城北水厂三维系统", location: "浙江·杭州", category: "三维数字孪生", coord: [120.1, 30.35] },
  {
    name: "石家庄市桥西污水处理厂提标改造工程",
    location: "河北·石家庄",
    category: "数字水厂",
    coord: [114.48, 38.05],
  },
  { name: "清远村污智慧化", location: "广东·清远", category: "排水一体化管理", coord: [113.05, 23.7] },
  { name: "合肥陶冲水厂", location: "安徽·合肥", category: "数字水厂", coord: [117.35, 31.95] },
  { name: "合肥于湾水厂", location: "安徽·合肥", category: "数字水厂", coord: [117.18, 31.78] },
  { name: "杭州七格水厂", location: "浙江·杭州", category: "数字水厂", coord: [120.35, 30.28] },
  { name: "霍邱工业厂", location: "安徽·六安霍邱", category: "数字水厂", coord: [116.28, 32.35] },
  { name: "霍邱生活厂", location: "安徽·六安霍邱", category: "数字水厂", coord: [116.36, 32.43] },
  { name: "霍邱城北水厂", location: "安徽·六安霍邱", category: "数字水厂", coord: [116.2, 32.28] },
  { name: "宝应仙荷水厂", location: "江苏·扬州宝应", category: "数字水厂", coord: [119.31, 33.24] },
  { name: "德清乾元水厂", location: "浙江·湖州德清", category: "数字水厂", coord: [119.97, 30.56] },
  { name: "阜阳颍南水厂", location: "安徽·阜阳", category: "数字水厂", coord: [115.82, 32.85] },
  { name: "阜阳颍东水厂", location: "安徽·阜阳", category: "数字水厂", coord: [115.92, 32.92] },
  { name: "颍上城南水厂", location: "安徽·阜阳颍上", category: "数字水厂", coord: [116.26, 32.63] },
  { name: "创业环保含山水厂", location: "安徽·马鞍山含山", category: "数字水厂", coord: [118.1, 31.73] },
  { name: "贵州小河水厂", location: "贵州·贵阳小河", category: "数字水厂", coord: [106.66, 26.55] },
  { name: "曲靖两江口水厂", location: "云南·曲靖", category: "数字水厂", coord: [103.8, 25.5] },
  { name: "曲靖西城水厂", location: "云南·曲靖", category: "数字水厂", coord: [103.7, 25.56] },
  { name: "创业环保会泽水厂", location: "云南·曲靖会泽", category: "数字水厂", coord: [103.3, 26.41] },
  { name: "长沙环保水厂", location: "湖南·长沙", category: "数字水厂", coord: [112.9, 28.1] },
  { name: "武汉赤壁水厂", location: "湖北·赤壁", category: "数字水厂", coord: [113.9, 29.72] },
  { name: "武汉洪湖水厂", location: "湖北·洪湖", category: "数字水厂", coord: [113.47, 29.8] },
  { name: "武汉咸宁水厂", location: "湖北·咸宁", category: "数字水厂", coord: [114.32, 29.84] },
]

// 将地图定位项目并入各方案「其它参考案例」清单（按分类去重追加）
for (const m of mapMarkers) {
  const list = otherCases[m.category]
  if (list && !list.includes(m.name)) list.push(m.name)
}

// 汇总标签固定排在对应分类的最后，避免后续追加地图项目时被插到列表中间
const trailingSummaryLabels: Partial<Record<CaseCategory, string>> = {
  数字水厂: "300+ 数字水厂落地案例",
  三维数字孪生: "20+ 孪生 / BIM 服务案例",
}

for (const [category, label] of Object.entries(trailingSummaryLabels) as [CaseCategory, string][]) {
  const list = otherCases[category]
  const index = list.indexOf(label)
  if (index !== -1) list.splice(index, 1)
  list.push(label)
}
