import { Radio as RadioUI } from '@mantine/core'

export function Radio({ onChange, checked, ...props }: any) {
  const changeHandler = (checkedValue: any, val: any) => {
    if (onChange) {
      onChange({ name: props?.name, value: val })
    }
  }

  return (
    <RadioUI
      checked={checked}
      onChange={(event) =>
        changeHandler(event.currentTarget.checked, props.value)
      }
      label={props.label}
      style={{ marginTop: '5px' }}
      value={props.value}
    />
  )
}

export default Radio
