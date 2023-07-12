import React, { useState } from 'react'
import { Card } from '@mantine/core'
import { useMemo } from 'react'
import Map from '../../UI/Map/Map'
import Image from '../../UI/Image/Image'
import PlainText from '../../UI/PlainText/PlainText'
import Group from '../../UI/Group/Group'
import Stack from '../../UI/Stack/Stack'
import Heading from '../../UI/Heading/Heading'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Form from '../../Form/Form/Form'
import usePricing from '../../../hooks/usePricing'
import Row from '../../UI/Row/Row'
import Col from '../../UI/Col/Col'
import Modal from '../../UI/Modal/Modal'
import styles from './BookingList.module.css'
import Link from 'src/components/UI/Link/Link'
import Accordion from './Accordion'
import { Button } from '@mantine/core'
import { isEmpty } from 'src/utilities/strings'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import { useNavigate } from 'react-router-dom'

const sortAlphabeticallyByName = (a: any, b: any) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())

function Location({ asset }: any) {
  const [showModal, setShowModal] = useState(false)

  if (asset.suburb === undefined || asset.suburb === '') return null

  return (
    <Group>
      {showModal && (
        <Modal opened onClose={() => setShowModal(!showModal)}>
          <Map
            interactive
            address={`${asset.address}, ${asset.suburb} ${asset.state}`}
            width={700}
            height={400}
          />
        </Modal>
      )}
      <span
        className={styles.location}
        onClick={() => setShowModal(!showModal)}
      >
        <LocationOnOutlined className={styles.locationIcon} />
        <span>View on Map</span>
      </span>
    </Group>
  )
}

function AssetItemImages(asset: any) {
  return (
    <Card.Section style={{ marginTop: -20, position: 'relative' }}>
      <Image src={[asset.photo?.value ?? asset.photo]} height="200" gallery />
    </Card.Section>
  )
}

function AssetAvailabilityStatus({ clashes, assetId }: any) {
  // if (typeof clashes === 'undefined') {
  //   return <span>Checking availabilty...</span>
  // }
  clashes = []
  const isAvailable = !clashes?.includes(assetId)

  return (
    <span style={{ color: isAvailable ? 'green' : 'red' }}>
      {isAvailable ? 'Available' : 'Unavailable'}
    </span>
  )
}

