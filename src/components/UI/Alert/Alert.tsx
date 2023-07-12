import { Alert as AlertUI } from '@mantine/core'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export const settings = [
  {
    name: 'text',
    label: 'Text',
    type: 'Input',
    default: 'Alert text!',
  },
  {
    name: 'icon',
    label: 'Icon',
    type: 'Input',
    // options: icons,
  },
]

export function Alert({ text, icon, color, children }: any) {
  return (
    <AlertUI
      mb={'sm'}
      radius="md"
      icon={
        icon && <DynamicComponent component="Icon" props={{ type: icon }} />
      }
      title={text}
      color={color}
    >
      {children}
    </AlertUI>
  )
}

export default Alert
