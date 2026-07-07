import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// 合作伙伴 LOGO 墙（统一反白为单色，与整体深色主题一致）
const partners: { name: string; src: string }[] = [
  { name: "北控水务集团", src: "/partners/bewg.png" },
  { name: "上海城投", src: "/partners/shanghai-chengtou.png" },
  { name: "西安水务（集团）有限责任公司", src: "/partners/xian-water.png" },
  { name: "北控石犀", src: "/partners/bewg-shixi.png" },
  { name: "天津创业环保", src: "/partners/chuangye-env.png" },
  { name: "上海浦东水务集团", src: "/partners/pudong-water.png" },
  { name: "北京排水集团", src: "/partners/beijing-drainage.png" },
  { name: "中持股份 CSD Water Service", src: "/partners/csd-water.png" },
  { name: "广州市政工程设计研究总院有限公司", src: "/partners/gz-municipal.png" },
  { name: "上海城建信息科技有限公司", src: "/partners/shanghai-ucit.svg" },
  { name: "中国电建 POWERCHINA", src: "/partners/powerchina.png" },
  { name: "中国水利水电科学研究院", src: "/partners/iwhr.png" },
  { name: "中国科学院", src: "/partners/cas.png" },
  { name: "上海水利院 SWEDRI", src: "/partners/swedri.png" },
  { name: "中信国安", src: "/partners/citic-guoan.png" },
  { name: "北京环球影城", src: "/partners/universal.png" },
]

export function ContactCta() {
  return (
    <section id="contact" className="bg-background px-6 py-24">
      {/* ===== 合作伙伴 LOGO 墙 ===== */}
      <div className="mx-auto mb-16 max-w-6xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1 font-mono text-xs text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            PARTNERS
          </span>
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">合作伙伴</h2>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            与水务集团、设计院、科研院所等行业伙伴深度协作，共建智慧水务生态。
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p.name}
              className="group flex h-20 items-center justify-center rounded-xl border border-border/60 bg-card/40 px-4 transition-colors duration-300 hover:border-primary/40 hover:bg-card/70"
            >
              <img
                src={p.src || "/placeholder.svg"}
                alt={p.name}
                loading="lazy"
                className="max-h-11 w-auto max-w-full object-contain opacity-65 brightness-0 invert transition-all duration-300 group-hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>

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
