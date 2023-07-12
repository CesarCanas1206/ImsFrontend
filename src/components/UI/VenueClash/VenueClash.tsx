import { Button, Card, Flex } from '@mantine/core'

interface VenueClashProps {
  data: any
  name: string
}

const VenueClash = ({ data, name }: VenueClashProps) => {
  return (
    <Flex
      direction={'column'}
      style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}
    >
      <Flex justify="center">
        <div
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: 'var(--c-link, #19407E)',
            marginBottom: 14,
          }}
        >
          {name}
        </div>
      </Flex>

      <Flex>
        <Flex style={{ flex: 1, gap: 10, flexDirection: 'column' }}>
          {data.map((item: any, index: number) => {
            return (
              <Flex key={item.id} style={{ flex: 1, gap: 10 }}>
                <Card
                  style={{ flex: 1 }}
                  bg={index % 2 === 0 ? '#e8faff' : '#f6f7fd'}
                  radius="md"
                >
                  <Flex>{item.first.name}</Flex>
                  <Flex>{item.first.hirer.name}</Flex>
                  <Flex>{item.first.date}</Flex>
                  <Flex>{item.first.time}</Flex>
                </Card>
                <Card
                  style={{ flex: 1 }}
                  bg={index % 2 === 0 ? '#e8faff' : '#f6f7fd'}
                  radius="md"
                >
                  <Flex>{item.second.name}</Flex>
                  <Flex>{item.second.hirer.name}</Flex>
                  <Flex>{item.second.date}</Flex>
                  <Flex>{item.second.time}</Flex>
                </Card>
              </Flex>
            )
          })}
        </Flex>
      </Flex>

      <Flex justify="center" style={{ justifySelf: 'flex-end' }}>
        <Button color="dark">Resolve Clashes</Button>
      </Flex>
    </Flex>
  )
}

export default VenueClash
