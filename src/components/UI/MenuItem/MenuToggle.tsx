import React, { useState } from 'react'

export function MenuToggle({ name, className, text, to, children }: any) {
  console.log('hello')
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <div className={className} onClick={() => setToggle(!toggle)}>
        {name || text}
      </div>
      {toggle && children}
    </>
  )
}

export default MenuToggle
