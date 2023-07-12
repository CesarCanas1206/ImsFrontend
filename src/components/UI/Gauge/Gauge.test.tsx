import { render, screen } from '@testing-library/react'
import Gauge from './Gauge'

describe('Gauge component', () => {
  test('renders component with no properties', () => {
    render(<Gauge />)
  })

  test('renders gauge without a badge', () => {
    render(<Gauge />)
    const check = screen.queryByText('Medium')
    expect(check).toBeNull()
  })

  test('renders text medium with showBadge', async () => {
    render(<Gauge showBadge />)
    expect(await screen.findByText('Medium')).toBeInTheDocument()
  })

  test('renders when type is low', async () => {
    render(<Gauge showBadge type="low" />)
    expect(await screen.findByText('Low')).toBeInTheDocument()
  })

  test('renders when type is high', async () => {
    render(<Gauge showBadge type="high" />)
    expect(await screen.findByText('High')).toBeInTheDocument()
  })
})
