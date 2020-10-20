import React from 'react'
import { useHistory } from 'react-router-dom'

import Navbar from './Navbar'
import Menu from './Menu'

import logo from '../images/logo_bez_fona.png'

const Header = props => {
  let history = useHistory()
  return (
    <div className='header-container'>
      <Navbar openMobileMenu={props.openMobileMenu} />
      <img
        className='main-logo'
        onClick={() => history.push('/')}
        src={logo}
        alt='I am in pure logo'
      />
      <Menu />
    </div>
  )
}

export default Header
