import { Mail, MapPin } from "lucide-react"
import { PartnerMarquee } from "@/components/partner-marquee"

const columns = [
  {
    title: "核心产品",
    links: [
      { label: "CW-Cloud · 水务 AI 运营平台", href: "/#products" },
      { label: "CW-Visual · 三维数字孪生平台", href: "/#products" },
    ],
  },
  {
    title: "解决方案与经典案例",
    links: [
      { label: "水务集团数字化运营", href: "/#cases" },
      { label: "排水一体化管理", href: "/#cases" },
      { label: "数字水厂", href: "/#cases" },
      { label: "三维数字孪生", href: "/#cases" },
    ],
  },
]

const qrCodes = [
  { label: "企业微信", src: "/qr/qr-work-wechat.png" },
  { label: "售前顾问", src: "/qr/qr-sales-wechat.png" },
]

const branches = [
  "深圳",
  "成都",
  "西安",
  "上海",
]

export function SiteFooter() {
  return (
    <footer id="contact" className="relative scroll-mt-16 overflow-hidden bg-[#020405] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_78%_8%,rgba(119,196,216,.11),transparent_34%)]" aria-hidden="true" />
      <div className="relative px-5 py-16 sm:px-8 lg:px-14 lg:py-24 xl:px-20">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><span className="v4-kicker">Contact / 联系我们</span><h2 className="v4-display mt-6 max-w-5xl">让水务运营，<br /><span className="text-white/32">进入智能时代。</span></h2></div>
          <a href="/contact" className="v4-action-light w-fit">开始沟通</a>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-[1.65fr_1.15fr_1.35fr_1fr]">
          <div className="bg-transparent py-4">
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
            <ul className="mt-6 space-y-3 text-sm text-blue-100/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                <span>北京市朝阳区新源里16号琨莎大厦2座901室</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-cyan-300" />
                service@cyberwater.cn
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
              {branches.map((b, index) => (
                <span
                  key={b}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/36"
                >
                  0{index + 1} / {b}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="bg-transparent py-4">
              <h3 className="v4-rule-label text-white/70">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`block py-1 text-sm text-white/48 transition-colors hover:text-white ${col.title === "核心产品" ? "whitespace-nowrap" : ""}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-transparent py-4">
            <h3 className="v4-rule-label text-white/70">关注与咨询</h3>
            <ul className="mt-5 flex gap-4">
              {qrCodes.map((qr) => (
                <li key={qr.label} className="flex flex-col items-center gap-2">
                  <div className="bg-white p-1.5">
                    <img
                      src={qr.src || "/placeholder.svg"}
                      alt={qr.label}
                      loading="lazy"
                      className="size-20 object-contain"
                    />
                  </div>
                  <span className="text-xs text-blue-100/60">{qr.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-blue-100/40">
              扫码添加，获取产品资料与解决方案咨询
            </p>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-4 py-6 sm:grid-cols-[auto_minmax(0,1fr)]">
          <span className="v4-rule-label shrink-0 text-white/70">Partners / 合作伙伴</span>
          <PartnerMarquee />
        </div>

        <div className="pointer-events-none mt-16 select-none overflow-hidden pb-2 text-[clamp(4rem,12vw,12rem)] font-semibold leading-[.72] tracking-[-.075em] text-white/[0.035]" aria-hidden="true">CYBERWATER</div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-blue-100/50 sm:flex-row">
          <p>© 2026 北京云建标科技有限公司. 京ICP备20010617号</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/privacy" className="transition-colors hover:text-cyan-300">
              隐私政策
            </a>
            <a href="/terms" className="transition-colors hover:text-cyan-300">
              服务条款
            </a>
            <a href="/sitemap" className="transition-colors hover:text-cyan-300">
              网站地图
            </a>
            <a href="/contact" className="transition-colors hover:text-cyan-300">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
