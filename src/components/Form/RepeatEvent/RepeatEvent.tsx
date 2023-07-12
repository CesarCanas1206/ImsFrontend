import { useContext, useEffect } from 'react'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Select from '../Select/Select'
import { isEmpty } from '../../../utilities/strings'
import DateUI from '../Date/Date'
import Switch from '../../UI/Switch/Switch'
import Stack from '../../UI/Stack/Stack'
import RepeatEventDates from './RepeatEventDates'
import { daysOfWeek } from 'src/utilities/dates'

const patterns = [
  { value: 'daily', label: 'Daily' },
  { value: 'dayweekly', label: 'Same day/weekly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'fourweekly', label: 'Every 4 weeks' },
  // { value: 'monthly', label: 'Monthly' },
]

const times = Array(30)
  .fill(0)
  .map((_, i) => ({ value: String(i + 1), label: i + 1 }))

const days = daysOfWeek.map((day) => ({ value: day, label: day }))

function RepeatEvent({ onChange, locked }: any) {
  const { getValue } = useContext(FormContext)

  const changeHandler = ({ value, key }: any) => {
    onChange({ ref: key, value })
  }

  const values = {
    repeating: getValue('repeating'),
    day: getValue('day'),
    end_date: getValue('end_date'),
    pattern: getValue('pattern'),
    times: getValue('times'),
    exclude_dates: JSON.parse(getValue('exclude_dates') || '[]') ?? [],
  }

  useEffect(() => {
    if (locked && getValue('pattern') !== 'dayweekly') {
      changeHandler({ value: 'dayweekly', key: 'pattern' })
    }
  }, [])

  if (locked) {
    values.repeating = 'Yes'
    values.pattern = 'dayweekly'
  }

  return (
    <Stack>
      <Switch
        readOnly={locked}
        value={values.repeating}
        onChange={({ value }: any) =>
          changeHandler({ value, key: 'repeating' })
        }
      />
      {!isEmpty(values.repeating) && (
        <>
          <Stack>
            <Group spacing={'sm'}>
              <strong>Repeat pattern</strong>
              <Select
                readOnly={locked}
                data={patterns}
                value={values.pattern}
                onChange={({ value }: any) =>
                  changeHandler({ value, key: 'pattern' })
                }
              />
            </Group>
          </Stack>
          {values.pattern === 'dayweekly' && (
            <Stack>
              <Group spacing={'sm'}>
                <strong>Day</strong>
                <Select
                  data={days}
                  value={values.day}
                  onChange={({ value }: any) =>
                    changeHandler({ value, key: 'day' })
                  }
                />
              </Group>
            </Stack>
          )}
          {!locked && (
            <Group spacing={'sm'}>
              <Stack spacing={'sm'}>
                <strong>Number of times</strong>
                <Select
                  data={times}
                  value={values.times}
                  onChange={({ value }: any) => {
                    changeHandler({ value: '', key: 'end_date' })
                    changeHandler({ value: String(value), key: 'times' })
                  }}
                />
              </Stack>
              <Stack spacing={'sm'}>
                <strong>Or until End date</strong>
                <DateUI
                  value={values.end_date}
                  onChange={({ value }: any) => {
                    changeHandler({ value: '', key: 'times' })
                    changeHandler({ value, key: 'end_date' })
                  }}
                />
              </Stack>
            </Group>
          )}
          <RepeatEventDates getValue={getValue} changeHandler={changeHandler} />
        </>
      )}
    </Stack>
  )
}

export default RepeatEvent
