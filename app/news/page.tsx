import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsExplorer } from "@/components/news/news-explorer"
import { newsStats } from "@/lib/news"

export const metadata: Metadata = {
  title: "新闻动态 | 云建标智慧水务",
  description: "洞察行业趋势，见证项目落地。查看云建标智慧水务的最新客户案例、公司新闻、行业动态与技术创新。",
}

export default function NewsListPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero Banner */}
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.19_0.05_256)]">
          {/* 科技网格 + 柔光背景 */}
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
          <div className="glow-cyan absolute inset-x-0 top-0 h-64" aria-hidden />
          {/* 右侧水波纹装饰 */}
          <div
            className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block"
            aria-hidden
          >
            <div className="relative size-[420px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full border border-cyan-300/20"
                  style={{ transform: `scale(${0.4 + i * 0.2})` }}
                />
              ))}
              <span className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-2xl" />
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-200/90">
              Newsroom
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">新闻动态</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/85">
              洞察行业趋势，见证项目落地。汇聚客户案例、公司新闻、行业动态与技术创新，记录云建标与水务行业共同成长的每一步。
            </p>

            {/* 数据条 */}
            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {newsStats.map((s) => (
                <div
                  key={s.label}
                  className="ring-hairline rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm"
                >
                  <div className="font-mono text-3xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-sm text-blue-100/70">{s.label}</div>
                </div>
              ))}
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
