"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { DemoModal } from "@/components/demo-modal"

const navItems = [
  { label: "首页", href: "/#home", active: true },
  { label: "核心产品", href: "/#products" },
  { label: "解决方案与经典案例", href: "/cases" },
  { label: "新闻动态", href: "/#news" },
  { label: "联系我们", href: "/contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/#home" className="flex items-center" aria-label="云建标 CYBERWATER 首页">
          <img
            src="/cyberwater-logo-dark.png"
            alt="云建标 CYBERWATER"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[
                "relative text-sm transition-colors",
                item.active
                  ? "font-medium text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent after:shadow-[0_0_8px_1px_oklch(0.79_0.13_200/0.6)]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDemoOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.1] px-5 py-2 text-sm font-medium text-accent shadow-[0_0_18px_-6px_oklch(0.79_0.13_200/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/[0.16] hover:shadow-[0_0_24px_-4px_oklch(0.79_0.13_200/0.9)] lg:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_1px_oklch(0.79_0.13_200/0.8)]" />
            预约演示
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
                className="py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                setDemoOpen(true)
              }}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/[0.1] px-5 py-2.5 text-sm font-medium text-accent"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              预约演示
            </button>
          </nav>
        </div>
      )}

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </header>
  )
}
