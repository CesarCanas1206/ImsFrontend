import Radio from '../Radio/Radio'

export function Radios({
  onChange,
  readOnly,
  value,
  data,
  options,
  ...props
}: any) {
  const changeHandler = (save: any) => {
    if (onChange) {
      onChange({ name: props.name, value: save.value })
    }
  }

  if (typeof options !== 'undefined') {
    data = options
  }

  if (readOnly) {
    return <>{value}</>
  }

  return (
    <>
      {data?.map((item: any) => (
        <Radio
          key={item.value}
          checked={String(value) === String(item.value)}
          onChange={changeHandler}
          label={item.label}
          value={item.value}
        />
      ))}
    </>
  )
}

export default Radios
