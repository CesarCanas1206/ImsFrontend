// import { RadioGroup as RadioGroupUI } from '@mantine/core'

export function RadioGroup({ onChange, value, readOnly, ...props }: any) {
  const changeHandler = (e: any) => {
    if (onChange) {
      onChange({ value: e.target.value })
    }
  }

  console.log(props.children)

  if (readOnly) {
    return <>{props.value}</>
  }

  return <>Radio group here</>

  // return (
  //   <RadioGroupUI
  //     value={value}
  //     onChange={changeHandler}
  //     description={props.description}
  //     label={props.label}
  //   >
  //     {props.children}
  //   </RadioGroupUI>
  // )
}

export default RadioGroup
