import React, { Suspense } from 'react'

import 'styles/App.css'
import 'config/setup'

import ScrollToTop from 'components/ScrollTopButton/ScrollTop'
import MobileMenu from 'components/MobileMenu/MobileMenu'
import AppHeader from 'components/AppHeader/AppHeader'
import AppFooter from 'components/AppFooter/AppFooter'
import { Switch, Route, Redirect } from 'react-router-dom'

import { contexts } from 'config/contexts'

const Shop = React.lazy(() => import('./pure-common/components/Shop'))
const Home = React.lazy(() => import('./components/Home/Home'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
const About = React.lazy(() => import('./components/About'))
const Return = React.lazy(() => import('./components/Return/Return'))
const Shipping = React.lazy(() => import('./components/Shipping/Shipping'))
const ShopProduct = React.lazy(() => import('./components/ProductCard/ShopProduct'))
const CheckoutView = React.lazy(() => import('./components/Checkout/CheckoutView'))

function App() {
  const hoverIsOn = contexts.useHoverContext()
  contexts.useLanguageContext()

  const classList = `App max-content-width ${hoverIsOn ? 'hoveron' : ''}`

  return (
    <>
      {/* prettier-ignore */}
      <div className={classList}>
          <ScrollToTop/>
            <contexts.MobileMenuAndContext MobileMenu={MobileMenu}>
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

            </contexts.MobileMenuAndContext>
      </div>
    </>
  )
}

export default App
