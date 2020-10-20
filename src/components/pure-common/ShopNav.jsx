import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import urlArray from '../../data/menuItems'

export default function ShopNav({ activeUrl, isAdmin }) {
  const [isHidden, setIsHidden] = useState(false)
  const classNameIfHidden = isHidden ? ' shop-nav-hidden' : ''

  console.log(activeUrl)

  const hideNav = () => {
    setIsHidden(true)
    const el = document.getElementsByClassName('shop-main-area')[0]
    el.style.marginLeft = '-29.5vw'
  }

  const unhideNav = () => {
    setIsHidden(false)
    const el = document.getElementsByClassName('shop-main-area')[0]
    el.style.marginLeft = '0'
  }

  const getAnchorTemplate = item => (
    <Link
      className={item.href === activeUrl ? 'shop-nav-active' : undefined}
      id={item.href}
      to={(isAdmin ? '/shop-editor/' : '/shop/') + item.href}
    >
      {<div className={item.href === activeUrl ? 'active' : undefined} id='shop-nav-arrow'></div>}
      {item.name}
    </Link>
  )

  return (
    <>
      <div className={'shop-nav' + classNameIfHidden}>
        {urlArray.map(item => (
          <div>
            {getAnchorTemplate(item)}
            {item.submenu?.map(getAnchorTemplate)}
          </div>
        ))}
        <div>
          <Link
            style={{ fontSize: '0.6rem', whiteSpace: 'nowrap', margin: '4rem 0 0' }}
            onClick={hideNav}
          >
            Скрыть меню
          </Link>
        </div>
      </div>

      <button
        className={isHidden ? 'unhide-nav-button' : ' unhide-nav-button unhide-nav-button-hide'}
        onClick={unhideNav}
      >
        Показать меню
      </button>
    </>
  )
}
