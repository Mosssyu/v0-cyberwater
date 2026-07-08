"use client"

import { useEffect, useState } from "react"

export interface TocEntry {
  id: string
  label: string
}

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? "")

  useEffect(() => {
    const els = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [entries])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" })
      setActive(id)
    }
  }

  return (
    <nav className="flex flex-col gap-1">
      {entries.map((entry) => {
        const isActive = active === entry.id
        return (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            onClick={(e) => handleClick(e, entry.id)}
            className={`group flex items-center gap-2.5 rounded-lg py-2 pl-3 pr-2 text-sm transition-colors ${
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            <span
              className={`h-4 w-0.5 shrink-0 rounded-full transition-colors ${
                isActive ? "bg-primary" : "bg-border group-hover:bg-primary/40"
              }`}
            />
            <span className="line-clamp-2 text-pretty leading-snug">{entry.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
