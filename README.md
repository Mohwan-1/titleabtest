# 유튜브 제목 A/B 테스트 예측기

AI가 예측하는 유튜브 제목 CTR! 업로드 전에 가장 유리한 제목과 썸네일 조합을 찾아보세요.

## 🚀 주요 기능

- **CTR 예측**: Google Gemini AI가 제목과 썸네일 조합의 클릭률을 예측
- **최적 조합 추천**: 가장 높은 CTR이 예상되는 조합을 추천
- **PNG 내보내기**: 분석 결과를 PNG 이미지로 저장
- **직관적인 UI**: 다크모드 기반의 현대적이고 심플한 디자인
- **반응형 지원**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 🔧 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/Mohwan-1/titleabtest.git
cd titleabtest
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 `http://localhost:3000` 접속

## 🔑 API 키 설정

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 Gemini API 키 발급
2. 웹사이트에서 "API 키 설정" 버튼 클릭
3. 발급받은 API 키 입력 및 저장

## 📱 사용 방법

1. **제목/썸네일 조합 입력**: 2-3개의 서로 다른 조합 입력
2. **CTR 예측하기**: AI가 각 조합의 예상 클릭률 분석
3. **결과 확인**: 점수와 함께 최고 성과 조합 확인
4. **PNG 저장**: 분석 결과를 이미지로 저장

## 🚀 배포

```bash
npm run build
```

Vercel을 통한 자동 배포가 설정되어 있습니다.

## 📄 라이선스

MIT License