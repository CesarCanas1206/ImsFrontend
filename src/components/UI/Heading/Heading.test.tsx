import React from 'react'
import { render, screen } from '@testing-library/react'
import Heading from './Heading'

describe('Heading component', () => {
  test('renders defaults with no properties', () => {
    render(<Heading />)
  })

  test('renders text title', () => {
    render(<Heading text="Title" />)
    const check = screen.queryByText('Title')
    expect(check).toBeInTheDocument()
  })

  test('renders text title as h1', () => {
    render(<Heading size="h1" text="Title" />)
    const checkElement = screen.getByText((_content: any, element: any) => {
      return element.tagName.toLowerCase() === 'h1'
    })

    expect(checkElement).toBeInTheDocument()
  })
})
