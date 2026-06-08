import { Factory, Waves, CloudRain, Building2 } from "lucide-react"

const solutions = [
  {
    icon: Factory,
    name: "水厂智慧运营",
    pain: "生产数据分散、工艺调整依赖经验、设备运维被动响应。",
    ability: "生产运行监测、工艺参数分析、设备预测性维护、智能巡检工单。",
    value: "提升运行稳定性，降低药耗能耗，沉淀工艺运营经验。",
  },
  {
    icon: Waves,
    name: "排水管网运维",
    pain: "管网家底不清、运行状态不可见、巡检维修协同效率低。",
    ability: "管网一张图、液位流量监测、淤堵预警、巡修工单闭环。",
    value: "摸清管网资产，提升运维响应速度，减少冒溢风险。",
  },
  {
    icon: CloudRain,
    name: "防汛应急调度",
    pain: "雨情水情分散、积水点处置滞后、调度预案难以联动。",
    ability: "雨水情监测、积水点预警、泵站联动调度、预案一键启动。",
    value: "提前预警研判，快速联动调度，提升城市排涝能力。",
  },
  {
    icon: Building2,
    name: "集团化多厂站管理",
    pain: "多厂站系统割裂、数据口径不一、集团管控难以下穿。",
    ability: "统一数据标准、多厂站对标、集团报表中心、分级权限管控。",
    value: "实现集团化统一管控，提升多业态协同与运营决策效率。",
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

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {solutions.map((item) => (
            <div
              key={item.name}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.name}
                </h3>
              </div>

              <dl className="mt-6 space-y-4">
                {[
                  { k: "痛点", v: item.pain, c: "text-destructive" },
                  { k: "能力", v: item.ability, c: "text-primary" },
                  { k: "价值", v: item.value, c: "text-accent" },
                ].map((row) => (
                  <div key={row.k} className="flex gap-4">
                    <dt
                      className={`shrink-0 rounded-md bg-muted px-2.5 py-1 text-xs font-medium ${row.c}`}
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
