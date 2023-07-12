import React from 'react'
import { componentRegistry } from '../../registry/componentRegistry'

type IFormatProps = {
  props: any
  sub?: any
}

function formatProps({ props, sub }: IFormatProps) {
  if (props === null) {
    props = {}
  }
  if (typeof sub !== 'undefined' && Array.isArray(sub)) {
    props.children = sub?.map((item, index) => {
      return typeof item.component !== 'undefined' ? (
        <DynamicComponentBuilder
          key={item.id || item}
          id={item.id}
          component={item.component}
          props={item.props}
          sub={item.sub}
        />
      ) : (
        item
      )
    })
  }
  return props
}

interface IDynamicComponentBuilder {
  sub?: object[]
  component: string
  props?: any
  id?: any
}

export function DynamicComponentBuilder({
  sub,
  component,
  props,
  id,
}: IDynamicComponentBuilder) {
  const componentItem = componentRegistry[component]

  if (typeof componentItem === 'undefined') {
    return <>DynamicComponentBuilder: Invalid component</>
  }

  const Component = componentItem.component

  return (
    <>
      <Component {...formatProps({ props, sub })} />
    </>
  )
}

export default DynamicComponentBuilder
