import styles from './col.module.css'

export const settings = [
  {
    name: 'className',
    label: 'Class',
    type: 'Input',
    default: '',
  },
  {
    name: 'span',
    label: 'Span',
    type: 'Select',
    options: [
      {
        name: '1',
        value: '1',
      },
      {
        name: '2',
        value: '2',
      },
      {
        name: '3',
        value: '3',
      },
      {
        name: '4',
        value: '4',
      },
      {
        name: '5',
        value: '5',
      },
      {
        name: '6',
        value: '6',
      },
      {
        name: 7,
        value: 7,
      },
      {
        name: 8,
        value: 8,
      },
      {
        name: 9,
        value: 9,
      },
      {
        name: 10,
        value: 10,
      },
      {
        name: 11,
        value: 11,
      },
      {
        name: 12,
        value: 12,
      },
    ],
    default: '6',
  },
]

export interface ICol {
  span?: string | number
  className?: string
  style?: object
  children?: any
  sub?: object[]
  id?: string | number
}

export function Col({ span = '6', className, style, children, sub, id }: ICol) {
  return (
    <div
      className={`${styles.col} ${styles[`col${span}`] ?? ''}`}
      style={style}
      id={id}
    >
      {sub}
      {children}
    </div>
  )
}

export default Col
