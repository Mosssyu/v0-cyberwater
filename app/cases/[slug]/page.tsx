import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CaseHero } from "@/components/case/case-hero"
import { CaseOverview } from "@/components/case/case-overview"
import { CaseBuild } from "@/components/case/case-build"
import { CaseOutcomes } from "@/components/case/case-outcomes"
import { CaseCapabilities } from "@/components/case/case-capabilities"
import { CaseGallery } from "@/components/case/case-gallery"
import { CaseSidebar } from "@/components/case/case-sidebar"
import { CaseRelated } from "@/components/case/case-related"
import { cases, getCaseBySlug } from "@/lib/cases"

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getCaseBySlug(slug)
  if (!item) return { title: "客户案例 | 云建标智慧水务" }
  return {
    title: `${item.title} | 云建标智慧水务客户案例`,
    description: item.summary,
  }
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getCaseBySlug(slug)
  if (!item) notFound()

  // 相关案例：优先同解决方案类型，不足 3 个则用其他案例补足
  const sameCategory = cases.filter((c) => c.category === item.category && c.slug !== item.slug)
  const others = cases.filter((c) => c.category !== item.category && c.slug !== item.slug)
  const related = [...sameCategory, ...others].slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ScrollReveal />
      <main>
        <CaseHero item={item} />

        {/* 概览 / 建设内容 / 应用成效 + 悬浮资料卡 */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-16 lg:col-span-2">
              <CaseOverview item={item} />
              <CaseBuild item={item} />
              <CaseOutcomes item={item} />
            </div>
            <CaseSidebar item={item} />
          </div>
        </section>

        <CaseCapabilities />
        <CaseGallery />
        <CaseRelated items={related} />
      </main>
      <SiteFooter />
    </div>
  )
}
