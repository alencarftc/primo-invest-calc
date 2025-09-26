import type { ComponentPropsWithoutRef, ElementType } from 'react'
import styles from './styles.module.css'

type ScreenReaderTextProps<T extends ElementType> = {
  as?: 'span' | 'p'
} & ComponentPropsWithoutRef<T>

export const ScreenReaderText = <T extends ElementType = 'span'>({
  as,
  children,
}: ScreenReaderTextProps<T>) => {
  const Component = as || 'span'

  return <Component className={styles['sr-only']}>{children}</Component>
}
