import { JsonInput, Drawer } from '@mantine/core'
import React, { useEffect, useState, Suspense } from 'react'
import usePageBuilder from '../../hooks/usePageBuilder'
import ComponentMenu from '../PageBuilder/ComponentMenu'
import componentRegistry from '../../registry/componentRegistry'
import useAPI from '../../hooks/useAPI'
import Textarea from '../Form/Textarea/Textarea'
import { JsonComponent } from './JsonComponent'
import Button from '../Form/Button/Button'
import Group from '../UI/Group/Group'
import Stack from '../UI/Stack/Stack'
import Row from '../UI/Row/Row'
import Col from '../UI/Col/Col'

interface IRadios {
  name?: string
  options?: any
  value?: any
  updateProperty?: any
}

function Radios({ name, options, value, updateProperty }: IRadios) {
  return (
    <Group>
      {options?.map((opt: any, idx: number) => (
        <label key={idx}>
          <input
            type="radio"
            value={opt.value}
            onChange={() => updateProperty(name, opt.value)}
            checked={value === opt.value}
          />{' '}
          {opt.name}
        </label>
      ))}
    </Group>
  )
}

function Setting(props: any) {
  const valueString =
    props.properties[props.name] &&
    typeof props.properties[props.name] === 'string'
      ? props.properties[props.name]
      : JSON.stringify(props.properties[props.name])
  return (
    <>
      {['icon', 'Icon', 'text', 'Text', 'Input'].includes(props.type) && (
        <input
          type="text"
          name={props.name}
          className="form-control"
          onChange={({ target }) =>
            props.updateProperty(props.name, target.value)
          }
          defaultValue={props.properties[props.name]}
        />
      )}
      {['textarea', 'Textarea'].includes(props.type) && (
        <Textarea
          name={props.name}
          minRows={6}
          onChange={(value: any) => props.updateProperty(props.name, value)}
          defaultValue={valueString}
        />
      )}
      {['json', 'Json'].includes(props.type) && (
        <>
          <JsonComponent
            compProperties={{ ...props.properties, id: props.id }}
            name={props.name}
            value={props.properties[props.name]}
            updateProperty={props.updateProperty}
          />
          <JsonInput
            validationError="Invalid json"
            minRows={6}
            onBlur={(e) =>
              props.updateProperty(props.name, JSON.parse(e.target.value))
            }
            defaultValue={valueString}
          />
        </>
      )}
      {['radio', 'Radio', 'Radios'].includes(props.type) && (
        <Radios
          name={props.name}
          options={props.options}
          updateProperty={props.updateProperty}
          value={props.properties[props.name]}
        />
      )}
      {['select', 'Select'].includes(props.type) && (
        <select
          name={props.name}
          className="form-select"
          onChange={({ target }) =>
            props.updateProperty(props.name, target.value, props.index)
          }
          defaultValue={props.properties[props.name]}
        >
          {props.options
            ?.sort(function (a: any, b: any) {
              return a.name
                .toString()
                .localeCompare(b.name.toString(), undefined, {
                  numeric: true,
                  sensitivity: 'base',
                })
            })
            .map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            ))}
        </select>
      )}
    </>
  )
}

export function SettingRow(props: any) {
  const [loading, setLoading] = useState(true)
  const { get } = useAPI()
  const [options, setOptions] = useState(props.options || [])

  useEffect(() => {
    const load = async () => {
      if (typeof props.endpoint !== 'undefined') {
        const previousOptions = [...options]
        const results = await get({ endpoint: props.endpoint })
        setOptions([...previousOptions, ...results.map(props.format)])
      }

      setLoading(false)
    }
    load()
  }, [])

  const setDefaultsHandler = async () => {
    props.updateProperty(props.name, props.default)
  }

  return (
    <Row>
      <Col key="a" span={4}>
        <strong>{props.label}</strong>
        {typeof props.default !== 'undefined' && (
          <span>
            <Button
              onClick={setDefaultsHandler}
              compact
              tooltip="Set to default values"
              icon="Power"
            />
          </span>
        )}
      </Col>
      <Col key="b" span={8}>
        {!loading && <Setting {...props} options={options} />}
        {loading && <>Loading..</>}
      </Col>
    </Row>
  )
}

interface IComponentSettings {
  component: string
  id: number
  name: string
  order: number
  props: any
  modalSettings?: any
  setMoveFrom?: any
  moveFrom?: any
}

