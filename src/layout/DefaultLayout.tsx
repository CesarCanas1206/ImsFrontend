import { Suspense, lazy, useContext } from 'react'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import SideNav from './SideNav/SideNav'

import AppContext from '../context/AppContext'
import LoaderContent from '../components/UI/LoaderContent/LoaderContent'
import Button from '../components/Form/Button/Button'
import Nav from '../components/UI/Nav/Nav'
import PageContext from '../context/PageContext'

import { AppShell, Navbar, MediaQuery } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const DynamicEditCreateButton = lazy(
  () => import('src/components/DynamicPage/DynamicEditCreateButton'),
)

export interface IDefaultLayout {
  children: any
  pages?: any
}

export function DefaultLayout({ children, pages }: IDefaultLayout) {
  const { settings, openSideNav, setOpenSideNav, userId } =
    useContext(AppContext)
  const { page } = useContext(PageContext)

  const mobile = useMediaQuery('(max-width: 768px)')
  const color = settings?.theme ?? '#2E53DA'

  const toggleHandler = () => {
    setOpenSideNav((o: boolean) => !o)
  }

  if (page?.onlyContent) {
    return (
      <Suspense fallback={<LoaderContent noTitle={false} />}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    )
  }

  const publicPage =
    !userId && typeof page.public !== 'undefined' && page.public
  return (
    <AppShell
      layout="alt"
      styles={{
        root: { backgroundColor: 'var(--c-bg, #F1F5FD)' },
        main: {
          marginLeft: mobile && openSideNav ? 0 : 30,
        },
      }}
      navbar={
        mobile && openSideNav
          ? openSideNav
          : page?.onlyContent !== true &&
            page?.hideSideBar !== true &&
            !publicPage &&
            settings.sideBar !== 'false' && (
              <Navbar
                styles={{
                  root: {
                    borderRight: 'none',
                    background: `var(--c-side, ${color})`,
                    '@media (min-width: 768px)': {
                      borderRadius: 21,
                    },
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                  },
                }}
                m={{ sm: 20 }}
                width={{
                  sm: openSideNav ? 220 : 100,
                  lg: openSideNav ? 250 : 100,
                }}
              >
                <SideNav
                  pages={pages}
                  toggleButton={
                    <MediaQuery
                      query="(min-width: 768px)"
                      styles={{ display: 'none' }}
                    >
                      <Button
                        onClick={toggleHandler}
                        icon="Bars"
                        compact
                        tooltip="Toggle menu"
                      />
                    </MediaQuery>
                  }
                />
              </Navbar>
            )
      }
    >
      <ErrorBoundary>
        <Suspense fallback=" ">
          {!publicPage && (
            <Nav
              toggleButton={
                <div style={{ display: 'flex', gap: 4 }}>
                  {page?.hideSideBar !== true && (
                    <Button
                      onClick={toggleHandler}
                      icon="Bars"
                      compact
                      tooltip="Toggle side menu"
                    />
                  )}
                  <DynamicEditCreateButton />
                </div>
              }
            />
          )}
        </Suspense>
        <Suspense fallback={<LoaderContent noTitle={false} />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  )
}

export default DefaultLayout
