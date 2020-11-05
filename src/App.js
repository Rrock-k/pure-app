import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import { contexts } from './config/setup'

import MobileMenu from './components/MobileMenu'
import AppHeader from './components/AppHeader'
import Home from './components/Home/Home'
import About from './components/About'
import Delivery from './components/Delivery'
import AppFooter from './components/AppFooter'
import ShopProduct from './pure-common/ShopProduct'
import Shop from './pure-common/Shop'

// import FastLanguageSwitch from './components/dev-and-test/FastLanguageSwitch'

const { useHoverContext, MobileMenuAndContext, ProductsContext, useLanguageContext } = contexts

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
                <Route path='/shop/products/:name'       render={() => <ShopProduct/>} />
                <Route path='/shop/:whatToShow'          render={() => <Shop />} />
                <Route path='/shop'                      render={() => <Shop />} />
                <Route path='/about'                     render={() => <About />} />
                <Route path='/delivery'                  render={() => <Delivery />} />
                <Redirect to='/home' />
              </Switch>

              <AppFooter/>

            </MobileMenuAndContext>
          </ProductsContext>
      </div>
    </>
  )
}

export default App
