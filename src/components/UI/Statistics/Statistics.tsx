import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import useDataset from '../../../hooks/useDataset'
import LoadComponent from '../../LoadComponent/LoadComponent'
import Card from '../Card/Card'
import Loader from '../Loader/Loader'
import { useContext } from 'react'
import AppContext from 'src/context/AppContext'

const style: any = {
  color: 'var(--c-link, #19407E)',
  textAlign: 'center',
}

const StatisticsWrapper = ({ data, children }: any) =>
  data.link ? (
    <Link to={data.link ?? '/'} style={style}>
      {children}
    </Link>
  ) : (
    <div style={style}>{children}</div>
  )

function Statistics() {
  const { settings } = useContext(AppContext)
  const queryClient = useQueryClient()
  // const settings: any = queryClient.getQueryData(['settings'])

  const allQuery = useDataset({
    endpoint: 'dashboard/completed-allocations',
  })

  const allAQuery = useDataset({
    endpoint: 'dashboard/approved-allocations',
  })

  const pendingQuery = useDataset({
    endpoint: 'dashboard/completed-bookings',
  })
  const approvedQuery = useDataset({
    endpoint: 'dashboard/approved-bookings',
  })
  // const bondRefunds = useDataset({
  //   endpoint: 'bond-refunds',
  // })
  // const changeRequests = useDataset({
  //   endpoint: 'change-requests',
  // })
  // const incompleteBookings = useDataset({
  //   endpoint: 'incomplete-bookings',
  // })
  // const inspectionsDue = useDataset({
  //   endpoint: 'inspections-due',
  // })
  // const overdueMaintenance = useDataset({
  //   endpoint:
  //     'd/maintenance?completed=empty&due_date=<' +
  //     new Date().toISOString().split('T')[0] +
  //     '&due_date=!empty',
  // })
  // const seasonalRevenue = useDataset({
  //   endpoint: 'seasonal-revenue',
  // })
  // const casualRevenue = useDataset({
  //   endpoint: 'casual-revenue',
  // })
  // const primeUsage = useDataset({
  //   endpoint: 'prime-usage',
  // })

  const modules = Array.isArray(settings?.modules)
    ? settings.modules
    : JSON.parse(settings?.modules ?? '[]')

  const statisticsData = [
    {
      query: allQuery,
      value: allQuery?.data?.count ?? 0,
      name: 'Completed allocations',
      link: '/allocations',
      module: 'booking',
    },
    {
      query: allAQuery,
      value: allAQuery?.data?.count ?? 0,
      name: 'Approved allocations',
      link: '/allocations',
      module: 'booking',
    },
    {
      query: approvedQuery,
      value: approvedQuery?.data?.count ?? 0,
      name: 'Approved bookings',
      link: '/admin/approve-bookings',
      module: 'booking',
    },
    {
      query: pendingQuery,
      value: pendingQuery?.data?.count ?? 0,
      name: 'Pending approvals',
      link: '/admin/approve-bookings',
      module: 'booking',
    },
    // {
    //   value: bondRefunds?.data?.values?.length ?? 0,
    //   name: 'Pending bond refunds',
    //   module: 'booking',
    // },
    // {
    //   value: changeRequests?.data?.values?.length ?? 0,
    //   name: 'Change requests',
    //   module: 'booking',
    // },
    // {
    //   value: inspectionsDue?.data?.values?.length ?? 0,
    //   name: 'Inspections due',
    //   module: 'inspection',
    // },
    // {
    //   value: overdueMaintenance?.data?.values?.length ?? 0,
    //   name: 'Overdue maintenance',
    //   link: '/maintenance',
    //   module: 'maintenance',
    // },
    // {
    //   value: seasonalRevenue?.data?.values?.length ?? 0,
    //   name: 'Seasonal revenue',
    //   module: 'booking',
    // },
    // {
    //   value: casualRevenue?.data?.values?.length ?? 0,
    //   name: 'Casual revenue',
    //   module: 'booking',
    // },
    // {
    //   value: primeUsage?.data?.values?.length ?? 0,
    //   name: 'Prime usage',
    //   module: 'booking',
    // },
  ]
    .filter(
      (item: any) =>
        typeof item.module === 'undefined' ||
        item.module === '' ||
        modules.includes(item.module),
    )
    .map((item: any) => ({
      ...item,
      value: item.query?.isLoading ? (
        <Loader key={item.name} size="1.5rem" style={{ borderWidth: 3 }} />
      ) : (
        item.value
      ),
    }))

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      {statisticsData.map((data, idx: number) => {
        return (
          <LoadComponent
            component="Fragment"
            key={data.name}
            sub={[
              idx !== 0 && (
                <div
                  key={'divider' + data.name}
                  style={{ borderRight: '1px solid #ccc', margin: '10px 0' }}
                ></div>
              ),
              <StatisticsWrapper key={4 + data.name} data={data}>
                <LoadComponent
                  key={1}
                  component="Heading"
                  props={{
                    size: 'h1',
                    position: 'center',
                    style: { marginTop: 0, marginBottom: 0, fontWeight: 700 },
                  }}
                  sub={[data.value]}
                />
                <LoadComponent
                  key={2}
                  component="PlainText"
                  props={{
                    text: data.name,
                    style: {
                      fontSize: 14,
                      color: '#546e7a',
                      fontWeight: 500,
                    },
                  }}
                />
              </StatisticsWrapper>,
            ]}
          />
        )
      })}
    </Card>
  )
}

export default Statistics
