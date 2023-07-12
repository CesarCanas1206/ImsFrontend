import React, { useEffect, useRef } from 'react'
import { post } from '../../../hooks/useAPI'
import { Icon } from '../../UI/Icon/Icon'
import { showNotification, updateNotification } from '@mantine/notifications'
import emailRegistry from '../../../registry/emailRegistry'
import { textReplace } from '../../DynamicComponent/textReplace'
import { storageGet } from 'src/utilities/localStorage'

export const settings = [
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
    default: '',
  },
]

interface ISendEmail {
  template?: any
  data?: any
  row?: any
  replace?: any
  file?: any
}

export async function sendEmail({
  template: sentTemplate,
  data,
  row,
  replace,
  file,
}: ISendEmail) {
  const template =
    emailRegistry.find(
      (item: any) => item.reference === sentTemplate ?? data.template ?? 'user',
    ) ?? {}

  const defaultReplace = {
    website:
      window.location.origin + '/' + window.location.pathname.split('/', 2)[1],
    client: window.location.pathname.split('/', 2)[1],
    date: new Date().toLocaleDateString(),
    user: storageGet('user') ?? '',
    email: storageGet('email') ?? '',
  }

  const sentData: any = {
    to: data.to ?? [],
    role: data.role ?? null,
    body: template.body ?? data.body,
    subject: template.subject ?? data.subject,
    template: template.reference ?? 'user',
    has_signature: template.has_signature ?? data.has_signature ?? false,
    signature: template.signature ?? data.signature ?? false,
    replace: {
      ...defaultReplace,
      name: '{name}',
      asset: '{asset.name}',
      details: '',
      content: '',
      ...(data.replace ?? replace ?? {}),
    },
  }

  if (row) {
    sentData.replace = textReplace(sentData.replace, {
      ...defaultReplace,
      ...row,
    })
  }

  showNotification({
    id: 'send-email',
    loading: true,
    title: 'Sending email',
    message: 'Sending the email now',
    autoClose: false,
    withCloseButton: false,
  })

  const sendData = new FormData()
  if (file) {
    Object.keys(sentData).forEach((item) => {
      sendData.append(
        item,
        typeof sentData[item] === 'object'
          ? JSON.stringify(sentData[item])
          : sentData[item],
      )
    })

    sendData.append('file', file)
  }

  await post({
    endpoint: 'send-email',
    data: file ? sendData : sentData,
  })

  updateNotification({
    id: 'send-email',
    color: 'teal',
    title: 'Email sent!',
    message: 'The email has now been sent',
    icon: <Icon type="tick" />,
    autoClose: 2000,
  })
}

export function SendEmail({ template: sentTemplate, data, row }: ISendEmail) {
  const ref = useRef<any>()

  useEffect(() => {
    if (ref.current) {
      return
    }
    sendEmail({ template: sentTemplate, data, row })
    ref.current = true
  }, [])

  return <></>
}

export default SendEmail
