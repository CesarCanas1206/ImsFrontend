import React, { useContext } from 'react'
import { Pagination as PaginationUI } from '@mantine/core'
import DataGridContext from '../../../context/DataGridContext'

function Pagination() {
  const { filteredData, perPage, page, setPage, totalCount } =
    useContext(DataGridContext)

  if (typeof filteredData === 'undefined') {
    return <></>
  }

  const pages = Math.ceil(filteredData.length / perPage)

  if (totalCount <= perPage) {
    return <></>
  }

  const rowCount = filteredData.length
  const rowsPerPage = perPage
  const lastIndex = page * rowsPerPage
  const firstIndex = lastIndex - rowsPerPage + 1
  const range =
    page === pages
      ? `${firstIndex}-${rowCount} of ${rowCount}${
          rowCount !== totalCount ? ` (${totalCount})` : ''
        }`
      : `${firstIndex}-${lastIndex} of ${rowCount}${
          rowCount !== totalCount ? ` (${totalCount})` : ''
        }`

  return (
    <>
      <div style={{ marginTop: 5 }}>
        <PaginationUI
          total={pages}
          radius="md"
          value={page}
          onChange={setPage}
          withEdges
        />
      </div>
      <div style={{ marginTop: 5, marginBottom: 5 }}>{range}</div>
    </>
  )
}

export default Pagination
