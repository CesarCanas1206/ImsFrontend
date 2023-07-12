import { Group as GroupUI, GroupProps } from '@mantine/core'
import React from 'react'
import { standardSizes } from '../../../registry/componentSettingsRegistry'

export const settings = [
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
      {
        name: 'Apart',
        value: 'apart',
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
    name: 'grow',
    label: 'Grow',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 0,
      },
      {
        name: 'Yes',
        value: 1,
      },
    ],
  },
  {
    name: 'className',
    label: 'Class',
    type: 'Input',
  },
]

interface IGroup extends GroupProps {
  align?: any
  position?: any
  spacing?: any
  grow?: boolean
  children: React.ReactNode
  onClick?: any
  className?: any
  other?: any
  style?: any
}

/**
 * Group
 * @param align flex-start | flex-end
 * @param grow boolean
 * @param position "left" | "right" | "center" | "apart"
 * @param spacing number | "xs" | "sm" | "md" | "lg" | "xl"
 * @returns
 */
export function Group({
  position,
  spacing,
  grow,
  align,
  children,
  ...other
}: IGroup) {
  return (
    <GroupUI
      {...other}
      position={position}
      spacing={spacing || 'xs'}
      grow={grow}
      align={align}
    >
      {children}
    </GroupUI>
  )
}

export default Group
