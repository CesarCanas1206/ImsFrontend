import React, { useContext, useEffect, useRef, useState } from 'react'
import Icon from '../Icon/Icon'
import DataGridContext from '../../../context/DataGridContext'
import Group from '../Group/Group'
import Input from '../../Form/Input/Input'
import GridSorting from './GridSorting'
import Toggle from 'src/components/Form/Toggle/Toggle'
import { useNavigate } from 'react-router-dom'
import { get } from 'src/hooks/useAPI'

function SearchFilter({ hideSearch = false, onlySearch = false }: any) {
  const { sorting, filter, filters, filterHandler, setFilters, filterFields } =
    useContext(DataGridContext)
  const navigate = useNavigate()
  const [data, setData] = useState<any>()
  const ref = useRef(0)

  useEffect(() => {
    if (ref.current) {
      return
    }
    ref.current = 1
    const run = async () => {
      const endpoints = filterFields
        ?.filter((field: any) => field?.endpoint && field?.key)
        .map((field: any) => field?.endpoint)

      const results = await Promise.all(
        endpoints.map(async (endpoint: any) => {
          const result = await get({ endpoint })
          return [endpoint, result]
        }),
      )

      setData(
        filterFields.map((field: any) => {
          if (field?.endpoint && (field?.key || field?.column)) {
            field.options = []
            const result = results.find(
              (result: any) => result[0] === field.endpoint,
            )

            const columns = result[1]
              .map((m: any) => {
                const value = field?.conditions[0]?.value ?? field.key

                return {
                  column: m[field?.column ?? field.key],
                  value: m[value],
                }
              })
              .filter((f: any) => f !== '')
              .sort((a: any, b: any) => (a.column > b.column ? 1 : -1))
            const unique = [...new Set(columns)]
            field.options = unique.map((opt: any) => {
              const value = opt.column.replace(' ', '_')
              const onCondition = field?.conditions[0]?.on ?? field.key
              const type = field?.conditions[0]?.type ?? '='
              const valCondition = field?.conditions[0]?.value
                ? opt.value
                : value
              return {
                label: opt.column.charAt(0).toUpperCase() + opt.column.slice(1),
                value: value,
                conditions: [
                  {
                    on: onCondition,
                    type: type,
                    value: valCondition,
                  },
                ],
              }
            })
          }
          return field
        }),
      )
    }
    run()
  }, [])

  if (typeof filter !== 'undefined' && Boolean(filter) === false) {
    return <></>
  }

  const resetFilters = () => {
    setFilters((current: any) => ({
      sort: current.sort,
      search: current.search,
    }))
  }

  const hasSorting = typeof sorting !== 'undefined' && sorting?.length !== 0
  const hasFilters =
    typeof data !== 'undefined' &&
    typeof data?.length !== 'undefined' &&
    data?.length !== 0

  // const isFiltering =
  //   hasFilters &&
  //   data.filter(
  //     (field: any) =>
  //       typeof filters[field.key] !== 'undefined' && filters[field.key] !== '',
  //   ).length !== 0

  return (
    <>
      {hasSorting && !onlySearch && <GridSorting />}
      {hasFilters && !onlySearch && (
        <>
          {data?.map((field: any, idx: number) => (
            <Toggle
              key={field.key}
              options={field?.options}
              value={filters[field.key]?.value}
              onChange={({ value }: any) => {
                const opt = field?.options.find(
                  (opt: any) => opt.value === value,
                )
                if (typeof opt?.link !== 'undefined') {
                  console.log('navigate to ' + opt.link)
                  navigate(opt.link)
                  return
                }
                filterHandler(field.key, {
                  value,
                  conditions: opt?.conditions ?? [],
                })
              }}
            />
          ))}
        </>
      )}
      {!hideSearch && (
        <Group position="right" style={{ marginLeft: 'auto' }}>
          <Input
            icon={<Icon type="search"></Icon>}
            rightSection={
              filters?.search &&
              filters?.search !== '' && (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => filterHandler('search', '')}
                >
                  <Icon type="close"></Icon>
                </div>
              )
            }
            value={filters?.search}
            onChange={({ value }: any) => filterHandler('search', value)}
            onKeyUp={(e: any) =>
              e.key === 'Escape' && filterHandler('search', '')
            }
            placeholder="Search"
          />
        </Group>
      )}
    </>
  )
}

export default SearchFilter
