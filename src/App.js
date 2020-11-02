import React, { useState, useEffect, createContext, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import MobileMenu from './components/MobileMenu'
import AppHeader from './components/AppHeader'
import Home from './components/Home/Home'
import Shop from './pure-common/Shop'
import ShopProduct from './pure-common/ShopProduct'
import About from './components/About'
import Delivery from './components/Delivery'

import FastLanguageSwitch from './components/dev-and-test/FastLanguageSwitch'

import { useHoverContext } from './pure-common/HoverContextWrapper'
import { MobileMenuAndContext } from './pure-common/MobileMenuAndContext'

import { ProductsContext } from './pure-common/ProductsContext'
import { useLanguageContext } from './components/contexts/LanguageContext'

export const MobileMenuContext = createContext({})

function App() {
  console.log('App function body')
  const hoverIsOn = useHoverContext()
  useLanguageContext()

  const classList = hoverIsOn ? 'App hoveron' : 'App'
  return (
    <>
      {console.log('App function return statement')}

      {/* prettier-ignore */}
      <div className={classList}>
        
          <ProductsContext>
            <MobileMenuAndContext MobileMenu={MobileMenu}>
              {/* <FastLanguageSwitch /> */}
              <AppHeader  />

              <Switch>
                <Route path='/home'                      render={() => <Home />} />
                <Route path='/shop/products:name'        render={() => <ShopProduct/>} />
                <Route path='/shop/products'             render={() => <ShopProduct/>} />
                <Route path='/shop/:whatToShow'          render={() => <Shop />} />
                <Route path='/shop/'                     render={() => <Shop />} />
                <Route path='/about'                     render={() => <About />} />
                <Route path='/delivery'                  render={() => <Delivery />} />
                <Redirect to='/home' />
              </Switch>

            </MobileMenuAndContext>
          </ProductsContext>

      </div>
    </>
  )
}

export default App
