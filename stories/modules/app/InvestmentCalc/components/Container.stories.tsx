import { InvestmentCalc } from '@cgp/InvestmentCalc/src/containers/InvestmentCalc'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof InvestmentCalc> = {
  title: 'Investment Calc/Application',
  component: InvestmentCalc,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockSuccessData = {
  values: {
    selic: 9.25,
    arca: 18,
  },
  updated_at: '25/09/2025',
}

const mockErrorData = {
  title: 'Erro ao carregar Dados',
  message: 'Não foi possível buscar as taxas atualizadas. Por favor, tente novamente mais tarde.',
  instance: new Error('Erro ao carregar Dados'),
}

export const Default: Story = {
  args: {
    data: mockSuccessData,
    error: null,
  },
}

export const ErrorState: Story = {
  args: {
    data: {
      values: { selic: 0, arca: 0 },
      updated_at: '-',
    },
    error: mockErrorData,
  },
}
