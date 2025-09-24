import { createContext } from 'react'
import type { InvestimentForm } from './types'

export const InvestimentContext = createContext<{
  form: InvestimentForm
  result: { arca: number; selic: number }
  update: (key: keyof InvestimentForm, value: number) => void
}>({
  form: {
    base: 0,
    periodInMonths: 0,
    recurrent: 0,
  },
  result: {
    arca: 0,
    selic: 0,
  },
  update: () => {},
})
