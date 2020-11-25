import React, { createContext, useContext, useEffect, useState } from 'react'

const Context = createContext(true)

export function HoverContext({ children, ...props }) {
  const isHoverTurnedOn = useCheckIfTouchScreen()
  console.log('HoverContext is being rendered')
  console.log('hoveron is ' + isHoverTurnedOn)

  return <Context.Provider value={isHoverTurnedOn}>{children}</Context.Provider>
}

export function useHoverContext() {
  return useContext(Context)
}

function useCheckIfTouchScreen() {
  const [isHoverTurnedOn, setIsHoverTurnedOn] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('hoveron') === 'false') setIsHoverTurnedOn(false)
    console.log(sessionStorage.getItem('hoveron'))
  }, [])

  //listen for touchstart and if so, set state to false
  useEffect(() => {
    const hoveroff = () => {
      setIsHoverTurnedOn(false)
      sessionStorage.setItem('hoveron', 'false')
      document.removeEventListener('touchstart', hoveroff)
    }
    document.addEventListener('touchstart', hoveroff)
  }, [])

  return isHoverTurnedOn
}
