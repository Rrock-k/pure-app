import React, { createContext, useContext, useEffect, useState } from 'react'
import { LanguageSwitchScope } from '../utils/translation'

import handleScrollbarWidth from './utils/handleScrollbarWidth'

import { useMobileMenuContext as iii } from '../App'

const MobileMenuContext = createContext({})

export function MobileMenuAndContext({ MobileMenu, children }) {
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

  const openMenu = () => setMenuIsOpened(true)
  const closeMenu = () => setMenuIsOpened(false)
  const escFunction = e => (e.keyCode === 27 ? closeMenu() : null)
  const qPressHandler = e => (e.keyCode === 81 ? openMenu() : null)

  useEffect(() => {
    handleScrollbarWidth(menuIsOpened)
  }, [menuIsOpened])

  useEffect(() => {
    window.addEventListener('resize', closeMenu)
    document.addEventListener(
      'keydown',
      e => {
        escFunction(e)
        qPressHandler(e)
      },
      false
    )

    return () => {
      window.removeEventListener('resize', closeMenu)
      document.removeEventListener('keydown', e => {
        escFunction(e)
        qPressHandler(e)
      })
    }
  }, [])

  return { menuIsOpened, openMenu, closeMenu }
}
