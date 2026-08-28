import type { Metadata } from "next"
import { MapPin, Mail, Building2, ArrowUpRight } from "lucide-react"
import { About } from "@/components/about"
import { Values } from "@/components/values"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "联系我们 | 云建标智慧水务",
  description: "与云建标一起探索水务数字化未来。北京总部及华东、西南、西北业务中心，欢迎商务合作咨询。",
}

const regions = [
  { name: "北京总部", city: "北京" },
  { name: "华东中心", city: "上海" },
  { name: "西南中心", city: "成都" },
  { name: "西北中心", city: "西安" },
]

const cooperation = [
  "水务 AI 智能体平台",
  "厂网河湖一体化建设",
  "数字水厂解决方案",
  "三维数字孪生应用",
]

const qrCodes = [
  { label: "企业微信", src: "/qr/qr-work-wechat.png" },
  { label: "销售微信", src: "/qr/qr-sales-wechat.png" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact Us"
          title="联系我们"
          subtitle="与云建标一起探索水务数字化未来"
        />

        {/* 关于云建标 */}
        <About />

        {/* 企业价值观 */}
        <Values />

        <section className="v4-section bg-[#05090c]">
          <div className="relative z-[1]">
            <div className="mb-12">
              <span className="v4-kicker">Get in touch / 联系方式</span>
              <h2 className="mt-6 max-w-5xl text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-6xl">
                从一次沟通开始，<br /><span className="text-white/35">让水务运营更进一步。</span>
              </h2>
            </div>

            <div className="v4-flat-grid lg:grid-cols-[1.35fr_.65fr]">
              {/* 公司信息 */}
              <div className="bg-transparent py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center border border-primary/25 bg-primary/[0.08] text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <div><span className="v4-index">HEADQUARTERS / BEIJING</span><h3 className="mt-1 text-xl font-medium text-foreground">北京云建标科技有限公司</h3></div>
                </div>
                <ul className="mt-8 grid gap-4 py-2">
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    地址：北京市朝阳区新源里16号琨莎大厦2座901室
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4 shrink-0 text-primary" />
                    邮箱：
                    <a href="mailto:service@cyberwater.cn" className="text-primary transition-colors hover:text-accent">
                      service@cyberwater.cn
                    </a>
                  </li>
                </ul>

                <h3 className="mt-8 mb-4 text-sm font-medium text-foreground">全国业务布局</h3>
                <div className="v4-flat-grid grid-cols-2 sm:grid-cols-4">
                  {regions.map((r, index) => (
                    <div
                      key={r.name}
                      className="bg-transparent py-4 transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="v4-index">0{index + 1}</span><p className="mt-4 text-sm font-medium text-foreground">{r.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.city} · CYBERWATER</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 二维码 */}
              <div className="bg-transparent py-4">
                <span className="v4-index">SCAN / CONNECT</span><h3 className="mt-3 text-xl font-medium text-foreground">扫码咨询</h3>
                <p className="mt-2 text-sm text-muted-foreground">扫码添加，获取产品资料与方案咨询</p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {qrCodes.map((qr) => (
                    <div key={qr.label} className="flex flex-col items-center gap-2">
                      <div className="bg-white p-2 shadow-sm">
                        <img
                          src={qr.src || "/placeholder.svg"}
                          alt={qr.label}
                          loading="lazy"
                          decoding="async"
                          className="size-28 object-contain"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{qr.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 商务合作 */}
            <div className="mt-16 pt-10">
              <span className="v4-kicker">Cooperation / 商务合作</span>
              <h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] text-foreground">我们可以一起完成什么</h2>
              <p className="mt-2 text-sm text-muted-foreground">如果您希望了解以下方向，欢迎联系我们：</p>
              <div className="v4-flat-grid mt-8 sm:grid-cols-2 lg:grid-cols-4">
                {cooperation.map((c, index) => (
                  <div
                    key={c}
                    className="bg-transparent py-6 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="v4-index">0{index + 1}</span><span className="mt-5 block">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部 CTA */}
            <div className="relative mt-16 overflow-hidden bg-[#071015] px-6 py-12 sm:px-10 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-balance text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
                  开启水务数字化升级之旅
                </h2>
                <a
                  href="mailto:service@cyberwater.cn"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  立即咨询
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
