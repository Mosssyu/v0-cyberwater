import { Building2, Factory, Boxes, CloudRain } from "lucide-react"

const solutions = [
  {
    icon: Building2,
    name: "水务集团数字化运营",
    en: "DIGITAL OPERATION OF WATER GROUP",
    pain: "多厂站系统割裂、数据口径不一、集团管控难以下穿到一线。",
    ability: "统一数据标准、多厂站对标、集团报表中心、分级权限与多层级数字化运营。",
    value: "实现集团化统一管控，提升多业态协同与运营决策效率。",
  },
  {
    icon: Boxes,
    name: "一体化业务管理",
    en: "INTEGRATED BUSINESS MANAGEMENT",
    pain: "生产、设备、巡检、工单、报表分散在多套系统，协同效率低。",
    ability: "厂网河湖一体化业务平台，设备、工单、巡检、物资、报表、告警能力中心复用。",
    value: "打通多业态运营，沉淀标准化运营管理经验，降本增效。",
  },
  {
    icon: Factory,
    name: "数字水厂智慧运营",
    en: "SMART WATER PLANT OPERATION",
    pain: "工艺调整依赖经验、设备运维被动响应、生产数据难以分析。",
    ability: "生产运行监测、工艺参数分析、设备预测性维护、AI 工艺优化与智能巡检。",
    value: "提升运行稳定性，降低药耗能耗，打造新一代未来水厂。",
  },
  {
    icon: Boxes,
    name: "BIM + 数字孪生",
    en: "BIM + DIGITAL TWIN",
    pain: "厂区资产与工艺难以可视化、运维场景缺乏直观载体。",
    ability: "BIM+GIS 二三维一体化，数字孪生水厂与流域级孪生，CWVisual 可视化运维。",
    value: "让老厂换新颜，实现资产、工艺、运行的全要素可视化管控。",
  },
  {
    icon: CloudRain,
    name: "防汛应急调度",
    en: "FLOOD CONTROL & DISPATCH",
    pain: "雨情水情分散、积水点处置滞后、调度预案难以联动。",
    ability: "CWPilot 雨水情监测、积水点预警、泵站联动调度、预案一键启动。",
    value: "提前预警研判，快速联动调度，提升城市排涝能力。",
  },
  {
    icon: Building2,
    name: "城乡供水智慧管控",
    en: "URBAN-RURAL WATER SUPPLY",
    pain: "供水管网家底不清、漏损率高、水质监测覆盖不足。",
    ability: "供水一张图、DMA 分区计量、压力流量监测、水质在线监管。",
    value: "降低管网漏损，保障供水安全，提升城乡供水服务水平。",
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">解决方案</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            覆盖四大核心场景的水务数字化方案
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            针对不同业务场景，提供从痛点诊断到能力建设、再到价值落地的完整方案。
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {solutions.map((item) => (
            <div
              key={item.name}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-[10px] tracking-wider text-muted-foreground">
                    {item.en}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-4">
                {[
                  { k: "痛点", v: item.pain, c: "text-destructive" },
                  { k: "能力", v: item.ability, c: "text-primary" },
                  { k: "价值", v: item.value, c: "text-accent" },
                ].map((row) => (
                  <div key={row.k} className="flex gap-4">
                    <dt
                      className={`h-fit w-12 shrink-0 rounded-md bg-muted px-2.5 py-1 text-center text-xs font-medium ${row.c}`}
                    >
                      {row.k}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
