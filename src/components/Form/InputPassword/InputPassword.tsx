import React, { useState } from 'react'
import Stack from '../../UI/Stack/Stack'
import Password from '../Password/Password'

function InputPassword({ onChange, value }: any) {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const changeHandler = ({ value: sentValue, ref }: any) => {
    const isConfirm = ref === 'confirm'
    setError(
      (isConfirm ? value : sentValue) ===
        (isConfirm ? sentValue : confirmPassword)
        ? ''
        : 'Passwords do not match',
    )
    if (isConfirm) {
      setConfirmPassword(sentValue)
      return
    }
    onChange({ value: sentValue })
  }

  return (
    <Stack>
      <Password
        value={value}
        onChange={changeHandler}
        autocomplete="off"
        placeholder="Set/change password"
      />
      <Password
        value={confirmPassword}
        placeholder="Confirm password"
        autocomplete="off"
        onChange={({ value }: any) => changeHandler({ value, ref: 'confirm' })}
      />
      {error !== '' && <div style={{ color: '#ff0000' }}>{error}</div>}
    </Stack>
  )
}

export default InputPassword
