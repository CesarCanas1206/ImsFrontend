import Confirm from 'src/components/Function/Confirm/Confirm'
import FormatDateTime from 'src/components/Function/FormatDateTime/FormatDateTime'
import Group from 'src/components/UI/Group/Group'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import { doDelete } from 'src/hooks/useAPI'
import { isEmpty } from 'src/utilities/strings'

function FeeItem({ item, refetch, readOnly }: any) {
  const deleteFee = async () => {
    await doDelete({ endpoint: 'fee/' + item.id })
    refetch()
  }

  return (
    <tr key={item.id}>
      <td>
        <Group>
          {!readOnly && (
            <>
              <ModalButtonForm
                icon="Edit"
                compact
                formId="fee"
                itemId={item.id}
                onSave={refetch}
              />
              <Confirm
                title="Are you sure you want to delete this?"
                tooltip="Delete"
                variant="danger"
                compact
                light
                icon="Delete"
                onYes={deleteFee}
              />
            </>
          )}
          <div>
            {item.name}
            {!isEmpty(item.start) && (
              <>
                <br />
                <FormatDateTime date={item.start} />
                {' - '}
                <FormatDateTime date={item.end} />
              </>
            )}
          </div>
        </Group>
      </td>
      <td>${item.rate}</td>
      <td>{item.unit}</td>
      <td>${item.total}</td>
    </tr>
  )
}

export default FeeItem
