/**
 * Check if key exists in object
 * @param {any} boolean
 * @param {any} key
 * @return {boolean}
 */
export const checkKey = (obj: any, key: any) =>
  typeof obj !== 'undefined' && typeof obj[key] !== 'undefined'

/**
 * Get a key value from within an object
 * @param key
 * @param initial
 * @returns string | null
 */
export const getValue = (key: string, initial: any) => {
  return getObjectValue(key, initial)
}

/**
 * Get a key value from within an object
 * @param key
 * @param initial
 * @returns string | null
 */
export const getObjectValue = (key: string, initial: any) => {
  /** Return if the key is found in inital and is a string or number and not an object */
  if (
    (typeof initial[key] === 'string' || typeof initial[key] === 'number') &&
    typeof initial[key]?.includes !== 'undefined' &&
    !initial[key].includes('{')
  ) {
    return initial[key]
  }

  /** These checks try to reduce the need to go to the last function for known keys - like row and form */
  if (
    key.includes('row.') &&
    typeof initial?.row === 'undefined' &&
    checkKey(initial, key.replace('row.', ''))
  ) {
    return initial[key.replace('row.', '')]
  }
  if (checkKey(initial.row, key.replace('row.', ''))) {
    return initial.row[key.replace('row.', '')]
  }
  if (checkKey(initial.row?.row, key.replace('row.', ''))) {
    return initial.row.row[key.replace('row.', '')]
  }
  if (checkKey(initial.row?.form, key.replace('form.', ''))) {
    return initial.row.form[key.replace('form.', '')]
  }
  if (checkKey(initial?.form, key.replace('form.', ''))) {
    return initial.form[key.replace('form.', '')]
  }
  if (checkKey(initial.details, key)) {
    return initial.details[key]
  }
  if (key.includes('form.') && typeof initial?.row?.form !== 'undefined') {
    initial = initial.row
  }

  /** The key might contain nested items e.g. row.asset.name.
   * This loops through each one and returns the value
   */
  return key.split('.').reduce((acc: any, check: any) => {
    if (!acc || typeof acc !== 'object') {
      return null
    }
    return Array.isArray(acc) && typeof acc[check] === 'undefined'
      ? acc?.[0]?.[check]
      : acc[check]
  }, initial)
}

/**
 * Format a value as an array whether it's JSON encoded or a string
 * @param value
 * @returns object | null
 */
export const formatValue = (value: string) => {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value !== 'string') {
    return [value]
  }

  return value?.substring(0, 2) !== '["' ? value?.split(',') : JSON.parse(value)
}

/**
 * Take a value (string or array) and return all the matches from a given dataset
 * @param value
 * @returns string
 */
export const getMatchedValues = ({ value, data, key = 'label' }: any) => {
  value = formatValue(value)
  return data
    ?.filter((item: any) => value?.includes(item.value))
    ?.map((item: any) => item[key])
    .join(', ')
}

/**
 * Filter function for getting unique values in an array
 */
export const uniqueValues = (value: any, index: any, self: any) =>
  self.indexOf(value) === index

/**
 * Sort alphabetically by name field
 */
export const sortAlphabeticallyByName = (a: any, b: any) =>
  a.name?.toLowerCase().localeCompare(b.name?.toLowerCase())

/**
 * Get by id in an array
 */
export const getById = (id: any, data: any) =>
  data?.find((item: any) => item.id === id)
