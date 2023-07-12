import Group from '../../UI/Group/Group'
import Stack from '../../UI/Stack/Stack'
import { datesFromPattern, formatDate } from 'src/utilities/dates'
import DatePicker from '../DatePicker/DatePicker'
import ModalButton from 'src/components/UI/ModalButton/ModalButton'
import SimpleGrid from 'src/components/UI/SimpleGrid/SimpleGrid'
import Button from '../Button/Button'
import { pluralise } from 'src/utilities/strings'

function RepeatEventDates({ getValue, changeHandler }: any) {
  if (!getValue('date')) {
    return <>Please select a date</>
  }

  const exclude_dates = JSON.parse(getValue('exclude_dates') || '[]') ?? []
  const dates = datesFromPattern({
    pattern: getValue('pattern'),
    date: getValue('date'),
    end: getValue('end_date'),
    day: getValue('day'),
    times: getValue('times'),
    exclude: exclude_dates,
  })

  return (
    <ModalButton
      text={dates.length + ' ' + pluralise('date', dates.length)}
      icon="Event"
    >
      <SimpleGrid cols={2}>
        <Stack
          justify="start"
          style={{ borderRight: '1px solid #eaeaea' }}
          spacing={'sm'}
        >
          <h3>Dates ({dates.length})</h3>
          <small>
            Dates for this booking based on the selected date and either the end
            date or number of times
          </small>
          {dates.map((date: any) => (
            <Group key={date}>
              <Button
                variant="secondary"
                icon="Cancel"
                tooltip="Exclude this date"
                compact
                onClick={() =>
                  changeHandler({
                    value: JSON.stringify([...exclude_dates, date]),
                    key: 'exclude_dates',
                  })
                }
              />
              {formatDate(date, 'D MMMM YYYY (dddd)')}
            </Group>
          ))}
        </Stack>
        <Stack justify="start" align="start" spacing={'sm'}>
          <h3>Excluded dates ({exclude_dates.length})</h3>
          <small>
            Select a date on the calendar to remove from the dates list
          </small>
          <DatePicker
            type="multiple"
            allowDeselect
            value={exclude_dates}
            onChange={(value: any) =>
              changeHandler({
                value: JSON.stringify(value),
                key: 'exclude_dates',
              })
            }
          />
          {exclude_dates.map((date: any) => (
            <Group key={date}>
              <Button
                variant="secondary"
                icon="Redo"
                tooltip="Restore this date"
                compact
                onClick={() =>
                  changeHandler({
                    value: JSON.stringify(
                      exclude_dates.filter((d: string) => d !== date),
                    ),
                    key: 'exclude_dates',
                  })
                }
              />
              {formatDate(date, 'D MMMM YYYY (dddd)')}
            </Group>
          ))}
        </Stack>
      </SimpleGrid>
    </ModalButton>
  )
}

export default RepeatEventDates
