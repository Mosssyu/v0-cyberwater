export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: { title?: string; items: string[] }[]
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="v4-section">
      <div className="relative z-[1] mx-auto max-w-6xl">
        <div className="v4-flat-grid">
          {sections.map((section, i) => (
            <article
              key={section.heading}
              className="v4-flat-cell grid gap-6 p-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:p-10"
            >
              <div className="flex items-start gap-3 sm:flex-col">
                <span className="font-mono text-xs tracking-[0.18em] text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-medium tracking-[-0.025em] text-foreground sm:[writing-mode:vertical-rl]">{section.heading}</h2>
              </div>
              <div className="border-l border-white/10 pl-6 sm:pl-8">
                {section.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-3">
                    {p}
                  </p>
                ))}

                {section.bullets?.map((group, gi) => (
                  <div key={gi} className="mt-5">
                    {group.title && (
                      <p className="mb-3 text-sm font-medium text-foreground">{group.title}</p>
                    )}
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm leading-7 text-muted-foreground">
                          <span className="mt-3 h-px w-4 shrink-0 bg-accent/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
