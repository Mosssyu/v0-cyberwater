import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
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
        <PageHero
          eyebrow="Newsroom / 新闻动态"
          title="新闻动态"
          subtitle="关注云建标最新动态，了解智慧水务行业实践、技术创新与项目成果。"
        />

        {/* 新闻卡片网格 + 分页 */}
        <Suspense fallback={<div className="min-h-[36rem]" aria-hidden />}>
          <NewsExplorer />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
