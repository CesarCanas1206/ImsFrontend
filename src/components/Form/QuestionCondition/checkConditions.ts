import { isEmpty } from '../../../utilities/strings'

export const checkCondition = (on: any, type?: any, value?: any) => {
  switch (type) {
    case 'empty': {
      return isEmpty(on)
    }
    case '!empty': {
      return !isEmpty(on)
    }
    case '~':
    case 'contains': {
      return String(on)?.toLowerCase()?.includes(String(value)?.toLowerCase())
    }
    case '!contains': {
      return !String(on)?.toLowerCase()?.includes(String(value)?.toLowerCase())
    }
    case '!':
    case '!=': {
      return String(on) !== String(value)
    }
    default: {
      return String(on) === String(value)
    }
  }
}

export const checkConditions = ({ conditions, values, getValue }: any) => {
  if (isEmpty(conditions)) {
    return true
  }

  let checks: any = []
  let orChecks: any = []
  conditions?.forEach((cond: any) => {
    const check = checkCondition(
      getValue ? getValue(cond.on) : values && values[cond.on],
      cond.type,
      cond.value,
    )
    if (typeof cond.or !== 'undefined' && cond.or) {
      orChecks.push(check)
    } else {
      checks.push(check)
    }
  })

  const pass = !checks.length || !checks.includes(false)
  const passOr = !orChecks.length || orChecks.includes(true)

  return pass && passOr
}

export default checkConditions
