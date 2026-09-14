import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { CasesPreview } from "@/components/cases-preview"
import { News } from "@/components/news"
import { SiteFooter } from "@/components/site-footer"
import { ClickRipple } from "@/components/click-ripple"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimationGate } from "@/components/animation-gate"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cyberwater.cn/#organization",
  name: "北京云建标科技有限公司",
  alternateName: "云建标智慧水务",
  url: "https://cyberwater.cn/",
  logo: {
    "@type": "ImageObject",
    url: "https://cyberwater.cn/cyberwater-logo-color.png",
    contentUrl: "https://cyberwater.cn/cyberwater-logo-color.png",
    width: 500,
    height: 145,
    caption: "云建标智慧水务",
  },
  image: {
    "@type": "ImageObject",
    url: "https://cyberwater.cn/seo/cyberwater-brand-card.png",
    contentUrl: "https://cyberwater.cn/seo/cyberwater-brand-card.png",
    width: 1200,
    height: 630,
    caption: "云建标智慧水务品牌标识",
  },
  description:
    "北京云建标科技有限公司专注于水务领域数字化产品研发与技术服务，提供水务 AI 运营平台与三维数字孪生平台。",
  email: "service@cyberwater.cn",
  address: {
    "@type": "PostalAddress",
    streetAddress: "新源里16号琨莎大厦2座901室",
    addressLocality: "北京市",
    addressRegion: "朝阳区",
    addressCountry: "CN",
  },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ClickRipple />
      <ScrollReveal />
      <SiteHeader />
      <main>
        <AnimationGate>
          <Hero />
        </AnimationGate>
        <AnimationGate>
          <Products />
        </AnimationGate>
        <AnimationGate>
          <CasesPreview />
        </AnimationGate>
        <AnimationGate>
          <News />
        </AnimationGate>
      </main>
      <SiteFooter />
    </div>
  )
}
