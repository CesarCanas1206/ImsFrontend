import { useWindowScroll } from '@mantine/hooks'
import { Affix, Transition, rem } from '@mantine/core'
import Button from 'src/components/Form/Button/Button'
import { useEffect, useState } from 'react'

let scrollTimeout: any

function BackToTop() {
  const [scroll, scrollTo] = useWindowScroll()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (scroll.y > 200 && !show) {
      setShow(true)
    }
    if (scroll.y <= 200 && show) {
      setShow(false)
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      setShow(false)
    }, 2000)

    return () => {
      clearTimeout(scrollTimeout)
    }
  }, [scroll])

  return (
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Transition transition="slide-up" duration={400} mounted={show}>
        {(transitionStyles) => (
          <div style={transitionStyles}>
            <Button
              text="Scroll to top"
              icon="Up"
              onClick={() => {
                scrollTo({ y: 0 })
              }}
            />
          </div>
        )}
      </Transition>
    </Affix>
  )
}

export default BackToTop
