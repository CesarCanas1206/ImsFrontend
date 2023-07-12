import Icon from '../../UI/Icon/Icon'
import FormatDate from '../../Function/FormatDate/FormatDate'
import FormatTime from '../../Function/FormatTime/FormatTime'
import Group from '../../UI/Group/Group'
import Alert from 'src/components/UI/Alert/Alert'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import Confirm from 'src/components/Function/Confirm/Confirm'
import { post, put } from 'src/hooks/useAPI'
import { useContext } from 'react'
import DataGridContext from 'src/context/DataGridContext'
import Stack from 'src/components/UI/Stack/Stack'
import Button from 'src/components/Form/Button/Button'

function ClashItem({ row }: any) {
  const clashIds = row?.clashes?.map((clash: any) => clash.id)
  const { reloadTable } = useContext(DataGridContext)

  const allowOneHandler = async (id: string) => {
    await put({
      endpoint: 'calendar/' + id,
      data: {
        allow: 1,
      },
    })

    if (typeof reloadTable !== 'undefined') {
      reloadTable()
    }
  }

  const allowBothHandler = async () => {
    await post({
      endpoint: 'calendar/allow-multiple',
      data: {
        clash_ids: JSON.stringify(clashIds),
      },
    })

    if (typeof reloadTable !== 'undefined') {
      reloadTable()
    }
  }

  return (
    <>
      <Group>
        <span>{typeof row.asset !== 'undefined' && row.asset}</span>
        {row.day}
        <FormatDate date={row.date} />
      </Group>
      {row.clashes?.map((clash: any) => (
        <Alert key={clash.id} icon="Warning" color="orange">
          <Group position="apart">
            <Group>
              <Stack spacing={2}>
                {typeof clash?.hirer !== 'undefined' ? (
                  <span>{clash?.hirer}</span>
                ) : (
                  ''
                )}
                {typeof clash?.title !== 'undefined' ? (
                  <span>{clash?.title}</span>
                ) : (
                  ''
                )}
              </Stack>
              <Icon type="clock" /> <FormatTime date={clash.start} /> -{' '}
              <FormatTime date={clash.end} />
            </Group>
            <Group>
              <ModalButtonForm
                formId={clash.pending ? 'casualusage' : 'calendar'}
                itemId={clash.pending ? clash.usage_id : clash.id}
                icon="Edit"
                tooltip="Edit this item"
              />
              <Button
                onClick={() => allowOneHandler(clash.id)}
                icon="Tick"
                tooltip="Allow this clash"
              />
            </Group>
          </Group>
        </Alert>
      ))}

      <Group position="right">
        <Confirm
          text="Allow all"
          tooltip="Allow all clashes"
          icon="Tick"
          title="Are you sure?"
          onYes={allowBothHandler}
        />
        {/* <Button text="Share all" />
        <Button text="Reject all" /> */}
      </Group>
    </>
  )
}

export default ClashItem
