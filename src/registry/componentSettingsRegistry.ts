interface ISettings {
  name: string
  value: string | number | boolean
}

export const standardSizes: ISettings[] = [
  {
    name: 'Extra small',
    value: 'xs',
  },
  {
    name: 'Small',
    value: 'sm',
  },
  {
    name: 'Medium',
    value: 'md',
  },
  {
    name: 'Large',
    value: 'lg',
  },
  {
    name: 'Extra large',
    value: 'xl',
  },
]

export const standardClasses: ISettings[] = [
  {
    name: 'Primary',
    value: 'primary',
  },
  {
    name: 'Success',
    value: 'success',
  },
  {
    name: 'Danger',
    value: 'danger',
  },
  {
    name: 'Info',
    value: 'info',
  },
  {
    name: 'Warning',
    value: 'warning',
  },
]
