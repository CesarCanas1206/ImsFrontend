import { isEmpty } from '../../../utilities/strings'
import { timeToDecimal } from '../../../utilities/dates'
import Time from '../../Form/Time/Time'
import Group from '../../UI/Group/Group'
import { useContext } from 'react'
import FormContext from '../../../context/FormContext'

function TimeRange({ start, end, onChange, readOnly, assetTimes }: any) {
  const { getValue } = useContext(FormContext)

  if (!start) {
    start = getValue('start')
  }
  if (!end) {
    end = getValue('end')
  }

  const changeHandler = ({ name, value }: any) => {
    if (
      name === 'start' &&
      (isEmpty(end) || timeToDecimal(value) > timeToDecimal(end))
    ) {
      onChange({ values: { end: value }, ref: name, value })
      return
    } else if (
      name === 'end' &&
      (isEmpty(start) || timeToDecimal(start) > timeToDecimal(value))
    ) {
      onChange({ values: { start: value }, ref: name, value })
      return
    }
    onChange({ ref: name, value })
  }

  return (
    <Group>
      <Time
        key={'start'}
        min={assetTimes?.start}
        max={assetTimes?.end}
        value={start}
        onChange={(e: any) => changeHandler({ name: 'start', value: e.value })}
        readOnly={readOnly}
      />
      {' - '}
      <Time
        key={'end'}
        min={start || assetTimes?.start}
        max={assetTimes?.end}
        value={end}
        onChange={(e: any) => changeHandler({ name: 'end', value: e.value })}
        readOnly={readOnly}
      />
    </Group>
  )
}

export default TimeRange
