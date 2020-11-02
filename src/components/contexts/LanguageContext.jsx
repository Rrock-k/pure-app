import React, { createContext, useContext, useState } from 'react'

export let currentLanguage = localStorage.getItem('language')
export const Context = createContext({})

export function LanguageContext({ children }) {
  let [language, setLanguage] = useState(currentLanguage || 'ru')
  localStorage.setItem('language', language)
  currentLanguage = language

  console.log('LanguageContext code executed')

  return <Context.Provider value={{ language, setLanguage }}>{children}</Context.Provider>
}

export function useLanguageContext() {
  return useContext(Context)
}
