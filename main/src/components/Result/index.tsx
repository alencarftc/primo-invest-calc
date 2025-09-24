import { formatCurrency } from '@cgp/utils/string'
import { cx } from '@cgp-core/utils'
import styles from './styles.module.css'

type ResultProps = {
  result: {
    selic: number
    arca: number
  }
  taxes: {
    selic: number
    arca: number
  }
  lastUpdate: Date
}
export const Result = ({ result, taxes, lastUpdate }: ResultProps) => {
  return (
    <div>
      <div>
        <p className={cx(styles.result__text, 'mb-3')}>Em 24 meses você teria:</p>

        <div className={cx(styles.result__panel, 'mb-2')}>
          <span className={styles['result__panel-text']}>Taxa selic</span>
          <span className={styles['result__panel-value']}>{formatCurrency(result.selic)}</span>
        </div>
        <div className={cx(styles.result__panel, 'mb-4')}>
          <span className={styles['result__panel-text']}>Fundo arca</span>
          <span className={styles['result__panel-value']}>{formatCurrency(result.selic)}</span>
        </div>
      </div>
      <span className="result__divider"></span>
      <p className={styles.info__label}>
        Taxa SELIC: <span className={styles.info__value}>{taxes.selic}%</span>
      </p>
      <p className={styles.info__label}>
        Rentabilidade do ARCA: <span className={styles.info__value}>{taxes.arca}% a.a.</span>
      </p>
      <div>
        <span>info</span>
        <p className={cx(styles.info__text, 'mt-4')}>
          Valores utilizados no simulador de investimentos (referentes à data de última atualização
          - esses valores podem alterar de acordo com o mercado):
          <span className={cx(styles.info__date)}>
            - Data da última atualização: {lastUpdate.toLocaleDateString('pt-BR')}
          </span>
        </p>
      </div>
    </div>
  )
}
