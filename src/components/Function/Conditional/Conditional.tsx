import { checkCondition } from '../../Form/QuestionCondition/checkConditions'

export const settings = [
  {
    name: 'on',
    label: 'on',
    type: 'Input',
  },
  {
    name: 'type',
    label: 'type',
    type: 'Input',
  },
  {
    name: 'value',
    label: 'value',
    type: 'Input',
  },
]

type PropTypes = {
  conditions?: any
  on?: any
  type?: any
  value?: any
  children?: any
}

export function Conditional({
  on,
  type = '=',
  value,
  children,
  conditions,
}: PropTypes) {
  const formattedConditions =
    typeof conditions !== 'undefined' && Array.isArray(conditions)
      ? conditions
      : [{ on, type, value }]

  let checks: any = []
  let orChecks: any = []
  formattedConditions.forEach((cond) => {
    const check = checkCondition(cond.on, cond.type, cond.value)
    if (typeof cond.or !== 'undefined' && cond.or) {
      orChecks.push(check)
    } else {
      checks.push(check)
    }
  })

  const pass = !checks.length || !checks.includes(false)
  const passOr = !orChecks.length || orChecks.includes(true)

  const show = pass && passOr
  if (show) {
    return <>{children}</>
  }
  return <></>
}

export default Conditional
