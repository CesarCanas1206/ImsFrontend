import { useState } from 'react'
import { Chip as ChipUI } from '@mantine/core'

export const settings = [
  {
    name: 'label',
    label: 'Label',
    type: 'Input',
    default: 'Chip label',
  },
]

export function Chip({ onChange, value, label, ...props }: any) {
  const [checked, setChecked] = useState(false)

  return (
    <ChipUI
      {...props}
      value={value}
      checked={checked}
      onChange={() => setChecked((v) => !v)}
    >
      {label}
    </ChipUI>
  )
}

export default Chip
