import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import FormContext from '../../../context/FormContext'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'
import { nl2brstr } from 'src/utilities/strings'

const BookingComplete = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext) ?? {
    getValue: () => void 0,
    formSaveHandler: () => void 0,
  }
  let navigate = useNavigate()

  const completeHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      await sendEmail({
        template: 'booking_completion',
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
      onChange({ ref: 'completed', value: 'Yes' })
      navigate(-1)
    }
  }

  const completed = getValue('completed')
  //const termsAgreed = getValue('terms_agreed')
  const termsAgreed = 'Yes'

  return (
    <>
      {completed !== 'Yes' && (
        <Group position="right">
          <Button
            variant="success"
            text="Complete & submit"
            onClick={completeHandler}
            disabled={termsAgreed !== 'Yes'}
            tooltip="Complete and submit application form"
          />
        </Group>
      )}
    </>
  )
}

export default BookingComplete
