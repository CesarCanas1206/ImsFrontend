import { Card as CardUI } from '@mantine/core'
import React from 'react'

export interface ICard {
  children?: React.ReactNode
  radius?: any
  style?: object
  p?: any
  shadow?: any
}

function Card({ children, style, radius = '16px', p, ...props }: ICard) {
  return (
    <CardUI
      shadow={props?.shadow ?? 'sm'}
      radius={radius}
      style={{
        backgroundColor: 'var(--c-side, #ffffff)',
        color: 'var(--c-text, #1A1C1E)',
        ...style,
        overflow: 'visible',
      }}
      p={p}
      withBorder
      {...props}
    >
      {children}
    </CardUI>
  )
}

export default Card
