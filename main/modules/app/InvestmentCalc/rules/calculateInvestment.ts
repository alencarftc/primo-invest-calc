import type { InvestmentForm } from '../models/setup'

const YEAR_BUSINESS_DAYS_QUANTITY = 252

function calculateInvestment(
  baseValue: number,
  recurrentValue: number,
  months: number,
  annualTax: number,
) {
  const getBusinessDays = (numMonths: number) => Math.round(numMonths * 21.75)

  let total = 0

  const days = getBusinessDays(months)
  total += baseValue * (1 + annualTax) ** (days / YEAR_BUSINESS_DAYS_QUANTITY)

  for (let mes = 1; mes <= months; mes++) {
    const rendimentMonths = months - mes
    const diasParaRender = getBusinessDays(rendimentMonths)
    total += recurrentValue * (1 + annualTax) ** (diasParaRender / YEAR_BUSINESS_DAYS_QUANTITY)
  }

  return total
}

export const calculateResult = (form: InvestmentForm, values: { selic: number; arca: number }) => {
  const selic = calculateInvestment(
    form.base,
    form.recurrent,
    form.periodInMonths,
    values.selic / 100,
  )
  const arca = calculateInvestment(
    form.base,
    form.recurrent,
    form.periodInMonths,
    values.arca / 100,
  )

  return {
    arca,
    selic,
    periodInMonths: form.periodInMonths,
  }
}
