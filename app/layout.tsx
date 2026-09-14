import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteTitle = '云建标智慧水务 | AI驱动的厂网河湖一体化智慧水务平台'
const siteDescription =
  '云建标智慧水务，面向水务集团、水厂、排水公司、城投平台，提供厂网河湖一体化平台、物联网平台、AI水务智能体、防汛调度平台等产品，构建集团化运营的智慧水务数字底座。'

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberwater.cn'),
  title: siteTitle,
  description: siteDescription,
  applicationName: '云建标智慧水务',
  creator: '北京云建标科技有限公司',
  publisher: '北京云建标科技有限公司',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: '云建标智慧水务',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/seo/cyberwater-brand-card.png',
        width: 1200,
        height: 630,
        alt: '云建标智慧水务品牌标识',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/seo/cyberwater-brand-card.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      {
        url: '/seo/cyberwater-icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/seo/cyberwater-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    shortcut: ['/seo/cyberwater-icon-32.png'],
    apple: [
      {
        url: '/seo/cyberwater-apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth scroll-pt-20 bg-background`}
    >
      <head>
        <link
          rel="image_src"
          href="https://cyberwater.cn/seo/cyberwater-brand-card.png"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
