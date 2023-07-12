import { Flex, Table } from '@mantine/core'
import React from 'react'
import { useQuery } from 'react-query'
import Switch from 'src/components/UI/Switch/Switch'
import Text from 'src/components/UI/Text/Text'
import useAPI from 'src/hooks/useAPI'
import { isEmpty } from 'src/utilities/strings'

interface IEquipmentSwitch {
  value?: any
  onChange?: any
  parent_id?: any
}

function EquipmentSwitch({ value, onChange, parent_id }: IEquipmentSwitch) {
  let items: any = []
  if (!isEmpty(parent_id)) {
    const { get } = useAPI()
    const { data, isLoading } = useQuery({
      queryKey: ['equipments', parent_id],
      queryFn: async () =>
        await get({ endpoint: `asset-equipments/${parent_id}` }),
    })

    if (isLoading) {
      return <>Loading items</>
    }

    if (isEmpty(value) || typeof value.find === 'undefined') {
      items = data
    } else {
      if (typeof data.map !== 'undefined') {
        data.map((parentItem: any) => {
          const newItem = value.find((item: any) => { return item.id === parentItem.id })
          if (newItem) {
            items.push(newItem)
          } else {
            items.push(parentItem)
          }
        })
      }
    }
  }

  const changeHandler = (newValue: any, name: string, index: number) => {
    const newValues = items.map((item: any, idx: number) =>
      index === idx ? { ...item, [name]: newValue } : item,
    )
    onChange({
      value: newValues,
    })
  }

  return (
    <div>
      {items && Array.isArray(items) && items.length > 0 ?
        <Table>
          <tbody>
            {typeof items.map !== 'undefined' &&
              items.map((item: any, idx: number) => {
                return (
                  <tr key={idx}>
                    <td style={{ borderTop: "none" }}>
                      <Flex style={{ alignItems: 'center' }}>
                        <Flex style={{ flex: 2 }}>
                          <Text>{item.name}</Text>
                        </Flex>
                        <Flex style={{ flex: 3, marginLeft: 10 }}>
                          <Switch
                            value={item.value}
                            onChange={({ value }: any) =>
                              changeHandler(value, 'value', idx)
                            }
                          />
                        </Flex>
                      </Flex>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        :
        <Text>No item</Text>}
    </div>
  )
}

export default EquipmentSwitch
