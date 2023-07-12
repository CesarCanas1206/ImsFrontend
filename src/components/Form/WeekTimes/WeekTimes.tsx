import React, { useCallback } from 'react'
import Button from '../Button/Button'
import Time from '../Time/Time'

function WeekTimes({ onChange, value, readOnly }: any) {
  const defaultHandler = useCallback(() => {
    onChange({
      value: [
        { type: 'Mon-Thurs', start: '08:00', end: '23:00' },
        { type: 'Friday', start: '08:00', end: '23:00' },
        { type: 'Saturday', start: '08:00', end: '23:00' },
        { type: 'Sunday', start: '08:00', end: '23:00' },
      ],
    })
  }, [])

  const changeHandler = ({ field, value: changedValue, index }: any) => {
    const formatted = [
      ...value.map((item: any, idx: number) =>
        idx === index ? { ...item, [field]: changedValue } : item,
      ),
    ]
    if (onChange) {
      onChange({ value: formatted })
    }
  }

  return (
    <div>
      {!readOnly && (
        <Button
          onClick={defaultHandler}
          text="Reset bookable hours"
          icon="clock"
        />
      )}
      <table style={{ width: '100%' }}>
        <tbody>
          {typeof value.map !== 'undefined' &&
            value?.map((item: any, index: number) => {
              return (
                <tr key={item.type}>
                  <td style={{ width: '35%' }}>{item.type}</td>
                  <td>
                    <Time
                      value={item.start}
                      onChange={({ value }: any) =>
                        changeHandler({ field: 'start', index, value })
                      }
                    />
                  </td>
                  <td>-</td>
                  <td>
                    <Time
                      value={item.end}
                      onChange={({ value }: any) =>
                        changeHandler({ field: 'end', index, value })
                      }
                    />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default WeekTimes
