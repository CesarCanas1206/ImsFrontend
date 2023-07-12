import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import Loader from '../../UI/Loader/Loader'
import useDataset from '../../../hooks/useDataset'
import { Button, Flex, Menu, SegmentedControl } from '@mantine/core'
import VenueClash from '../VenueClash/VenueClash'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  PointElement,
  {
    id: 'doughnutCenter',
    afterDraw: (chart) => {
      if (chart.config.type !== 'doughnut' || !chart.options.showCenterText) {
        return
      }
      const ctx = chart.ctx // Canvas context handle
      const [first, second] = chart.config.data.datasets[0]?.data

      const { width, height } = chart
      const text = `${first}/${second}` // Set text to be displayed in the center
      ctx.save() // Save the current context state
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.font = 'bold 35px sans-serif' // Set font size and type
      ctx.fillStyle = 'rgba(54, 54, 54, 0.85)' // Set text color
      ctx.fillText(text, width / 2, height / 2 - 10) // Draw text in the center
      ctx.restore() // Restore the context state
    },
  },
)

export const settings = [
  {
    name: 'type',
    label: 'Type',
    type: 'Radios',
    options: [
      {
        name: 'Line',
        value: 'line',
      },
      {
        name: 'Bar',
        value: 'bar',
      },
      {
        name: 'Horizontal bar',
        value: 'horizontalBar',
      },
      {
        name: 'Pie',
        value: 'pie',
      },
      {
        name: 'Doughnut',
        value: 'doughnut',
      },
    ],
    default: 'line',
  },
  {
    name: 'dataset',
    label: 'Dataset',
    type: 'Select',
    endpoint: 'dataset',
    format: (row: any) => ({ name: row.name, value: row.id }),
    options: [],
  },
]

export interface IChart {
  type?: string
  dataset?: string
  mock?: boolean
  chart?: any
}

type ChartRef = HTMLCanvasElement | null
type Scale = { x: { min: number; max: number } }

function Chart({ type, dataset, mock, chart }: IChart) {
  const chartType = type || 'line'

  const [currentPage, setCurrentPage] = useState(0)

  const chartRef = useRef(null)
  const [scales, setScales] = useState<Scale>({
    x: {
      min: 0,
      max: 2,
    },
  })

  const handlePrevious = () => {
    setScales((s: Scale) => {
      return {
        x: {
          min: s.x.min - 1,
          max: s.x.max - 1,
        },
      }
    })
  }

  const handleNext = () => {
    setScales((s: Scale) => {
      return {
        x: {
          min: s.x.min + 1,
          max: s.x.max + 1,
        },
      }
    })
  }

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  const { data: chartData, isLoading } = useDataset({
    endpoint: dataset,
  })

  let options: any = {
    borderRadius: 4,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    datasets: {
      doughnut: {
        cutout: '70%',
      },
    },
  }

  if (chart.mock) {
    options = { ...options, ...chart.options }
  }

  const data = isLoading
    ? { labels: [], datasets: [] }
    : mock
    ? { labels: chart.noLabel ? [] : chart.labels, datasets: chart.datasets }
    : {
        labels: chartData.labels,
        datasets: [
          {
            id: 2,
            label: chartData.name ?? '',
            backgroundColor: [
              '#0263FF',
              '#1CCEF4',
              '#1A1C1E',
              '#ECEEF9',
              '#3B5D91',
              '#4C76E8',
            ],
            data: chartData.values,
          },
        ],
      }

  const outputChart = useMemo(() => {
    switch (chartType) {
      case 'bar':
        return (
          <Bar
            height={320}
            ref={chartRef}
            data={data}
            options={{ ...options, scales: scales }}
          />
        )
      case 'horizontalBar':
        return (
          <Bar
            ref={chartRef}
            data={data}
            options={{ ...options, indexAxis: 'y' }}
          />
        )
      case 'line':
        return <Line ref={chartRef} data={data} options={options} />
      case 'pie':
        return <Pie ref={chartRef} data={data} options={options} />
      case 'doughnut':
        return <Doughnut ref={chartRef} data={data} options={options} />
      default:
        return <Pie ref={chartRef} data={data} options={options} />
    }
  }, [data, options, chartType, chartRef])

  if (isLoading) {
    return <Loader size="200px" />
  }

  if (chartType === 'clash') {
    return <VenueClash data={chart.data} name={chart.name} />
  }

  return (
    <Suspense fallback="..">
      <Flex justify="space-between" pb="10">
        <Flex>
          <Button variant="default" compact style={{ border: 0 }}>
            <ChevronLeftIcon />
          </Button>
        </Flex>
        <Flex justify="center">
          <div
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'var(--c-link, #19407E)',
              marginBottom: 14,
            }}
          >
            {chart.name} - May 2023
          </div>
        </Flex>
        <Flex>
          <Button variant="default" compact style={{ border: 0 }}>
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex justify="center">
        <Menu
          shadow="md"
          width={200}
          styles={{
            dropdown: {
              maxHeight: 300,
              overflow: 'auto',
            },
          }}
        >
          <Menu.Target>
            <Button
              compact
              variant="default"
              style={{ border: 0, fontWeight: 'normal' }}
            >
              Venue <ExpandMoreIcon />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Venue 1</Menu.Item>
            <Menu.Item>Venue 2</Menu.Item>
            <Menu.Item>Venue 3</Menu.Item>
            <Menu.Item>Venue 4</Menu.Item>
            <Menu.Item>Venue 5</Menu.Item>
            <Menu.Item>Venue 6</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Flex>{outputChart}</Flex>
      {type === 'bar' ? (
        <Flex direction="row" justify="space-between">
          <Button
            variant="default"
            compact
            onClick={handlePrevious}
            style={{ border: 0 }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="default"
            compact
            onClick={handleNext}
            style={{ border: 0 }}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      ) : null}
      {chart.rangeTab ? (
        <Flex justify="center" mt="10px">
          <SegmentedControl
            fullWidth
            data={[
              { label: 'Today', value: 'today' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
              { label: 'Year', value: 'year' },
            ]}
            size="xs"
          />
        </Flex>
      ) : null}
    </Suspense>
  )
}

export default Chart
