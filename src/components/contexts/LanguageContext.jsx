import React, { createContext, useContext, useState } from 'react'

let currentLanguage = localStorage.getItem('language')

const Context = createContext({})
const callbacks = []

export function LanguageContext({ children }) {
  let [language, setLanguage] = useState(currentLanguage || 'ru')
  localStorage.setItem('language', language)
  callbacks.forEach(cb => cb(language))
  currentLanguage = language

  return <Context.Provider value={{ language, setLanguage }}>{children}</Context.Provider>
}

export function useLanguageContext() {
  return useContext(Context)
}

export function addOnLanguageChangeCallback(cb) {
  if (typeof cb === 'function') callbacks.push(cb)
}
