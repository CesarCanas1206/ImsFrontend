import React, { createContext, useState, useEffect } from 'react'

import useAPI from '../hooks/useAPI'

interface ICardContext {
  capacityFilter: any
  setCapacityFilter: any
  venue: any
  setVenue: (val: string) => void
  keyword: string
  setKeyword: (val: string) => void
  isLoading: any
  setIsLoading: (val: boolean) => void
  filter: any
  setFilter: (val: object[]) => void
  filters: any
  setFilters: (val: object) => void
  suburbs: any
  setSuburbs: (val: object[]) => void
  assets: any
}
export const CardContext = createContext<ICardContext>({
  capacityFilter: '',
  setCapacityFilter: () => {},
  venue: '',
  setVenue: () => {},
  keyword: '',
  setKeyword: () => {},
  isLoading: true,
  setIsLoading: () => {},
  filter: '',
  setFilter: () => {},
  filters: '',
  setFilters: () => {},
  suburbs: '',
  setSuburbs: () => {},
  assets: [],
})

export function CardContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [capacityFilter, setCapacityFilter] = useState<string>('')
  const [venue, setVenue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { get } = useAPI()

  const [filters, setFilters] = useState<any>({
    name: '',
  })
  const [filter, setFilter] = useState<object[]>([])
  const [assets, setAssets] = useState<object[]>([])
  const [suburbs, setSuburbs] = useState<object[]>([])

  useEffect(() => {
    const loadAsset = async () => {
      setIsLoading(true)
      const data: any = await get({ endpoint: 'asset?bookable=!empty' })
      setAssets(data)
      setFilter(data)
      setSuburbs(
        data
          .filter(
            (a: any) => typeof a.suburb !== 'undefined' && a.suburb !== '',
          )
          .map((a: any) => ({
            value: a.suburb,
            label: a.suburb,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label)),
      )
      setIsLoading(false)
    }
    loadAsset()
  }, [])

  useEffect(() => {
    if (filters.name === '') {
      setFilter(assets)
      return
    }
    setFilter(assets.filter((i: any) => i.name.includes(filters.name)))
  }, [filters, assets])

  return (
    <CardContext.Provider
      value={{
        setVenue,
        capacityFilter,
        venue,
        keyword,
        setCapacityFilter,
        setKeyword,
        filter,
        setFilter,
        filters,
        setFilters,
        suburbs,
        setSuburbs,
        assets,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export default CardContext
