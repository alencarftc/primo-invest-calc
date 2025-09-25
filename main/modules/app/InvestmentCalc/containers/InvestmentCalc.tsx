import { Banner } from '@cgp/InvestmentCalc/components/Banner'
import { Form } from '@cgp/InvestmentCalc/components/Form'
import { Header } from '@cgp/InvestmentCalc/components/Header'
import { Result } from '@cgp/InvestmentCalc/components/Result'
import { cx } from '@cgp-core/utils'
import { useState } from 'react'
import type { SetupResponseData } from '../models/setup'
import { calculateResult } from '../rules/calculateInvestment'
import styles from './styles.module.css'

const BASE_VALUES = {
  base: 100,
  recurrent: 100,
  periodInMonths: 12,
}

export const InvestmentCalc = ({ data }: { data: SetupResponseData['data'] }) => {
  const { values, updated_at } = data
  const [result, setResult] = useState(calculateResult(BASE_VALUES, values))

  const handleOnFormChange = (form: Parameters<typeof calculateResult>[0]) => {
    const newResult = calculateResult(form, values)
    setResult(newResult)
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Banner
          title="Simulador de Investimento"
          paragraph="Descubra o quanto você pode economizar."
        />
        <div className={styles.main__content}>
          <div className={cx(styles.main__layout, 'container')}>
            <div className={styles['main__layout-form-col']}>
              <Form onChange={handleOnFormChange} initialValues={BASE_VALUES} />
            </div>
            <div className={cx(styles['main__layout-result-col'])}>
              <Result
                result={result}
                taxes={{
                  selic: values.selic,
                  arca: values.arca,
                }}
                lastUpdate={updated_at}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
