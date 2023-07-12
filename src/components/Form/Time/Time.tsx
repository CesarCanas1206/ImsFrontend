import Select from '../Select/Select'
import Icon from '../../UI/Icon/Icon'
import {
  formatTime,
  getTimeArray,
  timeToDecimal,
} from '../../../utilities/dates'

interface TimeProps {
  value?: string
  onChange?: any
  min?: number | string
  max?: number | string
  increment?: number | string
  readOnly?: boolean | string
  disabled?: boolean
}

function Time({
  value,
  onChange,
  min = '00:00',
  max = '23:00',
  readOnly,
  increment = 15,
  disabled = false,
}: TimeProps) {
  value = String(value)
    .replace(/([0-9]+:[0-9]+)(:[0-9]+)?.*/, '$1')
    .trim()

  if (readOnly) {
    return <>{value !== '' && formatTime(value)}</>
  }

  const data = getTimeArray(
    timeToDecimal(min),
    timeToDecimal(max),
    increment,
  ).map((time: any) => ({
    label: formatTime(time),
    value: time,
  }))

  return (
    <Select
      value={String(value).replace('24:', '00:')}
      onChange={onChange}
      data={data}
      icon={<Icon type="clock" />}
      style={{ maxWidth: 140 }}
      disabled={disabled}
    />
  )
}

export default Time
