import React, { useContext, useState } from 'react'
import Button from 'src/components/Form/Button/Button'
import QuestionSimple from 'src/components/Form/Question/QuestionSimple'
import Radios from 'src/components/Form/Radios/Radios'
import Textarea from 'src/components/Form/Textarea/Textarea'
import { sendEmail } from 'src/components/Function/SendEmail/SendEmail'
import Group from 'src/components/UI/Group/Group'
import ModalContext from 'src/context/ModalContext'
import { nl2brstr, toTableHTML } from 'src/utilities/strings'

function Support() {
  const [values, setValues] = useState({ type: 'Request', request: '' })
  const [sending, setSending] = useState(false)
  const modalContext = useContext(ModalContext)

  const submitHandler = async () => {
    setSending(true)
    await sendEmail({
      template: 'support',
      data: {
        to: [
          { email: 'pruec@imscomply.com.au', name: 'IMS' },
          // { email: 'daniels@imscomply.com.au', name: 'IMS' },
          { email: 'todds@imscomply.com.au', name: 'IMS' },
          { email: 'admin@imscomply.com.au', name: 'IMS' },
        ],
      },
      replace: {
        details: nl2brstr(
          toTableHTML([
            ['Client', '{client}'],
            ['Type', values.type],
            ['Request', values.request],
            ['Logged by', '{user}'],
            ['Logged by email', '{email}'],
            ['Logged date', '{date}'],
            ['Website', '{website}'],
          ]),
        ),
      },
      row: {},
    })
    if (typeof modalContext?.onClose === 'function') {
      modalContext.onClose()
    }
    setSending(false)
  }

  return (
    <>
      <QuestionSimple key={'1'} label="Type of request">
        <div>
          <Radios
            value={values.type}
            onChange={(e: any) => setValues({ ...values, type: e.value })}
            data={[
              { label: 'Request', value: 'Request' },
              { label: 'Bug', value: 'Bug' },
            ]}
          />
        </div>
      </QuestionSimple>
      <QuestionSimple key={'2'} label="Request">
        <Textarea
          autoFocus
          value={values.request}
          onChange={(e: any) => setValues({ ...values, request: e.value })}
        />
      </QuestionSimple>
      <Group position="right">
        <Button
          text="Send"
          icon="Send"
          onClick={submitHandler}
          disabled={values.request === '' || sending}
        />
      </Group>
    </>
  )
}

export default Support
