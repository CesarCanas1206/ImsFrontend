import { SegmentedControl as SegmentedUI } from '@mantine/core'
import { getMatchedValues } from '../../../utilities/objects'

export interface SegmentedProps {
  onChange?: any
  label?: any
  name?: any
  className?: any
  style?: any
  required?: boolean
  searchable?: boolean
  value?: any
  placeholder?: any
  data?: any
  options?: any
  readOnly?: any
  props?: any
  itemComponent?: any
  readOnlyBrackets?: any
  reloadData?: any
  icon?: any
}

export function Segmented({
  onChange,
  label,
  value,
  placeholder = '-- Select --',
  data,
  options,
  style,
  className,
  readOnly,
  reloadData,
  icon,
  ...props
}: SegmentedProps) {
  const changeHandler = (newValue: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  const optionData = options ?? data ?? []

  if (readOnly) {
    return <>{getMatchedValues({ value, data })}</>
  }

  return (
    <SegmentedUI
      color="blue"
      value={String(value)}
      onChange={changeHandler}
      placeholder={placeholder}
      data={optionData}
      style={style}
      className={className}
      radius="md"
      styles={{
        root: {
          backgroundColor: 'var(--c-input-bg, #ffffff)',
          border: '0.0625rem solid #ced4da',
        },
      }}
    />
  )
}

export default Segmented
