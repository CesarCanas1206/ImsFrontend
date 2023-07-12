import dayjs from 'dayjs'
import { isEmpty } from '../../../utilities/strings'

type PropTypes = {
  text?: string
  date?: string
  format?: string
}

export function FormatDate({ text, date, format = 'D MMMM YYYY' }: PropTypes) {
  if (typeof date !== 'undefined') {
    text = date
  }
  if (isEmpty(text)) {
    return <></>
  }

  return (
    <>
      {dayjs(
        typeof text?.replace !== 'undefined'
          ? text?.replace('undefined', '')
          : text,
      ).format(format)}
    </>
  )
}

export default FormatDate
