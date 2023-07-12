import React, { useContext, useState } from 'react'
import styles from './venuePreview.module.css'
import {
  Flex,
  Title,
  Switch,
  Card,
  Image,
  Group,
  Text,
  Button,
} from '@mantine/core'
import { VenuePreviewContext } from 'src/context/VenuePreviewContextProvider'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { LocationOn } from '@mui/icons-material'
interface VenuePreviewProps {}

const VenuePreview = (props: VenuePreviewProps) => {
  const [fullScreen, setFullScreen] = useState(false)

  const { state } = useContext(VenuePreviewContext)

  return (
    <div className={styles.previewModal}>
      <Flex>
        <Flex style={{ flex: 1 }}>
          <Title order={4} color="#19407E" weight={300}>
            Preview {fullScreen ? 'Fullscreen' : 'Thumbnail'}
          </Title>
        </Flex>
        <Flex style={{ flex: 1 }} justify={'flex-end'}>
          <Switch
            checked={!fullScreen}
            onChange={(event) => setFullScreen(!event.currentTarget.checked)}
            styles={{
              root: {
                '& input:checked + label': {
                  backgroundColor: '#1F54E2',
                  border: '#1F54E2',
                },
              },
            }}
            defaultChecked
          />
        </Flex>
      </Flex>
      <Flex justify="center" pt="2rem">
        <Card shadow="sm" padding="xs" radius="md" withBorder>
          <Card.Section style={{ width: fullScreen ? '400px' : 'initial' }}>
            <Image
              src={
                state.photo?.value
                  ? state.photo?.value
                  : state.photo ?? 'https://placehold.co/240x160?text=Image'
              }
              width={'100%'}
              height={fullScreen ? 360 : 160}
              alt="Norway"
            />
          </Card.Section>
          <Group position="apart" mt="xs">
            <Text weight={500}>{state.name ? state.name : 'Venue'}</Text>
          </Group>
          <Group position="apart">
            <Text weight={300}>
              {state.address ? state.address : 'Addresss,'}
              {'  '}
              {state.suburb ? state.suburb : 'Suburb'}
              {'  '}
              {state.state ? state.state : 'State'}
            </Text>
          </Group>
          <Group position="apart">
            <span className={styles.location}>
              <LocationOn className={styles.locationIcon} />
              <span>View on Map</span>
            </span>
          </Group>
          <Group mt="xs">
            <Button
              variant="default"
              fullWidth
              rightIcon={<ArrowOutwardIcon fontSize="small" />}
            >
              View Details
            </Button>
          </Group>
        </Card>
      </Flex>
    </div>
  )
}

export default VenuePreview
