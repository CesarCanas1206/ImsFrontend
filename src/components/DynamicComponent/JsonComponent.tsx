import { Button, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Sortable from '../UI/Sortable/Sortable'
import Space from '../UI/Space/Space'
import JsonComponentItem from './JsonComponentItem'

interface IJsonComponent {
  compProperties: any
  name?: string
  value?: any
  updateProperty?: any
}

export function JsonComponent({
  compProperties,
  name,
  value,
  updateProperty,
}: IJsonComponent) {
  const [formatted, setFormatted] = useState(value)

  function onDragEnd(result: any) {
    //
  }

  // function onDragEnd(result: any) {
  //   if (!result.destination) {
  //     return
  //   }
  //   const newItems = [...items]
  //   const [removed] = newItems.splice(result.source.index, 1)
  //   newItems.splice(result.destination.index, 0, removed)
  //   setItems(newItems)
  // }

  useEffect(() => {
    setFormatted(typeof value === 'string' ? JSON.parse(value ?? '{}') : value)
  }, [value])

  const removeColumn = (index: number) => {
    const newValue = formatted.filter((_item: never, idx: number) => {
      return idx !== index
    })
    updateProperty(name, newValue)
  }

  const addColumn = (index: number) => {
    const newValue = [
      ...formatted.slice(0, index + 1),
      { name: '', key: '' },
      ...formatted.slice(index + 1),
    ]
    updateProperty(name, newValue)
  }

  const onBlurHandler = (prop: string, newvalue: any, index: number) => {
    const old = formatted[index]
    const updated = { ...old, [prop]: newvalue.trim() }
    const newValue = [...formatted]
    newValue[index] = updated
    updateProperty(name, newValue)
  }

  const updateThisProperty = (newValue: any) => {
    updateProperty(name, newValue)
  }

  const rows =
    formatted &&
    Object.values(formatted)
      ?.filter((item: any) => item !== null)
      ?.map((item: any, index: number) => (
        <tr key={item.name || item.key || index}>
          <td>
            <input
              type="text"
              className="form-control"
              onBlur={({ target }) =>
                onBlurHandler('name', target.value, index)
              }
              placeholder="Enter column name"
              defaultValue={item?.name}
            />
          </td>
          <td>
            <>
              <input
                type="text"
                className="form-control"
                onBlur={({ target }) =>
                  onBlurHandler('key', target.value, index)
                }
                placeholder="Enter column key"
                defaultValue={item?.key}
              />
              {/*
          {item.components?.length !== 0 &&
            item.components?.map((comp: any, idx: number) => (
              <Sortable
                id={`compsettings${index}`}
                onDragEnd={onDragEnd}
                key={idx}
              >
                <Space h="5px" />
                <JsonComponentItem
                  compProperties={{
                    ...compProperties,
                    index: [index, idx],
                  }}
                  index={idx}
                  key={idx}
                  item={comp}
                  modalSettings={true}
                  updateProperty={updateThisProperty}
                />
              </Sortable>
            ))} */}
              {item?.sub?.length !== 0 &&
                item?.sub?.map((comp: any, idx: number) => (
                  <Sortable
                    id={`compsettings${index}`}
                    onDragEnd={onDragEnd}
                    key={idx}
                  >
                    <Space h="5px" />
                    <JsonComponentItem
                      compProperties={{
                        ...compProperties,
                        index: [index, idx],
                      }}
                      index={idx}
                      key={idx}
                      item={comp}
                      modalSettings={true}
                      updateProperty={updateThisProperty}
                    />
                  </Sortable>
                ))}
            </>
          </td>
          <td>
            <div className="d-flex gap-1">
              <Button
                size="xs"
                compact
                className="btn-danger"
                onClick={() => removeColumn(index)}
              >
                Del
              </Button>
              <Button
                size="xs"
                compact
                className="btn-primary"
                onClick={() => addColumn(index)}
              >
                Add
              </Button>
            </div>
          </td>
        </tr>
      ))

  return (
    <Table>
      <thead>
        <tr>
          <th>Column name</th>
          <th>Key</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default JsonComponent
