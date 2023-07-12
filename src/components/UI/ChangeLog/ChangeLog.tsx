import React from 'react'
import useAPI from '../../../hooks/useAPI'
import { useQuery } from 'react-query'
import Skeleton from '../Skeleton/Skeleton'
import FormatDate from '../../Function/FormatDate/FormatDate'
import { ScrollArea, Table } from '@mantine/core'

interface IChangeLog {
  itemId?: string
}

const ucFirst = (str: string) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1).replace(/_/g, ' ')
}

function ChangeLog({ itemId = 'club1' }: IChangeLog) {
  const { get } = useAPI()
  const { data, isLoading } = useQuery(
    ['dates', itemId],
    async () => await get({ endpoint: `history/${itemId}/log` }),
    // { select: (data: any) => data.reverse() },
  )

  if (isLoading) {
    return (
      <>
        <Skeleton width={'100%'} height={40} mb={40} />
        <Skeleton width={'100%'} height={40} />
      </>
    )
  }

  return (
    <ScrollArea.Autosize maxHeight={250}>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Date/User</th>
            <th>Reference</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td width={130}>
                <FormatDate date={item.created_at} />
                <div>{item.created_by_name}</div>
              </td>
              <td>{ucFirst(item.reference)}</td>
              <td>{item.value?.to ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea.Autosize>
  )
}

export default ChangeLog
