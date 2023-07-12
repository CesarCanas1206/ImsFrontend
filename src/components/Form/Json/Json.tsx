import { JsonInput } from '@mantine/core'

export function Json({ onChange, value, minRows = 4, ...props }: any) {
  const changeHandler = (val: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: val })
    }
  }

  const loadValue = typeof value !== 'string' ? JSON.stringify(value) : value

  return (
    <JsonInput
    radius="md"
      onChange={changeHandler}
      validationError="Invalid json"
      formatOnBlur={false}
      minRows={minRows}
      value={loadValue}
      {...props}
    />
  )
}

export default Json
