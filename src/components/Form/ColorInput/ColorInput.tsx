import { ColorInput as ColorInputUI } from '@mantine/core'

export const settings = [
  {
    name: 'label',
    label: 'Label',
    type: 'Input',
    default: 'InputColor label',
  },
  {
    name: 'placeholder',
    label: 'Place holder',
    type: 'Input',
    default: 'InputColor Place holder',
  },
]

export function ColorInput({
  label,
  placeholder,
  onChange,
  value,
  children,
  ...props
}: any) {
  const changeHandler = (val: any) => {
    if (onChange) {
      onChange({ name: '', value: val })
    }
  }

  return (
    <ColorInputUI
      {...props?.props}
      label={label}
      onChange={changeHandler}
      value={value}
      placeholder={placeholder}
      swatchesPerRow={7}
      format="hex"
      swatches={[
        '#25262b',
        '#868e96',
        '#fa5252',
        '#e64980',
        '#be4bdb',
        '#7950f2',
        '#4c6ef5',
        '#337ab7',
        '#15aabf',
        '#12b886',
        '#40c057',
        '#82c91e',
        '#fab005',
        '#fd7e14',
      ]}
    />
  )
}

export default ColorInput
