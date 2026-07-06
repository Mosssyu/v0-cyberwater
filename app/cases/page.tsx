import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CasesBrowser } from "@/components/cases-browser"

export const metadata: Metadata = {
  title: "客户案例 | 云建标智慧水务",
  description:
    "云建标智慧水务客户案例，覆盖数字水厂、集团数字运营、多厂集约化管理、城乡供水、水利水环境、BIM+数字孪生等场景，服务北控水务、上海城投、北京环球度假区等领先客户。",
}

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/40 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <span className="text-sm font-medium text-primary">解决方案与经典案例</span>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              按行业场景分类，沉淀可复制的智慧水务方案
            </h1>
            <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              围绕水务集团数字化运营、排水一体化管理、数字水厂、三维数字孪生四大解决方案，展示典型客户案例，证明产品落地能力与业务价值。点击任一案例可查看项目背景、建设内容与应用成效。
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <CasesBrowser />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
