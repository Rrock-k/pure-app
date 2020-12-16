import React from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import logo from 'assets/images/logo_bez_fona.png'
import magnifyingGlass from 'assets/icons/magnifying-glass.svg'
import instagramLogo from 'assets/icons/instagram-logo.svg'
import shoppingBag from 'assets/icons/shopping-bag.svg'
import openMenuIcon from 'assets/icons/open-menu.svg'

import LanguageSwitcher from '../LanguageSwitcher'
import { useMobileMenuContext } from 'pure-common/components/MobileMenuAndContext'
// import UserAccountIcon from './UserAccountIcon'

import styles from './Navbar.module.css'

const Navbar = () => {
  const { openMenu } = useMobileMenuContext()
  return (
    <nav className={styles.container}>
      <div className={styles.mobileLogoContainer}>
        <Link to='/home' className={styles.mobileLogoContainerLink}>
          <img className={styles.mobileLogo} src={logo} alt='PURE LOGO'></img>
        </Link>
      </div>
      <div className={styles.items}>
        <Link to='/cart' className={styles.item}>
          <img className={styles.icon} src={shoppingBag} alt='Search'></img>
        </Link>
        <LanguageSwitcher className={classNames(styles.item, styles.languageSwitch)} />
        {false && (
          <div className={styles.item}>
            <img className={styles.icon} src={magnifyingGlass} alt='Search'></img>
          </div>
        )}

        <a
          href='https://www.instagram.com/i.am.in.pure/'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.item}
        >
          <img className={styles.icon} src={instagramLogo} alt='Instagram Icon'></img>
        </a>

        {/* <UserAccountIcon /> */}

        <button className={classNames(styles.item, styles.hamburgerItem)} onClick={openMenu}>
          <img
            className={classNames(styles.icon, styles.hamburgerIcon)}
            src={openMenuIcon}
            alt='Open Menu'
          ></img>
        </button>
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
