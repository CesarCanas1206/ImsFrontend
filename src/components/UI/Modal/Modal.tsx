import React, { Suspense, useEffect, useState } from 'react'
import { Modal as ModalUI } from '@mantine/core'
import ModalContext from '../../../context/ModalContext'
import LoaderModal from '../LoaderModal/LoaderModal'
import styles from './modal.module.css'
import VenuePreview from '../VenuePreview/VenuePreview'

export function Modal({
  onClick,
  onClose,
  children,
  title,
  previewMode,
  ...props
}: any) {
  const [show, setShow] = useState(props.show || props.opened || false)

  const handleClose = () => {
    if (typeof onClick !== 'undefined') {
      onClick()
    }
    if (typeof onClose !== 'undefined') {
      onClose()
    }
    setShow(false)
  }

  useEffect(() => {
    if (typeof props.show === 'undefined') {
      return
    }
    setShow(props.show)
  }, [props.show])

  if (!Boolean(show)) {
    return <></>
  }

  return (
    <>
      <ModalUI.Root
        title={title ?? ''}
        fullScreen={window.outerWidth < 600}
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size={props.size || 'xl'}
        // zIndex={1060}
        opened={show}
        onClose={handleClose}
        overflow="outside"
        withinPortal
        styles={{
          content: {
            backgroundColor: 'var(--c-input-bg, #ffffff)',
            color: 'var(--c-input, #000000)',
            marginLeft: previewMode ? '-40vw' : 'initial',
          },
          header: {
            backgroundColor: 'var(--c-input-bg, #ffffff)',
            color: 'var(--c-input, #000000)',
          },
        }}
      >
        <ModalUI.Overlay />

        <ModalUI.Content style={{ justifyContent: 'flex-start' }}>
          <ModalUI.Header>
            <ModalUI.CloseButton />
          </ModalUI.Header>
          <ModalUI.Body>
            <ModalContext.Provider value={{ onClose: handleClose }}>
              <Suspense fallback={<LoaderModal />}>{show && children}</Suspense>
            </ModalContext.Provider>
          </ModalUI.Body>
        </ModalUI.Content>
        {previewMode ? <VenuePreview /> : null}
      </ModalUI.Root>
    </>
  )
}

export default Modal
