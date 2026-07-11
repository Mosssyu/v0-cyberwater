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
    </section>
  )
}
