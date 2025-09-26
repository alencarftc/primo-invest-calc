import { ErrorBanner } from '@cgp/InvestmentCalc/src/components/ErrorBanner'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof ErrorBanner> = {
  title: 'Investment Calc/ErrorBanner',
  component: ErrorBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Visible: Story = {
  args: {
    error: {
      title: 'Falha no carregamento',
      message: 'Não foi possível carregar os dados da API. Por favor, tente novamente mais tarde.',
      instance: new Error('Falha na Simulação'),
    },
  },
}

export const Hidden: Story = {
  args: {
    error: null,
  },
}
