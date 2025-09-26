import type { FormResult, InvestmentForm } from '@cgp/InvestmentCalc/types/setup'
import { useCallback, useState } from 'react'

export const useInvestmentCalc = (
  initialForm: InvestmentForm,
  calculate: (form: InvestmentForm) => FormResult,
) => {
  const [result, setResult] = useState<FormResult>(() => calculate(initialForm))

  const handleOnFormChange = useCallback(
    (form: InvestmentForm) => {
      setResult(calculate(form))
    },
    [calculate],
  )

  return {
    result,
    handleOnFormChange,
  }
}
