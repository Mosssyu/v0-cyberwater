import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactCta() {
  return (
    <section id="contact" className="bg-background px-6 py-24">
      <div className="ring-hairline relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/20 bg-gradient-to-b from-[oklch(0.18_0.015_230/0.1)] via-[oklch(0.14_0.012_245)] to-[oklch(0.12_0.012_252)] px-6 py-20 text-center sm:py-28">
        <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-72" aria-hidden="true" />
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl space-y-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-4xl">
            让水务运营从"系统管理"走向
            <span className="text-gradient">智能决策</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            通过 CW-Agent、CW-PPI、CW-3DP 与 CW-POM 的组合建设，帮助水务企业构建覆盖感知、运营、空间、决策与经营分析的一体化智能平台。
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full"
              nativeButton={false}
              render={<a href="mailto:service@cyberwater.cn" />}
            >
              预约产品演示
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
