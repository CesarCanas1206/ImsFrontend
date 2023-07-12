import React, { useContext } from 'react'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Input from '../Input/Input'
import Stack from '../../UI/Stack/Stack'

interface IInputContact {
  onChange?: any
  prefix?: string
  readOnly?: boolean
  sameAs?: boolean
  sameAsPrefix?: string
}

function InputContact({ onChange, readOnly, prefix = '' }: IInputContact) {
  const { getValue } = useContext(FormContext)

  const values = {
    first_name: getValue(`${prefix}first_name`),
    last_name: getValue(`${prefix}last_name`),
    mobile: getValue(`${prefix}mobile`),
    phone: getValue(`${prefix}phone`),
    email: getValue(`${prefix}email`),
  }

  if (readOnly) {
    return (
      <>
        {[
          `${values.first_name} ${values.last_name}`,
          values.mobile,
          values.phone,
          values.email,
        ]
          .filter((v: string) => v.trim() !== '')
          .map((v: string, k: any) =>
            k === 0 ? (
              <>{v}</>
            ) : (
              <>
                <br />
                {v}
              </>
            ),
          )}
      </>
    )
  }

  const changeHandler = ({ value, key, prefix: sentPrefix }: any) => {
    onChange({ ref: `${sentPrefix ?? prefix}${key}`, value })
  }

  return (
    <Stack spacing={4}>
      <Group spacing={4}>
        <Input
          placeholder="First name"
          onChange={({ value }: any) =>
            changeHandler({ value, key: 'first_name' })
          }
          value={values.first_name}
        />
        <Input
          placeholder="Last name"
          onChange={({ value }: any) =>
            changeHandler({ value, key: 'last_name' })
          }
          value={values.last_name}
        />
      </Group>
      <Group spacing={4}>
        <Input
          placeholder="Phone"
          onChange={({ value }: any) => changeHandler({ value, key: 'phone' })}
          value={values.phone}
        />
        <Input
          placeholder="Mobile"
          onChange={({ value }: any) => changeHandler({ value, key: 'mobile' })}
          value={values.mobile}
        />
      </Group>
      <Input
        placeholder="Email"
        type="email"
        onChange={({ value }: any) => changeHandler({ value, key: 'email' })}
        value={values.email}
      />
    </Stack>
  )
}

export default InputContact
