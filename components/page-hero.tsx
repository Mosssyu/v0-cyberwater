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
    <section className="relative overflow-hidden border-b border-white/10 bg-[#04080b]">
      {/* 科技感渐变光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 size-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative px-5 py-20 sm:px-8 lg:px-14 lg:py-28 xl:px-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <span className="v4-kicker mt-10">
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-6xl text-balance text-5xl font-medium leading-[.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-blue-100/70">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
