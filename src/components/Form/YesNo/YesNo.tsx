import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export interface IYesNo {
  onChange?: (params?: object) => void
  value?: string
  readOnly?: boolean
}

export function YesNo({ onChange, value, readOnly }: IYesNo) {
  const clickHandler = (selected: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ value: selected })
    }
  }

  if (readOnly) {
    return <>{value}</>
  }

  return (
    <>
      <DynamicComponent
        component="Group"
        sub={[
          <DynamicComponent
            key={1}
            component="Button"
            props={{
              text: 'Yes',
              variant: 'success',
              outline: value !== 'Yes',
              onClick: () => clickHandler('Yes'),
            }}
          />,
          <DynamicComponent
            key={2}
            component="Button"
            props={{
              text: 'No',
              variant: 'danger',
              outline: value !== 'No',
              onClick: () => clickHandler('No'),
            }}
          />,
        ]}
      />
    </>
  )
}

export default YesNo
