import { useMemo, useState } from 'react'
import Button from 'src/components/Form/Button/Button'
import Toggle from 'src/components/Form/Toggle/Toggle'
import DashboardCharts from 'src/components/UI/DashboardCharts/DashboardCharts'
import Modal from 'src/components/UI/Modal/Modal'
import PageTitle from 'src/components/UI/PageTitle/PageTitle'
import Statistics from 'src/components/UI/Statistics/Statistics'
import { Switch } from '@mantine/core'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('action')
  const [showModal, setShowModal] = useState(false)

  const [charts, setCharts] = useState([])

  const [tempFilter, setTempFilter] = useState<string[]>([])

  const [filter, setFilter] = useState<string[]>([])

  const filterCharts = (chart: any) => !filter.includes(chart.id)

  return (
    <div>
      <PageTitle title="Dashboard">
        <Toggle
          value={activeTab}
          onChange={(tab: { name: string; value: string }) => {
            setActiveTab(tab.value)
          }}
          options={[
            { label: 'Action', value: 'action' },
            { label: 'Insights', value: 'insights' },
          ]}
        />
        <Button
          icon="Filter"
          variant="secondary"
          compact
          tooltip="Toggle settings modal"
          onClick={() => setShowModal(true)}
        ></Button>
      </PageTitle>
      <Modal
        title="Add / Hide Charts"
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
      >
        <div className={styles.container}>
          {charts.map((chart: any) => (
            <div key={chart.id} className={styles.showHidePanel}>
              <div>{chart.name}</div>
              <div>
                <Switch
                  checked={!tempFilter.includes(chart.id)}
                  value={chart.id}
                  onChange={(value) => {
                    if (!value.currentTarget.checked) {
                      setTempFilter((s) => [...s, chart.id])
                    } else {
                      setTempFilter((s) => s.filter((f) => f !== chart.id))
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <Button
            size="sm"
            text="Save"
            onClick={() => {
              setFilter(tempFilter)
              setShowModal(false)
            }}
          />
        </div>
      </Modal>

      <Statistics />
      <DashboardCharts {...{ setCharts, filterCharts, activeTab }} />
    </div>
  )
}

export default Dashboard
