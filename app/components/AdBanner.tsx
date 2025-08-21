'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.log('AdSense error:', err)
    }
  }, [])

  return (
    <div className="flex justify-center my-8">
      <ins 
        className="adsbygoogle block"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8057197445850296"
        data-ad-slot="5964488484"
      />
    </div>
  )
}