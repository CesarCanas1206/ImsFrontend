import React, { Children, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import componentRegistry from '../../registry/componentRegistry'
import { textReplace } from '../DynamicComponent/textReplace'

export interface ILoadComponent {
  id?: number | string
  component?: keyof typeof componentRegistry
  props?: any
  shared?: any
  row?: any
  sub?: object | any
  children?: any
  [k: string]: any
}

function LoadComponent({
  id,
  component,
  props,
  shared,
  row,
  sub,
  children,
  ...otherProps
}: ILoadComponent) {
  const { details } = useContext(AppContext)
  const componentItem =
    typeof component !== 'undefined' ? componentRegistry[component] : component
  const params = useParams()
  const rowValues = useMemo(
    () => ({ ...params, params, details, ...row }),
    [row, params, details],
  )

  if (typeof componentItem === 'undefined') {
    return <>DynamicComponent: Invalid component {component}</>
  }

  if (typeof componentItem.components !== 'undefined') {
    sub = componentItem.components
  }

  const Component = componentItem.component

  const formattedProps: any = {
    id,
    ...row,
    ...textReplace({ ...otherProps, ...props, ...shared }, rowValues, true),
  }

  if (typeof sub !== 'undefined' && Array.isArray(sub) && sub.length !== 0) {
    children = [
      ...(Children.toArray(children) ?? []),
      ...sub.map((item: any, index: number) =>
        typeof item.component === 'undefined' ? (
          item
        ) : (
          <LoadComponent
            key={item.id ?? index ?? item.component}
            row={rowValues}
            shared={shared}
            {...otherProps}
            {...item}
          />
        ),
      ),
    ]
  }

  if (typeof Component === 'undefined') {
    return <>{children}</>
  }

  return (
    <Component
      key={id ?? component}
      {...formattedProps}
      children={children}
      row={{ ...row }}
    />
  )
}

export default LoadComponent
