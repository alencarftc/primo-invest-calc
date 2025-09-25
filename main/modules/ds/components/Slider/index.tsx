import { cx } from '@cgp-core/utils'
import Typography from '@cgp-ds/components/Typography'
import { type ComponentProps, type CSSProperties, useState } from 'react'
import styles from './styles.module.css'

export type SliderProps = {
  label: string
  name: string
  min: number
  max: number
  step?: number
  pipeLabelValue?: (value: number) => string
  onChange?: (value: number) => void
} & ComponentProps<'input'>

export const Slider = ({
  name,
  label,
  min,
  max,
  step = 1,
  className,
  onChange,
  pipeLabelValue,
  ...props
}: SliderProps) => {
  const [value, setValue] = useState(Number(props?.defaultValue || min))

  return (
    <div>
      <Typography
        id={`${name}-label`}
        as="label"
        htmlFor={`${name}-input`}
        variant="body-raleway"
        size="medium"
        weight="semibold"
      >
        {label}
      </Typography>

      <input
        id={`${name}-input`}
        aria-labelledby={`${name}-label`}
        type="range"
        min={min}
        step={step}
        max={max}
        onChange={(e) => {
          setValue(+e.target.value)
          onChange?.(+e.target.value)
        }}
        name={name}
        className={cx(styles.slider, styles['slider-progress'])}
        style={
          {
            '--min': min,
            '--max': max,
            '--value': value,
          } as CSSProperties
        }
        {...props}
      />

      <Typography
        as="span"
        className={styles.slider__value}
        variant="body"
        size="large"
        weight="bold"
      >
        {pipeLabelValue ? pipeLabelValue(value) : value}
      </Typography>
    </div>
  )
}
