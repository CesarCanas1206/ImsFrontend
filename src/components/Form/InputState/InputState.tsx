import Select from '../Select/Select'

const states = [
  {
    label: 'ACT',
    value: 'ACT',
  },
  {
    label: 'NSW',
    value: 'NSW',
  },
  {
    label: 'NT',
    value: 'NT',
  },
  {
    label: 'QLD',
    value: 'QLD',
  },
  {
    label: 'SA',
    value: 'SA',
  },
  {
    label: 'TAS',
    value: 'TAS',
  },
  {
    label: 'VIC',
    value: 'VIC',
  },
  {
    label: 'WA',
    value: 'WA',
  },
]

interface IInputState {
  onChange?: any
  value?: string
  placeholder?: string
  disabled?: boolean
}

function InputState({ onChange, value, placeholder, disabled }: IInputState) {
  return (
    <Select
      data={states}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

export default InputState
