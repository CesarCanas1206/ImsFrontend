import Chart from '../Chart/Chart'
import useAPI from '../../../hooks/useAPI'
import Heading from '../Heading/Heading'
import Row from '../Row/Row'
import Col from '../Col/Col'
import ModalButton from '../ModalButton/ModalButton'
import { Switch } from '../Switch/Switch'
import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Group from '../Group/Group'
import LoaderContent from '../LoaderContent/LoaderContent'
import Stack from '../Stack/Stack'
import Card from '../Card/Card'
import { faker } from '@faker-js/faker'
import { options } from '@fullcalendar/core/preact'
import DayAtGlance from '../DayAtGlance/DayAtGlance'

export interface IDashboardCharts {
  setCharts: (charts: any) => void
  filterCharts: (chart: any) => boolean
  activeTab: string
}

const dayAtGlance = {
  id: '40ac821e-8bdb-4617-b5a4-a8acca99246111',
  name: 'Today at a Glance',
}

const actionChartData: any[] = []

const insightsChartData = [
  {
    id: 'de73223888a-7b17-486b-80e8-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'doughnut',
    name: 'Maintenance',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        data: [20, 35, 45],
        backgroundColor: ['#0263FF', '#ECEEF9', '#1CCEF4'],
      },
    ],
    labels: ['Complete', 'Overdue', 'Current'],
    mock: true,
  },
  {
    id: 'de73888a-7b17-4333186b-80e8-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'bar',
    name: 'Maintenance',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        label: 'Urgent/Outstanding',
        data: [150],
        backgroundColor: '#0263FF',
      },
      {
        label: 'Overdue',
        data: [50],
        backgroundColor: '#ECEEF9',
      },
    ],
    labels: ['Time'],
    mock: true,
  },
  {
    id: '40ac821e-8bdb-463213217-b5a4-a8acca99246123',
    form_id: 'charts',
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-03-30T04:01:58.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-03-30T04:01:58.000000Z',
    updated_by: null,
    type: 'pie',
    dataset: 'participation-volunteers',
    name: 'Prime usage',
    get datasets() {
      return [
        {
          data: this.labels.map(() => faker.random.numeric(2)),
          backgroundColor: [
            '#0263FF',
            '#1CCEF4',
            '#1A1C1E',
            '#ECEEF9',
            '#3B5D91',
            '#4C76E8',
          ],
        },
      ]
    },
    labels: ['Competition', 'School Use', 'Casual Use', 'Training'],
    mock: true,
  },
  {
    id: '40ac821e-8bdb-4617-b5a421313-a8acca99246111',
    form_id: 'charts',
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-03-30T04:01:58.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-03-30T04:01:58.000000Z',
    updated_by: null,
    type: 'bar',
    dataset: 'participation-volunteers',
    name: 'Prime Usage Line',
    get datasets() {
      return [
        {
          id: 1,
          label: 'Casual',
          data: [10, 220, 100],
          backgroundColor: '#0263FF',
        },
        {
          id: 2,
          label: 'School',
          data: [30, 100, 400],
          backgroundColor: '#1A1C1E',
        },
        {
          id: 3,
          label: 'Training',
          data: [30, 100, 400],
          backgroundColor: '#ECEEF9',
        },
        {
          id: 4,
          label: 'Competition',
          data: [30, 100, 400],
          backgroundColor: '#1CCEF4',
        },
      ]
    },
    labels: [
      'September',
      'October',
      'November',
      'December',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    //noLabel: true,
    mock: true,
    backgroundColors: [
      '#0263FF',
      '#1CCEF4',
      '#1A1C1E',
      '#ECEEF9',
      '#3B5D91',
      '#4C76E8',
    ],
  },
  {
    id: 'de73888a-7b17-486b-80424124e8-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'bar',
    name: 'Prime Usage',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        label: 'Casual',
        data: [5],
        backgroundColor: '#0263FF',
      },
      {
        label: 'School',
        data: [10],
        backgroundColor: '#1CCEF4',
      },
      {
        label: 'Training',
        data: [100],
        backgroundColor: '#1A1C1E',
      },
      {
        label: 'Competition',
        data: [50],
        backgroundColor: '#ECEEF9',
      },
    ],
    labels: ['Time'],
    mock: true,
  },

  {
    id: 'de73888a-7b17-486b-80e82131231-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'doughnut',
    name: 'Seasonal Bookings',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ['#0263FF', '#1CCEF4'],
      },
    ],
    labels: ['Winter', 'Summer'],
    mock: true,
  },
  {
    id: 'de73888a-7b17-486b-801231231e8-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'bar',
    name: 'Seasonal Bookings',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        label: 'Winter',
        data: [50, 100],
        backgroundColor: '#0263FF',
      },
      {
        label: 'Summer',
        data: [100],
        backgroundColor: '#1CCEF4',
      },
    ],
    labels: ['Time'],
    mock: true,
  },
  {
    id: 'de73888a-7b17-486b-80e12312318-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'doughnut',
    name: 'Venue Occupancy',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ['#0263FF', '#ECEEF9'],
      },
    ],
    labels: ['Non Vacant', 'Vacant'],
    mock: true,
    options: {
      showCenterText: true,
    },
  },
  {
    id: 'de73888a-7b17-486b-80e4124148-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'bar',
    name: 'Venue Occupancy',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        label: 'Summer',
        data: [150],
        backgroundColor: '#0263FF',
      },
      {
        label: 'Winter',
        data: [50],
        backgroundColor: '#ECEEF9',
      },
    ],
    labels: ['Time'],
    mock: true,
  },
  {
    id: 'de73888a-7b17-486b-80e82312312-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'doughnut',
    name: 'Casual Bookings',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        data: [20, 35],
        backgroundColor: ['#0263FF', '#ECEEF9'],
      },
    ],
    labels: ['Pending', 'Received'],
    mock: true,
    rangeTab: true,
  },
  {
    id: 'de73888a-7b17-4812adsd6b-80ce8-123123123e422',
    mock: true,
    type: 'clash',
    name: 'Venue Clash',
    data: [
      {
        id: 1,
        first: {
          name: 'Venue 1',
          time: '10:00 - 12:00',
          date: '2021-01-01',
          hirer: {
            name: 'Hirer 1',
          },
        },
        second: {
          name: 'Venue 2',
          time: '10:00 - 12:00',
          date: '2021-01-01',
          hirer: {
            name: 'Hirer 2',
          },
        },
      },
      {
        id: 2,
        first: {
          name: 'Venue 10',
          time: '10:00 - 12:00',
          date: '2021-01-01',
          hirer: {
            name: 'Hirer 1',
          },
        },
        second: {
          name: 'Venue 10',
          time: '10:00 - 12:00',
          date: '2021-01-01',
          hirer: {
            name: 'Hirer 2',
          },
        },
      },
    ],
  },
  {
    id: 'de73888a-7b17-486b-80e21312318-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'doughnut',
    name: 'Inspections',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        data: [20, 35, 45],
        backgroundColor: ['#0263FF', '#ECEEF9', '#1CCEF4'],
      },
    ],
    labels: ['Outstanding', 'Overdue', 'Upcoming'],
    mock: true,
  },
  {
    id: 'de73888a-7b17-486b-80e8-e4df00384ae422',
    form_id: null,
    parent_id: null,
    specific_id: null,
    slug: 'charts',
    created_at: '2023-01-11T18:49:06.000000Z',
    created_by: 'dace1bfc-cf99-41e9-881b-15b5b55082e8',
    updated_at: '2023-01-11T18:49:06.000000Z',
    updated_by: null,
    type: 'bar',
    name: 'Inspections',
    hide: '0',
    dataset: 'participation',
    datasets: [
      {
        label: 'Outstanding',
        data: [150],
        backgroundColor: '#0263FF',
      },
      {
        label: 'Overdue',
        data: [50],
        backgroundColor: '#ECEEF9',
      },
      {
        label: 'Upcoming',
        data: [50],
        backgroundColor: '#1CCEF4',
      },
    ],
    labels: ['Time'],
    mock: true,
  },
]

