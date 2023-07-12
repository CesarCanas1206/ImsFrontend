import React from 'react'

const Login = React.lazy(() => import('../../components/Preset/Login/Login'))

const page = {
  id: 'd234bf8c-0c8c-499a-9f89-a24b5d6bc6d7',
  path: 'login',
  name: 'Login',
  element: <Login />,
  onlyContent: true,
  public: true,
}

export default page
