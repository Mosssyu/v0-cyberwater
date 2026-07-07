import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "网站地图 | 云建标智慧水务",
  description: "快速了解云建标官网结构：核心产品、解决方案与经典案例、关于我们、联系我们及法律信息。",
}

type Group = {
  title: string
  links: { label: string; desc?: string; href: string }[]
}

const groups: Group[] = [
  {
    title: "首页",
    links: [{ label: "公司首页", href: "/" }],
  },
  {
    title: "核心产品",
    links: [
      { label: "CW-Agent", desc: "水务智能体平台", href: "/#product-agent" },
      { label: "CW-PPI", desc: "厂网河湖一体化平台", href: "/#product-ppi" },
      { label: "CW-3DP", desc: "三维数字孪生平台", href: "/#product-3dp" },
      { label: "CW-POM", desc: "数字水厂平台", href: "/#product-pom" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { label: "水务集团数字化运营", href: "/#cases" },
      { label: "排水一体化管理", href: "/#cases" },
      { label: "数字水厂建设", href: "/#cases" },
      { label: "三维数字孪生应用", href: "/#cases" },
    ],
  },
  {
    title: "经典案例",
    links: [
      { label: "上海城投临港供水厂", href: "/#cases" },
      { label: "上海城投临港污水厂", href: "/#cases" },
      { label: "上海浦东水务北水厂", href: "/#cases" },
      { label: "杭州城北水厂", href: "/#cases" },
      { label: "西安水务集团项目", href: "/#cases" },
      { label: "北京定福庄水厂", href: "/#cases" },
    ],
  },
  {
    title: "关于我们",
    links: [
      { label: "公司介绍", href: "/#about" },
      { label: "成长历程", href: "/#about" },
      { label: "新闻动态", href: "/news" },
    ],
  },
  {
    title: "联系我们",
    links: [
      { label: "企业地址", href: "/contact" },
      { label: "联系方式", href: "/contact" },
      { label: "商务咨询", href: "/contact" },
    ],
  },
  {
    title: "法律信息",
    links: [
      { label: "隐私政策", href: "/privacy" },
      { label: "服务条款", href: "/terms" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero eyebrow="Sitemap" title="网站地图" subtitle="快速了解云建标官网结构" />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
                >
                  <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                    <span className="h-4 w-1 rounded-full bg-primary" />
                    {group.title}
                  </h2>
                  <ul className="grid gap-1.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-primary/[0.06]"
                        >
                          <span>
                            <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                              {link.label}
                            </span>
                            {link.desc && (
                              <span className="ml-2 text-xs text-muted-foreground">{link.desc}</span>
                            )}
                          </span>
                          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
