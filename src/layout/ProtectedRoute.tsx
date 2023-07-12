import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import DynamicPage from '../components/DynamicPage'
import AppContext from 'src/context/AppContext'
import { storageGet } from 'src/utilities/localStorage'

interface IProtectedRoute {
  children?: any
  name?: string
  page?: any
  isPublic?: boolean
}

function ProtectedRoute({ page, isPublic }: IProtectedRoute) {
  const isAuthenticated = storageGet(`token`) !== ''
  const { page: curPage, setPage } = useContext(AppContext)

  useEffect(() => {
    if (curPage?.id !== page?.id) {
      document.title = page?.name || ''
      setPage(page)
    }
  }, [page])

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/login" />
  }

  if (
    isAuthenticated &&
    (page?.path === 'login' || page?.path === '/') &&
    storageGet('page') !== ''
  ) {
    const page = storageGet('page')
    return <Navigate to={'/' + page} />
  }

  if (typeof page.element !== 'undefined' || page.path === 'login') {
    return <>{page.element}</>
  }

  return <DynamicPage {...page} page={page} />
}

export default ProtectedRoute
