import formatFunction from './formatFunction'
import { getValue } from '../../utilities/objects'

/** Regular expression for placeholder text - e.g. {id} */
const regexp = /({[^}]+})/g

/**
 * textReplace loops through the given props and replaces any placeholder text with the value from the checking object
 * if checking is not set, it will use the props object
 * @param props
 * @param checking
 * @param initial
 * @returns object
 */
export const textReplace = (props: any, checking?: any, initial?: any) => {
  if (
    !props ||
    (typeof props.text !== 'undefined' && ['Props'].includes(props.text)) ||
    ['Json', 'Textarea', 'Input'].includes(
      props.component ?? props.component_name ?? '',
    )
  ) {
    return props
  }

  if (typeof checking === 'undefined' || typeof initial !== 'undefined') {
    checking = { ...(checking || {}), ...props }
  }

  /** Loop through each of the props and replace any placeholder values from the checking object */
  Object.entries(props).forEach(([key, value]: any) => {
    if (key === 'children' || key === 'columns') {
      return
    }

    /** If the value is an object, run the loop again for textReplace to update children */
    if (typeof value === 'object') {
      props = {
        ...props,
        [key]: !Array.isArray(value)
          ? textReplace(value, checking)
          : value.map((val: any) => textReplace(val, checking)),
      }

      return
    }

    /** Return if the value is not a string or it does not contain curly brackets */
    if (typeof value !== 'string' || !value.includes('{')) {
      return
    }

    let newValue = String(value)
    /** Return if the value is a JSON string */
    if (newValue.startsWith('{"')) {
      return
    }

    /** Return if there are no placeholders to replace */
    const matches = newValue.match(regexp) ?? []
    if (!matches.length) {
      return
    }

    /** Loop through each of the matches and replace the placeholder with the value from the checking object */
    matches.forEach((match: any) => {
      let cleanReplaceString = match.replace('{', '').replace('}', '').trim()
      let foundResult = ''

      /** Placeholder can be set as {key1 || key2} and will use the first found value */
      if (match.includes('||')) {
        match = match.replace(/\|\|/g, '\\|\\|')
        const eitherOr = cleanReplaceString
          .split('||')
          .map((r: any) => getValue(r.trim(), checking))
          .filter((r: any) => r && typeof r === 'string' && r.length > 0)

        foundResult = eitherOr[0] ?? ''
        /** Placeholder can be a function like {date::date} which will
         * run the date function on the checking.date value if found
         */
      } else if (match.includes('::')) {
        const [fn, checker] = cleanReplaceString.split('::')
        foundResult = formatFunction(fn, checker ?? '', checking)
      } else {
        foundResult = getValue(cleanReplaceString, checking) ?? ''
      }

      // if foundResult is an object then stringify the value
      foundResult =
        typeof foundResult === 'object'
          ? JSON.stringify(foundResult)
          : foundResult

      /** Replace the placeholder with the foundResult or blank */
      try {
        newValue = newValue.replace(new RegExp(match, 'g'), foundResult)
      } catch (e: any) {
        console.error(e)
      }
    })

    /** Update the props with the new value */
    props = {
      ...props,
      [key]: newValue,
    }
  })

  return props
}
