import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '유튜브 제목 A/B 테스트 예측기 | CTR 최적화 도구',
  description: 'AI가 예측하는 유튜브 제목 CTR! 업로드 전에 가장 유리한 제목과 썸네일 조합을 찾아보세요.',
  keywords: '유튜브, 제목, 썸네일, CTR, A/B테스트, 최적화, AI예측',
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  },
  openGraph: {
    title: '유튜브 제목 A/B 테스트 예측기',
    description: 'AI가 예측하는 유튜브 제목 CTR! 업로드 전에 가장 유리한 제목과 썸네일 조합을 찾아보세요.',
    type: 'website',
    locale: 'ko_KR',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '유튜브 제목 A/B 테스트 예측기',
    description: 'AI가 예측하는 유튜브 제목 CTR! 업로드 전에 가장 유리한 제목과 썸네일 조합을 찾아보세요.',
    images: ['/logo.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8057197445850296" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className} bg-dark-bg text-dark-text min-h-screen`}>
        <div className="min-h-screen flex">
          {/* 좌측 사이드바 광고 */}
          <aside className="w-40 hidden lg:block">
            <div className="sticky top-4 p-2">
              <ins className="adsbygoogle block"
                   style={{display:'block', width:'160px', height:'600px'}}
                   data-ad-client="ca-pub-8057197445850296"
                   data-ad-slot="5964488484"
                   data-ad-format="vertical"
                   data-full-width-responsive="false"></ins>
            </div>
          </aside>
          
          <main className="flex-1 max-w-4xl mx-auto px-4">
            {children}
          </main>
          
          {/* 우측 사이드바 광고 */}
          <aside className="w-40 hidden lg:block">
            <div className="sticky top-4 p-2">
              <ins className="adsbygoogle block"
                   style={{display:'block', width:'160px', height:'600px'}}
                   data-ad-client="ca-pub-8057197445850296"
                   data-ad-slot="5964488484"
                   data-ad-format="vertical"
                   data-full-width-responsive="false"></ins>
            </div>
          </aside>
        </div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-8057197445850296",
              enable_page_level_ads: true
            });
          `
        }} />
      </body>
    </html>
  )
}