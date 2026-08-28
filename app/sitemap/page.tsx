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
      { label: "CW-Cloud", desc: "水务 AI 运营平台", href: "/#products" },
      { label: "CW-Visual", desc: "三维数字孪生平台", href: "/#products" },
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
      { label: "案例总览", desc: "全国项目分布地图", href: "/cases" },
      { label: "北控水务·集团数字化运营", href: "/cases/beikong-shuiwu" },
      { label: "创业环保·多厂业财一体化", href: "/cases/tianjin-chuangye" },
      { label: "上海临港·AI 全流程智慧水厂", href: "/cases/shanghai-linkang" },
      { label: "西安·第三再生水厂数字化运营", href: "/cases/xian-third-reclaimed" },
      { label: "绵阳塔子坝黑灯水厂", href: "/cases/mianyang-taziba" },
      { label: "鹤山水环境二三维智慧管控", href: "/cases/heshan-water-env" },
    ],
  },
  {
    title: "关于与联系",
    links: [
      { label: "公司介绍", href: "/contact#about" },
      { label: "企业地址", href: "/contact" },
      { label: "联系方式", href: "/contact" },
      { label: "商务咨询", href: "/contact" },
      { label: "新闻动态", href: "/news" },
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
        <section className="v4-section bg-[#05090c]">
          <div className="relative z-[1]">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="v4-kicker">Information Architecture / 信息索引</span>
                <h2 className="mt-6 max-w-4xl text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-6xl">
                  从这里，抵达云建标的每一项能力。
                </h2>
              </div>
              <div className="flex gap-8 font-mono text-xs text-muted-foreground">
                <span><b className="block text-2xl font-medium text-foreground">{groups.length}</b>栏目</span>
                <span><b className="block text-2xl font-medium text-foreground">{groups.reduce((sum, group) => sum + group.links.length, 0)}</b>内容入口</span>
              </div>
            </div>

            <div className="v4-flat-grid md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group, groupIndex) => (
                <div
                  key={group.title}
                  className="group bg-transparent py-6 transition-colors hover:bg-white/[0.02] sm:py-8"
                >
                  <span className="v4-index">SECTION / {String(groupIndex + 1).padStart(2, "0")}</span>
                  <h2 className="mt-4 mb-6 text-2xl font-medium tracking-[-0.03em] text-foreground">
                    {group.title}
                  </h2>
                  <ul className="border-t border-white/10">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group/link flex min-h-14 items-center justify-between gap-4 border-b border-white/8 py-3 transition-colors hover:text-accent"
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground transition-colors group-hover/link:text-accent">
                              {link.label}
                            </span>
                            {link.desc && (
                              <span className="mt-0.5 block text-xs text-muted-foreground">{link.desc}</span>
                            )}
                          </span>
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/50 transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent" />
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
