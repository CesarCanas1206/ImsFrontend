import React, { lazy, Suspense } from 'react'
import {
  storageGet,
  storageRemove,
  storageSet,
} from 'src/utilities/localStorage'
const Button = lazy(() => import('../../components/Form/Button/Button'))
const Group = lazy(() => import('../../components/UI/Group/Group'))

class ErrorBoundary extends React.Component {
  state: any
  props: any

  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: {} }
    const key = 'error-import'
    if (storageGet(key) === '1') {
      setTimeout(() => storageRemove(key), 5000)
    }
  }

  static getDerivedStateFromError(error: any) {
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      const key = 'error-import'
      if (storageGet(key) === '') {
        window.location.reload()
        storageSet(key, '1')
      } else {
        setTimeout(() => storageRemove(key), 5000)
      }
    }
    return { hasError: true, error }
  }

  // componentDidCatch(error: any, errorInfo: any) {
  //   //log the error to an error reporting service
  //   console.log({ error, errorInfo })
  // }

  render() {
    if (this.state.hasError) {
      return (
        <h5 className="text-center">
          Something has gone wrong
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <small>{this.state.error.message}</small>
          </div>
          <Suspense fallback="">
            <Group>
              <Button
                onClick={() => this.setState({ hasError: false })}
                text="Try and continue"
              />
              <Button
                onClick={() => window.location.reload()}
                text="Reload page (if still not working)"
              />
            </Group>
          </Suspense>
        </h5>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
