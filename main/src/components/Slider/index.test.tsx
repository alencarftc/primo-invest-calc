import { describe, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Slider, { type SliderProps } from './index'

describe('<Slider />', () => {
  describe('rendering and defaults', () => {
    it('should render correctly with initial ARIA attributes', () => {
      // arrange
      const props: SliderProps = { label: 'Volume', initialValue: 50, min: 0, max: 100 }

      // act
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')

      // assert
      expect(screen.getByLabelText(props.label)).toBe(slider)
      expect(slider).toHaveAttribute('aria-valuenow', String(props.initialValue))
      expect(slider).toHaveAttribute('aria-valuemin', String(props.min))
      expect(slider).toHaveAttribute('aria-valuemax', String(props.max))
    })

    it('should render with default props when none are provided', () => {
      // arrange
      const props: SliderProps = { label: 'Brightness' }

      // act
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', '50')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
    })
  })

  describe('keyboard interactions', () => {
    it('should increment the value when ArrowRight is pressed', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', initialValue: 50, step: 5 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{arrowright}')

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', '55')
    })

    it('should decrement the value when ArrowLeft is pressed', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', initialValue: 50, step: 5 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{arrowleft}')

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', '45')
    })

    it('should set the value to max when End key is pressed', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', initialValue: 50, max: 200 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{end}')

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', String(props.max))
    })

    it('should set the value to min when Home key is pressed', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', initialValue: 50, min: 10 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{home}')

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', String(props.min))
    })

    it('should increment the value by a large step when PageUp is pressed', async () => {
      // arrange
      const props: SliderProps = {
        label: 'Volume',
        initialValue: 50,
        largeStep: 10,
        min: 0,
        max: 100,
      }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{pageup}')

      // assert
      // O valor do passo largo é (100-0)/10 = 10. O valor inicial 50 + 10 = 60.
      expect(slider).toHaveAttribute('aria-valuenow', '60')
    })

    it('should decrement the value by a large step when PageDown is pressed', async () => {
      // arrange
      const props: SliderProps = {
        label: 'Volume',
        initialValue: 50,
        largeStep: 10,
        min: 0,
        max: 100,
      }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{pagedown}')

      // assert
      // O valor do passo largo é 10. O valor inicial 50 - 10 = 40.
      expect(slider).toHaveAttribute('aria-valuenow', '40')
    })
  })

  describe('pointer interactions (mouse/touch)', () => {
    const mockBoundingClientRect = (element: HTMLElement, width: number) => {
      element.getBoundingClientRect = jest.fn(() => ({
        width,
        height: 8,
        top: 0,
        left: 0,
        right: width,
        bottom: 8,
        x: 0,
        y: 0,
        toJSON: () => {},
      }))
    }

    it('should update the value on mouse click', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', min: 0, max: 200 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      mockBoundingClientRect(slider, 400)

      // act
      await userEvent.pointer({ target: slider, keys: '[MouseLeft]', coords: { clientX: 300 } })

      // assert
      // Clicar em 300px de 400px é 75% do caminho. 75% do intervalo (0-200) é 150.
      expect(slider).toHaveAttribute('aria-valuenow', '150')
    })

    it('should update the value correctly when dragging the thumb', async () => {
      // arrange
      const props: SliderProps = { label: 'Opacity', min: 0, max: 100 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      mockBoundingClientRect(slider, 500)

      // act
      await userEvent.pointer([
        { keys: '[MouseLeft>]', target: slider, coords: { clientX: 100 } }, // Down at 20%
        { coords: { clientX: 400 } }, // Move to 80%
        { keys: '[/MouseLeft]' }, // Up
      ])

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', '80')
    })
  })

  describe('boundary conditions (clamping)', () => {
    it('should not exceed max value when incrementing at the boundary', async () => {
      // arrange
      const props: SliderProps = { label: 'Test', initialValue: 99, max: 100 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{arrowright}') // Vai para 100
      await userEvent.keyboard('{arrowright}') // Tenta exceder 100

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', String(props.max))
    })

    it('should not go below min value when decrementing at the boundary', async () => {
      // arrange
      const props: SliderProps = { label: 'Test', initialValue: 1, min: 0 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{arrowleft}') // Vai para 0
      await userEvent.keyboard('{arrowleft}') // Tenta ir abaixo de 0

      // assert
      expect(slider).toHaveAttribute('aria-valuenow', String(props.min))
    })
  })

  describe('step prop behavior', () => {
    it('should snap to the nearest step value on mouse click', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', step: 10, min: 0, max: 100 }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider') as HTMLElement
      slider.getBoundingClientRect = jest.fn(() => ({ width: 100, left: 0 }) as DOMRect)

      // act
      await userEvent.pointer({ target: slider, keys: '[MouseLeft]', coords: { clientX: 23 } })

      // assert
      // O valor bruto seria 23. O step de 10 mais próximo é 20.
      expect(slider).toHaveAttribute('aria-valuenow', '20')
    })
  })

  describe('onChange callback', () => {
    it('should call onChange with the new value on pointer interaction', async () => {
      // arrange
      const props: SliderProps = { label: 'Volume', min: 0, max: 200, onChange: jest.fn() }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.getBoundingClientRect = jest.fn(() => ({ width: 400, left: 0 }) as DOMRect)

      // act
      await userEvent.pointer({ target: slider, keys: '[MouseLeft]', coords: { clientX: 200 } })

      // assert
      expect(props.onChange).toHaveBeenCalledTimes(1)
      expect(props.onChange).toHaveBeenCalledWith(100)
    })

    it('should call onChange with the correct value for Home and End keys', async () => {
      // arrange
      const props: SliderProps = {
        label: 'Volume',
        initialValue: 50,
        min: 0,
        max: 100,
        onChange: jest.fn(),
      }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{end}')
      await userEvent.keyboard('{home}')

      // assert
      expect(props.onChange).toHaveBeenCalledTimes(2)
      expect(props.onChange).toHaveBeenCalledWith(props.max)
      expect(props.onChange).toHaveBeenCalledWith(props.min)
    })

    it('should not call onChange if the value does not change', async () => {
      // arrange
      const props: SliderProps = {
        label: 'Volume',
        initialValue: 100,
        max: 100,
        onChange: jest.fn(),
      }
      render(<Slider {...props} />)
      const slider = screen.getByRole('slider')
      slider.focus()

      // act
      await userEvent.keyboard('{arrowright}') // Tenta incrementar além do máximo
      await userEvent.keyboard('{end}') // Tenta ir para o fim, onde já está

      // assert
      expect(props.onChange).not.toHaveBeenCalled()
    })
  })

  describe('accessibility (a11y)', () => {
    it('should have no accessibility violations on initial render', async () => {
      // arrange
      const { container } = render(<Slider label="Accessibility Test" />)

      // act
      const results = await axe(container)

      // assert
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations after receiving focus', async () => {
      // arrange
      const { container } = render(<Slider label="Accessibility Test" />)
      const slider = screen.getByRole('slider')

      // act
      slider.focus()
      const results = await axe(container)

      // assert
      expect(slider).toHaveFocus()
      expect(results).toHaveNoViolations()
    })
  })
})
