import Confirm from 'src/components/Function/Confirm/Confirm'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import ModalButtonForm from '../ModalButtonForm/ModalButtonForm'
import Action from 'src/components/Function/Action/Action'
import { isEmpty } from 'src/utilities/strings'

const BookingButtons = ({ booking }: any) => {
  return (
    <Group position="right">
      {isEmpty(booking.deleted_at) && (
        <Button
          key="edit"
          icon={isEmpty(booking.completed) ? 'edit' : 'search'}
          compact
          tooltip="Booking details"
          link={
            `/application/${booking.id}` +
            (isEmpty(booking.completed) ? '' : '/admin')
          }
        />
      )}
      {!isEmpty(booking.deleted_at) && (
        <Button
          key="view"
          icon="search"
          compact
          tooltip="Booking details"
          link={`/application/${booking.id}/admin`}
        />
      )}
      {isEmpty(booking.deleted_at) && (
        <Confirm
          key="delete"
          icon="Trash"
          compact
          light
          title="Are you sure?"
          variant="danger"
          tooltip="Delete booking"
        >
          <Action action="delete" endpoint={`booking/${booking.id}`} />
        </Confirm>
      )}
      {/* {!(booking.approved === 'Yes') && (
          <Button
            key="edit"
            icon="edit"
            compact
            tooltip="Edit booking"
            onClick={() =>
              navigate(`/application/${booking.slug}/` + booking.id)
            }
          />
        )} */}
      {/*<ModalButtonForm
          key="preview"
          icon="search"
          compact
          light
          variant="primary"
          tooltip="View booking"
          size="xl"
          formId={booking.slug}
          itemId={booking.id}
        /> */}
    </Group>
  )
}

export default BookingButtons
