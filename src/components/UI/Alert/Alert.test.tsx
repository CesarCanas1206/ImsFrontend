import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from './Alert'

describe('Alert component', () => {
  test('renders defaults with no properties', () => {
    render(<Alert />)
  })

  test('renders with message', () => {
    render(<Alert>Some warning message</Alert>)
    const check = screen.queryByText('Some warning message')
    expect(check).toBeInTheDocument()
  })
})
