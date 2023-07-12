import React, { useEffect, useState } from 'react'

export function Transition({ show, timeout, children }: any) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    const run = async () => {
      setTimeout(() => {
        if (status === '') {
          setStatus('out')
        }
        setStatus('in')
      }, timeout)
    }
    run()
  }, [show, timeout])

  if (status === 'out' || status === '') {
    return <></>
  }

  return children(status)
}

export default Transition
