import React, { useState } from 'react'
import style from './menuItem.module.css'
import Icon from '../../UI/Icon/Icon'
import WeekTimesAll from '../WeekTimes/WeekTimesAll'
import ExpandCollapse from 'react-expand-collapse';
type IHeading = {
  text?: string
  children?: any
}

export function FormSection({ text, children }: IHeading) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        key={'heading'}
        style={{
          borderRadius: 4,
          // display: 'flex',
          alignItems: 'center',
          marginBottom: 5,
          padding: 5,
          color: 'white',
          backgroundColor: 'var(--c-side, #2E53DA)',
          backgroundImage:
            'linear-gradient(60deg, rgba(0,0,0,.2), transparent)',
          backgroundAttachment: 'fixed',
        }}
      >

        <button
          className={`${style.menu_item}${open ? ` ${style.open}` : ''}`}
          onClick={() => setOpen(!open)}
        >
          <div>
            {text}
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
        {open && <div className={style.hasChildren}>
          <WeekTimesAll></WeekTimesAll>
        </div>}
      </div>
      {children}
    </div>
  )
}

export default FormSection
