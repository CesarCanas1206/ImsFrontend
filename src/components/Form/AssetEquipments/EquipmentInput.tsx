import { Table } from '@mantine/core'
import React from 'react'
import Group from 'src/components/UI/Group/Group'
import { getAsArray, isEmpty, uuid } from 'src/utilities/strings'
import Button from '../Button/Button'
import Input from '../Input/Input'

interface IEquipmentInput {
  value?: any
  onChange?: any
}

function EquipmentInput({ value, onChange }: IEquipmentInput) {

  const addHandler = () => {
    if (Array.isArray(value) && value.length === 5) {
      return
    }

    const newValue = { id: uuid(), name: '', value: 'No' }
    let newValues = [newValue]
    if (!isEmpty(value)) {
      newValues = getAsArray(value)
      newValues = [...newValues, newValue]
    }

    onChange({
      value: newValues,
    })
  }

  const removeHandler = (index: number) => {
    const newValues = value.filter((item: any, idx: number) => index !== idx)
    onChange({
      value: newValues,
    })
  }

  const changeHandler = (newValue: any, name: string, index: number) => {
    const newValues = value.map((item: any, idx: number) =>
      index === idx ? { ...item, [name]: newValue } : item,
    )
    onChange({
      value: newValues,
    })
  }

  return (
    <div>
      <Button onClick={addHandler} icon="plus" text="Add" />
      <Table>
        <tbody>
          {typeof value.map !== 'undefined' &&
            value.map((item: any, idx: number) => {
              return (
                <tr key={idx}>
                  <td style={{ borderTop: "none" }}>
                    <Group >
                      <Input
                        style={{ flexGrow: 1 }}
                        value={item.name}
                        onChange={({ value }: any) =>
                          changeHandler(value, 'name', idx)
                        }
                      />
                      <Button
                        variant="danger"
                        icon='delete'
                        compact
                        onClick={() => removeHandler(idx)}
                      />
                    </Group>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default EquipmentInput
