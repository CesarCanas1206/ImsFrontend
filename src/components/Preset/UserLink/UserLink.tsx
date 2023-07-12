import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import AssetSelector from 'src/components/Form/AssetSelector/AssetSelector'
import Button from 'src/components/Form/Button/Button'
import DatasetSelector from 'src/components/Form/DatasetSelector/DatasetSelector'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import Skeleton from 'src/components/UI/Skeleton/Skeleton'
import Stack from 'src/components/UI/Stack/Stack'
import { doDelete, get, post } from 'src/hooks/useAPI'
import { recursiveNameFromParentBuilder } from 'src/utilities/strings'

function UserLink({
  id,
  endpoint = 'user-asset',
  type = 'venue',
  field = 'asset_id',
}: any) {
  const [selected, setSelected] = React.useState<any>()
  const [loading, setLoading] = React.useState(false)
  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({
        endpoint: endpoint + '?user_id=' + id,
      }).then((data: any) => {
        return data
          ?.map((item: any) => {
            item.asset.label = recursiveNameFromParentBuilder(item.asset)
            return item
          })
          .sort((a: any, b: any) => (a.asset.label > b.asset.label ? 1 : -1))
      }),
  )

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ['user', id],
    async () =>
      await get({
        endpoint: 'user/' + id,
      }),
  )

  const linkNewAsset = async () => {
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

  if (isLoading || isLoadingUser) {
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
              {item.asset.label}
              <Confirm
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
          {type === 'email' && (
            <DatasetSelector
              endpoint="d/email-template"
              skip={data?.map((item: any) => item.email_id)}
              value={selected}
              onChange={({ value }: any) => setSelected(value)}
            />
          )}
          {type !== 'email' && (
            <AssetSelector
              style={{ flex: 1 }}
              skip={data?.map((item: any) => item.asset_id)}
              value={selected}
              onChange={({ value }: any) => setSelected(value)}
            />
          )}
          <Button
            disabled={loading}
            onClick={linkNewAsset}
            text={'Link ' + type}
          />
        </Group>
      </Stack>
    </div>
  )
}

export default UserLink
