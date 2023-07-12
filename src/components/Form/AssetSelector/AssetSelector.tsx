import React, { forwardRef } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Select from '../Select/Select'
import Avatar from '../../UI/Avatar/Avatar'
import useAssets from '../../../hooks/useAssets'
import MultiSelect from '../MultiSelect/MultiSelect'
import { isEmpty } from '../../../utilities/strings'
import { getMatchedValues } from '../../../utilities/objects'
import Group from 'src/components/UI/Group/Group'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string
  label: string
  description: string
  skip: any
  photo?: string
  'asset-type'?: {
    name?: string
  }
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {typeof others.photo !== 'undefined' && (
          <Avatar src={others.photo} size={30} />
        )}
        <div>
          {label}
          <Group spacing="sm">
            <small>{others['asset-type']?.name}</small>
          </Group>
        </div>
      </div>
    </div>
  ),
)

function AssetSelector({
  data,
  onChange,
  readOnly,
  placeholder = '-- Select --',
  skip,
  ...props
}: any) {
  const { get } = useAPI()

  let assetList: any = []
  const { data: assets, isLoading } = useAssets({
    bookable: Boolean(props.bookable) ?? false,
    asset_id: props.asset_id ?? false,
    queryKey: ['assets', 'selector'],
  })

  const changeHandler = ({ value: newValue }: any) => {
    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  if (isLoading) {
    return <></>
  }

  assetList =
    !isLoading &&
    typeof assets.map !== 'undefined' &&
    assets
      ?.filter((item: any) => isEmpty(skip) || !skip.includes(item.id))
      ?.map((item: any) => ({
        ...item,
        label: item?.label ?? item.name ?? '',
        value: String(item.id ?? ''),
      }))

  if (!isLoading && !assetList.length && Boolean(props.bookable)) {
    return <>No bookable assets available</>
  }
  if (readOnly) {
    return <>{getMatchedValues({ value: props.value, data: assetList })}</>
  }

  return (
    <>
      {props.multiselect && (
        <MultiSelect
          key={assets.isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          onChange={changeHandler}
          data={[...(assetList || [])]}
        ></MultiSelect>
      )}
      {!props.multiselect && (
        <Select
          key={assets.isLoading}
          itemComponent={SelectItem}
          placeholder={placeholder}
          required
          {...props}
          onChange={changeHandler}
          data={[...(assetList || [])]}
          searchable
        />
      )}
    </>
  )
}

export default AssetSelector
