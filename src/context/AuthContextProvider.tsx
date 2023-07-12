import { useState, useContext, useEffect, useMemo } from 'react'
import AppContext from './AppContext'
import AuthContext from './AuthContext'
import {
  storageGet,
  storageRemove,
  storageSet,
} from 'src/utilities/localStorage'

export function AuthContextProvider(props: any) {
  const { setUser, setUserId, setIsAdmin } = useContext(AppContext)
  const token = storageGet(`token`)
  const [defaultPage, setDefaultPage] = useState('')
  const [defaultPageId, setDefaultPageId] = useState(
    storageGet(`defaultPageId`),
  )
  const [permissions, setPermissions] = useState(storageGet(`permissions`))
  const [justLoggedIn, setJustLoggedIn] = useState(false)
  const isLogin = !!token

  const loginHandler = (user: any, callback: any) => {
    const newToken = user.access_token
    const userName = user.user
    const userId = user.id
    const userPermissions = Array.isArray(user.permissions)
      ? user.permissions.join()
      : user.permissions

    storageSet('token', newToken ?? '')
    storageSet('user', userName ?? '')
    storageSet('userId', userId ?? '')
    storageSet('email', user.email ?? '')
    storageSet('permissions', userPermissions ?? '')
    storageSet(`defaultPageId`, user.page ?? 'dashboard')

    setUser(userName ?? '')
    setUserId(userId ?? '')
    setPermissions(userPermissions ?? '')
    setIsAdmin(userId === '7439632e-2dab-11ed-91f6-b4a9fc5fdfa8')
    setDefaultPageId(user.page)
    setJustLoggedIn(true)
    callback()
  }

  useEffect(() => {
    if (!justLoggedIn) {
      return
    }
    setJustLoggedIn(false)
  }, [justLoggedIn])

  const logoutHandler = async () => {
    setDefaultPage('')
    setDefaultPageId('')
    setUserId('')
    storageRemove('page')
    storageRemove('defaultPageId')
    storageRemove('token')
    storageRemove('user')
    storageRemove('email')
    storageRemove('userId')
    storageRemove('permissions')
  }

  const hasPermission = (permission: any, userPermissions?: any) => {
    if (typeof permission === 'undefined' || !permission || permission === '') {
      return true
    }
    const checking =
      typeof userPermissions !== 'undefined' ? userPermissions : permissions

    const found =
      checking && checking?.split(',').find((p: any) => p === permission)
    return found ?? false
  }

  const providerValues = useMemo(
    () => ({
      token,
      isLogin,
      login: loginHandler,
      logout: logoutHandler,
      hasPermission,
      defaultPage,
      setDefaultPage,
      defaultPageId,
      permissions,
      setPermissions,
    }),
    [
      token,
      isLogin,
      loginHandler,
      logoutHandler,
      hasPermission,
      defaultPage,
      setDefaultPage,
      defaultPageId,
      permissions,
      setPermissions,
    ],
  )

  return (
    <AuthContext.Provider value={providerValues}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
