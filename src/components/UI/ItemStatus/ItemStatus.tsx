import { isEmpty } from 'src/utilities/strings'
import Badge from '../Badge/Badge'
import Row from '../Row/Row'

const ItemStatus = ({ row, prefix = 'Status: ' }: any) => {
  const { completed, approved, rejected, declined } = row?.form || row

  const getStatus = () => {
    if (typeof approved !== 'undefined' && !isEmpty(approved)) {
      return ['Approved', 'green']
    }

    if (typeof declined !== 'undefined' && !isEmpty(declined)) {
      return ['Declined', 'red']
    }

    if (typeof rejected !== 'undefined' && !isEmpty(rejected)) {
      return ['Rejected', 'red']
    }

    if (typeof completed !== 'undefined' && !isEmpty(completed)) {
      return ['Awaiting approval', 'cyan']
    }

    return ['In progress', 'yellow']
  }

  const [status, statusBg] = getStatus()

  return (
    <Badge color={statusBg}>
      {prefix}
      {status}
    </Badge>
  )
}

export default ItemStatus
