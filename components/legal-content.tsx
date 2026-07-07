export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: { title?: string; items: string[] }[]
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-6">
          {sections.map((section, i) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08] font-mono text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              </div>

              {section.paragraphs?.map((p, idx) => (
                <p key={idx} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}

              {section.bullets?.map((group, gi) => (
                <div key={gi} className="mt-4">
                  {group.title && (
                    <p className="mb-2 text-sm font-medium text-foreground">{group.title}</p>
                  )}
                  <ul className="grid gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
