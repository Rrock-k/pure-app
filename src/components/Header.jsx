import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Navbar from './Navbar'
import Menu from './Menu'

import logo from '../assets/images/logo_bez_fona.png'

const Header = () => {
  let history = useHistory()

  return (
    <div className='header-container'>
      <Navbar />
      <Link to='/home'>
        <img className='main-logo' src={logo} alt='I am in pure logo' />
      </Link>
      <Menu />
    </div>
  )
}

export default Header
