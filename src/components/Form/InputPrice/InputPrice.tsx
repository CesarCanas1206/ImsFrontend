import React, { CSSProperties, FC, KeyboardEvent, useCallback } from 'react'
import Input from '../Input/Input'

interface Props {
  className?: string
  max?: number
  onChange?: any
  onValueChange: (value: number) => void
  style?: CSSProperties
  value: any
  readOnly?: boolean
}

const VALID_FIRST = /^[1-9]{1}$/
const VALID_NEXT = /^[0-9]{1}$/
const DELETE_KEY_CODE = 8

const InputPrice: FC<Props> = ({
  className = '',
  max = Number.MAX_SAFE_INTEGER,
  onChange: onValueChange,
  style = {},
  value,
  readOnly,
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value))
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    // throw new Error(`invalid value property`)
  }
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key, keyCode } = e
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return
      }
      const valueString = value.toString()
      let nextValue: number
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`
        nextValue = Number.parseInt(nextValueString, 10)
      } else {
        const nextValueString = valueString.slice(0, -1)
        nextValue =
          nextValueString === '' ? 0 : Number.parseInt(nextValueString, 10)
      }
      if (nextValue > max) {
        return
      }
      onValueChange({ value: nextValue })
    },
    [max, onValueChange, value],
  )
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, [])
  const valueDisplay = value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  })

  //   const dollarIcon = <Icon type="dollar" fontSize="13" me={'0'}></Icon>

  if (readOnly) {
    return <>{valueDisplay}</>
  }

  return (
    <>
      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={valueDisplay}
      />
    </>
  )
}

export default InputPrice

// import React, { useState, useEffect } from 'react'
// import Group from '../../UI/Group/Group'
// import Icon from '../../UI/Icon/Icon'
// import Input from '../Input/Input'

// const decimals = 2
// function InputPrice({ readOnly, value = '', ...props }: any) {
//   // value = Number(value).toFixed(decimals)
//   const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
//   value = !Number.isNaN(parseFloat(value))
//     ? Number(value.match(regex)[0]).toFixed(decimals)
//     : ''

//   const dollarIcon = <Icon type="dollar" fontSize="13" me={'0'}></Icon>

//   if (readOnly) {
//     return (
//       <>
//         {dollarIcon}
//         {value}
//       </>
//     )
//   }

//   const { type, ...otherProps } = props

//   return (
//     <Group spacing={'0'}>
//       {dollarIcon}
//       <Input value={value} {...otherProps} />
//     </Group>
//   )
// }

// export default InputPrice
