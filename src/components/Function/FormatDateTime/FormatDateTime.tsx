import React from 'react'
import { isEmpty } from '../../../utilities/strings'
import FormatDate from '../FormatDate/FormatDate'

type PropTypes = {
  text?: string
  date?: string
  format?: string
}

function FormatDateTime({
  text,
  date,
  format = 'D MMMM YYYY h:mma',
}: PropTypes) {
  if (typeof date !== 'undefined') {
    text = date
  }
  if (isEmpty(text)) {
    return <></>
  }

  return <FormatDate date={text} format={format} />
}

export default FormatDateTime
