import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import menuItemsRaw from 'pure-common/data/menuItems'
import { t } from 'pure-common/utils/translation'
import { contexts } from 'config/setup'

import styles from './styles/Menu.module.css'

const { useHoverContext } = contexts

const addShopRoute = href => '/shop/' + href

const menuItemsData = menuItemsRaw
  // .filter(({ name }) => name !== 'Подарки' && name !== 'Скидки')
  .map(item => ({
    ...item,
    href: addShopRoute(item.href),
    submenu: item.submenu?.map(subitem => ({ ...subitem, href: addShopRoute(subitem.href) })),
  }))

menuItemsData.push({ href: '/shipping', name: 'доставка' }, { href: '/about', name: 'о нас' })

export default function Menu({ fixed, hidden }) {
  const globalHoverIsOn = useHoverContext()
  const [dropdownsAreShowing, setDropdownsAreShowing] = useState(false)

  const turnOnDropdowns = () => setDropdownsAreShowing(true)
  const turnOffDropdowns = () => setDropdownsAreShowing(false)
  const blurMe = e => e.currentTarget.blur()

  function clickHandlerFunc({ currentTarget: menu }) {
    const zIndexBefore = menu.style.zIndex
    menu.style.zIndex = -1000
    setTimeout(() => {
      menu.style.zIndex = zIndexBefore
    }, 300)
    turnOffDropdowns()
  }

  let menuItemClassList = classNames(
    styles.linkDiv,
    (globalHoverIsOn || dropdownsAreShowing) && styles.showDropdowns
  )

  const MenuLink = ({ menuitem }) => {
    if (globalHoverIsOn || (!globalHoverIsOn && !menuitem.submenu))
      return (
        <Link to={menuitem.href} onClick={turnOnDropdowns} className={styles.link}>
          {t('navigation.' + menuitem.name)}
        </Link>
      )
    return <button>{t('navigation.' + menuitem.name)}</button>
  }

  let className = classNames(
    styles.menu,
    fixed && styles.menuFixed,
    fixed && hidden && styles.menuFixedHidden
  )
  const id = fixed ? 'menu-fixed' : 'main-menu'

  return (
    <div className={className} id={id}>
      {menuItemsData.map(menuItem => (
        <div className={menuItemClassList} key={menuItem.name}>
          <MenuLink menuitem={menuItem} />

          {menuItem.submenu && (
            <div className={styles.dropdown} onClick={clickHandlerFunc}>
              {!globalHoverIsOn && (
                <Link to={menuItem.href} onClick={blurMe}>
                  {t('navigation.все')}
                </Link>
              )}
              {menuItem.submenu.map(({ name, href }) => (
                <Link to={href} onClick={blurMe} key={href}>
                  {t(`navigation.${name}`)}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
