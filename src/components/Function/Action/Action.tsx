import React, { Children, useContext, useEffect, useRef, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'
import DataGridContext from '../../../context/DataGridContext'
import useAPI from '../../../hooks/useAPI'
import FormContext from '../../../context/FormContext'

export const settings = [
  {
    name: 'action',
    label: 'Action',
    type: 'Select',
    options: [
      {
        name: 'Create',
        value: 'create',
      },
      {
        name: 'New',
        value: 'new',
      },
      {
        name: 'New and navigate',
        value: 'new_navigate',
      },
      {
        name: 'Update',
        value: 'update',
      },
      {
        name: 'Refresh',
        value: 'refresh',
      },
      {
        name: 'Delete',
        value: 'delete',
      },
      {
        name: 'Navigate',
        value: 'navigate',
      },
    ],
  },
  {
    name: 'formId',
    label: 'Form id',
    type: 'Input',
  },
  {
    name: 'specificId',
    label: 'Specific id',
    type: 'Input',
  },
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
  },
  {
    name: 'to',
    label: 'Navigate to',
    type: 'Input',
  },
  {
    name: 'data',
    label: 'Data',
    type: 'Input',
  },
]

type ActionTypes = {
  action: string
  formId?: string
  form_id?: string
  specificId?: string
  specific_id?: string
  parentId?: string
  parent_id?: string
  endpoint?: string
  to?: any | To
  data?: string | object | object[]
  after?: any
  after_action?: string
  children?: React.ReactNode | React.ReactNode[]
}

/**
 * Action
 * props:
 * @param props
 * @param props.action copy || create || delete || navigate || new || refreshPage || refresh || new_navigate || put || update
 * @param props.after run after action has been run
 * @param props.data used with new, put, update, new_navigate
 * @param props.endpoint used with copy, delete, put, update
 * @param props.to used with copy, navigate
 * @param props.action create - uses form_id === formId || form_id, specific_id === specificId || specific_id, parentId === parentId || parent_id || specificId || specific_id
 * @returns
 */
export function Action(props: ActionTypes) {
  const hasRun = useRef<any>()
  const [running, setRunning] = useState(true)
  const [id, setId] = useState()
  const navigate = useNavigate()
  const { post, doDelete, put, get } = useAPI()
  const { reloadTable } = useContext(DataGridContext)
  const parentFormContext = useContext(FormContext)

  const run = async (sentAction?: string) => {
    const action = sentAction || props.action?.toLowerCase()
    if (action === 'create') {
      console.log(`would send this info`, {
        form_id: props.formId,
        specific_id: props.specificId,
      })
      const result = await post({
        endpoint: 'collection',
        data: {
          form_id: props.formId || props.form_id,
          specific_id: props.specificId || props.specific_id,
          parent_id:
            props.parentId ||
            props.parent_id ||
            props.specificId ||
            props.specific_id,
        },
      })

      if (typeof result.id !== 'undefined') {
        setId(result.id)
        navigate(`/inspection/checklist/${props.formId}/${result.id}`)
      }
      setRunning(false)
    }
    if (action === 'navigate') {
      navigate(props.to)
    }
    if (action === 'refreshPage') {
      navigate(0)
    }
    if (action === 'delete') {
      await doDelete({
        endpoint: props.endpoint,
      })
      run('refresh')
    }
    if (action === 'refresh') {
      if (typeof reloadTable !== 'undefined' && reloadTable) {
        reloadTable()
      }
      if (typeof parentFormContext?.reloadFormItem !== 'undefined') {
        parentFormContext.reloadFormItem()
      }
    }
    if (action === 'new') {
      let data = props.data
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }

      await post({
        endpoint: props.endpoint,
        data: data,
      })
    }
    if (action === 'new_navigate') {
      let data = props.data
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }

      const result = await post({
        endpoint: props.endpoint,
        data: data,
      })

      if (typeof result.id !== 'undefined') {
        setId(result.id)
        navigate(`${props.to}/${result.id}`)
      }
    }
    if (action === 'put' || action === 'update') {
      await put({
        endpoint: props.endpoint,
        data: props.data,
      })
    }
    if (action === 'copy') {
      // get original
      const item = await get({ endpoint: props.endpoint })

      const { slug, asset, id, ...data } = item

      data.parent_id = id

      // create new copy
      await post({
        endpoint: props.to,
        data: data,
      })
    }

    if (props.after) {
      props.after()
    }
    // if (props.after_action) {
    //   run(props.after_action)
    // }
  }

  useEffect(() => {
    if (hasRun.current) {
      return
    }

    run()
    hasRun.current = true
  }, [])

  if (running || hasRun.current) {
    return <></>
  }

  return (
    <>
      {Children.map(props.children, (child: any) =>
        React.cloneElement(child, { props: { ...child.props, item_id: id } }),
      )}
    </>
  )
}

export default Action
