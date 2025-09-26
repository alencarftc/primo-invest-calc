import { Header } from '@cgp/InvestmentCalc/src/components/Header'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Header> = {
  title: 'Investment Calc/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
