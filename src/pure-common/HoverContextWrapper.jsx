import React, { createContext, useContext, useEffect, useState } from 'react'

const HoverContext = createContext(true)

export function HoverContextWrapper({ children, ...props }) {
  const isHoverTurnedOn = useCheckIfTouchScreen()

  return <HoverContext.Provider value={isHoverTurnedOn}>{children}</HoverContext.Provider>
}

export function useHoverContext() {
  return useContext(HoverContext)
}

function useCheckIfTouchScreen() {
  const [isHoverTurnedOn, setIsHoverTurnedOn] = useState(true)

  //listen for touchstart and if so, set state to false
  useEffect(() => {
    const hoveroff = () => {
      setIsHoverTurnedOn(false)
      document.removeEventListener('touchstart', hoveroff)
    }
    document.addEventListener('touchstart', hoveroff)
  }, [])

  return isHoverTurnedOn
}
