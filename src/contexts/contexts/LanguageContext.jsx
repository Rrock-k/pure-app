import React, { createContext, useContext, useState } from 'react'

let currentLanguage = localStorage.getItem('language')

const Context = createContext({})
const callbacks = []

export function LanguageContext({ children }) {
  let [language, setLanguage] = useState(currentLanguage || getPreferredLanguage() || 'en')
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

function getPreferredLanguage() {
  let preferredLanguage
  try {
    if (navigator.language === 'ru-RU') preferredLanguage = 'ru'
    if (navigator.language === 'en-EN') preferredLanguage = 'en'

    const accepted = ['ru', 'ru-RU', 'en', 'en-EN']

    if (!preferredLanguage) {
      for (let language of navigator.languages) {
        if (accepted.includes(language.trim())) {
          preferredLanguage = language.trim().substring(0, 2)
          break
        }
      }
    }
  } catch (err) {}

  return preferredLanguage || 'en'
}
