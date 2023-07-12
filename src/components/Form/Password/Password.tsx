import { PasswordInput } from '@mantine/core'

export function Password({ onChange, value, type, ...props }: any) {
  const changeHandler = (changeValue: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: changeValue })
    }
  }

  return (
    <PasswordInput
      {...props}
      radius="md"
      styles={{
        input: {
          backgroundColor: 'var(--c-input-bg, #ffffff)',
          color: 'var(--c-input, #000000)',
        },
      }}
      onChange={(event: any) => changeHandler(event.currentTarget.value)}
      value={value}
    />
  )
}

export default Password
