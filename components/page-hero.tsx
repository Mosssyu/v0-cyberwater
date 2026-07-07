import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[oklch(0.21_0.06_256)]">
      {/* 科技感渐变光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 size-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-blue-100/90">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/90">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
