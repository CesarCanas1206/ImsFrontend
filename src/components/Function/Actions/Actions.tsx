import React, { Children, useContext, useEffect, useRef, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'
import DataGridContext from '../../../context/DataGridContext'
import useAPI from '../../../hooks/useAPI'

export const settings = [
  {
    name: 'actions',
    label: 'Actions',
    type: 'Json',
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

export function Actions(props: ActionTypes) {
  const hasRun = useRef<any>()
  const [running, setRunning] = useState(true)
  const [id, setId] = useState()
  const navigate = useNavigate()
  const { post, doDelete, put } = useAPI()
  const { reloadTable } = useContext(DataGridContext)

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
    }
    if (action === 'refresh') {
      reloadTable()
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

export default Actions
