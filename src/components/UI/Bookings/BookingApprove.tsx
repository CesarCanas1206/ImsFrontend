import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import FormContext from '../../../context/FormContext'
import Loader from '../Loader/Loader'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'
import { isEmpty, nl2brstr } from 'src/utilities/strings'

const BookingApprove = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext) ?? {
    getValue: () => void 0,
    formSaveHandler: () => void 0,
  }
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  const id = getValue('id')

  const approveApplicationHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      setLoading(true)

      await sendEmail({
        template: 'booking_approval',
        data: {
          role: '1',
        },
        replace: {
          details: nl2brstr(
            'Booking date: date\nBooking time: time\nComments: {comments}\nActivity: {activity}',
          ),
        },
        row,
      })
      onChange({ ref: 'approved', value: 'Yes' })
      setLoading(false)
      navigate(-1)
    }
  }

  const completed = getValue('completed')
  const approved = getValue('approved')

  return (
    <>
      {!isEmpty(completed) && isEmpty(approved) && (
        <Group position="right">
          <Button
            variant="success"
            text={
              <>
                {loading && (
                  <Loader
                    size="1.5rem"
                    style={{
                      borderTopColor: '#fff',
                      borderLeftColor: '#fff',
                      borderRightColor: '#fff',
                      marginRight: 5,
                    }}
                  />
                )}
                Approve
              </>
            }
            onClick={approveApplicationHandler}
          />
        </Group>
      )}
    </>
  )
}

export default BookingApprove
