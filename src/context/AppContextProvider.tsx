import { lazy, Suspense, useMemo, useState } from 'react'
import AuthContextProvider from './AuthContextProvider'
import routes from '../registry/pageRegistry'
import AppContext from './AppContext'
import { siteName, storageGet } from 'src/utilities/localStorage'
const App = lazy(() => import('../App'))

function AppContextProvider() {
  const token = storageGet(`token`)
  const [user, setUser] = useState(storageGet(`user`))
  const [userId, setUserId] = useState(storageGet(`userId`))
  const [editMode, setEditMode] = useState(false)
  const [openSideNav, setOpenSideNav] = useState(
    Number(window.outerWidth) > 768,
  )
  const [pageRoutes, setPageRoutes] = useState([])
  const [pages, setPages] = useState([])
  const [details, setDetails] = useState({})
  const [page, setPage] = useState({})
  const [isAdmin, setIsAdmin] = useState(
    storageGet(`userId`) === '7439632e-2dab-11ed-91f6-b4a9fc5fdfa8',
  )

  const [forms, setForms] = useState<any>([])
  const [settings, setSettings] = useState(
    storageGet(`settings`) !== ''
      ? JSON.parse(storageGet(`settings`)!)
      : {
          theme: '#2E53DA',
          sideBar: 'true',
          logo: 'https://apps.imscomply.com.au/demobm2/images/logo_1600990831.png',
        },
  )

  const contextValues = useMemo(
    () => ({
      siteName,
      settings,
      setSettings,
      routes,
      pages,
      setPages,
      pageRoutes,
      setPageRoutes,
      editMode,
      setEditMode,
      openSideNav,
      setOpenSideNav,
      token,
      user,
      setUser,
      userId,
      setUserId,
      details,
      setDetails,
      page,
      setPage,
      isAdmin,
      setIsAdmin,
      forms,
      setForms,
    }),
    [
      siteName,
      settings,
      setSettings,
      routes,
      pages,
      setPages,
      pageRoutes,
      setPageRoutes,
      editMode,
      setEditMode,
      openSideNav,
      setOpenSideNav,
      token,
      user,
      setUser,
      userId,
      setUserId,
      details,
      setDetails,
      page,
      setPage,
      isAdmin,
      setIsAdmin,
      forms,
      setForms,
    ],
  )

  return (
    <AppContext.Provider value={contextValues}>
      <AuthContextProvider>
        <Suspense fallback="">
          <App />
        </Suspense>
      </AuthContextProvider>
    </AppContext.Provider>
  )
}

export default AppContextProvider
