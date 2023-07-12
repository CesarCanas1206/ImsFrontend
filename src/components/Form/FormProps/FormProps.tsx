import { useEffect, useState } from 'react'
import Group from '../../UI/Group/Group'
import Button from '../Button/Button'
import Checkbox from '../Checkbox/Checkbox'
import Segmented from '../Segmented/Segmented'
import Input from '../Input/Input'
import Stack from 'src/components/UI/Stack/Stack'
import Card from 'src/components/UI/Card/Card'

const widthData = Array(13)
  .fill(null)
  .map((_v: any, ind: number) => ({
    label: ind,
    value: ind.toString(),
  }))

function FormProps({ value, onChange }: any) {
  const [formProps, setFormProps] = useState(
    typeof value?.question_width !== 'undefined'
      ? value
      : {
          question_width: 6,
          answer_width: 6,
        },
  )

  useEffect(() => {
    onChange({ value: formProps })
  }, [formProps])

  const changeHandler = (name: any, value: any) => {
    setFormProps((prev: any) => ({ ...prev, [name]: value }))
  }

  const addConditionHandler = () => {
    setFormProps((prev: any) => ({
      ...prev,
      conditions: [
        ...(prev.conditions ?? []),
        { on: 'test', type: '=', value: 'test' },
      ],
    }))
  }

  const removeConditionHandler = (index: number) => {
    setFormProps((prev: any) => ({
      ...prev,
      conditions: [
        ...prev?.conditions.filter((_cond: any, idx: number) => idx !== index),
      ],
    }))
  }

  const updateConditionHandler = (index: number, name: any, value: any) => {
    setFormProps((prev: any) => ({
      ...prev,
      conditions: [
        ...prev?.conditions.map((cond: any, idx: number) =>
          idx === index ? { ...cond, [name]: value } : cond,
        ),
      ],
    }))
  }

  return (
    <Stack>
      <Group position="apart">
        <strong>Conditions</strong>
        <Button onClick={addConditionHandler} text="Add condition" />
      </Group>
      {formProps?.conditions?.map((cond: any, idx: number) => (
        <div key={idx}>
          <Card>
            <Group position="apart">
              <Stack>
                <Group>
                  On:
                  <Input
                    onChange={({ value }: any) =>
                      updateConditionHandler(idx, 'on', value)
                    }
                    value={cond.on}
                  />
                </Group>
                <Group>
                  Type:
                  <Segmented
                    value={cond.type}
                    data={[
                      { label: 'Equals', value: '=' },
                      { label: 'Not equal', value: '!=' },
                      { label: 'Empty', value: 'empty' },
                      { label: '!Empty', value: '!empty' },
                      { label: 'Contains', value: '~' },
                    ]}
                    onChange={({ value }: any) =>
                      updateConditionHandler(idx, 'type', value)
                    }
                  />
                </Group>
                <Group>
                  Value:{' '}
                  <Input
                    type="text"
                    onChange={({ value }: any) =>
                      updateConditionHandler(idx, 'value', value)
                    }
                    value={cond.value}
                  />
                </Group>
              </Stack>
              <Button
                onClick={() => removeConditionHandler(idx)}
                text="-"
                variant="danger"
                compact
                tooltip="Remove condition"
              />
            </Group>
          </Card>
        </div>
      ))}
      <Group position="apart">
        <strong>Question width</strong>
        <Segmented
          value={formProps.questionWidth ?? formProps.question_width}
          data={widthData}
          onChange={({ value }: any) => changeHandler('question_width', value)}
        />
      </Group>
      <Group position="apart">
        <strong>Answer width</strong>
        <Segmented
          value={formProps.answerWidth ?? formProps.answer_width}
          data={widthData}
          onChange={({ value }: any) => changeHandler('answer_width', value)}
        />
      </Group>
      <Group position="apart">
        <strong>Help text</strong>
        <Input
          value={formProps.help}
          onChange={({ value }: any) => changeHandler('help', value)}
        />
      </Group>
      {/* Has children
      <Checkbox
        value={formProps.subChildren ?? false}
        onChange={({ value }: any) => changeHandler('subChildren', value)}
      />
      <br /> */}
    </Stack>
  )
}

export default FormProps
