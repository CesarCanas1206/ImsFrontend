import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Form/Button/Button'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Loader from '../../UI/Loader/Loader'
import useEmail from 'src/hooks/useEmail'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import dayjs from 'dayjs'

const InspectionButtons = ({ onChange, row }: any) => {
  const { getValue, formSaveHandler } = useContext(FormContext)
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  const { sendEmail } = useEmail()

  const completeHandler = async () => {
    const validated = formSaveHandler()
    if (validated) {
      setLoading(true)
      onChange('completed', 'Yes')
      onChange('completed_at', dayjs(new Date()).format('YYYY-MM-DD H:mm:ss'))
      // TODO
      // sendEmail({
      //   template: 'inspection_complete',
      //   data: {
      //     replace: {
      //       asset: '{form.asset.name}',
      //       hirer: '@hirer.{form.parent_id}.name',
      //     },
      //   },
      //   row,
      // })
      await new Promise((success) => setTimeout(success, 2000))
      setLoading(false)
      navigate('/inspections')
    }
  }

  const saveAndExitHandler = () => {
    navigate('/inspections')
  }
  const validated = formSaveHandler(null, false)
  const completed = getValue('completed')

  return (
    <>
      <Group position="apart">
        <DynamicComponent component="Space" h="sm" />
        <Button
          text="Save and exit"
          variant="success"
          icon="save"
          onClick={saveAndExitHandler}
        />
        {completed !== 'Yes' && validated && (
          <Button
            variant="primary"
            icon="tick"
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
                Finalise
              </>
            }
            onClick={completeHandler}
          />
        )}
      </Group>
    </>
  )
}

export default InspectionButtons
