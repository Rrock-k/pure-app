import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import urlArray from '../pure-common/data/menuItems'
import { t } from '../pure-common/utils/translation'
import LanguageSwitcher from './LanguageSwitcher'

export default function MobileMenu(props) {
  const firstFocusableElement = useRef()
  const lastFocusableElement = useRef()

  useEffect(() => {
    console.log('Mobile menu has been mounted')
    return () => {
      console.log('Mobile menu has been unmounted')
    }
  }, [])

  const { isOpened, close } = props

  useEffect(() => {
    console.log('Mobile menu is opened or closed')
    if (isOpened)
      setTimeout(() => {
        firstFocusableElement.current.focus()
        firstFocusableElement.current.blur()
      }, 100)
  }, [isOpened])

  const visibility = isOpened ? 'visible' : 'hidden'
  const opacity = isOpened ? '1' : '0'
  const transition = isOpened ? '0.35s' : '0.25s'

  return (
    <div
      className='mobile-menu'
      id='mobile-menu'
      style={{
        visibility,
        opacity,
        transition,
      }}
    >
      <div className='mobile-menu-nav'>
        {urlArrayMobile.map((item, index) => {
          const propsForFirstMenuItem =
            index === 0
              ? {
                  keydownHandler: e => {
                    if (e.keyCode === 9 && e.shiftKey) {
                      console.log('HELLO SHIFT TAB')
                      e.preventDefault()
                      lastFocusableElement.current.focus()
                    }
                  },
                  reference: firstFocusableElement,
                }
              : {}
          return (
            <React.Fragment key={index}>
              <div className='mobile-menu-item-div' key={item.href}>
                <MobileMenuLink item={item} close={close} {...propsForFirstMenuItem} />
              </div>
              <div className='mobile-submenu'>
                {item.submenu?.map((subitem, index) => (
                  <div className='mobile-menu-item-div' key={subitem.href}>
                    <MobileMenuLink item={subitem} close={close} />
                  </div>
                ))}
              </div>
            </React.Fragment>
          )
        })}
        <div className='mobile-menu-item-div'>
          <LanguageSwitcher className='mobile-menu-language-switcher' />
        </div>
      </div>
      <button
        onClick={close}
        className='mobile-menu-close'
        ref={lastFocusableElement}
        onKeyDown={e => {
          if (e.keyCode === 9 && !e.shiftKey) {
            e.preventDefault()
            firstFocusableElement.current.focus()
          }
        }}
      >
        x
      </button>
    </div>
  )
}

const addShopRoute = href => '/shop/' + href

const urlArrayMapped = urlArray.map(item => ({
  ...item,
  href: '/shop/' + item.href,
  submenu: item.submenu?.map(subitem => ({ ...subitem, href: addShopRoute(subitem.href) })),
}))
const urlArrayMobile = [
  { href: '/home', name: 'Главная' },
  ...urlArrayMapped,
  { href: '/delivery', name: 'Доставка' },
  { href: '/about', name: 'О нас' },
]

const MobileMenuLink = ({ item, close, reference, keydownHandler }) => (
  <Link
    ref={reference}
    className={item.submenu ? 'mobile-menu-item mobile-menu-item-has-subitem' : 'mobile-menu-item'}
    id={item.href}
    to={item.href}
    onClick={close}
    onKeyDown={keydownHandler}
  >
    {t(`navigation.${item.name}`)}
  </Link>
)
