import { Select as SelectUI } from '@mantine/core'
import { lazy, useState } from 'react'
import { getMatchedValues } from '../../../utilities/objects'
import Group from 'src/components/UI/Group/Group'

const ModalButtonForm = lazy(
  () => import('../../UI/ModalButtonForm/ModalButtonForm'),
)
const Form = lazy(() => import('../Form/Form'))
const Input = lazy(() => import('../Input/Input'))

export interface SelectProps {
  onChange?: any
  label?: any
  name?: any
  className?: any
  style?: any
  required?: boolean
  searchable?: boolean
  value?: any
  placeholder?: any
  data?: any
  options?: any
  readOnly?: any
  props?: any
  itemComponent?: any
  readOnlyBrackets?: any
  formId?: any
  reloadData?: any
  icon?: any
  clearable?: boolean
  disabled?: boolean
  defaultValues?: any
  other?: any
  size?: string
}

export function Select({
  onChange,
  label,
  value,
  placeholder = '-- Select --',
  data,
  options,
  style,
  className,
  readOnly,
  formId,
  reloadData,
  icon,
  clearable,
  searchable,
  disabled = false,
  itemComponent,
  defaultValues,
  other,
  size,
  ...props
}: SelectProps) {
  const [isSelectChange, setIsSelectChange] = useState(true)

  const changeHandler = (newValue: any, selectChange = true) => {
    if (other && newValue === 'other') {
      selectChange = false
      newValue = ''
    }
    setIsSelectChange(selectChange)

    if (typeof onChange !== 'undefined') {
      onChange({ name: props?.name, value: String(newValue) })
    }
  }

  if (typeof options !== 'undefined') {
    data = options
  }

  if (readOnly) {
    const openBrack = props?.readOnlyBrackets ? ' (' : ''
    const closeBrack = props?.readOnlyBrackets ? ')' : ''
    return (
      <>
        {openBrack}
        {getMatchedValues({ value, data })}
        {closeBrack}
      </>
    )
  }

  let optionData = props.required
    ? data
    : [{ label: placeholder, value: '' }, ...(data || [])]

  const showOtherField =
    other &&
    (!isSelectChange ||
      (String(value) !== '' &&
        typeof data?.find(
          (item: any) => String(item.value) === String(value),
        ) === 'undefined'))

  if (other) {
    optionData = [...optionData, { label: 'Other', value: 'other' }]
    if (showOtherField) {
      // placeholder = 'Other'
    }
  }

  return (
    <>
      <SelectUI
        label={label}
        value={String(value)}
        withinPortal
        radius="md"
        onChange={changeHandler}
        placeholder={placeholder}
        clearable={clearable}
        searchable={searchable}
        zIndex={1080}
        data={optionData}
        style={style}
        className={className}
        icon={icon}
        disabled={disabled}
        itemComponent={itemComponent}
        size={size}
        styles={{
          input: {
            backgroundColor: 'var(--c-input-bg, #ffffff)',
            color: 'var(--c-input, #000000)',
          },
        }}
      />
      {typeof formId !== 'undefined' && (
        <Group>
          <ModalButtonForm
            icon="plus"
            text="Add new"
            mt={5}
            compact
            formId={formId}
            onSave={({ id }: { id: string }) => {
              if (typeof reloadData !== 'undefined') {
                reloadData()
              }
              changeHandler(id)
            }}
            defaultValues={defaultValues}
          />
        </Group>
      )}
      {showOtherField && (
        <Input
          value={value}
          placeholder="Other"
          onChange={({ value }: any) => changeHandler(value, false)}
          style={{ marginTop: 5 }}
        />
      )}
    </>
  )
}

export default Select
