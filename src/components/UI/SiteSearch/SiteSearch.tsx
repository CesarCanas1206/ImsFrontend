import { Input } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

interface ICol {
  span: string
  className: string
  style?: string
  children: any
  sub: any[]
}

export function SiteSearch({ span, className, style, children, sub }: ICol) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { get } = useAPI()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim() === '') {
        setResults([])
        return
      }
      console.log(`Searching for ${search.trim()}`)
      const tmpResults = await get({
        endpoint: `dataset/site-search/data?name=%${search.trim()}`,
      })
      setResults(tmpResults.slice(0, 10) || [])
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [get, search])

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.key !== '/') {
        return
      }
      ref?.current?.focus()
    }
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return (
    <>
      <div
        className="d-flex justify-content-center mb-2 mx-auto position-relative"
        style={{ maxWidth: '230px', width: '100%' }}
      >
        <Input
          icon={
            <DynamicComponent
              key="b"
              component="Icon"
              props={{ type: 'search' }}
            />
          }
          ref={ref}
          placeholder="Search clients, sites, users"
          rightSectionWidth={48}
          value={search}
          onChange={({ target }: any) => setSearch(target.value)}
          onKeyUp={(e: any) => e.key === 'Escape' && setSearch('')}
          rightSection={
            search !== '' && (
              <DynamicComponent
                key="c"
                component="Icon"
                props={{
                  type: 'close',
                  pointerEvents: 'all',
                  style: { cursor: 'pointer' },
                  onClick: () => setSearch(''),
                }}
              />
            )
          }
        />
        {search !== '' && results?.length !== 0 && (
          <div
            className="list-group position-absolute w-100"
            style={{ marginTop: 38 }}
          >
            {results?.map((result: any) => (
              <button
                key={result.id}
                className="list-group-item list-group-item-action"
              >
                {result.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {children}
    </>
  )
}

export default SiteSearch
