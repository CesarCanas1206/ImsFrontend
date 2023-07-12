import {
  Card,
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import Button from '../../Form/Button/Button'
import { RangeDate } from '../../Form/RangeDate/RangeDate'
import Input from '../../Form/Input/Input'
import Stack from '../../UI/Stack/Stack'
import useOptions from '../../../hooks/useOptions'
import Select from '../../Form/Select/Select'
import Heading from '../../UI/Heading/Heading'
import DateTime from '../../Form/DateTime/DateTime'
import useCalculate from '../../../hooks/useCalculate'
import Group from 'src/components/UI/Group/Group'
import styles from './BookingList.module.css'
import { DatesRangeValue } from '@mantine/dates'
import dayjs from 'dayjs'

export type FiltersType = {
  keyword?: string
  date?: DatesRangeValue
  type?: string
}

interface IBookingFilters {
  filters: FiltersType
  setFilters: (props: object) => void
}

function BookingFilters({ filters, setFilters }: IBookingFilters) {
  const theme = useMantineTheme()

  const changeFilterHandler = ({
    value,
    filter,
  }: {
    value?: any
    filter: string
  }) => setFilters({ ...filters, [filter]: value })

  const getOptions = useOptions()
  const [types, setTypes] = useState([])

  useEffect(() => {
    ;(async () =>
      setTypes(
        await getOptions({
          endpoint: 'd/asset-type?sort_by=name&fields=id,name',
        }),
      ))()
  }, [])

  return (
    <Card
      shadow="xs"
      style={{
        width: '100%',
        overflow: 'visible',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: 0,
      }}
      radius="md"
    >
      <Stack>
        <Group>
          <Group className={styles.groupSearch}>
            <TextInput
              className={styles.searchInput}
              icon={<SearchIcon />}
              value={filters.keyword}
              radius="md"
              size="md"
              placeholder="Search By Keywords"
              onChange={({ target: { value } }) => {
                changeFilterHandler({ filter: 'keyword', value })
              }}
            />
          </Group>
          <Group>
            <RangeDate
              placeholder="Filter By Date"
              size="md"
              valueFormat="MM/DD/YY"
              onChange={(value) => {
                changeFilterHandler({ filter: 'date', value })
              }}
              value={filters.date!}
              w={250}
              minDate={new Date()}
            />
          </Group>
          <Group>
            <Select
              size="md"
              options={types}
              value={filters.type}
              placeholder={'Filter By Type'}
              onChange={({ value }: { value: string }) =>
                changeFilterHandler({ filter: 'type', value })
              }
            />
          </Group>
          <Button
            size="md"
            onClick={() => setFilters({ keyword: '', date: [], type: '' })}
            icon="broom"
            text="Clear filters"
          />
        </Group>
      </Stack>
    </Card>
  )
}

export default BookingFilters
