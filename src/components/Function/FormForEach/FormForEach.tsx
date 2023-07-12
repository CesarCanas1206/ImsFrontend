import React from 'react'
import { Children, useContext } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import FormContext from '../../../context/FormContext'

const addRowRecursive = (children: any, row: any) => {
  return Children.map(children, (child: any) => {
    if (
      typeof child.props?.children !== 'undefined' &&
      child.props?.children.length > 0
    ) {
      child.props.children = addRowRecursive(child.props.children, { row })
    }

    return (
      <DynamicComponent
        component={child?.component ?? child.props?.component}
        props={child.props?.props ?? child?.props}
        // sub={child.props?.sub ?? child.sub}
        children={addRowRecursive(child.children ?? child.props?.children, row)}
        row={row}
      />
    )
    // return React.cloneElement(child, { row })
  })
}

function FormForEach({ item = 'asset', children }: any) {
  const { values } = useContext(FormContext)

  // console.log(children)

  return (
    <div>
      {typeof values !== 'undefined' &&
        values[item]
          ?.sort((a: any, b: any) => a?.order - b?.order)
          ?.map((inside: any, idx: number) => {
            return (
              <div
                style={{
                  borderTop: '1px solid #ccc',
                  marginTop: 10,
                  paddingTop: 10,
                }}
              >
                {/* {addRowRecursive(children, item)} */}
                {Children.map(children, (child: any) => {
                  // console.log(child)
                  // if (typeof child?.component === 'undefined') {
                  //   return React.cloneElement(child, { row: item })
                  // }

                  // console.log(child)

                  return (
                    <DynamicComponent
                      component={child?.component ?? child.props?.component}
                      props={child.props?.props ?? child?.props}
                      // sub={child.props?.sub ?? child.sub}
                      children={addRowRecursive(
                        child.children ?? child.props?.children,
                        inside,
                      )}
                      row={inside}
                    />
                  )
                })}
              </div>
            )
          })}
    </div>
  )
}

export default FormForEach
