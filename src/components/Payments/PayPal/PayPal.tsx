import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useCallback, useContext, useState } from 'react'
import Stack from '../../UI/Stack/Stack'
import InputPrice from '../../Form/InputPrice/InputPrice'
import AppContext from '../../../context/AppContext'

interface IPayPal {
  price?: string | number
}

export default function PayPal({ price }: IPayPal) {
  const { siteName } = useContext(AppContext)
  const [value, setValue] = useState(price ?? '10')

  const changeHandler = ({ value }: any) => {
    setValue(value)
  }

  const createOrderHandler = useCallback(
    (data: any, actions: any) => {
      console.log(value)
      return actions.order.create({
        payer: {
          email_address: 'daniels@imscomply.com.au',
          name: {
            given_name: localStorage.getItem(`${siteName}-user`),
            surname: '',
          },
        },
        purchase_units: [
          {
            amount: {
              value: value,
            },
          },
        ],
      })
    },
    [value],
  )

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: 15,
        borderRadius: 4,
        display: 'inline-flex',
      }}
    >
      <Stack style={{ width: '100%' }}>
        <InputPrice onChange={changeHandler} value={value} />
        <PayPalScriptProvider options={{ 'client-id': 'sb', currency: 'AUD' }}>
          <PayPalButtons
            forceReRender={[value]}
            createOrder={createOrderHandler}
            onApprove={(data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                console.log(details)
                const name = details.payer.name.given_name
                alert(`Transaction completed by ${name}`)
              })
            }}
          />
        </PayPalScriptProvider>
      </Stack>
    </div>
  )
}
