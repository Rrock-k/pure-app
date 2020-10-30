import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import urlArray from '../pure-common/data/menuItems'

const addShopRoute = href => '/shop/' + href

const urlArrayMobile = [
  { href: '/', name: 'Главная' },
  ...urlArray.map(item => ({
    ...item,
    href: '/shop/' + item.href,
    submenu: item.submenu?.map(subitem => ({ ...subitem, href: addShopRoute(subitem.href) })),
  })),
  { href: '/delivery', name: 'Доставка' },
  { href: '/about', name: 'О нас' },
]

const getAnchorTemplate = (item, closeMenu) => (
  <Link
    className={item.submenu ? 'mobile-menu-item mobile-menu-item-has-subitem' : 'mobile-menu-item'}
    id={item.href}
    to={item.href}
    onClick={closeMenu}
  >
    {item.name}
  </Link>
)

export default function MobileMenu(props) {
  useEffect(() => {
    console.log('Mobile menu has been mounted')
    return () => {
      console.log('Mobile menu has been unmounted')
    }
  }, [])

  const { isOpened, close } = props

  const visibility = isOpened ? 'visible' : 'hidden'
  const opacity = isOpened ? '1' : '0'
  const transition = isOpened ? '0.35s' : '0.25s'

  return (
    <div
      className='mobile-menu'
      style={{
        visibility,
        opacity,
        transition,
      }}
    >
      <a onClick={close} className='mobile-menu-close'>
        x
      </a>
      <div
        className='xnav-wrapper'
        id='xnav-wrapper'
        style={{
          backgroundColor: '#fff1',
          overflowY: 'scroll',
          overflowX: 'hidden',
          height: '100%',
          WebkitOverflowScrolling: 'auto',
        }}
      >
        <div className='mobile-menu-nav'>
          {urlArrayMobile.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div className='mobile-menu-item-div'>{getAnchorTemplate(item, close)}</div>
                <div className='mobile-submenu'>
                  {item.submenu?.map((subitem, index) => (
                    <div className='mobile-menu-item-div' key={index}>
                      {getAnchorTemplate(subitem, close)}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
