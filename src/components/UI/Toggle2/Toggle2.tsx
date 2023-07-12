import React, { useState, Children, Suspense } from 'react'

type PropTypes = {
  children?: any
}

export function Toggle({ children }: PropTypes) {
  const [toggle, setToggle] = useState(false)
  const [first, ...rest]: any = Children.toArray(children)

  const toggleHandler = () => {
    setToggle((o: boolean) => !toggle)
  }

  if (typeof first === 'undefined') {
    return <></>
  }

  return (
    <>
      {React.cloneElement(first, {
        props: { ...first.props.props, onClick: () => toggleHandler() },
      })}
      <Suspense fallback="">
        {toggle && (
          <>
            {rest.map((child: any) =>
              React.cloneElement(child, {
                onClick: () => toggleHandler(),
                show: toggle,
              }),
            )}
          </>
        )}
      </Suspense>
    </>
  )
}

export default Toggle
