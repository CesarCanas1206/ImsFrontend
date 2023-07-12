import { Menu as MenuUI, Badge } from '@mantine/core'
import { useState } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

const statuses = [
  {
    text: 'Done',
    color: 'green',
  },
  {
    text: 'Todo',
    color: 'cyan',
  },
  {
    text: 'In progress',
    color: 'yellow',
  },
]

function Menu({ text, color = 'green', id }: any) {
  const [output, setOutput] = useState<any>(null)

  const clickHandler = (status: any) => {
    setOutput(
      <DynamicComponent
        component="Action"
        props={{
          endpoint: `d/save/${id}`,
          action: 'put',
          data: { responses: { status: status } },
        }}
      />,
    )
  }

  return (
    <MenuUI shadow="md" width={200}>
      {output}
      <MenuUI.Target>
        <Badge variant="filled" color={color}>
          {text}
        </Badge>
      </MenuUI.Target>

      <MenuUI.Dropdown>
        <MenuUI.Label>Status</MenuUI.Label>
        {statuses.map((status: any) => (
          <MenuUI.Item
            key={status.text}
            onClick={() => clickHandler(status.text)}
          >
            <Badge variant="filled" color={status.color}>
              {status.text}
            </Badge>
          </MenuUI.Item>
        ))}
      </MenuUI.Dropdown>
    </MenuUI>
  )
}

export default Menu
