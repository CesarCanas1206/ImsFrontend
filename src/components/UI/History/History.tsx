import { Slider } from '@mantine/core'
import React, { useCallback, useState } from 'react'
import Form from '../../Form/Form/Form'
import useAPI from '../../../hooks/useAPI'
import Space from '../Space/Space'
import Stack from '../Stack/Stack'
import SimpleGrid from '../SimpleGrid/SimpleGrid'
import { useQuery } from 'react-query'
import Icon from '../Icon/Icon'
import Checkbox from '../../Form/Checkbox/Checkbox'
import dayjs from 'dayjs'
import Tooltip from '../Tooltip/Tooltip'
import { Heading } from '../Heading/Heading'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay'
import { useParams } from 'react-router-dom'
import LoaderContent from '../LoaderContent/LoaderContent'
import { getYMD } from '../../../utilities/dates'

const HistorySlider = ({ marks, value, onChange }: any) => {
  return (
    <div style={{ marginLeft: 40, marginRight: 40 }}>
      <Slider
        color="violet"
        thumbChildren={<Icon type="calendar" me={0} ms={0} fontSize={'sm'} />}
        thumbSize={30}
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
        size="xl"
        label={(val: any) =>
          marks?.find((mark: any) => mark.value === val)?.labelLg
        }
        marks={marks}
        max={marks?.length - 1}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const formatChangeValue = (value: string | boolean) => {
  if (String(value) === 'true') {
    return 'Yes'
  }
  if (String(value) === 'false') {
    return 'No'
  }
  return value
}

const formatNotes = (values: any, date: any) => {
  return typeof values !== 'undefined'
    ? Object.fromEntries(
        Object.values(values)
          .filter((item: any) => getYMD(item.created_at) === getYMD(date))
          .flatMap((item: any) => [
            [
              item.reference,
              <Tooltip
                key={item.reference}
                label={
                  <>
                    Field changed to: {formatChangeValue(item.value?.to ?? '')}
                    <div>
                      <small>
                        {dayjs(item.created_at).format('D/M/YY')} by{' '}
                        {item.created_by_name}
                      </small>
                    </div>
                  </>
                }
              >
                <span>
                  <Icon style={{ color: 'orange' }} type="comment" />
                </span>
              </Tooltip>,
            ],
          ]),
      )
    : {}
}

function HistoryItem({ dates, itemId, formId }: any) {
  const { get } = useAPI()
  const [dateIndex, setDateIndex] = useState(dates.length - 1)

  const marks = dates.map((item: any, index: number) => ({
    value: index,
    label: dayjs(item).format('D/MM/YY'),
    labelLg: dayjs(item).format('D MMMM YYYY'),
    date: getYMD(item),
  }))

  const date = marks[dateIndex]?.date ?? ''

  const { data: values, isLoading: loading } = useQuery(
    ['history', itemId, date],
    async () => get({ endpoint: `history/${itemId}?date=${getYMD(date)}` }),
    {
      staleTime: 5 * 60 * 1000,
    },
  )

  const defaultValues =
    typeof values !== 'undefined'
      ? Object.fromEntries(
          Object.values(values).flatMap((item: any) => [
            [item.reference, item.value?.to ?? ''],
          ]),
        )
      : {}

  const valueNotes = formatNotes(values, date)
  // const changes = Object.keys(valueNotes).length

  const historyDateHandler = useCallback(
    (value: any) => setDateIndex(value),
    [],
  )

  return (
    <Stack>
      <Heading>
        {dayjs(date).format('D MMMM YYYY')}
        {/* <>({changes} change{changes !== 1 && 's'})</> */}
      </Heading>
      <HistorySlider
        marks={marks}
        value={dateIndex}
        onChange={historyDateHandler}
      />
      <Space h={'sm'} />
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <Form
          key={`${dateIndex}${loading}`}
          itemId="new"
          formId={formId}
          readOnly
          defaultValues={defaultValues}
          valueNotes={valueNotes}
        />
      </div>
      <Space h="sm" />
    </Stack>
  )
}

interface IHistory {
  itemId?: string
  formId?: string
}

function History({
  itemId = 'club1',
  formId = 'hirer',
  withCompare = false,
}: IHistory) {
  const { get } = useAPI()
  const params = useParams<any>()
  if (typeof params.history_id !== 'undefined') {
    itemId = params.history_id
  }
  if (typeof params.history_form_id !== 'undefined') {
    formId = params.history_form_id
  }

  const [compare, setCompare] = useState(false)
  const dates = useQuery(
    ['dates', itemId],
    async () => await get({ endpoint: `history/${itemId}/dates` }),
    { select: (data: any) => data.reverse() },
  )

  if (dates.isLoading) {
    return <LoaderContent justContent />
  }

  if (dates.data.length === 0) {
    return <>No historical data available</>
  }

  const historyProps = {
    dates: dates.data,
    itemId,
    formId,
  }

  return (
    <>
      {withCompare && (
        <>
          <Checkbox
            label="Compare"
            value={compare}
            onChange={({ value }: any) => setCompare(Boolean(value))}
          />
          <Space h={'sm'} />
        </>
      )}
      <SimpleGrid cols={compare ? 2 : 1}>
        <HistoryItem key={'a'} {...historyProps} />
        {compare && <HistoryItem key={'b'} {...historyProps} />}
      </SimpleGrid>
    </>
  )
}

export default History
