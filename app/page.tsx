import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Solutions } from "@/components/solutions"
import { ProductAgent, ProductPPI, ProductTwin, ProductPOM } from "@/components/product-details"
import { ProductMatrixCompare } from "@/components/product-matrix-compare"
import { CustomerValue } from "@/components/customer-value"
import { CasesPreview } from "@/components/cases-preview"
import { About } from "@/components/about"
import { Values } from "@/components/values"
import { News } from "@/components/news"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Products />
        <Solutions />
        <ProductAgent />
        <ProductPPI />
        <ProductTwin />
        <ProductPOM />
        <ProductMatrixCompare />
        <CustomerValue />
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
