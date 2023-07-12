import { lazy, useContext, useMemo } from 'react'
import { AppContext } from '../../context/AppContext'
import MenuItem from '../../components/UI/MenuItem/MenuItem'
import MenuGroup from '../../components/UI/MenuItem/MenuGroup'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import styles from './sideNav.module.css'
import Footer from '../Footer/Footer'
import { isEmpty } from '../../utilities/strings'
import Stack from 'src/components/UI/Stack/Stack'
import LazyLoadImg from 'src/components/UI/LazyLoadImg/LazyLoadImg'
import { useMediaQuery } from '@mantine/hooks'

const DynamicComponent = lazy(
  () => import('../../components/DynamicComponent/DynamicComponent'),
)

const loadSub = (page: any, visiblePages: any) => {
  const subPages = visiblePages
    .filter(({ parent_id }: any) => parent_id && parent_id === page.id)
    .map((subPage: any) => loadSub(subPage, visiblePages))

  return {
    ...page,
    to: `/${page.path?.replace(/(^\/)(.*)/, '$2')}`,
    items: subPages,
  }
}

export function SideNav({ toggleButton, pages }: any) {
  const { openSideNav, settings } = useContext(AppContext)
  const { defaultPage } = useContext(AuthContext)
  const mobile = useMediaQuery('(max-width: 767px)')

  const visibleRoutes =
    pages?.filter(({ show }: any) => Number(show) === 2) ?? []

  const nav = useMemo(
    () =>
      visibleRoutes
        .filter(({ parent_id }: any) => isEmpty(parent_id))
        .map((route: any) => loadSub(route, visibleRoutes)),
    [pages],
  )

  return (
    <>
      <div style={{ padding: 16, overflow: 'auto' }}>
        {typeof toggleButton !== 'undefined' && <>{toggleButton}</>}
        <Link to={'/' + defaultPage} className={styles?.logo}>
          <LazyLoadImg
            height={150}
            alt={settings?.name ?? 'IMS'}
            src={settings?.logo?.value ?? settings?.logo}
            className={styles.logoImage}
            loading="lazy"
          />
        </Link>
        {/* <DynamicComponent component="SiteSearch" /> */}
        <Stack>
          {nav.map((item: any, index: number) => {
            if (typeof item.component !== 'undefined') {
              return <DynamicComponent key={index} {...item} />
            }
            return (mobile || openSideNav) &&
              typeof item.items !== 'undefined' &&
              item.items.length ? (
              <MenuGroup key={index} {...item}>
                {item.items
                  ?.filter(({ to }: any) => to !== '')
                  .map((tab: any, tabIndex: number) => {
                    return (
                      <MenuItem
                        child
                        key={tabIndex}
                        {...tab}
                        icon={undefined}
                      />
                    )
                  })}
              </MenuGroup>
            ) : (
              <MenuItem key={index} {...item} />
            )
          })}
        </Stack>
      </div>
      {/* <Footer settings={settings} /> */}
    </>
  )
}

export default SideNav
