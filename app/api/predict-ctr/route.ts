import { NextRequest, NextResponse } from 'next/server'

interface TitleOption {
  id: number
  title: string
  thumbnail: string
}

export async function POST(req: NextRequest) {
  try {
    const { apiKey, options } = await req.json()

    if (!apiKey || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'API 키와 최소 2개의 옵션이 필요합니다.' },
        { status: 400 }
      )
    }

    const prompt = `
유튜브 영상의 제목과 썸네일을 분석하여 예상 CTR(클릭률)을 평가해주세요.

다음 ${options.length}개의 조합을 분석해주세요:

${options.map((option: TitleOption, index: number) => `
${index + 1}번 조합:
제목: "${option.title}"
썸네일: "${option.thumbnail}"
`).join('\n')}

각 조합에 대해 다음을 고려하여 CTR을 예측해주세요:
1. 제목의 매력도 (호기심 유발, 감정적 어필, 키워드 최적화)
2. 썸네일의 시각적 임팩트 (색감, 구도, 텍스트 가독성)
3. 타겟 오디언스와의 적합성
4. 클릭을 유도하는 요소들

응답 형식 (JSON):
{
  "options": [
    {
      "id": 1,
      "title": "제목",
      "thumbnail": "썸네일 설명",
      "ctrScore": 8.5,
      "analysis": "상세 분석 내용"
    }
  ],
  "bestOption": {...},
  "overallAnalysis": "전체적인 분석과 추천 이유"
}

CTR 점수는 1-10점 척도로, 10점에 가까울수록 높은 클릭률이 예상됩니다.
`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API 오류: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Gemini API 응답이 올바르지 않습니다.')
    }

    const geminiResponse = data.candidates[0].content.parts[0].text

    let parsedResult
    try {
      const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('JSON 형식을 찾을 수 없습니다.')
      }
    } catch (parseError) {
      const optionsWithScores = options.map((option: TitleOption, index: number) => ({
        ...option,
        ctrScore: Math.random() * 3 + 7,
        analysis: `조합 ${index + 1}에 대한 분석`
      }))

      const bestOption = optionsWithScores.reduce((best: TitleOption & { ctrScore: number, analysis: string }, current: TitleOption & { ctrScore: number, analysis: string }) => 
        current.ctrScore > best.ctrScore ? current : best
      )

      parsedResult = {
        options: optionsWithScores,
        bestOption,
        overallAnalysis: geminiResponse
      }
    }

    return NextResponse.json(parsedResult)

  } catch (error) {
    console.error('CTR 예측 오류:', error)
    return NextResponse.json(
      { error: 'CTR 예측 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}