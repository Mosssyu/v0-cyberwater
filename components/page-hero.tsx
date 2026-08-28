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
    <section className="v4-page-hero">
      <div className="v4-page-copy">
        <Link
          href="/"
          className="mb-auto inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/42 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回首页
        </Link>
        <span className="v4-kicker mt-16">
          {eyebrow}
        </span>
        <h1 className="v4-page-title mt-7 text-white">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/52 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
