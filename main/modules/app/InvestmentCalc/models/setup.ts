export type SetupResponseData = {
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
  periodInMonths: number
}
