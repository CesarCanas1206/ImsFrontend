import { createContext } from 'react'

interface IAuthContext {
  token: any
  isLogin: any
  login: any
  logout: any
  hasPermission: any
  setDefaultPage: any
  defaultPage: any
  defaultPageId: any
  permissions: any
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  isLogin: false,
  login: (token: any) => {},
  logout: () => {},
  hasPermission: () => {},
  setDefaultPage: () => {},
  defaultPage: '',
  defaultPageId: '',
  permissions: '',
})

export default AuthContext
