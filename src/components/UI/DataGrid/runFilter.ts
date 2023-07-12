import { getValue } from '../../../utilities/objects'
import { checkConditions } from '../../Form/QuestionCondition/checkConditions'

export const runFilter = (data: any, filters: any) => {
  let tmpData = [...(data ?? [])]

  Object.entries(filters).forEach(([field, term]: any) => {
    if (field === 'sort') {
      if (typeof term !== 'string' || term === '') {
        return
      }
      const multi = term.split('|')

      tmpData = tmpData.sort((a: any, b: any) => {
        for (const field of multi) {
          const [by, order] = field.split(',')

          if (by === 'day') {
            const dayOrder = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]
            const dayA = dayOrder.indexOf(order === 'desc' ? b.day : a.day)
            const dayB = dayOrder.indexOf(order === 'desc' ? a.day : b.day)
            const compareDay = dayA - dayB
            if (compareDay !== 0) return compareDay
            continue
          }

          const compare = getValue(by, order === 'desc' ? b : a)
            ?.toString()
            .localeCompare(getValue(by, order === 'desc' ? a : b)?.toString(), {
              numeric: true,
              sensitivity: 'base',
            })
          if (compare !== 0) return compare
        }
        return 0
      })
      return
    }
    if (typeof term?.conditions !== 'undefined' && term.conditions.length > 0) {
      tmpData = tmpData.filter((item: any) =>
        checkConditions({ conditions: term?.conditions, values: item }),
      )
      return
    }
    if (typeof term !== 'string' || term === '') {
      return
    }
    const searchTerm = term.trim().toLowerCase()

    tmpData = tmpData?.filter((item: any) =>
      field !== 'search'
        ? item[field]?.toLowerCase().indexOf(searchTerm) !== -1
        : Object.values(item).join(' ').toLowerCase().indexOf(searchTerm) !==
          -1,
    )
  })
  return tmpData
}
