'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface AdBannerProps {
  adSlot?: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  style?: React.CSSProperties
  className?: string
}

export default function AdBanner({ 
  adSlot = "5964488484", 
  adFormat = "auto",
  style,
  className = "my-8"
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.log('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`flex justify-center ${className}`}>
      <ins 
        ref={adRef}
        className="adsbygoogle block"
        style={{ 
          display: 'block', 
          textAlign: 'center',
          ...style
        }}
        data-ad-client="ca-pub-8057197445850296"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}