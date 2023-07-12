import dayjs from 'dayjs'
import { getValue } from '../../utilities/objects'

export const formatFunction = (fn: any, result: any, checking?: any) => {
  let keyValue = getValue(result, checking) ?? ''
  if (
    result === '' ||
    (['fDate', 'fTime', 'fDateTime'].includes(fn) &&
      (keyValue === '' || typeof checking[result] === 'undefined'))
  ) {
    return ''
  }

  let format = 'D MMMM YYYY'
  let [findField, findKey] = ['', '']

  if (result.includes('@')) {
    const atSplit = result.split('@')
    keyValue = result = formatFunction(atSplit[0], atSplit[1], checking)
  }

  switch (fn) {
    case 'c':
      result = 'component ' + result
      break
    case 'e':
    case 'each':
      ;[findField, findKey] = result.split('.')
      result =
        typeof checking[findField] !== 'undefined' &&
        typeof checking[findField]?.map !== 'undefined'
          ? checking[findField]
              ?.map((item: any) => item[findKey])
              .filter((item: any) => typeof item !== 'undefined')
              .join(', ') ?? ''
          : ''
      break
    case 'get':
    case 'field':
    case 'first':
      ;[findField, findKey] = result.split('.')
      result =
        checking[findField]
          ?.map((item: any) => item[findKey])
          .filter((item: any) => typeof item !== 'undefined')
          .shift() ?? ''
      break
    case 'last':
      ;[findField, findKey] = result.split('.')
      result =
        checking[findField]
          ?.map((item: any) => item[findKey])
          .filter((item: any) => typeof item !== 'undefined')
          .pop() ?? ''
      break
    case 'fDate':
    case 'date':
      if (result === 'today') {
        result = dayjs(new Date()).format('YYYY-MM-DD')
        break
      }
      if (keyValue.includes('T')) {
        keyValue = keyValue.split('T')[0]
      }
      if (keyValue.includes('/')) {
        keyValue = keyValue.replace(
          /^([0-9]+)\/([0-9]+)\/([0-9]+).*/,
          '$3-$2-$1',
        )
      }
      result = dayjs(keyValue).format(format)
      break
    case 'fTime':
    case 'time':
      format = 'h:mma'
      result = dayjs(
        keyValue.includes('-')
          ? keyValue
          : `2000-01-01 ${keyValue.replace('am', '').replace('pm', '')}:00`,
      ).format(format)
      break
    case 'fDateTime':
    case 'dateTime':
      format = 'D MMMM YYYY h:mma'
      result = (keyValue && dayjs(keyValue).format(format)) ?? ''
      break
    case 'value':
      result = checking?.value
      break
    case 'count':
      result = Array.isArray(keyValue) ? keyValue.length > 0 : '0'
      break
    case 'find':
    case 'fFind':
      let fn2 = null
      const details: any = checking?.collections ?? []
      let [search, field] = result.split(':')
      if (search.includes('@')) {
        const subSplit = search.split('@')
        fn2 = subSplit[0].replace('@', '')
        search = subSplit[1]
      }
      const [key, val] = search.replace('}', '').split('=')
      const value = checking[val] ?? ''
      const found = details.find((d: any) => String(d[key]) === String(value))

      result = typeof found !== 'undefined' ? found[field] ?? '' : ''
      if (typeof fn2 !== 'undefined' && fn2 && result !== '') {
        result = formatFunction(fn2, result, checking)
      }
      break
  }
  return result
}

export default formatFunction
