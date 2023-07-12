import { Button } from '@mantine/core'
import { useMemo } from 'react'
import Badge from '../../UI/Badge/Badge'
import Group from '../../UI/Group/Group'
import { uuid, moneyFormatter } from '../../../utilities/strings'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Form from '../../Form/Form/Form'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Confirm from '../Confirm/Confirm'

function ForEach({ row, item = 'asset' }: any) {
  const key = useMemo(() => uuid(), [])

  const items = useMemo(() => {
    return row[item]
      ?.sort((a: any, b: any) => a?.order - b?.order)
      ?.map((i: any) => ({ id: uuid(), ...i }))
      ?.map((inside: any) => {
        return (
          <DynamicComponent
            key={inside.id}
            component="Card"
            sub={[
              <DynamicComponent
                key="first"
                component="Group"
                position="apart"
                sub={[
                  <>{inside.name}</>,
                  <Button.Group key={inside.id}>
                    <ModalButton icon="edit" hideclose compact>
                      <Form formId="element" showClose itemId={inside.id} />
                    </ModalButton>
                    <Confirm
                      key={'confirm'}
                      icon="trash"
                      variant="danger"
                      title="Are you sure you want to delete this?"
                      compact
                    >
                      <DynamicComponent
                        key="action"
                        component="Action"
                        props={{
                          action: 'delete',
                          endpoint: `d/${inside.id}`,
                        }}
                      />
                    </Confirm>
                  </Button.Group>,
                ]}
              />,
              <Group key="group">
                <Badge key={'priority'}>Priority: {inside.priority || 0}</Badge>
                <Badge key={'budget'} color="orange">
                  Budget:{' '}
                  {moneyFormatter.format(inside.budget?.replace(',', '') || 0)}
                </Badge>
                <Badge key={'order'}>Order: {inside.order || 0}</Badge>
              </Group>,
            ]}
          />
        )
      })
  }, [row, item])

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 5,
          flexDirection: 'column',
          paddingTop: 5,
          paddingBottom: 5,
        }}
        key={key}
      >
        {items}
      </div>
      <ModalButton
        key={`${key}-add`}
        fullWidth={false}
        icon="plus"
        text="Add element"
        hideclose
      >
        <Form formId="element" itemId="new" showClose parent_id={row.id} />
      </ModalButton>
    </>
  )
}

export default ForEach
