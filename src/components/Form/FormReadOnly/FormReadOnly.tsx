import React, { useContext } from 'react'
import FormContext from '../../../context/FormContext'

function FormReadOnly({ children, show = true }: any) {
  const context = useContext(FormContext)

  if (context && !show && context.readOnly) {
    return <></>
  }

  return <>{children}</>
}

export default FormReadOnly
