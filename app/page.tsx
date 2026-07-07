import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { CasesPreview } from "@/components/cases-preview"
import { About } from "@/components/about"
import { Values } from "@/components/values"
import { News } from "@/components/news"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"
import { ClickRipple } from "@/components/click-ripple"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimationGate } from "@/components/animation-gate"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
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
        <AnimationGate>
          <About />
        </AnimationGate>
        <AnimationGate>
          <Values />
        </AnimationGate>
        <AnimationGate>
          <ContactCta />
        </AnimationGate>
      </main>
      <SiteFooter />
    </div>
  )
}
