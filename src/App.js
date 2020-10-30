import React, { useState, useEffect, createContext, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import getProductsDataAndMap from './pure-common/utils/getProductsDataAndMap'

import Shop from './pure-common/Shop'
import ShopProduct from './pure-common/ShopProduct'
import MobileMenu from './components/MobileMenu'
import Home from './components/Home'
import About from './components/About'
import Delivery from './components/Delivery'
import FirstScreen from './components/FirstScreen'

import { useHoverContext } from './pure-common/HoverContextWrapper'
import { useLanguageContext } from './components/LanguageContextWrapper'
import { MobileMenuAndContext } from './pure-common/MobileMenuAndContext'
import { LanguageSwitchScope, noTranslationAvailable } from './utils/translation'

export const ProductsContext = createContext({})
export const MobileMenuContext = createContext({})

function App() {
  console.log('App function body')
  const [products, setProducts] = useState({})
  const hoverIsOn = useHoverContext()
  useLanguageContext()

  useEffect(() => {
    let products
    getProductsDataAndMap().then(res => {
      products = res.data
    })
    // setProducts(products)
  }, [])

  const classList = hoverIsOn ? 'App hoveron' : 'App'

  return (
    <>
      {console.log('App function return statement')}

      {/* prettier-ignore */}
      <div className={classList}>
        
          <MobileMenuAndContext MobileMenu={MobileMenu}>
            {/* <FastLanguageSwitch /> */}

            <Switch>
              <Route path='/home'                      render={() => <FirstScreen bannerNeeded />}/>
              <Route                                   render={() => <FirstScreen  />} />
            </Switch>

            <Switch>
              <Route path='/shop/products'             render={() => <ShopProduct />} />
              <Route path='/shop/products/:name'       render={() => <ShopProduct />} />
              <Route path='/shop/:category'            render={() => <Shop />} />
              <Route path='/shop/'                     render={() => <Shop />} />
              <Route path='/about'                     render={() => <About />} />
              <Route path='/delivery'                  render={() => <Delivery />} />
              <Route path='/home'                      render={() => <Home />} />
              <Redirect to='/home' />
            </Switch>

          </MobileMenuAndContext>
      </div>
    </>
  )
}

export default App

function FastLanguageSwitch() {
  const { setLanguage } = useLanguageContext()

  return (
    <div style={{ width: '100%', height: '0px', position: 'fixed', zIndex: '99999999999' }}>
      <button onClick={() => setLanguage('en')}>En</button>
      <button onClick={() => setLanguage('ru')}>Ru</button>
      <button onClick={() => console.log(noTranslationAvailable)}>Показать</button>
    </div>
  )
}
