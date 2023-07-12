import { useState } from 'react'

const useInput = (validateValue: (enteredValue: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredValue((event.target as HTMLInputElement).value)
  }

  const inputBlurHandler = (event: React.MouseEvent<HTMLElement>) => {
    setIsTouched(true)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
  }
}

export default useInput
