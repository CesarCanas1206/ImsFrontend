import { lazy } from 'react'

const Logout = lazy(() => import('../../components/Preset/Logout/Logout'))

const page = {
  id: 'e333a67f-d0de-410d-bb16-64a3a4e0d47d',
  path: 'logout',
  name: 'Logout',
  element: <Logout />,
  public: true,
  onlyContent: true,
}

export default page
