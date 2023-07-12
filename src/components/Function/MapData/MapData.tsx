import React, { useEffect, useState } from 'react'
import Card from '../../UI/Card/Card'
import useAPI from '../../../hooks/useAPI'
import Group from '../../UI/Group/Group'
import Button from '../../Form/Button/Button'
import { useSearchParams } from 'react-router-dom'
import Input from 'src/components/Form/Input/Input'
import Stack from 'src/components/UI/Stack/Stack'
import CopyButton from 'src/components/UI/CopyButton/CopyButton'
import { v4 as uuid } from 'uuid'
import Select from 'src/components/Form/Select/Select'
import { formatDate } from 'src/utilities/dates'
import Checkbox from 'src/components/Form/Checkbox/Checkbox'

const onlyFields = (input: any, fields: string[]): Object[] => {
  const formatted: any = {}
  Object.keys(input).filter((key) => {
    let isInFields: boolean = true
    if (!fields.includes(key)) {
      isInFields = false
    }
    if (isInFields) {
      formatted[key] = input[key]
    }
    return isInFields
  })

  return formatted
}

const exceptFields = (input: any, fields: string[]): Object[] => {
  const formatted: any = {}
  Object.keys(input).filter((key) => {
    let isInFields: boolean = true
    if (!fields.includes(key)) {
      isInFields = false
    }
    if (!isInFields) {
      formatted[key] = input[key]
    }
    return isInFields
  })

  return formatted
}

function addSlashes(str: string) {
  return (str + '').replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0')
}

const dateFields = ['created_at', 'updated_at', 'deleted_at']
const insert = (table: string, data: any) => {
  dateFields.map((field) => {
    if (
      typeof data[field] !== 'undefined' &&
      data[field] !== null &&
      data[field] !== ''
    ) {
      data[field] = formatDate(data[field], 'YYYY-MM-DD HH:mm:ss')
    }
  })

  const fields = Object.keys(data)
  const values = Object.values(data)
  const sql = `INSERT INTO \`${table}\` (${fields.join(', ')}) VALUES (${values
    .map((v) =>
      !v || v === 'null'
        ? 'null'
        : typeof v !== 'string'
        ? `'${JSON.stringify(v)}'`
        : `'${addSlashes(v)}'`,
    )
    .join(', ')});`
  return sql
}

const MapData = () => {
  const [searchParams] = useSearchParams()
  const { call } = useAPI({ url: searchParams.get('url') ?? undefined })
  const [endpoint, setEndpoint] = useState('')
  const [response, setResponse] = useState('')
  const [preset, setPreset] = useState('')
  const [method] = useState('get')
  const [table, setTable] = useState('')
  const [main, setMain] = useState('')
  const [override, setOverride] = useState('')
  const [exclude, setExclude] = useState('')
  const [time, setTime] = useState(0)
  const [addFields, setAddFields] = useState(1)

  const handleSubmit = async () => {
    setTime(0)
    const start = Date.now()
    setResponse('Loading...')
    const data = {
      endpoint,
      method,
    }
    const res = await call(data)
    setTime(Date.now() - start)
    if (res) {
      const fields = {
        main: main.split(',').map((field) => field.trim()),
        exclude: [
          ...main.split(',').map((field) => field.trim()),
          ...exclude.split(',').map((field) => field.trim()),
        ],
      }

      const obj = res
      const queries: any = []
      const overrideValue =
        override !== '' ? JSON.parse(override ?? '{}') ?? {} : {}
      obj.forEach((item: any) => {
        item = { ...item, ...overrideValue }

        queries.push(insert(table, onlyFields(item, fields.main)))
        if (String(addFields) === '0') {
          return
        }
        const collectionFields = exceptFields(item, fields.exclude)
        Object.keys(collectionFields).forEach((key: any) => {
          const value = collectionFields[key]
          if (value) {
            const collectionField = {
              id: uuid(),
              collection_id: item.id,
              reference: key,
              value: value,
            }
            queries.push(insert('collection_field', collectionField))
          }
        })
      })

      setResponse(queries.join('\n'))
    } else {
      setResponse(
        'The api call failed, you could try putting `d/` at the start to get the data',
      )
    }
  }

  const presets: any = {
    asset: {
      endpoint: 'd/asset',
      table: 'asset',
      main: 'id,parent_id,name,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug',
    },
    //temporary to get data using the collection model instead of the asset model
    assetold: {
      endpoint: 'd/asset-old',
      table: 'asset',
      main: 'id,parent_id,name,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug',
    },
    hirer: {
      endpoint: 'd/hirer',
      table: 'hirer',
      main: 'id,parent_id,name,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug,asset,user,hirer_type',
    },
    booking: {
      endpoint: 'd/booking',
      table: 'booking',
      main: 'id,parent_id,form_id,hirer_id,type,application_id,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug,hirer,user,ai::application_id,ai::casual_id,usage',
    },
    calendar: {
      endpoint: 'd/calendar',
      table: 'calendar',
      main: 'id,parent_id,form_id,asset_id,title,start,end,pending,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug,hirer,user',
    },
    allocation: {
      endpoint: 'd/allocation',
      table: 'booking',
      main: 'id,parent_id,form_id,hirer_id,type,application_id,created_at,created_by,updated_at,updated_by,deleted_at,deleted_by',
      exclude: 'slug,hirer,user,ai::application_id,season',
      override: '{"type":"allocation"}',
    },
  }

  useEffect(() => {
    if (preset === '') {
      return
    }

    if (typeof presets[preset] === 'undefined') {
      return
    }

    setEndpoint(presets[preset].endpoint)
    setTable(presets[preset].table)
    setMain(presets[preset].main)
    setExclude(presets[preset].exclude)
    setOverride(presets[preset].override ?? '')
    setPreset('')
  }, [preset])

  return (
    <Stack>
      <Stack>
        <Group>
          Preset
          <Select
            value={preset}
            onChange={(e: any) => setPreset(e.value)}
            options={Object.keys(presets).map((item: string) => ({
              value: item,
              label: item,
            }))}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Endpoint
          <Input
            autoFocus
            value={endpoint}
            placeholder="e.g. d/asset"
            onChange={(e: any) => setEndpoint(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Table
          <Input
            value={table}
            placeholder="e.g. asset"
            onChange={(e: any) => setTable(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Main fields
          <Input
            value={main}
            placeholder="e.g. id, form_id, parent_id"
            onChange={(e: any) => setMain(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Exclude fields
          <Input
            value={exclude}
            placeholder="e.g. id, form_id, parent_id"
            onChange={(e: any) => setExclude(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Override
          <Input
            value={override}
            placeholder={`e.g. { "type" : "allocation"}`}
            onChange={(e: any) => setOverride(e.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            style={{ minWidth: '50%', flexGrow: 1 }}
          />
        </Group>
        <Group>
          Add fields (collection_field)
          <Checkbox
            value={addFields}
            yesNo={false}
            onChange={(e: any) => setAddFields(e.value)}
          />
        </Group>
        <Group position="apart">
          <div>
            {time > 0 && (
              <Group>
                <p style={{ marginBottom: 0 }}>Loaded in: ~{time / 1000}s</p>
                <CopyButton value={response} />
              </Group>
            )}
          </div>
          <Button onClick={handleSubmit} text="Submit" />
        </Group>
      </Stack>
      {response !== '' && (
        <Card
          style={{
            alignSelf: 'stretch',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
            minHeight: 150,
          }}
        >
          {response}
        </Card>
      )}
    </Stack>
  )
}

export default MapData
