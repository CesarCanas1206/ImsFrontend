import React, { lazy, useContext } from 'react'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Input from '../Input/Input'
import InputState from '../InputState/InputState'
import Stack from '../../UI/Stack/Stack'
import Address from '../../UI/Address/Address'

const Checkbox = lazy(() => import('../Checkbox/Checkbox'))

interface IInputAddress {
  onChange?: any
  prefix?: string
  readOnly?: boolean
  sameAs?: boolean
  sameAsPrefix?: string
}

function InputAddress({
  onChange,
  readOnly,
  prefix: origPrefix = '',
  sameAsPrefix,
  sameAs,
}: IInputAddress) {
  const { getValue } = useContext(FormContext)

  const isSameAs = getValue(`${origPrefix}sameas`) === 'Yes'
  const prefix = isSameAs ? sameAsPrefix ?? '' : origPrefix

  const values = {
    address: getValue(`${prefix}address`),
    addressLine2: getValue(`${prefix}addressLine2`),
    suburb: getValue(`${prefix}suburb`),
    state: getValue(`${prefix}state`),
    postcode: getValue(`${prefix}postcode`),
  }

  if (readOnly) {
    return <Address {...values} />
  }

  const changeHandler = ({ value, key, prefix: sentPrefix }: any) => {
    onChange({ ref: `${sentPrefix ?? prefix}${key}`, value })
  }

  return (
    <Stack spacing={4}>
      {sameAs && (
        <>
          <Checkbox
            value={isSameAs}
            label="Same as above"
            onChange={({ value }: any) =>
              changeHandler({ value, key: 'sameas', prefix: origPrefix })
            }
          />
        </>
      )}
      <Input
        placeholder="Address"
        onChange={({ value }: any) => changeHandler({ value, key: 'address' })}
        disabled={isSameAs}
        value={values.address}
      />
      <Input
        placeholder="Address line 2"
        onChange={({ value }: any) =>
          changeHandler({ value, key: 'addressLine2' })
        }
        disabled={isSameAs}
        value={values.addressLine2}
      />
      <Group spacing={4}>
        <Input
          placeholder="Suburb"
          onChange={({ value }: any) => changeHandler({ value, key: 'suburb' })}
          disabled={isSameAs}
          value={values.suburb}
        />
        <Input
          placeholder="Postcode"
          onChange={({ value }: any) =>
            changeHandler({ value, key: 'postcode' })
          }
          disabled={isSameAs}
          value={values.postcode}
        />
        <InputState
          placeholder="- State -"
          onChange={({ value }: any) => changeHandler({ value, key: 'state' })}
          disabled={isSameAs}
          value={values.state}
        />
      </Group>
    </Stack>
  )
}

export default InputAddress
