import { createContext } from 'react'

interface IAppContext {
  siteName?: any
  settings?: any
  setSettings?: any
  routes: any
  pages: any
  setPages: any
  pageRoutes: any
  setPageRoutes: any
  editMode: any
  setEditMode: any
  openSideNav: any
  setOpenSideNav: any
  token: any
  user: any
  setUser: any
  userId: any
  setUserId: any
  details: any
  setDetails: any
  page: any
  setPage: any
  isAdmin: any
  setIsAdmin: any
  forms: any
  setForms: any
}

export const AppContext = createContext<IAppContext>({
  siteName: '',
  settings: {},
  setSettings: () => {},
  routes: [],
  pages: [],
  setPages: () => {},
  pageRoutes: [],
  setPageRoutes: () => {},
  editMode: true,
  setEditMode: () => {},
  openSideNav: true,
  setOpenSideNav: () => {},
  token: '',
  user: '',
  setUser: () => {},
  userId: '',
  setUserId: () => {},
  details: {},
  setDetails: () => {},
  page: '',
  setPage: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  forms: [],
  setForms: () => {},
})

export default AppContext
