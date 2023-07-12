import { useNavigate } from 'react-router-dom'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export function BackButton(props: any) {
  let navigate = useNavigate()

  const clickHandler = () => {
    navigate(props?.path ?? -1)
  }

  return (
    <>
      <DynamicComponent
        component="Button"
        props={{
          text: props.text ?? 'Back',
          icon: props.icon ?? 'back',
          variant: props.variant ?? 'primary',
          onClick: clickHandler,
        }}
      />
    </>
  )
}

export default BackButton
