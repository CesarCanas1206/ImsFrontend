import { Table } from '@mantine/core'
import styles from './dayatglance.module.css'
import { useQuery } from 'react-query'
import { get } from 'src/hooks/useAPI'
import FormatTime from 'src/components/Function/FormatTime/FormatTime'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import Heading from '../Heading/Heading'

const data = [
  {
    id: 1,
    venue: 'The Venue',
    hirerName: 'Hirer Name',
    date: '2021-01-01',
    time: '10:00 AM - 11:00 AM',
    description: 'Description',
  },
  {
    id: 2,
    venue: 'The Venue 2',
    hirerName: 'Hirer Name 2',
    date: '2021-01-01',
    time: '10:00 AM - 11:00 AM',
    description: 'Description 2',
  },
  {
    id: 3,
    venue: 'The Venue 3',
    hirerName: 'Hirer Name 3',
    date: '2021-01-01',
    time: '10:00 AM - 11:00 AM',
    description: 'Description 3',
  },
]

interface DayAtGlanceProps {}
const DayAtGlance = (props: DayAtGlanceProps) => {
  const dayItems = useQuery({
    queryKey: 'dayItems',
    queryFn: async () => await get({ endpoint: 'booking/dashboard' }),
  })

  const rows =
    dayItems?.data?.map((item: any) => (
      <tr key={item.id}>
        <td>{item.asset?.name}</td>
        <td>{item.hirer?.name}</td>
        <td>
          <FormatDate text={item.start} />
        </td>
        <td>
          <FormatTime text={item.start} /> - <FormatTime text={item.end} />
        </td>
        <td>{item.title}</td>
      </tr>
    )) ?? []

  if (dayItems.isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.noData}>Loading for today..</div>
      </div>
    )
  }

  return (
    <>
      <Heading
        size={'h5'}
        style={{ marginTop: 0, marginBottom: 0, fontWeight: 700 }}
      >
        Today at a Glance
      </Heading>
      <div className={styles.wrapper}>
        {rows.length !== 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Venue</th>
                <th>Hirer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <div className={styles.noData}>Nothing on today..</div>
        )}
      </div>
    </>
  )
}

export default DayAtGlance
