import { Link } from 'react-router-dom'

import React from 'react'

import LanguageSwitcher from './LanguageSwitcher'

import logo from '../assets/images/logo_bez_fona.png'
import magnifyingGlass from '../assets/icons/magnifying-glass.svg'
import instagramLogo from '../assets/icons/instagram-logo.svg'
import shoppingBag from '../assets/icons/shopping-bag.svg'
import openMenuIcon from '../assets/icons/open-menu.svg'
import { useMobileMenuContext } from '../pure-common/components/MobileMenuAndContext'
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
        <Link to='/cart' className='navbar-item'>
          <img className='navbar-icon' src={shoppingBag} alt='Search'></img>
        </Link>
        <LanguageSwitcher className='navbar-item' />
        {false && (
          <div className='navbar-item'>
            <img className='navbar-icon' src={magnifyingGlass} alt='Search'></img>
          </div>
        )}

        <a
          href='https://www.instagram.com/i.am.in.pure/'
          target='_blank'
          rel='noopener noreferrer'
          className='navbar-item'
          id='instagram-navbar-icon'
        >
          <img className='navbar-icon ' src={instagramLogo} alt='Instagram Icon'></img>
        </a>

        {/* <UserAccountIcon /> */}

        <button className='navbar-item hamburger-menu-item' onClick={openMenu}>
          <img className='navbar-icon hamburger-menu-icon' src={openMenuIcon} alt='Open Menu'></img>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
