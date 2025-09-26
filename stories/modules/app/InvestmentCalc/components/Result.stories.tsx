import { Result } from '@cgp/InvestmentCalc/src/components/Result'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Result> = {
  title: 'Investment Calc/Result',
  component: Result,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    result: { control: 'object' },
    taxes: { control: 'object' },
    lastUpdate: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  taxes: {
    selic: 9.25,
    arca: 18,
  },
  lastUpdate: '25/09/2025',
}

export const Default: Story = {
  args: {
    ...defaultArgs,
    result: {
      selic: 5989.12,
      arca: 11790.34,
      period: 24,
    },
  },
}

export const HighValues: Story = {
  args: {
    ...defaultArgs,
    result: {
      selic: 1254890.55,
      arca: 2150340.88,
      period: 60,
    },
  },
}

export const LowValues: Story = {
  args: {
    ...defaultArgs,
    result: {
      selic: 105.21,
      arca: 120.45,
      period: 3,
    },
  },
}

export const EqualValues: Story = {
  args: {
    ...defaultArgs,
    taxes: {
      selic: 10,
      arca: 10,
    },
    result: {
      selic: 5000.0,
      arca: 5000.0,
      period: 12,
    },
  },
}
