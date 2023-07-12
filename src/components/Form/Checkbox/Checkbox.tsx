import { Checkbox as CheckboxUI } from '@mantine/core'

export function Checkbox({
  onChange,
  value,
  name,
  style,
  label,
  readOnly,
  checked: defaultChecked,
  type,
  yesNo = true,
  ...props
}: any) {
  const changeHandler = (e: any) => {
    if (onChange) {
      onChange({
        name,
        value: e.currentTarget.checked
          ? yesNo
            ? 'Yes'
            : '1'
          : yesNo
          ? 'No'
          : '0',
      })
    }
  }

  const checked =
    defaultChecked ??
    (value &&
      value !== '' &&
      value !== false &&
      value !== '0' &&
      value !== 'No')

  if (readOnly) {
    return <>{checked ? 'Yes' : 'No'}</>
  }

  return (
    <CheckboxUI
      style={style}
      checked={checked}
      onChange={changeHandler}
      label={label}
      {...props}
    />
  )
}

export default Checkbox
