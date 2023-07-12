import { Suspense, useState } from 'react'
import Modal from '../Modal/Modal'
import Button, { ButtonProps } from '../../Form/Button/Button'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Anchor from '../Anchor/Anchor'
import { standardSizes } from '../../../registry/componentSettingsRegistry'
import LoaderModal from '../LoaderModal/LoaderModal'

export const settings = [
  {
    name: 'text',
    label: 'Button text',
    type: 'Input',
    default: 'Modal button',
  },
  {
    name: 'title',
    label: 'Modal title',
    type: 'Input',
  },
  {
    name: 'tooltip',
    label: 'Modal button tooltip',
    type: 'Input',
  },
  {
    name: 'icon',
    label: 'Icon',
    type: 'Input',
  },
  {
    name: 'position',
    label: 'Icon position',
    type: 'Radios',
    options: [
      {
        name: 'Left',
        value: 'left',
      },
      {
        name: 'Right',
        value: 'right',
      },
    ],
  },
  {
    name: 'text_link',
    label: 'Text link',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 'false',
      },
      {
        name: 'Yes',
        value: 'true',
      },
    ],
  },
  {
    name: 'size',
    label: 'Size',
    type: 'Select',
    options: [
      ...standardSizes,
      {
        name: 'Fullscreen',
        value: 'fullscreen',
      },
    ],
  },
  {
    name: 'hideclose',
    label: 'Hide close button',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 'false',
      },
      {
        name: 'Yes',
        value: 'true',
      },
    ],
  },
]

export function ModalButton({
  onClick,
  size = 'xl',
  hideFooter,
  text_link = false,
  fullscreen = false,
  hideclose = false,
  ...props
}: any) {
  const [show, setShow] = useState(false)

  const closeHandle = () => {
    setShow(false)
  }

  const showHandle = () => {
    if (typeof onClick !== 'undefined') {
      onClick()
    }
    setShow((s: boolean) => !s)
  }

  const btnProps: ButtonProps = { ...props }

  return (
    <>
      {text_link && (
        <Anchor
          onClick={showHandle}
          style={{ cursor: 'pointer', ...props?.style }}
        >
          {props.icon && (
            <DynamicComponent component="Icon" type={props.icon} />
          )}
          {btnProps.text}
        </Anchor>
      )}
      {!text_link && <Button {...btnProps} onClick={showHandle} />}
      {show && (
        <Modal
          show={show.toString()}
          size={size}
          fullScreen={fullscreen ?? window.outerWidth < 600}
          onClose={closeHandle}
          onClick={closeHandle}
          title={props.title}
        >
          <Suspense fallback={<LoaderModal />}>
            {typeof props.children === 'function' &&
              props.children({ onClose: closeHandle })}
            {typeof props.children !== 'function' && props.children}
            {Boolean(hideclose) !== true && (
              <DynamicComponent
                key="close"
                component="Group"
                props={{ position: 'right', style: { marginTop: 5 } }}
                sub={[
                  <Button
                    key="btn"
                    variant="secondary"
                    onClick={closeHandle}
                    text="Close"
                  />,
                ]}
              />
            )}
          </Suspense>
        </Modal>
      )}
    </>
  )
}

export default ModalButton
