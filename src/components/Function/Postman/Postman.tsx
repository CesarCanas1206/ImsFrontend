import React, { useState } from 'react'
import Card from '../../UI/Card/Card'
import useAPI from '../../../hooks/useAPI'
import Group from '../../UI/Group/Group'
import Button from '../../Form/Button/Button'
import { useSearchParams } from 'react-router-dom'
import Select from 'src/components/Form/Select/Select'
import Input from 'src/components/Form/Input/Input'
import Json from 'src/components/Form/Json/Json'
import Stack from 'src/components/UI/Stack/Stack'
import CopyButton from 'src/components/UI/CopyButton/CopyButton'

const Postman = () => {
  const [searchParams] = useSearchParams()
  const { post, call } = useAPI({ url: searchParams.get('url') ?? undefined })
  const [endpoint, setEndpoint] = useState(searchParams.get('endpoint') ?? '')
  const [response, setResponse] = useState('')
  const [method, setMethod] = useState(searchParams.get('method') ?? 'get')
  const [body, setBody] = useState(searchParams.get('body') ?? '{}')
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const handleSubmit = async () => {
    setTime(0)
    setCount(0)
    const start = Date.now()
    setResponse('Loading...')
    const bodyObj = ['post', 'put'].includes(method)
      ? JSON.parse(body)
      : undefined
    const data = {
      endpoint,
      method,
      data: bodyObj,
    }
    if (['post', 'put'].includes(method) && Object.keys(data).length === 0) {
      setResponse('Body must be sent for a post or put request')
      return
    }
    const res = ['post', 'put'].includes(method)
      ? await post(data)
      : await call(data)
    setTime(Date.now() - start)
    if (res) {
      setCount(res.length)
      setResponse(JSON.stringify(res, null, 4))
    } else {
      setResponse(
        'The api call failed, you could try putting `d/` at the start to get the data',
      )
    }
  }

  /* options for get, post, put, delete*/
  const options = [
    { value: 'get', label: 'GET' },
    { value: 'post', label: 'POST' },
    { value: 'put', label: 'PUT' },
    { value: 'delete', label: 'DELETE' },
  ]

  return (
    <Stack>
      <Stack
        style={{
          backgroundColor: 'var(--c-bg)',
          position: 'sticky',
          top: 10,
          zIndex: 10,
        }}
      >
        <Group>
          <Select
            required
            style={{ width: 100 }}
            options={options}
            value={method}
            onChange={(e: any) => setMethod(e.value)}
          />
          <Input
            autoFocus
            value={endpoint}
            placeholder="e.g. d/asset?with=inspection&inspectable=!empty"
            onChange={(e: any) => setEndpoint(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
            suggestions={[
              'assets',
              'd/maintenance',
              'd/inspection',
              'd/allocation',
              'hirer',
              'd/season',
              'd/closure',
              'booking',
              'migrations',
            ]}
          />
          <Button onClick={handleSubmit} text="Submit" />
        </Group>
        {['post', 'put'].includes(method) && (
          <Json
            placeholder="{}"
            value={body}
            onChange={(e: any) => setBody(e.value)}
            onKeyUp={(e: any) => {
              if (e.ctrlKey && e.keyCode === 13) {
                handleSubmit()
                e.preventDefault()
              }
            }}
          />
        )}
        {time > 0 && (
          <Group position="apart">
            <p style={{ marginBottom: 0 }}>
              Loaded in: ~{time / 1000}s | {count} result{count !== 1 && 's'}
            </p>
            <CopyButton
              value={
                window.location.origin +
                window.location.pathname +
                '?' +
                [
                  'endpoint=' + endpoint,
                  'method=' + method,
                  'body=' + body,
                ].join('&')
              }
              text="Copy to share"
            />
            <CopyButton value={response} />
          </Group>
        )}
      </Stack>
      {response !== '' && (
        <Card
          style={{
            alignSelf: 'stretch',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
            minHeight: 150,
          }}
        >
          {response}
        </Card>
      )}
    </Stack>
  )
}

export default Postman
