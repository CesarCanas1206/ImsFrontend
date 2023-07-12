import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Button from 'src/components/Form/Button/Button'
import Col from 'src/components/UI/Col/Col'
import Group from 'src/components/UI/Group/Group'
import Row from 'src/components/UI/Row/Row'
import Stack from 'src/components/UI/Stack/Stack'
import { get, put } from 'src/hooks/useAPI'
import ModalContext from '../../../context/ModalContext'
import DataGridContext from '../../../context/DataGridContext'

function FormDetail({ id, isAdmin = false }: any) {
  const { onClose } = useContext(ModalContext)
  const { reloadTable } = useContext(DataGridContext)

  const params = useParams()

  id = id ?? params.id
  isAdmin = Boolean(isAdmin)

  const [data, setData] = useState<any>({})

  const defaultComponent = !isAdmin ? 'Input' : 'ReadOnly'

  const ref = useRef(0)

  useEffect(() => {
    if (ref.current) {
      return
    }
    ref.current = 1
    get({
      endpoint: `form/${id}`,
    }).then((res) => {
      setData(res)
    })
  }, [])

  const changeHandler = ({ type, value, reference }: any) => {
    setData((prev: any) => ({ ...prev, [reference]: value }))
  }

  const saveHandler = async () => {
    put({
      endpoint: `form/${id}`,
      data: data,
    })
    onClose()
    reloadTable()
  }

  const categoryFields =
    data.category !== 'casual'
      ? []
      : [
          {
            label: 'Form heading',
            reference: 'formheading',
            component: 'Input',
          },
          {
            label: 'Privacy heading',
            reference: 'privacyheading',
            component: 'Input',
          },
          {
            label: 'Privacy',
            reference: 'privacy',
            component: 'Textarea',
          },
          {
            label: 'Declaration heading',
            reference: 'declarationheading',
            component: 'Input',
          },
          {
            label: 'Declaration',
            reference: 'declaration',
            component: 'Textarea',
          },
          {
            label: 'On behalf of heading',
            reference: 'onbehalfheading',
            component: 'Input',
          },
          {
            label: 'On behalf of',
            reference: 'onbehalf',
            component: 'Textarea',
          },
        ]
  const fields = [
    { label: 'Name', reference: 'name', component: 'Input' },
    { label: 'Description', reference: 'description', component: 'Textarea' },
    { label: 'Reference', reference: 'reference', component: 'Input' },
    { label: 'Category', reference: 'category', component: 'Input' },
    { label: 'Endpoint', reference: 'endpoint', component: 'Input' },
    ...categoryFields,
  ]

  return (
    <div>
      <Stack>
        {fields.map((field: any) => {
          if (Object.keys(field).length === 0) {
            return <></>
          }
          return (
            <Row>
              <Col span="4" key={field.reference}>
                <label>{field.label}</label>
              </Col>
              <Col span="8">
                <DynamicComponent
                  component={field.component ?? defaultComponent}
                  onChange={({ value, ref }: any) =>
                    changeHandler({
                      type: field.type ?? 'data',
                      value,
                      reference: ref ?? field.reference,
                    })
                  }
                  {...{
                    value: data?.[field.reference] ?? '',
                    ...(field.props ?? {}),
                  }}
                />
              </Col>
            </Row>
          )
        })}
        <Group position="right">
          <Button onClick={saveHandler} icon="Save" text="Update & exit" />
        </Group>
      </Stack>
    </div>
  )
}

export default FormDetail
