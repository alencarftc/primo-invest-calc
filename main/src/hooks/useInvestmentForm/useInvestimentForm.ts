import { useContext } from 'react'
import { InvestimentContext } from './context'

export const useFormInvestimentContext = () => {
  const context = useContext(InvestimentContext)
  if (!context) throw new Error('Form investiment context is not set')

  return context
}
