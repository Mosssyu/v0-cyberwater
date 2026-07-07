import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { LegalContent, type LegalSection } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "隐私政策 | 云建标智慧水务",
  description: "北京云建标科技有限公司隐私政策，说明我们如何收集、使用与保护您的信息。",
}

const sections: LegalSection[] = [
  {
    heading: "概述",
    paragraphs: [
      "北京云建标科技有限公司（以下简称“云建标”）重视用户隐私保护和信息安全。",
      "本隐私政策说明当您访问云建标官方网站、浏览产品信息、提交咨询需求时，我们如何收集、使用、保护相关信息。",
      "我们遵循合法、正当、必要原则处理相关信息，并采取合理措施保障信息安全。",
    ],
  },
  {
    heading: "信息收集范围",
    paragraphs: ["为了提供更好的服务体验，我们可能收集以下信息："],
    bullets: [
      {
        title: "1. 用户主动提交的信息",
        items: ["姓名", "联系电话", "企业名称", "邮箱地址", "咨询内容", "项目需求信息"],
      },
      {
        title: "2. 网站访问信息",
        items: ["浏览器类型", "访问时间", "页面浏览记录", "设备信息", "网络日志信息"],
      },
    ],
  },
  {
    heading: "信息使用方式",
    paragraphs: ["我们可能将收集的信息用于："],
    bullets: [
      {
        items: ["响应您的咨询请求", "提供产品介绍与解决方案交流", "安排商务沟通", "优化网站体验", "提升服务质量"],
      },
    ],
  },
  {
    heading: "信息保护",
    paragraphs: ["云建标采取合理的技术和管理措施保护用户信息，包括："],
    bullets: [
      {
        items: ["数据访问权限控制", "网络安全防护", "信息安全管理制度", "必要的数据加密措施"],
      },
    ],
  },
  {
    heading: "第三方服务",
    paragraphs: ["网站可能使用必要的第三方服务，例如："],
    bullets: [
      {
        items: ["云计算服务", "网站安全服务", "地图服务", "企业通信工具"],
      },
    ],
  },
  {
    heading: "用户权利",
    paragraphs: ["您可以：", "如需申请，请通过联系我们页面提交。"],
    bullets: [
      {
        items: ["查询个人信息", "请求修改错误信息", "请求删除相关信息", "咨询信息处理情况"],
      },
    ],
  },
  {
    heading: "政策更新",
    paragraphs: [
      "云建标可能根据业务发展和法律法规变化更新本政策。",
      "更新后的内容将在官方网站公布。",
    ],
  },
  {
    heading: "联系我们",
    paragraphs: [
      "如果您对本隐私政策有任何疑问，欢迎与我们联系。",
      "公司：北京云建标科技有限公司",
      "邮箱：service@cyberwater.cn",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Privacy Policy"
          title="隐私政策"
          subtitle="云建标科技重视您的信息安全与隐私保护"
        />
        <LegalContent sections={sections} />
      </main>
      <SiteFooter />
    </div>
  )
}
