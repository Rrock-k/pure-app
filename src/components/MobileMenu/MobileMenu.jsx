import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import urlArray from 'pure-common/data/menuItems'
import { t } from 'pure-common/utils/translation'
import LanguageSwitcher from '../LanguageSwitcher'

import styles from './MobileMenu.module.css'
import { setUpSwipeLeftRightEvents } from 'effects/swipeEffects'
import { contexts } from 'config/setup'
const { useHoverContext } = contexts

export default function MobileMenu(props) {
  const hoverIsOn = useHoverContext()
  const menuRef = useRef()
  const firstFocusableElement = useRef()
  const lastFocusableElement = useRef()

  const { isOpened, close } = props

  useEffect(() => {
    const sensitivity = 100
    if (!hoverIsOn) return setUpSwipeLeftRightEvents(menuRef, close, close, sensitivity)
  }, [menuRef, close, hoverIsOn])

  useEffect(() => {
    if (isOpened)
      setTimeout(() => {
        firstFocusableElement.current.focus()
        firstFocusableElement.current.blur()
      }, 100)
  }, [isOpened])

  const visibility = isOpened ? 'visible' : 'hidden'
  const opacity = isOpened ? '1' : '0'
  const transition = isOpened ? '0.35s' : '0.25s'

  const propsForFirstMenuItem = {
    keydownHandler: e => {
      if (e.keyCode === 9 && e.shiftKey) {
        e.preventDefault()
        lastFocusableElement.current.focus()
      }
    },
    reference: firstFocusableElement,
  }

  return (
    <div
      ref={menuRef}
      className={styles.container}
      id='mobile-menu'
      style={{
        visibility,
        opacity,
        transition,
      }}
    >
      <div className={styles.nav}>
        {urlArrayMobile.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={styles.itemDiv} key={item.href}>
                <MobileMenuLink
                  item={item}
                  close={close}
                  {...(index === 0 ? propsForFirstMenuItem : {})}
                />
              </div>
              <div className={styles.submenu}>
                {item.submenu?.map((subitem, index) => (
                  <div className={styles.itemDiv} key={subitem.href}>
                    <MobileMenuLink item={subitem} close={close} />
                  </div>
                ))}
              </div>
            </React.Fragment>
          )
        })}
        <div className={styles.itemDiv}>
          <LanguageSwitcher className={styles.languageSwitcher} />
        </div>
      </div>
      <button
        onClick={close}
        className={styles.closeBtn}
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
  { href: '/home', name: 'главная' },
  ...urlArrayMapped,
  { href: '/shipping', name: 'доставка' },
  { href: '/about', name: 'о нас' },
]

const MobileMenuLink = ({ item, close, reference, keydownHandler }) => (
  <Link
    ref={reference}
    className={styles.menuItem}
    id={item.href}
    to={item.href}
    onClick={close}
    onKeyDown={keydownHandler}
  >
    {t(`navigation.${item.name}`)}
  </Link>
)
