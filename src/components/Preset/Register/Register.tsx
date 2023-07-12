import { useContext, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Input from '../../Form/Input/Input'
import AppContext from '../../../context/AppContext'
import AuthContext from '../../../context/AuthContext'
import Password from '../../Form/Password/Password'
import { post } from 'src/hooks/useAPI'

function Register() {
  const { settings } = useContext(AppContext)
  const { login, token, defaultPage } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [org, setOrg] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<any>([])

  const submitHandler = async (e: any) => {
    e.preventDefault()
    setError([])

    try {
      setIsLoading(true)
      const response = await post({
        endpoint: 'register',
        getData: false,
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        },
      })
      if (typeof response.access_token !== 'undefined') {
        login(response)
      } else if (typeof response.message !== 'undefined') {
        setError([response.message])
      }
      setIsLoading(false)
    } catch (error) {
      setError(['The email address or password is incorrect'])
      return Promise.reject(null)
    }
  }

  if (token !== '') {
    return <Navigate to={defaultPage} />
  }

  const fields = [
    {
      label: 'First name',
      value: firstName,
      onChange: ({ value }: any) => setFirstName(value),
    },
    {
      label: 'Last name',
      value: lastName,
      onChange: ({ value }: any) => setLastName(value),
    },
    {
      label: 'Organisation / company',
      value: org,
      onChange: ({ value }: any) => setOrg(value),
    },
    {
      label: 'Mobile number',
      value: mobile,
      type: 'mobile',
      onChange: ({ value }: any) => setMobile(value),
    },
    {
      label: 'Email address',
      value: email,
      type: 'email',
      onChange: ({ value }: any) => setEmail(value),
    },
    {
      label: 'Password',
      value: password,
      type: 'password',
      onChange: ({ value }: any) => setPassword(value),
    },
  ]

  return (
    <div>
      <div
        style={{
          height: 40,
          background: settings.theme === 'blue' ? '#337ab7' : settings.theme,
        }}
      ></div>
      <div style={{ maxWidth: 600, paddingTop: 60, margin: '0 auto' }}>
        {error}

        <Link to="/login">
          <Button
            type="button"
            text="Back to login"
            style={{ marginBottom: '.5rem' }}
            {...{ className: 'btn btn-primary' }}
          />
        </Link>
        <form className="form-signin" onSubmit={submitHandler} method="post">
          {fields.map((field: any) => (
            <label key={field.label} style={{ width: '100%' }}>
              {field.label}
              {field.type === 'password' && (
                <Password onChange={field.onChange} value={field.value} />
              )}
              {field.type !== 'password' && (
                <Input onChange={field.onChange} value={field.value} />
              )}
            </label>
          ))}

          <Button
            text="Register"
            type="submit"
            fullWidth
            style={{ marginTop: 10 }}
            {...{ className: 'btn btn-primary btn-block register' }}
          />
        </form>
      </div>
    </div>
  )
}

export default Register
