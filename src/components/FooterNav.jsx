import React from 'react'
import { Link } from 'react-router-dom'

import { t } from '../pure-common/utils/translation'

const tThis = path => t('app-footer.' + path)

export default function FooterNav() {
  const menuItemsData = [
    {
      name: 'О нас',
      href: '/about',
    },
    {
      name: 'Доставка и оплата',
      href: '/delivery_and_payment',
    },
    {
      name: 'Обмен и возврат',
      href: '/return',
    },
    {
      name: 'Размерный ряд',
      href: '/sizing',
    },
    {
      name: 'Часто задаваемые вопросы',
      href: '/faq',
    },
    {
      name: 'Контакты',
      href: '/contacts',
    },
  ]

  return (
    <div className='app-footer-nav' id='app-footer-nav'>
      {menuItemsData.map(menuItem => (
        <Link
          className='app-footer-nav-link'
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
