import { lazy, useMemo, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { isEmpty } from '../utilities/strings'
import { get } from '../hooks/useAPI'
import routes from '../registry/pageRegistry'
import AppContext from './AppContext'
import PageContext from './PageContext'
import DefaultLayout from 'src/layout/DefaultLayout'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLoading from 'src/layout/AppLoading'
import { storageGet } from 'src/utilities/localStorage'
import Page404 from 'src/components/Preset/Page404/Page404'
const ProtectedRoute = lazy(() => import('src/layout/ProtectedRoute'))

function PageContextProvider() {
  const { settings, setSettings, isAdmin, forms, setForms, page, setPage } =
    useContext(AppContext)

  const [actions, setActions] = useState<any>([])

  const registerAction = (action: any) => {
    setActions((current: any) => [
      ...current.filter(({ id }: any) => id !== action.id),
      action,
    ])
  }

  const removeAction = (action: any) => {
    setActions((current: any) =>
      current.filter(({ id }: any) => id !== action.id),
    )
  }

  const runAction = (action: any) => {
    let output = ''
    const found = actions.filter(
      ({ ref, id }: any) =>
        (typeof action?.ref !== 'undefined' && ref === action?.ref) ||
        (typeof action.id !== 'undefined' && id === action?.id),
    )
    if (found.length !== 0) {
      found.forEach((item: any) => {
        if (typeof item.output !== 'undefined') {
          output += item.output
          return
        }
        if (typeof item.action === 'function') {
          item.action()
        }
      })
    }
    return output
  }

  const {
    data: pages,
    isLoading: initialIsLoading,
    isFetching,
    refetch: reloadPages,
  } = useQuery({
    queryKey: ['initial'],
    queryFn: async () => {
      const initial = await get({ endpoint: 'initialise' })
      setSettings(initial?.settings ?? {})
      setForms(initial?.forms?.map((f: any) => Object.values(f))?.flat() ?? [])
      return setupPages(initial) ?? []
    },
    placeholderData: [],
    staleTime: 30 * 60 * 1000,
  })

  const setupPages = ({ settings, pages }: any) => {
    const modules = Array.isArray(settings?.modules)
      ? settings.modules
      : JSON.parse(settings?.modules ?? '[]')

    const permissions = storageGet('permissions')
    const checkPermissions = permissions?.split(',')

    const ids = pages?.map(({ id }: any) => id)

    const visiblePages = [
      ...routes.filter(
        (page: any) => !Array.isArray(ids) || !ids.includes(page.id),
      ),
      ...(pages ?? {}),
    ]
      .filter(
        ({ ims }: any) =>
          isAdmin || typeof ims === 'undefined' || Number(ims) === 0,
      )
      .filter(({ module }: any) => isEmpty(module) || modules.includes(module))
      .filter(
        ({ permission }: any) =>
          isEmpty(permission) || checkPermissions.includes(permission),
      )
      .sort(
        (p1: any, p2: any) => Number(p1?.order ?? 0) - Number(p2?.order ?? 0),
      )

    return visiblePages ?? []
  }

  const reloadAndGetPages = async () => {
    const { data } = await reloadPages()
    return data ?? []
  }

  const providerValues = useMemo(
    () => ({
      page,
      setPage,
      pages,
      settings,
      forms,
      reloadPages,
      reloadAndGetPages,
      actions,
      registerAction,
      removeAction,
      runAction,
    }),
    [
      page,
      setPage,
      pages,
      settings,
      forms,
      reloadPages,
      reloadAndGetPages,
      actions,
      registerAction,
      removeAction,
      runAction,
    ],
  )

  if (initialIsLoading || isFetching) {
    return <AppLoading />
  }

  return (
    <PageContext.Provider value={providerValues}>
      <DefaultLayout pages={pages}>
        <Routes>
          <Route
            key="/"
            path="/"
            element={
              // <Navigate to={(storageGet('page') || 'login')} replace />
              <Navigate to='/login' replace />
            }
          />
          <Route key="undefined" path="undefined" element={<></>} />
          <Route key="Not found" path="*" element={<Page404 />} />
          {pages?.map((route: any) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute
                  name={route.name}
                  isPublic={route.public}
                  page={route}
                />
              }
            />
          ))}
        </Routes>
      </DefaultLayout>
    </PageContext.Provider>
  )
}

export default PageContextProvider
