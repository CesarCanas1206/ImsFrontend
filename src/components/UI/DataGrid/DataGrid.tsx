import React, {
  lazy,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import { useViewportSize } from '@mantine/hooks'
import { textReplace } from '../../DynamicComponent/textReplace'
import CardGrid from './CardGrid'
import SearchFilter from './SearchFilter'
import LoaderContent from '../LoaderContent/LoaderContent'
import DataGridContext from '../../../context/DataGridContext'
import PageContext from 'src/context/PageContext'
import { runFilter } from './runFilter'
import useDataGridQuery from 'src/hooks/useDataGridQuery'

const DataTable = lazy(() => import('react-data-table-component'))

export const settings = [
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
    default: 'asset',
  },
  {
    name: 'columns',
    label: 'Columns',
    type: 'Json',
    default: '[{"name":"Id","key":"id"},{"name":"Name","key":"name"}]',
  },
  {
    name: 'filters',
    label: 'Grid filters',
    type: 'Json',
  },
  {
    name: 'sorting',
    label: 'Sorting',
    type: 'Json',
  },
  {
    name: 'card_grid',
    label: 'Card grid',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 0,
      },
      {
        name: 'Yes',
        value: 1,
      },
    ],
  },
]

const customStyles: any = {
  headRow: {
    style: {
      minHeight: '36px',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#337ab7',
      color: '#fff',
      fontSize: '14px',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderRight: '1px solid #fff',
      '&:first-of-type': {
        borderLeft: '1px solid rgba(0,0,0,.12)',
      },
      '&:last-of-type': {
        borderRight: '1px solid rgba(0,0,0,.12)',
      },
    },
  },
  cells: {
    style: {
      '&:first-of-type': {
        borderLeft: '1px solid rgba(0,0,0,.12)',
      },
      fontSize: '13px',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderRight: '1px solid rgba(0,0,0,.12)',
    },
  },
}

const getColumns = (columns: any, initialRow?: any) => {
  if (typeof columns === 'string') {
    columns = JSON.parse(columns)
  }
  return columns.map((col: any) => {
    if (typeof col.components !== 'undefined') {
      col.sub = col.components
    }
    if (typeof col.element === 'function') {
      col.selector = (row: any) => col.element(row)
    } else if (typeof col.sub !== 'undefined') {
      col.selector = (row: any) => (
        <DynamicComponent
          key={row.id}
          component="Fragment"
          sub={col.sub}
          row={{ ...initialRow, ...row }}
        />
      )
    } else {
      col.selector = (row: any) =>
        typeof col.element === 'undefined'
          ? row[col.key] ??
            textReplace(
              { colLabel: col.key.includes('{') ? col.key : `{${col.key}}` },
              row,
              true,
            )?.colLabel
          : col.element
    }
    //added in link, using textReplace
    if (typeof col?.link !== 'undefined' && col?.link.includes('{')) {
      col.linkTo = (row: any) =>
        typeof col.element === 'undefined'
          ? row[col.link] ??
            textReplace({ colLink: col.link }, row, true)?.colLink
          : col.element
    }
    col.reference = col.key
    col.sortable = col.sortable ?? true

    return {
      ...col,
      badgeColor: col.badgeColor ?? 'cyan',
    }
  })
}

interface IDataGrid {
  endpoint?: string
  columns?: object
  no_results?: object[]
  row?: any
  className?: any
  responsive?: boolean
  filter?: boolean | string
  children?: any
  position?: any
  csv?: boolean
  card_grid?: boolean | string
  compact?: boolean | string
  filters?: any
  sorting?: any
  queryOverride?: any
  titleSub?: any
}

