import { DateInput } from '@mantine/dates'
import FormatDate from '../../Function/FormatDate/FormatDate'
import Icon from '../../UI/Icon/Icon'
import dayjs from 'dayjs'
import { getYMD } from '../../../utilities/dates'

export function DateUI({
  onChange,
  readOnly,
  value,
  type,
  minDate,
  maxDate,
  size,
  ...props
}: any) {
  const changeHandler = (val: any) => {
    if (typeof onChange !== 'undefined') {
      val = val ?? new Date()
      onChange({ name: props?.name, value: dayjs(val).format('YYYY-MM-DD') })
    }
  }
  let showValue = value
  if (value && value !== '' && typeof value === 'string') {
    showValue = new Date(getYMD(value))
  }
  minDate = minDate
    ? minDate === 'today'
      ? new Date()
      : dayjs(new Date(minDate)).toDate()
    : undefined
  maxDate = maxDate ? dayjs(new Date(maxDate)).toDate() : undefined

  if (readOnly) {
    return (
      <>
        {typeof showValue !== 'undefined' && showValue !== '' && (
          <FormatDate date={showValue} format="MM/DD/YY" />
        )}
      </>
    )
  }

  return (
    <DateInput
      icon={<Icon type="calendar" />}
      valueFormat="DD MMM, YYYY"
      onChange={changeHandler}
      value={showValue}
      radius="md"
      minDate={minDate}
      maxDate={maxDate}
      size={size}
      styles={{
        input: {
          backgroundColor: 'var(--c-input-bg, #ffffff)',
          color: 'var(--c-input, #000000)',
        },
      }}
      style={{ maxWidth: 200, zIndex: 10 }}
      popoverProps={{ withinPortal: true }}
      {...props}
    />
  )
}

export default DateUI
