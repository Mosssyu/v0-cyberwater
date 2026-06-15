import { Mail, MapPin } from "lucide-react"

const columns = [
  {
    title: "核心产品",
    links: ["CWAgent AI 智能体", "CWVisual 数字孪生", "CWPilot 防汛调度", "厂网河湖一体化平台"],
  },
  {
    title: "解决方案",
    links: ["水务集团数字化运营", "一体化业务管理", "BIM+数字孪生", "防汛应急调度"],
  },
  {
    title: "成功案例",
    links: ["数字水厂", "集团数字运营", "多厂集约化管理", "BIM+数字孪生"],
  },
  {
    title: "关于我们",
    links: ["公司介绍", "成长历程", "新闻动态", "加入我们"],
  },
]

const branches = [
  "深圳 · 南山区沙河西路南山智谷产业园",
  "成都 · 天府新区同森元气港",
  "西安 · 高新区清华科技园",
  "上海 · 普陀区华宏商务中心",
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[oklch(0.12_0.012_252)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-2 text-left">
              <img
                src="/cyberwater-logo-dark.png"
                alt="云建标 CYBERWATER"
                className="h-9 w-auto object-scale-down"
              />
              <span className="text-[11px] tracking-[0.2em] text-blue-100/50">
                执数智之器 · 精水务之业
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-blue-100/60">
              北京云建标科技有限公司，国家高新技术企业、中国水协智慧水务专业委员会委员单位，致力于成为最懂运营管理的智慧水务科技公司。
            </p>
            <ul className="mt-6 space-y-3 text-sm text-blue-100/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                北京市东城区东直门外大街 46 号天恒大厦 B 座 16 层
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-cyan-300" />
                service@cyberwater.cn
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {branches.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-blue-100/50"
                >
                  {b}
                </span>
              ))}
            </div>
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
          <p>© 2026 北京云建标科技有限公司. 京ICP备20010617号</p>
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
