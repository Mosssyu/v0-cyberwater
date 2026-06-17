"use client"

import { CasesBrowser } from "@/components/cases-browser"

export function CasesPreview() {
  return (
    <section id="cases" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
            Customers
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            服务行业领先客户，沉淀可复制的运营经验
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            按产品矩阵与项目分布两个维度梳理标杆案例，覆盖数字水厂、集团数字运营、厂网河湖一体化、城乡供水、防汛调度与数字孪生等场景。
          </p>
        </div>

        <div className="mt-10">
          <CasesBrowser />
        </div>
      </div>
    </section>
  )
}
