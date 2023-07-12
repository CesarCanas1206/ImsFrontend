import { Accordion as AccordionUI } from '@mantine/core'

function Accordion({ labels, values, items, multiple = false, ...props }: any) {
  if (typeof items.map === 'undefined' || items.length === 0) {
    return <></>
  }

  if (typeof values === 'undefined') {
    values = items
  }

  return (
    <AccordionUI
      className="mt-3"
      // defaultValue={props.initialItem}
      color="blue"
      multiple={multiple}
      {...props}
    >
      {items?.map((item: any, index: number) => {
        if (typeof labels[index] === 'undefined' || labels[index] === '') {
          return <></>
        }
        return (
          <AccordionUI.Item key={index} value={values[index]} className="mt-3">
            <AccordionUI.Control>{labels[index]}</AccordionUI.Control>
            <AccordionUI.Panel>{item}</AccordionUI.Panel>
          </AccordionUI.Item>
        )
      })}
    </AccordionUI>
  )
}

export default Accordion
