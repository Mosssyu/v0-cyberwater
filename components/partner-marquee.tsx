const partners = [
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

function PartnerList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-4 pr-4"
      aria-hidden={duplicate || undefined}
    >
      {partners.map((partner) => (
        <li
          key={`${duplicate ? "duplicate-" : ""}${partner.name}`}
          className="flex h-14 w-36 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-4"
        >
          <img
            src={partner.src}
            alt={duplicate ? "" : partner.name}
            loading="lazy"
            className="max-h-8 w-auto max-w-full object-contain opacity-55 brightness-0 invert transition-opacity duration-300 hover:opacity-90"
          />
        </li>
      ))}
    </ul>
  )
}

export function PartnerMarquee() {
  return (
    <div
      className="partner-marquee min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      aria-label="合作伙伴"
    >
      <div className="partner-marquee-track flex w-max items-center">
        <PartnerList duplicate />
        <PartnerList />
      </div>
    </div>
  )
}
