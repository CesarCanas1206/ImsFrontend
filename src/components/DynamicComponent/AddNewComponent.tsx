import React, { useState } from 'react'
import Icon from '../UI/Icon/Icon'
import ComponentMenu from '../PageBuilder/ComponentMenu'

export function AddNewComponent(id: number, order: number) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon type="plus" /> Add child component
      </button>
      <ComponentMenu parent_id={id} order={order + 1} hidden={!showMenu} />
    </div>
  )
}

export default AddNewComponent
