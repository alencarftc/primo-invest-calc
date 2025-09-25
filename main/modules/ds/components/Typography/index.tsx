import { cx } from '@cgp-core/utils'
import type { DsTypographyToken } from '@cgp-ds/contracts/typography'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import styles from './styles.module.css'

type TypographyProps<T extends ElementType> = {
  as?: T
  children: ReactNode
} & DsTypographyToken &
  ComponentPropsWithoutRef<T>

function getTypographyClass(props: DsTypographyToken): string {
  const classNameKey = `${props.variant}--${props.size}-${props.weight}`

  return styles[classNameKey as keyof typeof styles] ?? ''
}

export default function Typography<T extends ElementType = 'span'>({
  as,
  children,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'span'

  const typographyClassName = getTypographyClass(props as DsTypographyToken)

  return (
    <Component {...props} className={cx(typographyClassName, className)}>
      {children}
    </Component>
  )
}
