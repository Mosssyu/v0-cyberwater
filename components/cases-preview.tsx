"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CasesBrowser } from "@/components/cases-browser"

export function CasesPreview() {
  return (
    <section id="cases" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Solutions & Cases
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            解决方案与经典案例
          </h2>
        </div>

        <div className="mt-10">
          <CasesBrowser />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_oklch(0.63_0.17_250/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_32px_-4px_oklch(0.63_0.17_250/0.95)]"
          >
            查看更多解决方案与案例
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
