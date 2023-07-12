import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW1zYWNjb3VudCIsImEiOiJjaWhyYW52YXkwMDVmdWhrb3BiaHcxN3MxIn0.Lb1AE-8O1GXymIW-0dsqyA'

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

export function MapInteractive({
  address,
  height = 400,
  width,
  onClick,
  className,
  coordinates,
  style = { width: '100%' },
}: any) {
  const mapContainer = useRef<any>(null)
  const map = useRef<any>(null)
  const [lng, setLng] = useState(coordinates[0] ?? -70.9)
  const [lat, setLat] = useState(coordinates[1] ?? 42.35)
  const [zoom, setZoom] = useState(14)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })

    new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current)
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div style={{width:'100%', position: 'relative', flex: 1}}>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: 400, width: width ?? '100%' }}
      />
    </div>
  )
}

export default MapInteractive
