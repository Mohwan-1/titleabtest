'use client'

import { useState, useEffect } from 'react'
import { X, Key, ExternalLink, Copy, Check } from 'lucide-react'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (apiKey: string) => void
  currentKey: string
}

export default function ApiKeyModal({ isOpen, onClose, onSave, currentKey }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(currentKey)
  const [showGuide, setShowGuide] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim())
      onClose()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Google Gemini API 키 설정</h2>
            </div>
            <button
              onClick={onClose}
              className="text-dark-muted hover:text-dark-text transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!showGuide ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  API 키 입력
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg
                           focus:outline-none focus:border-blue-500 text-dark-text"
                />
                <p className="text-xs text-dark-muted mt-2">
                  API 키는 브라우저에만 저장되며, 서버로 전송되지 않습니다.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                           font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  저장하기
                </button>
                <button
                  onClick={() => setShowGuide(true)}
                  className="px-6 py-3 bg-dark-border hover:bg-dark-muted text-dark-text rounded-lg
                           font-medium transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  발급 가이드
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">🚀 Gemini API 키 발급 방법</h3>
              
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">1단계: Google AI Studio 접속</h4>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      https://aistudio.google.com/app/apikey
                    </a>
                    <button
                      onClick={() => copyToClipboard('https://aistudio.google.com/app/apikey')}
                      className="text-dark-muted hover:text-dark-text"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">2단계: API 키 생성</h4>
                  <ul className="list-disc list-inside space-y-1 text-dark-muted">
                    <li>구글 계정으로 로그인</li>
                    <li>"Create API Key" 버튼 클릭</li>
                    <li>새 프로젝트를 만들거나 기존 프로젝트 선택</li>
                    <li>생성된 API 키를 복사</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">3단계: API 키 입력</h4>
                  <p className="text-dark-muted">
                    복사한 API 키를 위의 입력창에 붙여넣고 "저장하기"를 클릭하세요.
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-medium mb-2">⚠️ 주의사항</h4>
                  <ul className="list-disc list-inside space-y-1 text-dark-muted">
                    <li>API 키는 절대 다른 사람과 공유하지 마세요</li>
                    <li>무료 할당량이 소진되면 요금이 발생할 수 있습니다</li>
                    <li>API 키는 브라우저에만 저장되며 안전합니다</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-3 bg-dark-border hover:bg-dark-muted text-dark-text rounded-lg
                         font-medium transition-colors"
              >
                ← 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}