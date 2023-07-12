import { useContext } from 'react'
import NavLink from '../../UI/NavLink/NavLink'
import AppContext from '../../../context/AppContext'
import Icon from '../Icon/Icon'
import style from './menuItem.module.css'
import { useMediaQuery } from '@mantine/hooks'

export function MenuItem({ name, text, icon, to, child, children }: any) {
  const { setOpenSideNav, openSideNav } = useContext(AppContext)
  const mobile = useMediaQuery('(max-width: 767px)')
  const noToggle = !mobile

  return (
    <NavLink
      onClick={() => !noToggle && setOpenSideNav((o: boolean) => !o)}
      className={({ isActive }: any) =>
        `${style.menu_item}${isActive ? ` ${style.active}` : ''}${
          child ? ` ${style.child}` : ''
        }`
      }
      to={to}
    >
      <div>
        {icon && <Icon type={icon} compact style={{ marginRight: 4 }} />}
        {(mobile ? true : openSideNav) ? name || text : null}
      </div>
    </NavLink>
  )
}

export default MenuItem
