import React from 'react'
import { Card, Flex, Group, Stack, Table, Title } from '@mantine/core'
import Button from 'src/components/Form/Button/Button'
import useAPI from '../../../../hooks/useAPI'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

const HirerDetailsAdditional = () => {
  const { hirer_id } = useParams<{ hirer_id: string }>()
  const { get } = useAPI()

  const { data: future, isLoading: isLoadingFuture } = useQuery(
    ['future', hirer_id],
    async () => await get({ endpoint: 'booking/listing/recent/' + hirer_id }),
  )

  const { data: previous, isLoading: isLoadingPrevious } = useQuery(
    ['previous', hirer_id],
    async () => await get({ endpoint: 'booking/listing/hirer/' + hirer_id }),
  )

  const { data: venue, isLoading } = useQuery(
    ['asset', hirer_id],
    async () =>
      await get({
        endpoint: 'hirer-asset?hirer_id=' + hirer_id + '&sort_by=asset.label',
      }).then((data) =>
        data?.sort((a: any, b: any) =>
          a.asset.label > b.asset.label ? 1 : -1,
        ),
      ),
  )

  if (isLoading || isLoadingFuture || isLoadingPrevious) {
    return <></>
  }

  return (
    <>
      <Stack>
        <Flex>
          <Card
            style={{ flex: 1, marginTop: '10px' }}
            shadow="sm"
            padding="xs"
            radius="lg"
            withBorder
          >
            <Card.Section p="xs">
              <Title weight={400} order={3}>
                Assigned Venues
              </Title>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {venue?.map((venue: any, index: number) => (
                    <tr key={index}>
                      <td>{venue.asset.label}</td>
                      <td>
                        <Flex
                          style={{ flex: 1 }}
                          justify="flex-center"
                          align={'flex-end'}
                        >
                          <Button icon="edit" compact />
                          &nbsp;
                          <Button icon="delete" compact />
                        </Flex>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Group>
            <Group position="apart" mt="5rem" mb="xs">
              <Flex style={{ flex: 1 }} justify="flex-end" align={'flex-end'}>
                <Button icon="plus" text={'Add'} />
              </Flex>
            </Group>
          </Card>
        </Flex>
        <Flex>
          <Card
            style={{ flex: 1 }}
            shadow="sm"
            padding="xs"
            radius="lg"
            withBorder
          >
            <Card.Section p="xs">
              <Title weight={400} order={3}>
                Upcoming Bookings
              </Title>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Hirer</th>
                    <th>Invoices</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {future &&
                    future?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.hirer.name}</td>
                        <td>{item.application_id}</td>
                        <td>
                          <Flex
                            style={{ flex: 1 }}
                            justify="flex-center"
                            align={'flex-end'}
                          >
                            <Button icon="edit" text={'Edit'} />
                            &nbsp;
                            <Button icon="delete" text={'Delete'} />
                          </Flex>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Group>
            <Group position="apart" mt="5rem" mb="xs">
              <Flex style={{ flex: 1 }} justify="flex-end" align={'flex-end'}>
                <Button icon="plus" text={'Add'} />
              </Flex>
            </Group>
          </Card>
        </Flex>
        <Flex>
          <Card
            style={{ flex: 1 }}
            shadow="sm"
            padding="xs"
            radius="lg"
            withBorder
          >
            <Card.Section p="xs">
              <Title weight={400} order={3}>
                Previous Bookings
              </Title>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Hirer</th>
                    <th>Invoices</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {previous &&
                    previous?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.hirer.name}</td>
                        <td>{item.application_id}</td>
                        <td>
                          <Flex
                            style={{ flex: 1 }}
                            justify="flex-center"
                            align={'flex-end'}
                          >
                            <Button icon="edit" text={'Edit'} />
                            &nbsp;
                            <Button icon="delete" text={'Delete'} />
                          </Flex>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Group>
            <Group position="apart" mt="5rem" mb="xs">
              <Flex style={{ flex: 1 }} justify="flex-end" align={'flex-end'}>
                <Button icon="plus" text={'Add'} />
              </Flex>
            </Group>
          </Card>
        </Flex>
      </Stack>
    </>
  )
}
export default HirerDetailsAdditional
