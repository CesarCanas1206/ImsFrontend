import { useContext } from 'react'
import Group from '../../UI/Group/Group'
import FormContext from '../../../context/FormContext'
import Input from '../Input/Input'

function InputGenderCount({ prefix, onChange, withHeading = false }: any) {
  const { getValue } = useContext(FormContext)

  const changeHandler = ({ value, key, prefix: sentPrefix }: any) => {
    onChange({ ref: `${sentPrefix ?? prefix}${key}`, value })
  }

  const values: { [key: string]: string } = {
    male: getValue(`${prefix}male`),
    female: getValue(`${prefix}female`),
    other: getValue(`${prefix}other`),
  }

  const fields = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
  }

  return (
    <>
      {withHeading && (
        <Group spacing={4} key="heading" grow>
          {Object.entries(fields).map(([label]) => (
            <span key={label}>{label}</span>
          ))}
        </Group>
      )}
      <Group spacing={4} key="fields" grow>
        {Object.entries(fields).map(([label, key]) => (
          <Input
            key={key}
            type="number"
            onChange={({ value }: any) => changeHandler({ value, key: key })}
            value={values[key] ?? 0}
          />
        ))}
      </Group>
    </>
  )
}

export default InputGenderCount
