import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.21_0.06_256)] via-[oklch(0.26_0.07_252)] to-[oklch(0.32_0.07_248)]"
    >
      {/* 水流科技纹理 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.7 0.13 215) 0, transparent 40%), radial-gradient(circle at 85% 20%, oklch(0.52 0.18 252) 0, transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-cyan-100 backdrop-blur">
            <span className="size-1.5 rounded-full bg-cyan-300" />
            执数智之器 · 精水务之业
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            新一代
            <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
              AI 智慧水务
            </span>
            <br />
            一体化运营平台
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-blue-100/80 sm:text-lg">
            云建标 CYBERWATER 将 AI 智能体、BIM、GIS、数字孪生与边云协同深度融合于水务、水环境、水利的建设运营，打造「精确感知 + 无缝协同 + 智慧决策」的新一代智慧水务数字底座。
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-[oklch(0.26_0.07_252)] hover:bg-blue-50"
              nativeButton={false}
              render={<a href="/#contact" />}
            >
              立即咨询
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<a href="/#solutions" />}
            >
              查看解决方案
            </Button>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {[
              { num: "2015", label: "深耕水务数字化" },
              { num: "40+", label: "智慧水务项目" },
              { num: "30+", label: "软件著作权" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-start gap-1">
                <span className="text-2xl font-bold text-cyan-300">{item.num}</span>
                <span className="text-sm text-blue-100/80">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-cyan-400/10 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-blue-950/50">
            <img
              src="/water-dashboard.png"
              alt="智慧水务平台运营大屏，包含地图、管网、泵站、水厂、AI 分析、告警与工单"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
