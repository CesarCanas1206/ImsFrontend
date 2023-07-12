import React from 'react'

const ResetPassword = React.lazy(
  () => import('../../components/Preset/ResetPassword/ResetPassword'),
)

const page = {
  id: 'd234bf8c-0c8c-499a-9f89-a24b5d6bc6d7',
  path: 'reset-password',
  name: 'Reset password',
  element: <ResetPassword />,
  onlyContent: true,
  public: true,
}

export default page
