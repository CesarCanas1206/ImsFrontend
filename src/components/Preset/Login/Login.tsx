import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Input from '../../Form/Input/Input'
import { post } from '../../../hooks/useAPI'
import { AuthContext } from '../../../context/AuthContext'
import AppContext from '../../../context/AppContext'
import Password from '../../Form/Password/Password'
import Alert from '../../UI/Alert/Alert'
import Loader from '../../UI/Loader/Loader'
import PageContext from '../../../context/PageContext'
import LazyLoadImg from '../../UI/LazyLoadImg/LazyLoadImg'
import Group from '../../UI/Group/Group'
import { storageSet } from 'src/utilities/localStorage'
import { getById } from 'src/utilities/objects'

function Login() {
  const [forgotPassword, setForgotPassword] = useState(false)
  const { settings, reloadAndGetPages } = useContext(PageContext)
  const { siteName } = useContext(AppContext)
  const { login, token, permissions, defaultPageId } = useContext(AuthContext)
  const [isLoggingIn, setIsLoggingIn] = useState(
    window.location.hash === 'logging-in',
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<any>([])

  const navigate = useNavigate()

  const requestPasswordHandler = async () => {
    setIsLoggingIn(true)
    const result = await post({
      endpoint: 'forgot-password',
      data: {
        email,
        url: window.location.origin + '/' + siteName + '/reset-password',
      },
      getData: false,
    })
    setError([result.message])
    setIsLoggingIn(false)
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    setError([])
    window.location.hash = 'logging-in'

    try {
      setIsLoggingIn(true)
      const response = await post({
        endpoint: 'auth',
        getData: false,
        data: {
          email,
          password,
        },
      })
      if (response === false) {
        setError(['The email address or password is incorrect'])
        window.location.hash = ''
        setIsLoggingIn(false)
        return
      }
      if (typeof response.access_token !== 'undefined') {
        login(response, async () => {
          setIsLoggingIn(false)
        })
        return
      }
    } catch (error) {
      console.log('rejected?')
      setError(['The email address or password is incorrect'])
      window.location.hash = ''
      return Promise.reject(null)
    }
  }

  const changeHandler = ({ value, ref }: any) => {
    if (ref === 'email') {
      setEmail(value)
    }
    if (ref === 'password') {
      setPassword(value)
    }
  }

  useEffect(() => {
    if (token !== '' && defaultPageId !== '' && !isLoggingIn) {
      const run = async () => {
        setIsLoggingIn(true)
        window.location.hash = 'logging-in'
        const currentPages = await reloadAndGetPages()
        const page = getById(defaultPageId, currentPages)
        const defaultPage = page?.path ?? 'dashboard'
        storageSet('page', defaultPage)
        setIsLoggingIn(false)
        navigate('/' + defaultPage, { replace: true })
      }
      run()
    }
  }, [permissions])

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

        {isLoggingIn && <Loader />}

        {!forgotPassword && (
          <form
            className="form-signin"
            onSubmit={submitHandler}
            method="post"
            style={{ width: '100%' }}
          >
            <Input
              style={{ marginBottom: 10 }}
              value={email}
              placeholder="Email address"
              onChange={({ value }: any) =>
                changeHandler({ value, ref: 'email' })
              }
              type="email"
              disabled={isLoggingIn}
              autoFocus={true}
            />

            <Password
              value={password}
              placeholder="Password"
              style={{ marginBottom: 10 }}
              disabled={isLoggingIn}
              onChange={({ value }: any) =>
                changeHandler({ value, ref: 'password' })
              }
            />

            <div className="checkbox" style={{ float: 'left' }}>
              <label style={{ display: 'none' }}>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <div style={{ float: 'right', marginTop: 20, marginBottom: 10 }}>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setForgotPassword(!forgotPassword)
                }}
                href="#"
              >
                Forgot your password?
              </a>
            </div>
            <Button
              text="Sign in"
              type="submit"
              disabled={isLoggingIn}
              fullWidth
            />
            {/* <Link to="/register">
            <Button
              type="button"
              text="Create account"
              fullWidth
              disabled={isLoggingIn}
              style={{ marginTop: '.5rem' }}
              {...{ className: 'btn btn-primary btn-block register' }}
            />
          </Link> */}
          </form>
        )}
        {forgotPassword && (
          <>
            <Group
              position="right"
              style={{ width: '100%', marginTop: 20, marginBottom: 10 }}
            >
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setForgotPassword(!forgotPassword)
                }}
                href="#"
              >
                Back to login
              </a>
            </Group>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                width: '100%',
              }}
            >
              <Input
                value={email}
                style={{ flexGrow: 1 }}
                placeholder="Email address"
                onChange={({ value }: any) =>
                  changeHandler({ value, ref: 'email' })
                }
              />
              <Button
                type="submit"
                onClick={requestPasswordHandler}
                text="Request password"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
