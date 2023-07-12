import Button, { ButtonProps } from '../../Form/Button/Button'
import React, { Suspense, useState } from 'react'
import { Modal } from '@mantine/core'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Anchor from '../../UI/Anchor/Anchor'

export const settings = [
  {
    name: 'title',
    label: 'Title',
    type: 'Input',
    default: 'Are you sure?',
  },
]

export function Confirm({
  onClick,
  onYes,
  yesText = 'Yes',
  noText = 'No',
  title,
  text_link = false,
  children,
  ...props
}: any) {
  const [show, setShow] = useState(props.show || props.opened || false)
  const [answeredYes, setAnsweredYes] = useState(false)
  const btnProps: ButtonProps = { ...props }

  const showHandler = () => {
    setShow(!show)
    if (onClick) {
      onClick()
    }
  }
  const closeHandler = () => setShow(false)

  const yesHandler = () => {
    setAnsweredYes(true)
    if (onYes) {
      onYes()
    }
    closeHandler()
  }

  return (
    <>
      {answeredYes && <Suspense fallback={'...'}>{children}</Suspense>}
      {text_link && (
        <Anchor onClick={showHandler} style={{ cursor: 'pointer' }}>
          {btnProps.text}
        </Anchor>
      )}
      {!text_link && <Button {...btnProps} onClick={showHandler} />}
      {show && (
        <Modal opened={show} title={title} centered onClose={closeHandler}>
          <Suspense fallback={'...'}>
            <DynamicComponent
              component="Group"
              props={{ position: 'center' }}
              sub={[
                {
                  component: 'Button',
                  props: {
                    autoFocus: true,
                    onClick: yesHandler,
                    text: yesText,
                  },
                },
                {
                  component: 'Button',
                  props: {
                    onClick: closeHandler,
                    text: noText,
                    outline: true,
                  },
                },
              ]}
            />
          </Suspense>
        </Modal>
      )}
    </>
  )
}

export default Confirm
