import { useState } from 'react'
import Card from 'src/components/UI/Card/Card'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Heading from '../../UI/Heading/Heading'
import BookingFilters, { FiltersType } from './BookingFilters'
import BookingLoadingSkeleton from './BookingLoadingSkeleton'
import BookingAssetListItem from './BookingAssetListItem'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import { useLocation, useParams } from 'react-router-dom'
import BackButton from 'src/components/UI/BackButton/BackButton'
import Space from 'src/components/UI/Space/Space'
import Stack from 'src/components/UI/Stack/Stack'
import Group from 'src/components/UI/Group/Group'
import Badge from 'src/components/UI/Badge/Badge'
import FormatTime from 'src/components/Function/FormatTime/FormatTime'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import ModalButton from 'src/components/UI/ModalButton/ModalButton'
import { isEmpty } from 'src/utilities/strings'
import {
  storageGetArray,
  storageSet,
  storageRemove,
} from '../../../utilities/localStorage'
import Button from 'src/components/Form/Button/Button'
import { uuid, recursiveNameBuilder, flattenArray } from 'src/utilities/strings'

const sortAlphabeticallyByName = (a: any, b: any) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())

function UsageCartItems({ usageCart, assets, removeUsage }: any) {
  const flattenAssets = flattenArray(assets, 'assets').sort((a: any, b: any) =>
    a.name > b.name ? 1 : -1,
  )
  return (
    <Stack mt={10}>
      {!isEmpty(usageCart) &&
        usageCart?.map((booking: any, index: number) => {
          const asset = flattenAssets?.find(
            (f: any) => f.id === booking.asset_id,
          )
          const assetName = recursiveNameBuilder(flattenAssets, asset.id)

          return (
            <Card
              shadow="xs"
              radius="md"
              p="sm"
              key={uuid()}
              style={{ alignSelf: 'stretch', minWidth: '100%' }}
            >
              <Group position="apart" style={{ margin: 0, marginBottom: 2 }}>
                <Group>
                  <Stack>
                    <Heading size="h6">{assetName}</Heading>
                    <Badge>{booking.title}</Badge>
                    <Badge>
                      Date/Time:{' '}
                      <FormatDate date={booking.date} format="D MMMM YYYY" />
                      {' - '}
                      <FormatTime date={booking.start} format="h:mmA" />
                      {' to '}
                      <FormatTime date={booking.end} format="h:mmA" />
                    </Badge>
                  </Stack>
                </Group>
                <Button icon="trash" onClick={() => removeUsage(index)} />
              </Group>
            </Card>
          )
        })}
    </Stack>
  )
}