function BookingAssetListItem({
  asset,
  sub,
  clashes,
  filters,
  summary = true,
  // setCurrentItem,
  updateUsageCart,
  style,
}: any) {
  const { getPricing } = usePricing()
  const [pricing, setPricing] = useState<any>([])

  const navigate = useNavigate()
  const detailsHandler = (asset: any) => {
    navigate(`/bookings/${asset.id}`)
  }

  const bookingForm = useMemo(() => {
    const run = async () => {
      const tmpPricing = await getPricing({
        asset,
        // assetId: asset.id,
        customerType: '072b29ec-35d3-4324-a306-f229d2aafea5',
        bookingCategory: '12a90966-a77a-4e4e-96e2-11d6f8eeb773',
      })
      setPricing(tmpPricing)
    }
    run()

    // console.log(asset)
    // console.log(pricing)

    //   const price =
    //   typeof asset.pricing !== 'undefined'
    //     ? Array.isArray(asset.pricing) && asset?.pricing[0]?.rate
    //     : asset?.price
    // let hours = calculateHours(booking)

    // const bookHandler = async () => {
    //   const savedBooking = await post({
    //     endpoint: 'd/booking',
    //     data: {
    //       user_id: userId,
    //       ...booking,
    //       hours,
    //       price: price ?? 25,
    //       total: hours * Number(price ?? 25),
    //       approved: 0,
    //     },
    //   })

    return (
      // pricing && (
      <ModalButtonForm
        text="Request booking"
        size="xl"
        formId="casualusage-public"
        itemId="new"
        defaultValues={{
          asset_id: asset.id,
          title: asset.name ?? '',
          date: filters?.date?.[0] ?? '',
        }}
        onSave={(saveData: any) => {
          updateUsageCart(saveData)
        }}
        skipSave
      >
        <Heading>{asset.name}</Heading>
      </ModalButtonForm>
      //   <ModalButton text="Request booking" size="xl">
      //   {({ onClose }: any) => (
      //     <>
      //       <Heading>{asset.name}</Heading>
      //       <BookingAssetListUsage asset={asset} onClose={onClose} />
      //       {/* <BookingAssetListApplication asset={asset} /> */}
      //     </>
      //   )}
      // </ModalButton>
      // )
    )
  }, [asset])

  if (sub) {
    return (
      <>
        <Stack mt="lg">
          <Group position="apart">
            <Heading size="h6" style={{ margin: 0, fontSize: 14 }}>
              {asset.name}
            </Heading>
            <Group>
              {!isEmpty(filters?.date) &&
                asset.bookable === 'Yes' &&
                !clashes?.includes(asset.id) && (
                  <>
                    <AssetAvailabilityStatus
                      assetId={asset.id}
                      clashes={clashes}
                    />
                    {bookingForm}
                  </>
                )}
            </Group>
          </Group>
        </Stack>
        {typeof asset.assets?.sort !== 'undefined' && (
          <div style={{ marginLeft: 30 }}>
            {asset.assets
              ?.filter((subAsset: any) => !isEmpty(subAsset.bookable))
              ?.sort(sortAlphabeticallyByName)
              .map((subAsset: any) => (
                <BookingAssetListItem
                  key={subAsset.id}
                  clashes={clashes}
                  sub
                  asset={subAsset}
                  filters={filters}
                  updateUsageCart={updateUsageCart}
                />
              ))}
          </div>
        )}
      </>
    )
  }
  return (
    <Card shadow="xs" radius="md" withBorder className={styles.card}>
      <AssetItemImages {...asset} />
      <Stack mt="lg">
        <Link to={`/bookings/${asset.id}`}>
          <Heading size="h6" style={{ margin: 0 }}>
            <Group position={'apart'} className={styles.title}>
              {asset.name}
              {/* {asset.bookable === '1' && bookingForm} */}
            </Group>
          </Heading>
        </Link>
        <Heading size="h6" style={{ margin: 0 }}>
          <Group position={'apart'} className={styles.address}>
            {asset['asset-type']?.name}

            {typeof asset.suburb !== 'undefined' && asset.suburb !== '' && (
              <div>
                {asset.address}, {asset.suburb} {asset.state}
              </div>
            )}
          </Group>
          <Location asset={asset} />
        </Heading>
        {!summary && asset.description !== '' && (
          <PlainText text={asset.description} />
        )}
      </Stack>
      {asset.assets && (
        <>
          <Accordion
            style={{ marginTop: 5 }}
            labels={[
              `Hireable (${asset.assets.length})`,
              'Facilities',
              'Equipment',
            ]}
            values={['Hireable', 'f', 'e']}
            items={[
              <div
                key="1"
                style={{
                  // display: 'grid',
                  // gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  // marginTop: 10,
                }}
              >
                {asset.assets
                  .sort(sortAlphabeticallyByName)
                  .map((subAsset: any) => (
                    <BookingAssetListItem
                      key={subAsset.id}
                      clashes={clashes}
                      sub
                      filters={filters}
                      asset={subAsset}
                      updateUsageCart={updateUsageCart}
                    />
                  ))}
              </div>,
              'Facilities',
              'Equipment',
            ]}
          />
        </>
      )}
      <div className={styles.mt1}>
        {summary && (
          <Button
            className={styles.btn_details}
            variant="default"
            fullWidth
            rightIcon={<ArrowOutwardIcon fontSize="small" />}
            onClick={() => detailsHandler(asset)}
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  )
}

export default BookingAssetListItem
