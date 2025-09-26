import { cx } from '@cgp-core/src/utils'
import { Banner } from '@cgp/InvestmentCalc/src/components/Banner'
import { Form } from '@cgp/InvestmentCalc/src/components/Form'
import { Header } from '@cgp/InvestmentCalc/src/components/Header'
import { Result } from '@cgp/InvestmentCalc/src/components/Result'
import type { InvestmentForm, SetupResponseData } from '@cgp/InvestmentCalc/types/setup'

import { ErrorBanner } from '../components/ErrorBanner'
import { FORM_CONFIG } from '../config/form'
import { useInvestmentCalc } from '../hooks/useInvestmentCalc'
import { calculateInvestment } from '../rules/calculateInvestment'
import styles from './styles.module.css'

export const InvestmentCalc = ({ data, error }: SetupResponseData) => {
  const { values, updated_at } = data

  const calculateWithRates = (form: InvestmentForm) => calculateInvestment(form, values)

  const { result, handleOnFormChange } = useInvestmentCalc(
    FORM_CONFIG.initialValues,
    calculateWithRates,
  )

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Banner
          title="Simulador de Investimento"
          paragraph="Descubra o quanto você pode economizar."
        />
        <div className={styles.main__content}>
          <div className="container">
            {error ? (
              <ErrorBanner error={error} />
            ) : (
              <div className={cx(styles.main__layout)}>
                <div className={styles['main__layout-form-col']}>
                  <Form onChange={handleOnFormChange} initialValues={FORM_CONFIG.initialValues} />
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
            )}
          </div>
        </div>
      </main>
    </>
  )
}
