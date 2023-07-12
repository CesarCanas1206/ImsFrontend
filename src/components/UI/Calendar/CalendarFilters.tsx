import Input from 'src/components/Form/Input/Input'
import Icon from '../Icon/Icon'
import AssetSelector from 'src/components/Form/AssetSelector/AssetSelector'
import { isEmpty } from 'src/utilities/strings'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import Button from 'src/components/Form/Button/Button'
import Stack from '../Stack/Stack'

function CalendarFilters({ children, filters, setFilters }: any) {
  const [showModal, setShowModal] = useState(false)
  const changeHandler = ({ name, value }: any) => {
    // null comes from the clearing the AssetSelector
    value = value === 'null' ? '' : value
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <Input
        icon={<Icon type="search"></Icon>}
        placeholder="Search"
        value={filters?.filter}
        onChange={({ value }: any) => changeHandler({ name: 'filter', value })}
        style={{ maxWidth: 250 }}
      />
      {children}
      <Input
        value={
          !isEmpty(filters?.asset_id)
            ? `${filters.asset_id.split(',').length} selected`
            : ''
        }
        placeholder="Venue filter"
        style={{ maxWidth: 120 }}
        onClick={() => setShowModal(true)}
      />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Stack align="end">
          <AssetSelector
            onChange={({ value }: any) =>
              changeHandler({ name: 'asset_id', value })
            }
            style={{ width: '100%' }}
            placeholder="Venue"
            value={filters?.asset_id}
            formatted={true}
            multiselect
            clearable
          />
          <Button
            onClick={() => changeHandler({ name: 'asset_id', value: '' })}
            icon="Filter"
            variant="secondary"
            text="Clear venue filters"
          />
          <Button
            onClick={() => setShowModal(false)}
            variant="secondary"
            text="Close"
          />
        </Stack>
      </Modal>
    </>
  )
}

export default CalendarFilters
