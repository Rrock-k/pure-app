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
import ShopProduct from './components/ProductCard/ShopProduct'
import Shop from './pure-common/Shop'
import ScrollToTop from './components/ScrollToTop'
import Test from './components/Test'
import Cart from './components/Cart/Cart'

// import FastLanguageSwitch from './components/dev-and-test/FastLanguageSwitch'

const {
  useHoverContext,
  MobileMenuAndContext,
  ProductsContext,
  useLanguageContext,
  CartContext,
} = contexts

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
          <ScrollToTop showButton/>
          <ProductsContext>
          <CartContext>
            <MobileMenuAndContext MobileMenu={MobileMenu}>
              {/* <FastLanguageSwitch /> */}
              
              <div>
                <AppHeader  />
                <Switch>
                  <Route path='/test'                      render={() => <Test />} />
                  <Route path='/home'                      render={() => <Home />} />
                  <Route path='/shop/products/:name'       render={() => <ShopProduct/>} />
                  <Route path='/shop/:whatToShow'          render={() => <Shop />} />
                  <Route path='/shop'                      render={() => <Shop />} />
                  <Route path='/about'                     render={() => <About />} />
                  <Route path='/delivery'                  render={() => <Delivery />} />
                  <Route path='/cart'                      render={() => <Cart />} />
                  <Redirect to='/home' />
                </Switch>
              </div>

              <AppFooter/>

            </MobileMenuAndContext>
            </CartContext>
            </ProductsContext>
      </div>
    </>
  )
}

export default App
