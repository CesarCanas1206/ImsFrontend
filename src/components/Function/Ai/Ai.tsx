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
import Textarea from 'src/components/Form/Textarea/Textarea'

function Ai() {
  const [searchParams] = useSearchParams()
  const { post, call } = useAPI({ url: searchParams.get('url') ?? undefined })
  const endpoint = 'ai'
  const method = 'post'
  const [response, setResponse] = useState('')
  const [body, setBody] = useState('')
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const handleSubmit = async () => {
    setTime(0)
    const start = Date.now()
    setResponse('Loading...')
    const data = {
      endpoint,
      method,
      data: { prompt: body.trim() || 'Quote of the day' },
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
      setResponse(res?.choices?.[0]?.text?.trim())
      // setResponse(JSON.stringify(res, null, 4))
    } else {
      setResponse(
        'The api call failed, you could try putting `d/` at the start to get the data',
      )
    }
  }

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
        <Textarea
          autoFocus
          placeholder="Prompt.."
          value={body}
          onChange={(e: any) => setBody(e.value)}
          onKeyUp={(e: any) => {
            if (e.ctrlKey && e.keyCode === 13) {
              handleSubmit()
              e.preventDefault()
            }
          }}
        />
        <Group position="apart">
          <div>
            {time > 0 && (
              <Group>
                <p style={{ marginBottom: 0 }}>Loaded in: ~{time / 1000}s</p>
                <CopyButton value={response} />
                <Button
                  variant="secondary"
                  onClick={() => setBody('')}
                  text="Clear"
                />
              </Group>
            )}
          </div>
          <Button onClick={handleSubmit} text="Submit" />
        </Group>
      </Stack>
      {response !== '' && (
        <Card
          style={{
            alignSelf: 'stretch',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
          }}
        >
          {response}
        </Card>
      )}
    </Stack>
  )
}

export default Ai
