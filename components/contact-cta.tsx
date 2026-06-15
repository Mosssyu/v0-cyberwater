import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactCta() {
  return (
    <section id="contact" className="bg-background px-6 py-24">
      <div className="ring-hairline relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-[oklch(0.13_0.012_252)] px-6 py-16 text-center sm:py-20">
        <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-72" aria-hidden="true" />
        <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            让智慧水务运营更简单、更高效、
            <span className="text-gradient">更智能</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            预约一对一产品演示，获取贴合您业务场景的智慧水务解决方案。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full"
              nativeButton={false}
              render={<a href="mailto:service@cyberwater.cn" />}
            >
              预约产品演示
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-card/40 text-foreground hover:bg-card"
              nativeButton={false}
              render={<a href="mailto:service@cyberwater.cn" />}
            >
              获取解决方案
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
