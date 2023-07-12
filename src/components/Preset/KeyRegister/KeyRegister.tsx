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

function KeyRegister({ row: items }: any) {
  const { get } = useAPI()

  const {
    data: hirers,
    isLoading: hirersLoading,
    refetch,
  } = useQuery({
    queryKey: ['hirers'],
    queryFn: async () =>
      await get({
        endpoint: `hirer`,
      }),
  })

  const { data: hirerkeys, isLoading: hirerkeysLoading } = useQuery({
    queryKey: ['hirer-key'],
    queryFn: async () =>
      await get({
        endpoint: `hirer-key`,
      }),
  })

  const {
    data: assets,
    isLoading: assetLoading,
    refetch: assetRefetch,
  } = useAssets({
    queryKey: ['assets', 'full'],
  })

  if (assetLoading || hirersLoading || hirerkeysLoading) {
    return (
      <Stack>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  const matchHirer = hirerkeys?.find(
    (f: any) => f['key-register_id'] === items.id,
  )

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
            formId="key-register"
            itemId={items.id}
          />
          <ModalButtonForm
            compact
            icon="user"
            tooltip="Assign/unassign hirer"
            formId="hirer-key"
            itemId={items.id}
          />
          <Confirm
            icon="delete"
            variant="danger"
            title="Are you sure you want to delete this key?"
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

export default KeyRegister
