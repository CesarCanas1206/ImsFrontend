import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Action } from '../../Function/Action/Action'
import Confirm from '../../Function/Confirm/Confirm'
import Card from '../../UI/Card/Card'
import LoaderContent from '../../UI/LoaderContent/LoaderContent'
import Stack from '../../UI/Stack/Stack'
import useAPI from '../../../hooks/useAPI'
import Form from '../../Form/Form/Form'
import Group from '../../UI/Group/Group'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Space from '../../UI/Space/Space'
import DataGrid from 'src/components/UI/DataGrid/DataGrid'
import ActionMenu from 'src/components/UI/ActionMenu/ActionMenu'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'

export function CRM() {
  const { get } = useAPI()
  const queryClient = useQueryClient()

  const { data: seasons, isLoading } = useQuery(
    ['seasons', 'allocations'],
    async () => await get({ endpoint: 'd/season?name=!empty' }),
  )

  if (isLoading) {
    return <LoaderContent />
  }

  // const {
  //   data: hirers,
  //   isLoading,
  //   refetch,
  // } = useQuery(['hirer'], loadHirers, {
  //   staleTime: 1000 * 10,
  // })

  // const saveHirer = useMutation<any>(
  //   async (props: any) => {
  //     return props
  //   },
  //   {
  //     onSuccess: ({ id, responses }: any) => {
  //       queryClient.setQueriesData(['hirer'], (previous: any) =>
  //         previous.map((item: any) =>
  //           item.id === id ? { ...item, ...responses } : item,
  //         ),
  //       )
  //     },
  //   },
  // )

  // if (isLoading) {
  //   return <LoaderContent justContent />
  // }

  //   {
  //     text: 'Assigned hirers',
  //     icon: 'users',
  //     modal: true,
  //     hide: isEmpty(bookable),
  //     sub: [
  //       {
  //         component: 'AssetLinkHirer',
  //         id: id,
  //       },
  //     ],
  //   },
  //   {
  //     text: 'Assigned checklists',
  //     icon: 'list',
  //     modal: true,
  //     hide: isEmpty(inspectable),
  //     sub: [
  //       {
  //         component: 'AssetLinkForm',
  //         id: id,
  //       },
  //     ],
  //   },
  // ]

  return (
    <DataGrid
      key="hirers"
      endpoint={'hirer?fields=id,name,customer_type,hirer_type,sport'}
      columns={[
        {
          name: 'Name',
          key: '{name}',
          feature: true,
          link: '/crm/hirer-details/{id}',
        },
        { name: 'Booking type', key: '{hirer_type}', badge: true },
        {
          name: 'Customer type',
          key: '{customer_type}',
          badge: true,
        },
        {
          name: 'Sport',
          key: '{e::sport.name}',
          badge: true,
        },
        {
          name: 'Club contact',
          key: '{user.name}',
          title: true,
        },
        {
          name: 'Actions',
          key: 'action',
          element: (row: any) => <ActionButtons row={row} seasons={seasons} />,
        },
      ]}
      sorting={[
        {
          name: 'Name (A-Z)',
          key: 'name,asc',
        },
        {
          name: 'Name (Z-A)',
          key: 'name,desc',
        },
        {
          name: 'Customer type (A-Z)',
          key: 'customer_type.name',
        },
        {
          name: 'Customer type (Z-A)',
          key: 'customer_type.name,desc',
        },
      ]}
      titleSub={[
        {
          component: 'Group',
          sub: [
            {
              component: 'ModalButtonForm',
              icon: 'plus',
              text: 'Add new',
              formId: 'hirer',
              itemId: 'new',
            },
            {
              component: 'Csv',
              props: {
                endpoint: 'hirer?sort_by=name',
                columns: [
                  { name: 'Name', key: '{name}' },
                  { name: 'Booking type', key: '{e::hirer_type.name}' },
                  { name: 'Customer type', key: '{e::customer_type.name}' },
                  { name: 'Contact name', key: '{user.name}' },
                ],
              },
              sub: [
                {
                  component: 'Button',
                  inMenu: true,
                  icon: 'file',
                  text: 'Download hirer CSV',
                },
              ],
            },
          ],
        },
      ]}
      filters={[
        {
          key: 'hirer-type',
          label: 'Hirer Type',
          endpoint: 'hirer-type',
          column: 'name',
          conditions: [{ on: 'hirer_type', type: 'contains', value: 'name' }],
        },
      ]}
    />
  )
}

export default CRM

const ActionButtons = ({ row, seasons }: any) => {
  //only show the office bearers modal if this is a hirer who has allocations.
  const hasAllocation = seasons?.filter((season: any) => {
    return season.hirer_type?.find(
      (f: any) =>
        f.name.indexOf(row.hirer_type) !== -1 ||
        row.hirer_type.indexOf(f.name) !== -1,
    )
  })?.length

  const actions = [
    {
      text: 'Linked venues',
      modal: true,
      icon: 'Building',
      sub: [{ component: 'HirerLinkAsset', id: row.id }],
    },
    {
      text: 'Linked contacts',
      modal: true,
      icon: 'users',
      sub: [{ component: 'HirerLinkUser', id: row.id }],
    },
    {
      text: 'Office bearers/Key register',
      modal: true,
      icon: 'users',
      formId: 'hirer_details',
      itemId: row.id,
      hide: !hasAllocation,
    },
  ]

  return (
    <Group>
      <ModalButtonForm
        compact
        icon="edit"
        size="xl"
        tooltip="Edit hirer"
        formId="hirer"
        itemId={row.id}
      />
      <Confirm
        title="Are you sure you want to delete this hirer?"
        tooltip="Delete hirer"
        variant="danger"
        light={true}
        compact={true}
        icon="delete"
      >
        <Action action="delete" endpoint={`hirer/${row.id}`} />
      </Confirm>
      <ModalButtonForm
        compact
        icon="file"
        size="lg"
        tooltip="View documents"
        formId="compliance-docs"
        itemId={row.id}
        light={true}
        specific_id={row.id}
        item_specific_id={row.id}
      />
      <ActionMenu actions={actions} />
    </Group>
  )
}
