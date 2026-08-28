import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CaseHero } from "@/components/case/case-hero"
import { CaseOverview } from "@/components/case/case-overview"
import { CaseProducts } from "@/components/case/case-products"
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
    title: `${item.title} | 云建标智慧水务`,
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

  // 相关案例只推荐同一解决方案类型；数量不足时保持真实数量，不跨类型补位。
  const related = cases
    .filter((c) => c.category === item.category && c.slug !== item.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader caseBackHref="/cases" />
      <ScrollReveal />
      <main>
        <CaseHero item={item} />

        <section className="v4-section">
          <div className="relative z-[1]">
          <CaseOverview item={item} />
          </div>
        </section>

        <CaseProducts item={item} />
        <CaseRelated items={related} category={item.category} />
      </main>
      <SiteFooter />
    </div>
  )
}
