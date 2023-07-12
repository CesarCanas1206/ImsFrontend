import React, { Suspense, useState } from 'react'
import Modal from '../Modal/Modal'
import Button, { ButtonProps } from '../../Form/Button/Button'
import Form, { FormTypes } from '../../Form/Form/Form'
import { standardSizes } from '../../../registry/componentSettingsRegistry'
import LoaderModal from '../LoaderModal/LoaderModal'
import VenuePreviewContextProvider from 'src/context/VenuePreviewContextProvider'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'

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
    name: 'formId',
    label: 'Form',
    type: 'Select',
    endpoint: 'form',
    format: (row: any) => ({ name: row.name, value: row.id }),
    options: [
      {
        name: 'Dynamic',
        value: '',
      },
    ],
  },
  {
    name: 'itemId',
    label: 'Item Id',
    type: 'Input',
    default: 'new',
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

const buttonProps = [
  'variant',
  'text',
  'icon',
  'className',
  'style',
  'link',
  'position',
  'type',
  'onClick',
  'tooltip',
  'fullWidth',
  'outline',
  'inMenu',
  'light',
  'active',
  'compact',
  'compactX',
  'disabled',
  'props',
  'size',
]

function ModalButtonForm({
  formId,
  itemId,
  onClick,
  readOnly,
  size = 'xl',
  hideFooter,
  onSave,
  formComponent,
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

  let btnProps: any = {}
  buttonProps.forEach((prop) => {
    if (typeof props[prop] !== 'undefined') {
      btnProps[prop] = props[prop]
    }
  })

  const formProps: FormTypes = { ...props }

  return (
    <>
      <VenuePreviewContextProvider>
        <Button {...btnProps} onClick={showHandle} />
        {show && (
          <Modal
            show={show.toString()}
            size={size}
            fullScreen={window.outerWidth < 600}
            onClose={closeHandle}
            onClick={closeHandle}
            title={props.title}
            previewMode={
              formProps?.previewMode ?? formProps?.sentValues?.previewMode
            }
          >
            <Suspense fallback={<LoaderModal />}>
              {show && props.children}
              {formId && (
                <Form
                  formId={formId}
                  itemId={itemId}
                  showClose
                  readOnly={readOnly}
                  onSave={onSave}
                  item_parent_id={formProps.item_parent_id}
                  item_specific_id={formProps.item_specific_id}
                  defaultValues={formProps.defaultValues}
                  sentValues={formProps.sentValues}
                  specific_id={formProps.specific_id}
                  parent_id={formProps.parent_id}
                  autosave={formProps.autosave}
                  query={formProps.query}
                  duplicate={formProps.duplicate}
                  {...props}
                />
              )}
              {formComponent && (
                <DynamicComponent component={formComponent} {...formProps} />
              )}
            </Suspense>
          </Modal>
        )}
      </VenuePreviewContextProvider>
    </>
  )
}

export default ModalButtonForm
