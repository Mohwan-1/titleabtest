'use client'

import { useState, useRef } from 'react'
import { Download, RefreshCw, Trophy, Star } from 'lucide-react'
import html2canvas from 'html2canvas'
import { TitleOption, PredictionResult } from '../types'

interface ResultsDisplayProps {
  results: PredictionResult
  onReset: () => void
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<TitleOption>(results.bestOption)
  const [isExporting, setIsExporting] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const getScoreColor = (score: number | undefined) => {
    if (!score) return 'text-gray-400'
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBackground = (score: number | undefined) => {
    if (!score) return 'bg-gray-500/20 border-gray-500'
    if (score >= 8) return 'bg-green-500/20 border-green-500'
    if (score >= 6) return 'bg-yellow-500/20 border-yellow-500'
    return 'bg-red-500/20 border-red-500'
  }

  const exportToPNG = async () => {
    if (!resultRef.current) return
    
    setIsExporting(true)
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        logging: false,
        useCORS: true
      })
      
      const link = document.createElement('a')
      link.download = `youtube-title-ctr-analysis-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('PNG 내보내기 오류:', error)
      alert('PNG 내보내기 중 오류가 발생했습니다.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div ref={resultRef} className="gradient-border">
        <div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-center">AI 분석 결과</h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    option.id === results.bestOption.id
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : selectedOption.id === option.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-dark-border hover:border-dark-muted bg-dark-card'
                  }`}
                >
                  {option.id === results.bestOption.id && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-yellow-500 font-medium">최고 점수</span>
                    </div>
                  )}
                  
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(option.ctrScore)}`}>
                    {option.ctrScore?.toFixed(1) || '0.0'}점
                  </div>
                  
                  <h3 className="font-medium mb-2 text-sm line-clamp-2">
                    {option.title}
                  </h3>
                  
                  <p className="text-xs text-dark-muted line-clamp-3">
                    {option.thumbnail}
                  </p>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-lg border-2 ${getScoreBackground(selectedOption.ctrScore)}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(selectedOption.ctrScore)}`}>
                  {selectedOption.ctrScore?.toFixed(1) || '0.0'}점
                </div>
                <div>
                  <h3 className="text-lg font-semibold">선택된 조합</h3>
                  <p className="text-dark-muted text-sm">클릭하여 다른 조합 확인 가능</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">제목:</h4>
                  <p className="text-dark-text">{selectedOption.title}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">썸네일:</h4>
                  <p className="text-dark-muted text-sm">{selectedOption.thumbnail}</p>
                </div>
                
                {selectedOption.analysis && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">분석:</h4>
                    <p className="text-dark-muted text-sm">{selectedOption.analysis}</p>
                  </div>
                )}
              </div>
            </div>

            {results.overallAnalysis && (
              <div className="p-4 bg-dark-card rounded-lg border border-dark-border">
                <h4 className="font-medium mb-2">전체 분석</h4>
                <p className="text-dark-muted text-sm whitespace-pre-wrap">
                  {results.overallAnalysis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={exportToPNG}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700
                   text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              내보내는 중...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              PNG로 저장
            </>
          )}
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border
                   hover:bg-dark-border text-dark-text rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          다시 분석하기
        </button>
      </div>
    </div>
  )
}