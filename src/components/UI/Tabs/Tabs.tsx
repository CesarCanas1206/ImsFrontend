import { Children } from 'react'
import { Tabs as TabsUI } from '@mantine/core'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export const settings = [
  {
    name: 'orientation',
    label: 'Tab orientation',
    type: 'Radios',
    default: 'horizontal',
    options: [
      {
        name: 'Horizontal',
        value: 'horizontal',
      },
      {
        name: 'Vertical',
        value: 'vertical',
      },
    ],
  },
]

const tabColors: { [k: string]: string } = {
  Unprocessed: 'yellow',
  Approved: 'green',
  Cancelled: 'red',
}

export function Tabs({ orientation, variant = 'pills', ...props }: any) {
  if (!Children.count(props.children)) {
    return <></>
  }

  return (
    <TabsUI
      variant={variant || 'default'}
      {...props}
      orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      styles={(theme) => ({
        body: {
          width: '100%',
        },
        tabsListWrapper: {
          flexShrink: 0,
        },
        tabsList: {
          position: 'sticky',
          top: 40,
          background: 'white',
          zIndex: 2,
        },
      })}
    >
      <TabsUI.List mb={'sm'}>
        {Children.map(props.children, (child: any, idx: number) => {
          const value =
            child.props?.label ||
            child.props?.props?.label ||
            child.props?.text ||
            child.props?.props?.text ||
            idx

          return (
            <TabsUI.Tab key={idx} value={value} color={tabColors[value]}>
              {value}
            </TabsUI.Tab>
          )
        })}
      </TabsUI.List>
      {Children.map(props.children, (child: any, idx: number) => {
        const value =
          child.props?.label ||
          child.props?.props?.label ||
          child.props?.text ||
          child.props?.props?.text ||
          idx

        return (
          <TabsUI.Panel value={value}>
            {Children.map(child.props?.children, (child2: any) => child2)}
            {child?.props.sub?.map((sub: any, idx2: number) => (
              <DynamicComponent key={idx2} {...sub} />
            ))}
          </TabsUI.Panel>
        )
      })}
    </TabsUI>
  )
}

export default Tabs
