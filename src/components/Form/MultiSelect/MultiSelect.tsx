import { MultiSelect as MultiSelectUI } from '@mantine/core'
import { useCallback } from 'react'
import { formatValue, getMatchedValues } from '../../../utilities/objects'

export interface IMultiSelect {
  onChange?: any
  label?: any
  name?: any
  className?: any
  style?: any
  required?: boolean
  value?: any
  placeholder?: any
  data?: any
  options?: any
  readOnly?: any
  props?: any
  itemComponent?: any
  valueComponent?: any
}

export function MultiSelect({
  onChange,
  label,
  value,
  placeholder = '-- Select --',
  data,
  options,
  style,
  className,
  readOnly,
  itemComponent,
  valueComponent,
  ...props
}: IMultiSelect) {
  const changeHandler = useCallback((newValue: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }, [])

  if (typeof options !== 'undefined') {
    data = options
  }

  let optionData = props.required
    ? data
    : [{ label: placeholder }, ...(data || [])]

  const formattedValues = formatValue(value)

  if (readOnly) {
    return <>{getMatchedValues({ value: formattedValues, data })}</>
  }

  return (
    <MultiSelectUI
      withinPortal
      label={label}
      radius="md"
      value={formattedValues}
      onChange={changeHandler}
      placeholder={placeholder}
      searchable
      zIndex={1080}
      data={optionData}
      style={style}
      className={className}
      itemComponent={itemComponent}
      valueComponent={valueComponent}
    />
  )
}

export default MultiSelect
