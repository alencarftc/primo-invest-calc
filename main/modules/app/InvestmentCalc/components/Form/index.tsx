import type { InvestmentForm } from '@cgp/InvestmentCalc/models/setup'
import { formatCurrency } from '@cgp/InvestmentCalc/utils/string'
import { Slider } from '@cgp-ds/components/Slider'
import { type FormEvent, useRef } from 'react'
import styles from './styles.module.css'

const MAX_BASE_Investment = 1000
const MAX_RECURRENT_INVESTMENT = 1000
const MAX_PERIOD = 2 * 12

type FormProps = {
  onChange: (values: InvestmentForm) => void
  initialValues: InvestmentForm
}

export const Form = ({ onChange, initialValues }: FormProps) => {
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
    <form onSubmit={handleOnSubmit} ref={formRef} className={styles.form}>
      <div className="slider__field">
        <Slider
          label="Quanto gostaria de investir?"
          id="base"
          name="base"
          onChange={() => formRef.current?.requestSubmit()}
          defaultValue={initialValues.base}
          min={0}
          step={100}
          max={MAX_BASE_Investment}
          pipeLabelValue={formatCurrency}
        />
      </div>

      <div className="slider__field">
        <Slider
          id="recurrent"
          name="recurrent"
          onChange={() => formRef.current?.requestSubmit()}
          label="Por mês, quanto investiria?"
          defaultValue={initialValues.recurrent}
          min={0}
          step={100}
          max={MAX_RECURRENT_INVESTMENT}
          pipeLabelValue={formatCurrency}
        />
        <br />
      </div>

      <div className="slider__field">
        <Slider
          id="period"
          name="period"
          onChange={() => formRef.current?.requestSubmit()}
          label="Quanto tempo deixaria seu dinheiro investido?"
          defaultValue={initialValues.periodInMonths}
          min={1}
          step={1}
          max={MAX_PERIOD}
          pipeLabelValue={(value) => (value === 1 ? `${value} mês` : `${value} meses`)}
        />
      </div>
    </form>
  )
}
