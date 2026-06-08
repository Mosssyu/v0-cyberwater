import { Droplets, Mail, Phone, MapPin } from "lucide-react"

const columns = [
  {
    title: "产品中心",
    links: ["厂网河湖一体化平台", "水厂运营管理系统", "物联网 IoT 平台", "AI 水务智能体平台"],
  },
  {
    title: "解决方案",
    links: ["水厂智慧运营", "排水管网运维", "防汛应急调度", "集团化多厂站管理"],
  },
  {
    title: "技术能力",
    links: ["平台能力架构", "数据接入能力", "AI 智能体能力", "API 开放平台"],
  },
  {
    title: "关于我们",
    links: ["公司介绍", "发展历程", "新闻动态", "加入我们"],
  },
]

export function SiteFooter() {
  return (
    <footer id="about" className="border-t border-border bg-[oklch(0.18_0.04_256)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Droplets className="size-5" />
              </span>
              <span className="text-lg font-semibold">云建标智慧水务</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-blue-100/60">
              面向水务集团、水厂、排水公司与城投平台，构建 AI 驱动的厂网河湖一体化智慧水务数字底座。
            </p>
            <ul className="mt-6 space-y-3 text-sm text-blue-100/70">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-cyan-300" />
                400-888-8888
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-cyan-300" />
                contact@yunjianbiao.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-cyan-300" />
                中国 · 智慧水务产业园
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blue-100/60 transition-colors hover:text-cyan-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-blue-100/50 sm:flex-row">
          <p>© 2026 云建标智慧水务科技有限公司. 保留所有权利.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-cyan-300">
              隐私政策
            </a>
            <a href="#" className="transition-colors hover:text-cyan-300">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
