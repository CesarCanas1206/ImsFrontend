import { lazy, Suspense } from 'react'
import { useQuery } from 'react-query'
const MapInteractive = lazy(() => import('../MapInteractive/MapInteractive'))

export const settings = [
  {
    name: 'address',
    label: 'Address',
    type: 'Input',
    default: '',
  },
  {
    name: 'height',
    label: 'Height',
    type: 'Input',
    default: '',
  },
  {
    name: 'width',
    label: 'Width',
    type: 'Input',
    default: '',
  },
]

export function Map({
  address,
  height = 400,
  width,
  onClick,
  className,
  interactive = false,
  style = { width: '100%' },
}: any) {
  const getMapCoords = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        address,
      )}.json?access_token=${accessToken}`,
    )
    const mapData = await response.json()
    return mapData.features[0].geometry.coordinates
  }

  const { data: coordinates } = useQuery([address], getMapCoords, {
    enabled: typeof address !== 'undefined' && address?.length > 4,
  })
  const accessToken =
    'pk.eyJ1IjoiaW1zYWNjb3VudCIsImEiOiJjaWhyYW52YXkwMDVmdWhrb3BiaHcxN3MxIn0.Lb1AE-8O1GXymIW-0dsqyA'

  if (!coordinates || !coordinates.length) {
    return <></>
  }

  if (interactive) {
    return (
      <Suspense>
        <MapInteractive coordinates={coordinates} width={width} />
      </Suspense>
    )
  }

  return (
    <>
      <img
        onClick={onClick}
        className={className}
        loading="lazy"
        alt="map"
        style={{ ...style, height, width }}
        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+2880ca(${coordinates.join(
          ',',
        )})/${coordinates.join(
          ',',
        )},14.5,0/${width}x${height}?access_token=${accessToken}`}
      />
    </>
  )
}

export default Map
