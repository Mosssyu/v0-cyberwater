import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Solutions } from "@/components/solutions"
import { Architecture } from "@/components/architecture"
import { AiAgents } from "@/components/ai-agents"
import { CustomerValue } from "@/components/customer-value"
import { CasesPreview } from "@/components/cases-preview"
import { Scenes } from "@/components/scenes"
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
        <Architecture />
        <AiAgents />
        <CustomerValue />
        <CasesPreview />
        <Scenes />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  )
}
