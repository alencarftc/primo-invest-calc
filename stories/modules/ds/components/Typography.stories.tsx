import Typography, { type TypographyProps } from '@cgp-ds/src/components/Typography'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'div', 'label'],
    },
    children: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<TypographyProps<'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'label'>>

export const Heading: Story = {
  args: {
    variant: 'heading',
    size: 'large',
    weight: 'extrabold',
    children: 'Heading Large Extrabold',
    as: 'h1',
  },
}

export const Subheading: Story = {
  args: {
    variant: 'subheading',
    size: 'medium',
    weight: 'regular',
    children: 'Subheading Medium Regular',
    as: 'h2',
  },
}

export const BodyExtraLargeSemibold: Story = {
  args: {
    variant: 'body',
    size: 'extra-large',
    weight: 'semibold',
    children: 'Body Extra Large Semibold',
    as: 'p',
  },
}

export const BodyLargeBold: Story = {
  args: {
    variant: 'body',
    size: 'large',
    weight: 'bold',
    children: 'Body Large Bold',
    as: 'p',
  },
}

export const BodyMediumSemibold: Story = {
  args: {
    variant: 'body',
    size: 'medium',
    weight: 'semibold',
    children: 'Body Medium Semibold',
    as: 'p',
  },
}

export const BodySmallRegular: Story = {
  args: {
    variant: 'body',
    size: 'small',
    weight: 'regular',
    children: 'Body Small Regular',
    as: 'p',
  },
}

export const BodyRaleway: Story = {
  args: {
    variant: 'body-raleway',
    size: 'medium',
    weight: 'semibold',
    children: 'Body Raleway Medium Semibold',
    as: 'p',
  },
}

export const Uppercase: Story = {
  args: {
    variant: 'uppercase',
    size: 'small',
    weight: 'semibold',
    children: 'Uppercase Small Semibold',
  },
}

export const UppercaseRaleway: Story = {
  args: {
    variant: 'uppercase-raleway',
    size: 'medium',
    weight: 'semibold',
    children: 'Uppercase Raleway Medium Semibold',
  },
}

export const SpecialOpenSans: Story = {
  args: {
    variant: 'special-opensans',
    size: 'medium',
    weight: 'extrabold',
    children: 'Special Open Sans Medium Extrabold',
  },
}
