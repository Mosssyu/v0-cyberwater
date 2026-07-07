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
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            按水务集团数字化运营、排水一体化管理、数字水厂、三维数字孪生四大解决方案梳理典型客户案例，证明产品落地能力与业务价值。
          </p>
        </div>

        <div className="mt-10">
          <CasesBrowser />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.08] px-7 py-3 text-sm font-medium text-accent shadow-[0_0_18px_-6px_oklch(0.79_0.13_200/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/[0.14] hover:shadow-[0_0_24px_-4px_oklch(0.79_0.13_200/0.9)]"
          >
            查看更多解决方案与案例
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
