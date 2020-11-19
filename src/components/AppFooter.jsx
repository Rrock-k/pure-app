import React from 'react'

import instagramLogo from '../assets/icons/instagram-logo.svg'
import etsyLogo from '../assets/icons/etsy-logo.svg'

import FooterNav from './FooterNav'

export default function AppFooter() {
  return (
    <footer className='app-footer'>
      <FooterNav />
      <hr />
      <div className='app-footer-info'>
        <p id='app-footer-long-text'>
          если у вас остались вопросы или вы хотите предложить сотрудничество, пожалуйста свяжитесь
          с нами по этому адресу:
        </p>
        <p id='app-footer-email'>i.am.in.pure@gmail.com</p>
        <p id='app-footer-follow-us'>Follow us</p>
        <p id='app-footer-icons'>
          <a
            href='https://www.etsy.com/shop/iaminpure'
            className='app-footer-icon-link etsy-logo-link'
          >
            <img className='app-footer-icon etsy-logo' src={etsyLogo} alt='Etsy.com logo'></img>
          </a>
          <a
            href='https://www.instagram.com/i.am.in.pure/'
            className='app-footer-icon-link etsy-logo-link'
          >
            <img
              className='app-footer-icon instagram-logo'
              src={instagramLogo}
              alt='Instagram logo'
            ></img>
          </a>
        </p>
      </div>
    </footer>
  )
}
