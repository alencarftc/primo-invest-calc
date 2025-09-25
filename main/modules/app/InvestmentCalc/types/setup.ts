export type SetupResponseData = {
  error: {
    title: string
    message: string
    instance: Error
  } | null
  data: {
    values: {
      selic: number
      arca: number
    }
    updated_at: string
  }
}

export type InvestmentForm = {
  base: number
  recurrent: number
  period: number
}
