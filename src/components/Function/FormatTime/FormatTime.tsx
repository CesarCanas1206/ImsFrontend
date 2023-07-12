import React from 'react'
import { isEmpty } from '../../../utilities/strings'
import FormatDate from '../FormatDate/FormatDate'

type PropTypes = {
  text?: string
  date?: string
  format?: string
}

export function FormatTime({ text, date, format = 'h:mma' }: PropTypes) {
  if (typeof date !== 'undefined') {
    text = date
  }
  if (isEmpty(text)) {
    return <></>
  }

  return (
    <FormatDate
      text={text?.includes('-') ? text : `2020-01-01 ${text}`}
      format={format}
    />
  )
}

export default FormatTime