function ComponentSettings({
  component,
  id,
  name,
  order,
  modalSettings,
  setMoveFrom,
  moveFrom,
  props = {},
  ...others
}: IComponentSettings) {
  const [settings, setSettings] = useState<any>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const { saveComponent, deleteComponent, addComponent } = usePageBuilder()

  const [properties, setProperties] = useState(props || {})

  const componentItem = componentRegistry[component]

  if (typeof componentItem === 'undefined') {
    return <>ComponentSettings: Invalid component</>
  }

  const settingsHandler = () => {
    if (typeof componentItem.settings === 'object') {
      setSettings(componentItem.settings)
    } else if (typeof componentItem.settings === 'function') {
      Promise.resolve(componentItem.settings()).then((result: any) => {
        setSettings(result?.settings || result)
      })
    }

    setShowSettings(true)
  }

  const doSave = () => {
    const { sub, children, ...saveProps } = properties
    saveComponent({
      id,
      props: saveProps,
    })
    setShowSettings(false)
  }

  const doSaveOrder = (order: any) => {
    saveComponent({
      id,
      order,
    })
  }

  const updateProperty = (name: string, value: any) => {
    setProperties({
      ...properties,
      [name]: value?.value ?? value,
    })
  }

  const doDelete = () => {
    deleteComponent({ id })
    setShowSettings(false)
  }

  const duplicateComponent = () => {
    addComponent({
      component,
      id,
      name,
      order: Number(order) + 1,
      props,
      parent_id: typeof others !== 'undefined' && others?.parent_id,
    })
    setShowSettings(false)
  }

  const doMove = () => {
    saveComponent({
      id: moveFrom,
      parent_id: id,
    })
    setMoveFrom(false)
  }

  if (moveFrom !== false) {
    if (moveFrom === id) {
      return (
        <Button
          variant="seconday"
          onClick={() => setMoveFrom(false)}
          tooltip="Cancel move"
          icon="cancel"
          compact
        />
      )
    }
    return (
      <Button
        className="btn-primary p-1 h-100"
        onClick={doMove}
        tooltip="Move to sit under this component"
        icon="move"
        compact
      />
    )
  }

  return (
    <Suspense fallback="...">
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'relative',
          gap: 4,
        }}
      >
        <span className="justify-self-end me-1">
          <input
            type="number"
            style={{ width: 35, borderRadius: 5, border: '1px solid #999' }}
            defaultValue={order}
            onBlur={({ target }) => doSaveOrder(target.value)}
          />
        </span>
        <Button
          onClick={settingsHandler}
          tooltip="Edit component settings"
          variant="info"
          compact
          icon="gears"
        />
        <Button
          onClick={() => setMoveFrom(id)}
          tooltip="Move this to sit under another component"
          variant="info"
          compact
          icon="move"
        />
        <Button
          onClick={duplicateComponent}
          tooltip="Duplicate this component"
          variant="info"
          compact
          icon="Copy"
        />
        <Button
          onClick={() => setShowMenu(!showMenu)}
          tooltip="Add a new component under this one"
          variant="success"
          compact
          icon="plus"
        />
        <ComponentMenu
          order={0}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          parent_id={id}
          hidden={!showMenu}
        />
        {modalSettings !== true && (
          <Drawer
            position="bottom"
            size={window.outerWidth < 600 ? 'full' : '75%'}
            padding={'sm'}
            styles={{
              drawer: { overflow: 'auto' },
            }}
            opened={showSettings}
            onClose={() => setShowSettings(false)}
            title={<h3>{name} settings</h3>}
          >
            {showSettings && (
              <div>
                <Group position="right" style={{ marginBottom: 10 }}>
                  {!(
                    typeof settings === 'undefined' || settings?.length === 0
                  ) && <Button icon="save" onClick={doSave} text="Save" />}
                  <Button
                    onClick={doDelete}
                    variant="danger"
                    icon="trash"
                    text="Delete"
                  />
                </Group>
                <Stack>
                  {settings &&
                    settings?.length &&
                    settings?.map((setting: any) => (
                      <SettingRow
                        id={id}
                        componentItems={component}
                        key={setting.name}
                        {...setting}
                        properties={properties}
                        updateProperty={updateProperty}
                      />
                    ))}
                </Stack>
                <Group position="right" style={{ marginTop: 10 }}>
                  {!(
                    typeof settings === 'undefined' || settings?.length === 0
                  ) && <Button icon="save" onClick={doSave} text="Save" />}
                  <Button
                    onClick={doDelete}
                    variant="danger"
                    icon="trash"
                    text="Delete"
                  />
                </Group>
              </div>
            )}
          </Drawer>
        )}
      </div>
    </Suspense>
  )
}

export default ComponentSettings
