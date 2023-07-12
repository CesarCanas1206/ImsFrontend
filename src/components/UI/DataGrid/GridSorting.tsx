import React, { useContext, useMemo } from 'react'
import DataGridContext from '../../../context/DataGridContext'
import Group from '../Group/Group'
import Select from '../../Form/Select/Select'

function GridSorting() {
  const { sorting, filters, filterHandler } = useContext(DataGridContext)

  const data = useMemo(() => {
    if (typeof sorting === 'undefined' || sorting.length === 0) {
      return []
    }
    return (
      typeof sorting.map !== 'undefined' ? sorting : JSON.parse(sorting)
    )?.map((item: any) => ({
      label: item.name,
      value: item.key,
    }))
  }, [sorting])

  if (typeof sorting === 'undefined' || sorting.length === 0) {
    return <></>
  }

  return (
    // <Group position="left" style={{ marginBottom: 10 }}>
    <Select
      value={filters?.sort ?? ''}
      data={data}
      placeholder="Sort by..."
      onChange={({ value }: any) => filterHandler('sort', value)}
    />
    // </Group>
  )
}

export default GridSorting
