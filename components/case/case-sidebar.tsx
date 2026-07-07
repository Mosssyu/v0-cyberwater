import Link from "next/link"
import { ArrowRight, Building2, MapPin, Boxes, Sparkles } from "lucide-react"
import type { CaseItem } from "@/lib/cases"

export function CaseSidebar({ item }: { item: CaseItem }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-[oklch(0.16_0.02_248)] p-6 ring-hairline">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative">
          <h3 className="text-sm font-semibold tracking-wide text-foreground">项目资料</h3>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-start gap-2.5">
              <Building2 className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs text-muted-foreground">项目单位</dt>
                <dd className="mt-0.5 font-medium text-foreground">{item.client}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs text-muted-foreground">项目地点</dt>
                <dd className="mt-0.5 font-medium text-foreground">{item.location}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs text-muted-foreground">解决方案</dt>
                <dd className="mt-0.5 font-medium text-foreground">{item.category}</dd>
              </div>
            </div>
          </dl>

          <div className="my-5 h-px bg-border" />

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Boxes className="size-4 text-accent" />
            应用产品
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.products.map((p) => (
              <span
                key={p}
                className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-medium text-primary"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="my-5 h-px bg-border" />

          <div className="text-xs text-muted-foreground">项目亮点</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            href="/#contact"
            className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            咨询同类方案
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
