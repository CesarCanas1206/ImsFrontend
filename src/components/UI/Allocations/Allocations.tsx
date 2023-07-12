import { useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'
import FormatDate from '../../Function/FormatDate/FormatDate'
import Group from '../Group/Group'
import ModalButton from '../ModalButton/ModalButton'
import Stack from '../Stack/Stack'
import Badge from '../Badge/Badge'
import LoaderContent from '../LoaderContent/LoaderContent'
import DataGrid from '../DataGrid/DataGrid'
import { useQuery } from 'react-query'
import ApplicationStatus from './ApplicationStatus'
import ApplicationButtons from './ApplicationButtons'
import Form from '../../Form/Form/Form'

function Allocations() {
  const { get } = useAPI()
  const [filter, setFilter] = useState<string>(
    window.location.hash?.replace('#', '') ?? '',
  )

  const { data: seasons, isLoading } = useQuery(
    ['seasons', 'allocations'],
    async () => await get({ endpoint: 'd/season?name=!empty' }),
  )

  if (isLoading) {
    return <LoaderContent />
  }

  const season: any =
    window.location.hash.replace('#', '') === ''
      ? seasons[0]
      : seasons.find(
          (season: any) => season.id === window.location.hash.replace('#', ''),
        )

  return (
    <DataGrid
      key={season?.id}
      endpoint={'hirer?with=allocation&hirer_type_id=[' + season?.hirer_type_id}
      columns={[
        { name: 'Name', key: 'name' },
        {
          name: 'Application ID',
          key: 'applicationid',
          badge: true,
          title: true,
          badgeColor: 'dark',
          element: (row: any) => {
            const allocation =
              typeof row?.allocation !== 'undefined'
                ? row?.allocation
                    ?.filter(
                      (item: any) =>
                        !season?.id || item.season_id === season?.id,
                    )
                    ?.pop() ?? {}
                : {}
            return allocation?.application_id ?? ''
          },
        },
        {
          name: 'Status',
          key: 'status',
          title: false,
          element: (row: any) => (
            <ApplicationStatus hirer={row} seasonId={season?.id} />
          ),
        },
        {
          name: 'Actions',
          key: 'actions',
          element: (row: any) => (
            <ApplicationButtons
              hirer={row}
              season={season}
              seasonId={season?.id}
            />
          ),
        },
      ]}
      sorting={[
        { name: 'Hirer (A-Z)', key: 'name' },
        { name: 'Hirer (Z-A)', key: 'name,desc' },
      ]}
      no_results={[
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No hirers added for ' + season?.name,
        },
      ]}
      titleSub={[
        <Group key="add-button">
          <Button
            text="Booking calendar"
            icon="calendar"
            variant="primary"
            inMenu={true}
            link="/calendar"
          />
          <Button
            text="Venue closures"
            icon="cancel"
            variant="danger"
            inMenu={true}
            link="/admin/closures"
          />
          <Button
            variant="primary"
            link="/clashes"
            text="Clashes"
            inMenu={true}
            icon="Clash"
          />
          <ModalButton
            key="add"
            icon="Plus"
            text="Add new hirer"
            tooltip="Add new hirer (defaults to current season)"
          >
            <Form
              formId="hirer"
              defaultValues={{ hirer_type_id: [season?.hirer_type_id] }}
            />
          </ModalButton>
        </Group>,
      ]}
      children={
        typeof season !== 'undefined' && (
          <ModalButton
            tooltip="Press to change"
            style={{ height: 'auto', padding: 20 }}
            text={
              <Stack>
                <Group>
                  {season.name}{' '}
                  <Badge color={season?.status === 'Closed' ? 'red' : 'green'}>
                    {season.status}
                  </Badge>
                </Group>
                <div>
                  <small>
                    <FormatDate date={season.start} /> to{' '}
                    <FormatDate date={season.end} />
                  </small>
                </div>
              </Stack>
            }
          >
            {({ onClose }: any) => (
              <Stack>
                {seasons?.map((season: any) => (
                  <Button
                    key={season.id}
                    fullWidth
                    style={{ height: 'auto', padding: 20, textAlign: 'left' }}
                    onClick={() => {
                      window.location.hash = season.id
                      onClose()
                    }}
                    text={
                      <Stack align="stretch">
                        <Group>
                          {season.name}{' '}
                          <Badge
                            color={
                              season?.status === 'Closed' ? 'red' : 'green'
                            }
                          >
                            {season.status}
                          </Badge>
                        </Group>
                        <div>
                          <small>
                            <FormatDate date={season.start} /> to{' '}
                            <FormatDate date={season.end} />
                          </small>
                        </div>
                      </Stack>
                    }
                  />
                ))}
              </Stack>
            )}
          </ModalButton>
        )
      }
    />
  )
}

export default Allocations
