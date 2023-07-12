import React, { forwardRef } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Select from '../Select/Select'
import MultiSelect from '../MultiSelect/MultiSelect'
import { isEmpty } from '../../../utilities/strings'
import { getMatchedValues } from '../../../utilities/objects'
import Group from '../../UI/Group/Group'
import Stack from '../../UI/Stack/Stack'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  email?: string
  role?: { name: string }
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Stack spacing="1">
        {label}
        <Group>
          <small>{others.role?.name}</small>|<small>{others.email}</small>
        </Group>
      </Stack>
    </div>
  ),
)

function UserSelector({
  data,
  onChange,
  readOnly,
  placeholder = '-- Select --',
  filters,
  ...props
}: any) {
  const { get } = useAPI()
  const users = useQuery({
    queryKey: ['users', 'selector'],
    queryFn: async () =>
      await get({ endpoint: 'user?' + filters?.join('&') }).then((data: any) =>
        data.map((item: any) => ({
          ...item,
          label: item?.name ?? item.label ?? '',
          value: String(item.id ?? ''),
        })),
      ),
    enabled: isEmpty(data),
  })

  const changeHandler = ({ value: newValue }: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  const usersList = users.data ?? data

  if (readOnly) {
    return <>{getMatchedValues({ value: props.value, data: usersList })}</>
  }

  return (
    <>
      {props.multiselect && (
        <MultiSelect
          key={users.isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          reloadData={users.refetch}
          onChange={changeHandler}
          data={[...(usersList || [])]}
        />
      )}
      {!props.multiselect && (
        <Select
          key={users.isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          reloadData={users.refetch}
          onChange={changeHandler}
          data={[...(usersList || [])]}
        />
      )}
    </>
  )
}

export default UserSelector
