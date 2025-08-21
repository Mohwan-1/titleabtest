export interface TitleOption {
  id: number
  title: string
  thumbnail: string
  ctrScore?: number
  analysis?: string
}

export interface PredictionResult {
  options: TitleOption[]
  bestOption: TitleOption
  overallAnalysis?: string
}