import { lazy, Suspense, useContext } from 'react'
import AppContext from '../../context/AppContext'
import PageTitle from '../UI/PageTitle/PageTitle'
import useComponentQuery from '../../hooks/useComponentQuery'
import { isEmpty } from '../../utilities/strings'
const BackToTop = lazy(() => import('../UI/BackToTop/BackToTop'))

const DynamicComponent = lazy(
  () => import('../DynamicComponent/DynamicComponent'),
)
const PageBuilder = lazy(() => import('../PageBuilder/PageBuilder'))

type ComponentTypes = {
  id: string
  component: string
  props?: object
  sub?: object[]
}

interface IDynamicPage {
  hideTitle?: boolean
  page?: any
}

export function DynamicPage({ hideTitle = false, page }: IDynamicPage) {
  const { editMode } = useContext(AppContext)

  const staticRoute = page?.components?.length > 0
  const { data: components } = useComponentQuery(
    page?.id,
    page?.components,
    staticRoute,
  )

  const topComponents = components?.filter(({ parent_id }: any) =>
    isEmpty(parent_id),
  )

  const hasPageTitleComponent =
    components?.filter(
      (comp: any) =>
        comp.component === 'PageTitle' ||
        typeof comp.titleSub !== 'undefined' ||
        (typeof comp.sub !== 'undefined' &&
          comp.sub?.filter((comp: any) => comp.component === 'PageTitle')
            .length > 0),
    ).length > 0

  const pageTitleComponents = components?.filter(
    (comp: any) => comp.component === 'TitleComponents',
  )

  const pageComponents = topComponents?.filter(
    (comp: any) => comp.component !== 'TitleComponents',
  )

  return (
    <>
      {!hideTitle && !hasPageTitleComponent && (
        <PageTitle
          title={page?.name}
          children={pageTitleComponents?.map((item: any, idx: number) => (
            <DynamicComponent key={item.id || idx} {...item} />
          ))}
        />
      )}
      {typeof pageComponents.length !== 'undefined' &&
        pageComponents.map((item: ComponentTypes, idx: number) => {
          return (
            <DynamicComponent key={page?.name + (item.id || idx)} {...item} />
          )
        })}
      {editMode && (
        <Suspense fallback="">
          <PageBuilder pageComponents={pageComponents} />
        </Suspense>
      )}
      <Suspense fallback="">
        <BackToTop />
      </Suspense>
    </>
  )
}

export default DynamicPage