export function DataGrid({
  endpoint = 'asset',
  columns: defaultColumns,
  row: initialRow,
  className,
  responsive = true,
  filter = true,
  children,
  position = 'top',
  card_grid = true,
  filters: filterFields = [],
  sorting = [],
  csv = false,
  compact,
  titleSub,
  queryOverride,
  no_results = [{ component: 'Alert', text: 'No results found.' }],
  ...otherProps
}: IDataGrid) {
  const { width } = useViewportSize()
  const [perPage] = useState(25)
  const [page, setPage] = useState(1)
  const { registerAction, removeAction } = useContext(PageContext)
  const initialFilters =
    filterFields &&
    Object.fromEntries(
      filterFields
        ?.filter((field: any) => typeof field.default !== 'undefined')
        ?.map((field: any) => [
          field.key,
          {
            value: field.default,
            conditions: field?.options?.find(
              (opt: any) => opt.value === field.default,
            )?.conditions,
          },
        ]),
    )
  const [filters, setFilters] = useState<any>({
    ...initialFilters,
    search: '',
    sort:
      typeof sorting?.find !== 'undefined'
        ? sorting.find((sort: any) => typeof sort.default !== 'undefined')
            ?.key ??
          sorting[0]?.key ??
          ''
        : '',
  })
  const [filteredData, setFilteredData] = useState<any>([])

  useEffect(() => {
    const action = {
      id: endpoint,
      ref: 'DataGrid',
      action: refetch,
    }
    registerAction(action)

    return () => {
      removeAction(action)
    }
  }, [])

  const columns = useMemo(
    () =>
      getColumns(
        defaultColumns ?? [
          {
            name: 'Name',
            key: 'name',
          },
        ],
        { ...otherProps, ...initialRow },
      ),
    [defaultColumns, initialRow, otherProps],
  )

  const { data, isLoading, refetch, isSuccess, isFetching } =
    queryOverride ??
    useDataGridQuery({
      endpoint,
      setFilteredData,
      filters,
    })

  const runDataFilter = () => {
    setFilteredData(runFilter(data, filters))

    if (page !== 1) {
      setPage(1)
    }
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }
    runDataFilter()
  }, [filters, isSuccess])

  const filterHandler = (filter: any, value: any) => {
    setFilters((current: any) => ({
      ...current,
      [filter]: value,
    }))
  }

  const showCardGrid = card_grid ?? width < 600

  const extra = !isLoading &&
    data?.length === 0 &&
    typeof no_results !== 'undefined' && <DynamicComponent {...no_results[0]} />

  const providerValue = useMemo(
    () => ({
      reloadTable: refetch,
      columns,
      filteredData,
      totalCount: typeof data !== 'undefined' && data.length,
      perPage,
      page,
      setPage,
      pending: isFetching,
      filter,
      filters,
      setFilters,
      filterHandler,
      filterFields,
      sorting,
    }),
    [
      refetch,
      columns,
      data,
      filteredData,
      perPage,
      page,
      setPage,
      isLoading,
      filter,
      filters,
      setFilters,
      filterHandler,
      filterFields,
      sorting,
    ],
  )

  return (
    <DataGridContext.Provider key={endpoint} value={providerValue}>
      {showCardGrid ? (
        <CardGrid
          titleSub={titleSub}
          extra={extra}
          compact={compact}
          position={position}
          children={children}
        />
      ) : (
        <div className={className}>
          {position !== 'bottom' && children}
          {filter && filter !== 'false' && data?.length > 1 && <SearchFilter />}
          {extra}
          <Suspense fallback={<LoaderContent justContent noButton />}>
            <DataTable
              columns={columns}
              data={filteredData}
              striped
              highlightOnHover
              noDataComponent="No results found"
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationPerPage={perPage}
              pagination
              progressPending={isLoading}
              progressComponent={<LoaderContent justContent noButton />}
              customStyles={customStyles}
              fixedHeader={!isLoading}
              fixedHeaderScrollHeight="500px"
            />
          </Suspense>
          {position === 'bottom' && children}
        </div>
      )}
    </DataGridContext.Provider>
  )
}

export default DataGrid
