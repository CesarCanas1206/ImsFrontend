import { useState, useEffect, useReducer } from 'react'
import DateUI from '../../Form/Date/Date'
import Select from '../../Form/Select/Select'
import useAPI from '../../../hooks/useAPI'

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'from':
    case 'to':
    case 'asset':
      return {
        ...state,
        [action.type]: action.value,
      }
    default:
      throw new Error()
  }
}

export default function BookingReport() {
  const [filters, dispatch] = useReducer(reducer, {})
  const { get } = useAPI()
  const [assets, setAssets] = useState([])

  useEffect(() => {
    const run = async () => {
      const results = await get({
        endpoint: 'asset',
      })
      setAssets(results)
    }
    run()
  }, [])

  // Filters
  // Date from
  // Date to
  // Venue
  // Hirer?
  return (
    <>
      <DateUI
        onChange={(e: any) => dispatch({ type: 'from', value: e.value })}
        value={filters.from}
      />
      <DateUI
        onChange={(e: any) => dispatch({ type: 'to', value: e.value })}
        value={filters.to}
      />
      <Select
        onChange={(e: any) => dispatch({ type: 'asset', value: e.value })}
        data={assets.map((asset: any) => ({
          label: asset.name,
          value: asset.id,
        }))}
        value={filters.asset}
      />
      Booking component
    </>
  )
}
