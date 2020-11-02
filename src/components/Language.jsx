import React from 'react'
import { useLanguageContext } from './contexts/LanguageContext'

const Language = () => {
  const { setLanguage } = useLanguageContext()

  return (
    <div className='language-switch navbar-item'>
      <button onClick={() => setLanguage('ru')}>RU</button>

      <button
        style={{
          margin: '0 min(3px, 3vmin)',
          fontSize: 'min(27px, 14vh)',
        }}
      >
        I
      </button>
      <button onClick={() => setLanguage('en')}>EN</button>

      <button
        style={{
          margin: '0 min(3px, 3vmin)',
          fontSize: 'min(27px, 14vh)',
        }}
      >
        I
      </button>

      <button onClick={() => setLanguage('ha')}>ХА</button>
    </div>
  )
}

export default Language
