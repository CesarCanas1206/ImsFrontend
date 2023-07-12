import React, { useState } from 'react'
import style from './menuItem.module.css'
import Icon from '../Icon/Icon'

export function MenuGroup({ name, text, to, icon, children }: any) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className={`${style.menu_item}${open ? ` ${style.open}` : ''}`}
        onClick={() => setOpen(!open)}
      >
        <div>
          {icon && <Icon type={icon} compact style={{ marginRight: 4 }} />}
          {name || text}
        </div>
        <Icon
          type="forward"
          compact
          style={{
            transition: 'transform .1s ease-in-out',
            transform: open ? 'rotate(90deg)' : '',
          }}
        />
      </button>
      {open && <div className={style.hasChildren}>{children}</div>}
    </>
  )
}

export default MenuGroup
