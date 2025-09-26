import { Slider } from '@cgp-ds/src/components/Slider'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Slider> = {
  title: 'Design System/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Volume',
    name: 'volume',
    min: 0,
    max: 100,
    defaultValue: 50,
  },
}

export const WithStep: Story = {
  args: {
    label: 'Brilho (em passos de 10)',
    name: 'brightness',
    min: 0,
    max: 100,
    defaultValue: 50,
    step: 10,
  },
}

export const WithValueFormatting: Story = {
  args: {
    label: 'Preço do Imóvel',
    name: 'price',
    min: 100000,
    max: 2000000,
    defaultValue: 750000,
    step: 10000,
    pipeLabelValue: (value) =>
      value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }),
  },
}

export const NegativeRange: Story = {
  args: {
    label: 'Temperatura (°C)',
    name: 'temperature',
    min: -20,
    max: 40,
    defaultValue: 15,
  },
}
