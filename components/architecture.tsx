const layers = [
  {
    title: "业务应用层",
    items: ["水厂管理", "泵站管理", "管网管理", "河湖管理", "防汛管理", "调度管理"],
    tone: "primary",
  },
  {
    title: "能力中心层",
    items: [
      "设备中心",
      "工单中心",
      "巡检中心",
      "物资中心",
      "报表中心",
      "告警中心",
      "规则中心",
      "AI智能体中心",
    ],
    tone: "accent",
  },
  {
    title: "数据接入层",
    items: ["IoT平台", "SCADA集成", "GIS地图", "视频平台", "第三方系统"],
    tone: "primary",
  },
  {
    title: "基础支撑层",
    items: ["统一登录", "权限管理", "组织架构", "数据标准", "API开放平台"],
    tone: "accent",
  },
]

export function Architecture() {
  return (
    <section id="capabilities" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">平台能力架构</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            分层解耦、能力复用的水务数字底座
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            从基础支撑到业务应用，四层架构支撑多业态、可扩展的智慧水务体系。
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 sm:flex sm:items-center sm:gap-6"
            >
              <div className="mb-4 w-full shrink-0 sm:mb-0 sm:w-44">
                <span
                  className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    layer.tone === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {layer.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-muted/50 px-3.5 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
