import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { LegalContent, type LegalSection } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "服务条款 | 云建标智慧水务",
  description: "使用北京云建标科技有限公司官网及相关服务前，请阅读本服务条款。",
}

const sections: LegalSection[] = [
  {
    heading: "服务说明",
    paragraphs: ["云建标官方网站用于展示公司产品、技术能力、行业解决方案及经典案例。", "主要包括："],
    bullets: [
      {
        items: [
          "CW-Agent 水务智能体平台",
          "CW-PPI 厂网河湖一体化平台",
          "CW-3DP 三维数字孪生平台",
          "CW-POM 数字水厂平台",
        ],
      },
    ],
  },
  {
    heading: "网站内容说明",
    paragraphs: ["网站展示内容包括："],
    bullets: [
      {
        items: ["产品介绍", "技术架构", "解决方案", "项目案例", "新闻动态"],
      },
    ],
  },
  {
    heading: "内容用途",
    paragraphs: [
      "相关内容用于企业交流和方案参考。",
      "具体项目建设范围、实施内容、服务标准，以双方正式合同约定为准。",
    ],
  },
  {
    heading: "知识产权",
    paragraphs: ["本网站中的以下内容均属于云建标或相关权利方所有：", "未经授权，不得复制、传播或用于商业用途。"],
    bullets: [
      {
        items: ["产品名称", "软件系统", "页面设计", "图片素材", "技术方案"],
      },
    ],
  },
  {
    heading: "用户使用规范",
    paragraphs: ["用户不得："],
    bullets: [
      {
        items: ["恶意攻击网站系统", "非法获取网站数据", "利用网站从事违法活动", "侵犯他人合法权益"],
      },
    ],
  },
  {
    heading: "免责声明",
    paragraphs: ["云建标努力保证网站信息准确、完整。但由于以下原因，网站内容可能存在更新调整："],
    bullets: [
      {
        items: ["技术发展变化", "产品持续升级", "项目实施差异"],
      },
    ],
  },
  {
    heading: "服务调整",
    paragraphs: ["云建标有权根据业务发展需要进行调整："],
    bullets: [
      {
        items: ["调整网站内容", "优化产品展示", "更新服务信息"],
      },
    ],
  },
  {
    heading: "法律适用",
    paragraphs: [
      "本服务条款适用于中华人民共和国相关法律法规。",
      "如发生争议，双方应友好协商解决。",
    ],
  },
  {
    heading: "联系我们",
    paragraphs: ["北京云建标科技有限公司", "邮箱：service@cyberwater.cn"],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Terms of Service"
          title="服务条款"
          subtitle="使用云建标官网及相关服务前，请阅读以下条款"
        />
        <LegalContent sections={sections} />
      </main>
      <SiteFooter />
    </div>
  )
}
