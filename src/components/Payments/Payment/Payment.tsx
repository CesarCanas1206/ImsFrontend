import React from 'react'
import Button from 'src/components/Form/Button/Button'
import Input from 'src/components/Form/Input/Input'
import Card from 'src/components/UI/Card/Card'
import Group from 'src/components/UI/Group/Group'
import LoadingOverlay from 'src/components/UI/LoadingOverlay/LoadingOverlay'
import Stack from 'src/components/UI/Stack/Stack'
import { post } from 'src/hooks/useAPI'

function Payment() {
  const [name, setName] = React.useState('Mr Test')
  const [number, setNumber] = React.useState('5123 4567 8901 2346')
  const [expiry, setExpiry] = React.useState('12/2024')
  const [security, setSecurity] = React.useState('123')
  const [loading, setLoading] = React.useState(false)
  const [details, setDetails] = React.useState('')

  const sendHandler = async () => {
    setLoading(true)
    const result = await post({
      endpoint: 'payment/pay',
      data: {
        name,
        number,
        expiry,
        security,
      },
    })
    setDetails(JSON.stringify(result, null, 4))
    setLoading(false)
  }

  return (
    <>
      <Stack>
        <LoadingOverlay visible={loading} />
        <Input
          placeholder="Name"
          value={name}
          onChange={({ value }: any) => setName(value)}
        />
        <Input
          placeholder="Number"
          value={number}
          onChange={({ value }: any) => setNumber(value)}
        />
        <Group>
          <Input
            placeholder="Expiry"
            value={expiry}
            onChange={({ value }: any) => setExpiry(value)}
          />
          <Input
            placeholder="CCV"
            value={security}
            onChange={({ value }: any) => setSecurity(value)}
          />
        </Group>
        <Group position="right">
          <Button text="Send" onClick={sendHandler} disabled={loading} />
        </Group>

        {details !== '' && (
          <Card
            style={{
              alignSelf: 'stretch',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              minHeight: 150,
            }}
          >
            {details}
          </Card>
        )}
      </Stack>
    </>
  )
}

export default Payment
