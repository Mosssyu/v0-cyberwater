import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsExplorer } from "@/components/news/news-explorer"

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
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.16_0.05_256)]">
          {/* 科技感全息水滴背景图（高分辨率超宽幅，右侧主视觉） */}
          <img
            src="/news/news-hero-droplet.png"
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 size-full object-cover object-[right_center]"
          />
          {/* 左侧渐暗遮罩，保证文字清晰 */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.05_256/0.85)_0%,oklch(0.16_0.05_256/0.5)_38%,transparent_65%)]"
            aria-hidden
          />

          <div className="relative px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回首页
            </Link>
            <span className="v4-kicker mt-10">Newsroom / 新闻动态</span>
            <h1 className="mt-6 text-balance text-5xl font-medium tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">新闻动态</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/85">
              关注云建标最新动态，了解智慧水务行业实践、技术创新与项目成果。
            </p>

          </div>
        </section>

        {/* 新闻卡片网格 + 分页 */}
        <Suspense fallback={<div className="min-h-[36rem]" aria-hidden />}>
          <NewsExplorer />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
