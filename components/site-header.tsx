"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Menu, X } from "lucide-react"
import { DemoModal } from "@/components/demo-modal"

const navItems = [
  { label: "首页", href: "/#home", sectionId: "home" },
  { label: "核心产品", href: "/#products", sectionId: "products" },
  { label: "解决方案与经典案例", href: "/#cases", sectionId: "cases" },
  { label: "新闻动态", href: "/#news", sectionId: "news" },
  { label: "联系我们", href: "/#contact", sectionId: "contact" },
]

export function SiteHeader({
  caseBackHref,
  caseBackLabel = "返回客户案例",
}: {
  caseBackHref?: string
  caseBackLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    let frame = 0

    const updateActiveSection = () => {
      frame = 0
      const headerOffset = 96
      let currentSection = navItems[0].sectionId

      const isAtPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      const contactSection = document.getElementById("contact")
      const isContactVisible =
        contactSection !== null &&
        contactSection.getBoundingClientRect().top < window.innerHeight * 0.85

      if (isAtPageBottom || isContactVisible) {
        setActiveSection((current) =>
          current === "contact" ? current : "contact",
        )
        return
      }

      for (const item of navItems) {
        const section = document.getElementById(item.sectionId)
        if (section && section.getBoundingClientRect().top <= headerOffset) {
          currentSection = item.sectionId
        }
      }

      setActiveSection((current) =>
        current === currentSection ? current : currentSection,
      )
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    scheduleUpdate()
    const delayedUpdate = window.setTimeout(scheduleUpdate, 700)
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", scheduleUpdate)

    return () => {
      window.clearTimeout(delayedUpdate)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/#home" className="flex items-center" aria-label="云建标 CYBERWATER 首页">
          <img
            src="/cyberwater-logo-dark.png"
            alt="云建标智慧水务"
            title="北京云建标科技有限公司"
            width={260}
            height={60}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "location" : undefined}
              className={[
                "relative text-sm transition-colors",
                activeSection === item.sectionId
                  ? "font-medium text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent after:shadow-[0_0_8px_1px_oklch(0.79_0.13_200/0.6)]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {caseBackHref && (
            <a
              href={caseBackHref}
              aria-label={caseBackLabel}
              className="group inline-flex items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/[0.07] px-3 py-2 text-sm font-medium text-primary transition-all duration-300 hover:border-primary/65 hover:bg-primary/15 hover:text-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">{caseBackLabel}</span>
            </a>
          )}

          <button
            onClick={() => setDemoOpen(true)}
            className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_18px_-6px_oklch(0.63_0.17_250/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_26px_-4px_oklch(0.63_0.17_250/0.95)] lg:inline-flex"
          >
            联系我们
          </button>

          <button
            className="text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="切换菜单"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={activeSection === item.sectionId ? "location" : undefined}
                className={[
                  "py-3 text-sm transition-colors hover:text-foreground",
                  activeSection === item.sectionId
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                setDemoOpen(true)
              }}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              联系我们
            </button>
          </nav>
        </div>
      )}

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </header>
  )
}
