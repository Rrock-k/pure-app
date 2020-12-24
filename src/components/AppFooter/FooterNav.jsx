import React from 'react'
import { Link } from 'react-router-dom'

import { t } from 'pure-common/utils/translation'

const tThis = path => t('app-footer.' + path)

export default function FooterNav() {
  const menuItemsData = [
    {
      name: 'о нас',
      href: '/about',
    },
    {
      name: 'доставка и оплата',
      href: '/shipping',
    },
    {
      name: 'обмен и возврат',
      href: '/return',
    },
    {
      name: 'размерный ряд',
      href: '/sizing',
    },
    {
      name: 'часто задаваемые вопросы',
      href: '/faq',
    },
    {
      name: 'контакты',
      href: '/contacts',
    },
  ]

  return (
    <div className='app-footer-nav' id='app-footer-nav'>
      {menuItemsData.map(menuItem => (
        <Link
          className='app-footer-nav-link underline-on-hover'
          to={menuItem.href}
          key={menuItem.href}
          onClick={() => window.scrollTo(0, 0)}
        >
          {tThis('nav.' + menuItem.name)}
        </Link>
      ))}
    </div>
  )
}
