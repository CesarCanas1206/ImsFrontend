import { Input as InputUI, InputProps } from '@mantine/core'
import { lazy } from 'react'
const InputSuggestions = lazy(
  () => import('../InputSuggestions/InputSuggestions'),
)

export interface IInput extends InputProps {
  onChange?: any
  onClick?: any
  value?: string | number
  readOnly?: boolean
  placeholder?: string
  onKeyUp?: (e: any) => any
  rightSection?: any
  autoFocus?: any
  type?: any
  suggestions?: string[]
  id?: any
}

export function Input({
  onChange,
  readOnly,
  value,
  id,
  suggestions,
  ...props
}: IInput) {
  const changeHandler = (e: any) => {
    if (onChange) {
      onChange({ ...e.target })
    }
  }

  if (readOnly) {
    return <>{value}</>
  }

  if (suggestions && suggestions.length > 0) {
    props.rightSection = (
      <InputSuggestions suggestions={suggestions} onClick={changeHandler} />
    )
  }

  return (
    <InputUI
      onChange={changeHandler}
      value={value}
      radius="md"
      styles={{
        input: {
          backgroundColor: 'var(--c-input-bg, #ffffff)',
          color: 'var(--c-input, #000000)',
        },
      }}
      {...props}
    />
  )
}

export default Input
