import { useContext } from 'react'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Select from '../Select/Select'
import { isEmpty } from '../../../utilities/strings'
import DateUI from '../Date/Date'
import Switch from '../../UI/Switch/Switch'
import Stack from '../../UI/Stack/Stack'
import RepeatEventDates from './RepeatEventDates'
import Alert from 'src/components/UI/Alert/Alert'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

function UsageDateErrors() {
  const { errors } = useContext(FormContext)

  const error = errors.find((error: any) => error[0] === 'date')?.[2] ?? []

  if (error.length === 0) {
    return <></>
  }

  return (
    <Alert icon="Warning" color="red">
      <Stack>
        There are clashes on the following dates:
        <div>
          {error.map((clash: any, idx: number) => [
            idx > 0 && ', ',
            <FormatDate key={clash.id} date={clash.start} />,
          ])}
        </div>
        Either update the dates for this booking or check the calendar for what
        is available.
        <Link to="/calendar" target="_blank">
          <Button variant="secondary" icon="Calendar" text="View calendar" />
        </Link>
      </Stack>
    </Alert>
  )
}

export default UsageDateErrors
