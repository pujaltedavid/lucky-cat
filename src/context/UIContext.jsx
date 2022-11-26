import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'

const mobileContext = React.createContext()

export const useMobile = () => useContext(mobileContext)

export const UIContext = ({ children }) => {
  const mobile = isMobile
  return (
    <mobileContext.Provider value={mobile}>{children}</mobileContext.Provider>
  )
}
