import React from 'react'
import { NavLink } from 'react-router-dom'
import menuStyle from '../Nav/navMenu.module.css'

export function MenuItemTop({ name, text, to, onClick, child, children }: any) {
  function clickHandler() {
    if (typeof onClick !== 'undefined') {
      onClick()
    }
  }

  return (
    <NavLink
      className={({ isActive }) =>
        `${menuStyle.navLink}${isActive ? ` ${menuStyle.active}` : ''}`
      }
      to={to}
      onClick={clickHandler}
    >
      {name || text}
    </NavLink>
  )
}

export default MenuItemTop
