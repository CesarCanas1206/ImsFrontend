import React, { useState } from 'react'
import Heading from '../Heading/Heading'
import Stack from '../Stack/Stack'
import Group from '../Group/Group'
import Card from 'src/components/UI/Card/Card'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import Badge from '../Badge/Badge'
import ItemStatus from '../ItemStatus/ItemStatus'
import BookingButtons from './BookingButtons'
import FormatTime from 'src/components/Function/FormatTime/FormatTime'
import Button from 'src/components/Form/Button/Button'
import { isEmpty } from 'src/utilities/strings'

function BookingListAdmin({ row: application }: any) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Group position="apart">
        <Stack>
          <Group>
            <Badge color="dark">
              Application ID: {application.application_id}
            </Badge>
            <Heading>{application.hirer?.name}</Heading>
            {typeof application?.user !== 'undefined' && (
              <Badge color="dark">
                C: {application?.user?.name} - E: {application?.user?.email}
              </Badge>
            )}
          </Group>
          <Group position="start">{application.name}</Group>
          <Group position="start">
            <Badge>
              Submitted:{' '}
              <FormatDate
                date={application.created_at}
                format="D MMMM YYYY - h:mm A"
              />
            </Badge>
            {!isEmpty(application?.reference) && (
              <Badge>{application.reference}</Badge>
            )}
            {isEmpty(application?.paid) && (
              <Badge color="orange">Not paid</Badge>
            )}
            {!isEmpty(application?.paid) && <Badge color="green">Paid</Badge>}
            <Badge>
              Bookings {application.usage?.length ?? 0}{' '}
              {application.usage?.length > 0 && (
                <Button
                  variant="info"
                  onClick={() => setExpanded(!expanded)}
                  tooltip="Toggle booking details"
                  compact
                  style={{ height: 15, padding: 0 }}
                  icon={expanded ? 'Down' : 'Right'}
                />
              )}
            </Badge>
          </Group>
        </Stack>
        <Group position="right">
          <ItemStatus row={application} />
          <BookingButtons booking={application} />
        </Group>
      </Group>
      {expanded && (
        <Stack mt={10}>
          {typeof application.usage !== 'undefined' &&
            application?.usage?.map((booking: any) => {
              const assetName = [
                booking?.asset?.parent?.name,
                booking?.asset?.name,
              ]
                .filter((item: any) => item)
                .join(' - ')

              return (
                <Card
                  shadow="xs"
                  radius="md"
                  p="sm"
                  key={booking.id}
                  style={{ alignSelf: 'stretch', minWidth: '100%' }}
                >
                  <Group
                    position="apart"
                    style={{ margin: 0, marginBottom: 2 }}
                  >
                    <Group>
                      <Heading size="h6">{assetName}</Heading>
                      <Badge>{booking.title}</Badge>
                      <Badge>
                        Date/Time:{' '}
                        <FormatDate date={booking.date} format="D MMMM YYYY" />
                        {' - '}
                        <FormatTime date={booking.start} format="h:mmA" />
                        {' to '}
                        <FormatTime date={booking.end} format="h:mmA" />
                      </Badge>
                    </Group>
                  </Group>
                </Card>
              )
            })}
        </Stack>
      )}
    </>
  )
}

export default BookingListAdmin
