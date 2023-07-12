export const isEmpty = (value: any) =>
  typeof value === 'undefined' ||
  value === '' ||
  value === 'No' ||
  String(value) === 'null' ||
  Number(value) === 0

export const ltrim = (value: string, character: string) =>
  value.slice(0, 1) === character ? value.slice(1) : value

export const ucFirst = (input: string) =>
  input?.charAt(0).toUpperCase() + input?.toLowerCase().slice(1)

export const getAsArray = (input: string | string[]) => {
  if (typeof input === 'undefined') {
    return []
  }
  if (Array.isArray(input)) {
    return input
  }
  return input?.includes('[') ? JSON.parse(input) : [input] ?? '[]'
}

export const nl2br = (string: string) =>
  string
    ?.split('\n')
    ?.map((item, index) => (index === 0 ? item : [<br key={item} />, item]))

export const nl2brstr = (string: string) => string?.split('\n')?.join('<br />')

export const toTableHTML = (data: any) => {
  let html =
    '<table cellpadding="4" cellspacing="0" style="border-collapse:collapse; border: 1px solid #BBB; width: 100%; max-width: 600px;">'
  for (const row of data) {
    html += '<tr>'
    if (Array.isArray(row)) {
      html += `<th style="background-color:#f8f8f8; border: 1px solid #BBB; width: 33%; text-align:left">${row[0]}</th>`
      html += `<td style="border: 1px solid #BBB;">${row[1]}</td>`
    } else {
      html += `<td colspan="2" style="background-color:#f8f8f8; border: 1px solid #BBB; width: 33%; text-align:left">${row}</td>`
    }
    html += '</tr>'
  }
  html += '</table>'
  return html
}

export const uuid = () => Math.random().toString(36).slice(2, 14)

export const moneyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

export const pluralise = (word: string, count: number = 0) => {
  if (count === 1) {
    return word
  }
  if (word.slice(-1) === 'y') {
    return word.slice(0, -1) + 'ies'
  }
  if (word.slice(-2) === 'ch' || word.slice(-2) === 'sh') {
    return word + 'es'
  }
  return word + 's'
}

export const recursiveNameBuilder = (arr: any[], id: string = ''): any => {
  const item = arr.find((x) => x.id === id)
  if (!item || !item.parent_id) return item?.name
  const parent = recursiveNameBuilder(arr, item.parent_id)
  if (!parent) return item.name
  return `${parent} - ${item.name}`
}

export const recursiveNameFromParentBuilder = (data: any): any => {
  const name = data?.name
  if (!data?.parent_id) return name
  const parent = recursiveNameFromParentBuilder(data.parent)
  if (!parent) return name
  return `${parent} - ${name}`
}

export const flattenArray = (arr: any, subArray: string): any => {
  return arr.flatMap((item: any) => {
    if (item[subArray]) {
      return [item, ...flattenArray(item[subArray], subArray)]
    }
    return item
  })
}
