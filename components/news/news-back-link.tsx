"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function NewsBackLink() {
  const searchParams = useSearchParams()
  const parsedPage = Number.parseInt(searchParams.get("fromPage") ?? "1", 10)
  const fromPage = Math.max(Number.isFinite(parsedPage) ? parsedPage : 1, 1)
  const href = fromPage > 1 ? `/news?page=${fromPage}` : "/news"

  return (
    <Link
      href={href}
      className="mb-5 inline-flex items-center gap-1.5 text-sm text-blue-100/75 transition-colors hover:text-white"
    >
      <ArrowLeft className="size-4" />
      {fromPage > 1 ? `返回新闻动态第 ${fromPage} 页` : "返回新闻动态"}
    </Link>
  )
}
