import React, { useContext, useState } from 'react'
import Group from '../../UI/Group/Group'
import Stack from '../../UI/Stack/Stack'
import DataGridContext from '../../../context/DataGridContext'
import useAPI from '../../../hooks/useAPI'
import { isEmpty } from '../../../utilities/strings'
import { daysOfWeek } from '../../../utilities/dates'
import ModalButton from '../../UI/ModalButton/ModalButton'
import AssetSelector from '../AssetSelector/AssetSelector'
import Button from '../Button/Button'
import Input from '../Input/Input'
import TimeRange from '../TimeRange/TimeRange'
import Checkbox from '../Checkbox/Checkbox'

const days = daysOfWeek

function AddMultipleUsage({
  formId = 'usage',
  text = 'Add multiple',
  icon = 'Plus',
  defaultValues = {},
}: any) {
  const [assetId, setAssetId] = useState(null)
  const { post } = useAPI()
  const { reloadTable } = useContext(DataGridContext)

  const [values, setValues] = useState(
    Object.fromEntries(
      days.map((day: any) => [day, { day, start: '', end: '' }]),
    ),
  )

  const saveHandler = async (onClose: any) => {
    await Promise.all(
      Object.values(values)
        .filter((data: any) => !isEmpty(data.start) && !isEmpty(data.end))
        .map((data: any) =>
          post({
            endpoint: 'usage',
            data: { ...data, ...defaultValues, asset_id: assetId },
          }),
        ),
    )
    if (typeof reloadTable !== 'undefined') {
      reloadTable()
    }
    setValues({})
    onClose()
  }

  const changeHandler = (day: any, send: any) => {
    setValues((prev: any) => ({
      ...prev,
      [day]: { ...prev[day], ...send.values, [send.ref]: send.value },
    }))
  }

  return (
    <ModalButton text={text} icon={icon}>
      {({ onClose }: any) => (
        <>
          <Stack>
            <Group align="flex-start" spacing={'md'}>
              <strong>Venue</strong>
              <AssetSelector
                bookable
                value={assetId}
                onChange={({ value }: any) => setAssetId(value)}
                style={{ flexGrow: 1 }}
              />
            </Group>
            {days.map((day: any) => (
              <>
                <hr />
                <Group spacing={'md'}>
                  <strong>{day}</strong>
                  <Stack>
                    <Group>
                      Start/End
                      <TimeRange
                        start={values[day].start}
                        end={values[day].end}
                        onChange={(send: any) => changeHandler(day, send)}
                      />
                    </Group>
                    <Group>
                      Activities
                      <Input
                        value={values[day].activity}
                        onChange={({ value }: any) =>
                          changeHandler(day, { ref: 'activity', value })
                        }
                        style={{ flexGrow: 1 }}
                        suggestions={['Training', 'Match', 'Meeting']}
                        placeholder={'E.g. Training, Match, Meeting'}
                      />
                    </Group>
                    <Group>
                      Shared
                      <Checkbox
                        value={values[day].shared}
                        onChange={({ value }: any) =>
                          changeHandler(day, { ref: 'shared', value })
                        }
                      />
                    </Group>
                  </Stack>
                </Group>
              </>
            ))}
          </Stack>
          <Group position="right">
            <Button
              icon="Save"
              text="Create"
              onClick={() => saveHandler(onClose)}
            />
          </Group>
        </>
      )}
    </ModalButton>
  )
}

export default AddMultipleUsage
