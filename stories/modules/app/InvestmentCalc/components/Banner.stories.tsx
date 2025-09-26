import { Banner } from '@cgp/InvestmentCalc/src/components/Banner'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Banner> = {
  title: 'Investment Calc/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    paragraph: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Simulador de Investimento',
    paragraph: 'Descubra o quanto você pode economizar e alcançar seus objetivos.',
  },
}

export const LongText: Story = {
  args: {
    title: 'Planejamento Financeiro Detalhado Para Aposentadoria Antecipada',
    paragraph:
      'Utilize nossa ferramenta avançada para simular cenários complexos, incluindo aportes mensais, taxas de juros variáveis e projeções de longo prazo para garantir sua tranquilidade financeira.',
  },
}

export const ShortText: Story = {
  args: {
    title: 'Calcule',
    paragraph: 'Invista agora.',
  },
}
