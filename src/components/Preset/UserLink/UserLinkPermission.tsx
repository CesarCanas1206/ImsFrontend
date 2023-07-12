import React, { useMemo, useState } from 'react'
import { get, post, doDelete } from '../../../hooks/useAPI'
import { useQuery } from 'react-query'
import Select from '../../Form/Select/Select'
import Button from 'src/components/Form/Button/Button'
import { isEmpty } from 'src/utilities/strings'
import Group from 'src/components/UI/Group/Group'
import Stack from 'src/components/UI/Stack/Stack'
import Card from 'src/components/UI/Card/Card'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Skeleton from 'src/components/UI/Skeleton/Skeleton'

function UserLinkPermission({
  id,
  endpoint = 'user-permission',
  type = 'permission',
  field = 'permission_id',
}: any) {
  const [selected, setSelected] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({ endpoint: endpoint + '?user_id=' + id }).then((data: any) => {
        return data.sort((a: any, b: any) =>
          a.permission.name > b.permission.name ? 1 : -1,
        )
      }),
  )

  const { data: permissions, isLoading: isLoadingPermission } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () =>
      await get({ endpoint: `permission` }).then((data: any) =>
        data.map((item: any) => ({
          ...item,
          label: item?.name ?? item.code ?? '',
          value: String(item.id ?? ''),
        })),
      ),
    enabled: isEmpty(data),
  })

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ['user', id],
    async () =>
      await get({
        endpoint: 'user/' + id,
      }),
  )

  const linkNewItem = async () => {
    setLoading(true)
    await post({
      endpoint: endpoint,
      data: {
        user_id: id,
        [field]: selected,
      },
    })
    setSelected('')
    refetch()
    setLoading(false)
  }

  const deleteLink = async (id: any) => {
    setLoading(true)
    await doDelete({
      endpoint: endpoint + '/' + id,
    })
    refetch()
    setLoading(false)
  }

  if (isLoading || isLoadingPermission || isLoadingUser) {
    return (
      <Stack>
        <h4>Linked {type}s</h4>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Linked {type}s</h4>
      <Stack>
        {data?.map((item: any) => (
          <Card key={item.id}>
            <Group position="apart">
              {
                permissions?.find(
                  (permission: any) => permission.id === item.permission_id,
                )?.name
              }
              <Confirm
                key={item.id}
                onYes={() => deleteLink(item.id)}
                title={`Are you sure you want to remove this ${type}?`}
                variant="danger"
                icon="Trash"
                light
                compact
              />
            </Group>
          </Card>
        ))}

        <Group>
          <Select
            style={{ flex: 1 }}
            data={permissions.filter(
              (item: any) =>
                !data.find((d: any) => d.permission_id === item.id),
            )}
            value={selected}
            onChange={({ value }: any) => setSelected(value)}
          />
          <Button
            disabled={loading}
            onClick={linkNewItem}
            text={'Link ' + type}
          />
        </Group>
      </Stack>
    </div>
  )
}

export default UserLinkPermission
