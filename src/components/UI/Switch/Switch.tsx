import { Switch as SwitchUI } from '@mantine/core'

export const settings = [
  {
    name: 'label',
    label: 'Label',
    type: 'Input',
    default: 'Switch label',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'Input',
    default: 'Switch description',
  },
]

export function Switch({
  onChange,
  label,
  description,
  name,
  value,
  style,
  checked: defaultChecked,
  readOnly,
  yesNo = true,
  ...props
}: any) {
  const onLabel = props?.onLabel ?? 'Yes'
  const offLabel = props?.offLabel ?? 'No'
  const changeHandler = (e: any) => {
    if (onChange) {
      onChange({
        name,
        value: e.currentTarget.checked
          ? yesNo
            ? onLabel
            : '1'
          : yesNo
          ? offLabel
          : '0',
      })
    }
  }

  const checked =
    defaultChecked ??
    (value &&
      value !== '' &&
      value !== false &&
      Number(value) !== 0 &&
      value !== 'No' &&
      value !== offLabel)

  /** Id is used to bind input and label.
   * if label not passed in, then remove the id from the props, as using
   * the same id (form more than one element in a form) will break the switch
   */
  if (typeof props.label === 'undefined') {
    delete props.id
  }

  if (readOnly) {
    return checked ? onLabel : offLabel
  }

  return (
    <SwitchUI
      {...props}
      checked={checked}
      onChange={changeHandler}
      label={label}
      description={description}
      style={style}
      onLabel={onLabel}
      offLabel={offLabel}
      size="lg"
    />
  )
}

export default Switch
