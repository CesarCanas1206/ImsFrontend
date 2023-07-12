import { Button as ButtonUI } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import Tooltip from '../../UI/Tooltip/Tooltip'
import { standardClasses } from '../../../registry/componentSettingsRegistry'
import { lazy } from 'react'
import Stack from '../../UI/Stack/Stack'
import Text from '../../UI/Text/Text'

const Icon = lazy(() => import('../../UI/Icon/Icon'))

export const settings = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'Select',
    options: standardClasses,
    default: 'primary',
  },
  {
    name: 'text',
    label: 'Button text',
    type: 'Input',
    default: 'New button',
  },
  {
    name: 'link',
    label: 'Link',
    type: 'Input',
  },
  {
    name: 'icon',
    label: 'Icon',
    type: 'Input',
    // options: icons,
  },
  {
    name: 'position',
    label: 'Icon position',
    type: 'Radios',
    options: [
      {
        name: 'Left',
        value: 'left',
      },
      {
        name: 'Right',
        value: 'right',
      },
      {
        name: 'Top',
        value: 'top',
      },
    ],
  },
]

export interface ButtonProps {
  variant?: any
  text?: any
  icon?: string
  className?: any
  style?: any
  link?: string
  position?: string
  type?: any
  onClick?: any
  tooltip?: any
  fullWidth?: boolean
  outline?: boolean
  inMenu?: boolean
  light?: boolean
  active?: boolean
  compact?: boolean
  compactX?: boolean
  disabled?: boolean
  props?: any
  size?: string
}

const Wrapper = ({
  tooltip,
  children,
}: {
  tooltip?: string
  children: React.ReactNode
}) =>
  tooltip && tooltip !== '' ? (
    <Tooltip label={tooltip} withinPortal>
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  )

export function Button({
  variant,
  outline = false,
  active = false,
  inMenu = false,
  light = false,
  text,
  icon,
  link,
  position = 'left',
  onClick,
  tooltip,
  type = 'button',
  style,
  compact,
  compactX,
  size,
  ...props
}: ButtonProps) {
  const navigate = useNavigate()

  function clickHandler() {
    if (typeof onClick !== 'undefined') {
      onClick()
      return
    }
    if (typeof link !== 'undefined' && link) {
      if (link.includes('http')) {
        window.location.href = link
      } else {
        navigate(link)
      }
    }
  }

  const buttonIcon = typeof icon !== 'undefined' && icon !== '' && (
    <Icon compact={compact} type={icon} />
  )

  const topPositionStyle =
    position === 'top' ? { padding: '2px 6px', height: 50, minWidth: 80 } : {}

  style = {
    ...style,
    ...topPositionStyle,
    ...(compactX ? { paddingLeft: 5, paddingRight: text ? 5 : 2 } : {}),
    ...(compact ? { paddingLeft: 10, paddingRight: 10 } : {}),
  }

  const buttonVariant =
    (variant ?? 'primary') +
    (outline ? '-outline' : '') +
    (light ? '-light' : '') +
    (inMenu ? '-menu' : '')

  return (
    <Wrapper tooltip={tooltip}>
      <ButtonUI
        onClick={clickHandler}
        variant={buttonVariant}
        type={type}
        style={style}
        size={size}
        radius="md"
        {...props}
      >
        {position === 'right' && (
          <>
            {text} {buttonIcon}
          </>
        )}
        {position === 'top' && (
          <Stack align="center" spacing="0">
            {buttonIcon}
            <Text fz="xs">{text}</Text>
          </Stack>
        )}
        {position !== 'right' && position !== 'top' && (
          <>
            {buttonIcon} {text}
          </>
        )}
      </ButtonUI>
    </Wrapper>
  )
}

export default Button
