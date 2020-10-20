import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import handleScrollbarOnMobileMenuOpen from './utils/handleScrollbarOnMobileMenuOpen'

import Shop from './components/pure-common/Shop'
import MobileMenu from './components/MobileMenu'
import Home from './components/Home'
import About from './components/About'
import Delivery from './components/Delivery'
import FirstScreen from './components/FirstScreen'

function App() {
  const [menuIsOpened, setMenuIsOpened] = useState(false)
  const openMenu = () => setMenuIsOpened(true)
  const closeMenu = () => setMenuIsOpened(false)

  const escFunction = e => (e.keyCode === 27 ? closeMenu() : null)

  const hoveroff = () => document.querySelector('.App').classList.remove('hoveron')

  useEffect(handleScrollbarOnMobileMenuOpen(menuIsOpened), [menuIsOpened])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    window.addEventListener('resize', closeMenu)

    document.addEventListener('touchstart', hoveroff)

    return () => {
      document.removeEventListener('keydown', escFunction)
      document.removeEventListener('touchstart', hoveroff)
      window.removeEventListener('resize', closeMenu)
    }
  }, [])

  return (
    <div className='App hoveron'>
      <MobileMenu isOpened={menuIsOpened} close={closeMenu} />
      <Switch>
        <Route path='/home' render={() => <FirstScreen bannerNeeded openMobileMenu={openMenu} />} />
        <Route path='/' render={() => <FirstScreen openMobileMenu={openMenu} />} />
      </Switch>

      <Switch>
        <Route path='/shop/:category' /*                */ render={() => <Shop />} />
        <Route path='/shop/' /*                   */ render={() => <Shop />} />
        <Route path='/about' /*                   */ render={() => <About />} />
        <Route path='/delivery' /*                */ render={() => <Delivery />} />
        <Route path='/home' /*                    */ render={() => <Home />} />
        <Redirect to='/home' />
      </Switch>
    </div>
  )
}

export default App
