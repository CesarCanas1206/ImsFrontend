import React, { Children, useState } from 'react'
import { Menu } from '@mantine/core'

export function Dropdown({ children, ...props }: any) {
  const [toggle, setToggle] = useState(false)
  const [first, ...rest]: any = Children.toArray(children)

  const toggleHandler = () => {
    console.log(`toggling??`, toggle)
    setToggle(!toggle)
  }

  if (typeof first === 'undefined') {
    return <></>
  }

  return (
    <>
      <Menu
      // opened={toggle}
      // control={React.cloneElement(first, { onClick: () => toggleHandler })}
      >
        {rest.map((child: any, idx: number) => (
          <Menu.Item key={idx}>
            {React.cloneElement(child, { onClick: () => toggleHandler })}
          </Menu.Item>
        ))}
        <Menu.Label>Thing</Menu.Label>
      </Menu>
    </>
  )
}

export default Dropdown
