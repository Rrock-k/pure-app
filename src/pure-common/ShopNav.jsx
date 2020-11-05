import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import urlArray from './data/menuItems'
import { t } from './utils/translation'

export default function ShopNav({ activeUrl = '' }) {
  const [isHidden, setIsHidden] = useState(false)
  const classNameIfHidden = isHidden ? ' shop-nav-hidden' : ''

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

  const getLinkTemplate = item => (
    <Link
      className={item.href === activeUrl ? 'shop-nav-active' : undefined}
      id={item.href}
      to={'/shop/' + item.href}
    >
      {<div className={item.href === activeUrl ? 'active' : undefined} id='shop-nav-arrow'></div>}
      {t(`navigation.${item.name}`)}
    </Link>
  )

  return (
    <>
      <div className={'shop-nav' + classNameIfHidden}>
        {urlArray.map(item => (
          <div>
            {getLinkTemplate(item)}
            {item.submenu?.map(getLinkTemplate)}
          </div>
        ))}
        <div>{getLinkTemplate({ href: '', name: 'все товары' })}</div>
        <div>
          <button className='hide-nav-button' onClick={hideNav}>
            {t('shop.nav.hide_menu')}
          </button>
        </div>
      </div>

      <button
        className={isHidden ? 'unhide-nav-button' : ' unhide-nav-button unhide-nav-button-hide'}
        onClick={unhideNav}
      >
        {t('shop.nav.show_menu')}
      </button>
    </>
  )
}
