import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays, Tag } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { news, getNewsBySlug } from "@/lib/news"

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsBySlug(slug)
  if (!item) return { title: "新闻动态 | 云建标智慧水务" }
  return {
    title: `${item.title} | 云建标智慧水务`,
    description: item.summary,
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getNewsBySlug(slug)
  if (!item) notFound()

  const related = news
    .filter((n) => n.slug !== item.slug && n.solutionTags.some((t) => item.solutionTags.includes(t)))
    .slice(0, 3)
  const fallback = news.filter((n) => n.slug !== item.slug).slice(0, 3)
  const relatedList = related.length > 0 ? related : fallback

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.21_0.06_256)]">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="absolute inset-0 size-full object-cover opacity-20"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-20">
            <Link
              href="/#news"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回新闻动态
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-primary/90 px-3 py-1 font-medium text-primary-foreground">
                {item.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 text-blue-100/90">
                <CalendarDays className="size-3.5" />
                {item.date}
              </span>
              <span className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-blue-100/80">
                {item.year}
              </span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {item.title}
            </h1>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-blue-100/90">{item.subtitle}</p>
          </div>
        </section>

        {/* Body */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-primary" />
              {item.solutionTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-5 border-l-2 border-primary/30 pl-6">
              {item.paragraphs.map((p, i) => (
                <p key={i} className="text-pretty text-[15px] leading-relaxed text-foreground/90">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">希望了解同类解决方案？</h3>
                <p className="mt-1 text-sm text-muted-foreground">我们可结合您的业务场景提供数字化建设方案。</p>
              </div>
              <Link
                href="/#contact"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:mt-0"
              >
                联系我们
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedList.length > 0 && (
          <section className="border-t border-border bg-secondary/40 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold text-foreground">相关动态</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedList.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/news/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <img
                      src={r.image || "/placeholder.svg"}
                      alt={r.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-accent">{r.tag}</span>
                        <span>·</span>
                        <span>{r.date}</span>
                      </div>
                      <h3 className="mt-2 font-semibold leading-snug text-foreground">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
