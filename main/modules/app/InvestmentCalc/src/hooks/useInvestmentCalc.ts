import type { FormResult } from '@cgp/InvestmentCalc/types/setup'
import { useState } from 'react'

export const useInvestmentCalc = (calculate: () => FormResult) => {
  const [result, setResult] = useState<FormResult>(calculate())

  const handleOnFormChange = () => setResult(calculate())

  return {
    result,
    handleOnFormChange,
  }
}
