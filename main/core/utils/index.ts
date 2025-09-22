import clsx, { type ClassValue } from 'clsx'

export function cx(...args: ClassValue[]): string {
  return clsx(...args)
}
