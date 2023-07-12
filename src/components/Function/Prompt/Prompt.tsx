import Button, { ButtonProps } from '../../Form/Button/Button'
import { Suspense, useState } from 'react'
import { Modal } from '@mantine/core'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Action from '../Action/Action'

export const settings = [
  {
    name: 'title',
    label: 'Title',
    type: 'Input',
    default: 'Are you sure?',
  },
]

export function Prompt({
  onClick,
  onYes,
  yesText = 'Confirm',
  noText = 'Cancel',
  title,
  children,
  ...props
}: any) {
  const [show, setShow] = useState(false)
  const [answeredYes, setAnsweredYes] = useState(false)
  const [reason, setReason] = useState('')
  const btnProps: ButtonProps = { ...props }

  const showHandler = () => setShow(!show)
  const closeHandler = () => setShow(false)

  const yesHandler = () => {
    if (reason.length < 2) {
      alert('Please provide more of a reason why this is being cancelled')
      return
    }
    setAnsweredYes(true)
    console.log(reason)
    if (onYes) {
      onYes({ reason })
    }
    closeHandler()
  }

  return (
    <>
      {answeredYes && (
        <>
          <Action
            action="put"
            endpoint={props.endpoint}
            data={{
              cancelled: 'true',
              reason,
            }}
          />
        </>
      )}
      <Button {...btnProps} onClick={showHandler} />
      <Modal opened={show} title={title} centered onClose={closeHandler}>
        <Suspense fallback={'...'}>
          <DynamicComponent
            component="Textarea"
            props={{
              value: reason,
              onChange: ({ value }: any) => setReason(value),
            }}
          />
          <DynamicComponent component="Space" props={{ h: 'sm' }} />
          <DynamicComponent
            component="Group"
            props={{ position: 'center' }}
            sub={[
              {
                component: 'Button',
                props: {
                  onClick: closeHandler,
                  text: noText,
                  outline: true,
                },
              },
              {
                component: 'Button',
                props: {
                  onClick: yesHandler,
                  text: yesText,
                },
              },
            ]}
          />
        </Suspense>
      </Modal>
    </>
  )
}

export default Prompt
