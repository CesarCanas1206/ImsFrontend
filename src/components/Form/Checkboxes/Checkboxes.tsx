import CheckboxUI from '../Checkbox/Checkbox'
import { formatValue, getMatchedValues } from '../../../utilities/objects'

export function Checkboxes({
  onChange,
  value,
  data,
  options,
  readOnly,
  ...props
}: any) {
  const changeHandler = (e: any) => {
    if (onChange) {
      let tmp = formatValue(value)
      if (e.value === false || e.value === 'No') {
        tmp = tmp.filter((item: any) => item !== e.name)
      } else {
        tmp = [...tmp, e.name]
      }
      onChange({ value: JSON.stringify(tmp) })
    }
  }

  const formattedValues = formatValue(value)

  if (typeof options !== 'undefined') {
    data = options
  }

  if (readOnly) {
    return <>{getMatchedValues({ value: formattedValues, data })}</>
  }

  return (
    <>
      {data?.map((item: any, idx: number) => {
        return (
          <CheckboxUI
            key={item.value}
            style={{ marginBottom: 5 }}
            {...props}
            checked={formattedValues?.includes(item.value)}
            onChange={changeHandler}
            label={item.label}
            name={item.value}
          />
        )
      })}
    </>
  )
}

export default Checkboxes
