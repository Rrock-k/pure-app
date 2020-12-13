import React from 'react'
import { Link } from 'react-router-dom'

import urlArray from '../data/menuItems'
import { t } from '../utils/translation'

export default function ShopNav({ activeUrl = '' }) {
  const getLinkTemplate = item => (
    <Link
      className={item.href === activeUrl ? 'shop-nav-active' : undefined}
      id={item.href}
      to={'/shop/' + item.href}
      key={item.href}
    >
      {<div className={item.href === activeUrl ? 'active' : undefined} id='shop-nav-arrow'></div>}
      {t(`navigation.${item.name}`)}
    </Link>
  )

  return (
    <>
      <div className={'shop-nav'}>
        {urlArray.map(item => (
          <div key={item.href}>
            {getLinkTemplate(item)}
            {item.submenu?.map(getLinkTemplate)}
          </div>
        ))}
        <div>{getLinkTemplate({ href: '', name: 'все товары' })}</div>
      </div>
    </>
  )
}
