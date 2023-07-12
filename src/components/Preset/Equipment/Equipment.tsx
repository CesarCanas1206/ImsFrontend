import React from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Heading from '../../UI/Heading/Heading'
import Stack from '../../UI/Stack/Stack'
import Group from '../../UI/Group/Group'
import Confirm from '../../Function/Confirm/Confirm'
import Action from '../../Function/Action/Action'
import useAssets from '../../../hooks/useAssets'
import ModalButtonForm from '../../UI/ModalButtonForm/ModalButtonForm'
import { Skeleton } from '@mantine/core'

function Equipment({ row: items }: any) {
  const { get } = useAPI()

  const {
    data: hirers,
    isLoading: hirersLoading,
    refetch,
  } = useQuery({
    queryKey: ['hirers', items.hirer_id],
    queryFn: async () =>
      await get({
        endpoint: `hirer`,
      }),
  })

  const { data: hirerequipment, isLoading: hirerEquipLoading } = useQuery({
    queryKey: ['d/equipment', items.hirer_id, items.asset_id],
    queryFn: async () =>
      await get({
        endpoint: `d/equipment`,
      }),
  })

  const {
    data: assets,
    isLoading: assetLoading,
    refetch: assetRefetch,
  } = useAssets({
    queryKey: ['assets', 'full'],
  })

  if (assetLoading || hirersLoading || hirerEquipLoading) {
    return (
      <Stack>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  const matchHirer = hirerequipment?.find((f: any) => f.id === items.id)

  const assetName = assets
    ?.filter((f: any) => f.id === items.asset_id)
    .map((n: any) => n.label)
  const hirerName = hirers
    ?.filter((f: any) => f.id === matchHirer?.hirer_id)
    .map((n: any) => n.name)

  return (
    <>
      <Group position="apart">
        <Stack>
          <Heading>{hirerName}</Heading>
          <Group>
            <Heading size="h6">{assetName}</Heading>
            {' - '}
            <Heading size="h6">{items.name}</Heading>
          </Group>
        </Stack>
        <Group>
          <ModalButtonForm
            compact
            icon="edit"
            formId="equipment"
            itemId={items.id}
          />
          <ModalButtonForm
            compact
            icon="user"
            tooltip="Assign/unassign hirer"
            formId="hirer-equipment"
            type="hirer"
            itemId={items.id}
            query={{ equipment_id: items.id }}
            defaultValues={{ hirer_id: items.hirer_id }}
          />
          <Confirm
            icon="delete"
            variant="danger"
            title="Are you sure you want to delete this equipment?"
            compactX
            tooltip="Delete key"
          >
            <Action
              action="delete"
              endpoint={'d/' + items.id}
              after={refetch}
            />
          </Confirm>
        </Group>
      </Group>
    </>
  )
}

export default Equipment
