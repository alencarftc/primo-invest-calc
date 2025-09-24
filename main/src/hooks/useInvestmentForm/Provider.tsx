import { getBusinessDaysInMonths } from '@cgp/utils/date'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { InvestimentContext } from './context'
import type { InvestimentForm } from './types'

type Props = {
  initial: InvestimentForm
  children: ReactNode
}

const SELIC_TAX_PERCENT = 9.25
const ARCA_FUND_PERCENT = 18
const YEAR_BUSINESS_DAYS_QUANTITY = 252

const calculateTotalRendiment = (
  principal: number,
  recurrent: number,
  periodInMonths: number,
  annualTax: number,
) => {
  // Converte a taxa anual para uma taxa mensal efetiva para os aportes recorrentes
  const monthlyTax = (1 + annualTax) ** (1 / 12) - 1

  // 1. Calcula o valor futuro do aporte inicial (base)
  // Usamos a fórmula original com dias úteis para o montante inicial
  const businessDays = getBusinessDaysInMonths(periodInMonths)
  const finalValueOfBase =
    principal * (1 + annualTax) ** (businessDays / YEAR_BUSINESS_DAYS_QUANTITY)

  // 2. Calcula o valor futuro dos aportes recorrentes (mensais)
  // Fórmula do Valor Futuro de uma Série de Pagamentos (Anuidade)
  let finalValueOfRecurrent = 0
  if (monthlyTax > 0) {
    finalValueOfRecurrent = recurrent * (((1 + monthlyTax) ** periodInMonths - 1) / monthlyTax)
  } else {
    // Caso a taxa seja 0, é apenas a soma dos aportes
    finalValueOfRecurrent = recurrent * periodInMonths
  }

  const totalFinal = finalValueOfBase + finalValueOfRecurrent
  return totalFinal - (principal + recurrent * periodInMonths)
}

export const InvestimentContextProvider = ({ initial, children }: Props) => {
  const [form, setForm] = useState<InvestimentForm>(initial)
  const [result, setResult] = useState({
    arca: 0,
    selic: 0,
  })

  const handleOnChange = (key: keyof InvestimentForm, value: number) => {
    setForm({ ...form, [key]: value })
  }

  const calculateResult = useCallback((form: InvestimentForm) => {
    const arcaRendiment = calculateTotalRendiment(
      form.base,
      form.recurrent,
      form.periodInMonths,
      ARCA_FUND_PERCENT,
    )
    const selicRendiment = calculateTotalRendiment(
      form.base,
      form.recurrent,
      form.periodInMonths,
      SELIC_TAX_PERCENT,
    )

    setResult({ arca: arcaRendiment, selic: selicRendiment })
  }, [])

  useEffect(() => {
    if (form.base && form.periodInMonths && form.recurrent) {
      calculateResult(form)
    }
  }, [calculateResult, form])

  return (
    <InvestimentContext.Provider value={{ form, result, update: handleOnChange }}>
      {children}
    </InvestimentContext.Provider>
  )
}
