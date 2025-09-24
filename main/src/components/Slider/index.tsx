import { type ComponentProps, useCallback, useId, useRef, useState } from 'react'

import styles from './styles.module.css'

export type SliderProps = {
  label: string
  min?: number
  max?: number
  step?: number
  largeStep?: number
  initialValue?: number
  pipeLabelValue?: (value: number) => string
  onChange?: (value: number) => void
} & ComponentProps<'input'>

const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  largeStep = 10,
  initialValue = 50,
  onChange,
  pipeLabelValue,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)
  const sliderRef = useRef<HTMLDivElement>(null)
  const labelId = useId()

  const clampValue = useCallback(
    (val: number) => {
      return Math.min(Math.max(val, min), max)
    },
    [min, max],
  )

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = clampValue(newValue)
      if (clampedValue !== value) {
        setValue(clampedValue)
        if (onChange) {
          onChange(clampedValue)
        }
      }
    },
    [clampValue, onChange, value],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const largeStepValue = (max - min) / largeStep

    let flag = false
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        updateValue(value - step)
        flag = true
        break
      case 'ArrowRight':
      case 'ArrowUp':
        updateValue(value + step)
        flag = true
        break
      case 'PageDown':
        updateValue(value - largeStepValue)
        flag = true
        break
      case 'PageUp':
        updateValue(value + largeStepValue)
        flag = true
        break
      case 'Home':
        updateValue(min)
        flag = true
        break
      case 'End':
        updateValue(max)
        flag = true
        break
      default:
        break
    }

    if (flag) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  function getClientX(moveEvent: MouseEvent | TouchEvent) {
    if (!('touches' in moveEvent)) {
      return moveEvent.clientX
    }

    const touch = moveEvent.touches.item(0)
    if (touch) {
      return touch.clientX
    }

    return null
  }

  const handleInteractionStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!sliderRef.current) return

    const sliderElement = sliderRef.current
    const rect = sliderElement.getBoundingClientRect()

    const handleInteractionMove = (moveEvent: MouseEvent | TouchEvent) => {
      if ('touches' in moveEvent) {
        moveEvent.preventDefault()
      }

      const clientX = getClientX(moveEvent)
      if (!clientX) return

      const newX = clientX - rect.left
      const percentage = Math.max(0, Math.min(1, newX / rect.width))
      let newValue = min + percentage * (max - min)

      newValue = Math.round(newValue / step) * step
      updateValue(newValue)
    }

    const handleInteractionEnd = () => {
      document.removeEventListener('mousemove', handleInteractionMove)
      document.removeEventListener('mouseup', handleInteractionEnd)
      document.removeEventListener('touchmove', handleInteractionMove)
      document.removeEventListener('touchend', handleInteractionEnd)
    }

    document.addEventListener('mousemove', handleInteractionMove)
    document.addEventListener('mouseup', handleInteractionEnd)
    document.addEventListener('touchmove', handleInteractionMove)
    document.addEventListener('touchend', handleInteractionEnd)

    const initialClientX = 'touches' in event ? event.touches.item(0).clientX : event.clientX
    const initialX = initialClientX - rect.left
    const initialPercentage = Math.max(0, Math.min(1, initialX / rect.width))
    let initialValueUpdate = min + initialPercentage * (max - min)
    initialValueUpdate = Math.round(initialValueUpdate / step) * step
    updateValue(initialValueUpdate)
  }

  const thumbPosition = ((value - min) / (max - min)) * 100

  const finalValue = pipeLabelValue ? pipeLabelValue(value) : value

  return (
    <div className={styles.slider}>
      <label id={labelId} className={styles.slider__label}>
        {label}

        <input type="hidden" {...props} value={value} />
      </label>
      <div className={styles.slider__container}>
        <div
          role="slider"
          ref={sliderRef}
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-labelledby={labelId}
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
          className={styles.slider__control}
        >
          <div className={styles.slider__fill} style={{ width: `${thumbPosition}%` }} />
          <div className={styles.slider__thumb} style={{ left: `${thumbPosition}%` }} />
        </div>
      </div>
      <div className={styles.slider__value} aria-live="polite">
        {finalValue}
      </div>
    </div>
  )
}

export default Slider
