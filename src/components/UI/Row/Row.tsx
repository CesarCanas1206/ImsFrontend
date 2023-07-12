import styles from './row.module.css'

export const settings = [
  {
    name: 'className',
    label: 'Class',
    type: 'Input',
    default: '',
  },
]

interface IRow {
  className?: string
  sub?: object[]
  style?: any
  children?: any
  border?: boolean
  idx?: any
}

export function Row({ className, sub, style, children, border, idx }: IRow) {
  return (
    <div
      key={idx}
      className={[styles.row, border ? styles.border : ''].join(' ')}
      style={{ ...style }}
    >
      {sub}
      {children}
    </div>
  )
}

export default Row
