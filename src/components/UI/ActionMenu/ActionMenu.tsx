import { Menu as MenuUI, UnstyledButton, Text } from '@mantine/core'
import React, { lazy, Suspense, useState, forwardRef } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Icon from '../Icon/Icon'
import Group from '../Group/Group'
import Tooltip from '../Tooltip/Tooltip'
import { Link } from 'react-router-dom'
import { MenuTriggerEvent } from '@mantine/core/lib/Menu/Menu.types'
import { isEmpty } from 'src/utilities/strings'
import Form from 'src/components/Form/Form/Form'

const Modal = lazy(() => import('../Modal/Modal'))

interface ActionButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  text?: string
  icon?: string
  tooltip?: string
  customButton?: boolean
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      text,
      icon = 'EllipsisVertical',
      tooltip,
      customButton,
      ...others
    }: ActionButtonProps,
    ref,
  ) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) =>
      tooltip && tooltip !== '' ? (
        <Tooltip label={tooltip} withinPortal>
          {children}
        </Tooltip>
      ) : (
        <>{children}</>
      )

    if (customButton) {
      return (
        <UnstyledButton style={{ display: 'flex' }} ref={ref} {...others}>
          {text}
        </UnstyledButton>
      )
    }

    return (
      <UnstyledButton
        ref={ref}
        sx={(theme) => ({
          display: 'block',
          // padding: theme.spacing.xs,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        {...others}
      >
        <Wrapper>
          <Group>
            {icon && <Icon type={icon} />}
            {text && (
              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {text}
                </Text>
              </div>
            )}
          </Group>
        </Wrapper>
      </UnstyledButton>
    )
  },
)

interface IActionMenu {
  icon?: string
  label?: string
  actions?: any
  text?: any
  tooltip?: string
  customButton?: boolean
  fz?: string
  trigger?: MenuTriggerEvent
}
/**
 * ActionMenu
 *
 * @param icon button icon default - ellipsis
 * @param label label for menu
 * @param tooltip tooltip for menu
 * @param actions array of object actions - modal - confirm - link
 * @returns
 */
function ActionMenu({
  icon,
  label,
  tooltip,
  text,
  actions,
  customButton,
  fz: fontSize = 'sm',
  trigger = 'hover',
}: IActionMenu) {
  const [state, setState] = useState<any>(null)

  return (
    <>
      <MenuUI
        withinPortal
        shadow="md"
        trigger={trigger}
        width={200}
        closeOnItemClick
        position="bottom-end"
      >
        <MenuUI.Target>
          <ActionButton
            tooltip={tooltip}
            customButton={customButton}
            text={text}
            icon={icon}
          />
        </MenuUI.Target>

        <MenuUI.Dropdown>
          {label && <MenuUI.Label>{label}</MenuUI.Label>}
          {actions
            .filter((f: any) => !f?.hide ?? false)
            .map((action: any, index: any) => (
              <React.Fragment key={action.text}>
                {index !== 0 && <MenuUI.Divider />}
                {typeof action.link !== 'undefined' && (
                  <MenuUI.Item
                    key={action.text}
                    component={Link}
                    to={action.href || action.link}
                    icon={
                      typeof action.icon !== 'undefined' && (
                        <Icon
                          fontSize="inherit"
                          type={action.icon}
                          style={{ color: action.color || 'black' }}
                        />
                      )
                    }
                  >
                    <Text size={fontSize}>{action.text}</Text>
                  </MenuUI.Item>
                )}
                {!action.link && (
                  <MenuUI.Item
                    key={action.text}
                    onClick={() =>
                      typeof action.onClick !== 'undefined'
                        ? action.onClick()
                        : setState(action)
                    }
                    icon={
                      typeof action.icon !== 'undefined' && (
                        <Icon
                          fontSize="inherit"
                          type={action.icon}
                          style={{ color: action.color || 'black' }}
                        />
                      )
                    }
                  >
                    <Text size={fontSize}>{action.text}</Text>
                  </MenuUI.Item>
                )}
              </React.Fragment>
            ))}
        </MenuUI.Dropdown>
      </MenuUI>
      {state !== null && state.modal === true && state.formId && (
        <Suspense fallback={'...'}>
          <Modal onClick={() => setState(null)} opened size="lg">
            <Form formId={state.formId} itemId={state.itemId} />
          </Modal>
        </Suspense>
      )}
      {state !== null && state.modal === true && !state.formId && (
        <Suspense fallback={'...'}>
          <Modal onClick={() => setState(null)} opened size="lg">
            <DynamicComponent component="Stack" sub={state.sub} />
          </Modal>
        </Suspense>
      )}
      {state !== null && state.confirm === true && (
        <Suspense fallback={'...'}>
          <DynamicComponent
            component="Stack"
            sub={state.sub}
            onClick={() => setState(null)}
          />
        </Suspense>
      )}
    </>
  )
}

export default ActionMenu
