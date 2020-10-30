import React, { createContext, useContext, useState } from 'react'

export let currentLanguage = localStorage.getItem('language')
export const LanguageContext = createContext({})

export function LanguageContextWrapper({ children }) {
  let [language, setLanguage] = useState(currentLanguage || 'ru')
  localStorage.setItem('language', language)
  currentLanguage = language

  console.log('LanguageContextWrapper code executed')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return useContext(LanguageContext)
}
