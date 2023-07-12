import React from 'react'
import { Badge as BadgeUI, MantineSize } from '@mantine/core'

export const settings = [
  {
    name: 'text',
    label: 'Badge text',
    type: 'Input',
  },
  {
    name: 'color',
    label: 'Badge colour',
    type: 'Input',
  },
]

export interface IBadge {
  component?: any
  text?: string
  children?: any
  color?: string
  size?: MantineSize
}

export function Badge({
  component,
  text,
  children,
  color = 'cyan',
  size = 'md',
}: IBadge) {
  return (
    children && (
      <BadgeUI
        color={color}
        variant="light"
        radius="xs"
        size={size}
        component={component}
        styles={{
          inner: {
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          },
        }}
      >
        {text}
        {children}
      </BadgeUI>
    )
  )
}

export default Badge
