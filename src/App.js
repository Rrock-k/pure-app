import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import { contexts } from './config/setup'

import ScrollToTop from './components/ScrollToTop'
import MobileMenu from './components/MobileMenu'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

const Shop = React.lazy(() => import('./pure-common/Shop'))
const Home = React.lazy(() => import('./components/Home/Home'))
const About = React.lazy(() => import('./components/About'))
const Delivery = React.lazy(() => import('./components/Delivery'))
const ShopProduct = React.lazy(() => import('./components/ProductCard/ShopProduct'))
const Test = React.lazy(() => import('./components/Test'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))

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
              
              <div>
                <AppHeader  />

                <Suspense fallback={<center><h3>Loading...</h3></center>}>
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
                </Suspense>
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
