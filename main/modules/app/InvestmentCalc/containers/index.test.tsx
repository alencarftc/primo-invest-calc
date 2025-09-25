import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { InvestmentCalc } from './InvestmentCalc'

describe('InvestmentCalc', () => {
  it('should render form successfully', () => {
    // arrange
    const values = { selic: 9.25, arca: 18 }

    // act
    render(<InvestmentCalc data={{ values, updated_at: '24/09/2025' }} />)

    // assert
    expect(screen.getByRole('heading', { name: 'Simulador de Investimento' }))
    expect(screen.getByText('Descubra o quanto você pode economizar.'))
    expect(screen.getByRole('slider', { name: 'Quanto gostaria de investir?' }))
    expect(screen.getByRole('slider', { name: 'Por mês, quanto investiria?' }))
    expect(
      screen.getByRole('slider', {
        name: 'Quanto tempo deixaria seu dinheiro investido?',
      }),
    )
  })
})
