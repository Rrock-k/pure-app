rfc

import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import classnames from 'classnames'

import 'styles/App.css'
import 'styles/testScrollbar.css'
import { contexts } from 'config/setup'

import ScrollToTop from 'components/ScrollTopButton/ScrollTop'
import MobileMenu from 'components/MobileMenu/MobileMenu'
import AppHeader from 'components/AppHeader/AppHeader'
import AppFooter from 'components/AppFooter/AppFooter'

const Shop = React.lazy(() => import('./pure-common/components/Shop'))
const Home = React.lazy(() => import('./components/Home/Home'))
const About = React.lazy(() => import('./components/About'))
const Shipping = React.lazy(() => import('./components/Shipping/Shipping'))
const ShopProduct = React.lazy(() => import('./components/ProductCard/ShopProduct'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const CheckoutView = React.lazy(() => import('./components/Checkout/CheckoutView'))
const Return = React.lazy(() => import('./components/Return/Return'))

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

  const classList = classnames('App', 'max-content-width', hoverIsOn && 'hoveron')
  return (
    <>
      {/* prettier-ignore */}
      <div className={classList}>
          <ScrollToTop/>
          <ProductsContext>
          <CartContext>
            <MobileMenuAndContext MobileMenu={MobileMenu}>
              
              <div>
                <AppHeader  />

                <Suspense fallback={<center><h3>Loading...</h3></center>}>
                <Switch>
                  <Route path='/home'                      render={() => <Home />} />
                  <Route path='/shop/products/:name'       render={() => <ShopProduct/>} />
                  <Route path='/shop/:whatToShow'          render={() => <Shop />} />
                  <Route path='/shop'                      render={() => <Shop />} />
                  <Route path='/about'                     render={() => <About />} />
                  <Route path='/shipping'                  render={() => <Shipping />} />
                  <Route path='/return'                    render={() => <Return />} />
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
