import React, { useState } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Modal from '../Modal/Modal'

function NavModalButton({ icon, children, text, className }: any) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={className} onClick={() => setOpen(!open)}>
        <DynamicComponent
          component="Icon"
          fontSize="inherit"
          type={icon}
          style={{ marginRight: 2 }}
        />
        {text}
      </div>
      {open && (
        <Modal show={open.toString()} onClick={() => setOpen(!open)}>
          {children}
        </Modal>
      )}
    </>
  )
}

export default NavModalButton
