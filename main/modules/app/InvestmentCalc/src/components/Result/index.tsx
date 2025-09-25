import { cx } from '@cgp-core/src/utils'
import { ScreenReaderText } from '@cgp-ds/src/components/ScreenReaderText'
import Typography from '@cgp-ds/src/components/Typography'
import { formatCurrency } from '@cgp/InvestmentCalc/src/utils/string'
import Image from 'next/image'
import styles from './styles.module.css'

type ResultProps = {
  result: {
    selic: number
    arca: number
    period: number
  }
  taxes: {
    selic: number
    arca: number
  }
  lastUpdate: string
}
export const Result = ({ result, taxes, lastUpdate }: ResultProps) => {
  const formattedSelicValue = formatCurrency(result.selic)
  const formattedArcaValue = formatCurrency(result.arca)

  return (
    <div>
      <div>
        <Typography
          as="p"
          className={styles.result__text}
          variant="body"
          size="medium"
          weight="semibold"
        >
          Em {result.period} meses você teria:
        </Typography>

        <ScreenReaderText as="p">
          {`${formattedSelicValue} investindo na taxa Selic`}
        </ScreenReaderText>
        <div aria-hidden="true" className={cx(styles.result__panel, 'mb-2')}>
          <Typography
            as="p"
            className={styles['result__panel-text']}
            variant="uppercase"
            size="small"
            weight="semibold"
          >
            Taxa selic
          </Typography>
          <Typography as="span" variant="body" size="extra-large" weight="semibold">
            {formattedSelicValue}
          </Typography>
        </div>

        <ScreenReaderText>{`${formattedArcaValue} investindo no Fundo Arca`}</ScreenReaderText>
        <div aria-hidden="true" className={cx(styles.result__panel)}>
          <div>
            <Image
              className={cx(styles['result__panel-image--arca'], 'mb-2')}
              src="/assets/images/logo-arca.svg"
              alt="Logotipo Fundo Arca"
              width={112}
              height={32}
            />
            <Typography
              as="p"
              className={styles['result__panel-text']}
              variant="uppercase"
              size="small"
              weight="semibold"
            >
              Fundo arca
            </Typography>
          </div>
          <Typography as="span" variant="body" size="extra-large" weight="semibold">
            {formattedArcaValue}
          </Typography>
        </div>
      </div>
      <span className={styles.result__divider}></span>
      <div className={styles.info_list}>
        <Typography
          as="p"
          variant="uppercase-raleway"
          size="medium"
          weight="semibold"
          className={styles.tax__label}
        >
          Taxa SELIC:{' '}
          <Typography
            className={styles.tax__value}
            as="span"
            variant="special-opensans"
            size="medium"
            weight="extrabold"
          >
            {taxes.selic}%
          </Typography>
        </Typography>
        <Typography
          as="p"
          variant="uppercase-raleway"
          size="medium"
          weight="semibold"
          className={styles.tax__label}
        >
          Rentabilidade do ARCA:{' '}
          <Typography
            className={styles.tax__value}
            as="span"
            variant="special-opensans"
            size="medium"
            weight="extrabold"
          >
            {taxes.arca}% a.a.
          </Typography>
        </Typography>
      </div>
      <div className={cx(styles.info__row)}>
        <Image
          className={styles.info__text}
          src="/assets/icons/help.svg"
          width={24}
          height={24}
          alt=""
          unoptimized
        />
        <Typography
          as="p"
          variant="body"
          size="small"
          weight="regular"
          className={styles.info__text}
        >
          Valores utilizados no simulador de Investimentos (referentes à data de última atualização
          - esses valores podem alterar de acordo com o mercado):
          <span className={styles.info__date}>- Data da última atualização: {lastUpdate}</span>
        </Typography>
      </div>
    </div>
  )
}
