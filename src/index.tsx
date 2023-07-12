import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
const AppContextProvider = lazy(() => import('./context/AppContextProvider'))
const AppLoading = lazy(() => import('./layout/AppLoading'))

let rootElem: any = null

document.addEventListener('DOMContentLoaded', function (event) {
  if (!rootElem) {
    rootElem = document.getElementById('root') as HTMLElement
    const root = createRoot(rootElem)
    root.render(
      <StrictMode>
        <Suspense fallback={<AppLoading />}>
          <AppContextProvider />
        </Suspense>
      </StrictMode>,
    )
  }
})
