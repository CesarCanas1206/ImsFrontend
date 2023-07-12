import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAPI, { get } from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import FormContext from '../../../context/FormContext'
import Loader from '../Loader/Loader'
import useCalendarEvents from '../../../hooks/useCalendarEvents'
import useEmail from 'src/hooks/useEmail'

const ApplicationApprove = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext)
  const [loading, setLoading] = useState(false)
  // const { createCalendarDates } = useCalendarEvents()
  const { doDelete } = useAPI()

  let navigate = useNavigate()
  const { sendEmail } = useEmail()
  const id = getValue('id')

  const approveApplicationHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      setLoading(true)
      onChange({ ref: 'approved', value: 'Yes' })
      await Promise.all([
        sendEmail({
          template: 'allocation_approval',
          data: {
            replace: {
              season: '{form.season.name || season.name}',
              hirer: '@hirer.{form.parent_id || parent_id}.name',
            },
          },
          row,
        }),
        get({ endpoint: `buildCalendarUsage/${id}` }),
      ])
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

export default ApplicationApprove
