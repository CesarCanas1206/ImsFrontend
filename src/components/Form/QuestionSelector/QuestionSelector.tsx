import React, { forwardRef, useContext, useMemo } from 'react'
import Select from '../Select/Select'
import componentRegistry from '../../../registry/componentRegistry'
import FormContext from '../../../context/FormContext'
import useForm from '../../../hooks/useForm'

const getResponseTypes = () => {
  let responseTypes: any = []
  Object.entries(componentRegistry)
    .sort(([a]: any, [b]: any) => a.localeCompare(b))
    .sort(([a]: any, [b]: any) => a?.category?.localeCompare(b?.category))
    .forEach(([key, item]: any) => {
      responseTypes = [
        ...responseTypes,
        {
          label: key.replace(/([a-z])([A-Z])/g, '$1 $2'),
          value: key,
          group: item.category.replace(/([a-z])([A-Z])/g, '$1 $2'),
        },
      ]
    })
  return responseTypes
}

type ItemProps = {
  label?: string
  value?: string
  component?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, component, value, ...others }: ItemProps, ref) => (
    <div
      style={{ display: 'flex', gap: 10, alignItems: 'center' }}
      ref={ref}
      {...others}
    >
      <div>
        {label}
        <div>
          <small>{component}</small>
        </div>
      </div>
    </div>
  ),
)

function QuestionSelector(props: any) {
  const { getValue } = useContext(FormContext)
  const form = useForm({ formId: getValue('form_id') })

  const data = useMemo(() => {
    return form.data?.questions?.map((item: any) => ({
      label: `${item.text ?? item.component} (${item.question_order})`,
      value: item.id,
      component: item.component,
    }))
  }, [form.data])

  if (form.isLoading) {
    return
  }

  // console.log(getValue('form_id'))
  // console.log(form.data.questions)
  console.log(data)
  console.log(props)
  return <Select {...props} data={data} itemComponent={SelectItem} />
}

export default QuestionSelector
