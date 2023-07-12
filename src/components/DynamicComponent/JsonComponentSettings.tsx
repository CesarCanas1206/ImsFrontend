import { useClickOutside } from '@mantine/hooks'
import { Modal, Button } from '@mantine/core'
import React, { useState } from 'react'
import usePageBuilder from '../../hooks/usePageBuilder'
import Icon from '../UI/Icon/Icon'
import componentRegistry from '../../registry/componentRegistry'
import { SettingRow } from './ComponentSettings'

interface IJsonComponentSettings {
  component: string
  id: number
  name: string
  order: number
  props: any
  modalSettings?: any
  updateProperty?: any
  compProperties?: any
}

const updateValue = (obj: any, idxs: any, value: any) => {
  // Bring back the first index and change idxs to have what's left
  const firstIndex = idxs.shift()
  const indexLength = idxs.length
  if (
    typeof obj[firstIndex] !== 'string' &&
    (typeof obj[firstIndex]?.sub !== 'undefined' ||
      typeof obj[firstIndex]?.components !== 'undefined')
  ) {
    // Update the obj.sub or components depending on what's there
    // if (typeof obj[firstIndex]?.sub !== 'undefined')
    obj[firstIndex].sub = updateValue(obj[firstIndex].sub, idxs, value)
    // else
    //   obj[firstIndex].components = updateValue(
    //     obj[firstIndex].components,
    //     idxs,
    //     value,
    //   )
  }

  if (typeof obj[firstIndex] !== 'undefined' && !indexLength) {
    obj[firstIndex] = { ...obj[firstIndex], props: value }
  }
  return obj
}

function JsonComponentSettings({
  component,
  id,
  name,
  order,
  modalSettings,
  compProperties,
  updateProperty,
  props = {},
}: IJsonComponentSettings) {
  const [showSettings, setShowSettings] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const ref = useClickOutside(() => setShowSettings(false))
  const { saveComponent, deleteComponent } = usePageBuilder()

  const [properties, setProperties] = useState(props || {})

  const componentItem = componentRegistry[component]

  const settings = componentItem?.settings

  if (typeof componentItem === 'undefined') {
    return <>JsonComponentSettings: Invalid component</>
  }

  const doSaveModal = () => {
    const { sub, children, ...saveProps } = properties
    const { columns, index } = compProperties

    const formattedColumns =
      typeof columns === 'string' ? JSON.parse(columns ?? '[]') : columns

    console.log('doSaveModal-before:', formattedColumns, [...index], saveProps)

    const newValue = updateValue(formattedColumns, [...index], saveProps)

    console.log('doSaveModal-after:', newValue)

    updateProperty(newValue)
    // saveComponent({
    //   id,
    //   props: newValue,
    // })
    setShowSettings(false)
  }

  const doSaveOrder = (order: any) => {
    saveComponent({
      id,
      order,
    })
  }

  const updateLocalProperty = (name: string, value: any) => {
    setProperties({
      ...properties,
      [name]: value,
    })
  }

  const doDelete = () => {
    deleteComponent({ id })
    setShowSettings(false)
  }

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <span className="justify-self-end me-1">
        <input
          type="number"
          style={{ width: 35 }}
          defaultValue={order}
          onBlur={({ target }) => doSaveOrder(target.value)}
        />
      </span>
      <Button
        onClick={() => {
          setShowSettings(true)
          setShowSettingsModal(true)
        }}
        className="btn-dark p-1 h-100"
        size="xs"
        compact
      >
        <Icon type="gears" />
      </Button>
      <Button
        className="btn-primary p-1 h-100"
        onClick={() => setShowMenu(!showMenu)}
        size="xs"
        compact
      >
        <Icon type="plus" />
      </Button>
      {modalSettings && (
        <Modal
          opened={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
        >
          {showSettings && (
            <div className="container" ref={ref}>
              {name}
              {typeof settings === 'object' &&
                typeof settings.map !== 'undefined' &&
                settings?.map((setting: any, idx: number) => (
                  <SettingRow
                    key={setting.name || idx}
                    index={idx}
                    {...setting}
                    properties={properties}
                    updateProperty={updateLocalProperty}
                    blurProperty={updateLocalProperty}
                    compProperties={compProperties}
                  />
                ))}
              <div className="btn-toolbar gap-1 mt-2 justify-content-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={doSaveModal}
                  hidden={
                    typeof settings === 'undefined' || settings?.length === 0
                  }
                >
                  Save <Icon type="save" />
                </button>
                <button className="btn btn-danger btn-sm" onClick={doDelete}>
                  Delete <Icon type="trash" />
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default JsonComponentSettings
