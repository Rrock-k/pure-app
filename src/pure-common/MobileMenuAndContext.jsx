import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import handleScrollbarWidth from './utils/handleScrollbarWidth'

const MobileMenuContext = createContext({})

export function MobileMenuAndContext({ MobileMenu, children }) {
  console.log('MobileMenuAndContext code executed')
  const { menuIsOpened, openMenu, closeMenu } = useMenu()
  const context = { openMenu, closeMenu }

  return (
    <MobileMenuContext.Provider value={context}>
      <MobileMenu isOpened={menuIsOpened} close={closeMenu} />
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenuContext() {
  return useContext(MobileMenuContext)
}

function useMenu() {
  const [menuIsOpened, setMenuIsOpened] = useState(false)

  const openMenu = useCallback(() => setMenuIsOpened(true), [setMenuIsOpened])
  const closeMenu = useCallback(() => setMenuIsOpened(false), [setMenuIsOpened])
  const toggleMenu = useCallback(() => setMenuIsOpened(isOpened => !isOpened), [setMenuIsOpened])

  useEffect(() => {
    const marginIsNeeded = !!menuIsOpened
    handleScrollbarWidth(marginIsNeeded)
  }, [menuIsOpened])

  useEffect(() => {
    const escPressHandler = e => (e.keyCode === 27 ? closeMenu() : null)
    const ctrlQPressHandler = e => (e.ctrlKey && e.keyCode === 81 ? toggleMenu() : null)
    const keyPressHandler = e => {
      escPressHandler(e)
      ctrlQPressHandler(e)
    }

    window.addEventListener('resize', closeMenu)
    document.addEventListener('keydown', keyPressHandler, false)

    return () => {
      window.removeEventListener('resize', closeMenu)
      document.removeEventListener('keydown', keyPressHandler)
    }
  }, [closeMenu, toggleMenu])

  return { menuIsOpened, openMenu, closeMenu }
}
