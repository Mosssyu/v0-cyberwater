"use client"

import { useState } from "react"
import { Droplets, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "首页", href: "/#home" },
  { label: "产品中心", href: "/#products" },
  { label: "解决方案", href: "/#solutions" },
  { label: "客户案例", href: "/cases" },
  { label: "技术能力", href: "/#capabilities" },
  { label: "关于我们", href: "/#about" },
  { label: "联系我们", href: "/#contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/#home" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            云建标智慧水务
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="rounded-full" render={<a href="/#contact" />}>
            预约演示
          </Button>
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="切换菜单"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
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
            <Button
              className="mt-3 w-full rounded-full"
              render={
                <a href="/#contact" onClick={() => setOpen(false)} />
              }
            >
              预约演示
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