function BookingList() {
  const { get, post } = useAPI()
  const [filters, setFilters] = useState<FiltersType>({})
  const [usageCart, setUsageCart] = useState<any>(storageGetArray('usage'))

  const emptyUsageCart = () => {
    storageRemove('usage')
    setUsageCart([])
  }

  const updateUsageCart = (saveData: any) => {
    let updatedData = storageGetArray('usage')
    updatedData.push(saveData)
    setUsageCart(updatedData)
    storageSet('usage', updatedData)
  }

  const removeUsage = (index: number) => {
    let updatedData = storageGetArray('usage')
    updatedData.splice(index, 1)
    setUsageCart(updatedData)
    storageSet('usage', updatedData)
  }

  const createBooking = () => { }
  // const { search } = useLocation()
  // const params = useMemo(() => new URLSearchParams(search), [search])
  const params = useParams<any>()
  // const [currentItem, setCurrentItem] = useState<any>(
  //   window.location.hash.replace('#', ''),
  // )
  // useEffect(() => {
  //   setCurrentItem(window.location.hash.replace('#', ''))
  // }, [window.location.hash])

  // console.log(currentItem)

  // const hash = useMemo(() => window.location.hash, [window.location.hash])

  // const viewListing = params.has('id')

  const { data: assets, isLoading } = useQuery(
    ['booking-list'],
    async () => get({ endpoint: 'bookings' }),
    {
      select: (data: any) =>
        typeof data.sort !== 'undefined'
          ? data?.sort(sortAlphabeticallyByName)
          : [],
    },
  )

  const { data: clashes } = useQuery(
    ['availability', filters?.date],
    async () => {
      const startDate = filters?.date?.[0]
      const endDate = filters?.date?.[1]

      return await post({
        endpoint: 'check/clash',
        // endpoint: `check/clash?start=${dayjs(startDate).format(
        //   'YYYY-MM-DD',
        // )}&end=${dayjs(endDate).format('YYYY-MM-DD')}`,
        data: {
          start: dayjs(startDate).format('YYYY-MM-DD'),
          end: dayjs(endDate).format('YYYY-MM-DD'),
        },
      })
    },
    {
      enabled:
        typeof filters?.date !== 'undefined' && filters?.date?.[1] !== null,
    },
  )

  if (isLoading) {
    return <BookingLoadingSkeleton />
  }

  let filteredAssets = assets

  const keywordFilter = (asset: any) =>
    filters?.keyword === '' ||
    asset.name.toLowerCase().includes(filters?.keyword?.toLowerCase()) ||
    asset?.assets?.find(keywordFilter)

  const typeFilter = (asset: any) =>
    filters?.type === '' ||
    asset['asset-type-id'] === filters?.type ||
    asset?.assets?.find(typeFilter)

  if (filters?.type) {
    filteredAssets = filteredAssets.filter(typeFilter)
  }

  if (filters?.keyword) {
    filteredAssets = filteredAssets.filter(keywordFilter)
  }

  if (typeof params.asset_id !== 'undefined') {
    return (
      <>
        <BackButton />
        <Space h="sm" />
        <div
          style={{
            width: 800,
            margin: '0 auto',
            maxWidth: '100%',
          }}
        >
          {filteredAssets
            .filter((asset: any) => asset.id === params.asset_id)
            .map((asset: any) => (
              <BookingAssetListItem
                key={asset.id}
                asset={asset}
                filters={filters}
                clashes={clashes}
                summary={false}
                updateUsageCart={updateUsageCart}
              />
            ))}
        </div>
      </>
    )
  }

  return (
    <>
      <Group position="apart">
        {![null, undefined].includes(filters?.date?.[1] as any) ? (
          <Heading>
            Checking:{' '}
            <FormatDate date={filters?.date?.[0] as unknown as string} /> -{' '}
            <FormatDate date={filters?.date?.[1] as unknown as string} />
          </Heading>
        ) : (
          <div></div>
        )}
        {!isEmpty(usageCart) && (
          <Group align="flex-end" style={{ marginBottom: 5 }}>
            <ModalButton
              icon="ShoppingCart"
              text={`Cart (${usageCart.length})`}
            >
              {({ onClose }: any) => (
                <>
                  <Heading>Selected Usage</Heading>
                  <UsageCartItems
                    usageCart={usageCart}
                    assets={filteredAssets}
                    removeUsage={removeUsage}
                  />
                  <Group position="right" style={{ marginTop: 5 }}>
                    <Button
                      text="Create booking"
                      onClick={() => {
                        onClose()
                        createBooking()
                      }}
                    />
                    <Button text="Empty cart" onClick={emptyUsageCart} />
                  </Group>
                </>
              )}
            </ModalButton>
          </Group>
        )}
      </Group>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <BookingFilters filters={filters} setFilters={setFilters} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
        <div
          style={{
            width: '100%',
            // maxWidth: 640,
            // display: 'flex',
            display: 'grid',
            // flexDirection: 'column',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'start',
          }}
        >
          {filteredAssets.length === 0 && (
            <Card shadow="xs" p="lg" style={{ textAlign: 'center' }}>
              No results found.
            </Card>
          )}
          {/* {params?.has('id') && <>{params.get('id')}</>} */}
          {filteredAssets?.map((asset: any) => (
            <BookingAssetListItem
              key={asset.id}
              clashes={clashes?.clashes}
              asset={asset}
              filters={filters}
              updateUsageCart={updateUsageCart}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default BookingList
