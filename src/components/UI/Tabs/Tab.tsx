import { Tabs as TabsUI } from '@mantine/core'

export const settings = [
  {
    name: 'text',
    label: 'Tab text',
    type: 'Input',
  },
]

export function Tab(props: any) {
  return (
    <TabsUI.Tab value={props.text}>
      {props.text}
      {props.children}
    </TabsUI.Tab>
  )
}

export default Tab
