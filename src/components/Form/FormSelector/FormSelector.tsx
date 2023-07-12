import React, { forwardRef } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Select from '../Select/Select'
import Avatar from '../../UI/Avatar/Avatar'
import MultiSelect from '../MultiSelect/MultiSelect'
import { getMatchedValues } from '../../../utilities/objects'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  description: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div>
          {label}
          <div>
            <small>{description}</small>
          </div>
        </div>
      </div>
    </div>
  ),
)

function FormSelector({
  data,
  onChange,
  readOnly,
  placeholder = '-- Select --',
  category = 'checklist',
  ...props
}: any) {
  const { get } = useAPI()

  let formList: any = []

  const {
    data: forms,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['form'],
    queryFn: async () =>
      await get({
        endpoint: `form`,
      }),
  })

  const changeHandler = ({ value: newValue }: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  if (isLoading) {
    return <></>
  }

  const { name, value, ...selectProps } = props

  formList = forms
    ?.filter((f: any) =>
      category.split(',').find((cat: any) => cat === f.category),
    )
    ?.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
    ?.map((item: any) => ({
      ...item,
      label: item.name ?? '',
      value: String(item.id ?? ''),
    }))

  if (readOnly) {
    return <>{getMatchedValues({ value: props.value, data: formList })}</>
  }

  return (
    <>
      {props.multiselect && (
        <MultiSelect
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={changeHandler}
          data={[...(formList || [])]}
        ></MultiSelect>
      )}
      {!props.multiselect && (
        <Select
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={changeHandler}
          data={[...(formList || [])]}
          searchable
        />
      )}
    </>
  )
}

export default FormSelector
