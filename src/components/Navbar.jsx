import { Link } from 'react-router-dom'

import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'

import logo from '../assets/images/logo_bez_fona.png'
import magnifyingGlass from '../assets/icons/magnifying-glass.svg'
import instagramLogo from '../assets/icons/instagram-logo.svg'
import shoppingBag from '../assets/icons/shopping-bag.svg'
import openMenuIcon from '../assets/icons/open-menu.svg'
import { useMobileMenuContext } from '../pure-common/MobileMenuAndContext'
// import UserAccountIcon from './UserAccountIcon'

const Navbar = () => {
  const { openMenu } = useMobileMenuContext()
  return (
    <nav className='navbar'>
      <div className='mobile-logo-container'>
        <Link to='/home'>
          <img className='mobile-logo' src={logo} alt='PURE LOGO'></img>
        </Link>
      </div>
      <div className='navbar-items'>
        <div className='navbar-item'>
          <img className='navbar-icon' src={shoppingBag} alt='Search'></img>
        </div>
        <LanguageSwitcher className='navbar-item' />
        {false && (
          <div className='navbar-item'>
            <img className='navbar-icon' src={magnifyingGlass} alt='Search'></img>
          </div>
        )}

        <div className='navbar-item' id='instagram-navbar-icon'>
          <a
            href='https://www.instagram.com/i.am.in.pure/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='navbar-icon ' src={instagramLogo} alt='Shopping Cart'></img>
          </a>
        </div>

        {/* <UserAccountIcon /> */}

        <div className='navbar-item hamburger-menu-item'>
          <button onClick={openMenu}>
            <img
              className='navbar-icon hamburger-menu-icon'
              src={openMenuIcon}
              alt='Open Menu'
            ></img>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
