import React, { forwardRef } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Select from '../Select/Select'
import MultiSelect from '../MultiSelect/MultiSelect'
import {
  getMatchedValues,
  sortAlphabeticallyByName,
} from '../../../utilities/objects'

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

function HirerSelector({
  data,
  onChange,
  readOnly,
  placeholder = '-- Select --',
  ...props
}: any) {
  const { get } = useAPI()

  let hirerList: any = []

  const {
    data: hirers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['hirer-selector'],
    queryFn: async () =>
      await get({
        endpoint: `hirer-list`,
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

  hirerList = hirers?.map((item: any) => ({
    ...item,
    label: item.name ?? '',
    value: String(item.id ?? ''),
  }))

  if (readOnly) {
    return <>{getMatchedValues({ value: props.value, data: hirerList })}</>
  }

  return (
    <>
      {props.multiselect && (
        <MultiSelect
          key={isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          onChange={changeHandler}
          data={[...(hirerList || [])]}
        ></MultiSelect>
      )}
      {!props.multiselect && (
        <Select
          key={isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          onChange={changeHandler}
          data={[...(hirerList || [])]}
          searchable
        />
      )}
    </>
  )
}

export default HirerSelector
