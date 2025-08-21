'use client'

import { useState } from 'react'
import { Plus, Trash2, Zap } from 'lucide-react'

interface TitleOption {
  id: number
  title: string
  thumbnail: string
}

interface TitleFormProps {
  onSubmit: (options: TitleOption[]) => void
  isLoading: boolean
}

export default function TitleForm({ onSubmit, isLoading }: TitleFormProps) {
  const [options, setOptions] = useState<TitleOption[]>([
    { id: 1, title: '', thumbnail: '' },
    { id: 2, title: '', thumbnail: '' }
  ])

  const addOption = () => {
    if (options.length < 3) {
      setOptions([...options, { id: Date.now(), title: '', thumbnail: '' }])
    }
  }

  const removeOption = (id: number) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id))
    }
  }

  const updateOption = (id: number, field: 'title' | 'thumbnail', value: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, [field]: value } : option
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validOptions = options.filter(option => 
      option.title.trim() && option.thumbnail.trim()
    )

    if (validOptions.length < 2) {
      alert('최소 2개의 제목/썸네일 조합을 입력해주세요')
      return
    }

    onSubmit(validOptions)
  }

  return (
    <div className="gradient-border">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">제목 & 썸네일 조합 입력</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {options.map((option, index) => (
            <div key={option.id} className="bg-dark-bg p-4 rounded-lg border border-dark-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">조합 {index + 1}</h3>
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <input
                    type="text"
                    value={option.title}
                    onChange={(e) => updateOption(option.id, 'title', e.target.value)}
                    placeholder="예: 10분만에 배우는 리액트 완벽 가이드!"
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg 
                             focus:outline-none focus:border-red-500 text-dark-text"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">썸네일 설명</label>
                  <textarea
                    value={option.thumbnail}
                    onChange={(e) => updateOption(option.id, 'thumbnail', e.target.value)}
                    placeholder="예: 밝은 배경에 코드 화면과 함께 웃고 있는 개발자 모습"
                    className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg 
                             focus:outline-none focus:border-red-500 text-dark-text h-20 resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          {options.length < 3 && (
            <button
              type="button"
              onClick={addOption}
              className="w-full py-3 border-2 border-dashed border-dark-border rounded-lg
                       hover:border-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              조합 추가 (최대 3개)
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg
                     font-medium text-lg hover:from-red-700 hover:to-pink-700 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                     pulse-glow"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                AI가 분석 중...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                CTR 예측하기
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}