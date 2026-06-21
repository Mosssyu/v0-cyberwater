import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { ProductAgent, ProductPPI, ProductTwin, ProductPOM } from "@/components/product-details"
import { ProductMatrixCompare } from "@/components/product-matrix-compare"
import { CustomerValue } from "@/components/customer-value"
import { CasesPreview } from "@/components/cases-preview"
import { About } from "@/components/about"
import { Values } from "@/components/values"
import { News } from "@/components/news"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"
import { ClickRipple } from "@/components/click-ripple"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <ClickRipple />
      <ScrollReveal />
      <main>
        <Hero />
        <CustomerValue />
        <Products />
        <ProductAgent />
        <ProductPPI />
        <ProductTwin />
        <ProductPOM />
        <ProductMatrixCompare />
        <CasesPreview />
        <About />
        <Values />
        <News />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  )
}
