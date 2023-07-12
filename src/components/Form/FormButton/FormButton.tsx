import { useContext } from 'react'
import React from 'react'
import FormContext from '../../../context/FormContext'
import Button from '../Button/Button'

interface IFormButton {
  text?: string
}

function FormButton({ text = 'Save and approve' }: IFormButton) {
  const { changeAndSubmit } = useContext(FormContext)

  const approveChangeHandler = async () => {
    changeAndSubmit({ name: 'approved', val: '1' })
  }

  return <Button text={text} icon="save" onClick={approveChangeHandler} />
}

export default FormButton
