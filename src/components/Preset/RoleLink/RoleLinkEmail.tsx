import React, { useState } from 'react'
import { get, post, doDelete } from '../../../hooks/useAPI'
import { useQuery } from 'react-query'
import Select from '../../Form/Select/Select'
import Button from 'src/components/Form/Button/Button'
import useRegistryQuery from '../../../hooks/useRegistryQuery'
import Stack from 'src/components/UI/Stack/Stack'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import Confirm from 'src/components/Function/Confirm/Confirm'
import DatasetSelector from 'src/components/Form/DatasetSelector/DatasetSelector'
import Skeleton from 'src/components/UI/Skeleton/Skeleton'

function RoleLinkEmail({
  id,
  endpoint = 'role-email',
  type = 'email',
  field = 'email_id',
}: any) {
  const [selected, setSelected] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { data: emails, isLoading: isLoadingEmail } = useRegistryQuery({
    endpoint: 'd/email-template',
  })

  const { data, isLoading, refetch } = useQuery(
    [endpoint, id],
    async () =>
      await get({ endpoint: endpoint + '?role_id=' + id }).then((data: any) => {
        return data.sort((a: any, b: any) => (a.email_id > b.email_id ? 1 : -1))
      }),
  )

  const { data: role, isLoading: isLoadingRole } = useQuery(
    ['role', id],
    async () =>
      await get({
        endpoint: 'role/' + id,
      }),
  )

  const linkNewItem = async () => {
    setLoading(true)
    await post({
      endpoint: endpoint,
      data: {
        role_id: id,
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

  if (isLoading || isLoadingEmail || isLoadingRole) {
    return (
      <Stack>
        <h4>Linked {type}s</h4>
        <Skeleton style={{ width: '100%' }} height={50} mb={5} />
      </Stack>
    )
  }

  return (
    <div>
      <h2>{role.name}</h2>
      <h4>Linked {type}s</h4>
      <Stack>
        {data?.map((item: any) => (
          <Card key={item.id}>
            <Group position="apart">
              {
                emails?.find((email: any) => email.reference === item.email_id)
                  ?.name
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
          <DatasetSelector
            style={{ flex: 1 }}
            endpoint="d/email-template"
            skip={data?.map((item: any) => item.email_id)}
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

export default RoleLinkEmail
