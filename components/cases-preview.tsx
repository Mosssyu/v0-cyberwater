import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { cases } from "@/lib/cases"

const featured = cases.slice(0, 6)

export function CasesPreview() {
  return (
    <section id="cases" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
              Customers
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              服务行业领先客户，沉淀可复制的运营经验
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              覆盖数字水厂、集团数字运营、多厂集约化、城乡供水、水利水环境、BIM+数字孪生等场景，与北控水务、上海城投、北京环球度假区等领先客户深度合作。
            </p>
          </div>
          <Link
            href="/cases"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            查看全部案例
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {item.location}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  查看项目详情
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
