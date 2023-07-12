import React from 'react'
import { useQuery } from 'react-query'
import AssetSelector from 'src/components/Form/AssetSelector/AssetSelector'
import Button from 'src/components/Form/Button/Button'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import Stack from 'src/components/UI/Stack/Stack'
import { doDelete, get, post } from 'src/hooks/useAPI'
import Skeleton from '../../UI/Skeleton/Skeleton'
import Badge from '../../UI/Badge/Badge'
import { recursiveNameFromParentBuilder } from 'src/utilities/strings'

function HirerLinkAsset({
  id,
  endpoint = 'hirer-asset',
  type = 'venue',
  field = 'asset_id',
}: any) {
  const [selected, setSelected] = React.useState<any>()
  const [loading, setLoading] = React.useState(false)
  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({
        endpoint: endpoint + '?hirer_id=' + id,
      }).then((data: any) => {
        return data
          ?.map((item: any) => {
            item.asset.label = recursiveNameFromParentBuilder(item.asset)
            return item
          })
          .sort((a: any, b: any) => (a.asset.label > b.asset.label ? 1 : -1))
      }),
  )

  const { data: hirer, isLoading: isLoadingHirer } = useQuery(
    ['hirer', id],
    async () =>
      await get({
        endpoint: 'hirer/' + id,
      }),
  )

  const linkNewAsset = async () => {
    setLoading(true)
    await post({
      endpoint: endpoint,
      data: {
        hirer_id: id,
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

  if (loading || isLoading || isLoadingHirer) {
    return (
      <Stack>
        <h4>Linked {type}s</h4>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  return (
    <div>
      <h2>{hirer.name}</h2>
      <h4>Linked {type}s</h4>
      <Stack>
        {data?.map((item: any) => {
          const bookable = (item.asset?.bookable ?? 'No') === 'Yes'
          const inspectable = (item.asset?.inspectable ?? 'No') === 'Yes'
          return (
            <Card key={item.id}>
              <Group position="apart">
                <Group>
                  <Stack>
                    {item.asset?.label}
                    <Group>
                      {bookable && <Badge>Bookable</Badge>}
                      {inspectable && <Badge>Inspectable</Badge>}
                    </Group>
                  </Stack>
                </Group>
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
          <AssetSelector
            style={{ flex: 1 }}
            skip={data?.map((item: any) => item.asset_id)}
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

export default HirerLinkAsset
