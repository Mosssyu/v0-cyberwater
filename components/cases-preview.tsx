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
            按企业数字化转型、数字水厂、智慧排水、水利/水环境四大解决方案梳理标杆案例，每个项目组合应用 CW-Agent、CW-PPI、CW-3DP 与 CW-POM 等产品能力。
          </p>
        </div>

        <div className="mt-10">
          <CasesBrowser />
        </div>
      </div>
    </section>
  )
}
