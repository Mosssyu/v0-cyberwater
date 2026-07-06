"use client"

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
      </div>
    </section>
  )
}
