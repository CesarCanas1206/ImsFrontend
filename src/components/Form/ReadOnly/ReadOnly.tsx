import React from 'react'

export function ReadOnly({ value, text }: any) {
  return <>{value ?? text}</>
}

export default ReadOnly
