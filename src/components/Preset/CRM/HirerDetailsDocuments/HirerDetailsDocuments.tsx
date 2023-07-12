import { Card, Flex, Group, Stack, Table, Text, Title } from '@mantine/core'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Button from 'src/components/Form/Button/Button'
import BackButton from 'src/components/UI/BackButton/BackButton'
import Icon from 'src/components/UI/Icon/Icon'
import useAPI from 'src/hooks/useAPI'

const HirerDetailsDocuments = () => {
  const { hirer_id } = useParams<{ hirer_id: string }>()
  const { get } = useAPI()

  const { data: hirer, isLoading } = useQuery(
    ['hirer', hirer_id],
    async () => await get({ endpoint: 'hirer/' + hirer_id }),
  )

  if (isLoading) {
    return <></>
  }

  return (
    <Stack>
      <Flex>
        <Flex style={{ flex: 1 }}>
          <BackButton />
          {/* <Button text="Back" icon="back" link="/crm" /> */}
        </Flex>
        <Flex style={{ flex: 1 }} gap="sm" justify="flex-end">
          <Button icon="edit" compact />
        </Flex>
      </Flex>
      <Flex>
        <Flex direction="column">
          <Title weight={400}>{hirer?.name}</Title>
          <Flex align="center" gap="sm">
            <Icon type="map" color="gray" />
            <Text color="gray">2 Winchester St, Southport QLD 4215</Text>
            <Button icon="map" compact />
          </Flex>
        </Flex>
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
              <Icon type="warning" />
              Missing Documents
            </Title>
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Venue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
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
              Current documents
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
              <tbody></tbody>
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
  )
}

export default HirerDetailsDocuments
