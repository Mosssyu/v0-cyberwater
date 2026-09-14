import type { MetadataRoute } from "next"
import { cases } from "@/lib/cases"
import { news } from "@/lib/news"

const SITE_URL = "https://cyberwater.cn"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/seo/cyberwater-brand-card.png`],
    },
    {
      url: `${SITE_URL}/cases/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/news/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact/`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sitemap/`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  const casePages: MetadataRoute.Sitemap = cases.map((item) => ({
    url: `${SITE_URL}/cases/${item.slug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}/`,
    lastModified: item.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...casePages, ...newsPages]
}
