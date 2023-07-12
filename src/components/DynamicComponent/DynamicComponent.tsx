import React, { Children, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import componentRegistry from '../../registry/componentRegistry'
import { textReplace } from './textReplace'

export interface IDynamicComponent {
  id?: number | string
  component?: keyof typeof componentRegistry
  props?: any
  shared?: any
  row?: any
  sub?: any
  children?: any
  [k: string]: any
}

/**
 * DynamicComponent takes in a component name and props and renders the component
 * The components are loaded from the componentRegistry
 */
function DynamicComponent({
  id,
  component,
  props,
  shared,
  row,
  sub,
  children,
  ...otherProps
}: IDynamicComponent) {
  const { details } = useContext(AppContext)
  const componentItem =
    typeof component !== 'undefined' ? componentRegistry[component] : component
  const params = useParams()
  const rowValues = useMemo(
    () => ({ ...params, params, details, ...row }),
    [row, params, details],
  )

  /** Return notice for undefined components */
  if (typeof componentItem === 'undefined') {
    return <>DynamicComponent: Invalid component {component}</>
  }

  /** If loading form the componentGroupRegistry */
  if (typeof componentItem.components !== 'undefined') {
    sub = componentItem.components
  }

  const Component = componentItem.component

  /** Map sub to children if set */
  if (typeof sub !== 'undefined' && Array.isArray(sub) && sub.length !== 0) {
    children = [
      ...(Children.toArray(children) ?? []),
      ...sub.map((item: any, index: number) =>
        typeof item.component === 'undefined' ? (
          item
        ) : (
          <DynamicComponent
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

  /** If loading from the componentGroupRegistry */
  if (typeof Component === 'undefined') {
    return <>{children}</>
  }

  /**
   * Format the properties for this component
   * Placeholder values like {id} will be replaced with the row value for id or blank if not found.
   */
  const formattedProps: any = {
    ...row,
    ...textReplace({ ...otherProps, ...props, ...shared }, rowValues, true),
  }

  return (
    <Component
      key={id ?? component}
      id={id}
      {...formattedProps}
      children={children}
      row={{ ...row }}
    />
  )
}

export default DynamicComponent
