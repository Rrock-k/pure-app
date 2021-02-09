import React from 'react'
import { contexts } from 'config/contexts'

const LanguageSwitcher = ({ className }) => {
  const { setLanguage } = contexts.useLanguageContext()

  return (
    <div className={`language-switch ${className}`}>
      <button onClick={() => setLanguage('ru')}>RU</button>
      <button className='separator' tabIndex='-1'>
        I
      </button>
      <button onClick={() => setLanguage('en')}>EN</button>
      {/* <button className='separator'>I</button>
      <button onClick={() => setLanguage('ha')}>ХА</button> */}
    </div>
  )
}

export default LanguageSwitcher
