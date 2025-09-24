import { Banner } from '@cgp/components/Banner'
import { Form, type InvestimentForm } from '@cgp/components/Form'
import { Header } from '@cgp/components/Header'
import { Result } from '@cgp/components/Result'
import { InvestimentContextProvider } from '@cgp/hooks/useInvestmentForm'
import { getBusinessDaysInMonths } from '@cgp/utils/date'
import { cx } from '@cgp-core/utils'
import { useState } from 'react'
import styles from './styles.module.css'

const BASE_VALUES = {
  base: 100,
  recurrent: 100,
  periodInMonths: 12,
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

export const AppContainer = () => {
  const [result, setResult] = useState({
    selic: 0,
    arca: 0,
  })

  const handleOnFormChange = (form: InvestimentForm) => {
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
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Banner
          title="Simulador de investimento"
          paragraph="Descubra o quanto você pode economizar."
        />
        <div className={styles.main__content}>
          <div className={cx(styles.main__layout, 'container')}>
            <InvestimentContextProvider initial={BASE_VALUES}>
              <div className={styles['main__layout-form-col']}>
                <Form onChange={handleOnFormChange} />
              </div>
              <div className={cx(styles['main__layout-result-col'], 'mt-9')}>
                <Result
                  result={result}
                  taxes={{
                    selic: 9.25,
                    arca: 18,
                  }}
                  lastUpdate={new Date()}
                />
              </div>
            </InvestimentContextProvider>
          </div>
        </div>
      </main>
    </>
  )
}
