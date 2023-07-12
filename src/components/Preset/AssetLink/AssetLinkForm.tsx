import React from 'react'
import { useQuery } from 'react-query'
import Button from 'src/components/Form/Button/Button'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import Stack from 'src/components/UI/Stack/Stack'
import { doDelete, get, post } from 'src/hooks/useAPI'
import Skeleton from '../../UI/Skeleton/Skeleton'
import { isEmpty } from 'src/utilities/strings'
import Select from '../../Form/Select/Select'

function AssetLinkForm({
  id,
  endpoint = 'asset-form',
  type = 'checklist',
  field = 'form_id',
}: any) {
  const [selected, setSelected] = React.useState<any>()
  const [loading, setLoading] = React.useState(false)

  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({
        endpoint: endpoint + '?asset_id=' + id,
      }).then((data: any) => {
        return data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      }),
  )

  const { data: forms, isLoading: isLoadingForms } = useQuery({
    queryKey: ['forms'],
    queryFn: async () =>
      await get({ endpoint: `form?category=${type}` }).then((data: any) =>
        data
          .map((item: any) => ({
            ...item,
            label: item?.name ?? '',
            value: String(item.id ?? ''),
          }))
          .sort((a: any, b: any) => (a.name > b.name ? 1 : -1)),
      ),
    enabled: isEmpty(data),
  })

  const { data: asset, isLoading: isLoadingAsset } = useQuery(
    ['asset', id],
    async () =>
      await get({
        endpoint: 'asset/' + id,
      }),
  )

  const linkNewAsset = async () => {
    setLoading(true)
    await post({
      endpoint: endpoint,
      data: {
        asset_id: id,
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

  if (loading || isLoading || isLoadingForms || isLoadingAsset) {
    return (
      <Stack>
        <h4>Linked {type}s</h4>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  return (
    <div>
      <h2>{asset.name}</h2>
      <h4>Linked {type}s</h4>
      <Stack>
        {data?.map((item: any) => {
          return (
            <Card key={item.id}>
              <Group position="apart">
                {item?.form.name}
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
          )
        })}
        <Group>
          <Select
            style={{ flex: 1 }}
            data={forms.filter(
              (item: any) => !data.find((d: any) => d.form_id === item.id),
            )}
            value={selected}
            onChange={({ value }: any) => setSelected(value)}
          />
          <Button
            disabled={loading || isLoading}
            onClick={linkNewAsset}
            text={'Link ' + type}
          />
        </Group>
      </Stack>
    </div>
  )
}

export default AssetLinkForm
