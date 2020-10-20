import { useHistory } from 'react-router-dom'

import React from 'react'

import Language from './Language'

import logo from '../images/logo_bez_fona.png'
import magnifyingGlass from '../icons/magnifying-glass.svg'
import instagramLogo from '../icons/instagram-logo.svg'
import shoppingBag from '../icons/shopping-bag.svg'
import openMenu from '../icons/open-menu.svg'

const Navbar = props => {
  const history = useHistory()
  return (
    <nav className='navbar'>
      <div className='mobile-logo-container'>
        <img
          className='mobile-logo'
          onClick={() => history.push('/')}
          src={logo}
          alt='PURE LOGO'
        ></img>
      </div>
      <div className='navbar-items'>
        <div className='navbar-item'>
          <img className='navbar-icon' src={shoppingBag} alt='Search'></img>
        </div>
        <Language />
        {false && (
          <div className='navbar-item'>
            <img className='navbar-icon' src={magnifyingGlass} alt='Search'></img>
          </div>
        )}
        <div className='navbar-item'>
          <a
            href='https://www.instagram.com/i.am.in.pure/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='navbar-icon ' src={instagramLogo} alt='Shopping Cart'></img>
          </a>
        </div>

        <div className='navbar-item hamburger-menu-item'>
          <img
            className='navbar-icon hamburger-menu-icon'
            src={openMenu}
            alt='Open Menu'
            onClick={props.openMobileMenu}
          ></img>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
