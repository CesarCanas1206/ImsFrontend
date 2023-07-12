import React from 'react'
import { useQuery } from 'react-query'
import Button from 'src/components/Form/Button/Button'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import Stack from 'src/components/UI/Stack/Stack'
import { doDelete, get, post } from 'src/hooks/useAPI'
import Skeleton from '../../UI/Skeleton/Skeleton'
import UserSelector from 'src/components/Form/UserSelector/UserSelector'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import Badge from 'src/components/UI/Badge/Badge'

function HirerLinkUser({
  id,
  endpoint = 'hirer-user',
  type = 'contact',
  field = 'user_id',
}: any) {
  const [selected, setSelected] = React.useState<any>()
  const [loading, setLoading] = React.useState(false)
  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({
        endpoint: endpoint + '?hirer_id=' + id,
      }).then((data: any) => {
        return data?.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      }),
  )

  const { data: hirer, isLoading: isLoadingHirer } = useQuery(
    ['hirer', id],
    async () =>
      await get({
        endpoint: 'hirer/' + id,
      }),
  )

  const linkNew = async () => {
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
          return (
            <Card key={item.id}>
              <Group position="apart">
                <Group>
                  <Stack>
                    <div>{item.user?.name}</div>
                    <div>
                      {item.user?.position && (
                        <>
                          <Badge>{item.user?.position}</Badge>
                          <br />
                        </>
                      )}
                      <Badge>{item.user?.email}</Badge>
                      <Badge>{item.user?.phone}</Badge>
                    </div>
                  </Stack>
                </Group>
                <Group>
                  <ModalButtonForm
                    icon="edit"
                    tooltip="Edit contact"
                    formId="hirer-user"
                    itemId={item.user.id}
                    compact
                  />
                  <Confirm
                    onYes={() => deleteLink(item.id)}
                    title={`Are you sure you want to remove this ${type}?`}
                    variant="danger"
                    icon="Trash"
                    light
                    compact
                  />
                </Group>
              </Group>
            </Card>
          )
        })}
        {!data?.length && (
          // only show the link options if no users linked.
          <Group position="apart">
            <UserSelector
              style={{ minWidth: '100%' }}
              filters={['role_id=[4,5]']}
              formId="hirer-user"
              skip={data?.map((item: any) => item.user_id)}
              value={selected}
              onChange={({ value }: any) => setSelected(value)}
              defaultValues={{ role_id: '4' }}
            />
            <Button
              disabled={loading || isLoading}
              onClick={linkNew}
              text={'Link ' + type}
            />
          </Group>
        )}
      </Stack>
    </div>
  )
}

export default HirerLinkUser
