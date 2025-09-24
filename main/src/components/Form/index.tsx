import { formatCurrency } from '@cgp/utils/string'
import { cx } from '@cgp-core/utils'
import { type FormEvent, useRef } from 'react'
import Slider from '../Slider'
import styles from './styles.module.css'

const MAX_BASE_INVESTIMENT = 1000
const MAX_RECURRENT_INVESTMENT = 1000
const MAX_PERIOD = 2 * 12

const BASE_VALUES = {
  base: 100,
  recurrent: 100,
  periodInMonths: 12,
}

export type InvestimentForm = {
  base: number
  recurrent: number
  periodInMonths: number
}

type FormProps = {
  onChange: (values: InvestimentForm) => void
}

export const Form = ({ onChange }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    onChange({
      base: Number(formData.get('base')),
      recurrent: Number(formData.get('recurrent')),
      periodInMonths: Number(formData.get('period')),
    })
  }

  return (
    <form onSubmit={handleOnSubmit} ref={formRef} className={cx(styles.form, 'mt-4')}>
      <div className="slider__field">
        <Slider
          label="Quanto gostaria de investir?"
          id="base"
          name="base"
          onChange={() => formRef.current?.requestSubmit()}
          initialValue={BASE_VALUES.recurrent}
          min={0}
          step={100}
          max={MAX_BASE_INVESTIMENT}
          pipeLabelValue={(value) => formatCurrency(value)}
        />
      </div>

      <div className="slider__field">
        <Slider
          id="recurrent"
          name="recurrent"
          onChange={() => formRef.current?.requestSubmit()}
          label="Por mês, quanto investiria?"
          initialValue={BASE_VALUES.recurrent}
          min={0}
          step={100}
          max={MAX_RECURRENT_INVESTMENT}
          pipeLabelValue={(value) => formatCurrency(value)}
        />
      </div>

      <div className="slider__field">
        <Slider
          id="period"
          name="period"
          onChange={() => formRef.current?.requestSubmit()}
          label="Quanto tempo deixaria seu dinheiro investido?"
          initialValue={BASE_VALUES.periodInMonths}
          min={1}
          max={MAX_PERIOD}
          pipeLabelValue={(value) => (value === 1 ? `${value} mês` : `${value} meses`)}
        />
      </div>
    </form>
  )
}
