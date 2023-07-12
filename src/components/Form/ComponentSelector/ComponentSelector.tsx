import React, { forwardRef, useMemo } from 'react'
import Select from '../Select/Select'
import componentRegistry from '../../../registry/componentRegistry'

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

function ComponentSelector(props: any) {
  const data = useMemo(() => getResponseTypes(), [])

  return (
    <Select
      {...props}
      data={data}
      itemComponent={SelectItem}
      required
      searchable
    />
  )
}

export default ComponentSelector