function DashboardCharts({
  setCharts,
  filterCharts,
  activeTab,
}: IDashboardCharts) {
  const { get, put } = useAPI()
  const queryClient = useQueryClient()

  const { isLoading, data: charts } = useQuery(
    ['charts'],
    async () =>
      get({
        endpoint: 'd/charts',
      }),
    {
      staleTime: 60 * 1000,
    },
  )

  useEffect(() => {
    if (charts) {
      setCharts([
        dayAtGlance,
        ...actionChartData,
        ...insightsChartData,
        ...charts,
      ])
    }
  }, [charts])

  const changeHandler: any = async ({ name, value }: any) => {
    const hide = Number(value) === 0 || value === 'No' ? '1' : '0'
    await put({
      endpoint: `d/charts/${name}`,
      data: { hide },
    })
    return { id: name, hide }
  }

  const { mutate: updateToggle } = useMutation<any>(changeHandler, {
    onSuccess: ({ id, hide }: any) => {
      queryClient.setQueriesData(['charts'], (previous: any) =>
        previous.map((item: any) =>
          item.id === id ? { ...item, hide } : item,
        ),
      )
    },
  })

  if (isLoading) {
    return <LoaderContent noButton style={{ marginTop: 10 }} />
  }

  return (
    <>
      {/* <Group position="right" style={{ marginTop: 10 }}>
        <ModalButton
          icon="ellipsis"
          variant="secondary"
          tooltip="Toggle chart visibility"
          compact
        >
          <Heading text="Toggle charts" position="center" />
          <Stack>
            {charts?.map((chart: any) => (
              <Row
                key={chart.id}
                style={{
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <Col span="4" style={{ alignItems: 'center' }}>
                  <Heading
                    text={chart.name}
                    style={{
                      fontSize: 18,
                      width: 220,
                      margin: 0,
                    }}
                  />
                </Col>
                <Col span="4" style={{ alignItems: 'center' }}>
                  <Switch
                    checked={chart.hide !== '1' && chart.hide !== 'No'}
                    name={chart.id}
                    yesNo={false}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onChange={updateToggle}
                  />
                </Col>
              </Row>
            ))}
          </Stack>
        </ModalButton>
      </Group> */}
      <div
        style={{
          marginTop: 22,
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 32%))',
        }}
      >
        {activeTab === 'action' ? (
          <>
            {filterCharts(dayAtGlance) ? <DayAtGlance /> : null}
            {actionChartData.filter(filterCharts).map((chart: any) => (
              <React.Fragment key={chart.id}>
                {chart.hide !== '1' && (
                  <Card>
                    <Chart
                      type={chart.type}
                      dataset={chart.dataset}
                      mock={chart.mock}
                      chart={chart}
                    />
                  </Card>
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          insightsChartData.filter(filterCharts).map((chart: any) => (
            <React.Fragment key={chart.id}>
              {chart.hide !== '1' && (
                <Card>
                  <Chart
                    type={chart.type}
                    dataset={chart.dataset}
                    mock={chart.mock}
                    chart={chart}
                  />
                </Card>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </>
  )
}

export default DashboardCharts
