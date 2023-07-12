import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import FormContext from '../../../context/FormContext'
import Loader from '../Loader/Loader'
import useEmail from 'src/hooks/useEmail'

const BookingDecline = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext)
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  const { sendEmail } = useEmail()
  const id = getValue('id')

  const declineApplicationHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      setLoading(true)
      onChange({ ref: 'declined', value: 'Yes' })
      // sendEmail({
      //   template: 'booking_decline',
      //   data: {
      //     replace: {
      //       season: '{form.season.name}',
      //       hirer: '@hirer.{form.parent_id}.name',
      //     },
      //   },
      //   row,
      // })
      await new Promise((success) => setTimeout(success, 2000))
      setLoading(false)
      navigate(-1)
    }
  }

  const completed = getValue('completed')
  const approved = getValue('approved')

  return (
    <>
      {completed === 'Yes' && approved !== 'Yes' && (
        <Group position="right">
          <Button
            variant="danger"
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
            onClick={declineApplicationHandler}
          />
        </Group>
      )}
    </>
  )
}

export default BookingDecline
