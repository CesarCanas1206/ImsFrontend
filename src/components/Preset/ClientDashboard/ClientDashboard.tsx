import { useQuery } from 'react-query'
import Divider from '../../UI/Divider/Divider'
import Icon from '../../UI/Icon/Icon'
import LoaderContent from '../../UI/LoaderContent/LoaderContent'
import { get } from '../../../hooks/useAPI'
import Form from '../../Form/Form/Form'
import Card from '../../UI/Card/Card'
import Group from '../../UI/Group/Group'
import Heading from '../../UI/Heading/Heading'
import ModalButton from '../../UI/ModalButton/ModalButton'
import { getAsArray } from '../../../utilities/strings'
import Stack from '../../UI/Stack/Stack'
import DataGrid from '../../UI/DataGrid/DataGrid'
import ApplicationButtons from '../../UI/Allocations/ApplicationButtons'
import ApplicationStatus from '../../UI/Allocations/ApplicationStatus'
import ClientBookingItem from '../ClientBookingItem/ClientBookingItem'
import ActionMenu from 'src/components/UI/ActionMenu/ActionMenu'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import dayjs from 'dayjs'
import AddNewBooking from 'src/components/UI/AddNewBooking/AddNewBooking'

export function ClientDashboard() {
  const { data: hirers, isLoading: isHirerLoading } = useQuery(
    'hirer?user_id=me',
    async () =>
      await get({
        endpoint: 'hirer?with=allocation&user_id=me',
      }),
  )
  const { data: myInvoices } = useQuery('my-invoices', async () =>
    get({ endpoint: 'd/invoice?user_id=me' }),
  )
  const { data: seasons } = useQuery('seasons', async () =>
    get({ endpoint: 'd/season?status=%open' }),
  )

  if (isHirerLoading) {
    return <LoaderContent />
  }

  return (
    <Stack>
      {hirers.map((hirer: any) => {
        const filteredSeasons =
          typeof seasons?.filter !== 'undefined' &&
          seasons.filter((season: any) =>
            getAsArray(hirer?.hirer_type_id).includes(season.hirer_type_id),
          )
        const actions = [
          {
            text: 'View/edit documents',
            icon: 'file',
            modal: true,
            sub: [
              {
                component: 'Form',
                layout: 'card',
                formId: 'compliance-docs',
                autosave: true,
                hideSave: true,
                parent_id: hirer.id,
                item_specific_id: hirer.id,
                specific_id: hirer.id,
              },
            ],
          },
          {
            text: 'Edit contact details',
            icon: 'edit',
            color: 'blue',
            modal: true,
            sub: [
              {
                component: 'Form',
                formId: 'hirer',
                itemId: hirer?.id,
                hideSave: true,
                autosave: true,
              },
              {
                component: 'Form',
                formId: 'client-contact',
                itemId: hirer?.id,
                hideSave: true,
              },
            ],
          },
        ]

        return (
          <Card key={hirer.id}>
            <Group position="apart" align="flex-start">
              <Heading size="h3">{hirer.name}</Heading>
              <ActionMenu tooltip="Actions" actions={actions} />
            </Group>
            <Stack>
              {filteredSeasons?.length > 0 && (
                <>
                  {filteredSeasons?.map((season: any, index: number) => {
                    const allocation = hirer?.allocation?.filter(
                      (f: any) => f.season_id === season.id,
                    )
                    const applicationId =
                      typeof allocation !== 'undefined' && allocation.length
                        ? {
                            name: 'Application ID',
                            sub: [allocation[0].application_id ?? ''],
                            badge: true,
                            title: true,
                            badgeColor: 'dark',
                          }
                        : {}
                    const seasonDates = `${dayjs(season.start).format(
                      'D MMM YYYY',
                    )} to ${dayjs(season.end).format('D MMM YYYY')}`
                    const badgeColor =
                      season.status === 'Open' ? 'green' : 'red'
                    return (
                      <DataGrid
                        key={season.id}
                        endpoint={`hirer/${hirer?.id}?sort_by=name&with=allocation`}
                        filter={false}
                        columns={[
                          {
                            name: 'Name',
                            sub: [
                              {
                                component: 'Group',
                                sub: [
                                  {
                                    component: 'PlainText',
                                    text: season.name,
                                  },
                                  {
                                    component: 'Badge',
                                    color: badgeColor,
                                    sub: [season.status],
                                  },
                                  {
                                    component: 'PlainText',
                                    text: seasonDates,
                                  },
                                ],
                              },
                            ],
                          },
                          applicationId,
                          {
                            name: 'Status',
                            key: 'status',
                            title: false,
                            element: (row: any) => (
                              <ApplicationStatus
                                hirer={row}
                                seasonId={season.id}
                              />
                            ),
                          },
                          {
                            name: 'Actions',
                            key: 'actions',
                            element: (row: any) => (
                              <ApplicationButtons
                                hirer={row}
                                seasonId={season.id}
                              />
                            ),
                          },
                        ]}
                      />
                    )
                  })}
                </>
              )}
              <Card>
                <Group position="apart" style={{ marginBottom: 5 }}>
                  <Heading size="h5" style={{ marginTop: 0, marginBottom: 2 }}>
                    Bookings
                  </Heading>
                  <ModalButton
                    icon="Plus"
                    text="Add new booking"
                    tooltip="Add new booking"
                    hideclose="true"
                  >
                    <AddNewBooking hirer_id={hirer?.id} />
                  </ModalButton>
                  {/* <DynamicComponent
                    component="Button"
                    props={{
                      text: 'Add new booking',
                      icon: 'plus',
                      link: '/bookings/add/' + hirer?.id,
                    }}
                  /> */}
                </Group>
                <ClientBookingItem hirerId={hirer?.id} />
              </Card>
            </Stack>
          </Card>
        )
      })}
      {myInvoices && myInvoices.length > 0 && (
        <>
          <Divider />
          <Heading>Invoices</Heading>
          {myInvoices?.map((inv: any) => (
            <Card key={inv.id} style={{ marginBottom: 10 }}>
              <Group position="apart">
                <Heading size="h5">
                  <Icon type="invoice" style={{ marginRight: 10 }} />
                  Invoice #{inv.number}
                </Heading>
                <ModalButton icon="search" variant="info" text="View invoice">
                  <Form formId="invoice" itemId={inv?.id} readOnly />
                </ModalButton>
              </Group>
              <Group style={{ color: '#666' }}>
                <span>${inv.total}</span>
                {' - '}
                {inv.status === 'paid' && (
                  <strong style={{ color: 'green' }}>Paid</strong>
                )}
                {inv.status !== 'paid' && <strong>Not paid</strong>}
                {' - '}
                <span>
                  {Array.isArray(inv.items) && (
                    <>
                      {inv.items.length} item
                      {inv.items.length !== 1 && 's'}
                    </>
                  )}
                </span>
              </Group>
            </Card>
          ))}
        </>
      )}
    </Stack>
  )
}

export default ClientDashboard
