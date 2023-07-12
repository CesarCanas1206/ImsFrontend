import React from 'react'
import { Space as SpaceUI } from '@mantine/core'

export const settings = [
  {
    name: 'h',
    label: 'Height',
    type: 'Input',
    default: 0,
  },
  {
    name: 'w',
    label: 'Width',
    type: 'Input',
    default: 0,
  },
]

interface ISpace {
  w?: any
  h?: any
}

export function Space({ w, h }: ISpace) {
  return <SpaceUI w={w ?? {}} h={h ?? {}} />
}

export default Space
