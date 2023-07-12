import React from 'react'
// import { Row, Col } from 'react-bootstrap'
import { Input, Col } from '@mantine/core'
import './Filter.css'

export const settings = [
  {
    name: 'name',
    label: 'Label',
    type: 'Input',
    default: 'Filter',
  },
]

export function Filter(props: any) {
  return (
    <div className="row ml-2" style={{ marginLeft: '0px' }}>
      <Col
        sm={4}
        md={4}
        className="filter-primary-color filter-responsive-normal"
      >
        {props.name}
      </Col>
      <Col sm={8} md={8} className="filter-responsive-normal">
        <Input component={props.component}></Input>
      </Col>
    </div>
  )
}

export default Filter
