import { useContext, useMemo } from 'react'
import { matchRoutes, useLocation } from 'react-router-dom'
import PageContext from '../context/PageContext'
import DynamicPage from '../components/DynamicPage'
import AppContext from '../context/AppContext'
import useAPI from './useAPI'

export const matchRoute = (routes: any, path: any) => {
  return routes.find((route: any) =>
    route.path.includes(':')
      ? path.match(route.path.replace(/(:[^/]*)/g, '([^/]*)'))
      : route.path === path,
  )
}

function usePage() {
  const { setPages, setPage } = useContext(AppContext)
  const { pages } = useContext(PageContext)
  const { get } = useAPI()
  const location = useLocation()

  const page = useMemo(() => {
    if (typeof pages === 'undefined') {
      return {}
    }
    const matchedRoute: any = matchRoutes(pages, location)
    return matchedRoute[0]?.route
  }, [location, pages])

  const reloadPages = async () => {}

  const pageById = (pageId: any, sentPages?: any) => {
    return (sentPages ?? pages).find(({ id }: any) => id === pageId) ?? {}
  }

  const reloadPage = async (id: any, givenPage: any) => {
    let item: any = null
    if (typeof givenPage !== 'undefined' && givenPage) {
      item = givenPage
    } else {
      item = await get({ endpoint: `page/${id}` })
    }

    const updatedPage = {
      path: `/${item.path}`,
      name: item.name,
      id: item.id,
      public: item.public || false,
      icon: item.icon,
      show: item.show || 0,
      order: item.order || 0,
      exact: true,
      element: <DynamicPage {...item} />,
    }

    const updatedPages = [
      ...pages.map((route: any) =>
        route.id === updatedPage.id ? item : route,
      ),
    ]

    setPages(updatedPages)
    setPage(updatedPage)
  }

  return {
    page,
    id: page?.id,
    pageId: page?.id,
    name: page?.name,
    path: page?.path,
    reloadPages,
    reloadPage,
    pageById,
  }
}

export default usePage
