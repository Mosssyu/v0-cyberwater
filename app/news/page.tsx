import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Building2, Users, MapPin, ShieldCheck } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsExplorer } from "@/components/news/news-explorer"
import { newsStats } from "@/lib/news"

export const metadata: Metadata = {
  title: "新闻动态 | 云建标智慧水务",
  description: "洞察行业趋势，见证项目落地。查看云建标智慧水务的最新客户案例、公司新闻、行业动态与技术创新。",
}

const statIcons = [Building2, Users, MapPin, ShieldCheck]

export default function NewsListPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero Banner */}
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.16_0.05_256)]">
          {/* 水滴涟漪背景图 */}
          <img
            src="/news/news-hero-ripple.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full object-cover object-right"
          />
          {/* 左侧渐暗遮罩，保证文字清晰 */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.05_256/0.96)_0%,oklch(0.16_0.05_256/0.82)_38%,oklch(0.16_0.05_256/0.35)_66%,transparent_100%)]"
            aria-hidden
          />

          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">新闻动态</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/85">
              关注云建标最新动态，了解智慧水务行业实践、技术创新与项目成果。
            </p>

            {/* 数据条 */}
            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {newsStats.map((s, i) => {
                const Icon = statIcons[i] ?? Building2
                return (
                  <div
                    key={s.label}
                    className="ring-hairline rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-5 backdrop-blur-md transition-colors hover:border-cyan-300/30 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-2 text-cyan-200/90">
                      <Icon className="size-4" />
                      <span className="text-sm text-blue-100/75">{s.label}</span>
                    </div>
                    <div className="mt-2 font-mono text-3xl font-bold text-white">{s.value}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 分类筛选 + 卡片网格 + 分页 */}
        <NewsExplorer />
      </main>
      <SiteFooter />
    </div>
  )
}
