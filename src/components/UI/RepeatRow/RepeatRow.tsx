import React, { Children, useEffect, useState } from 'react'
import Question from '../../Form/Question/Question'
import useAPI from '../../../hooks/useAPI'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export const settings = [
  {
    name: 'endpoint',
    label: 'Endpoint',
    type: 'Input',
  },
]

export function RepeatRow({ endpoint, sub, children }: any) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { get } = useAPI()

  useEffect(() => {
    let mounted = true
    const run = async () => {
      const tmpItems = await get({
        endpoint,
      })

      if (mounted) {
        setItems(tmpItems)
        setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return <DynamicComponent component="Loader" />
  }

  return (
    <>
      {items.map((item: any) => (
        <div
          style={{
            borderBottom: '1px solid #ccc',
            padding: '10px 3px',
          }}
          key={item.id}
          className="mb-1"
        >
          {Children.map(children, (child: any) => {
            // console.log(child)
            // if (typeof child?.component === 'undefined') {
            //   return React.cloneElement(child, { row: item })
            // }

            return (
              <DynamicComponent
                component={child?.component ?? child.props?.component}
                props={child.props?.props ?? child?.props}
                sub={child.props?.sub ?? child.sub}
                children={child.children}
                row={item}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}

export default RepeatRow
