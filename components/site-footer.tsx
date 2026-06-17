import { Mail, MapPin } from "lucide-react"

const columns = [
  {
    title: "核心产品",
    links: [
      { label: "CW-Agent · 水务智能体", href: "/#product-agent" },
      { label: "CW-PPI · 厂网河湖一体化", href: "/#product-ppi" },
      { label: "CW-3DP · 数字孪生", href: "/#product-3dp" },
      { label: "CW-POM · 数字水厂", href: "/#product-pom" },
    ],
  },
  {
    title: "项目案例",
    links: [
      { label: "数字水厂", href: "/#cases" },
      { label: "集团数字运营", href: "/#cases" },
      { label: "多厂集约化管理", href: "/#cases" },
      { label: "BIM+数字孪生", href: "/#cases" },
    ],
  },
  {
    title: "关于我们",
    links: [
      { label: "公司介绍", href: "/#about" },
      { label: "成长历程", href: "/#about" },
      { label: "新闻动态", href: "/#news" },
    ],
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
            <div className="flex flex-col items-start gap-2 text-left">
              <img
                src="/cyberwater-logo-dark.png"
                alt="云建标 CYBERWATER"
                className="-ml-2 h-9 w-auto object-scale-down object-left"
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
                北京市朝阳区新源里16号琨莎大厦2座901室
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
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-blue-100/60 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
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
