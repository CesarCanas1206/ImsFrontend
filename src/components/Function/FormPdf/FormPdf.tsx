import React from 'react'
import { useParams } from 'react-router-dom'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export function FormPdf({ text }: any) {
  const params = useParams()
  const formId = params.formId || 'hot-tub-drain'
  const itemId = params.itemId || 5522

  return (
    <>
      <DynamicComponent
        component="Form"
        props={{ readOnly: true, printing: true, formId, itemId }}
      />
    </>
  )
}

export default FormPdf
