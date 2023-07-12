import React, { forwardRef, useContext } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Select from '../Select/Select'
import MultiSelect from '../MultiSelect/MultiSelect'
import { getMatchedValues } from '../../../utilities/objects'
import Input from '../Input/Input'

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

function CustomSelector({
  data,
  onChange,
  readOnly,
  placeholder = '-- Select --',
  ...props
}: any) {
  const { get } = useAPI()

  const hirerId = props?.hirer_id
  const {
    data: hirer,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['hirer', hirerId],
    queryFn: async () =>
      await get({
        endpoint: `hirer-memberdetails?id=${hirerId}`,
      }),
  })

  let selectList: any = []

  const changeHandler = ({ value: newValue }: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  if (isLoading) {
    return <></>
  }

  const { name, value, ...selectProps } = props

  const sport = hirer?.find((f: any) => f.id === hirerId)?.sport ?? undefined
  const hirerTypeId = props?.form?.season?.hirer_type_id ?? ''

  selectList =
    (sport &&
      sport
        ?.find(
          (f: any) => f,
          // todo - filter by sport based on sport set for hirer_type_id for hirer
          // (f.hirer_type_id ?? '' === '') || f.hirer_type_id === hirerTypeId,
        )
        ?.[props.reference]?.map((item: any) => ({
          label: item.name ?? item,
          value: String(item.id ?? item.name ?? item),
        }))) ??
    []

  let matchedValue = getMatchedValues({
    value: value,
    data: selectList,
  })

  if (matchedValue === '' && value !== '') {
    matchedValue = value
    selectList = [...selectList, { label: matchedValue, value: matchedValue }]
  }

  if (readOnly) {
    return <>{matchedValue}</>
  }

  return (
    <>
      {props.multiselect && selectList.length !== 0 && (
        <MultiSelect
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={changeHandler}
          data={[...(selectList || [])]}
        ></MultiSelect>
      )}
      {!props.multiselect && selectList.length !== 0 && (
        <Select
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={changeHandler}
          data={[...(selectList || [])]}
          searchable
          other
        />
      )}
      {selectList.length === 0 && (
        <Input
          value={value}
          placeholder=""
          onChange={changeHandler}
          style={{ marginTop: 5 }}
        />
      )}
    </>
  )
}

export default CustomSelector
