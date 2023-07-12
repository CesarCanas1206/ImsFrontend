import React from 'react'

export const settings = [
  {
    name: 'size',
    label: 'Size',
    type: 'Radios',
    options: [
      {
        name: 'H1',
        value: 'h1',
      },
      {
        name: 'H2',
        value: 'h2',
      },
      {
        name: 'H3',
        value: 'h3',
      },
      {
        name: 'H4',
        value: 'h4',
      },
      {
        name: 'H5',
        value: 'h5',
      },
    ],
    default: 'h4',
  },
  {
    name: 'position',
    label: 'Position',
    type: 'Radios',
    options: [
      {
        name: 'Left',
        value: 'left',
      },
      {
        name: 'Right',
        value: 'right',
      },
      {
        name: 'Center',
        value: 'center',
      },
    ],
  },
  {
    name: 'text',
    label: 'Heading',
    type: 'Input',
    default: 'New heading',
  },
]

type IHeading = {
  size?: string
  text?: string
  position?: string
  children?: any
  style?: any
}

export function Heading({
  size = 'h4',
  text,
  position,
  children,
  style,
}: IHeading) {
  return React.createElement(
    size ?? 'h4',
    { style: { textAlign: position, ...style } },
    text,
    children,
  )
}

export default Heading
