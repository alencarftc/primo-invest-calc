import { Form } from '@cgp/InvestmentCalc/src/components/Form'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Form> = {
  title: 'Investment Calc/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onFormChange' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialValues: {
      base: 1000,
      recurrent: 200,
      period: 12,
    },
  },
}
