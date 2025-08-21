'use client'

import { useState } from 'react'
import Header from './components/Header'
import TitleForm from './components/TitleForm'
import ResultsDisplay from './components/ResultsDisplay'
import ApiKeyModal from './components/ApiKeyModal'
import AdBanner from './components/AdBanner'
import { TitleOption, PredictionResult } from './types'
import AdSenseScript from './components/AdSenseScript'

export default function Home() {
  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<PredictionResult | null>(null)

  const handlePrediction = async (options: TitleOption[]) => {
    if (!apiKey) {
      setShowApiModal(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/predict-ctr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          options
        })
      })

      if (!response.ok) {
        throw new Error('예측 요청에 실패했습니다')
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('예측 오류:', error)
      alert('CTR 예측 중 오류가 발생했습니다. API 키를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-8">
      {/* 상단 광고 */}
      <AdBanner 
        className="mb-8"
        style={{ minHeight: '90px' }}
        adFormat="horizontal"
      />
      
      <Header onApiKeyClick={() => setShowApiModal(true)} />
      
      {/* 헤더 하단 광고 */}
      <AdBanner 
        className="my-8"
        style={{ minHeight: '100px' }}
      />
      
      <div className="space-y-8">
        <TitleForm 
          onSubmit={handlePrediction}
          isLoading={isLoading}
        />
        
        {/* 중간 광고 */}
        <AdBanner 
          className="my-12"
          style={{ minHeight: '250px' }}
          adFormat="rectangle"
        />
        
        {results && (
          <ResultsDisplay 
            results={results}
            onReset={() => setResults(null)}
          />
        )}
      </div>

      {/* 하단 광고 */}
      <AdBanner 
        className="mt-12 mb-8"
        style={{ minHeight: '100px' }}
        adFormat="horizontal"
      />

      <ApiKeyModal
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={setApiKey}
        currentKey={apiKey}
      />
      
      <AdSenseScript />
    </div>
  )
}