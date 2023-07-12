import React, { useState } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export function CalendarItem({ text, variant = 'primary', children }: any) {
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className={`bg-${variant} text-white p-1`}
        style={{
          cursor: 'pointer',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          borderBottom: '1px solid #efefef',
        }}
        onClick={() => setShow(true)}
      >
        {text}
      </div>
      {show && (
        <DynamicComponent
          component="Modal"
          props={{ show: show, size: 'lg', onClick: () => setShow(false) }}
          sub={children}
        />
      )}
    </>
  )
}

export default CalendarItem
