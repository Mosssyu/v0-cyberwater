import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '云建标智慧水务',
    short_name: '云建标',
    description:
      '北京云建标科技有限公司智慧水务数字化产品与技术服务平台。',
    start_url: '/',
    display: 'standalone',
    background_color: '#07111f',
    theme_color: '#07111f',
    icons: [
      {
        src: '/seo/cyberwater-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/seo/cyberwater-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
