'use client'

import { Key, Youtube } from 'lucide-react'

interface HeaderProps {
  onApiKeyClick: () => void
}

export default function Header({ onApiKeyClick }: HeaderProps) {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <img 
          src="/logo.png" 
          alt="SDI Logo" 
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          유튜브 제목 A/B 테스트
        </h1>
      </div>
      
      <p className="text-lg text-dark-muted mb-8 max-w-2xl mx-auto">
        AI가 예측하는 CTR로 업로드 전에 가장 유리한 제목과 썸네일 조합을 찾아보세요
      </p>
      
      <button
        onClick={onApiKeyClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border 
                   rounded-lg hover:bg-dark-border transition-colors"
      >
        <Key className="w-4 h-4" />
        API 키 설정
      </button>
    </header>
  )
}