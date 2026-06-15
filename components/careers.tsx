import { Briefcase, ArrowUpRight } from "lucide-react"

const jobs = [
  "区域销售经理",
  "行业销售总监",
  "售前咨询",
  "产品经理",
  "网络实施工程师",
  "项目实施工程师",
  "项目经理",
]

export function Careers() {
  return (
    <section id="careers" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted/40">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-accent">
                Careers
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                与最懂运营的水务科技团队同行
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                我们汇聚来自北控水务、威立雅、阿里等领先企业的人才，期待更多志同道合者加入，一起用数智之器精进水务之业。简历请投递至
                <a
                  href="mailto:service@cyberwater.cn"
                  className="font-medium text-primary hover:underline"
                >
                  {" "}
                  service@cyberwater.cn
                </a>
                。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {jobs.map((job) => (
                <a
                  key={job}
                  href="mailto:service@cyberwater.cn"
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Briefcase className="size-4 text-primary" />
                    {job}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
