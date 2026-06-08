import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Solutions } from "@/components/solutions"
import { Architecture } from "@/components/architecture"
import { AiAgents } from "@/components/ai-agents"
import { CustomerValue } from "@/components/customer-value"
import { CasesPreview } from "@/components/cases-preview"
import { Scenes } from "@/components/scenes"
import { About } from "@/components/about"
import { News } from "@/components/news"
import { Careers } from "@/components/careers"
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
        <About />
        <News />
        <Careers />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  )
}
