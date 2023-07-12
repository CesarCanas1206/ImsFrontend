import React from 'react'
import { Flex, Stack, Text, Title } from '@mantine/core'
import Button from 'src/components/Form/Button/Button'
import Icon from 'src/components/UI/Icon/Icon'
import useAPI from '../../../../hooks/useAPI'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

const HirerDetails = () => {
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
          <Button text="Back" icon="back" link="/crm" />
        </Flex>
        <Flex style={{ flex: 1 }} gap="sm" justify="flex-end">
          <Button
            icon="phone"
            text="Communication"
            link={`/crm/hirer-details/${hirer_id}/communication`}
          />
          <Button
            icon="file"
            text="Documents"
            link={`/crm/hirer-details/${hirer_id}/documents`}
          />
          <Button icon="edit" text="Edit" />
        </Flex>
      </Flex>
      <Flex style={{ marginBottom: '10px' }}>
        <Flex direction="column">
          <Title weight={400}>{hirer?.name}</Title>
          <Flex align="center" gap="sm">
            <Icon type="map" color="gray" />
            <Text color="gray">2 Winchester St, Southport QLD 4215</Text>
            <Button icon="map" compact />
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  )
}

export default HirerDetails
