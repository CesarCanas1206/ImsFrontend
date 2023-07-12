import { useCallback, useEffect, useState, useRef } from 'react'
import {
  DatePickerInput,
  DatePickerInputProps,
  DatesRangeValue,
} from '@mantine/dates'
import Icon from 'src/components/UI/Icon/Icon'
import dayjs from 'dayjs'

interface DatePickerProps
  extends Omit<DatePickerInputProps<'range'>, 'onChange'> {
  onChange: (value: DatesRangeValue) => void
  value: DatesRangeValue
}

export function RangeDate({
  value: propValue,
  onChange,
  minDate,
  maxDate,
  ...props
}: DatePickerProps) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  const handleChange = useCallback((dateValue: DatesRangeValue) => {
    setValue(dateValue)
    onChange(dateValue)
  }, [])

  useEffect(() => {
    if (propValue) {
      setValue(propValue)
    }
  }, [propValue])

  minDate = minDate
    ? minDate === 'today'
      ? new Date()
      : dayjs(new Date(minDate)).toDate()
    : minDate
  maxDate = maxDate ? dayjs(new Date(maxDate)).toDate() : maxDate

  return (
    <DatePickerInput
      type="range"
      value={value}
      onChange={handleChange}
      mx="auto"
      minDate={minDate}
      maxDate={maxDate}
      {...props}
      rightSection={<Icon type="calendar" style={{ fontSize: 14 }} />}
      allowSingleDateInRange
    />
  )
}
