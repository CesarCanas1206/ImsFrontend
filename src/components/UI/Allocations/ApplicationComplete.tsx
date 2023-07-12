import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Group from '../Group/Group'
import FormContext from '../../../context/FormContext'
import { get } from 'src/hooks/useAPI'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'

const ApplicationComplete = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext)
  let navigate = useNavigate()

  const completeHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      const id = getValue('id')
      onChange({ ref: 'completed', value: 'Yes' })
      await Promise.all([
        sendEmail({
          template: 'allocation_approval',
          data: {
            replace: {
              season: '{form.season.name}',
              hirer: '@hirer.{form.parent_id}.name',
            },
          },
          row,
        }),
        get({ endpoint: `buildCalendarUsage/${id}?pending` }),
      ])
      navigate(-1)
    }
  }

  const completed = getValue('completed')
  const termsAgreed = getValue('terms_agreed')
  const usage = getValue('usage')

  return (
    <>
      {completed !== 'Yes' && usage?.length !== 0 && (
        <Group position="right">
          <Button
            variant="success"
            text="Complete"
            onClick={completeHandler}
            disabled={termsAgreed !== 'Yes'}
            tooltip="Complete and submit application form"
          />
        </Group>
      )}
    </>
  )
}

export default ApplicationComplete
