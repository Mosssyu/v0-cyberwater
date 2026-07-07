import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Mail, Building2, ArrowUpRight, Award, FileCheck, ShieldCheck } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "联系我们 | 云建标智慧水务",
  description: "与云建标一起探索水务数字化未来。北京总部及华东、西南、西北业务中心，欢迎商务合作咨询。",
}

const aboutIntro =
  "北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，形成了面向水务行业的标准化、产品化、可配置的软件服务能力。"

const aboutStats = [
  { icon: Building2, num: "2015", label: "公司成立" },
  { icon: FileCheck, num: "30+", label: "软件著作权" },
  { icon: ShieldCheck, num: "10+", label: "硬件发明专利" },
  { icon: Award, num: "AAA", label: "企业信用等级" },
]

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
        <section id="about" className="border-b border-border/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
                About
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                从水务运营中长出来的数字化产品公司
              </h2>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{aboutIntro}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <s.icon className="mx-auto size-5 text-primary" />
                  <div className="mt-2 text-xl font-bold text-foreground">{s.num}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* 公司信息 */}
              <div className="rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.08] text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">北京云建标科技有限公司</h2>
                </div>
                <ul className="mt-6 grid gap-4">
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

                <h3 className="mt-8 mb-4 text-sm font-semibold text-foreground">全国业务布局</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {regions.map((r) => (
                    <div
                      key={r.name}
                      className="rounded-xl border border-border bg-background/40 p-4 text-center transition-colors hover:border-primary/30"
                    >
                      <p className="text-sm font-medium text-foreground">{r.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.city}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 二维码 */}
              <div className="rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-foreground">联系方式</h2>
                <p className="mt-2 text-sm text-muted-foreground">扫码添加，获取产品资料与方案咨询</p>
                <div className="mt-6 flex gap-5">
                  {qrCodes.map((qr) => (
                    <div key={qr.label} className="flex flex-col items-center gap-2">
                      <div className="rounded-xl bg-white p-2 shadow-sm">
                        <img
                          src={qr.src || "/placeholder.svg"}
                          alt={qr.label}
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
            <div className="mt-6 rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground">商务合作</h2>
              <p className="mt-2 text-sm text-muted-foreground">如果您希望了解以下方向，欢迎联系我们：</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {cooperation.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-3 text-sm font-medium text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* 底部 CTA */}
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-primary/30 bg-[oklch(0.21_0.06_256)] p-10 text-center sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
              />
              <div className="relative">
                <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
                  开启水务数字化升级之旅
                </h2>
                <a
                  href="mailto:service@cyberwater.cn"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
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
