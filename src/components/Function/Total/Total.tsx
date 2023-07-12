import React, { useContext } from 'react'
import FormContext from '../../../context/FormContext'
import { formatValue } from '../../../utilities/objects'

function Total({ fields }: any) {
  const { getValue } = useContext(FormContext)

  const total = formatValue(fields).reduce(
    (total: number, field: any) => total + Number(getValue(field)),
    0,
  )

  return <>{total}</>
}

export default Total
