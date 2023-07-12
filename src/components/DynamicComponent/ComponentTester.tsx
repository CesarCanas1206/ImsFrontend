import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import DynamicComponent from './DynamicComponent'

function ComponentTester() {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const props = useMemo(() => Object.fromEntries(searchParams), [searchParams])
  const component = params.component

  return <DynamicComponent component={component} {...props} />
}

export default ComponentTester
