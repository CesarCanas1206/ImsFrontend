import { isEmpty } from 'src/utilities/strings'
import Badge from '../Badge/Badge'

const ApplicationStatus = ({ seasonId, hirer }: any) => {
  const allocation =
    typeof hirer?.allocation !== 'undefined'
      ? hirer?.allocation
          ?.filter((item: any) => !seasonId || item.season_id === seasonId)
          ?.pop() ?? {}
      : {}

  const hasAllocation =
    typeof hirer?.allocation !== 'undefined' &&
    typeof allocation.id !== 'undefined'

  const getStatus = () => {
    if (hasAllocation) {
      if (
        typeof allocation.approved !== 'undefined' &&
        !isEmpty(allocation.approved)
      ) {
        return ['Approved', 'green']
      }
      if (
        typeof allocation.completed !== 'undefined' &&
        !isEmpty(allocation.completed)
      ) {
        return ['Awaiting approval', 'cyan']
      }
      if (typeof allocation.status === 'undefined') {
        return ['In progress', 'yellow']
      }
    }
    return ['Not started', 'orange']
  }
  const [status, statusBg] = getStatus()

  return <Badge color={statusBg}>Status: {status}</Badge>
}

export default ApplicationStatus
