import React from 'react'
import Confirm from 'src/components/Function/Confirm/Confirm'
import { post } from 'src/hooks/useAPI'

function UserSendPassword({ row: { email } }: any) {
  const requestPasswordHandler = async () => {
    const siteName = window.location.pathname.split('/')[1].trim()
    const result = await post({
      endpoint: 'forgot-password',
      data: {
        email,
        url: window.location.origin + '/' + siteName + '/reset-password',
      },
      getData: false,
    })
  }

  return (
    <Confirm
      title="Are you sure you want to send the user the account information email?"
      tooltip="Send account activation email"
      variant="info"
      icon="send"
      light
      compact
      onYes={requestPasswordHandler}
    />
  )
}

export default UserSendPassword
