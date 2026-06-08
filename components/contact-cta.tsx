import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-r from-[oklch(0.26_0.07_252)] to-[oklch(0.4_0.13_232)] py-24 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 30%, oklch(0.85 0.1 200) 0, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          让智慧水务运营更简单、更高效、更智能
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-blue-100/85">
          预约一对一产品演示，获取贴合您业务场景的智慧水务解决方案。
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-white text-[oklch(0.26_0.07_252)] hover:bg-blue-50"
            nativeButton={false}
            render={<a href="mailto:service@cyberwater.cn" />}
          >
            预约产品演示
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            nativeButton={false}
            render={<a href="mailto:service@cyberwater.cn" />}
          >
            获取解决方案
          </Button>
        </div>
      </div>
    </section>
  )
}
