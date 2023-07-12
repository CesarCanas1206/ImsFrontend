import { Table } from '@mantine/core'
import React from 'react'
import Group from 'src/components/UI/Group/Group'
import useCalculate from '../../../hooks/useCalculate'
import Button from '../Button/Button'

interface ICostItems {
  value?: any
  onChange?: any
}

function CostItems({ value, onChange }: ICostItems) {
  const { calculateTotal } = useCalculate()

  let total: number = 0
  const updateTotal = (newValues: any) => {
    total = 0
    if (typeof newValues.map !== 'undefined') {
      newValues.map((item: any) => {
        const subTotal = calculateTotal(item.qty, item.price)
        total += Number(subTotal)
      })
    }
    return total
  }

  updateTotal(value)

  const addHandler = () => {
    onChange({
      value: [
        ...(value ?? []),
        {
          desc: 'New item',
          qty: 1,
          price: 0,
        },
      ],
    })
  }

  const removeHandler = (index: number) => {
    const newValues = value.filter((item: any, idx: number) => index !== idx)
    onChange({
      value: newValues,
    })
    onChange({
      value: updateTotal(newValues),
      ref: 'total',
    })
  }

  const changeHandler = (newValue: any, name: string, index: number) => {
    const newValues = value.map((item: any, idx: number) =>
      index === idx ? { ...item, [name]: newValue } : item,
    )
    onChange({
      value: newValues,
    })
    if (name !== 'desc') {
      onChange({
        value: updateTotal(newValues),
        ref: 'total',
      })
    }
  }

  return (
    <div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Description</th>
            <th align="center">Qty</th>
            <th align="right">Price</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {typeof value.map !== 'undefined' &&
            value.map((item: any, idx: number) => {
              const subTotal = calculateTotal(item.qty, item.price)
              return (
                <tr key={item.desc + idx}>
                  <td>
                    <Group>
                      <Button
                        variant="danger"
                        text="-"
                        compact
                        onClick={() => removeHandler(idx)}
                      />
                      <input
                        type="input"
                        value={item.desc}
                        onChange={(e) =>
                          changeHandler(e.target.value, 'desc', idx)
                        }
                      />
                    </Group>
                  </td>
                  <td align="center">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        changeHandler(e.target.value, 'qty', idx)
                      }
                      style={{ width: 60 }}
                    />
                  </td>
                  <td align="right">
                    $
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        changeHandler(e.target.value, 'price', idx)
                      }
                      style={{ width: 60 }}
                    />
                  </td>
                  <td align="right">${subTotal}</td>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} align="right">
              <h6>Total: ${total}</h6>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button onClick={addHandler} icon="plus" text="Add" />
    </div>
  )
}

export default CostItems
