import DynamicComponent from './DynamicComponent'

interface IDynamicComponent {
  component: string
  props?: any
  row?: any
  sub?: object
  id?: number
  children?: any
  onClick?: any
  onChange?: any
}

export function DC({
  component,
  props,
  row,
  sub,
  onClick,
  onChange,
}: IDynamicComponent) {
  return (
    <DynamicComponent
      component={component}
      props={props}
      row={row}
      sub={sub}
      onClick={onClick}
      onChange={onChange}
    />
  )
}

export default DC
