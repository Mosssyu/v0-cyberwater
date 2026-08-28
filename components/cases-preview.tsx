"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CasesBrowser } from "@/components/cases-browser"

export function CasesPreview() {
  return (
    <section id="cases" className="v4-section bg-[#070b0e]">
      <div className="relative z-[1]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="v4-kicker">Solutions & Cases / 解决方案</span>
            <h2 className="v4-display mt-6 max-w-6xl text-foreground">让每个项目，<br /><span className="text-white/36">成为可复制的能力。</span></h2>
          </div>
          <span className="v4-index">PROJECT NETWORK / CHINA</span>
        </div>

        <div className="mt-10">
          <CasesBrowser />
        </div>

        <div className="mt-12 flex justify-start">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
          >
            查看更多解决方案与案例
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
