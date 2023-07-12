import { Suspense, lazy, useContext } from 'react'
import AppContext from 'src/context/AppContext'
import PageContext from 'src/context/PageContext'

const PageEditButton = lazy(
  () => import('../DynamicPage/PageEditButton/PageEditButton'),
)

const CreateDynamicPage = lazy(() => import('../DynamicPage/CreateDynamicPage'))

function DynamicEditCreateButton() {
  const { page } = useContext(PageContext)
  const { isAdmin } = useContext(AppContext)

  if (typeof page?.id === 'undefined') {
    return <></>
  }

  const staticRoute = page?.components?.length > 0
  const canCreate = window.location.hash == '#admin'

  return (
    <Suspense fallback="">
      {staticRoute && canCreate && isAdmin && <CreateDynamicPage />}
      {!staticRoute && isAdmin && <PageEditButton />}
    </Suspense>
  )
}

export default DynamicEditCreateButton
