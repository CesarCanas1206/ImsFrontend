import React, { useContext } from 'react'
import Group from '../../UI/Group/Group'
import Icon from '../../UI/Icon/Icon'
import DateUI from '../Date/Date'
import Time from '../Time/Time'
import FormContext from '../../../context/FormContext'

interface IDateTime {
  value?: any
  onChange?: any
  readOnly?: boolean
  minDate?: Date | string
  maxDate?: Date
}

function DateTime({ value, onChange, readOnly, minDate, maxDate }: IDateTime) {
  const { getValue } = useContext(FormContext)
  const [date, time] = String(value).split(' ')

  const dateHandler = ({ value }: any) => {
    const dateObj = new Date(value)

    value = [
      dateObj.getFullYear(),
      `0${dateObj.getMonth() + 1}`.slice(-2),
      dateObj.getDate(),
    ].join('-')

    const timeValue = getValue('allday') === 'Yes' ? '00:00' : time

    onChange({ value: `${value} ${timeValue}`.trim() })
  }

  const timeHandler = ({ value }: any) => {
    onChange({ value: `${date} ${value}`.trim() })
  }

  return (
    <Group>
      {readOnly && <Icon type="calendar" />}
      <DateUI
        onChange={dateHandler}
        value={date}
        readOnly={readOnly}
        minDate={minDate}
        maxDate={maxDate}
      />
      {(!getValue('allday') || getValue('allday') === 'No') && readOnly && (
        <Icon type="clock" />
      )}
      {(!getValue('allday') || getValue('allday') === 'No') && (
        <Time
          onChange={timeHandler}
          value={time}
          readOnly={readOnly}
          disabled={date === ''}
        />
      )}
    </Group>
  )
}

export default DateTime
