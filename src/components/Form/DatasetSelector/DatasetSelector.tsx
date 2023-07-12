import React, { forwardRef } from 'react'
import Select from '../Select/Select'
import useRegistryQuery from '../../../hooks/useRegistryQuery'
import { isEmpty } from 'src/utilities/strings'

type ItemProps = {
  label?: string
  value?: string
  group?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, group, value, ...others }: ItemProps, ref) => (
    <div
      style={{ display: 'flex', gap: 10, alignItems: 'center' }}
      ref={ref}
      {...others}
    >
      <div>
        {label}
        <div>
          <small>{group}</small>
        </div>
      </div>
    </div>
  ),
)

function DatasetSelector({ endpoint = 'dataset', skip, ...props }: any) {
  const { data, isLoading } = useRegistryQuery({ endpoint })

  if (isLoading) return <>Loading...</>

  return (
    <Select
      {...props}
      data={data
        ?.filter((item: any) => isEmpty(skip) || !skip.includes(item.reference))
        .map((item: any) => ({
          label: item.name,
          value: item.slug || item.reference,
        }))}
      itemComponent={SelectItem}
      required
      searchable
    />
  )
}

export default DatasetSelector
