import React, { Suspense } from 'react'
import { iconRegistry } from '../../../registry/iconRegistry'

const checkIfFirstCharacterIsUppercase = (string: string) => {
  return string.charAt(0) === string.charAt(0).toUpperCase()
}

export const settings = [
  {
    name: 'type',
    label: 'Icon',
    type: 'Input',
    default: 'edit',
  },
]

type IconType = {
  type: string
  style?: object
  pointerEvents?: string
  color?: any
  fontSize?: string
  compact?: boolean
  onClick?: any
  ms?: any
  me?: any
}

const LoaderIcon = ({ size, circleSize, marginLeft, marginRight }: any) => (
  <svg
    width={size}
    height={size}
    style={{ marginRight: marginRight, marginLeft: marginLeft }}
  >
    <circle
      cx={circleSize}
      cy={circleSize}
      r={circleSize - 3}
      stroke="white"
      strokeWidth={3}
      fill="transparent"
    ></circle>
  </svg>
)

export function Icon({
  type,
  style,
  compact,
  pointerEvents,
  fontSize,
  ...props
}: IconType) {
  if (typeof type !== 'string') {
    return <></>
  }
  const isColor = type && type.includes('col:')
  const iconKey =
    type.charAt(0) === type.charAt(0).toUpperCase()
      ? type
      : type?.charAt(0).toUpperCase() + type?.toLowerCase().slice(1)
  const matchedIcon = !isColor && iconRegistry[iconKey]

  const size = fontSize && fontSize === 'inherit' ? 14 : 20
  const circleSize = size / 2
  const marginLeft = compact ? 0 : props.ms ?? 2
  const marginRight = compact ? 0 : props.me ?? 5

  if (isColor) {
    return (
      <svg
        width={size}
        height={size}
        style={{ marginRight: marginRight, marginLeft: marginLeft }}
      >
        <circle
          cx={circleSize}
          cy={circleSize}
          r={circleSize}
          fill={type.replace('col:', '').replace('col::', '')}
        ></circle>
      </svg>
    )
  }

  const pEvents = typeof pointerEvents === 'undefined' ? 'none' : pointerEvents

  if (typeof matchedIcon === 'undefined') {
    return <></>
  }

  let IconElem =
    typeof matchedIcon.svg !== 'undefined'
      ? ({ style }: any) => (
          <div style={{ width: size - 4, ...style }}>
            <matchedIcon.svg />
          </div>
        )
      : matchedIcon.icon

  return (
    <Suspense
      fallback={
        <LoaderIcon
          marginRight={marginRight}
          marginLeft={marginLeft}
          circleSize={circleSize}
          size={size}
        />
      }
    >
      <IconElem
        sx={{ pointerEvents: pEvents }}
        fontSize={fontSize}
        {...props}
        style={{ marginRight: marginRight, marginLeft: marginLeft, ...style }}
      />
    </Suspense>
  )
}

export default Icon
