import React from 'react'

export function Anchor({ children, ...props }: any) {
  return <a {...props}>{children}</a>
}

export default Anchor
