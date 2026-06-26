import { ArrowRight, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroDashboard } from "@/components/hero-dashboard"
import { GrowthTimeline } from "@/components/growth-timeline"
import { PlatformArchitecture } from "@/components/platform-architecture"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      {/* 顶部柔光 */}
      <div className="glow-cyan pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />
      {/* 科技网格 */}
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="group/stage relative mx-auto max-w-7xl px-6 pt-20 pb-20 [perspective:1200px] [perspective-origin:50%_42%] lg:pt-24">
        <div className="grid items-center gap-12 [transform-style:preserve-3d] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          {/* 左侧：价值主张（向中心右收内凹） */}
          <div className="max-w-xl transition-transform duration-700 ease-out [transform-style:preserve-3d] lg:origin-right lg:[transform:rotateY(15deg)_translateZ(-140px)_translateX(28px)] lg:group-hover/stage:[transform:rotateY(7deg)_translateZ(-40px)_translateX(0)]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_oklch(0.79_0.13_200/0.6)]" />
              企业级 AI 水务操作系统 · CW-Cloud
            </div>

            {/* 主标题 */}
            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.16] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              做最懂水务运营管理的
              <br />
              <span className="text-gradient">数字化产品公司</span>
            </h1>

            {/* 副标题 */}
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务。公司依托国内头部水务集团的运营实践场景，持续沉淀水务运营经验、管理标准、业务流程和技术能力，打造面向水务行业的标准化、产品化、可配置的软件服务能力。
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-full shadow-lg shadow-primary/25"
                nativeButton={false}
                render={<a href="/#contact" />}
              >
                预约演示
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-accent/30 bg-card/40 text-foreground hover:border-accent/50 hover:bg-card"
                nativeButton={false}
                render={<a href="/#products" />}
              >
                <LayoutGrid className="size-4" />
                查看核心产品
              </Button>
            </div>

          </div>

          {/* 右侧：产品总览大屏（向中心左收内凹） */}
          <div className="transition-transform duration-700 ease-out [transform-style:preserve-3d] lg:origin-left lg:pl-4 lg:[transform:rotateY(-15deg)_translateZ(-140px)_translateX(-28px)] lg:group-hover/stage:[transform:rotateY(-7deg)_translateZ(-40px)_translateX(0)]">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* 发展路径 */}
      <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-gradient text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            发展路径
          </h2>
        </div>
        <GrowthTimeline />
      </div>

      {/* 下方三维分层平台架构 */}
      <div className="relative mt-4 pb-12">
        <PlatformArchitecture />
      </div>
    </section>
  )
}
