export const settings = [
  {
    name: 'type',
    label: 'Type',
    type: 'Radios',
    options: [
      {
        name: 'Full',
        value: 'full',
      },
      {
        name: 'Normal',
        value: '',
      },
    ],
    default: 'full',
  },
]

export interface IContainer {
  children: React.ReactNode
  type: string
}

function Container({ children, type = 'full' }: IContainer) {
  return (
    <div className={`container${type === 'full' ? '-fluid' : ''}`}>
      {children}
    </div>
  )
}

export default Container
