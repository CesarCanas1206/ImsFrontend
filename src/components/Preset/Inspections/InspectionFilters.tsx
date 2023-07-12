import { Card } from '@mantine/core'
import { useEffect, useState } from 'react'
import Button from '../../Form/Button/Button'
import { DateUI } from '../../Form/Date/Date'
import Input from '../../Form/Input/Input'
import Stack from '../../UI/Stack/Stack'
import useOptions from '../../../hooks/useOptions'
import Select from '../../Form/Select/Select'
import Group from '../../UI/Group/Group'

export type FiltersType = {
  keyword?: string
  date?: string
  type?: string
}

interface IInspectionFilters {
  filters: FiltersType
  setFilters: (props: object) => void
}

function InspectionFilters({ filters, setFilters }: IInspectionFilters) {
  const changeFilterHandler = ({
    value,
    filter,
  }: {
    value?: string
    filter: string
  }) => setFilters({ ...filters, [filter]: value })

  const getOptions = useOptions()
  const [types, setTypes] = useState([])

  useEffect(() => {
    ;(async () =>
      setTypes(await getOptions({ endpoint: 'd/asset-type?sort_by=name' })))()
  }, [])

  return (
    <Card
      shadow="xs"
      style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
      radius="md"
    >
      <Group>
        Filter by keyword
        <Input
          value={filters.keyword}
          onChange={({ value }: { value: string }) =>
            changeFilterHandler({ filter: 'keyword', value })
          }
        />
        Filter by type
        <Select
          options={types}
          value={filters.type}
          onChange={({ value }: { value: string }) =>
            changeFilterHandler({ filter: 'type', value })
          }
        />
        Availability:
        <DateUI
          value={filters.date}
          onChange={({ value }: { value: string }) =>
            changeFilterHandler({ filter: 'date', value })
          }
        />
        <Button
          onClick={() => setFilters({ keyword: '' })}
          icon="broom"
          text="Clear filters"
        />
      </Group>
    </Card>
  )
}

export default InspectionFilters
