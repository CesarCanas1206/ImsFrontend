import { Table as TableUI } from '@mantine/core'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Group from '../Group/Group'
import Skeleton from '../Skeleton/Skeleton'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import ModalButtonForm from '../ModalButtonForm/ModalButtonForm'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Action from 'src/components/Function/Action/Action'

interface ISimpleList {
  endpoint?: string
  formId?: string
  assetId?: string
  hirerId?: string
  columnList?: []
}

let tableColumns = [{ label: 'Name', value: 'name' }]

function SimpleList({
  endpoint,
  formId,
  assetId,
  hirerId,
  columnList,
}: ISimpleList) {
  const { get } = useAPI()

  if (typeof columnList !== 'undefined' && columnList.length) {
    tableColumns = [...columnList]
  }

  const {
    data: items,
    isLoading: loading,
    refetch,
  } = useQuery(
    ['simplelist', formId, assetId || hirerId],
    async () => await get({ endpoint }),
  )

  const cols = tableColumns.map((col: any) => {
    return <th key={col.label}>{col.label}</th>
  })
  const loadingCols = tableColumns.map((col: any) => {
    return (
      <td>
        <Skeleton
          width={'100%'}
          style={{ maxWidth: '100%' }}
          height={40}
          mb={5}
        />
      </td>
    )
  })
  const defaultValues = assetId
    ? { asset_id: assetId, assets: 'all' }
    : { hirer_id: hirerId }

  const rows =
    items &&
    items?.map((item: any) => {
      const hirerName = item?.hirer.name
      const assetName = item?.asset.label
      const type = formId?.replace('-register', '') ?? ''

      const cells = tableColumns.map((col: any) => {
        let key = col.value
        let value =
          col.value === 'hirer_id'
            ? hirerName
            : col.value === 'asset_id'
            ? assetName
            : item?.[col.value]
        if (typeof col?.type !== 'undefined' && col?.type === 'date') {
          value = <FormatDate date={value} />
        }
        return <td key={key}>{value}</td>
      })
      return (
        <tr key={item.id ?? item.name ?? item.title}>
          {cells}
          <td>
            <Group position="right">
              <ModalButtonForm
                compact
                icon="user"
                tooltip="Assign/unassign hirer"
                formId="hirer-key"
                itemId={item.id}
              />
              <ModalButtonForm
                icon="edit"
                compact
                key={item.id}
                formId={formId ?? 'key-register'}
                itemId={item.id}
                defaultValues={{ ...defaultValues }}
                onSave={refetch}
              />
              <Confirm
                icon="delete"
                variant="danger"
                title={`Are you sure you want to delete this ${type}?`}
                compactX
                tooltip="Delete key"
              >
                <Action
                  action="delete"
                  endpoint={'d/' + item.id}
                  after={refetch}
                />
              </Confirm>
            </Group>
          </td>
        </tr>
      )
    })

  return (
    <TableUI highlightOnHover={true}>
      <thead>
        <tr>
          {cols}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {!loading && rows}
        {loading && (
          <tr>
            {loadingCols}
            <td>
              <Skeleton
                width={'100%'}
                style={{ maxWidth: '100%' }}
                height={40}
                mb={5}
              />
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={tableColumns.length + 1}>
            <Group position="right">
              <ModalButtonForm
                text="Add"
                icon="plus"
                formId={formId}
                defaultValues={{ ...defaultValues }}
                onSave={refetch}
              />
            </Group>
          </td>
        </tr>
      </tfoot>
    </TableUI>
  )
}

export default SimpleList
