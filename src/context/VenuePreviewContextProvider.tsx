import React, { createContext, useState } from 'react'

interface VenuePreviewContextInterface {
  state: any
  setState: any
}

export const VenuePreviewContext = createContext<VenuePreviewContextInterface>({
  state: {},
  setState: () => {},
})

const VenuePreviewContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState({})

  return (
    <VenuePreviewContext.Provider value={{ state, setState }}>
      {children}
    </VenuePreviewContext.Provider>
  )
}

export default VenuePreviewContextProvider
