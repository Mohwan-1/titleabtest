# 제목 A/B 테스트 예측기

유튜브 영상 업로드 전, **어떤 제목/썸네일 조합이 더 유리한지**  
AI가 CTR을 예측해 추천해주는 간단한 MVP 툴입니다.

## 주요 기능
- 제목·썸네일 조합 입력 → CTR 예측
- 가장 유리한 조합 추천
- 선택한 조합 → PNG 다운로드
- 광고 배치
  - 자동광고: 좌/우 사이드바
  - 수동광고: 상단, 중간, 하단
- 다크모드 UI + 로고/파비콘 적용

## API 설정
1. Google Gemini API KEY 발급
   - [Google Cloud Console](https://console.cloud.google.com) 접속
   - “API 키 생성” 버튼 클릭
2. 사이트 내 **API KEY 안내 버튼** 클릭 → 팝업에서 자세한 발급 가이드 확인
   - ESC 키로 팝업 닫기 가능

## 실행 방법
```bash
npm install
npm run dev
