import React, { useMemo, useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import FormatDate from '../../Function/FormatDate/FormatDate'
import FormatTime from '../../Function/FormatTime/FormatTime'
import Card from '../../UI/Card/Card'
import Icon from '../../UI/Icon/Icon'
import { useQuery } from 'react-query'
import { uniqueValues } from '../../../utilities/objects'
import useAssets from '../../../hooks/useAssets'
import Accordion from '../../UI/Accordion/Accordion'
import Group from '../../UI/Group/Group'
import Badge from '../../UI/Badge/Badge'
import Stack from '../../UI/Stack/Stack'

const getDaysArray = function (s: any, e: any) {
  for (
    var a = [], d = new Date(s);
    d <= new Date(e);
    d.setDate(d.getDate() + 1)
  ) {
    a.push(new Date(d))
  }
  return a
}

function BookingDates({
  start = '2023-06-01',
  end = '2023-06-30',
  applicationId,
}: any) {
  const { get } = useAPI()

  const { data: usage, isLoading } = useQuery({
    queryKey: ['usage', 'dates', applicationId],
    queryFn: async () =>
      await get({
        endpoint: `usage?parent_id=${applicationId}`,
      }),
  })

  const {
    data: assets,
    refetch,
    isLoading: assetLoading,
  } = useAssets({ bookable: true, queryKey: ['assets', 'full'] })

  const t = getDaysArray(new Date(start), new Date(end))
  const [dateList] = useState(
    t.map((v: any) => ({
      date: v.toISOString().slice(0, 10),
      day: v.toLocaleDateString('en-au', { weekday: 'long' }),
    })),
  )

  if (isLoading || assetLoading) {
    return <Card>Loading list</Card>
  }

  if (!isLoading && !usage?.length) {
    return <Card>No venue usage has been added</Card>
  }

  return (
    <Accordion
      values={usage?.map((item: any) => item?.id)}
      labels={usage?.map((item: any) =>
        assets
          .filter((f: any) => f.id === item?.asset_id)
          ?.map((a: any) => a.label)
          .filter(uniqueValues)
          .join(', '),
      )}
      items={usage?.map((item: any) => (
        <>
          {' '}
          {dateList.map(({ date, day }: any) => {
            if (item.day !== day) {
              return null
            }
            return (
              <Card key={date} style={{ marginBottom: 10 }}>
                <div>
                  <Icon type="calendar" style={{ marginRight: 10 }} />
                  <FormatDate text={date} /> <small>({day})</small>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div>
                    <Icon type="clock" /> <FormatTime text={item?.start} /> -{' '}
                    <FormatTime text={item?.end} />
                  </div>
                  <div>{item?.activity}</div>
                  <div>{item?.shared ? 'Shared' : 'Not shared'}</div>
                </div>
              </Card>
            )
          })}
        </>
      ))}
    />
  )
}

export default BookingDates
