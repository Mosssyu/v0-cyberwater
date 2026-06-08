const scenes = [
  {
    img: "/scene-plant.png",
    title: "水厂生产运行驾驶舱",
    desc: "工艺流程、运行参数与设备状态一屏掌控。",
  },
  {
    img: "/scene-pipe.png",
    title: "排水管网一张图",
    desc: "管网资产、运行监测与巡修任务空间化呈现。",
  },
  {
    img: "/scene-flood.png",
    title: "防汛调度指挥中心",
    desc: "雨水情、积水点与泵站联动调度统一指挥。",
  },
  {
    img: "/water-dashboard.png",
    title: "智慧水务运营大屏",
    desc: "厂网河湖一体化运营态势全局可视。",
  },
]

export function Scenes() {
  return (
    <section id="cases" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">典型应用场景</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            可落地、可汇报的智慧水务应用场景
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {scenes.map((scene) => (
            <div
              key={scene.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="overflow-hidden">
                <img
                  src={scene.img || "/placeholder.svg"}
                  alt={scene.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.21_0.06_256)] via-[oklch(0.21_0.06_256)]/70 to-transparent p-6">
                <h3 className="text-lg font-semibold text-white">
                  {scene.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-blue-100/80">
                  {scene.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
