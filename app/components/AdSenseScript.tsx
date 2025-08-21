'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdSenseScript() {
  useEffect(() => {
    const pushAd = () => {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }

    // 페이지 로드 후 광고 초기화
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // 모든 광고 슬롯 초기화
        const ads = document.querySelectorAll('.adsbygoogle')
        ads.forEach(() => {
          pushAd()
        })
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return null
}