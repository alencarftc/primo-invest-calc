import { describe, expect, fireEvent, it, render, screen } from '@cgp-tests/utils'
import InvestmentCalc from './InvestmentCalc'

describe('InvestmentCalc', () => {
  const BASE_SLIDER_LABEL = /Quanto gostaria de investir/i
  const RECURRENT_SLIDER_LABEL = /Por mês, quanto investiria/i
  const PERIOD_SLIDER_LABEL = /Quanto tempo deixaria seu dinheiro investido/i
  const HEADING_CONTENT = /Simulador de Investimento/i
  const SUBHEADING_CONTENT = /Descubra o quanto você pode economizar./i

  describe('when setup fetch is success', () => {
    it('should render form successfully', () => {
      // arrange
      const values = { selic: 9.25, arca: 18 }
      const updateAt = '24/09/2025'

      // act
      render(<InvestmentCalc data={{ values, updated_at: updateAt }} error={null} />)

      // assert
      expect(screen.getByRole('heading', { name: HEADING_CONTENT })).toBeInTheDocument()
      expect(screen.getByText(SUBHEADING_CONTENT)).toBeInTheDocument()
      expect(screen.getByRole('slider', { name: BASE_SLIDER_LABEL })).toBeInTheDocument()
      expect(screen.getByRole('slider', { name: RECURRENT_SLIDER_LABEL })).toBeInTheDocument()
      expect(screen.getByRole('slider', { name: PERIOD_SLIDER_LABEL })).toBeInTheDocument()
    })

    it('should calculate investment successfully', () => {
      // arrange
      render(
        <InvestmentCalc
          data={{ values: { selic: 9.25, arca: 18 }, updated_at: '24/09/2025' }}
          error={null}
        />,
      )

      // act
      fireEvent.change(screen.getByRole('slider', { name: BASE_SLIDER_LABEL }), {
        target: { value: '100' },
      })
      fireEvent.change(screen.getByRole('slider', { name: RECURRENT_SLIDER_LABEL }), {
        target: { value: '100' },
      })
      fireEvent.change(screen.getByRole('slider', { name: PERIOD_SLIDER_LABEL }), {
        target: { value: '12' },
      })

      // assert
      expect(screen.getByText('Em 12 meses você teria:')).toBeInTheDocument()
      expect(screen.getByText('R$ 1.361,55 investindo na taxa Selic')).toBeInTheDocument()
      expect(screen.getByText('R$ 1.418,47 investindo no Fundo Arca')).toBeInTheDocument()
    })

    it('should calculate large investiment successfully', () => {
      // arrange
      render(
        <InvestmentCalc
          data={{ values: { selic: 9.25, arca: 18 }, updated_at: '24/09/2025' }}
          error={null}
        />,
      )

      // act
      fireEvent.change(screen.getByRole('slider', { name: BASE_SLIDER_LABEL }), {
        target: { value: '1000' },
      })
      fireEvent.change(screen.getByRole('slider', { name: RECURRENT_SLIDER_LABEL }), {
        target: { value: '800' },
      })
      fireEvent.change(screen.getByRole('slider', { name: PERIOD_SLIDER_LABEL }), {
        target: { value: '12' },
      })

      // assert
      expect(screen.getByText('Em 12 meses você teria:')).toBeInTheDocument()
      expect(screen.getByText('R$ 11.111,62 investindo na taxa Selic')).toBeInTheDocument()
      expect(screen.getByText('R$ 11.585,17 investindo no Fundo Arca')).toBeInTheDocument()
    })
  })

  describe('when setup fetch is failure', () => {
    it('should render an error banner instead of form when fetch return error', () => {
      // arrange
      const error = {
        title: 'Titulo do erro',
        message: 'Mensagem do erro',
        instance: new Error('Titulo do erro'),
      }

      // act
      render(
        <InvestmentCalc data={{ values: { selic: 0, arca: 0 }, updated_at: '-' }} error={error} />,
      )

      // assert
      expect(screen.getByRole('heading', { name: /Titulo do erro/i })).toBeInTheDocument()
      expect(screen.getByText(/Mensagem do erro/i)).toBeInTheDocument()

      expect(screen.getByRole('heading', { name: 'Simulador de Investimento' }))
      expect(screen.getByText('Descubra o quanto você pode economizar.'))
      expect(screen.queryByRole('slider', { name: BASE_SLIDER_LABEL })).not.toBeInTheDocument()
      expect(screen.queryByRole('slider', { name: RECURRENT_SLIDER_LABEL })).not.toBeInTheDocument()
      expect(screen.queryByRole('slider', { name: PERIOD_SLIDER_LABEL })).not.toBeInTheDocument()
    })
  })
})
