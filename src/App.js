import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import { contexts } from './config/setup'

import ScrollToTop from './components/ScrollToTop'
import MobileMenu from './components/MobileMenu'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

const Shop = React.lazy(() => import('./pure-common/components/Shop'))
const Home = React.lazy(() => import('./components/Home/Home'))
const About = React.lazy(() => import('./components/About'))
const Delivery = React.lazy(() => import('./components/Delivery'))
const ShopProduct = React.lazy(() => import('./components/ProductCard/ShopProduct'))
const Test = React.lazy(() => import('./components/Test'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const CheckoutView = React.lazy(() => import('./components/Checkout/CheckoutView'))

const {
  useHoverContext,
  MobileMenuAndContext,
  ProductsContext,
  useLanguageContext,
  CartContext,
} = contexts

function App() {
  const hoverIsOn = useHoverContext()
  useLanguageContext()

  const classList = hoverIsOn ? 'App hoveron' : 'App'
  return (
    <>
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
                  <Route path='/shipping'                  render={() => <Delivery />} />
                  <Route path='/cart'                      render={() => <Cart />} />
                  <Route path='/checkout'                  render={() => <CheckoutView />} />
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
