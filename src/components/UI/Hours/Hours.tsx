import React, { useContext } from 'react'
import useCalculate from '../../../hooks/useCalculate'
import FormContext from '../../../context/FormContext'

function Hours() {
  const { values } = useContext(FormContext)
  const { calculateHours } = useCalculate()

  const hours = calculateHours(values)

  // const result = Number(values?.price) * Number(hours)
  return <>{hours}</>
}

export default Hours
