import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, MapPin, Target } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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

  const related = cases
    .filter((c) => c.category === item.category && c.slug !== item.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.21_0.06_256)]">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <Link
              href="/cases"
              className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              返回客户案例
            </Link>
            <span className="mt-6 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {item.category}
            </span>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {item.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-blue-100/90">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {item.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4" />
                {item.client}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground">项目背景</h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {item.background}
              </p>

              <h2 className="mt-12 text-2xl font-bold text-foreground">
                建设内容
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {item.scope.map((s) => (
                  <div
                    key={s}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <Target className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-foreground">
                      {s}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 text-2xl font-bold text-foreground">
                应用成效
              </h2>
              <ul className="mt-6 space-y-4">
                {item.results.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span className="leading-relaxed text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-secondary/40 p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  项目信息
                </h3>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">客户单位</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {item.client}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">项目地点</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {item.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">业务分类</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {item.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">关键能力</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/#contact"
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  咨询同类方案
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary/40 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold text-foreground">相关案例</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/cases/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <img
                      src={r.image || "/placeholder.svg"}
                      alt={r.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {r.summary}
                      </p>
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
