import Button from '../../Form/Button/Button'
import { sendEmail } from '../../Function/SendEmail/SendEmail'

function TestEmailButton() {
  const clickHandler = () => {
    sendEmail({
      template: 'inspection_completion',
      data: {
        role: 1,
        has_signature: true,
        signature: `Thank you

$$position$$
$$clientname$$

PH: $$contactphone$$`,
        replace: {
          asset: 'Venue name',
          date: new Date().toLocaleDateString(),
        },
      },
    })
  }

  return (
    <div>
      <Button text="Test email" onClick={clickHandler} />
    </div>
  )
}

export default TestEmailButton
