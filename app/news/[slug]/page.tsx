import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Layers,
  Mail,
  MapPin,
  MessageSquareText,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleToc, type TocEntry } from "@/components/news/article-toc"
import { NewsCard } from "@/components/news/news-card"
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

  const index = news.findIndex((n) => n.slug === item.slug)
  const prev = index > 0 ? news[index - 1] : null
  const next = index < news.length - 1 ? news[index + 1] : null

  // 相关推荐：优先同分类，其次补齐
  const sameCategory = news.filter((n) => n.slug !== item.slug && n.category === item.category)
  const others = news.filter((n) => n.slug !== item.slug && n.category !== item.category)
  const recommended = [...sameCategory, ...others].slice(0, 3)

  // 目录：引言 + 各分段（有标题的）
  const toc: TocEntry[] = [
    { id: "intro", label: "引言" },
    ...item.sections
      .filter((s) => s.heading)
      .map((s, i) => ({ id: `section-${i}`, label: s.heading as string })),
  ]
  if (item.conclusion) toc.push({ id: "conclusion", label: "结语" })

  const hero = item.heroImage || item.image

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* 顶部 Hero：沉浸式融合头图（图片背景 + 文字浮层，与正文同宽） */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 pt-8">
            {/* 面包屑 */}
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-blue-100/70" aria-label="面包屑">
              <Link href="/" className="transition-colors hover:text-white">
                首页
              </Link>
              <ChevronRight className="size-3.5 opacity-60" />
              <Link href="/news" className="transition-colors hover:text-white">
                新闻动态
              </Link>
              <ChevronRight className="size-3.5 opacity-60" />
              <span className="text-cyan-200/90">{item.tag}</span>
              <ChevronRight className="size-3.5 opacity-60" />
              <span className="text-white/90">正文</span>
            </nav>

            {/* 沉浸式头图：右侧主视觉图片 + 左侧文字浮层，中间渐变自然融合 */}
            <div className="relative mt-4 h-[360px] overflow-hidden sm:h-[400px] lg:h-[430px]">
              {/* 右侧轻微蓝色辉光，增强主视觉展示感 */}
              <div
                className="absolute inset-y-0 right-0 hidden w-[68%] lg:block"
                aria-hidden
                style={{
                  background: "radial-gradient(70% 60% at 78% 45%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0) 60%)",
                }}
              />
              {/* 主视觉图片：仅置于右侧约 68% 区域，完整清晰展示、不裁切 */}
              <img
                src={hero || "/placeholder.svg"}
                alt={item.title}
                className="absolute right-0 top-0 h-full w-full object-contain object-center opacity-100 lg:w-[68%] lg:object-right"
                fetchPriority="high"
                decoding="async"
              />
              {/* 横向渐变：左侧深、快速向右透明，仅覆盖文字区域，不压暗右侧图片 */}
              <div
                className="absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(90deg, rgba(5,11,18,0.96) 0%, rgba(5,11,18,0.88) 28%, rgba(5,11,18,0.55) 48%, rgba(5,11,18,0.18) 68%, rgba(5,11,18,0.04) 100%)",
                }}
              />
              {/* 底部轻微渐变：自然过渡到页面背景 */}
              <div
                className="absolute inset-x-0 bottom-0 h-24"
                aria-hidden
                style={{ background: "linear-gradient(180deg, rgba(5,11,18,0) 0%, #050B12 100%)" }}
              />

              {/* 文字内容层 */}
              <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 py-10 sm:px-10 lg:w-[48%]">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/90 px-3 py-1 font-medium text-primary-foreground">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-blue-100/85">
                    <CalendarDays className="size-3.5" />
                    {item.date}
                  </span>
                  {item.location && (
                    <span className="inline-flex items-center gap-1.5 text-blue-100/85">
                      <MapPin className="size-3.5" />
                      {item.location}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {item.title}
                </h1>
                <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-blue-100/85">
                  {item.subtitle}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.solutionTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur-sm"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 正文 + 侧栏 */}
        <section className="py-14">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* 正文 */}
            <article className="min-w-0">
              {/* 引言 */}
              <div id="intro" className="scroll-mt-28">
                <div className="rounded-2xl border-l-2 border-primary bg-secondary/40 py-5 pl-6 pr-5">
                  {item.intro.map((p, i) => (
                    <p
                      key={i}
                      className="text-pretty text-[15px] leading-relaxed text-foreground/90 [&:not(:first-child)]:mt-3"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* 分段 */}
              {item.sections.map((section, i) => {
                const headingIndex = item.sections.filter((s, j) => j <= i && s.heading).length - 1
                return (
                  <div
                    key={i}
                    id={section.heading ? `section-${headingIndex}` : undefined}
                    className="mt-12 scroll-mt-28"
                  >
                    {section.heading && (
                      <h2 className="flex items-center gap-3 text-xl font-bold text-foreground sm:text-2xl">
                        <span className="h-6 w-1 rounded-full bg-primary" />
                        {section.heading}
                      </h2>
                    )}
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-pretty text-[15px] leading-relaxed text-foreground/90">
                          {p}
                        </p>
                      ))}
                    </div>
                    {section.image && (
                      <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                        <img
                          src={section.image || "/placeholder.svg"}
                          alt={section.caption || section.heading || item.title}
                          loading="lazy"
                          className="mx-auto max-h-[760px] w-full object-contain"
                        />
                        {section.caption && (
                          <figcaption className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
                            {section.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                )
              })}

              {/* 结语 */}
              {item.conclusion && (
                <div id="conclusion" className="mt-12 scroll-mt-28">
                  <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-6">
                    <h2 className="text-base font-semibold text-primary">结语</h2>
                    <p className="mt-2 text-pretty text-[15px] leading-relaxed text-foreground/90">
                      {item.conclusion}
                    </p>
                  </div>
                </div>
              )}

              {/* 上一篇 / 下一篇 */}
              <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/news/${prev.slug}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ArrowLeft className="size-3.5" />
                      上一篇
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/news/${next.slug}`}
                    className="group rounded-xl border border-border bg-card p-5 text-right transition-colors hover:border-primary/40 sm:text-right"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:justify-end">
                      下一篇
                      <ArrowRight className="size-3.5" />
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </article>

            {/* 侧栏 */}
            <aside className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
              <div className="flex flex-col gap-6">
                {/* 文章目录 */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Layers className="size-4 text-primary" />
                    文章目录
                  </h3>
                  <div className="mt-3">
                    <ArticleToc entries={toc} />
                  </div>
                </div>

                {/* 相关推荐 */}
                {recommended.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground">相关推荐</h3>
                    <ul className="mt-4 flex flex-col gap-4">
                      {recommended.map((r) => (
                        <li key={r.slug}>
                          <Link href={`/news/${r.slug}`} className="group flex gap-3">
                            <img
                              src={r.image || "/placeholder.svg"}
                              alt={r.title}
                              loading="lazy"
                              className="size-16 shrink-0 rounded-lg object-cover"
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] font-medium text-accent">{r.tag}</span>
                              <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                                {r.title}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 方案咨询 */}
                <div className="ring-hairline overflow-hidden rounded-2xl border border-primary/20 bg-[oklch(0.21_0.06_256)] p-6 text-center">
                  <h3 className="text-base font-semibold text-white">方案咨询</h3>
                  <p className="mt-1 text-xs leading-relaxed text-blue-100/70">
                    结合您的业务场景，提供定制化数字化建设方案
                  </p>
                  <div className="mt-4 inline-block rounded-xl bg-white p-2 shadow-sm">
                    <img
                      src="/qr/qr-sales-wechat.png"
                      alt="扫码添加销售微信"
                      loading="lazy"
                      className="size-28 object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs text-blue-100/60">扫码添加，获取解决方案资料</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <MessageSquareText className="size-4" />
                    立即咨询
                  </Link>
                  <a
                    href="mailto:service@cyberwater.cn"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs text-cyan-200/90 transition-colors hover:text-cyan-100"
                  >
                    <Mail className="size-3.5" />
                    service@cyberwater.cn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 推荐阅读 */}
        {recommended.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">推荐阅读</h2>
                <Link
                  href="/news"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  查看全部
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {recommended.map((r) => (
                  <NewsCard key={r.slug} item={r} />
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
