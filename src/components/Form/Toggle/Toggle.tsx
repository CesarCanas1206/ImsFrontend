import { Input } from '@mantine/core'
import React from 'react'

function Toggle({
  onChange,
  value,
  data,
  options,
  readOnly,
  required = false,
  ...props
}: any) {
  const changeHandler = (newValue: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({
        name: props?.name,
        value: value === newValue ? '' : String(newValue),
      })
    }
  }

  if (typeof options !== 'undefined') {
    data = options
  }

  return (
    <Input
      radius={'md'}
      component="div"
      styles={{
        input: {
          backgroundColor: 'var(--c-input-bg, #ffffff)',
          color: 'var(--c-input, #000000)',
          display: 'flex',
          cursor: 'pointer',
          gap: 14,
          div: {
            display: 'flex',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            whiteSpace: 'nowrap',
          },
          'div:not(:last-child)': {
            borderRight: '1px solid #ced4da',
            paddingRight: 14,
          },
        },
      }}
    >
      {typeof data?.map !== 'undefined' &&
        data.map((item: any) => (
          <div
            style={{
              color:
                value !== item.value ? '#ced4da' : 'var(--c-link, #19407E)',
            }}
            key={item.value}
            onClick={() =>
              item.value !== value || !required
                ? changeHandler(item.value)
                : false
            }
          >
            {item.label}
          </div>
        ))}
    </Input>
  )
}

export default Toggle
