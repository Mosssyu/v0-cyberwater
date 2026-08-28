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
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#020508]/88 backdrop-blur-xl">
      <div className="flex h-[4.5rem] w-full items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-20">
        <a href="/#home" className="flex items-center" aria-label="云建标 CYBERWATER 首页">
          <img
            src="/cyberwater-logo-dark.png"
            alt="云建标 CYBERWATER"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "location" : undefined}
              className={[
                "relative py-2 text-xs tracking-[0.04em] transition-colors",
                activeSection === item.sectionId
                  ? "font-medium text-foreground after:absolute after:-bottom-[1.1rem] after:left-0 after:h-px after:w-full after:bg-accent"
                  : "text-white/48 hover:text-foreground",
              ].join(" ")}
            >
              <span aria-hidden="true" className="mr-2 font-mono text-[9px] text-white/20">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {caseBackHref && (
            <a
              href={caseBackHref}
              aria-label={caseBackLabel}
              className="v4-action-line group px-4 py-2"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">{caseBackLabel}</span>
            </a>
          )}

          <button
            onClick={() => setDemoOpen(true)}
            className="v4-action-light hidden lg:inline-flex"
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
        <div className="border-t border-white/10 bg-[#020508]/98 lg:hidden">
          <nav className="flex w-full flex-col px-5 py-4 sm:px-8">
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
              className="v4-action-light mt-3"
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
