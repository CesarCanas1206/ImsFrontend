import React, { useState } from 'react'
import './NavTabs.css'

export default function NavTabs(props: any) {
  const [isChecked, setIsChecked] = useState({
    currenttab: '',
  })

  function handleClick(event: any, value: any) {
    setIsChecked(() => {
      return {
        currenttab: value,
      }
    })
    props.currentTab(value)
    event.target.classList.add('active')
  }

  return (
    <ul className={'nav nav-tabs tab ' + props.className}>
      {props.tabs.map((item: any, index: number) => {
        const classAttribute =
          Number(isChecked.currenttab) === index ? 'active' : ''

        return (
          <li key={index} className={classAttribute}>
            <a
              className={`tabchange active`}
              onClick={(e: any) => handleClick(e, index)}
            >
              {item}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
