import React from 'react'
import { noTranslationAvailable } from '../../utils/translation'
import { useLanguageContext } from '../contexts/LanguageContext'

export default function FastLanguageSwitch() {
  const { setLanguage } = useLanguageContext()

  return (
    <div style={{ width: '100%', height: '0px', position: 'fixed', zIndex: '99999999999' }}>
      <button onClick={() => setLanguage('en')}>En</button>
      <button onClick={() => setLanguage('ru')}>Ru</button>
      <button onClick={() => console.log(noTranslationAvailable)}>Показать</button>
    </div>
  )
}
