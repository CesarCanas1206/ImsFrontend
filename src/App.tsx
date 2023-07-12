import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import './assets/main.css'
import './assets/scrollbar.css'
import ErrorBoundary from './layout/ErrorBoundary/ErrorBoundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import PageContextProvider from './context/PageContextProvider'
import ThemeProvider from './context/ThemeProvider'
import { Notifications } from '@mantine/notifications'
import { siteName } from './utilities/localStorage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={`/${siteName || ''}`}>
            <PageContextProvider />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
