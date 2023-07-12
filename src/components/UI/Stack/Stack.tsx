import { MantineNumberSize, Stack as StackUI } from '@mantine/core'
import React from 'react'
import { standardSizes } from '../../../registry/componentSettingsRegistry'

export const settings = [
  {
    name: 'align',
    label: 'Align',
    type: 'Radios',
    options: [
      {
        name: 'Left',
        value: 'flex-start',
      },
      {
        name: 'Right',
        value: 'flex-end',
      },
      {
        name: 'Center',
        value: 'center',
      },
      {
        name: 'Stretch',
        value: 'stretch',
      },
    ],
  },
  {
    name: 'justify',
    label: 'Justify',
    type: 'Radios',
    options: [
      {
        name: 'Center',
        value: 'center',
      },
      {
        name: 'Top',
        value: 'flex-start',
      },
      {
        name: 'Bottom',
        value: 'flex-end',
      },
      {
        name: 'Space between',
        value: 'space-between',
      },
      {
        name: 'Space around',
        value: 'space-around',
      },
    ],
  },
  {
    name: 'spacing',
    label: 'Spacing',
    type: 'Select',
    options: standardSizes,
  },
  {
    name: 'className',
    label: 'Class',
    type: 'Input',
  },
]

export interface IStack {
  align?: string
  spacing?: MantineNumberSize
  justify?: string
  children: React.ReactNode
  onClick?: any
  className?: any
  mt?: any
  style?: any
  other?: any
}

export function Stack({
  align = 'stretch',
  spacing = 'sm',
  justify = 'center',
  children,
  ...other
}: IStack) {
  return (
    <StackUI
      {...other}
      align={align}
      spacing={spacing || 'xs'}
      justify={justify}
    >
      {children}
    </StackUI>
  )
}

export default Stack
