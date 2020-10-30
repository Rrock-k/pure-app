import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useHoverContext } from '../pure-common/HoverContextWrapper'

import menuItemsRaw from '../pure-common/data/menuItems'
import { useLanguageContext } from './LanguageContextWrapper'

const addShopRoute = href => '/shop/' + href

const menuItemsData = menuItemsRaw
  // .filter(({ name }) => name !== 'Подарки' && name !== 'Скидки')
  .map(item => ({
    ...item,
    href: addShopRoute(item.href),
    submenu: item.submenu?.map(subitem => ({ ...subitem, href: addShopRoute(subitem.href) })),
  }))

menuItemsData.push({ href: '/delivery', name: 'Доставка' }, { href: '/about', name: 'О нас' })

const Menu = props => {
  const { language } = useLanguageContext()
  const langRu = language === 'ru'
  const langEn = language === 'en'

  const globalHoverIsOn = useHoverContext()
  console.log('hoverOn? : ')
  console.log(globalHoverIsOn)

  const [dropdownsAreShowing, setDropdownsAreShowing] = useState(false)

  function clickHandlerFunc(e) {
    const { currentTarget: menu } = e

    menu.style.zIndex = -1000
    setTimeout(() => {
      menu.style.zIndex = null
    }, 1000)

    turnOffDropdowns()
  }

  const turnOnDropdowns = () => {
    setDropdownsAreShowing(true)
  }
  const turnOffDropdowns = () => {
    setDropdownsAreShowing(false)
  }

  const blurMe = e => e.currentTarget.blur()

  let menuItemClassList = 'menu-link-div'
  if (globalHoverIsOn || dropdownsAreShowing) menuItemClassList += ' show-dropdowns'

  const MenuLink = ({ menuitem }) => {
    if (globalHoverIsOn || (!globalHoverIsOn && !menuitem.submenu))
      return (
        <Link to={menuitem.href} onClick={turnOnDropdowns}>
          {menuitem.name}
        </Link>
      )
    return <button onClick={turnOnDropdowns}>{menuitem.name}</button>
  }

  return (
    <div className='menu'>
      {menuItemsData.map(menuItem => (
        <div className={menuItemClassList}>
          <MenuLink menuitem={menuItem} />

          {menuItem.submenu && (
            <div className='menu-item-dropdown' onClick={clickHandlerFunc}>
              {!globalHoverIsOn && (
                <Link to={menuItem.href} onClick={blurMe}>
                  {langRu && 'Все'}
                  {langEn && 'All'}
                </Link>
              )}
              {menuItem.submenu.map(({ name, href }) => (
                <Link to={href} onClick={blurMe} key={href}>
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Menu
