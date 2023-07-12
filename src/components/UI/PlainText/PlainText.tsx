import { nl2br } from 'src/utilities/strings'

export const settings = [
  {
    name: 'text',
    label: 'Text',
    type: 'Textarea',
    default: 'New plain text element',
  },
  {
    name: 'position',
    label: 'Position',
    type: 'Select',
    options: [
      {
        name: 'Left',
        value: 'left',
      },
      {
        name: 'Center',
        value: 'center',
      },
      {
        name: 'Right',
        value: 'right',
      },
    ],
  },
]

export interface IPlainText {
  text: string
  position?: string
  style?: object
}

function PlainText({ text, position, style }: IPlainText) {
  return (
    <div className={position === 'center' ? 'text-center' : ''} style={style}>
      {nl2br(text)}
    </div>
  )
}

export default PlainText
