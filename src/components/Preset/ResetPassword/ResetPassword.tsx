import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../../../components/Form/Button/Button'
import useAPI from '../../../hooks/useAPI'
import Password from '../../../components/Form/Password/Password'
import Alert from '../../../components/UI/Alert/Alert'
import Loader from '../../../components/UI/Loader/Loader'
import PageContext from '../../../context/PageContext'
import LazyLoadImg from 'src/components/UI/LazyLoadImg/LazyLoadImg'
import Heading from 'src/components/UI/Heading/Heading'

function ResetPassword() {
  const { post, get } = useAPI()
  const { settings } = useContext(PageContext)
  const [isLoggingIn, setIsLoggingIn] = useState(
    window.location.hash === 'resetting',
  )

  const [searchParams] = useSearchParams()

  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [token] = useState(searchParams.get('token'))
  const [error, setError] = useState<any>([])

  console.log(searchParams.get('token'))

  useEffect(() => {
    setError([])
    if (token === '') {
      setError(['Invalid token'])
    }
    const run = async () => {
      const result = await get({
        endpoint: `check-token/${token}`,
        getData: false,
      })

      if (typeof result.email === 'undefined') {
        setError([result.message])
      }
      setEmail(result.email)
    }
    run()
  }, [token])

  const submitHandler = async (e: any) => {
    e.preventDefault()
    setError([])
    window.location.hash = 'resetting'

    try {
      setIsLoggingIn(true)
      const response = await post({
        endpoint: 'reset-password',
        getData: false,
        data: {
          token,
          email,
          password,
          password_confirmation: confirmPassword,
        },
      })
      if (response === false) {
        setError(['Password updated!'])
        window.location.hash = ''
        setIsLoggingIn(false)
        return
      }
      if (
        typeof response.result !== 'undefined' &&
        response.result === 'success'
      ) {
        setSuccess(true)
        setIsLoggingIn(false)
        return
      }
    } catch (error) {
      console.log('rejected?')
      setError(['Password updated!'])
      window.location.hash = ''
      return Promise.reject(null)
    }
  }

  const passwordChangeHandler = useCallback(({ value }: any) => {
    setPassword(value)
  }, [])

  const confirmPasswordChangeHandler = useCallback(({ value }: any) => {
    setConfirmPassword(value)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: '100%',
          paddingBottom: 40,
          paddingLeft: 10,
          paddingRight: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 15,
        }}
      >
        {typeof settings !== 'undefined' &&
          (typeof settings?.logo !== 'undefined' ||
            typeof settings['login-logo'] !== 'undefined') && (
            <LazyLoadImg
              alt={settings.name ?? 'IMS'}
              src={
                settings['login-logo']?.value ??
                settings['login-logo'] ??
                settings.logo?.value ??
                settings.logo
              }
            />
          )}
        {error.length !== 0 && (
          <Alert color="red" icon="warning">
            {error}
          </Alert>
        )}

        <Heading>Reset password</Heading>

        {isLoggingIn && <Loader />}

        {success && (
          <>
            <Heading size="h5">Password updated!</Heading>
            <Button text="Go to login" fullWidth link="/login" />
          </>
        )}
        {!success && (
          <form
            className="form-signin"
            onSubmit={submitHandler}
            method="post"
            style={{ width: '100%' }}
          >
            <Password
              value={password}
              placeholder="Password"
              style={{ marginBottom: 10 }}
              disabled={isLoggingIn}
              onChange={passwordChangeHandler}
            />

            <Password
              value={confirmPassword}
              placeholder="Confirm password"
              style={{ marginBottom: 10 }}
              disabled={isLoggingIn}
              onChange={confirmPasswordChangeHandler}
            />
            <Button
              text="Reset password"
              type="submit"
              disabled={isLoggingIn}
              fullWidth
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
