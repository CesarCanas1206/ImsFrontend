import React, { useContext, useRef } from 'react'
import AppContext from '../../../context/AppContext'
import PageContext from '../../../context/PageContext'
import menuStyle from './navMenu.module.css'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import { isEmpty } from '../../../utilities/strings'
import ActionMenu from '../ActionMenu/ActionMenu'

const loadSub = (page: any, visiblePages: any) => {
  page.items = []
  visiblePages.forEach((item: any) => {
    if (item.parent_id && item.id && item.parent_id === item.id) {
      item = loadSub(item, visiblePages)
      page.items = [...page.items, item]
    }
  })

  return {
    name: page.name,
    to: `/${page.path.replace(/(^\/)(.*)/, '$2')}`,
    icon: page.icon,
    items: page.items,
  }
}

export function NavMenu() {
  const { user, userId, siteName } = useContext(AppContext)
  const { pages } = useContext(PageContext)
  const supportRef = useRef(document.createElement('form'))

  const supportHandler = () => {
    const sForm = supportRef.current || document.createElement('form')
    sForm.setAttribute(
      'action',
      'https://apps.imscomply.com.au/support-request.php',
    )
    sForm.setAttribute('method', 'post')
    sForm.setAttribute('target', '_blank')
    const fields = [
      { name: 'webfolder', value: siteName },
      { name: 'isqip', value: '0' },
      { name: 'qippropertygroup', value: '' },
      { name: 'userid', value: '1' },
      { name: 'product', value: 'Bookings manager' },
      { name: 'fullname', value: 'IMS Account' },
      { name: 'thisuseremail', value: 'test@imscomply.com.au' },
      { name: 'currentcompany', value: 'Test' },
    ]
    fields.forEach(({ name, value }: any) => {
      const field = document.createElement('input')
      field.setAttribute('name', name)
      field.setAttribute('value', value)
      field.setAttribute('type', 'hidden')
      sForm.appendChild(field)
    })
    sForm.submit()
  }

  const visibleRoutes = pages.filter((route: any) => route.show === 1)

  const nav = visibleRoutes
    .filter((route: any) => isEmpty(route.parent_id))
    .map((route: any) => loadSub(route, visibleRoutes))

  return (
    <div className={menuStyle.navItems}>
      <form ref={supportRef} />
      <ActionMenu
        key="n"
        customButton={true}
        text={
          <div className={menuStyle.navLink}>
            <DynamicComponent
              component="Icon"
              fontSize="inherit"
              type="Notifications"
            />
          </div>
        }
        actions={[
          {
            text: 'No notifications',
            icon: 'Cancel',
            onClick: () => {},
          },
        ]}
      />
      <ActionMenu
        key="u"
        customButton={true}
        text={
          <div className={menuStyle.navLink}>
            <DynamicComponent
              component="Icon"
              fontSize="inherit"
              type="UserOutline"
              style={{ marginRight: 2 }}
            />
            {user}
            <DynamicComponent
              component="Icon"
              fontSize="inherit"
              type="Down"
              style={{ marginLeft: 2 }}
            />
          </div>
        }
        actions={[
          ...nav.map((item: any, index: number) => ({
            link: item.to,
            icon: item.icon,
            text: item.name,
          })),
          {
            modal: true,
            sub: [
              {
                component: 'Form',
                formId: 'user-details',
                itemId: userId,
              },
            ],
            text: 'Profile',
          },
          {
            text: 'Support',
            modal: true,
            sub: [
              {
                component: 'Support',
              },
            ],
            // onClick: supportHandler,
          },
          {
            href: '/logout',
            link: true,
            text: 'Log out',
          },
        ]}
      />
    </div>
  )
}

export default NavMenu
