import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Menu from './Menu'

import styles from './styles/FirstScreen.module.css'
import logo from 'assets/images/logo_bez_fona.png'

const Header = () => {
  return (
    <>
      <Navbar />
      <Link to='/home'>
        <img className={styles.mainLogo} src={logo} alt='I am in pure logo' />
      </Link>
      <Menu />
    </>
  )
}

export default React.memo(Header)
